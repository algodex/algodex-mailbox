import { useMemo, useState } from 'react'
import useMyAlgo from  '../hooks/use-my-algo'

import {
  MainBodyContainer
} from './layout.css'

const MainBody = ({children}) => {
    const [formattedAddresses, setFormattedAddresses] = useState('');

    const updateAddresses = (addresses) => {
          console.log('in updateAddresses');

      if (addresses == null) {
        return;
      }
      const formatted = addresses.reduce( (sum, address) => {return sum + <br> </br> + address}, '');
      console.log(formatted);
      setFormattedAddresses(formatted);
    };

    const { connect, addresses } = useMyAlgo(updateAddresses)


    return (
        <MainBodyContainer>
            {children}
            <p></p>
            <button onClick={connect}>Connect Wallet</button>
            <p>{formattedAddresses}</p>
        </MainBodyContainer>
    )
}

export default MainBody;



