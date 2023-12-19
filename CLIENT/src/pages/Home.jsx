import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

const Home = () => {
    const [notes,setNotes] = useState([])
    async function getNotes(){
        const resp = await fetch('http://localhost:3000/api/notes')
        const data = await resp.json();
        setNotes(data)
    }
    useEffect(() => {
        getNotes()
    },[])
    return ( 
        <>

        <div className="note-container">
           {
            notes.map(note => (
                <>
                <div className="note-item" key={note._id}>
                    <h3>{note.title}</h3>
                    <p>{note.text}</p>
                    <div className="d-flex justify-content-end">
                    <Button variant="warning" style={{marginRight: '10px'}}>Update</Button>
                    <Button variant="danger">Delete</Button>
                    </div>
                </div>
              
                </>
            ))
           }
        </div>
       
        
        </>
     );
}
 
export default Home;

