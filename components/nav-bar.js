import Grid from "@mui/material/Grid";
import NavBarItem from "./nav-bar-item";
import { colors } from "theme";

const containerStyles = {
  height: "calc(100vh - 5.3rem)",
  gridArea: "a",
  padding: "1rem",
  backgroundColor: colors.gray["000"],
  marginTop: 0,
};
const NavBar = ({ navLinks }) => {
  return (
    <Grid container direction="column" spacing={4} sx={containerStyles}>
      {navLinks.map(({ title, path }, i) => (
        <NavBarItem
          key={`${title}${i}`}
          href={path}
          variant="button"
          sx={{
            color: "primary",
            opacity: 0.9,
            textDecoration: "none",
            padding: "0.6rem 1.5rem 0",
          }}
        >
          {title}
        </NavBarItem>
      ))}
    </Grid>
  );
};

export default NavBar;
