import { useMemo, useState, useEffect } from 'react'
import useMyAlgo from  '../hooks/use-my-algo'
const algodex =  require('@algodex/algodex-sdk')
const axios = require('axios')

import {
  MainBodyContainer
} from './layout.css'

const MainBody = ({children}) => {
    const [formattedAddresses, setFormattedAddresses] = useState(['']);
    const [algod, setAlgodClient] = useState();

    useEffect(() => {
      // Update the document title using the browser API
      const environment = process.env.NEXT_PUBLIC_ALGODEX_ENVIRONMENT || 'public_test';
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

    const cancelOrder = () => {
      const addr = document.getElementById('escrow-address').value;
      (async function(addr) {
        axios.get('https://testnet.algoexplorerapi.io/idx2/v2/transactions?address=' + addr)
        .then(function (response) {
          // handle success
          try {
            console.log(response.data.transactions[0]);
            const appArgs = response.data.transactions[0]['application-transaction']['application-args'];
            const appId = response.data.transactions[0]['application-transaction']['application-id'];
            const appArgsDecoded = appArgs.map( (arg) => Buffer.from(arg, 'base64').toString());
            if (appArgsDecoded[0] !== 'open') {
              throw 'first argument is not open';
            }
            const orderEntry = appArgsDecoded[1];
            const version = appArgsDecoded[2].charCodeAt(0);
            const ownerAddress = document.querySelector('input[name="owner-address"]:checked').value; 
            console.log({ownerAddress});

            algodex.closeOrderFromOrderBookEntry(algod, addr, ownerAddress,
                orderEntry, version); 
          } catch (e) {
            console.log('could not get app id or transactions ', {e});
          }
        });
      })(addr);
      
    };

    const header = (
      <div>
        <h1 style={{'fontSize': '18px'}}> Cancel Order </h1>
        <p></p>
        <button onClick={connect}>Connect Wallet</button>
        <p></p>
      </div>
    );

    if (addresses == null || addresses.length == 0) {
        return  (
          <MainBodyContainer>

            {children}
            {header}
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
            <p> </p>
            <button onClick={cancelOrder}>Cancel Order</button>

        </MainBodyContainer>
    )
}

export default MainBody;



