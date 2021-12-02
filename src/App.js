import React from "react";
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
  const user = useUser();
  if (user === "pending") {
    return <div className="App" />;
  }

  return (
    <div className="App">
      <React.Suspense fallback={<div>Loading...</div>}>
        {user ? (
          <CommonLayout>
            <Change />
          </CommonLayout>
        ) : (
          <CommonLayout>
            <Login />
          </CommonLayout>
        )}
      </React.Suspense>
    </div>
  );
}

export default App;
