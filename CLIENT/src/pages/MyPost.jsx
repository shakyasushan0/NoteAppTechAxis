import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { Button, Form, Modal } from "react-bootstrap";

export default function MyPost() {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [id, setId] = useState(null);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (title, text, id) => {
    setTitle(title);
    setText(text);
    setId(id);
    setShow(true);
  };
  const [notes, setNotes] = useState([]);
  const getMyPost = async () => {
    const resp = await fetch("http://localhost:3000/api/notes/mynotes", {
      headers: {
        Authorization: "Bearer " + user.token,
      },
    });
    const data = await resp.json();
    console.log(data);
    setNotes(data);
  };

  async function updateNote() {
    try {
      let response = await fetch("http://localhost:3000/api/notes/" + id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, text }),
      });
      response = await response.json();
      console.log(response);
      alert(response.msg);
      if (response.status == 200) {
        const filteredNotes = notes.filter((n) => n._id != id);
        filteredNotes.push(response.updatedNote);
        setNotes(filteredNotes);
      }
      setShow(false);
    } catch (e) {
      alert(e.message);
    }
  }

  async function deleteNote(id) {
    try {
      const resp = await fetch("http://localhost:3000/api/notes/" + id, {
        method: "DELETE",
      });
      const response = await resp.json();
      console.log(response);
      if (response.status == 200) {
        const filteredNotes = notes.filter((n) => n._id != id);
        setNotes(filteredNotes);
      }
    } catch (e) {
      alert(e.message);
    }
  }
  useEffect(() => {
    getMyPost();
  }, []);
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Notes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={updateNote}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="note-container">
        {notes.map((note) => (
          <>
            <div className="note-item" key={note._id}>
              <h3>{note.title}</h3>
              <p>{note.text}</p>
              <div className="d-flex justify-content-end">
                <Button
                  variant="warning"
                  style={{ marginRight: "10px" }}
                  onClick={() => handleShow(note.title, note.text, note._id)}
                >
                  Update
                </Button>
                <Button variant="danger" onClick={() => deleteNote(note._id)}>
                  Delete
                </Button>
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  );
}
