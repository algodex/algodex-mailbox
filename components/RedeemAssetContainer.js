import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { ErrorMessage, PageTitle, PageWrapper } from "./layout.css";

const ButtonWrapper = styled.div`
  margin-right: 2rem;
`;
const Balance = styled.span`
  font-size: 1.2rem;
  font-weight: 500;
`;
const RedeemAssetContainer = () => {
  return (
    <PageWrapper className="w-fit">
      <PageTitle> Redeem Asset</PageTitle>
      <div className="d-flex align-items-center mb-2">
        <label>Asset Id:</label>
        <input type="text" className="form-control" />
      </div>
      <div className="d-flex align-items-center mb-2">
        <label>Wallet Address:</label>
        <input type="text" className="form-control" />
      </div>
      <div className="d-flex align-items-center mb-2">
        <label>Balance:</label>
        <Balance>100 LAMP</Balance>
      </div>
      <div className="d-flex align-items-center mb-2">
        <ButtonWrapper>
          <button>Redeem</button>
        </ButtonWrapper>
        <ErrorMessage success={true}>Success/Error code here</ErrorMessage>
      </div>
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
