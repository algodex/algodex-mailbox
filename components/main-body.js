import Box from "@mui/material/Box";
import { colors } from "theme";

const containerStyles = {
  height: "calc(100vh - 5.3rem)",
  overflow: "scroll",
  padding: "2rem 1rem",
  gridArea: "c",
  backgroundColor: colors.gray["000"],
};
const MainBody = ({ children }) => {
  return <Box sx={containerStyles}>{children}</Box>;
};

export default MainBody;
