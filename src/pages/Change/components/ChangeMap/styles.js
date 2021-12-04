import styled from "styled-components";

export const StyledChangeMap = styled.div`
  flex-grow: 1;
  position: relative;
  overflow: hidden;

  .results-spinner {
    z-index: 99;
    position: absolute;
    bottom: 50%;
    left: 50%;
  }

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
`;
