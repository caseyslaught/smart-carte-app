import React from "react";

function useMapWidth() {
  const [mapWidth, setMapWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    function updateMapWidth() {
      // FIXME: the resizing is a little shaky with this method
      setMapWidth(window.innerWidth);
    }

    window.addEventListener("resize", updateMapWidth);
    return () => window.removeEventListener("resize", updateMapWidth);
  }, [setMapWidth]);

  return mapWidth;
}

export default useMapWidth;
