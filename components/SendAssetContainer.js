import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { PageTitle, PageWrapper } from "./layout.css";

const ButtonWrapper = styled.div`
  margin-right: 2rem;
`;
const TextAreaWrapper = styled.div`
  margin-block: 2rem;
`;
const SendAssetContainer = () => {
  return (
    <PageWrapper className="w-fit">
      <PageTitle> Send Asset</PageTitle>
      <div className="d-flex align-items-center">
        <ButtonWrapper>
          <button>Connect Wallet</button>
        </ButtonWrapper>
        <div className="d-flex align-items-center">
          <label>Asset Id:</label>
          <input type="text" className="form-control" />
        </div>
      </div>
      <TextAreaWrapper>
        <textarea rows="9" className="form-control"></textarea>
      </TextAreaWrapper>

      <button style={{ marginBottom: "2rem" }}>Send Assets</button>
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
