import React, { useEffect, useState } from 'react';
import { BigNumber, ethers } from 'ethers';
import sOhm from '../../abi/sOlympusERC20.sol/sOlympus.json';
import gOhm from '../../abi/gOHM.sol/gOHM.json';
import Staking from '../../abi/Staking.sol/OlympusStaking.json';
import { SOlympus } from '../../typechain/SOlympus';
import { GOHM } from '../../typechain/GOHM';
import { OlympusStaking } from '../../typechain/OlympusStaking';
import AppBar from '../../components/AppBar';
import { Container, Grid, Paper } from '@material-ui/core';
import useStyles from './styles';
import Header from '../../components/Header';
import Button from '../../components/Button';
import TextField from '../../components/TextField';

interface MyProps {}

const App = (props: MyProps) => {
    const classes = useStyles(props);
    const [rebaseYield, setRebaseYield] = useState(0); //these apy figures are fractions. x 100 for percentage
    const [fiveDayAPR, setFiveDayAPR] = useState(0);
    const [yearlyAPY, setYearlyAPY] = useState(0);
    const [sOhmBalance, setSOhmBalance] = useState(0);
    const [gOhmBalance, setGOhmBalance] = useState(0);
    const [totalSOhmBalance, setTotalSOhmBalance] = useState(0);

    useEffect(() => {
        async function getOhmRebaseInfo() {
            const provider = ethers.getDefaultProvider();
            const sOhmContract: SOlympus = new ethers.Contract(
                '0x04906695D6D12CF5459975d7C3C03356E4Ccd460',
                sOhm.abi,
                provider,
            ) as SOlympus;
            const stakingContract: OlympusStaking = new ethers.Contract(
                '0xB63cac384247597756545b500253ff8E607a8020',
                Staking.abi,
                provider,
            ) as OlympusStaking;

            const supply = (await sOhmContract.circulatingSupply()).toNumber()
            const distribute = (await stakingContract.epoch()).distribute.toNumber()
            const nextRebaseYield = distribute / supply

            setRebaseYield(nextRebaseYield)
            setFiveDayAPR(Math.pow(1 + nextRebaseYield, 5 * 3) - 1)
            setYearlyAPY(Math.pow(1 + nextRebaseYield, 365 * 3) - 1)
        }

        getOhmRebaseInfo();
    }, []);

    async function getBalanceInfo(address: string) {
        const provider = ethers.getDefaultProvider();
        const sOhmContract: SOlympus = new ethers.Contract(
            '0x04906695D6D12CF5459975d7C3C03356E4Ccd460',
            sOhm.abi,
            provider,
        ) as SOlympus;
        const gOhmContract: GOHM = new ethers.Contract(
            '0x0ab87046fBb341D058F17CBC4c1133F25a20a52f',
            gOhm.abi,
            provider,
        ) as GOHM;

        const sOhmBalanceRaw:BigNumber = await sOhmContract.balanceOf(address)
        const sOhmBalance = sOhmBalanceRaw.toNumber()/(10**9) // sOhm has 9 decimals
        setSOhmBalance(sOhmBalance)
        const gOhmBalanceRaw:BigNumber = await gOhmContract.balanceOf(address)
        const gOhmBalance = gOhmBalanceRaw.toNumber()/(10**18) // gOhm has 18 decimals
        setGOhmBalance(gOhmBalance)
        const sOhmFromGOhmRaw = await sOhmContract.fromG(gOhmBalanceRaw)
        const sOhmFromGOhm = sOhmFromGOhmRaw.toNumber()/(10**9)
        setTotalSOhmBalance(sOhmFromGOhm + sOhmBalance)
    }

    return (
        <Container //
            className={classes.root}
            maxWidth={false}
            disableGutters
        >
            <AppBar classes={{ root: classes.appBar }}></AppBar>
            <div className={classes.main}>
                <Paper className={classes.stakeView} elevation={0}>
                    <Grid //
                        container
                        direction="row"
                    >
                        <Grid item xs={12} style={{ marginBottom: '2rem' }}>
                            <Header classes={{ root: classes.header }} variant="h4">
                                gOHM Visuals
                            </Header>
                        </Grid>
                        <Grid item xs={12}>
                            <form className={classes.form} autoComplete="off">
                                <TextField id="address" />
                                <Button>Search</Button>
                            </form>
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        </Container>
    );
};

export default App;
