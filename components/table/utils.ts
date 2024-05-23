import React from "react";
import axios from 'axios';
import * as Types from "@/types";
import { TableTicker } from "@/types/runesTable";

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function fillterTickers(data: Types.Ticker[]) {
  const tickers: TableTicker[] = data.map((item) => {
    const ticker: TableTicker = {
      token:`${item.symbol} ${item.spaced_rune_name}`,
      price: `${item.avg_unit_price_in_sats}`,
      symbol: item.rune_number,
      mints: {
        mint_cnt_limit: item.mint_cnt_limit || '-',
        supply: item.total_minted_supply ? `${item.total_minted_supply} ${item.symbol}` : '-',
        mint_end_block: item.mint_end_block,
        mint_progress: item.mint_progress,
        mint_start_block: item.mint_start_block,
        mint_amount: item.per_mint_amount ? `${item.per_mint_amount} ${item.symbol}` : '-',
        num_mint: item.mint_cnt ? item.mint_cnt : '-',
        premine: item.premined_supply,
        max_supply: `${(Number(item.per_mint_amount) * Number(item.mint_cnt_limit)).toString()} ${item.symbol}`,
        remaining_supply: '444444',
        mintable: item.mintable,
      },
      volume: `${item.total_sale_info.vol_total}`,
      volume24h: `${item.total_sale_info.vol_1d}`,
      volume7D: `${item.total_sale_info.vol_7d}`,
      H24: `+10%`,
      D7: `+10%`,
      marketcap: `${item.marketcap}`,
    };
    return ticker
  });
  return tickers;
}

export function formatFloat(number: number, fixed: number) {
  return Number(number.toFixed(fixed));
}

export function convertSatToBTC(sats: number) {
  const satToBtcConversionFactor = 0.00000001;
  const btcPrice = sats * satToBtcConversionFactor;
  return btcPrice;
}

export function formatNumberShort(number: number): string {
  const abbreviations = [
    { divider: 1e12, suffix: 'T' },
    { divider: 1e9, suffix: 'B' },
    { divider: 1e6, suffix: 'M' },
    { divider: 1e3, suffix: 'K' },
  ];

  for (const abbreviation of abbreviations) {
    if (number >= abbreviation.divider) {
      const formattedNumber = (number / abbreviation.divider).toFixed(2);
      return `${formattedNumber}${abbreviation.suffix}`;
    }
  }

  return number.toString();
}

export function convertSatToUSD(satPrice: number, btcPriceInUSD: number) {
  const satToBtcConversionFactor = 1e-8;
  const btcPrice = satPrice * satToBtcConversionFactor;
  const usdPrice = btcPrice * btcPriceInUSD;
  return usdPrice.toFixed(2);
}
