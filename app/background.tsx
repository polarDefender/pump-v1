import React, { useEffect } from "react";
import { Spinner } from "@nextui-org/react";
import { useDispatch } from "react-redux";
import { setTickers } from "@/state/slices/tickersSlice";
import { setBtcPrice } from "@/state/slices/btcPriceSlice";
import axios, { AxiosResponse } from "axios";

interface CoinGeckoResponse {
  bitcoin: {
    usd: number;
  };
}

export default function Background() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchBitcoinPriceInUSD = async () => {
      try {
        const response: AxiosResponse<CoinGeckoResponse> = await axios.get(
          "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
        );
        const btcPriceInUSD = response.data.bitcoin.usd;
        console.log(btcPriceInUSD);
        return dispatch(setBtcPrice(btcPriceInUSD));
      } catch (error) {
        return console.error("Failed to convert sat price to USD:", error);
      }
    };

    const fetchRunesTickers = async () => {
      try {
        const { data: tickers } = await axios.get("/api/bestInSlot", {
          params: {
            sort_by: "marketcap",
            order: "asc",
            offset: "20",
            count: "60",
          },
        });
        if (tickers) {
          console.log(tickers);
          dispatch(setTickers(tickers));
        } else {
          console.error("Failed to fetch data from API");
        }
      } catch (error) {
        console.error("Error fetching data from API:", error);
      }
    };

    fetchBitcoinPriceInUSD(); // get btc price in usd
    fetchRunesTickers(); // get runes tickers
  }, [dispatch]);

  return <div>{/* <Spinner color="secondary"></Spinner> */}</div>;
}
