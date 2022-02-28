import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { PageTitle, PageWrapper } from "./layout.css";
import * as yup from "yup";
import { Field, Form, Formik } from "formik";
import { useMemo, useState, useEffect } from "react";
import useMyAlgo from "../hooks/use-my-algo";

const algodex = require("@algodex/algodex-sdk");
const axios = require("axios");
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
  const [algod, setAlgodClient] = useState();
  const [submissionInfo, setSubmissionInfo] = useState();
  const [submissionStyle, setSubmissionStyle] = useState();

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
  }, []);

  const updateAddresses = (addresses) => {
    if (addresses == null) {
      return;
    }

    console.log({ addresses });
    setFormattedAddresses(addresses);
  };

  const { connect, addresses } = useMyAlgo(updateAddresses);

  const initialValues = {
    assetId: "",
    walletAddress: "",
    csvTransactions: "",
  };
  const validationSchema = yup.object().shape({
    assetId: yup.string().label("Asset Id").required(),
    csvTransactions: yup.string().label("CSV Transaction").required(),
    walletAddress: yup.mixed().label("Wallet Address").required(),
  });

  const submitForm = async (formValues) => {
    console.log(formValues);
    window.alert("Form Submitted, check console for the log of your values");
  };
  return (
    <PageWrapper className="w-fit">
      <PageTitle> Send Asset</PageTitle>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={submitForm}
      >
        {({ handleSubmit, isValid, dirty }) => {
          return (
            <Form onSubmit={handleSubmit}>
              <div className="d-flex align-items-center">
                <ButtonWrapper>
                  <button type="button" onClick={connect}>
                    Connect Wallet
                  </button>
                </ButtonWrapper>
                <div className="d-flex align-items-center">
                  <label>Asset Id:</label>
                  <Field
                    className="form-control"
                    name="assetId"
                    id="assetId"
                    placeholder="Enter Asset ID"
                  />
                </div>
              </div>
              {formattedAddresses.length > 0 && formattedAddresses[0] != "" && (
                <div className="mb-2">
                  {formattedAddresses.map((w) => (
                    <div key={w} className="d-flex">
                      <Field
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
              <TextAreaWrapper>
                <Field
                  as="textarea"
                  rows="9"
                  className="form-control"
                  name="csvTransactions"
                  id="csvTransactions"
                  placeholder="Enter CSV Transactions"
                />
              </TextAreaWrapper>

              <button
                style={{ marginBottom: "2rem" }}
                type="submit"
                disabled={!isValid || !dirty}
              >
                Send Assets
              </button>
            </Form>
          );
        }}
      </Formik>
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
