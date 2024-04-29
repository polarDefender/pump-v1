const NEXT_PUBLIC_UNISAT_API_KEY = process.env.NEXT_PUBLIC_UNISAT_API_KEY;
const NEXT_PUBLIC_UNISAT_GET_INFOLIST_URL = process.env.NEXT_PUBLIC_UNISAT_GET_INFOLIST_URL;

export const getRunes = async () => {
  try {
    const response = await fetch(`${NEXT_PUBLIC_UNISAT_GET_INFOLIST_URL}`, {
          method: 'GET', // This is the default.
          headers: {
            'Authorization': `Bearer ${NEXT_PUBLIC_UNISAT_API_KEY}`,
          },
        });
        return await response.json();
    } catch (error) {
        return console.log(error);
    }
};
