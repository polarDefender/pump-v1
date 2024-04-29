require('dotenv').config()

const UNISAT_API_KEY = process.env.UNISAT_API_KEY;
const UNISAT_GET_INFOLIST_URL = process.env.UNISAT_GET_INFOLIST_URL;
console.log(process.env.UNISAT_API_KEY)
export const getRunes = async () => {
  try {
    const response = await fetch(`${UNISAT_GET_INFOLIST_URL}`, {
          method: 'GET', // This is the default.
          headers: {
            'Authorization': `${UNISAT_API_KEY}`,
          },
        });
        return await response.json();
    } catch (error) {
        return console.log(error);
    }
};
