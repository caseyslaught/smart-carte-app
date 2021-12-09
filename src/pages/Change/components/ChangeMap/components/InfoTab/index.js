import React from "react";

import BasemapButton from "../BasemapButton";

import { StyledInfoTab } from "./styles";

const InfoTab = ({ results, mapStyle, setMapStyle }) => {
  if (!results || !results.ok) {
    return (
      <StyledInfoTab>
        <div className="info-tab">
          <div className="info-instructions">1) Select an index</div>
          <div className="info-instructions">2) Set the date range</div>
          <div className="info-instructions">
            3) Click run and wait for results
          </div>
        </div>

        <BasemapButton mapStyle={mapStyle} setMapStyle={setMapStyle} />
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
          {start.toLocaleString("en-us", {
            month: "short",
          })}{" "}
          {start.getFullYear()} -{" "}
          {end.toLocaleString("en-us", {
            month: "short",
          })}{" "}
          {end.getFullYear()}
        </div>

        <div className="info-details-wrapper">
          <div className="info-subtitle">Study area</div>
          <div className="info-detail">{results.areaHa} hectares</div>
          <div className="info-detail">
            {((100 * results.cloudHa) / results.areaHa).toFixed(2)}% cloud cover
          </div>
        </div>

        <div className="info-hline" />
        <div className="info-subtitle">
          Net {results.index.toUpperCase()} change
        </div>
        <div
          className={`info-net ${results.indexChange >= 0 ? "green" : "red"}`}
        >
          {(100 * results.indexChange).toFixed(2)}%
        </div>

        {/* 
        <Icon className="expand-icon" icon="chevron-down" size={12} />
        */}
      </div>
      <BasemapButton mapStyle={mapStyle} setMapStyle={setMapStyle} />
    </StyledInfoTab>
  );
};

export default InfoTab;
