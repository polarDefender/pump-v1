"use client";

import React from "react";
import {
  Table as NextUITable,
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
} from "@nextui-org/react";
import { useSelector, useDispatch } from "react-redux";
import * as Types from "@/types";
import { TableTicker } from "@/types/runesTable";

import { SearchIcon, ChevronDownIcon } from "./icons";
import { columns, statusOptions } from "./data";
import { capitalize, fillterTickers } from "./utils";

const statusColorMap = {
  active: "FIXED SUPPLY",
  paused: "FAIR LAUNCH",
};

export default function Table() {
  const tickersData = useSelector(
    (state: Types.RootState) => state.tickers.tickers.data
  );

  const [filterValue, setFilterValue] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "Token",
    direction: "ascending",
  });
  const [tickers, setTickers] = React.useState<TableTicker[]>([]);
  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = columns;

  React.useEffect(() => {
    if (!tickersData) return;
    console.log(typeof tickersData, "test");
    const tickers = fillterTickers(tickersData);
    setTickers([...tickers]);
    console.log(tickers);
  }, [tickersData]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...tickers];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.volume.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    // if (statusFilter !== "" && statusFilter.size !== 0) {
    //   filteredUsers = filteredUsers.filter((user) =>
    //     Array.from(statusFilter).includes(user.mints)
    //   );
    // }

    return filteredUsers;
  }, [tickers, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column as keyof typeof a];
      const second = b[sortDescriptor.column as keyof typeof b];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((user: any, columnKey: string) => {
    const cellValue = user[columnKey];
    switch (columnKey) {
      case "token":
        return cellValue;
      case "mints":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">test</p>
            <p className="text-bold text-tiny capitalize text-default-400">
              {user.team}
            </p>
          </div>
        );
      case "launch":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[user.status as keyof typeof statusColorMap]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      default:
        return cellValue;
    }
    return cellValue;
  }, []);

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback((e: any) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value: any) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = React.useMemo(() => {
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
                onSelectionChange={setStatusFilter}
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

  const bottomContent = React.useMemo(() => {
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
        {sortedItems.map((user: any, index) => (
          <TableRow key={index}>
            {headerColumns.map((column, index) => (
              <TableCell key={index}>{renderCell(user, column.uid)}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </NextUITable>
  );
}
