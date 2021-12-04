import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Toaster } from "@blueprintjs/core";
import AWS from "aws-sdk";

import { useUser } from "./helpers/auth";

import CommonLayout from "./components/CommonLayout";

AWS.config.update({
  region: process.env.REACT_APP_AWS_REGION,
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: process.env.REACT_APP_AWS_USER_POOL_ID,
  }),
});

const Change = React.lazy(() => import("./pages/Change"));
const Login = React.lazy(() => import("./pages/Login"));

function App() {
  const toasterRef = React.useRef();
  const user = useUser();

  const addToast = (message, icon, intent) => {
    toasterRef.current.show({
      icon: icon,
      intent: intent,
      message: message,
    });
  };

  if (user === "pending") {
    return <div className="App" />;
  }

  return (
    <div className="App">
      <React.Suspense fallback={<div>Loading...</div>}>
        <Router>
          <Switch>
            <Route
              exact
              path="/"
              render={() => {
                if (user) {
                  return (
                    <CommonLayout>
                      <Change addToast={addToast} />
                    </CommonLayout>
                  );
                } else {
                  return <Redirect to="/login" />;
                }
              }}
            />
            <Route
              exact
              path="/login"
              render={() => {
                if (user) {
                  return <Redirect to="/" />;
                } else {
                  return (
                    <CommonLayout>
                      <Login addToast={addToast} />
                    </CommonLayout>
                  );
                }
              }}
            />
            <Route
              exact
              path="*"
              render={() => {
                if (user) {
                  return <Redirect to="/" />;
                } else {
                  return <Redirect to="/login" />;
                }
              }}
            />
          </Switch>
        </Router>
      </React.Suspense>
      <Toaster ref={toasterRef} />
    </div>
  );
}

export default App;
