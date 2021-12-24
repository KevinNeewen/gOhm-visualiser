import React from 'react';
import { Grid } from '@material-ui/core';
import { Adornment } from '../../../../constants';
import Metric from '../../../../components/Metric';

interface MyProps {
    yearlyAPY: number;
    ohmPrice: number;
    gOhmIndex: number;
}

const OhmPriceRow = (props: MyProps): JSX.Element => {
    const { yearlyAPY, ohmPrice, gOhmIndex } = props;

    return (
        <Grid container style={{ marginBottom: '4rem' }}>
            <Grid item xs={4}>
                <Metric title="APY" metric={yearlyAPY} adornment={Adornment.Percentage} />
            </Grid>
            <Grid item xs={4}>
                <Metric title="sOHM Price" metric={ohmPrice} adornment={Adornment.Dollar} />
            </Grid>
            <Grid item xs={4}>
                <Metric title="gOHM Price" metric={ohmPrice * gOhmIndex} adornment={Adornment.Dollar} />
            </Grid>
        </Grid>
    );
};

export default OhmPriceRow;
