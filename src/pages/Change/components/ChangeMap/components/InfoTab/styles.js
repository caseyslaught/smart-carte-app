import styled from "styled-components";

export const StyledInfoTab = styled.div`
  z-index: 10;
  position: absolute;
  top: 0;
  right: 0;
  margin: 20px 20px 0px 0px;

  width: 250px;

  .info-tab {
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

    padding: 10px;
    margin-bottom: 10px;
    text-align: center;

    .info-title {
      font-size: 1.2em;
      color: #555555;
    }

    .info-date-range {
      font-size: 1em;
      color: #999999;
      margin-bottom: 10px;
    }

    .info-gain {
      font-size: 1.4em;
      color: #0c9608;
      margin-bottom: 5px;
    }

    .info-loss {
      font-size: 1.4em;
      color: #ab0f07;
    }

    .info-hline {
      margin: 10px 20px 10px 20px;
      height: 0.5px;
      background: #cccccc;
    }

    .info-net {
      font-size: 1.4em;
      color: #555555;
    }
  }

  .run-tab {
    width: 100%;
  }
`;
