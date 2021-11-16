import React from "react";

import { Icon } from "@blueprintjs/core";

import { StyledInfoTab } from "./styles";

const InfoTab = () => {
  return (
    <StyledInfoTab>
      <div className="info-tab">
        <div className="info-title">Enhanced Vegetation Index</div>
        <div className="info-date-range">July 2016 - July 2018</div>

        <div className="info-details-wrapper">
          <div className="info-subtitle">Study area</div>
          <div className="info-detail">9000 hectares</div>
          <div className="info-detail">12% cloud cover</div>
        </div>

        <div className="info-hline" />
        <div className="info-subtitle">Net EVI change</div>
        <div className="info-net">-6%</div>

        {/* 
        <Icon className="expand-icon" icon="chevron-down" size={12} />
        */}
      </div>
    </StyledInfoTab>
  );
};

export default InfoTab;
