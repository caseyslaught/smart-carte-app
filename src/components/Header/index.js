import React from "react";
import { Icon } from "@blueprintjs/core";

import { StyledHeaderWrapper, StyledHeader } from "./styles";

const Header = () => {
  const currentUser = JSON.parse(localStorage.getItem("current_user"));

  return (
    <StyledHeaderWrapper>
      <StyledHeader>
        <div className="header-title">Smart Carte</div>
        <div className="header-account">
          <span>{currentUser.email}</span>
          <Icon
            className="logout-button"
            icon="log-out"
            iconSize={15}
            onClick={() => {
              localStorage.clear();
            }}
          />
        </div>
      </StyledHeader>
    </StyledHeaderWrapper>
  );
};

export default Header;
