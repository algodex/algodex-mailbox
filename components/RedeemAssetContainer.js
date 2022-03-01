import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { ErrorMessage, PageTitle, PageWrapper } from "./layout.css";
import { MuiForm5 as Form } from "@rjsf/material-ui";

const ButtonWrapper = styled.div`
  margin-right: 2rem;
`;
const Balance = styled.span`
  font-size: 1.2rem;
  font-weight: 500;
`;
const RedeemAssetContainer = () => {
  const schema = {
    required: ["assetId", "walletAddress"],
    properties: {
      assetId: { type: "string", title: "Asset Id", default: "" },
      walletAddress: { type: "string", title: "Wallet Address", default: "" },
    },
  };

  const submitForm = async ({ formData }) => {
    console.log(formData);
    window.alert("Form Submitted, check console for the log of your values");
  };

  return (
    <PageWrapper className="w-fit">
      <PageTitle> Redeem Asset</PageTitle>

      <Form schema={schema} onSubmit={submitForm} liveValidate={true}>
        <div className="d-flex align-items-center mb-2">
          <label>Balance:</label>
          <Balance>100 LAMP</Balance>
        </div>
        <div className="d-flex align-items-center mb-2">
          <ButtonWrapper>
            <button type="submit">Redeem</button>
          </ButtonWrapper>
          <ErrorMessage success={true}>Success/Error code here</ErrorMessage>
        </div>
      </Form>

      <div className="d-flex">
        <div className="mr-2">
          <Link href={"/instructions"}>View Instructions</Link>
        </div>
        <div>
          <Link href={"/"}>Open AlgoExplorer</Link>
        </div>
      </div>
    </PageWrapper>
  );
};

export default RedeemAssetContainer;
