import React from "react";

const defaultCoordinates = {
  longitude: 29.335952,
  latitude: -1.448102,
  zoom: 12,
};

const useCoordinates = () => {
  const [coordinates, setCoordinates] = React.useState(() => {
    const initialCoordinates =
      window.localStorage.getItem("defaultCoordinates");
    return initialCoordinates !== null
      ? JSON.parse(initialCoordinates)
      : defaultCoordinates;
  });

  React.useEffect(() => {
    window.localStorage.setItem(
      "defaultCoordinates",
      JSON.stringify(coordinates)
    );
  }, [coordinates]);

  return [coordinates, setCoordinates];
};

export default useCoordinates;
