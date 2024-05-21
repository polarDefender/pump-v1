import axios, { AxiosResponse } from 'axios'

const NEXT_PUBLIC_UNISAT_API_KEY = process.env.NEXT_PUBLIC_UNISAT_API_KEY
const NEXT_PUBLIC_UNISAT_GET_INFOLIST_URL = process.env.NEXT_PUBLIC_UNISAT_GET_INFOLIST_URL

export async function GET(req: Request): Promise<Response> {
    if (req.method === 'GET') {
        try {
            const response: AxiosResponse = await axios.get(`${NEXT_PUBLIC_UNISAT_GET_INFOLIST_URL}`, {
                headers: {
                    'Authorization': `Bearer ${NEXT_PUBLIC_UNISAT_API_KEY}`,
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
