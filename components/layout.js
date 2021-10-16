import {
  LayoutContainer
} from './layout.css'
import Header from './header'
import MainBody from './main-body'
import NavBar from './nav-bar'

const Layout = () => {

    return (
        <LayoutContainer>
              <Header></Header>
                <NavBar></NavBar>
                <MainBody></MainBody>
        </LayoutContainer>
    )
}

export default Layout;