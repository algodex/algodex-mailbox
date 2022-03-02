import React from "react";
import { MuiForm5 as Form } from "@rjsf/material-ui";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import { colors } from "theme";

const SendAssetForm = ({ formattedAddresses, onSubmit }) => {
  const CustomSelectComponent = () => {
    return (
      <Box sx={{ marginBottom: "1rem" }}>
        <FormControl>
          <RadioGroup aria-labelledby="wallets" name="wallets">
            {[1, 2, 3, 4].map((address) => (
              <FormControlLabel
                key={address}
                value={address}
                control={<Radio color="secondary"/>}
                label={address}
              />
            ))}
          </RadioGroup>
        </FormControl>
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
    <Form
      schema={schema}
      disabled={formattedAddresses.length < 1}
      uiSchema={uiSchema}
      widgets={widgets}
      onSubmit={onSubmit}
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
  );
};

SendAssetForm.propTypes = {
  formattedAddresses: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSubmit: PropTypes.func.isRequired,
};
export default SendAssetForm;
