import { waitForMessageReceived } from "@layerzerolabs/scan-client";
import { JsonRpcProvider, Wallet } from "ethers";
import "dotenv/config";
import { bridgeToken } from ".";
import { ChainsMap, StargateChainId, TokenName } from "./types";

const RPC: ChainsMap<string> = {
  [StargateChainId.ETHEREUM]: "https://eth.llamarpc.com",
  [StargateChainId.BSC]: "https://rpc.ankr.com/bsc",
  [StargateChainId.AVALANCHE]:
    "https://avalanche.blockpi.network/v1/rpc/public",
  [StargateChainId.POLYGON]: "https://polygon.llamarpc.com",
  [StargateChainId.ARBITRUM]: "https://rpc.ankr.com/arbitrum",
  [StargateChainId.OPTIMISM]: "https://mainnet.optimism.io",
  [StargateChainId.FANTOM]: "https://fantom.publicnode.com",
  [StargateChainId.METIS]: "https://andromeda.metis.io/?owner=1088",
  [StargateChainId.GOERLI]: "https://rpc.ankr.com/eth_goerli",
  [StargateChainId.FUJI]: "https://ava-testnet.public.blastapi.io/ext/bc/C/rpc",
  [StargateChainId.ARBITRUM_GOERLI]:
    "https://arbitrum-goerli.public.blastapi.io",
};

const CHAIN_FROM: StargateChainId = StargateChainId.ARBITRUM;
const CHAIN_TO: StargateChainId = StargateChainId.OPTIMISM;
const TOKEN: TokenName = "STG";
const AMOUNT: bigint = 1n;

const test = async () => {
  const provider = new JsonRpcProvider(RPC[CHAIN_FROM]);
  const signer = new Wallet(process.env.PRIVATE_KEY, provider);

  const receipt = await bridgeToken({
    signer,
    recipient: signer.address,
    chainFrom: CHAIN_FROM,
    chainTo: CHAIN_TO,
    token: TOKEN,
    amount: AMOUNT,
    approveMax: true,
  });

  if (receipt) {
    console.log("Waiting for delivery...");

    const result = await waitForMessageReceived(
      StargateChainId.ARBITRUM,
      receipt.hash
    );

    console.log(`Success! Destination tx: ${result.dstTxHash}`);
  } else {
    console.log("🤔");
  }
};

test();
