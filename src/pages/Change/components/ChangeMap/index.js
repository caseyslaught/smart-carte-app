import React from "react";
import MapGL from "react-map-gl";
import { Button, HTMLSelect, RangeSlider, Spinner } from "@blueprintjs/core";

import useLocalStorage from "../../../../hooks/useLocalStorage";

import { StyledChangeMap } from "./styles";
import useCoordinates from "./hooks/useCoordinates";
import useMapWidth from "./hooks/useMapWidth";
import useResults from "./hooks/useResults";
import InfoTab from "./components/InfoTab";

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;
const defaultStyle = "mapbox://styles/mapbox/satellite-v8";

const ChangeMap = ({ addToast }) => {
  const [results, isResultsLoading, fetchResults] = useResults();
  const [isMapLoaded, setIsMapLoaded] = React.useState(false);
  const mapWidth = useMapWidth();
  const [coordinates, setCoordinates] = useCoordinates();
  const [mapStyle, setMapStyle] = useLocalStorage("mapstyle", defaultStyle);
  const mapContainerRef = React.useRef(null);
  const mapRef = React.useRef(null);
  const [viewport, setViewport] = React.useState({
    width: 10,
    height: 10,
    maxZoom: 18,
    ...coordinates,
  });

  const indices = [
    "ari",
    "arvi",
    "evi",
    "exgi",
    "gndvi",
    "ndvi",
    "ndwi",
    "psri",
  ];
  const minDateValue = 0;
  const maxDateValue = 10;
  const [dateRange, setDateRange] = React.useState([
    minDateValue,
    maxDateValue,
  ]);
  const [startDate, setStartDate] = React.useState(getDate(minDateValue));
  const [endDate, setEndDate] = React.useState(getDate(maxDateValue));
  const [bounds, setBounds] = React.useState();
  const [index, setIndex] = React.useState(indices[0]);

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

  React.useEffect(() => {
    if (results && !results.ok) {
      addToast(results.message, "issue", "danger");
    }
  }, [results, addToast]);

  function onViewportChange(newViewport) {
    if (mapRef.current) {
      const bbox = mapRef.current.getMap().getBounds();
      // fixme: this doesn't seem to change when window changes
      if (bbox) {
        setBounds(
          `${bbox._sw.lng},${bbox._sw.lat},${bbox._ne.lng},${bbox._ne.lat}`
        );
      }
    }

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

  function getDate(value) {
    const startDate = new Date(2017, 0, 1);
    const endDate = new Date();
    endDate.setDate(endDate.getDate() - 30);
    const diffMillis = (value / 10) * (endDate - startDate);
    return new Date(startDate.getTime() + diffMillis);
  }

  return (
    <StyledChangeMap ref={mapContainerRef} mapStyle={mapStyle}>
      {isResultsLoading && <Spinner className="results-spinner" />}

      <div className="filter-wrapper">
        <HTMLSelect
          className="index-select"
          disabled={isResultsLoading}
          onChange={(e) => {
            setIndex(e.currentTarget.value);
          }}
        >
          {indices.map((i) => (
            <option key={i} value={i}>
              {i.toUpperCase()}
            </option>
          ))}
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
          onChange={(newDateRange) => {
            setDateRange(newDateRange);
            setStartDate(getDate(newDateRange[0]));
            setEndDate(getDate(newDateRange[1]));
          }}
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
            addToast(
              "Change detection task started. This may take up to two minutes.",
              "confirm",
              "success"
            );

            fetchResults(bounds, startDate, endDate, index);
          }}
        >
          RUN
        </Button>
      </div>
      <InfoTab
        results={results}
        mapStyle={mapStyle}
        setMapStyle={setMapStyle}
      />
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
