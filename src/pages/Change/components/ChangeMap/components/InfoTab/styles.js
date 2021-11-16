import styled from "styled-components";

export const StyledInfoTab = styled.div`
  z-index: 10;
  position: absolute;
  top: 0;
  right: 0;
  margin: 20px 20px 0px 0px;

  width: 250px;

  .info-tab {
    position: relative;
    width: 100%;
    background-color: #f5f8fa;
    background-image: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.8),
      rgba(255, 255, 255, 0)
    );
    box-shadow: inset 0 0 0 1px rgb(16 22 26 / 20%),
      inset 0 -1px 0 rgb(16 22 26 / 10%);
    border-radius: 3px;

    padding: 10px 20px 10px 20px;
    text-align: left;

    .info-title {
      font-size: 1.2em;
      color: #555555;
    }

    .info-subtitle {
      font-size: 0.8em;
      color: #999999;
      margin: 10px 0px 5px 0px;
    }

    .info-details-wrapper {
      text-align: left;

      .info-detail {
        font-size: 1em;
        font-size: #555555;
        margin-bottom: 2px;
      }
    }

    .info-date-range {
      font-size: 1em;
      color: #999999;
      margin-bottom: 10px;
    }

    .info-hline {
      margin: 10px 0px 10px 0px;
      height: 0.5px;
      background: #cccccc;
    }

    .info-net {
      font-size: 1.4em;
      color: #ab0f07;
    }

    .expand-icon {
      position: absolute;
      bottom: 0;
      right: 0;
      color: #555555;
      margin: 0px 20px 10px 0px;
    }
  }

  .run-tab {
    width: 100%;
  }
`;
