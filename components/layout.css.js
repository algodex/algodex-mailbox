import styled from 'styled-components'
import { ReactSVG } from 'react-svg'

export const LayoutContainer = styled.div`
  background-color: #555;
  display: grid;
  grid-gap:5px;
  /* grid-template-columns: 1fr 1fr 1fr 1fr; */
  /* grid-template-rows: 100px 100px 100px 100px; */
  /* Short record (rows / column) */
  grid-template: 80px 1000px/ 200px 1fr 1fr 1fr;
  grid-template-areas: 
    "b b b b"
    "a c c c"
    ;
`

export const NavBarContainer = styled.div`
    background-color: #DDD;
    grid-area: a;
`


export const NavBarMenu = styled.div`
    background-color: #CCC;
    display: flex;
    flex-wrap: wrap;
`

export const HeaderC = styled.div`
    background-color: #EEE;
    grid-area: b;
    display: flex;
    justify-content: left;
    align-items: center;
`
export const NavBarItemC = styled.div`
    background-color: #FFF;
    grid-area: b;
    display: flex;
    justify-content: center;
    align-items: center;  
    width: 100%;
    line-height: 4vh;
    cursor: pointer;
`


export const MainBodyContainer = styled.div`
    background-color: #FFF;
    grid-area: c;
    padding-left: 1rem;
`

export const IconLogo = styled(ReactSVG)`
  height: auto;
  width: 10rem;
  padding-left: 0.4rem;
  @media (min-width: 1024px) {
    
  }
`


