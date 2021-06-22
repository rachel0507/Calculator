import React, { useReducer, useEffect } from "react";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import axios from "axios";
import reducer from "../../actions/calculatorReducer";

import EnhancedTableHead from "../tableHead/tableHead";
import EnhancedTableToolbar from "../tableToolbar/tableToolbar";

import {
  deleteCalculationById,
} from "../../actions/calculatorApiActions";

const URL = "https://localhost:44306";

const { forwardRef, useImperativeHandle } = React;

const initialState = {
  rows: [],
  loading: false
};

interface CalculationListProps {
  handleCalculationEdit: (event: React.MouseEvent<unknown>, row: ICalculation) => void
}

const CalculationList = forwardRef((props: CalculationListProps, ref) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => loadData());
  const { rows } = state;

  useImperativeHandle(ref, () => ({
    updateRows(updatedRows: ICalculation[]) {
      dispatch({
        type: "UPDATE_ROWS",
        payload: {
          rows: updatedRows
        },
      });
    }
  }));

  const loadData = () => {
    const { lastQuery, loading } = state;
    const query =   `${URL}/getCalculationList`;
    if (query !== lastQuery && !loading) {
      dispatch({ type: "FETCH_INIT" });
      axios
        .get(query)
        .then((response) => {
          dispatch({
            type: "UPDATE_ROWS",
            payload: {
              rows: response.data,
            },
          });
        })
        .catch(() => dispatch({ type: "REQUEST_ERROR" }));
      dispatch({ type: "UPDATE_QUERY", payload: query });
    }
  }

  function stableSort<ICalculation>(array: ICalculation[]) {
    const stabilizedThis = array.map((el: ICalculation, index) => [el, index] as [ICalculation, number]);
    return stabilizedThis.map((el) => el[0]);
  }

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        width: '40%',
        margin: 'auto'
      },
      paper: {
        width: '100%',
        marginBottom: theme.spacing(3),
        marginTop: theme.spacing(3),
      },
      visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
      },
    }),
  );

  const EnhancedTable = () => {
    const classes = useStyles();
    const [selected, setSelected] = React.useState<string[]>([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);


    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        const newSelecteds = rows.map((n: ICalculation) => n.id);
        setSelected(newSelecteds);
        return;
      }
      setSelected([]);
    };

    //select row on checkbox click
    const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
      const selectedIndex = selected.indexOf(id.toString());
      let newSelected: string[] = [];

      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, id);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1),
        );
      }

      setSelected(newSelected);
    };


    //delete a single or multiple calculations
    const handleCalculationDelete = (event: React.MouseEvent<unknown>, ids: string[]) => {
      deleteCalculationById(ids)
        .then((updatedRows) => {
          setSelected([]);
          dispatch({
            type: "UPDATE_ROWS",
            payload: {
              rows: updatedRows,
            },
          });
        })
        .catch(() => dispatch({ type: "REQUEST_ERROR" }));
    };

    //pagination functions
    const handleChangePage = (event: unknown, newPage: number) => {
      setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

    const isSelected = (id: string) => selected.indexOf(id) !== -1;

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
    
    //operators pipe
    const getOperString = (op: oper) => {
      switch (op) {
        case 1://add:
          return '+';
        case 2://sub:
          return '-';
        case 3://mul:
          return '×';
        case 4://div:
          return '÷';
      }
    }

    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <EnhancedTableToolbar
            numSelected={selected.length}
            onDeleteClick={(event) => handleCalculationDelete(event, selected)}
          />
          <TableContainer>
            <Table
              aria-labelledby="tableTitle"
              size="medium"
              aria-label="enhanced table"
            >
              <EnhancedTableHead
                numSelected={selected.length}
                onSelectAllClick={handleSelectAllClick}
                rowCount={rows.length}
              />
              <TableBody>
                {stableSort(rows)
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected((row as any).id || '');
                    const labelId = `enhanced-table-checkbox-${(row as any).id}`;
                    const actionDeleteId = `enhanced-table-action-delete-${(row as any).id}`;
                    const actionEditId = `enhanced-table-action-edit-${(row as any).id}`;
                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, (row as any).id || '')}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={(row as any).id}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isItemSelected}
                            inputProps={{ 'aria-labelledby': labelId }}
                          />
                        </TableCell>
                        <TableCell component="th" id={labelId} scope="row" padding="none">
                          {(row as any).num1} {getOperString((row as any).oper)} {(row as any).num2} = {(row as any).result}
                        </TableCell>
                        <TableCell component="th" id={actionDeleteId} scope="row" padding="none">
                          <Tooltip title="Delete" >
                            <div onClick={(event) => handleCalculationDelete(event, [(row as any).id || ''])}>
                              <IconButton aria-label="delete" >
                                <DeleteIcon />
                              </IconButton>
                            </div>
                          </Tooltip>
                        </TableCell>
                        <TableCell component="th" id={actionEditId} scope="row" padding="none">
                          <Tooltip title="Edit" >
                            <div onClick={(event) => props.handleCalculationEdit(event, row as ICalculation)}>
                              <IconButton aria-label="edit" >
                                <EditIcon />
                              </IconButton>
                            </div>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    );
  }

  return (<EnhancedTable></EnhancedTable>);
})

export default CalculationList;