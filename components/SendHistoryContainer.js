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
    csvTransactions: "",
  };
  const validationSchema = yup.object().shape({
    assetId: yup.string().label("Asset Id").required(),
    csvTransactions: yup.string().label("CSV Transaction").required(),
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
        {({ handleSubmit, isValid, dirty }) => {
          return (
            <Form onSubmit={handleSubmit}>
              <div className="d-flex align-items-center mb-2">
                <label>Asset Id:</label>
                <Field
                  className="form-control"
                  name="assetId"
                  id="assetId"
                  placeholder="Enter Asset ID"
                />
              </div>

              <div className="d-flex align-items-center mb-2">
                <label>Sender Address:</label>
                <Field
                  type="text"
                  className="form-control"
                  name="senderAddress"
                  id="senderAddress"
                  placeholder="Enter Sender Address"
                />
              </div>

              <TextAreaWrapper>
                <label>Transactions</label>
                <Field
                  as="textarea"
                  rows="9"
                  className="form-control"
                  name="csvTransactions"
                  id="csvTransactions"
                  placeholder="Enter CSV Transactions"
                />
              </TextAreaWrapper>
              <button type="submit" disabled={!isValid || !dirty}>
                Refresh
              </button>
            </Form>
          );
        }}
      </Formik>
    </PageWrapper>
  );
};

export default SendHistoryContainer;
