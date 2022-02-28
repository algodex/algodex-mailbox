import {
  HeaderC,
  IconLogo
} from './layout.css'
import Link from 'next/link'

const Header = () => {
    const environment = process.env.NEXT_PUBLIC_ALGODEX_ENVIRONMENT || 'public_test';
    const environmentText = environment == 'production' ? 'Mainnet' : 
      'Testnet';

    return (
        <HeaderC>
          <div>
          <Link href='/'>
            <IconLogo src="/algodex-logo.svg" style={{cursor:'pointer'}}/>
          </Link>
          <div style={{whiteSpace: 'pre-wrap',
            marginLeft: 5, height: 20, paddingTop: 5,
            display: 'flex',
            'fontStyle': 'italic', 'fontSize': '14px', color:'blue'}}>
            <span>
            {environmentText}
            </span></div>
            </div>
        </HeaderC> 

    )
}

export default Header