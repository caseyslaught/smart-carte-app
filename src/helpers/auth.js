import React from "react";

export const useUser = () => {
  const [user, setUser] = React.useState("pending");

  React.useEffect(() => {
    const fetchUser = () => {
      const currentUserStr = localStorage.getItem("current_user");
      if (currentUserStr) {
        const currentUser = JSON.parse(currentUserStr);
        // todo: validate user
        setUser(currentUser);
      } else {
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  return user;
};
