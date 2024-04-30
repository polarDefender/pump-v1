"use client";

import { title } from "@/components/primitives";
import { getInfoList } from "@/api/unisat";
import { getTickers } from "@/api/bestinslot";
import React, { useEffect, useState } from "react";
import Table from "@/components/table";

export default function Runes() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const infoLists = await getInfoList();
      const tickers = await getTickers();
      setData(tickers);
      console.log(tickers, "test");
    };
    fetchData();
  }, []);

  return <div>{<Table dataSets={data} />}</div>;
}
