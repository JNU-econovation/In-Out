import React from "react";
import { Service } from "@service";
const AuthStateContext = React.createContext();
const AuthDispatchContext = React.createContext();

function AuthReducer(state, action) {
  switch (action.type) {
    case "LOGIN": {
      return true;
    }
    case "CHANGE": {
      return action.value;
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}
function AuthProvider({ children }) {
  const [state, dispatch] = React.useReducer(
    AuthReducer,
    Service.authService.isLogined()
  );
  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
}
function useAuthState() {
  const context = React.useContext(AuthStateContext);
  if (context === undefined) {
    throw new Error("useAuthState must be used within a AuthProvider");
  }
  return context;
}
function useAuthDispatch() {
  const context = React.useContext(AuthDispatchContext);
  if (context === undefined) {
    throw new Error("useAuthDispatch must be used within a AuthProvider");
  }
  return context;
}
export { AuthProvider, useAuthState, useAuthDispatch };
