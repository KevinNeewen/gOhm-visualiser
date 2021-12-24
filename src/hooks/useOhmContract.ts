import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import sOhm from '../abi/sOlympusERC20.sol/sOlympus.json';
import Staking from '../abi/Staking.sol/OlympusStaking.json';
import SLP from '../abi/UniswapV2Pair.json';
import { SOlympus } from '../typechain/SOlympus';
import { OlympusStaking } from '../typechain/OlympusStaking';
import { UniswapV2Pair } from '../typechain/UniswapV2Pair';

const useOhmContract = () => {
    const [rebaseYield, setRebaseYield] = useState(0); //these apy figures are fractions. x 100 for percentage
    const [fiveDayAPR, setFiveDayAPR] = useState(0);
    const [yearlyAPY, setYearlyAPY] = useState(0);
    const [ohmPrice, setOhmPrice] = useState(0);
    const [gOhmIndex, setGOhmIndex] = useState(0);

    useEffect(() => {
        const getOhmRebaseInfo = async () => {
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
            const ohmPriceRaw = reserves[1].div(reserves[0]).toNumber();
            const gOhmIndexRaw = (await sOhmContract.index()).toNumber();

            setRebaseYield(nextRebaseYield);
            setFiveDayAPR(Math.pow(1 + nextRebaseYield, 5 * 3) - 1);
            setYearlyAPY(Math.pow(1 + nextRebaseYield, 365 * 3) - 1);
            setOhmPrice(ohmPriceRaw / 10 ** 9);
            setGOhmIndex(gOhmIndexRaw / 10 ** 9);
        };

        getOhmRebaseInfo();
    }, []);

    return {
        rebaseYield,
        fiveDayAPR,
        yearlyAPY,
        ohmPrice,
        gOhmIndex,
    };
};

export default useOhmContract;
