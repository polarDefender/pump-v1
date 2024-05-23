"use client";

import { title } from "@/components/primitives";
import React, { useEffect, useState } from "react";
import Table from "@/components/table";
import { Ticker } from "@/types";

interface RootState {
  tickers: Ticker[];
}
export default function Runes() {
  return <div>{<Table />}</div>;
}
