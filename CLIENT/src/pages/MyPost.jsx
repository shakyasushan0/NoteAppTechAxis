import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { Button } from "react-bootstrap";

export default function MyPost() {
  const { user } = useAuth();
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
      <div className="note-container">
        {notes.map((note) => (
          <>
            <div className="note-item" key={note._id}>
              <h3>{note.title}</h3>
              <p>{note.text}</p>
              <div className="d-flex justify-content-end">
                <Button variant="warning" style={{ marginRight: "10px" }}>
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
