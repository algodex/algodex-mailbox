import SendAssetForm from "@/components/SendAssetForm";
import Container from "@mui/material/Container";
import Layout from "../components/layout";
import { useCallback, useState } from "react";
import useMyAlgo from "../hooks/use-my-algo";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

export default function Home() {
  const [formattedAddresses, setFormattedAddresses] = useState([]);

  const updateAddresses = useCallback(
    (addresses) => {
      if (addresses == null) {
        return;
      }
      console.log({ addresses });
      setFormattedAddresses(addresses);
    },
    [setFormattedAddresses]
  );

  const { connect } = useMyAlgo(updateAddresses);
  const submitForm = async ({ formData }) => {
    console.log(formData);
    window.alert("Form Submitted, check console for the log of your values");
  };
  return (
    <Layout>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8} lg={6} xl={5}>
          <Typography variant="h5" sx={{ marginBottom: "1rem" }}>
            Send Asset
          </Typography>
          <Button variant="contained" onClick={connect}>
            Connect Wallet
          </Button>
          <SendAssetForm
            formattedAddresses={formattedAddresses}
            onSubmit={submitForm}
          />
        </Grid>
      </Grid>
    </Layout>
  );
}
