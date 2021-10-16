import styled from 'styled-components'

export const LayoutContainer = styled.div`
  background-color: red;
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
    background-color: blue;
    grid-area: a;
`

export const HeaderC = styled.div`
    background-color: pink;
    grid-area: b;
`

export const MainBodyContainer = styled.div`
    background-color: green;
    grid-area: c;
`
