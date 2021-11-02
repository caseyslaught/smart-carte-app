import styled from "styled-components";

export const StyledChangeMap = styled.div`
  flex-grow: 1;
  position: relative;
  overflow: hidden;

  .basemap-button {
    z-index: 10;
    position: absolute;
    top: 0;
    right: 0;
    margin: 20px 20px 0px 0px;
    color: ${(props) =>
      props.mapStyle === "mapbox://styles/mapbox/satellite-v8"
        ? "whitesmoke"
        : "#555555"};
    cursor: pointer;
  }
`;
