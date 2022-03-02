import Container from "@mui/material/Container";
import { colors } from "theme";

const containerStyles = {
  height: "calc(100vh - 5.3rem)",
  overflow: "scroll",
  padding: "2rem 1rem",
  gridArea: "c",
  backgroundColor: colors.gray["000"],
};
const MainBody = ({ children }) => {
  return <Container sx={containerStyles}>{children}</Container>;
};

export default MainBody;
