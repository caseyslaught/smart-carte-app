import React from "react";
import MapGL from "react-map-gl";
import { Button, HTMLSelect, RangeSlider, Spinner } from "@blueprintjs/core";

import useLocalStorage from "../../../../hooks/useLocalStorage";

import { StyledChangeMap } from "./styles";
import useCoordinates from "./hooks/useCoordinates";
import useMapWidth from "./hooks/useMapWidth";
import useResults from "./hooks/useResults";
import BasemapButton from "./components/BasemapButton";
import InfoTab from "./components/InfoTab";

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;
const defaultStyle = "mapbox://styles/mapbox/satellite-v8";

const ChangeMap = () => {
  const [results, isResultsLoading, fetchResults] = useResults();
  const [isMapLoaded, setIsMapLoaded] = React.useState(false);
  const mapWidth = useMapWidth();
  const [coordinates, setCoordinates] = useCoordinates();
  const [mapStyle, setMapStyle] = useLocalStorage("mapstyle", defaultStyle);
  const mapContainerRef = React.useRef(null);
  const mapRef = React.useRef(null);
  const [dateRange, setDateRange] = React.useState([0, 10]);
  const [viewport, setViewport] = React.useState({
    width: 10,
    height: 10,
    maxZoom: 18,
    ...coordinates,
  });

  // reinitialize viewport to capture map container dimensions
  // without this, the map will not fill the space without a window resize
  React.useEffect(() => {
    setTimeout(function () {
      setViewport((oldViewport) => ({
        ...oldViewport,
        width: mapContainerRef.current.clientWidth,
        height: mapContainerRef.current.clientHeight,
      }));
    }, 200);
  }, []);

  // change map viewport when mapWidth changes
  React.useEffect(() => {
    setViewport((oldViewport) => ({
      ...oldViewport,
      width: mapWidth,
      height: mapContainerRef.current.clientHeight,
    }));
  }, [mapWidth]);

  function onViewportChange(newViewport) {
    setViewport((oldViewport) => ({
      ...oldViewport,
      ...newViewport,
    }));
    setCoordinates({
      latitude: newViewport.latitude,
      longitude: newViewport.longitude,
      zoom: newViewport.zoom,
    });
  }

  const minDateValue = 0;
  const maxDateValue = 10;

  function getDate(value) {
    const startDate = new Date(2016, 0, 1);
    const diffMillis = (value / 10) * (new Date() - startDate);
    return new Date(startDate.getTime() + diffMillis);
  }

  return (
    <StyledChangeMap ref={mapContainerRef} mapStyle={mapStyle}>
      {isResultsLoading && <Spinner className="results-spinner" />}

      <div className="filter-wrapper">
        <HTMLSelect className="index-select" disabled={isResultsLoading}>
          <option value="evi">EVI</option>
          <option value="ndvi">NDVI</option>
          <option value="savi">SAVI</option>
          <option value="wdvi">WDVI</option>
        </HTMLSelect>
        <RangeSlider
          className="date-slider"
          intent="primary"
          min={minDateValue}
          max={maxDateValue}
          stepSize={1}
          labelStepSize={1}
          value={dateRange}
          disabled={isResultsLoading}
          onChange={(newDateRange) => setDateRange(newDateRange)}
          labelRenderer={(value) => {
            const currDate = getDate(value);
            let shortMonth = currDate.toLocaleString("en-us", {
              month: "short",
            });
            const shortYear = currDate.getFullYear().toString().substr(-2);
            return `${shortMonth} '${shortYear}`;
          }}
        />
        <Button
          className="run-button"
          icon="play"
          intent="none"
          disabled={isResultsLoading}
          onClick={() => {
            fetchResults();
          }}
        >
          RUN
        </Button>
      </div>
      <BasemapButton mapStyle={mapStyle} setMapStyle={setMapStyle} />
      <InfoTab results={results} />
      <MapGL
        ref={mapRef}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        {...viewport}
        mapStyle={mapStyle}
        dragRotate={false}
        attributionControl={false}
        onViewportChange={(newViewport) => onViewportChange(newViewport)}
        onClick={() => {}}
        onLoad={() => {
          setIsMapLoaded(true);
        }}
        style={{ position: "relative" }}
      >
        {isMapLoaded && <></>}
      </MapGL>
    </StyledChangeMap>
  );
};

export default ChangeMap;
