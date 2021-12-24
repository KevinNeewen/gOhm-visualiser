import React, { useState } from 'react';
import { ethers } from 'ethers';
import sOhm from '../../abi/sOlympusERC20.sol/sOlympus.json';
import gOhm from '../../abi/gOHM.sol/gOHM.json';
import { SOlympus } from '../../typechain/SOlympus';
import { GOHM } from '../../typechain/GOHM';
import AppBar from '../../components/AppBar';
import { Container, Grid, Paper } from '@material-ui/core';
import useStyles from './styles';
import Header from '../../components/Header';
import _debounce from 'lodash/debounce';
import DataRows from './components/DataRows';
import WalletAddressSearchBar from './components/WalletAddressSearchBar';
import OhmPriceRow from './components/OhmPriceRow';
import useOhmContract from '../../hooks/useOhmContract';
import { GOHM_CONTRACT_ADDRESS, SOHM_CONTRACT_ADDRESS } from '../../constants';

interface MyProps {}

const App = (props: MyProps) => {
    const classes = useStyles(props);
    const [sOhmBalance, setSOhmBalance] = useState(0);
    const [gOhmBalance, setGOhmBalance] = useState(0);
    const [totalSOhmBalance, setTotalSOhmBalance] = useState(0);
    const [address, setAddress] = useState<string>(null);
    const [hasError, setHasError] = useState(false);
    const [isLoadingAddress, setIsLoadingAddress] = useState(false);

    const {
        //
        rebaseYield,
        fiveDayAPR,
        yearlyAPY,
        ohmPrice,
        gOhmIndex,
    } = useOhmContract();

    const getBalanceInfo = async (address: string) => {
        setIsLoadingAddress(true);
        const provider = ethers.getDefaultProvider();
        const sOhmContract: SOlympus = new ethers.Contract(SOHM_CONTRACT_ADDRESS, sOhm.abi, provider) as SOlympus;
        const gOhmContract: GOHM = new ethers.Contract(GOHM_CONTRACT_ADDRESS, gOhm.abi, provider) as GOHM;
        try {
            //Get Raw Balances
            const [sOhmBalanceRaw, gOhmBalanceRaw] = await Promise.all([
                sOhmContract.balanceOf(address),
                gOhmContract.balanceOf(address),
            ]);
            const sOhmFromGOhmRaw = await sOhmContract.fromG(gOhmBalanceRaw);

            //Format Balances
            const sOhmBalance = Number(ethers.utils.formatUnits(sOhmBalanceRaw, 9));
            const gOhmBalance = Number(ethers.utils.formatEther(gOhmBalanceRaw));
            const sOhmFromGOhm = Number(ethers.utils.formatUnits(sOhmFromGOhmRaw, 9));

            //Set Balances
            setSOhmBalance(sOhmBalance);
            setGOhmBalance(gOhmBalance);
            setTotalSOhmBalance(sOhmFromGOhm + sOhmBalance);
        } catch (e) {
            console.log(e);
            setHasError(true);
        } finally {
            setIsLoadingAddress(false);
        }
    };

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
                        <OhmPriceRow //
                            yearlyAPY={yearlyAPY}
                            ohmPrice={ohmPrice}
                            gOhmIndex={gOhmIndex}
                        />
                        <WalletAddressSearchBar //
                            onClickHandler={onClickHandler}
                            onChangeHandler={onChangeHandler}
                            hasError={hasError}
                            isLoading={isLoadingAddress}
                        />
                        <DataRows //
                            sOhmBalance={sOhmBalance}
                            gOhmBalance={gOhmBalance}
                            totalSOhmBalance={totalSOhmBalance}
                            rebaseYield={rebaseYield}
                            fiveDayAPR={fiveDayAPR}
                        />
                    </Grid>
                </Paper>
            </div>
        </Container>
    );
};

export default App;
