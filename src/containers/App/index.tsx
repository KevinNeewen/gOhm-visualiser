import React, { useEffect, useState } from 'react';
import { BigNumber, ethers } from 'ethers';
import sOhm from '../../abi/sOlympusERC20.sol/sOlympus.json';
import gOhm from '../../abi/gOHM.sol/gOHM.json';
import Staking from '../../abi/Staking.sol/OlympusStaking.json';
import SLP from '../../abi/UniswapV2Pair.json'
import { SOlympus } from '../../typechain/SOlympus';
import { GOHM } from '../../typechain/GOHM';
import { OlympusStaking } from '../../typechain/OlympusStaking';
import { UniswapV2Pair } from '../../typechain/UniswapV2Pair';
import AppBar from '../../components/AppBar';
import { Container, Grid, Paper, Button, TextField, Typography, Divider } from '@material-ui/core';
import useStyles from './styles';
import Header from '../../components/Header';
import Metric from '../../components/Metric';
import DataRow from '../../components/DataRow';
import { Adornment } from '../../model';
import _debounce from 'lodash/debounce';

interface MyProps {}

const App = (props: MyProps) => {
    const classes = useStyles(props);
    const [rebaseYield, setRebaseYield] = useState(0); //these apy figures are fractions. x 100 for percentage
    const [fiveDayAPR, setFiveDayAPR] = useState(0);
    const [yearlyAPY, setYearlyAPY] = useState(0);
    const [ohmPrice, setOhmPrice] = useState(0);
    const [gOhmIndex, setGOhmIndex] = useState(0);
    const [sOhmBalance, setSOhmBalance] = useState(0);
    const [gOhmBalance, setGOhmBalance] = useState(0);
    const [totalSOhmBalance, setTotalSOhmBalance] = useState(0);
    const [address, setAddress] = useState<string>(null);
    const [hasError, setHasError] = useState(false);

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
            const ohmDaiSlpContract: UniswapV2Pair = new ethers.Contract(
                '0x055475920a8c93CfFb64d039A8205F7AcC7722d3',
                SLP.abi,
                provider,
            ) as UniswapV2Pair;

            const supply = (await sOhmContract.circulatingSupply()).toNumber();
            const distribute = (await stakingContract.epoch()).distribute.toNumber();
            const nextRebaseYield = distribute / supply;
            const reserves = await ohmDaiSlpContract.getReserves();
            const ohmPriceRaw = reserves[1].div(reserves[0]).toNumber()
            const gOhmIndexRaw = (await sOhmContract.index()).toNumber()

            setRebaseYield(nextRebaseYield);
            setFiveDayAPR(Math.pow(1 + nextRebaseYield, 5 * 3) - 1);
            setYearlyAPY(Math.pow(1 + nextRebaseYield, 365 * 3) - 1);
            setOhmPrice(ohmPriceRaw / (10**9));
            setGOhmIndex(gOhmIndexRaw / (10**9))
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
        try {
            const sOhmBalanceRaw: BigNumber = await sOhmContract.balanceOf(address);
            const sOhmBalance = Number(ethers.utils.formatUnits(sOhmBalanceRaw, 9))
            setSOhmBalance(sOhmBalance);
            const gOhmBalanceRaw: BigNumber = await gOhmContract.balanceOf(address);
            const gOhmBalance = Number(ethers.utils.formatEther(gOhmBalanceRaw));
            setGOhmBalance(gOhmBalance);
            const sOhmFromGOhmRaw = await sOhmContract.fromG(gOhmBalanceRaw);
            const sOhmFromGOhm = Number(ethers.utils.formatUnits(sOhmFromGOhmRaw, 9))
            setTotalSOhmBalance(sOhmFromGOhm + sOhmBalance);
        } catch (e) {
            console.log(e)
            setHasError(true);
        }
    }

    const onChangeHandler = _debounce((event: React.ChangeEvent<HTMLInputElement>) => {
        setHasError(false);
        setAddress(event.target.value);
    }, 200);

    const onClickHandler = () => {
        getBalanceInfo(address);
    };

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
                        <Grid item xs={12} style={{ marginBottom: '4rem' }}>
                            <Typography classes={{ root: classes.walletAddressLabel }} variant="h6">
                                Wallet Address
                            </Typography>
                            <div className={classes.searchBar}>
                                <TextField //
                                    id="address"
                                    variant="outlined"
                                    placeholder=""
                                    onChange={onChangeHandler}
                                />
                                <Button onClick={onClickHandler}>Enter Address</Button>
                            </div>
                            {hasError && (
                                <div style={{ position: 'relative' }}>
                                    <Typography variant="body1" classes={{ root: classes.errorMessage }}>
                                        Failed to retrieve wallet address. Please try again.
                                    </Typography>
                                </div>
                            )}
                        </Grid>
                        <div className={classes.dataRows}>
                            <DataRow text="sOhm Balance" value={sOhmBalance} adornment={Adornment.SOhm} />
                            <DataRow text="gOhm Balance" value={gOhmBalance} adornment={Adornment.GOhm} />
                            <DataRow text="Total sOhm Balance" value={totalSOhmBalance} adornment={Adornment.SOhm} />
                            <Divider />
                            <DataRow text="Next Reward Amount" value={rebaseYield * totalSOhmBalance} adornment={Adornment.SOhm} />
                            <DataRow text="Next Reward Yield" value={rebaseYield} adornment={Adornment.Percentage} />
                            <DataRow text="ROI (5-Day Rate)" value={fiveDayAPR} adornment={Adornment.Percentage} />
                        </div>
                    </Grid>
                </Paper>
            </div>
        </Container>
    );
};

export default App;
