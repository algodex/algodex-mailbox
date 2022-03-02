import Link from "next/link";
import styled from "styled-components";
import { ReactSVG } from "react-svg";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { colors } from "theme";

export const IconLogo = styled(ReactSVG)`
  height: auto;
  width: 10rem;
`;

const Header = () => {
  const environment =
    process.env.NEXT_PUBLIC_ALGODEX_ENVIRONMENT || "public_test";
  const environmentText = environment == "production" ? "Mainnet" : "Testnet";

  return (
    <Box
      paddingLeft={"0.4rem"}
      paddingBlock="1rem"
      sx={{
        gridArea: "b",
        backgroundColor: colors.gray["000"],
      }}
    >
      <Link href="/">
        <IconLogo src="/algodex-logo.svg" style={{ cursor: "pointer" }} />
      </Link>
      <Typography
        variant="p"
        color={colors.blue[200]}
        fontStyle={"italic"}
        fontSize={"1.14rem"}
        paddingTop={5}
      >
        {environmentText}
      </Typography>
    </Box>
  );
};

export default Header;
