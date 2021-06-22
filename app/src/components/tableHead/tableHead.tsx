import React from "react";
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';


interface EnhancedTableHeadProps {
    numSelected: number;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    rowCount: number;
  }

  const EnhancedTableHead = (props: EnhancedTableHeadProps) => {
    const { onSelectAllClick, numSelected, rowCount } = props;

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{ 'aria-label': 'select all desserts' }}
            />
          </TableCell>

          <TableCell
            align={'left'}
            padding={'default'}
            sortDirection={false}
          >
          </TableCell>

          <TableCell
            align={'left'}
            padding={'default'}
            sortDirection={false}
          >
          </TableCell>

          <TableCell
            align={'left'}
            padding={'default'}
            sortDirection={false}
          >
          </TableCell>

        </TableRow>
      </TableHead>
    );
  }

  export default EnhancedTableHead;
