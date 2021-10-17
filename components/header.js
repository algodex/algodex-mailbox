import {
  HeaderC,
  IconLogo
} from './layout.css'
import Link from 'next/link'

const Header = () => {

    return (
        <HeaderC>
          <Link href='/'>
            <IconLogo src="/algodex-logo.svg" style={{cursor:'pointer'}}/>
          </Link>
        </HeaderC>
    )
}

export default Header