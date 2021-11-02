import styled from "styled-components";

export const StyledHeaderWrapper = styled.div`
  height: 50px;
  padding: 10px 20px;
  background: #314159;
  width: 100%;
  z-index: 20;
  box-shadow: 0px 0px 5px #314159;
`;

export const StyledHeader = styled.header`
  height: 100%;
  margin: 0 auto;
  color: #f7f7ff;
  text-align: left;

  .header-title {
    font-size: 1.4em;
  }
`;
