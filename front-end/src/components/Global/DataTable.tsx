import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { AlertDialog, AlertDialogTrigger } from "../ui/alert-dialog";
import { Button } from "../ui/button";

export type Columns<T> = {
  header: string;
  accessor: keyof T;
  render?: (data: T, index?: number) => React.ReactNode;
  textAlign?: "left" | "center" | "right";
};

interface DataTableProps<TData> {
  columns: Columns<TData>[];
  data: TData[];
  withGrandTotal?: keyof TData;
}

export default function DataTable<TData>({
  columns,
  data,
  withGrandTotal,
}: DataTableProps<TData>) {
  // state
  const [grandTotal, setGrandTotal] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (data?.length > 0 && withGrandTotal !== undefined) {
      const total = data.reduce((acc, curr) => {
        return acc + Number(curr[withGrandTotal]);
      }, 0);

      setTotal(total);
      setGrandTotal(total);
    }
  }, [data, withGrandTotal]);

  return (
    <>
      <Table className="border-collapse table-auto">
        <Thead>
          <Tr className="text-sm leading-normal text-gray-800 uppercase bg-gray-300">
            {columns.map((column) => (
              <Th
                key={column.header}
                className={`px-6 py-3 ${
                  column.textAlign ? `text-${column.textAlign}` : "text-left"
                } `}
              >
                {column.header}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody className="text-sm font-light text-gray-700">
          {data?.length > 0 ? (
            data.map((row, rowIndex) => (
              <Tr
                key={rowIndex}
                className={`border-b border-gray-200 bg-gray-50 hover:bg-gray-100 `}
              >
                {columns.map((column) => (
                  <Td
                    key={column.header}
                    className={`px-6 py-3 ${
                      column.textAlign
                        ? `text-${column.textAlign}`
                        : "text-left"
                    }`}
                  >
                    {column.header === "No" ? (
                      <span>{rowIndex + 1}</span>
                    ) : column.accessor === "withdrawal_id" ? (
                      window.innerWidth < 768 ? (
                        <Link
                          href={`penarikan-saldo/detail/${
                            row[column.accessor]
                          }`}
                          className="text-button-color-teal hover:text-blue-700"
                        >
                          <>{row[column.accessor]}</>
                        </Link>
                      ) : (
                        <AlertDialog>
                          <AlertDialogTrigger className="text-button-color-teal hover:text-blue-700">
                            <>{row[column.accessor]}</>
                          </AlertDialogTrigger>
                        </AlertDialog>
                      )
                    ) : column.accessor === "purchase_id" ? (
                      window.innerWidth < 768 ? (
                        <Link
                          href={`pembelian/detail/${row[column.accessor]}`}
                          className="text-button-color-teal hover:text-blue-700"
                        >
                          <>{row[column.accessor]}</>
                        </Link>
                      ) : (
                        <AlertDialog>
                          <AlertDialogTrigger className="text-button-color-teal hover:text-blue-700">
                            <>{row[column.accessor]}</>
                          </AlertDialogTrigger>
                        </AlertDialog>
                      )
                    ) : column.accessor === "sale_admin_id" ? (
                      window.innerWidth < 768 ? (
                        <Link
                          href={`penjualan/detail/${row[column.accessor]}`}
                          className="text-button-color-teal hover:text-blue-700"
                        >
                          <>{row[column.accessor]}</>
                        </Link>
                      ) : (
                        <AlertDialog>
                          <AlertDialogTrigger className="text-button-color-teal hover:text-blue-700">
                            <>{row[column.accessor]}</>
                          </AlertDialogTrigger>
                        </AlertDialog>
                      )
                    ) : column.render ? (
                      column.render(row, rowIndex)
                    ) : (
                      <>{row[column.accessor]}</>
                    )}
                  </Td>
                ))}
              </Tr>
            ))
          ) : (
            <Tr className="border-b border-gray-200 bg-gray-50 hover:bg-gray-100">
              <Td colSpan={columns.length} className="px-6 py-3 text-center">
                No data found
              </Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    </>
  );
}
