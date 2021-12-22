import React, { useEffect } from 'react';
import { ethers } from 'ethers';
import sOhm from '../../abi/sOlympusERC20.sol/sOlympus.json';
import { SOlympus } from '../../typechain/SOlympus';
import AppBar from '../../components/AppBar';
import Header from '../../components/Header';
import { Container, WithStyles, withStyles } from '@material-ui/core';
import styles from './styles';

interface MyProps extends WithStyles<typeof styles> {}

const App = (props: MyProps) => {
    const { classes } = props;

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
            <AppBar>
                <Header variant="h4">GOHM VISUALS</Header>
            </AppBar>
            <div className={classes.main}>Main screen</div>
        </Container>
    );
};

export default withStyles(styles)(App);
