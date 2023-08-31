import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

//use this to store the current users state
// & Keep track of whether we've loaded the user
const useUser = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      setUser(user);
      setisLoading(false);
    });
    return unsubscribe;
  }, []);
  return { user, isLoading };
};
export default useUser;
