import React from "react";
import * as Types from "@/types";
import { TableTicker } from "@/types/runesTable";

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function fillterTickers(data: Types.Ticker[]) {
  const tikcers: TableTicker[] = data.map((item) => {
    const ticker: TableTicker = {
      token:`${item.symbol} ${item.spaced_rune_name}`,
      price: `${item.avg_unit_price_in_sats} sat`,
      symbol: 300,
      mints: {
        mint_cnt_limit: item.mint_cnt_limit,
        mint_end_block: item.mint_end_block,
        mint_progress: item.mint_progress,
        mint_start_block: item.mint_start_block,
        mintable: item.mintable,
      },
      volume: `${item.total_sale_info.vol_total} sats`,
      volume24h: `${item.total_sale_info.vol_1d} sats`,
      volume7D: `${item.total_sale_info.vol_7d} sats`,
      H24: `+10%`,
      D7: `+10%`,
      marketcap: `$${item.marketcap}`,
    };
    return ticker
  });
  return tikcers;
}