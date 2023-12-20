import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function AddNote() {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const resp = await fetch("http://localhost:3000/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + user.token,
        },
        body: JSON.stringify({
          title: title,
          text: description,
        }),
      });
      const data = await resp.json();
      alert(data.msg);
      navigate("/");
    } catch (e) {
      console.log(e.message);
    }
  }
  return (
    <Form style={{ width: "500px", padding: "10px" }}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Note Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>

      <Button variant="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
  );
}

export default AddNote;
