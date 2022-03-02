import Layout from "@/components/layout";
import RedeemAssetForm from "@/components/RedeemAssetForm";
import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Link from "next/link";

const RedeemAsset = () => {
  const submitForm = async ({ formData }) => {
    console.log(formData);
    window.alert("Form Submitted, check console for the log of your values");
  };
  return (
    <Layout>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8} lg={6} xl={5}>
          <Typography variant="h5"> Redeem Asset</Typography>
          <RedeemAssetForm onSubmit={submitForm} />
          <Grid container spacing={7} sx={{ marginBottom: "2rem" }}>
            <Grid item>
              <Typography variant="p" fontWeight="500">
                Balance:
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="p" fontSize={"1.2rem"} fontWeight="500">
                100 LAMP
              </Typography>
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ marginTop: "2rem" }}>
            <Grid item xs={6} lg={5}>
              <Link href={"/instructions"}>View Instructions</Link>
            </Grid>
            <Grid item xs={6} lg={5}>
              <Link href={"/"}>Open AlgoExplorer</Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default RedeemAsset;
