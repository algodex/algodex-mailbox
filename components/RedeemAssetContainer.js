import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { ErrorMessage, PageTitle, PageWrapper } from "./layout.css";
import * as yup from "yup";
import { Field, Form, Formik } from "formik";

const ButtonWrapper = styled.div`
  margin-right: 2rem;
`;
const Balance = styled.span`
  font-size: 1.2rem;
  font-weight: 500;
`;
const RedeemAssetContainer = () => {
  const initialValues = {
    assetId: "",
    walletAddress: "",
  };
  const validationSchema = yup.object().shape({
    assetId: yup.string().label("Asset Id").required(),
    walletAddress: yup.string().label("Wallet Address").required(),
  });

  const submitForm = async (formValues) => {
    console.log(formValues);
    window.alert("Form Submitted, check console for the log of your values");
  };

  return (
    <PageWrapper className="w-fit">
      <PageTitle> Redeem Asset</PageTitle>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={submitForm}
      >
        {({ handleSubmit, isValid, dirty }) => {
          return (
            <Form onSubmit={handleSubmit}>
              <div className="d-flex align-items-center mb-2">
                <label>Asset Id:</label>
                <Field
                  className="form-control"
                  name="assetId"
                  id="assetId"
                  placeholder="Enter Sender Address"
                />
              </div>
              <div className="d-flex align-items-center mb-2">
                <label>Wallet Address:</label>
                <Field
                  type="text"
                  className="form-control"
                  name="walletAddress"
                  id="walletAddress"
                  placeholder="Enter Wallet Address"
                />
              </div>
              <div className="d-flex align-items-center mb-2">
                <label>Balance:</label>
                <Balance>100 LAMP</Balance>
              </div>
              <div className="d-flex align-items-center mb-2">
                <ButtonWrapper>
                  <button type="submit" disabled={!isValid || !dirty}>
                    Redeem
                  </button>
                </ButtonWrapper>
                <ErrorMessage success={true}>
                  Success/Error code here
                </ErrorMessage>
              </div>
            </Form>
          );
        }}
      </Formik>
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
