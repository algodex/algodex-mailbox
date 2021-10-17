import {
  NavBarContainer,
  NavBarMenu
} from './layout.css'

import NavBarItem from './nav-bar-item'

const NavBar = () => {

    return (
        <NavBarContainer>
          <NavBarMenu>
            <NavBarItem title='Connect' />
            <NavBarItem title='Stake' />
            <NavBarItem title='Create Pool' />
            <NavBarItem title='Configure Pool' />
          </NavBarMenu>
        </NavBarContainer>
    )
}

export default NavBar