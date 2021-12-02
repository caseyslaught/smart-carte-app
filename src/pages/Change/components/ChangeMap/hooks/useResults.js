import React from "react";
import AWS from "aws-sdk";

const useResults = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [results, setResults] = React.useState();

  const fetchResults = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setResults({
        index: "NDVI",
        start: "2020-10-01T00:00:00Z",
        end: "2021-10-01T00:00:00Z",
        areaHa: 9053,
        cloudCoverPct: 12,
        changePct: -6,
      });
    }, 5000);
  };

  return [results, isLoading, fetchResults];
};

export default useResults;
