import {SVGProps} from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type TotalSaleInfo = {
  sale_count: number
  sale_amount: number
  vol_3h: number
  vol_6h: number
  vol_9h: number
  vol_12h: number
  vol_1d: number
  vol_3d: number
  vol_7d: number
  vol_30d: number
  vol_total: number
}

export type Ticker = {
  rune_id: string
  rune_number: string
  spaced_rune_name: string
  symbol: string
  decimals: number
  per_mint_amount: string
  mint_cnt: string
  mint_cnt_limit: string
  premined_supply: string
  total_minted_supply: string
  burned_supply: string
  circulating_supply: string
  mint_progress: number
  mint_start_block: null | string
  mint_end_block: null | string
  genesis_block: number
  deploy_ts: Date | null
  deploy_txid: string
  auto_upgrade: boolean
  holder_count: number
  event_count: number
  mintable: boolean
  avg_unit_price_in_sats: number
  min_listed_unit_price_in_sats: number
  min_listed_unit_price_unisat: number
  listed_supply: string
  listed_supply_ratio: number
  marketcap: number
  total_sale_info: TotalSaleInfo
}

export interface Tickers {
  data: Ticker[]
}

export interface RootState {
  tickers: {
    tickers: Tickers
  }
}