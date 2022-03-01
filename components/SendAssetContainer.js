import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { PageTitle, PageWrapper } from "./layout.css";
import { useState, useEffect } from "react";
import useMyAlgo from "../hooks/use-my-algo";
import { MuiForm5 as Form } from "@rjsf/material-ui";

const algodex = require("@algodex/algodex-sdk");
const environment =
  process.env.NEXT_PUBLIC_ALGODEX_ENVIRONMENT || "public_test";
const isProduction = environment.toLowerCase() === "production";

const ButtonWrapper = styled.div`
  margin-right: 2rem;
`;
const TextAreaWrapper = styled.div`
  margin-block: 2rem;
`;

const RadioLabel = styled.label`
  cursor: pointer;
`;
const SendAssetContainer = () => {
  const [formattedAddresses, setFormattedAddresses] = useState([""]);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [algod, setAlgodClient] = useState();

  const errorStyle = {
    color: "red",
  };
  const successStyle = {
    color: "green",
  };
  const neutralStyle = {
    color: "blue",
  };

  useEffect(() => {
    // Update the document title using the browser API
    algodex.initIndexer(environment);
    setAlgodClient(algodex.initAlgodClient(environment));
    setPageLoaded(true);
  }, []);

  const updateAddresses = (addresses) => {
    if (addresses == null) {
      return;
    }

    console.log({ addresses });
    setFormattedAddresses(addresses);
  };

  const { connect, addresses } = useMyAlgo(updateAddresses);

  const schema = {
    required: ["assetId", "csvTransactions"],
    properties: {
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
      "ui:placeholder": pageLoaded ? "Enter CSV Transactions" : "",
      "ui:options": {
        rows: 9,
      },
    },
  };

  const submitForm = async ({ formData }) => {
    window.alert("Form Submitted, check console for the log of your values");
  };
  return (
    <PageWrapper className="w-fit">
      <PageTitle> Send Asset</PageTitle>
      <ButtonWrapper>
        <button type="button" onClick={connect}>
          Connect Wallet
        </button>
      </ButtonWrapper>
      {formattedAddresses.length > 0 && formattedAddresses[0] != "" && (
        <div className="mb-2">
          {formattedAddresses.map((w) => (
            <div key={w} className="d-flex">
              <input
                type="radio"
                name="walletAddress"
                id={w}
                className="mr-1"
                value={w}
              />
              <RadioLabel htmlFor={w}>{w}</RadioLabel>
            </div>
          ))}
        </div>
      )}
      <Form
        schema={schema}
        disabled={formattedAddresses[0] == ""}
        uiSchema={uiSchema}
        onSubmit={submitForm}
        liveValidate={true}
      >
        <button
          style={{ marginBottom: "2rem" }}
          disabled={formattedAddresses[0] == ""}
          type="submit"
        >
          Send Assets
        </button>
      </Form>

      <div className="d-flex">
        <div className="mr-2">
          <Link href={"/instructions"}>View Instructions</Link>
        </div>
        <div>
          <Link href={"/downloadlink"}>Download CSV Example</Link>
        </div>
      </div>
    </PageWrapper>
  );
};

export default SendAssetContainer;
