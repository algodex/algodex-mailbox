import {
  MainBodyContainer
} from './layout.css'

const MainBody = ({children}) => {

    return (
        <MainBodyContainer>
            {children}
        </MainBodyContainer>
    )
}

export default MainBody;