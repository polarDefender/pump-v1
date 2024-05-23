"use client";

import React, { FC, useState, useEffect, useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Table as NextUITable,
  SortDescriptor,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  Pagination,
  Tooltip,
  Slider,
} from "@nextui-org/react";
import { TableTicker } from "@/types/runesTable";
import { Ticker, Tickers, TickersReducer, BtcPriceInUSD } from "@/types";

import { SearchIcon, ChevronDownIcon } from "./icons";
import { columns, statusOptions } from "./data";
import {
  capitalize,
  fillterTickers,
  formatFloat,
  convertSatToBTC,
  formatNumberShort,
  convertSatToUSD,
} from "./utils";

const statusColorMap: Record<
  string,
  "default" | "primary" | "secondary" | "success" | "warning" | "danger"
> = {
  active: "success",
  inactive: "danger",
  // add more mappings as needed
};

interface RootState {
  tickers: TickersReducer;
  btcPriceInUSD: BtcPriceInUSD;
}

export const Table = () => {
  const rootTickers: Ticker[] = useSelector(
    (state: RootState) => state.tickers?.tickers?.data
  );

  const btcPriceInUSD = useSelector(
    (state: RootState) => state.btcPriceInUSD.usd
  );

  const [filterValue, setFilterValue] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "Token",
    direction: "ascending",
  });
  const [tickers, setTickers] = useState<TableTicker[]>([]);
  const [page, setPage] = useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = columns;

  useEffect(() => {
    if (!rootTickers) return;
    const tickers = fillterTickers(rootTickers);
    setTickers([...tickers]);
  }, [rootTickers]);

  const filteredItems = useMemo(() => {
    let filteredUsers = [...tickers];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.token.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return filteredUsers;
  }, [tickers, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column as keyof typeof a];
      const second = b[sortDescriptor.column as keyof typeof b];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = useCallback((user: TableTicker, columnKey: string) => {
    const cellValue = user[columnKey];

    const usdPice: number =
      Number(convertSatToUSD(Number(cellValue), btcPriceInUSD)) || 0;
    switch (columnKey) {
      case "volume":
        return `$${formatNumberShort(Number(usdPice))}`;
      case "volume24h":
        return `$${formatNumberShort(Number(usdPice))}`;
      case "volume7D":
        return `$${formatNumberShort(Number(usdPice))}`;
      case "price":
        const displayPrice: string =
          Number(cellValue) < 10000
            ? `${formatFloat(Number(cellValue), 5)} sat`
            : `${formatFloat(Number(cellValue), 5)} BTC`;
        return displayPrice;
      case "mints":
        return (
          <Tooltip
            content={
              <div className="px-2 py-2 w-[300px] flex flex-col gap-1">
                <div className="text-medium flex justify-between">
                  <div className="font-bold ">Block Range: </div>
                  <div>{`${cellValue.mint_start_block || ""} - ${
                    cellValue.mint_end_block || ""
                  }`}</div>
                </div>
                <div className="text-medium flex justify-between">
                  <div className="font-bold ">Supply </div>
                  <div>{cellValue.supply}</div>
                </div>
                <div className="text-medium flex justify-between">
                  <div className="font-bold ">Mint Amount </div>
                  <div>{cellValue.mint_amount}</div>
                </div>
                <div className="text-medium flex justify-between">
                  <div className="font-bold ">Num Mints </div>
                  <div>{cellValue.num_mint}</div>
                </div>
                <div className="text-medium flex justify-between">
                  <div className="font-bold ">Premine </div>
                  <div>{cellValue.premine}</div>
                </div>
                <div className="text-medium flex justify-between">
                  <div className="font-bold ">Max Supply </div>
                  <div>{cellValue.max_supply}</div>
                </div>
                <div className="text-medium flex justify-between">
                  <div className="font-bold ">Remaining Supply </div>
                  <div>{cellValue.remaining_supply}</div>
                </div>
                <div className="text-medium flex justify-between">
                  <div className="font-bold ">Cap </div>
                  <div>{cellValue.mint_cnt_limit}</div>
                </div>
              </div>
            }
          >
            <div className="flex w-[200px] flex-col gap-2 h-full max-w-md items-start justify-center">
              <p className="text-default-500 w-full flex justify-between font-medium text-small">
                <span>{cellValue.num_mint}</span>
                <span>{formatFloat(cellValue.mint_progress, 2)}%</span>
              </p>
              <Slider
                step={10}
                maxValue={100}
                minValue={0}
                aria-label="Player progress"
                value={formatFloat(cellValue.mint_progress, 2)}
                hideThumb={true}
                renderThumb={({ index, ...props }) => (
                  <div
                    {...props}
                    className="top-1/2 bg-primary rounded-full hidden"
                  >
                    <span
                      className={
                        "bg-primary shadow-small w-6 h-3 rounded-full block"
                      }
                    />
                  </div>
                )}
              />
            </div>
          </Tooltip>
        );
      case "marketcap":
        return `$${formatNumberShort(Number(usdPice))}`;
      default:
        return cellValue;
    }
  }, []);

  const onNextPage = useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );

  const onSearchChange = useCallback((value: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const handleSelectionChange = () => {
    setStatusFilter(["default"]);
  };

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-8">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[30%]"
            placeholder="Search..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Filter
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={handleSelectionChange}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {tickers.length} data
          </span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    onRowsPerPageChange,
    tickers.length,
    onSearchChange,
    hasSearchFilter,
  ]);

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[50%] justify-end gap-2">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [items.length, page, pages, hasSearchFilter]);

  return (
    <NextUITable
      aria-label="Example table with custom cells, pagination and sorting"
      isHeaderSticky
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={{
        wrapper: "max-h-[382px]",
      }}
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSortChange={setSortDescriptor}
      showSelectionCheckboxes={false}
    >
      <TableHeader columns={headerColumns}>
        {headerColumns.map((column, index) => (
          <TableColumn
            key={index} // Use a unique and stable part of each column
            align="start"
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        ))}
      </TableHeader>
      <TableBody>
        {sortedItems.map((ticker: TableTicker, index: number) => (
          <TableRow key={index}>
            {headerColumns.map((column, index) => (
              <TableCell key={index}>
                {renderCell(ticker, column.uid)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </NextUITable>
  );
};

export default Table;
