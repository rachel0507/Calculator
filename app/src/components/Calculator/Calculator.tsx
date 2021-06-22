import React from "react";
import { FormControl, Select, MenuItem } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import NumberFormatCustom from '../../common/react-number-format'
import { AxiosResponse } from "axios";

import {
    saveCalculation
} from "../../actions/calculatorApiActions";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        input: {
            margin: '5px'
        },
        select: {
            margin: '5px',

        },
        body: {
            margin: '30px'
        }
    })
);

export interface CalculatorProps {
    newCalculation: ICalculation,
    setState: any,
    onCalculationSave: (event: React.MouseEvent<unknown>, updatedRows: ICalculation[]) => void
}

export interface CalculatorState { }

const Calculator = (props: CalculatorProps) => {
    const { newCalculation, setState } = props;

    const classes = useStyles();

    //update form fields onChange
    const handleChange = (event: any) => {
        const { name, value } = event.target;
        setState((prevState: any) => {
            return {
                ...prevState,
                [name]: value,
            };
        });
    };

    //calc expression result and save calculation
    const handleSaveCalculation = (event: any) => {
        saveCalculation(newCalculation)
            .then((response: AxiosResponse<any>) => {
                const updatedRows: ICalculation[] = response.data;
                setState((prevState: ICalculation) => {
                    return {
                        ...prevState,
                        id: null,
                        result: updatedRows[0].result
                    };
                });
                props.onCalculationSave(event, updatedRows as ICalculation[]);
            })
    }

    return (
        <form className={classes.body} autoComplete="off">
            <TextField
                className={classes.input}
                id="num1"
                name="num1"
                required
                InputProps={{
                    inputComponent: NumberFormatCustom as any,
                }}
                value={newCalculation.num1 >= 0? newCalculation.num1 : ''}
                onChange={handleChange}
            />
            <FormControl>
                <Select
                    className={classes.select}
                    id="demo-simple-select"
                    name="oper"
                    value={newCalculation.oper || ''}
                    onChange={handleChange}
                >
                    <MenuItem value={1}>+</MenuItem>
                    <MenuItem value={2}>-</MenuItem>
                    <MenuItem value={3}>×</MenuItem>
                    <MenuItem value={4}>÷</MenuItem>
                </Select>
            </FormControl>
            <TextField
                className={classes.input}
                id="num2"
                name="num2"
                required
                InputProps={{
                    inputComponent: NumberFormatCustom as any,
                }}
                value={newCalculation.num2 >= 0? newCalculation.num2 : ''}
                onChange={handleChange}
            />
            <Button
                onClick={() => handleSaveCalculation(newCalculation)}
                color="primary"
                autoFocus
            >=</Button>
            <TextField
                className={classes.input}
                id="result"
                InputProps={{
                    readOnly: true,
                }}
                value={newCalculation.result >= 0? newCalculation.result : ''}>
            </TextField>
        </form>
    );
}

export default Calculator;
