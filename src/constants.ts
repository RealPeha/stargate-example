import { ChainsMap, StargateChainId, TokenName } from "./types";

export const ROUTER_ADDRESS: ChainsMap<string> = {
  [StargateChainId.ETHEREUM]: "0x8731d54E9D02c286767d56ac03e8037C07e01e98",
  [StargateChainId.BSC]: "0x4a364f8c717cAAD9A442737Eb7b8A55cc6cf18D8",
  [StargateChainId.AVALANCHE]: "0x45A01E4e04F14f7A4a6702c74187c5F6222033cd",
  [StargateChainId.POLYGON]: "0x45A01E4e04F14f7A4a6702c74187c5F6222033cd",
  [StargateChainId.ARBITRUM]: "0x53Bf833A5d6c4ddA888F69c22C88C9f356a41614",
  [StargateChainId.OPTIMISM]: "0xB0D502E938ed5f4df2E681fE6E419ff29631d62b",
  [StargateChainId.FANTOM]: "0xAf5191B0De278C7286d6C7CC6ab6BB8A73bA2Cd6",
  [StargateChainId.METIS]: "0x2F6F07CDcf3588944Bf4C42aC74ff24bF56e7590",
  [StargateChainId.GOERLI]: "0x7612aE2a34E5A363E137De748801FB4c86499152",
  [StargateChainId.FUJI]: "0x13093E05Eb890dfA6DacecBdE51d24DabAb2Faa1",
  [StargateChainId.ARBITRUM_GOERLI]:
    "0xb850873f4c993Ac2405A1AdD71F6ca5D4d4d6b4f",
};

export const ROUTER_ETH_ADDRESS: Partial<ChainsMap<string>> = {
  [StargateChainId.ETHEREUM]: "0x150f94B44927F078737562f0fcF3C95c01Cc2376",
  [StargateChainId.ARBITRUM]: "0xbf22f0f184bCcbeA268dF387a49fF5238dD23E40",
  [StargateChainId.OPTIMISM]: "0xB49c4e680174E331CB0A7fF3Ab58afC9738d5F8b",
};

export const FACTORY_ADDRESS: ChainsMap<string> = {
  [StargateChainId.ETHEREUM]: "0x06D538690AF257Da524f25D0CD52fD85b1c2173E",
  [StargateChainId.BSC]: "0xe7Ec689f432f29383f217e36e680B5C855051f25",
  [StargateChainId.AVALANCHE]: "0x808d7c71ad2ba3FA531b068a2417C63106BC0949",
  [StargateChainId.POLYGON]: "0x808d7c71ad2ba3FA531b068a2417C63106BC0949",
  [StargateChainId.ARBITRUM]: "0x55bDb4164D28FBaF0898e0eF14a589ac09Ac9970",
  [StargateChainId.OPTIMISM]: "0xE3B53AF74a4BF62Ae5511055290838050bf764Df",
  [StargateChainId.FANTOM]: "0x9d1B1669c73b033DFe47ae5a0164Ab96df25B944",
  [StargateChainId.METIS]: "0xAF54BE5B6eEc24d6BFACf1cce4eaF680A8239398",
  [StargateChainId.GOERLI]: "0xB30300c11FF54f8F674a9AA0777D8D5e9fefd652",
  [StargateChainId.FUJI]: "0x439C197429036423d42631181afAC655b19972e5",
  [StargateChainId.ARBITRUM_GOERLI]:
    "0x1dAC955a58f292b8d95c6EBc79d14D3E618971b2",
};

export const STG_ADDRESS: Partial<ChainsMap<string>> = {
  [StargateChainId.ETHEREUM]: "0xAf5191B0De278C7286d6C7CC6ab6BB8A73bA2Cd6",
  [StargateChainId.BSC]: "0xB0D502E938ed5f4df2E681fE6E419ff29631d62b",
  [StargateChainId.AVALANCHE]: "0x2F6F07CDcf3588944Bf4C42aC74ff24bF56e7590",
  [StargateChainId.POLYGON]: "0x2F6F07CDcf3588944Bf4C42aC74ff24bF56e7590",
  [StargateChainId.ARBITRUM]: "0x6694340fc020c5E6B96567843da2df01b2CE1eb6",
  [StargateChainId.OPTIMISM]: "0x296F55F8Fb28E498B858d0BcDA06D955B2Cb3f97",
  [StargateChainId.FANTOM]: "0x2F6F07CDcf3588944Bf4C42aC74ff24bF56e7590",
};

