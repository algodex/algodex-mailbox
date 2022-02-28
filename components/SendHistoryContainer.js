import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { PageTitle, PageWrapper } from "./layout.css";
import * as yup from "yup";
import { Field, Form, Formik } from "formik";

const TextAreaWrapper = styled.div`
  margin-block: 2rem;
`;

const SendHistoryContainer = () => {
  const initialValues = {
    assetId: "",
    senderAddress: "",
  };
  const validationSchema = yup.object().shape({
    assetId: yup.string().label("Asset Id").required(),
    senderAddress: yup.string().label("Sender Address").required(),
  });

  const submitForm = async (formValues) => {
    console.log(formValues);
    window.alert("Form Submitted, check console for the log of your values");
  };

  return (
    <PageWrapper className="w-fit">
      <PageTitle> Send History</PageTitle>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={submitForm}
      >
        {({ handleSubmit, isValid }) => {
          return (
            <Form onSubmit={handleSubmit}>
              <div className="d-flex align-items-center mb-2">
                <label>Asset Id:</label>
                <Field className="form-control" name="assetId" id="assetId" />
              </div>

              <div className="d-flex align-items-center mb-2">
                <label>Sender Address:</label>
                <Field
                  type="text"
                  className="form-control"
                  name="senderAddress"
                  id="senderAddress"
                />
              </div>
              <button type="submit" disabled={!isValid}>
                Connect Wallet
              </button>
            </Form>
          );
        }}
      </Formik>
      <TextAreaWrapper>
        <label>Transactions</label>
        <textarea rows="9" className="form-control"></textarea>
      </TextAreaWrapper>
    </PageWrapper>
  );
};

export default SendHistoryContainer;
