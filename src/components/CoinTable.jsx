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
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { auth } from "../firebase.config";
import Tooltip from "@mui/material/Tooltip";
import AuthDialog from "../components/shared/AuthDialog"; // Import the AuthDialog component
import SubscriptionContext from "../contexts/SubscriptionContext";

Chart.register(...registerables);
Chart.register(CategoryScale);

function CoinTable({ data }) {
  const { watchedCoins } = useContext(SubscriptionContext);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const handleAuthModalOpen = () => setIsAuthModalOpen(true);
  const handleAuthModalClose = () => setIsAuthModalOpen(false);

  const getLineColor = (sparklineData) => {
    if (sparklineData.length < 2) return "white";

    const startPrice = parseFloat(sparklineData[0]);
    const endPrice = parseFloat(sparklineData[sparklineData.length - 1]);

    if (endPrice > startPrice) return "#00FF5F"; // Green for price up
    if (endPrice < startPrice) return "#f44336"; // Red for price down
    return "#FFFFFF"; // White for no change
  };

  const formatNumbers = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const { handleAddToWatchlist } = useContext(SubscriptionContext);

  const columns = useMemo(
    () => [
      {
        header: "Rank",
        accessorKey: "rank",
        cell: (info) => <div className="px-6">{info.getValue()}</div>,
      },
      {
        header: "Coin",
        accessorKey: "name",
        cell: (info) => (
          <div className="coin text-left">
            <img
              src={info.row.original.iconUrl}
              alt="Logo"
              width={25}
              height="auto"
            />
            <div className="coin-detail px-2">
              <h4>{info.row.original.name}</h4>
              <small>{info.row.original.symbol}</small>
            </div>
          </div>
        ),
      },
      {
        header: "Price",
        accessorKey: "price",
        cell: (info) => (
          <div className="text-right">
            ${formatNumbers(parseFloat(info.getValue()).toFixed(2))}
          </div>
        ),
      },
      {
        header: "Change (7d)",
        accessorKey: "change",
        cell: (info) => (
          <span
            className={`text-xs font-medium text-right ${
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
        header: "24hr Volume",
        accessorKey: "24hVolume",
        cell: (info) =>
          `$${formatNumbers(parseFloat(info.getValue()).toFixed(2))}`,
      },
      {
        header: "Market Cap",
        accessorKey: "marketCap",
        cell: (info) => (
          <div className="text-right">
            ${formatNumbers(parseFloat(info.getValue()).toFixed(2))}
          </div>
        ),
      },
      {
        header: "7d Chart",
        accessorKey: "sparkline",
        cell: (info) => {
          const lineColor = getLineColor(info.getValue());

          return (
            <Line
              className="flex items-center"
              data={{
                labels: Array.from({ length: info.getValue().length }, (_, i) =>
                  (i + 1).toString()
                ),
                datasets: [
                  {
                    label: "Price Trend",
                    data: info.getValue().map((str) => parseFloat(str)),
                    fill: false,
                    pointRadius: 0,
                    lineTension: 0.5,
                    borderColor: lineColor, // Use the dynamic color here
                    borderWidth: 3,
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                },
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
              }}
              style={{
                maxWidth: "230px",
                maxHeight: "70px",
              }}
            />
          );
        },
      },
      {
        header: "Add to Watchlist",
        accessorKey: "watchlist",
        cell: (info) => {
          const watchedCoin = watchedCoins.includes(info.row.original.uuid);
          const handleWatchlistClick = (event) => {
            event.stopPropagation();
            event.preventDefault();
            if (auth.currentUser) {
              handleAddToWatchlist(info.row.original.uuid, watchedCoins);
            } else {
              handleAuthModalOpen();
            }
          };

          return (
            <Tooltip title={!auth.currentUser ? "Sign-in to add" : ""}>
              <div>
                <a
                  href="#"
                  className={`px-2 flex justify-center items-center text-xs font-medium ${
                    watchedCoin
                      ? "text-yellow-300"
                      : "dark:text-gray-500 text-gray-400"
                  }`}
                  onClick={handleWatchlistClick}
                >
                  {watchedCoin ? <StarIcon /> : <StarBorderIcon />}
                </a>
              </div>
            </Tooltip>
          );
        },
      },

      // ...rest of your column definitions
    ],
    [watchedCoins, handleAddToWatchlist]
  );

  return (
    <>
      <AuthDialog
        open={isAuthModalOpen}
        defaultOpenTab={0}
        onClose={handleAuthModalClose}
      />
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
        <div className="table-container bg-sky-100 w-full flex-col dark:bg-gray-950">
          <table className="coin-table w-full text-sm rounded-lg bg-sky-200 text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-200">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      className="px-3 py-3 text-gray-200 bg-sky-100 dark:bg-gray-950 "
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
                    <td key={cell.id} className="px-3 py-3">
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
          {data.length >= 10 && (
            <div className="coin-table-pagination-wrapper bottom-0 left-0 right-0 px-4 py-4 text-gray-700 dark:text-white bg-white dark:bg-gray-900">
              <div className="flex justify-center items-center gap-2 dark:dg-gray-950">
                <button
                  className="border rounded-full px-3 py-1 hover:bg-gray-700 bg-gray-200 dark:bg-gray-700  transition-all"
                  onClick={() => table.setPageIndex(0)}
                  disabled={!table.getCanPreviousPage()}
                >
                  {"<<"}
                </button>
                <button
                  className="border rounded-full px-3 py-1 hover:bg-gray-700 bg-gray-200 dark:bg-gray-700  transition-all"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  {"<"}
                </button>
                <button
                  className="border rounded-full px-3 py-1 hover:bg-gray-700 bg-gray-200 dark:bg-gray-700  transition-all"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  {">"}
                </button>
                <button
                  className="border rounded-full px-3 py-1 hover:bg-gray-700 bg-gray-200 dark:bg-gray-700  transition-all"
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
                <span className="flex items-center gap-1 pagination-shortcut">
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
                    className="border p-1 rounded w-16 "
                  />
                </span>
                <select
                  value={table.getState().pagination.pageSize}
                  onChange={(e) => {
                    table.setPageSize(Number(e.target.value));
                  }}
                  className="border rounded p-1 pagination-select bg-gray-200 dark:bg-gray-900"
                >
                  {[10, 20, 30, 40, 50].map((pageSize) => (
                    <option key={pageSize} value={pageSize}>
                      Show {pageSize}
                    </option>
                  ))}
                </select>
              </div>
              <div className="text-center"></div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CoinTable;
