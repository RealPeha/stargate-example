import { abi as RouterABI } from "@layerzerolabs/stargate-evm/artifacts/contracts/Router.sol/Router.json";
import { abi as RouterETHABI } from "@layerzerolabs/stargate-evm/artifacts/contracts/RouterETH.sol/RouterETH.json";
import { abi as FactoryABI } from "@layerzerolabs/stargate-evm/artifacts/contracts/Factory.sol/Factory.json";
import { abi as PoolABI } from "@layerzerolabs/stargate-evm/artifacts/contracts/Pool.sol/Pool.json";
import { abi as StargateTokenABI } from "@layerzerolabs/stargate-evm/artifacts/contracts/StargateToken.sol/StargateToken.json";
import {
  Addressable,
  Contract,
  ContractTransactionResponse,
  formatUnits,
  MaxUint256,
  Wallet,
  AbiCoder,
} from "ethers";
import {
  FACTORY_ADDRESS,
  LZ_ENDPOINT_ADDRESS,
  ROUTER_ADDRESS,
  ROUTER_ETH_ADDRESS,
  SimpleERC20ABI,
  SimpleLZEndpointABI,
  SLIPPAGE_DENOMINATOR,
  STG_ADDRESS,
  SUPPORTED_TOKENS,
} from "./constants";
import { StargateChainId, TokenName } from "./types";

const approveToken = async (
  token: Contract,
  owner: string,
  spender: string | Addressable,
  amount: bigint
) => {
  const allowance: bigint = await token.allowance.staticCall(owner, spender);

  if (allowance < amount) {
    const tx = await token.approve.send(spender, amount);
    await tx.wait();
  }

  return Promise.resolve();
};

interface BridgeTokenInput {
  signer: Wallet;
  recipient: string;
  chainFrom: StargateChainId;
  chainTo: StargateChainId;
  token: TokenName;
  amount: bigint;
  approveMax?: boolean;
  slippage?: number;
}

export const bridgeToken = async (input: BridgeTokenInput) => {
  const {
    signer,
    recipient,
    chainFrom,
    chainTo,
    token: tokenName,
    amount,
    approveMax,
    slippage = 0.1, // 0.1%
  } = input;

  const { address: sender, provider } = signer;

  if (tokenName === "STG") {
    return bridgeSTG(input);
  }

  const poolIdFrom = SUPPORTED_TOKENS[chainFrom][tokenName];
  const poolIdTo = SUPPORTED_TOKENS[chainTo][tokenName];

  if (!poolIdFrom || !poolIdTo) {
    throw new Error(
      `Stargate does not support bridge ${tokenName} from ${chainFrom} to ${chainTo}`
    );
  }

  const factory = new Contract(
    FACTORY_ADDRESS[chainFrom],
    FactoryABI,
    provider
  );

  const poolAddressFrom: string = await factory.getPool.staticCall(poolIdFrom);
  const poolFrom = new Contract(poolAddressFrom, PoolABI, provider);

  const tokenAddress: string = await poolFrom.token.staticCall();
  const token = new Contract(tokenAddress, SimpleERC20ABI, signer);

  const router = new Contract(ROUTER_ADDRESS[chainFrom], RouterABI, signer);

  const isETHBridge = tokenName === "ETH";

  if (isETHBridge) {
    const balance = await provider!.getBalance(sender);
    if (balance < amount) {
      throw new Error(`Insufficient ${tokenName} balance`);
    }
  } else {
    const balance: bigint = await token.balanceOf.staticCall(sender);
    if (balance < amount) {
      throw new Error(`Insufficient ${tokenName} balance`);
    }

    await approveToken(
      token,
      sender,
      router.target,
      approveMax ? MaxUint256 : amount
    );
  }

  const [bridgeFee]: [bigint, bigint] =
    await router.quoteLayerZeroFee.staticCall(
      chainTo,
      1, // swap()
      recipient,
      "0x",
      [0, 0, "0x"]
    );

  console.log(`Bridge gas fee is: ${formatUnits(bridgeFee)}`);

  const amountOutMin =
    amount -
    (amount * BigInt(slippage * SLIPPAGE_DENOMINATOR)) /
      (100n * BigInt(SLIPPAGE_DENOMINATOR));

  let tx: ContractTransactionResponse;

  if (isETHBridge) {
    const routerETH = new Contract(
      ROUTER_ETH_ADDRESS[chainFrom]!,
      RouterETHABI,
      signer
    );

    tx = await routerETH.swapETH.send(
      chainTo, // _dstChainId
      sender, // _refundAddress
      recipient, // _to
      amount, // _amountLD
      amountOutMin, // _minAmountLD
      { value: bridgeFee + amount }
    );
  } else {
    tx = await router.swap.send(
      chainTo, // _dstChainId
      poolIdFrom, // _srcPoolId
      poolIdTo, // _dstPoolId
      sender, // _refundAddress
      amount, // _amountLD
      amountOutMin, // _minAmountLD
      [0, 0, "0x"], // _lzTxParams: [dstGasForCall, dstNativeAmount, dstNativeAddr]
      recipient, // _to
      "0x", // payload
      { value: bridgeFee }
    );
  }
  const receipt = await tx.wait();

  console.log(`Success! Source tx: ${receipt!.hash}`);

  return receipt;
};

export const bridgeSTG = async ({
  signer,
  recipient,
  chainFrom,
  chainTo,
  amount,
  approveMax,
}: Omit<BridgeTokenInput, "token" | "slippage">) => {
  const { address: sender, provider } = signer;

  const stgAddress = STG_ADDRESS[chainFrom];

  if (!stgAddress) {
    throw new Error(`Bridge STG from ${chainFrom} not supported`);
  }

  if (!STG_ADDRESS[chainTo]) {
    throw new Error(`Bridge STG to ${chainFrom} not supported`);
  }

  const stg = new Contract(stgAddress, StargateTokenABI, signer);

  const balance: bigint = await stg.balanceOf.staticCall(sender);
  if (balance < amount) {
    throw new Error(`Insufficient STG balance`);
  }

  await approveToken(stg, sender, stg.target, approveMax ? MaxUint256 : amount);

  const lzEndpoint = new Contract(
    LZ_ENDPOINT_ADDRESS[chainFrom],
    SimpleLZEndpointABI,
    provider
  );

  const payload = AbiCoder.defaultAbiCoder().encode(
    ["bytes", "uint256"],
    [recipient, amount]
  );
  const [bridgeFee]: [bigint, bigint] =
    await lzEndpoint.estimateFees.staticCall(
      chainTo,
      stg.target,
      payload,
      false,
      "0x"
    );

  console.log(`Bridge gas fee is: ${formatUnits(bridgeFee)}`);

  const tx = await stg.sendTokens.send(
    chainTo,
    recipient,
    amount,
    sender,
    "0x",
    {
      value: bridgeFee,
    }
  );
  const receipt = await tx.wait();

  console.log(`Success! Source tx: ${receipt!.hash}`);

  return receipt;
};
