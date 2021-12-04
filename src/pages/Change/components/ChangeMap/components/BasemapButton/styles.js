import styled from "styled-components";

export const StyledBasemapButton = styled.div`
  margin: 15px 5px 0px 0px;
  float: right;
  z-index: 999;
  color: ${(props) =>
    props.mapStyle === "mapbox://styles/mapbox/satellite-v8"
      ? "whitesmoke"
      : "#555555"};
  cursor: pointer;
`;
