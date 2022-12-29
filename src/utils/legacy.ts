import axios, { AxiosRequestConfig } from "axios";
import env from "../env";
import { Blockchain, Partner } from "../types";

export const get_strategy_id = (
  strategy_type: string,
  blockchains: Blockchain[]
) => {
  const overrides: { [key: string]: string } = {
    aave_polygon_leverage: "aave_leverage",
    aave_avalanche_leverage: "aave_leverage",
    aave_optimism_leverage: "aave_leverage",
  };

  if (overrides[strategy_type]) return overrides[strategy_type];

  const blockchain = blockchains.find((b) =>
    strategy_type.endsWith(b.blockchain_id)
  );
  return blockchain
    ? strategy_type.replace(`_${blockchain.blockchain_id}`, "")
    : strategy_type;
};

export const fetch_legacy = (
  url: string,
  partner: Partner,
  config?: Partial<AxiosRequestConfig>
) =>
  axios
    .get(
      `${env.ITB_ANALYTICS_API_URL}${url.startsWith("/") ? url : `/${url}`}`,
      {
        headers: {
          "x-api-key": partner.legacy_api_key,
        },
        ...config,
      }
    )
    .then((r) => r.data);
