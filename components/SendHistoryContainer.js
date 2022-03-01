import React from "react";
import { PageTitle, PageWrapper } from "./layout.css";
import { MuiForm5 as Form } from "@rjsf/material-ui";

const SendHistoryContainer = () => {
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
  const submitForm = async ({ formData }) => {
    console.log(formData);
    window.alert("Form Submitted, check console for the log of your values");
  };

  return (
    <PageWrapper className="w-fit">
      <PageTitle> Send History</PageTitle>
      <Form
        schema={schema}
        uiSchema={uiSchema}
        onSubmit={submitForm}
        liveValidate={true}
      >
        <button type="submit" style={{ marginTop: "2rem" }}>
          Refresh
        </button>
      </Form>
    </PageWrapper>
  );
};

export default SendHistoryContainer;
