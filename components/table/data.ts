import React from "react";
import * as Types from "./types"

const columns: Types.column[] = [
  {name: "Token", uid: "token", sortable: true},
  {name: "Price", uid: "price", sortable: true},
  {name: "#", uid: "symbol", sortable: true},
  {name: "Mints", uid: "mints", sortable: true},
  {name: "Volume", uid: "volume", sortable: true},
  {name: "Volume(24h)", uid: "volume24h", sortable: true},
  {name: "Volume(7D)", uid: "volume7D", sortable: true},
  {name: "24H", uid: "H24", sortable: true},
  {name: "7D", uid: "D7", sortable: true},
  {name: "Marketcap", uid: "marketcap", sortable: true},
];

const statusOptions = [
  {name: "Full Minted", uid: "mints"},
  {name: "100% premime Supply", uid: "price"},
  {name: "Mintable Limited Block Range Only", uid: "mintable"},
  {name: "Turbo Only", uid: "turbo"},
];

const InfoLists = [
  {
    token: 1,
    price: "Tony Reichert",
    symbol: "CEO",
    mints: "Management",
    volume: "active",
    volume24h: "29",
    volume7D: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    H24: "tony.reichert@example.com",
    D7: "tony.reichert@example.com",
    marketcap: "tony.reichert@example.com",
  },
  {
    token: 2,
    price: "Tony Reichert",
    symbol: "CEO",
    mints: "Management",
    volume: "active",
    volume24h: "29",
    volume7D: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    H24: "tony.reichert@example.com",
    D7: "tony.reichert@example.com",
    marketcap: "tony.reichert@example.com",
  },
  {
    token: 3,
    price: "Tony Reichert",
    symbol: "CEO",
    mints: "Management",
    volume: "active",
    volume24h: "29",
    volume7D: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    H24: "tony.reichert@example.com",
    D7: "tony.reichert@example.com",
    marketcap: "tony.reichert@example.com",
  },
];

export {columns, InfoLists, statusOptions};
