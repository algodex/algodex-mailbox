import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { PageTitle, PageWrapper } from "./layout.css";

const TextAreaWrapper = styled.div`
  margin-block: 2rem;
`;

const SendHistoryContainer = () => {
  return (
    <PageWrapper className="w-fit">
      <PageTitle> Send History</PageTitle>
      <div className="d-flex align-items-center mb-2">
        <label>Asset Id:</label>
        <input type="text" className="form-control" />
      </div>

      <div className="d-flex align-items-center mb-2">
        <label>Sender Address:</label>
        <input type="text" className="form-control" />
      </div>
      <TextAreaWrapper>
        <label>Transactions</label>
        <textarea rows="9" className="form-control"></textarea>
      </TextAreaWrapper>
    </PageWrapper>
  );
};

export default SendHistoryContainer;
