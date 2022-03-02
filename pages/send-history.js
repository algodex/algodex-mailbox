import Layout from "@/components/layout";
import SendHistoryForm from "@/components/SendHistoryForm";
import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

const History = () => {
  const submitForm = async ({ formData }) => {
    console.log(formData);
    window.alert("Form Submitted, check console for the log of your values");
  };
  return (
    <Layout>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8} lg={6} xl={5}>
          <Typography variant="h5" sx={{ marginBottom: "1rem" }}>
            Send History
          </Typography>
          <SendHistoryForm onSubmit={submitForm} />
        </Grid>
      </Grid>
    </Layout>
  );
};

export default History;
