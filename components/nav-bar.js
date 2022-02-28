import Link from "next/link";
import { NavBarContainer, NavBarMenu } from "./layout.css";

import NavBarItem from "./nav-bar-item";

const NavBar = () => {
  return (
    <NavBarContainer>
      <NavBarMenu>
        <NavBarItem>
          <Link href={"/"}>
            <div>Send Asset</div>
          </Link>
        </NavBarItem>
        <NavBarItem>
          <Link href={"/history"}>
            <div>Send History</div>
          </Link>
        </NavBarItem>
        <NavBarItem>
          <Link href={"/redeem-asset"}>
            <div>Redeem Asset</div>
          </Link>
        </NavBarItem>
      </NavBarMenu>
    </NavBarContainer>
  );
};

export default NavBar;
