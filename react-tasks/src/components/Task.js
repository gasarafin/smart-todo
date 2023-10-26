// src/components/Task.js
import React, { useMemo, useState, useEffect } from 'react';
import { MaterialReactTable } from 'material-react-table';

    const Task = props => {
        const columns = useMemo(
          () => [
            {
              accessorKey: 'taskPriority.priorityID',
              header: 'Rank',
            },
            {
              accessorKey: 'userTask.taskName',
              header: 'Task Name',
            },
            {
              accessorKey: 'userTask.dueDate',
              header: 'Due Date',
            },
            {
              accessorKey: 'userTask.taskDetails',
              header: 'Task Details',
            },
            {
              accessorKey: 'userTask.gplaceID',
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
            {
              accessorKey: 'userTask.taskID',
              header: 'Task ID',
            },
          ], [],
        );

        const [tasks, setTasks] = props.functions;
        const [prior, setPrior] = useState();

    return (
        <MaterialReactTable
          autoResetPageIndex={false}
          columns={columns}
          data={tasks}
          enableRowNumbers
          rowNumberMode="static"
          enableRowOrdering
          enableSorting={false}

          enableColumnFilters={false}
          muiTableBodyRowDragHandleProps={({ table }) => ({
            onDragEnd: () => {
              const { draggingRow, hoveredRow } = table.getState();
              if (hoveredRow && draggingRow) {
                tasks.splice(
                  hoveredRow.index,
                  0,
                  tasks.splice(draggingRow.index, 1)[0],
                );

                console.log(`Task ID: ${hoveredRow}`)
                console.log(hoveredRow)
                console.log(`Old Rank: ${draggingRow.id}`)
                console.log(`New Rank: ${hoveredRow.id}`)


                setTasks([...tasks.map((task, index) => ({
                  ...task, taskPriority: task.taskPriority.map((taskPriority, index) => ({
                    taskPriority, priorityID: index+1

                  }))
                  
                   

               }))]);

              //   setTasks([...tasks.map((task, index) => ({
              //     ...task,
              //      priorityID: index+1

              //  }))]);

              
              }
            },
          })}
        />
    );
};

export default Task;