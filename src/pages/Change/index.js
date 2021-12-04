import React from "react";

import ChangeMap from "./components/ChangeMap";

import { StyledChangePage } from "./styles";

const ChangePage = ({ addToast }) => {
  return (
    <StyledChangePage>
      <ChangeMap addToast={addToast} />
    </StyledChangePage>
  );
};

export default ChangePage;
