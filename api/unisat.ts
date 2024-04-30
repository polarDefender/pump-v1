import axios from 'axios';

const NEXT_PUBLIC_UNISAT_API_KEY = process.env.NEXT_PUBLIC_UNISAT_API_KEY;
const NEXT_PUBLIC_UNISAT_GET_INFOLIST_URL = process.env.NEXT_PUBLIC_UNISAT_GET_INFOLIST_URL;

export const getInfoList = async () => {
  try {
    const response = await axios.get(`${NEXT_PUBLIC_UNISAT_GET_INFOLIST_URL}`, {
      headers: {
        'Authorization': `Bearer ${NEXT_PUBLIC_UNISAT_API_KEY}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  } 
};