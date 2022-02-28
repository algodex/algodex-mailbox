import Link from "next/link";
import { NavBarContainer, NavBarMenu } from "./layout.css";

import NavBarItem from "./nav-bar-item";

const NavBar = () => {
  return (
    <NavBarContainer>
      <NavBarMenu>
        <NavBarItem>
          <Link href={"/"}>Send Asset</Link>
        </NavBarItem>
        <NavBarItem>
          <Link href={"/history"}>Send History</Link>
        </NavBarItem>
        <NavBarItem>
          <Link href={"/redeem-asset"}>Redeem Asset</Link>
        </NavBarItem>
      </NavBarMenu>
    </NavBarContainer>
  );
};

export default NavBar;
