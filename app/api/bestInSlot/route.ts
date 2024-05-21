import axios, { AxiosResponse } from 'axios'

const NEXT_PUBLIC_BIS_API_KEY = process.env.NEXT_PUBLIC_BIS_API_KEY;
const NEXT_PUBLIC_BIS_GET_TICKERS_URL = process.env.NEXT_PUBLIC_BIS_GET_TICKERS_URL;

export async function GET(req: Request): Promise<Response> {
    if (req.method === 'GET') {
        try {
            const { searchParams } = new URL(req.url);

            const params = {
                sort_by: searchParams.get('sort_by') || 'marketcap',
                order: searchParams.get('order') || 'asc',
                offset: parseInt(searchParams.get('offset') || '20', 10),
                count: parseInt(searchParams.get('count') || '40', 10),
            };
            const response: AxiosResponse = await axios.get(`${NEXT_PUBLIC_BIS_GET_TICKERS_URL}`, {
                params, 
                headers: {
                    'x-api-key': NEXT_PUBLIC_BIS_API_KEY,
                    'Content-Type': 'application/json',
                },
            });

            return new Response(JSON.stringify(response.data), {
                status: 200,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        } catch (error) {
            return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
            });
        }
    } else {
        return new Response(`Method ${req.method} Not Allowed`, {
            status: 405,
            headers: {
                'Content-Type': 'application/json',
            }
        });
    }
}