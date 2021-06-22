import React, { MouseEventHandler } from "react";
import { createStyles, lighten, makeStyles, Theme } from '@material-ui/core/styles';
import clsx from 'clsx';

import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';


const useToolbarStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(1),
        },
        highlight:
            theme.palette.type === 'light'
                ? {
                    color: theme.palette.secondary.main,
                    backgroundColor: lighten(theme.palette.secondary.light, 0.85),
                }
                : {
                    color: theme.palette.text.primary,
                    backgroundColor: theme.palette.secondary.dark,
                },
        title: {
            position: 'absolute',
            left: '0',
            width: '100%'
        },
        selectTitle: {
            flex: '1 1 16%',
            textAlign: 'left'
        }
    }),
);

interface EnhancedTableToolbarProps {
    numSelected: number;
    onDeleteClick: MouseEventHandler<unknown>;
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
    const classes = useToolbarStyles();
    const { numSelected, onDeleteClick } = props;

    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            <Typography className={classes.selectTitle} color="inherit" variant="subtitle1" component="div">
                {(numSelected > 0 ? `${numSelected} selected` : '')}
            </Typography>

            <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                Calculation History
            </Typography>


            <Tooltip title="Delete" >
                <div>
                    <IconButton disabled={numSelected === 0} onClick={onDeleteClick} aria-label="delete" >
                        <DeleteIcon />
                    </IconButton>
                </div>
            </Tooltip>
        </Toolbar>
    );
};

export default EnhancedTableToolbar;