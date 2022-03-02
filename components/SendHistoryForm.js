import React from "react";
import { MuiForm5 as Form } from "@rjsf/material-ui";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";

const SendHistoryForm = ({ onSubmit }) => {
  const schema = {
    required: ["assetId", "senderAddress"],
    properties: {
      assetId: { type: "string", title: "Asset Id", default: "" },
      senderAddress: { type: "string", title: "Sender Address", default: "" },
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
      "ui:options": {
        rows: 9,
      },
    },
  };

  return (
    <Form
      schema={schema}
      uiSchema={uiSchema}
      onSubmit={onSubmit}
      liveValidate={true}
    >
      <Button type="submit" variant="contained" sx={{ marginTop: "2rem" }}>
        Refresh
      </Button>
    </Form>
  );
};

SendHistoryForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
export default SendHistoryForm;
