import {
  NavBarContainer,
  NavBarMenu
} from './layout.css'

import NavBarItem from './nav-bar-item'

const NavBar = () => {

    return (
        <NavBarContainer>
          <NavBarMenu>
            <NavBarItem title='Cancel Order' />
          </NavBarMenu>
        </NavBarContainer>
    )
}

export default NavBar