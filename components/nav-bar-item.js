import {
  NavBarItemC
} from './layout.css'

const NavBarItem = (props) => {

    return (
        <NavBarItemC>
            {props.title}
        </NavBarItemC>
    )
}

export default NavBarItem