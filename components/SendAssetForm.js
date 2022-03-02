import Link from "next/link";
import React from "react";
import { MuiForm5 as Form } from "@rjsf/material-ui";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";

const SendAssetForm = ({ formattedAddresses, onSubmit }) => {
  const CustomSelectComponent = () => {
    return (
      <Box sx={{ marginBottom: "2rem" }}>
        {formattedAddresses.map((address) => (
          <FormControl key={address}>
            <RadioGroup aria-labelledby={address} name="wallets">
              <FormControlLabel
                value={address}
                control={<Radio />}
                label={address}
              />
            </RadioGroup>
          </FormControl>
        ))}
      </Box>
    );
  };

  const schema = {
    required: ["assetId", "csvTransactions", "wallets"],
    properties: {
      wallets: { type: "string", title: "Wallets", default: "" },
      assetId: { type: "string", title: "Asset Id", default: "" },
      csvTransactions: {
        type: "string",
        title: "CSV Transactions",
        default: "",
      },
    },
  };

  const uiSchema = {
    csvTransactions: {
      "ui:widget": "textarea",
      "ui:placeholder": "Enter CSV Transactions",
      "ui:options": {
        rows: 9,
      },
    },
    wallets: {
      "ui:widget": "CustomSelect",
    },
  };

  const widgets = {
    CustomSelect: CustomSelectComponent,
  };

  return (
    <>
      {/* {formattedAddresses.length > 0 && (
        <Box sx={{ marginBottom: "2rem" }}>
          {formattedAddresses.map((address) => (
            <FormControl>
              <RadioGroup aria-labelledby={address} name="wallets">
                <FormControlLabel
                  value={address}
                  control={<Radio />}
                  label={address}
                />
              </RadioGroup>
            </FormControl>
          ))}
        </Box>
      )} */}
      <Form
        schema={schema}
        disabled={formattedAddresses.length < 1}
        uiSchema={uiSchema}
        widgets={widgets}
        onSubmit={onSubmit}
        liveValidate={true}
      >
        <Button
          variant="contained"
          xs={{ marginBottom: "2rem" }}
          disabled={formattedAddresses.length < 1}
          type="submit"
        >
          Send Assets
        </Button>
      </Form>

      <Grid container spacing={2} sx={{ marginTop: "2rem" }}>
        <Grid item xs={6} lg={5} className="mr-2">
          <Link href={"/instructions"}>View Instructions</Link>
        </Grid>
        <Grid item xs={6} lg={5}>
          <Link href={"/downloadlink"}>Download CSV Example</Link>
        </Grid>
      </Grid>
    </>
  );
};

SendAssetForm.propTypes = {
  formattedAddresses: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSubmit: PropTypes.func.isRequired,
};
export default SendAssetForm;
