import React from "react";

import Header from "../Header";
import { StyledCommonLayout } from "./styles";

const CommonLayout = ({ children }) => {
  return (
    <StyledCommonLayout>
      <Header />
      <div className="content-wrapper">{children}</div>
    </StyledCommonLayout>
  );
};

export default CommonLayout;
