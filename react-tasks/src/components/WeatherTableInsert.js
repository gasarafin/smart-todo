// src/components/WeatherTableInsert.js

import React, { useMemo, useState } from 'react';


import { MaterialReactTable } from 'material-react-table';




function WeatherTableInsert() {
  const columns = useMemo(
    () => [
      {
        accessorKey: 'taskName',
        header: 'Task Name',
      },
      {
        accessorKey: 'dueDate',
        header: 'Due Date',
      },
      {
        accessorKey: 'taskDetails',
        header: 'Task Details',
      },
      {
        accessorKey: 'gPlaceName',
        header: 'Task Location',
      },
      {
        accessorKey: 'taskCommute',
        header: 'Commute Time',
      },
      {
        accessorKey: 'taskWeather',
        header: 'Task Weather',
      },
    ], [],
  );



  return (
    <>
      <MaterialReactTable
        autoResetPageIndex={false}
        columns={columns}
        data={null}
        enableRowNumbers
        rowNumberMode="static"
        enableRowOrdering
        enableSorting={false}
        enableColumnFilters={false}
        enableRowActions

        




        
      />
    </>
  );
};

export default WeatherTableInsert;