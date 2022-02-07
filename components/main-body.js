import { useMemo, useState, useEffect } from 'react'
import useMyAlgo from  '../hooks/use-my-algo'

const algodex =  require('@algodex/algodex-sdk')
const axios = require('axios')

const environment = process.env.NEXT_PUBLIC_ALGODEX_ENVIRONMENT || 'public_test';
const isProduction = environment.toLowerCase() === 'production';

import {
  MainBodyContainer
} from './layout.css'

const MainBody = ({children}) => {
    const [formattedAddresses, setFormattedAddresses] = useState(['']);
    const [algod, setAlgodClient] = useState();
    const [submissionInfo, setSubmissionInfo] = useState();
    const [submissionStyle, setSubmissionStyle] = useState();

    const errorStyle = {
      color: 'red',
    };
    const successStyle = {
      color: 'green',
    };
    const neutralStyle = {
      color: 'blue',
    };

    useEffect(() => {
      // Update the document title using the browser API
      console.log({environment});
      algodex.initIndexer(environment);
      setAlgodClient(algodex.initAlgodClient(environment));
    }, []);
    const updateAddresses = (addresses) => {
          console.log('in updateAddresses');

      if (addresses == null) {
        return;
      }

      console.log({addresses});
      setFormattedAddresses(addresses);
    };

    const { connect, addresses } = useMyAlgo(updateAddresses)

    function hexToBytes(hex) {
        for (var bytes = [], c = 0; c < hex.length; c += 2)
            bytes.push(parseInt(hex.substr(c, 2), 16));
        return bytes;
    }

    const getFirstArg = (appArgs) => {
        const appArgsDecoded = appArgs.map( (arg) => Buffer.from(arg, 'base64').toString());
        return appArgsDecoded[0];
    }
    const cancelOrder = (environment) => {
      const addr = document.getElementById('escrow-address').value;
      const algoIndexerLink = isProduction ? 'https://algoindexer.algoexplorerapi.io' :
          'https://algoindexer.testnet.algoexplorerapi.io';
      (async function(addr) {
        try {
          const response = await axios.get(algoIndexerLink + '/v2/transactions?address=' + addr)

          // Find the transaction with appArgs
          let txNum = -1;
          for (let i = 0; i < response.data.transactions.length; i++) {
            if (response.data.transactions[i]['application-transaction']
              && getFirstArg(response.data.transactions[i]['application-transaction']['application-args'])
                === 'open')
            {
              txNum = i;
              break;
            }
          }
          if (txNum === -1) {
            throw 'Could not find open transaction!';
          }
          // handle success
          const appArgs = response.data.transactions[txNum]['application-transaction']['application-args'];
          const appArgsDecoded = appArgs.map( (arg) => Buffer.from(arg, 'base64').toString());

          if (getFirstArg(appArgs) !== 'open') {
            throw 'first argument is not open';
          }
          const orderEntry = appArgsDecoded[1];
          const version = appArgsDecoded[2].charCodeAt(0);
          const ownerAddress = document.querySelector('input[name="owner-address"]:checked').value; 
          try {
            setSubmissionInfo(`Canceling, please wait...`);
            setSubmissionStyle(neutralStyle);
            console.debug( {algod, addr, ownerAddress,
              orderEntry, version});

            const confirmation = await algodex.closeOrderFromOrderBookEntry(algod, addr, ownerAddress,
              orderEntry, version); 
            setSubmissionInfo(`Cancelled order for ${addr} ! `);
            setSubmissionStyle(successStyle);
          } catch (e) {
              setSubmissionInfo(`Could not cancel order for ${addr} !`);
              setSubmissionStyle(errorStyle);
          }

        } catch (e) {
          console.log('could not get app id or transactions ', {e});
          setSubmissionInfo(`${addr} not found! Could not find orderbook transactions. Please confirm on Algoexplorer`);
          setSubmissionStyle(errorStyle);
          return;
        }

      })(addr);
      
    };

    const instructionsImg = environment == 'production' ? '/instructions-mainnet.jpg' : 
      '/instructions-testnet.jpg';

    const algoExplorerLink = isProduction ? 'https://algoexplorer.io' : 'https://testnet.algoexplorer.io/';
    const myAlgoLink = 'https://wallet.myalgo.com/';

    const header = (
      <div>
        <h1 style={{'fontSize': '18px'}}> Cancel Order 
           </h1> 
        <p></p>
        <button onClick={connect}>Connect Wallet</button>
        <p></p>
      </div>
    );
    
    const instructions = (
      <div>
        <p><i>First connect your wallet. Then enter the escrow address where your order is stored. You can find this on  
            &nbsp;<a href={algoExplorerLink}>AlgoExplorer</a> or <a href={myAlgoLink}>My Algo Wallet</a>. 
            <p> </p><a href='/instructions-testnet.jpg' target="_blank">
              View Instructions</a></i></p>
           
      </div>
    );
    if (addresses == null || addresses.length == 0) {
        return  (
          <MainBodyContainer>

            {children}
            {header}
            {instructions}

          </MainBodyContainer>
        )
    }
    return (
        <MainBodyContainer>
            {children}
            {header}
            <form name="addresses" id="addresses">
            <ul>
            {formattedAddresses.map( addr => {
                return <li key={addr}> <input type="radio" name="owner-address" value={addr} />
                      <label>{addr}</label> </li>
            })}
            </ul>
            <label htmlFor='escrow-address'>Order Escrow Address:</label> 
                <input type='text' name='escrow-address' id='escrow-address' size='70'></input>

            </form>
            {instructions}
            <button onClick={cancelOrder}>Cancel Order</button>
            <p style={submissionStyle}>{submissionInfo}</p>
        </MainBodyContainer>
    )
}

export default MainBody;



