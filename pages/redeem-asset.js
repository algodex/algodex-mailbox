import React, { useState } from "react";
import { defaults } from "@/next-i18next.config";
import { useTranslation } from "next-i18next";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

// MUI Components
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

// Custom Components
import RedeemAssetForm from "@/components/RedeemAssetForm";
import Link from "@/components/Nav/Link";
const RedeemAssetsHelper = require("../lib/redeem_assets.js");

/**
 * Generate Static Properties
 * @param locale
 */
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [...defaults])),
    },
  };
}

/**
 * Redeem Asset page
 * @returns {JSX.Element}
 * @constructor
 */
export function RedeemAssetPage() {
  const { t } = useTranslation("common");
  const [actionStatus, setActionStatus] = useState({
    message: "Success/Error code here",
    success: false,
  });
  const submitForm = async ({ formData }) => {
    console.log(formData);

    await RedeemAssetsHelper.redeem(formData.assetId, formData.walletAddress);
  };

  return (
    <>
      <Head>
        <title>{`${t("/redeem-asset")} | ${t("app-title")}`}</title>
      </Head>
      <Container sx={{ my: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8} lg={6} xl={5}>
            <Typography variant="h5">{t("/redeem-asset")}</Typography>
            <RedeemAssetForm
              onSubmit={submitForm}
              actionStatus={actionStatus}
            />
            <Grid container spacing={7} sx={{ marginBottom: "2rem" }}>
              <Grid item>
                <Typography variant="p" component="p">
                  {t("balance")}:
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="p" component="p">
                  100 LAMP
                </Typography>
              </Grid>
            </Grid>

            <Grid container spacing={2} sx={{ marginTop: "2rem" }}>
              <Grid item xs={6} lg={5}>
                <Link href={"/instructions"}>
                  {t("view-instructions-link")}
                </Link>
              </Grid>
              <Grid item xs={6} lg={5}>
                <Link href={"/"}>{t("open-algoexplorer-link")}</Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default RedeemAssetPage;
