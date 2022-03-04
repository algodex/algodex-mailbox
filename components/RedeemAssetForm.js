import React from "react";
import { MuiForm5 as Form } from "@rjsf/material-ui";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";

const RedeemAssetForm = ({ onSubmit, actionStatus }) => {
  const schema = {
    required: ["assetId", "walletAddress"],
    properties: {
      assetId: { type: "string", title: "Asset Id" },
      walletAddress: { type: "string", title: "Wallet Address" },
    },
  };

  return (
    <Form schema={schema} onSubmit={onSubmit}>
      <Grid container spacing={2} marginTop={"2rem"} marginBottom={"2rem"}>
        <Grid item xs={6} lg={4}>
          <Button variant="contained" type="submit">
            Redeem
          </Button>
        </Grid>
        <Grid item xs={6}>
          {actionStatus.message != "" && (
            <Typography
              variant="error-message"
              color={actionStatus.success ? "green" : "error"}
            >
              {actionStatus.message}
            </Typography>
          )}
        </Grid>
      </Grid>
    </Form>
  );
};

RedeemAssetForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
export default RedeemAssetForm;
