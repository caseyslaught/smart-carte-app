import React from "react";

import { StyledHeaderWrapper, StyledHeader } from "./styles";

const Header = () => {
  return (
    <StyledHeaderWrapper>
      <StyledHeader>
        <div className="header-title">Smart Carte</div>
      </StyledHeader>
    </StyledHeaderWrapper>
  );
};

export default Header;
