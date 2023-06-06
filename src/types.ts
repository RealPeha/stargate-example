export enum StargateChainId {
  ETHEREUM = 101,
  BSC = 102,
  AVALANCHE = 106,
  POLYGON = 109,
  ARBITRUM = 110,
  OPTIMISM = 111,
  FANTOM = 112,
  METIS = 151,

  // Testnets
  GOERLI = 10121,
  FUJI = 10106,
  ARBITRUM_GOERLI = 10143,
}

export type ChainsMap<T> = Record<StargateChainId, T>;

export type TokenName =
  | "ETH"
  | "STG"
  | "USDC"
  | "USDT"
  | "BUSD"
  | "DAI"
  | "FRAX"
  | "USDD"
  | "sUSD"
  | "LUSD"
  | "MAI"
  | "METIS"
  | "metis.USDT";
