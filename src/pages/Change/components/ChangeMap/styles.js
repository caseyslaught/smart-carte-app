import styled from "styled-components";

export const StyledChangeMap = styled.div`
  flex-grow: 1;
  position: relative;
  overflow: hidden;

  .filter-wrapper {
    z-index: 10;
    position: absolute;
    bottom: 0;
    margin: 0px 0px 30px 30px;

    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    .index-select {
      width: 160px;
      margin-bottom: 10px;
    }

    .date-slider {
      margin: 0px 40px 0px 40px;
      width: 700px;
      color: ${(props) =>
        props.mapStyle === "mapbox://styles/mapbox/satellite-v8"
          ? "whitesmoke"
          : "#555555"};
    }

    .run-button {
      width: 160px;
      margin-bottom: 10px;
    }
  }

  .basemap-button {
    z-index: 10;
    position: absolute;
    bottom: 0;
    right: 0;
    margin: 0px 20px 30px 0px;
    color: ${(props) =>
      props.mapStyle === "mapbox://styles/mapbox/satellite-v8"
        ? "whitesmoke"
        : "#555555"};
    cursor: pointer;
  }
`;
