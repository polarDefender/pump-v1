export type TableTicker = { 
    token: string
    price: string
    symbol: string
    mints: Mints
    volume: string
    volume24h: string
    volume7D: string
    H24: string
    D7: string
    marketcap: string
};

export type Mints = {
    mint_cnt_limit: string
    mint_end_block: null | string
    mint_progress: number
    mint_start_block: null | string
    mintable: boolean   
}