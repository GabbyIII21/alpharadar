import type { AssetLookup } from "@/server/types/providers";
import type { AssetSymbol } from "@/types";

export const trackedAssets: AssetLookup[] = [
  {
    id: "bitcoin",
    symbol: "BTC",
    name: "Bitcoin",
    coingeckoId: "bitcoin",
    dexSearch: "WBTC",
    narrativeTags: ["Bitcoin", "Market Risk"],
  },
  {
    id: "ethereum",
    symbol: "ETH",
    name: "Ethereum",
    coingeckoId: "ethereum",
    dexSearch: "WETH",
    narrativeTags: ["Ethereum", "Layer 2", "DeFi"],
  },
  {
    id: "solana",
    symbol: "SOL",
    name: "Solana",
    coingeckoId: "solana",
    dexSearch: "SOL",
    narrativeTags: ["Meme Coins", "Gaming"],
  },
  {
    id: "ondo-finance",
    symbol: "ONDO",
    name: "Ondo Finance",
    coingeckoId: "ondo-finance",
    dexSearch: "ONDO",
    narrativeTags: ["RWA", "DeFi"],
  },
  {
    id: "aerodrome-finance",
    symbol: "AERO",
    name: "Aerodrome Finance",
    coingeckoId: "aerodrome-finance",
    dexSearch: "AERO",
    narrativeTags: ["DeFi", "Layer 2"],
  },
  {
    id: "arbitrum",
    symbol: "ARB",
    name: "Arbitrum",
    coingeckoId: "arbitrum",
    dexSearch: "ARB",
    narrativeTags: ["Layer 2", "DeFi"],
  },
];

export const trackedSymbols = trackedAssets.map((asset) => asset.symbol);

export function getAssetBySymbol(symbol: string) {
  const upper = symbol.toUpperCase() as AssetSymbol;
  return trackedAssets.find((asset) => asset.symbol === upper);
}

export function getAssetByCoinGeckoId(id: string) {
  return trackedAssets.find((asset) => asset.coingeckoId === id);
}

export function getNarrativeTags(symbol: AssetSymbol) {
  return getAssetBySymbol(symbol)?.narrativeTags ?? ["Market Risk"];
}
