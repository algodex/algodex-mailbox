import React from "react";
import { MuiForm5 as Form } from "@rjsf/material-ui";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";

const SendAssetForm = ({ formattedAddresses, onSubmit }) => {
  const CustomSelectComponent = (props) => {
    return (
      <Box sx={{ marginBottom: "1rem" }}>
        <FormControl>
          <RadioGroup aria-labelledby="wallet" name="wallet" 
            onChange={(event, value) => props.onChange(value)}>
            {formattedAddresses.map((address) => (
              <FormControlLabel
                key={address}
                value={address}
                control={<Radio color="secondary" />}
                label={address}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </Box>
    );
  };

  const schema = {
    required: ["assetId", "csvTransactions", "wallet"],
    properties: {
      wallet: { type: "string", title: "wallet", default: "" },
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
    wallet: {
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
