import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

const Home = () => {
  const [notes, setNotes] = useState([]);
  async function getNotes() {
    const resp = await fetch("http://localhost:3000/api/notes/public");
    const data = await resp.json();
    console.log(data);
    setNotes(data);
  }

  useEffect(() => {
    getNotes();
  }, []);
  return (
    <>
      <div className="note-container">
        {notes.map((note) => (
          <>
            <div className="note-item" key={note._id}>
              <h3>{note.title}</h3>
              <p>{note.text}</p>
              <p style={{ float: "right" }}>--{note.createdBy.fullname}</p>
              <br />
            </div>
          </>
        ))}
      </div>
    </>
  );
};

export default Home;
