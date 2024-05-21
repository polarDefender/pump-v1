"use client";

import { title } from "@/components/primitives";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "@/components/table";

export default function Runes() {
  const counter = useSelector((state) => state);

  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/bestInSlot", {
          params: {
            sort_by: "marketcap",
            order: "asc",
            offset: "20",
            count: "40",
          },
        });
        if (response) {
          console.log(response, "test");
        } else {
          console.error("Failed to fetch data from API");
        }
      } catch (error) {
        console.error("Error fetching data from API:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/unisat");
        if (response) {
          console.log(response, "test");
        } else {
          console.error("Failed to fetch data from API");
        }
      } catch (error) {
        console.error("Error fetching data from API:", error);
      }
    };
    fetchData();
  }, []);

  return <div>{<Table />}</div>;
}
