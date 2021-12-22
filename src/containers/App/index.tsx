import React, { useEffect } from 'react';
import { ethers } from 'ethers';
import sOhm from '../../abi/sOlympusERC20.sol/sOlympus.json';
import { SOlympus } from '../../typechain/SOlympus';
import AppBar from '../../components/AppBar';
import { Container, Grid, Paper } from '@material-ui/core';
import useStyles from './styles';
import Header from '../../components/Header';
import Button from '../../components/Button';
import TextField from '../../components/TextField';

interface MyProps {}

const App = (props: MyProps) => {
    const classes = useStyles(props);

    useEffect(() => {
        async function makeEthCalls() {
            const provider = ethers.getDefaultProvider();
            const sOhmContract: SOlympus = new ethers.Contract(
                '0x04906695D6D12CF5459975d7C3C03356E4Ccd460',
                sOhm.abi,
                provider,
            ) as SOlympus;
            const rawResult = await sOhmContract.fromG(ethers.utils.parseEther('1'));
            console.log(rawResult.toNumber());
        }

        makeEthCalls();
    }, []);

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
