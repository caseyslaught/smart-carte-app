import React from "react";

import { StyledInfoTab } from "./styles";

const InfoTab = () => {
  return (
    <StyledInfoTab>
      <div className="info-tab">
        <div className="info-title">EVI</div>
        <div className="info-date-range">July 2016 - July 2018</div>
        <div className="info-gain">+ 12%</div>
        <div className="info-loss">- 18%</div>
        <div className="info-hline" />
        <div className="info-net">- 6%</div>
      </div>
    </StyledInfoTab>
  );
};

export default InfoTab;
