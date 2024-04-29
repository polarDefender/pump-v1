"use client";

import { title } from "@/components/primitives";
import { getRunes } from "@/api/getRunes";
import React, { useEffect, useState } from "react";
import Table from "@/components/table";

export default function Runes() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const test = await getRunes();
      setData(test.data.detail);
      console.log(test.data, "test");
    };
    fetchData();
  }, []);

  return <div>{<Table dataSets={data} />}</div>;
}
