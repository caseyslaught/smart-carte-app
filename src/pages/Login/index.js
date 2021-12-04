import React from "react";
import { Button, InputGroup } from "@blueprintjs/core";
import { Formik, Form, Field } from "formik";
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool,
} from "amazon-cognito-identity-js";

import { validateEmail } from "../../helpers/text";

import { StyledLoginPage } from "./styles";

const LoginPage = ({ addToast }) => {
  const [buttonDisabled, setButtonDisabled] = React.useState(true);

  return (
    <StyledLoginPage>
      <div className="login-wrapper">
        <div className="login-title">Login</div>

        <Formik
          initialValues={{ email: "", password: "" }}
          validate={(values) => {
            setButtonDisabled(true);
            if (values.password.length > 7) {
              if (validateEmail(values.email)) {
                setButtonDisabled(false);
              }
            }
            return {};
          }}
          onSubmit={(values, { setSubmitting }) => {
            var authenticationDetails = new AuthenticationDetails({
              Username: values.email,
              Password: values.password,
            });

            var userPool = new CognitoUserPool({
              UserPoolId: process.env.REACT_APP_AWS_USER_POOL_ID,
              ClientId: process.env.REACT_APP_AWS_CLIENT_ID,
            });

            var cognitoUser = new CognitoUser({
              Username: values.email,
              Pool: userPool,
            });

            cognitoUser.authenticateUser(authenticationDetails, {
              onSuccess: (result) => {
                localStorage.setItem(
                  "current_user",
                  JSON.stringify({
                    email: values.email,
                    accessToken: result.getAccessToken().getJwtToken(),
                    refreshToken: result.getRefreshToken().getToken(),
                    idToken: result.getIdToken().getJwtToken(),
                  })
                );

                setSubmitting(false);
                window.location.href = "/";
              },

              onFailure: (error) => {
                setSubmitting(false);
                addToast(
                  "Login failed with given credentials",
                  "log-in",
                  "danger"
                );
              },
            });
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field
                className="login-input"
                name="email"
                type="email"
                as={InputGroup}
                placeholder="Email"
              />
              <Field
                className="login-input"
                name="password"
                type="password"
                as={InputGroup}
                placeholder="Password"
              />
              <Button
                className="login-button"
                intent="primary"
                fill={true}
                type="submit"
                disabled={buttonDisabled || isSubmitting}
              >
                Login
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </StyledLoginPage>
  );
};

export default LoginPage;