export const LZ_ENDPOINT_ADDRESS: ChainsMap<string> = {
  [StargateChainId.ETHEREUM]: "0x66A71Dcef29A0fFBDBE3c6a460a3B5BC225Cd675",
  [StargateChainId.BSC]: "0x3c2269811836af69497E5F486A85D7316753cf62",
  [StargateChainId.AVALANCHE]: "0x3c2269811836af69497E5F486A85D7316753cf62",
  [StargateChainId.POLYGON]: "0x3c2269811836af69497E5F486A85D7316753cf62",
  [StargateChainId.ARBITRUM]: "0x3c2269811836af69497E5F486A85D7316753cf62",
  [StargateChainId.OPTIMISM]: "0x3c2269811836af69497E5F486A85D7316753cf62",
  [StargateChainId.FANTOM]: "0xb6319cC6c8c27A8F5dAF0dD3DF91EA35C4720dd7",
  [StargateChainId.METIS]: "0x9740FF91F1985D8d2B71494aE1A2f723bb3Ed9E4",
  [StargateChainId.GOERLI]: "0xbfD2135BFfbb0B5378b56643c2Df8a87552Bfa23",
  [StargateChainId.FUJI]: "0x93f54D755A063cE7bB9e6Ac47Eccc8e33411d706",
  [StargateChainId.ARBITRUM_GOERLI]:
    "0x6aB5Ae6822647046626e83ee6dB8187151E1d5ab",
};

export const SUPPORTED_TOKENS: ChainsMap<Partial<Record<TokenName, number>>> = {
  [StargateChainId.ETHEREUM]: {
    USDC: 1,
    USDT: 2,
    DAI: 3,
    FRAX: 7,
    USDD: 11,
    ETH: 13,
    sUSD: 14,
    LUSD: 15,
    MAI: 16,
    METIS: 17,
    "metis.USDT": 19,
  },
  [StargateChainId.GOERLI]: {
    USDC: 1,
  },
  [StargateChainId.ARBITRUM_GOERLI]: {
    USDC: 1,
  },
  [StargateChainId.FUJI]: {
    USDC: 1,
  },
  [StargateChainId.BSC]: {
    USDT: 2,
    BUSD: 5,
    USDD: 11,
    MAI: 16,
    METIS: 17,
    "metis.USDT": 19,
  },
  [StargateChainId.AVALANCHE]: {
    USDC: 1,
    USDT: 2,
    FRAX: 7,
    MAI: 16,
    "metis.USDT": 19,
  },
  [StargateChainId.POLYGON]: {
    USDC: 1,
    USDT: 2,
    DAI: 3,
    MAI: 16,
  },
  [StargateChainId.ARBITRUM]: {
    USDC: 1,
    USDT: 2,
    FRAX: 7,
    ETH: 13,
    LUSD: 15,
    MAI: 16,
  },
  [StargateChainId.OPTIMISM]: {
    USDC: 1,
    DAI: 3,
    FRAX: 7,
    ETH: 13,
    sUSD: 14,
    LUSD: 15,
    MAI: 16,
  },
  [StargateChainId.FANTOM]: {
    USDC: 1,
  },
  [StargateChainId.METIS]: {
    METIS: 17,
    "metis.USDT": 19,
  },
};

export const SLIPPAGE_DENOMINATOR = 100;

export const SimpleERC20ABI = [
  "function balanceOf(address account) external view returns (uint256)",
  "function allowance(address owner, address spender) external view returns (uint256)",
  "function approve(address spender, uint256 amount) external returns (bool)",
];

export const SimpleLZEndpointABI = [
  "function estimateFees(uint16 _dstChainId, address _userApplication, bytes calldata _payload, bool _payInZRO, bytes calldata _adapterParams) external view returns (uint nativeFee, uint zroFee)",
];
