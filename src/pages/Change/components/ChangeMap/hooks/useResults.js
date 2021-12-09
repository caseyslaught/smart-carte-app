import React from "react";
import AWS from "aws-sdk";

const useResults = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [results, setResults] = React.useState();

  const fetchResults = async (bounds, startDate, endDate, index) => {
    setIsLoading(true);

    const start = startDate.toISOString();
    const end = endDate.toISOString();

    const userPoolUrl = `cognito-idp.us-east-1.amazonaws.com/${process.env.REACT_APP_AWS_USER_POOL_ID}`;
    const currentUser = JSON.parse(localStorage.getItem("current_user"));
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: process.env.REACT_APP_AWS_IDENTITY_POOL_ID,
      Logins: {
        [userPoolUrl]: currentUser.idToken,
      },
    });

    const lambda = new AWS.Lambda();

    const params = {
      FunctionName: "smart-carte-production-smart-carte",
      InvocationType: "RequestResponse",
      Payload: JSON.stringify({ bounds, start, end, index }),
    };

    const response = await lambda.invoke(params).promise();
    const result = JSON.parse(response.Payload);

    console.log(result);

    if (result.status === "OK") {
      setResults({
        ok: true,
        index: result.index.toUpperCase(),
        start: startDate, // todo: get actual min and max
        end: endDate,
        areaHa: result.total_area_ha,
        cloudHa: result.cloud_area_ha,
        indexChange: result.index_change,
        imageHref: result.image_href,
      });
    } else if (result.status === "NOK") {
      setResults({
        ok: false,
        message:
          result.message.charAt(0).toUpperCase() +
          result.message.slice(1) +
          ".",
      });
    } else {
      setResults({
        ok: false,
        message: "Unknown response status.",
      });
    }

    setIsLoading(false);
  };

  return [results, isLoading, fetchResults];
};

export default useResults;
