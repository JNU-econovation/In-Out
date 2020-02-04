import React from "react";
import { Redirect } from "react-router-dom";
import { Service } from "@service";

const AdminRouter = ({ children }) => {
  const role = Service.userService.getUser().role;

  return role >= 1 ? children : <Redirect to="/"></Redirect>;
};

export { AdminRouter };
