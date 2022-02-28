import styled from "styled-components";
import { ReactSVG } from "react-svg";

export const LayoutContainer = styled.div`
  background-color: #555;
  display: grid;

  @media (max-width: 1000px) {
    grid-gap: 5px;
    /* grid-template-columns: 1fr 1fr 1fr 1fr; */
    /* grid-template-rows: 100px 100px 100px 100px; */
    /* Short record (rows / column) */
    grid-template: 80px 1000px/ 0vw 1fr 1fr 1fr;

    grid-template-areas:
      "b b b b"
      "a c c c";
  }
  @media (min-width: 1000px) {
    grid-gap: 5px;
    /* grid-template-columns: 1fr 1fr 1fr 1fr; */
    /* grid-template-rows: 100px 100px 100px 100px; */
    /* Short record (rows / column) */
    grid-template: 80px 1000px/ 150px 1fr 1fr 1fr;

    grid-template-areas:
      "b b b b"
      "a c c c";
  }
`;

export const NavBarContainer = styled.div`
  background-color: #ddd;
  grid-area: a;
`;

export const NavBarMenu = styled.div`
  background-color: #ccc;
  display: flex;
  flex-wrap: wrap;
`;

export const HeaderC = styled.div`
  background-color: #eee;
  grid-area: b;
  display: flex;
  justify-content: left;
  align-items: center;
`;
export const NavBarItemC = styled.div`
  background-color: #fff;
  padding: 0.3rem 0.8rem;
  width: 100%;
  line-height: 4vh;
  cursor: pointer;
  a {
    font-size: 1rem;
    font-weight: 500;
    text-decoration: none;
    color: inherit;
  }
`;

export const MainBodyContainer = styled.div`
  background-color: #fff;
  grid-area: c;
  padding-left: 1rem;
  font-family: "Roboto Mono", monospace;
  font-weight: 400;
  .list-style-none {
    list-style: none;
  }
`;

export const IconLogo = styled(ReactSVG)`
  height: auto;
  width: 10rem;
  padding-left: 0.4rem;
  @media (min-width: 1024px) {
  }
`;

export const PageWrapper = styled.section`
  font-family: "Roboto Mono", monospace;
  margin-bottom: 1.5rem;
  padding: 1rem;
  &.w-fit {
    width: 65%;
    @media (max-width: 1024px) {
      width: 80%;
    }
    @media (max-width: 592px) {
      width: 100%;
    }
  }
  label {
    font-size: 1.125rem;
    font-weight: 500;
    white-space: nowrap;
    margin-right: 1rem;
  }
  .mb-2 {
    margin-block: 2rem;
  }
  .mr-2 {
    margin-right: 2rem;
  }
  .d-flex {
    display: flex;
  }
  .justify-content-between {
    justify-content: space-between;
  }
  .align-items-center {
    align-items: center;
  }
  button {
    font-weight: bold;
    box-shadow: 0px 4px 8px -1px rgba(0, 56, 133, 0.2);
    border-radius: 0.3rem;
    padding: 0.4rem 0.6rem;
    border: 0.1rem solid rgba(0, 0, 0, 0.2);
    &:focus,
    &:active {
      outline: none !important;
      box-shadow: none !important;
    }
  }
  .form-control {
    min-height: 1.2rem;
    background: rgba(#002d6b, 0.07);
    border-radius: 0.5rem;
    font-size: 0.9rem;
    width: 100%;
    border: 1px solid;
    padding: 0.6rem 0.5rem;
    &::placeholder {
      font-size: 0.8rem;
    }
    &:focus {
      background: white;
      border: 1px solid rgba(#002d6b, 0.07);
    }
    &:focus,
    &:active {
      outline: none !important;
      box-shadow: none !important;
    }
  }
`;

export const PageTitle = styled.h1`
  font-size: 1.125rem;
  font-weight: 700;
`;

export const ErrorMessage = styled.div`
  color: ${({ success }) => (success ? "#5C993D" : "#f53844")};
  font-size: 1.125rem;
  font-weight: 700;
  font-style: italics;
`;
