import axios from 'axios';

const NEXT_PUBLIC_BIS_API_KEY = process.env.NEXT_PUBLIC_BIS_API_KEY;
const NEXT_PUBLIC_BIS_GET_TICKERS_URL = process.env.NEXT_PUBLIC_BIS_GET_TICKERS_URL;

export const getTickers = async () => {
  try {
    const params = {
      sort_by: 'marketcap',
      order: 'asc',
      offset: '20',
      count: '40',
    };

    const response = await axios.get(`${NEXT_PUBLIC_BIS_GET_TICKERS_URL}`, {
      params,
      headers: {
        'x-api-key': NEXT_PUBLIC_BIS_API_KEY,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};