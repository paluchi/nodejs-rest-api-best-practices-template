export interface Blockchain {
  blockchain_id: string;
  explorer: string;
  id: number;
  name: string;
  native_token: {
    symbol: string;
    decimals: number;
  };
  public_name: string;
  public_rpc: string;
  rpc: string;
  rpc_auth_token?: string;
  coingecko_platform_id?: string;
}

export interface Token {
  token_id: string;
  address: string;
  blockchain_id: string;
  decimals: number;
  symbol: string;
  categories: string[];
  price_source: TokenPriceSource;
  price_params?: any;
}

export interface Partner {
  tenant_id: string;
  legacy_api_key: string;
  name: string;
}

export interface Position {
  symbol: string;
  position_id: string;
  strategy_id: string;
  blockchain_id: string;
  symbols: string;
  name: string;
  address: string;
  pool?: string;
  protocol?: string;
  pair?: string;
  farm?: string;
  tokenA?: string;
  tokenB?: string;
}

export interface LegacyPosition {
  strategy_type: string;
  position_id: string;
  symbol: string;
  name: string;
  address: string;
  pool?: string;
  protocol?: string;
  pair?: string;
  farm?: string;
  network?: string;
  status?: string;
  start?: string;
  end?: string;
  tokenA?: string;
  tokenB?: string;
}
