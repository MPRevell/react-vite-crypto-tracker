import { useState, useMemo, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Line } from "react-chartjs-2";
import { CategoryScale, Chart, registerables } from "chart.js";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";

import SubscriptionContext from "../contexts/SubscriptionContext";

Chart.register(...registerables);
Chart.register(CategoryScale);

function CoinTable({ data }) {
  const { watchedCoins } = useContext(SubscriptionContext);
  console.log("watchedCoins:", watchedCoins);
  const formatNumbers = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const columns = useMemo(
    () => [
      {
        header: "Rank",
        accessorKey: "rank",
        cell: (info) => info.getValue(),
      },
      {
        header: "Coin",
        accessorKey: "name",
        cell: (info) => (
          <div className="coin">
            <img
              src={info.row.original.iconUrl}
              alt="Logo"
              width={25}
              height="auto"
            />
            <h4>{info.row.original.name}</h4>
            <small>{info.row.original.symbol}</small>
          </div>
        ),
      },
      {
        header: "Price",
        accessorKey: "price",
        cell: (info) =>
          `$${formatNumbers(parseFloat(info.getValue()).toFixed(2))}`,
      },
      {
        header: "Change",
        accessorKey: "change",
        cell: (info) => (
          <span
            className={`text-xs font-medium ${
              parseFloat(info.getValue()) > 0
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {parseFloat(info.getValue()).toFixed(2)}%
          </span>
        ),
      },
      {
        header: "Market Cap",
        accessorKey: "marketCap",
        cell: (info) =>
          `$${formatNumbers(parseFloat(info.getValue()).toFixed(2))}`,
      },
      {
        header: "7d Chart",
        accessorKey: "sparkline",
        cell: (info) => (
          <Line
            className="flex items-center"
            data={{
              labels: Array.from({ length: info.getValue().length }, (_, i) =>
                (i + 1).toString()
              ),
              datasets: [
                {
                  data: info
                    .getValue()
                    .map((str) => parseFloat(str).toFixed(2)),
                  legend: {
                    display: false,
                  },
                  fill: false,
                  pointRadius: 0,
                  lineTension: 0.5,
                  borderColor: "#00FF5F",
                  borderWidth: 3,
                },
              ],
            }}
            options={{
              scales: {
                x: {
                  display: false,
                  grid: {
                    display: false,
                  },
                  ticks: {
                    display: false,
                  },
                },
                y: {
                  display: false,
                  grid: {
                    display: false,
                  },
                  ticks: {
                    display: false,
                  },
                },
              },
              responsive: true,
              maintainAspectRatio: false,
              title: {
                display: false,
              },
            }}
            style={{
              height: 60,
              width: 100,
              color: "#FE1040",
            }}
          />
        ),
      },
      {
        header: "Add to watchlist",
        accessorKey: "watchlist",
        cell: (info) => {
          const watchedCoin = watchedCoins.includes(info.row.original.uuid);
          return (
            <a
              href="#"
              className={`inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700 ${
                watchedCoin ? "bg-yellow-200" : ""
              }`}
            >
              {watchedCoin ? "Remove" : "Add"}
            </a>
          );
        },
      },
    ],
    [watchedCoins]
  );

  return (
    <>
      <Table
        {...{
          data,
          columns,
        }}
      />
    </>
  );
}

const Table = ({ data, columns }) => {
  const [sorting, setSorting] = useState([]);

  const navigate = useNavigate();

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    enableFilters: false, // <-- Remove filtering
    debugTable: true,
  });

  return (
    <>
      <div className="overflow-x-auto">
        <div className="table-container sm:px-4 md:px-16 flex-col bg-white dark:bg-gray-950">
          <table className="coin-table w-full text-sm rounded-lg text-left bg-sky-200 text-gray-500 dark:text-gray-400 text-left">
            <thead className="text-xs text-white-700  bg-gray-950 dark:bg-gray-950 dark:text-gray-900 rounded-lg ">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      className="px-6 py-3 text-left text-gray-200 bg-sky-100 dark:bg-gray-950 text-left "
                      {...(header.column.getCanSort()
                        ? {
                            onClick: header.column.getToggleSortingHandler(),
                            style: { cursor: "pointer" },
                          }
                        : {})}
                    >
                      {header.isPlaceholder ? null : (
                        <div className="mt-2 dark:bg-gray-950 text-black dark:text-white">
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: " 🔼",
                            desc: " 🔽",
                          }[header.column.getIsSorted()] ?? null}
                          {header.column.getCanFilter() ? (
                            <div className="mt-2 bg-gray-950">
                              <Filter column={header.column} table={table} />
                            </div>
                          ) : null}
                        </div>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  onClick={() => {
                    navigate(`/about/${row.original.uuid}`);
                  }}
                  className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 hover:bg-slate-300 dark:hover:bg-gray-800"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-6 py-4">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="coin-table-pagination-wrapper bottom-0 left-0 right-0 px-4 py-4 dark:text-white text-gray-700 bg-white dark:bg-gray-900">
            <div className="flex justify-center items-center gap-2 dark:dg-gray-950">
              <button
                className="border rounded-full px-3 py-1 hover:bg-gray-700 transition-all"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                {"<<"}
              </button>
              <button
                className="border rounded-full px-3 py-1 hover:bg-gray-700 transition-all"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                {"<"}
              </button>
              <button
                className="border rounded-full px-3 py-1 hover:bg-gray-700 transition-all"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                {">"}
              </button>
              <button
                className="border rounded-full px-3 py-1 hover:bg-gray-700 transition-all"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                {">>"}
              </button>
              <span className="flex items-center gap-1">
                <div>Page</div>
                <strong>
                  {table.getState().pagination.pageIndex + 1} of{" "}
                  {table.getPageCount()}
                </strong>
              </span>
              <span className="flex items-center gap-1">
                | Go to page:
                <input
                  type="number"
                  defaultValue={table.getState().pagination.pageIndex + 1}
                  onChange={(e) => {
                    const page = e.target.value
                      ? Number(e.target.value) - 1
                      : 0;
                    table.setPageIndex(page);
                  }}
                  className="border p-1 rounded w-16"
                />
              </span>
              <select
                value={table.getState().pagination.pageSize}
                onChange={(e) => {
                  table.setPageSize(Number(e.target.value));
                }}
                className="border rounded p-1"
              >
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                  </option>
                ))}
              </select>
            </div>
            <div className="text-center">
              {table.getRowModel().rows.length} Rows
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CoinTable;
