import React from "react";
import {} from "@blueprintjs/core";

import ChangeMap from "./components/ChangeMap";

import { StyledChangePage } from "./styles";

const ChangePage = () => {
  return (
    <StyledChangePage>
      <ChangeMap />
    </StyledChangePage>
  );
};

export default ChangePage;