"use client";

import { title } from "@/components/primitives";
import { useSelector, useDispatch } from "react-redux";
import { getInfoList } from "@/api/unisat";
import { getTickers } from "@/api/bestinslot";
import React, { useEffect, useState } from "react";
import Table from "@/components/table";

export default function Runes() {
  const counter = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      const infoLists = await getInfoList();
      const tickers = await getTickers();
      // setData(tickers);
      // dispatch()
      console.log(tickers, "test");
    };
    fetchData();
  }, []);

  return <div>{<Table />}</div>;
}
