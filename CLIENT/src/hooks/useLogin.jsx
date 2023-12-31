import { useState } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

export default function useLogin() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setUser } = useAuth();
  async function loginUser(email, password) {
    setLoading(true);
    setError(null);
    let resp = await fetch("http://localhost:3000/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    console.log(resp);
    resp = await resp.json();
    console.log(resp);
    if (resp.error) {
      setError(resp.error);
    } else {
      setUser(resp);
      localStorage.setItem("user", JSON.stringify(resp));
      navigate("/");
    }
    setLoading(false);
  }

  return { loginUser, error, loading };
}
