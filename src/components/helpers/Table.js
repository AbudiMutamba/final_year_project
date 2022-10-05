import React from 'react'

import { useTable, useSortBy } from 'react-table'

export default function Table({columns,data}) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        footerGroups,
        rows,
        prepareRow,
        state,
    } = useTable ({
        columns,
        data
    },
        useSortBy
    )
    
    // const firstPageRows = rows.slice(0, 20)
    
  return (
    <div className="flex flex-col w-full px-10">
        <div className="-my-2 py-2 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8" >
            <div className="align-middle inline-block min-w-full shadow sm:rounded-lg border-b border-gray-200">
            <table className="min-w-full divide-y divide-gray-200" {...getTableBodyProps()} >
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())} className="px-6 py-3 bg-gray-50 text-left test-xs leading-4 font-meduim text-gray-500 uppercase tracking-wider">
                                    {column.render("Header")}
                                    <span>
                                        {column.isSorted
                                        ? column.isSortedDesc
                                            ? ' 🔽'
                                            : ' 🔼'
                                        : ''}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody className="bg-white divide-y divide-gray-200" {...getTableBodyProps()}>
                    {rows.map((row, i) => {
                        prepareRow(row)
                        return(
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return (
                                        <td 
                                            className="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-500" {...cell.getCellProps()}
                                            >
                                                {cell.render("Cell")}
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>
                <tfoot>
                    {footerGroups.map(group => (
                        <tr {...group.getFooterGroupProps()}>
                            {group.headers.map(column => (
                                <td {...column.getFooterProps()}>{column.render('Footer')}</td>
                            ))}
                        </tr>
                    ))}
                </tfoot>
            </table>
   
            </div>
        </div>
    </div>
    
  );
};
