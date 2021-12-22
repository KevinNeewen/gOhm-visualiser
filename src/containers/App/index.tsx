import React, { useEffect } from 'react';
import { ethers } from 'ethers';
import sOhm from '../../abi/sOlympusERC20.sol/sOlympus.json';
import {
    SOlympus
} from '../../typechain/SOlympus'

const App = () => {

    useEffect(() => {

        async function makeEthCalls() {
            const provider = ethers.getDefaultProvider()
            const sOhmContract: SOlympus = new ethers.Contract("0x04906695D6D12CF5459975d7C3C03356E4Ccd460", sOhm.abi, provider) as SOlympus
            const rawResult = await sOhmContract.fromG(ethers.utils.parseEther('1'))
            console.log(rawResult.toNumber())
          }
      
        makeEthCalls()
    }, [])
    

    return <div>lol</div>;
};

export default App;
