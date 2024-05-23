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
    [key: string]: any
};

export type Mints = {
    block_range?: string
    supply?: string
    mint_progress?: number
    mint_amount?: string
    mint_cnt_limit: string | null
    mint_start_block: string | null
    mint_end_block: string | null
    num_mint?: string
    premine?: string
    max_supply?: string
    remaining_supply?: string
    cap?: string
    mintable: boolean   
}