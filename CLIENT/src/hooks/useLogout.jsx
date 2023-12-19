import React from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

export default function useLogout() {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  function logout() {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  }
  return { logout };
}
