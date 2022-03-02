import Header from "./header";
import MainBody from "./main-body";
import NavBar from "./nav-bar";
import styled from "styled-components";
import { colors } from "theme";

export const LayoutContainer = styled.div`
  height: 100vh;
  overflow: "scroll";
  background-color: ${colors.gray["700"]};
  display: grid;

  @media (max-width: 1000px) {
    grid-gap: 5px;
    /* grid-template-columns: 1fr 1fr 1fr 1fr; */
    /* grid-template-rows: 100px 100px 100px 100px; */
    /* Short record (rows / column) */
    grid-template: 80px 1000px/ 0vw 1fr 1fr 1fr;

    grid-template-areas:
      "b b b b"
      "a c c c";
  }
  @media (min-width: 1000px) {
    grid-gap: 5px;
    /* grid-template-columns: 1fr 1fr 1fr 1fr; */
    /* grid-template-rows: 100px 100px 100px 100px; */
    /* Short record (rows / column) */
    grid-template: 80px 1000px/ 170px 1fr 1fr 1fr;

    grid-template-areas:
      "b b b b"
      "a c c c";
  }
`;

export const navLinks = [
  { title: `Send Asset`, path: `/` },
  { title: `Send History`, path: `/send-history` },
  { title: `Redeem Asset`, path: `/redeem-asset` },
];

const Layout = ({ children }) => {
  return (
    <LayoutContainer>
      <Header />
      <NavBar navLinks={navLinks} />
      <MainBody>{children}</MainBody>
    </LayoutContainer>
  );
};

export default Layout;
