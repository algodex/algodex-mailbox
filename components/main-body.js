import { useMemo, useState } from 'react'
import useMyAlgo from  '../hooks/use-my-algo'

import {
  MainBodyContainer
} from './layout.css'

const MainBody = ({children}) => {
    const [formattedAddresses, setFormattedAddresses] = useState(['']);

    const updateAddresses = (addresses) => {
          console.log('in updateAddresses');

      if (addresses == null) {
        return;
      }
      console.log({addresses});
      setFormattedAddresses(addresses);
    };

    const { connect, addresses } = useMyAlgo(updateAddresses)


    return (
        <MainBodyContainer>
            {children}
            <p></p>
            <button onClick={connect}>Connect Wallet</button>
            <p></p>
            <form name="addresses" id="addresses">
            <ul>
            {formattedAddresses.map( addr => {
                return <li key={addr}> <input type="radio" name="address" value={addr} />
                      <label>{addr}</label> </li>
            })}
            </ul>
            </form>
            
        </MainBodyContainer>
    )
}

export default MainBody;



