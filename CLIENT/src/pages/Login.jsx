import { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import useLogin from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginUser, error, loading } = useLogin();
  function handleSubmit(e) {
    e.preventDefault();
    console.log(email, password);
    loginUser(email, password);
  }
  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ height: "100vh" }}
    >
      <Card
        style={{
          width: "400px",
          padding: "10px",
        }}
      >
        <Card.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <Button
              variant="primary"
              type="submit"
              onClick={handleSubmit}
              disabled={loading}
            >
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
