import React from "react";
import { Icon } from "@blueprintjs/core";

import { StyledBasemapButton } from "./styles";

const BasemapButton = ({ mapStyle, setMapStyle }) => {
  const lightStyle = "mapbox://styles/mapbox/light-v10";
  const satelliteStyle = "mapbox://styles/mapbox/satellite-v8";

  return (
    <StyledBasemapButton
      mapStyle={mapStyle}
      onClick={() => {
        if (mapStyle === lightStyle) setMapStyle(satelliteStyle);
        if (mapStyle === satelliteStyle) setMapStyle(lightStyle);
      }}
    >
      <Icon icon="map" iconSize={32} size={32} />
    </StyledBasemapButton>
  );
};

export default BasemapButton;
