import React from "react";
import { Button, InputGroup } from "@blueprintjs/core";
import { Formik, Form, Field } from "formik";
import AWS from "aws-sdk";
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool,
} from "amazon-cognito-identity-js";

import { validateEmail } from "../../helpers/text";

import { StyledLoginPage } from "./styles";

const userPoolUrl = `cognito-idp.us-east-1.amazonaws.com/${process.env.REACT_APP_AWS_USER_POOL_ID}`;

const LoginPage = () => {
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

            console.log(values.email, values.password);

            var userPool = new CognitoUserPool({
              UserPoolId: process.env.REACT_APP_AWS_USER_POOL_ID,
              ClientId: process.env.REACT_APP_AWS_CLIENT_ID,
            });

            var cognitoUser = new CognitoUser({
              Username: values.email,
              Pool: userPool,
            });

            // still save the tokens in localStorage!

            cognitoUser.authenticateUser(authenticationDetails, {
              onSuccess: function (result) {
                AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                  IdentityPoolId: process.env.REACT_APP_AWS_IDENTITY_POOL_ID,
                  Logins: {
                    [userPoolUrl]: result.getIdToken().getJwtToken(),
                  },
                });

                setSubmitting(false);
                console.log("success!");
              },

              onFailure: function (err) {
                setSubmitting(false);
                alert(err.message || JSON.stringify(err));
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
