import React from "react";
import MapGL from "react-map-gl";

import useLocalStorage from "../../../../hooks/useLocalStorage";

import { StyledChangeMap } from "./styles";
import useCoordinates from "./hooks/useCoordinates";
import useMapWidth from "./hooks/useMapWidth";
import BasemapButton from "./components/BasemapButton";

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;
const defaultStyle = "mapbox://styles/mapbox/satellite-v8";

const ChangeMap = () => {
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

  return (
    <StyledChangeMap ref={mapContainerRef} mapStyle={mapStyle}>
      <BasemapButton mapStyle={mapStyle} setMapStyle={setMapStyle} />
      <MapGL
        ref={mapRef}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        {...viewport}
        mapStyle={mapStyle}
        dragRotate={false}
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
