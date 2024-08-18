import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);
  const [code, setCode]=useState(0)
  const [marks, setMarks]=useState(0)

  const [namedone, setNamedone]=useState('')



  //please subs to thapa technical channel .. also world best js course is coming soon

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        setIsLoading,
        isLive,
        setIsLive,
        code,
        setCode,
        namedone,
        setNamedone,
        marks,
        setMarks
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the Provider");
  }
  return authContextValue;
};
