import { Typography } from '@material-ui/core';
import React from 'react';
import { Adornment } from '../../model';
import useStyles from './styles';
import DisplayHelper from '../../utils/displayHelper';

interface MyProps {
    text: string;
    value: number;
    adornment?: Adornment;
    decimals?: number;
}

const DataRow = (props: MyProps): JSX.Element => {
    const classes = useStyles(props);
    const { text, value, adornment, decimals } = props;

    return (
        <div className={classes.root}>
            <Typography variant="body1" classes={{ root: classes.text }}>
                {text}
            </Typography>
            <Typography variant="body1" classes={{ root: classes.value }}>
                {DisplayHelper.convertValueToDisplay(value, adornment, decimals)}
            </Typography>
        </div>
    );
};

export default DataRow;
