import React from "react";

import { StyledInfoTab } from "./styles";

const InfoTab = ({ results }) => {
  if (!results) {
    return (
      <StyledInfoTab>
        <div className="info-tab">
          <div className="info-instructions">1) Select an index</div>
          <div className="info-instructions">2) Set the date range</div>
          <div className="info-instructions">
            3) Click run and wait for results
          </div>
        </div>
      </StyledInfoTab>
    );
  }

  const start = new Date(results.start);
  const end = new Date(results.end);

  return (
    <StyledInfoTab>
      <div className="info-tab">
        <div className="info-title">{results.index}</div>
        <div className="info-date-range">
          {start.getMonth()} {start.getFullYear()} - {end.getMonth()}{" "}
          {end.getFullYear()}
        </div>

        <div className="info-details-wrapper">
          <div className="info-subtitle">Study area</div>
          <div className="info-detail">{results.areaHa} hectares</div>
          <div className="info-detail">
            {results.cloudCoverPct}% cloud cover
          </div>
        </div>

        <div className="info-hline" />
        <div className="info-subtitle">Net EVI change</div>
        <div className="info-net">{results.changePct}%</div>

        {/* 
        <Icon className="expand-icon" icon="chevron-down" size={12} />
        */}
      </div>
    </StyledInfoTab>
  );
};

export default InfoTab;
