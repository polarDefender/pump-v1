import React from "react";
const columns = [
  {name: "TICKER", uid: "ticker", sortable: true},
  {name: "NUMBER", uid: "umber", sortable: true},
  {name: "LAUNCH TYPE", uid: "launch", sortable: true},
  {name: "MINT START TIME", uid: "time", sortable: true},
  {name: "MINT", uid: "mint", sortable: true},
  {name: "MINTS", uid: "mints", sortable: true},
  {name: "CIRCULATING SUPPLY", uid: "circulating", sortable: true},
  {name: "HOLDERS", uid: "holders", sortable: true},

];

const statusOptions = [
  {name: "FIXED SUPPLY", uid: "SUPPLY"},
  {name: "FAIR LAUNCH", uid: "LAUNCH"},
];

const users = [
  {
    ticker: 1,
    umber: "Tony Reichert",
    launch: "CEO",
    time: "Management",
    mint: "active",
    mints: "29",
    circulating: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    holders: "tony.reichert@example.com",
  },
  {
    ticker: 2,
    umber: "Tony Reichert",
    launch: "CEO",
    time: "Management",
    mint: "active",
    mints: "29",
    circulating: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    holders: "tony.reichert@example.com",
  },
];

export {columns, users, statusOptions};
