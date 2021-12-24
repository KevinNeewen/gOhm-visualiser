import React from 'react';
import { Divider } from '@material-ui/core';
import DataRow from '../../../../components/DataRow';
import { Adornment } from '../../../../constants';
import useStyles from './styles';

interface MyProps {
    sOhmBalance: number;
    gOhmBalance: number;
    totalSOhmBalance: number;
    rebaseYield: number;
    fiveDayAPR: number;
}

const DataRows = (props: MyProps): JSX.Element => {
    const classes = useStyles(props);
    const { sOhmBalance, gOhmBalance, totalSOhmBalance, rebaseYield, fiveDayAPR } = props;

    return (
        <div className={classes.root}>
            <DataRow text="sOhm Balance" value={sOhmBalance} adornment={Adornment.SOhm} />
            <DataRow text="gOhm Balance" value={gOhmBalance} adornment={Adornment.GOhm} />
            <DataRow text="Total sOhm Balance" value={totalSOhmBalance} adornment={Adornment.SOhm} />
            <Divider />
            <DataRow text="Next Reward Amount" value={rebaseYield * totalSOhmBalance} adornment={Adornment.SOhm} />
            <DataRow text="Next Reward Yield" value={rebaseYield} adornment={Adornment.Percentage} decimals={4} />
            <DataRow text="ROI (5-Day Rate)" value={fiveDayAPR} adornment={Adornment.Percentage} decimals={4} />
        </div>
    );
};

export default DataRows;
