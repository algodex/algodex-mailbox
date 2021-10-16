import {
  LayoutContainer
} from './layout.css'
import Header from './header'
import MainBody from './main-body'
import NavBar from './nav-bar'

const Layout = ({children}) => {

    return (
        <LayoutContainer>
              <Header/>
                <NavBar/>
                <MainBody>{children}</MainBody>
        </LayoutContainer>
    )
}

export default Layout;