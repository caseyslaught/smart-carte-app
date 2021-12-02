import styled from "styled-components";

export const StyledLoginPage = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .login-wrapper {
    width: 300px;
    margin-bottom: 50px;
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

    .login-title {
      font-size: 1.2em;
      color: #555555;
      margin-bottom: 20px;
    }

    .login-input {
      margin-bottom: 5px;
    }

    .login-button {
      margin-top: 15px;
    }
  }
`;
