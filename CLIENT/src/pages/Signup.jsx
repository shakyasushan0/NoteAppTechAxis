import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Signup() {
    const [fullname, setFullname]=useState("");
    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");
    const [file, setFile]=useState(null);
    async function handleSubmit(e){
        e.preventDefault()
        console.log(fullname, email,password,file)
        const formData = new FormData()
        formData.append('fullname', fullname)
        formData.append('email', email)
        formData.append('password', password)
        formData.append('image', file)
        let resp = await fetch("http://localhost:3000/api/user/signup",{
            method: 'POST',
            body: formData
        });
        resp= await resp.json();
        console.log(resp)
    }
  return (
    <Form style={{width:'500px', padding:'10px'}}>
         <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Full Name</Form.Label>
        <Form.Control type="text" placeholder="Enter Full Name"
        onChange={e=> setFullname(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" 
        onChange={e=> setEmail(e.target.value)}/>
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password"
        onChange={e=> setPassword(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Default file input example</Form.Label>
        <Form.Control type="file" onChange={e=>setFile(e.target.files[0])}/>
      </Form.Group>
      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
  );
}

export default Signup;