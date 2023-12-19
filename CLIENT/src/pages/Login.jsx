import { useState } from 'react';
import {Card,Form, Button} from 'react-bootstrap';
import useLogin from '../hooks/useLogin';

export default function Login(){
  const [email ,setEmail] =useState("")
  const [password,setPassword] =useState("")
  const {loginUser, error, loading} = useLogin();
  function handleSubmit(e) {
    e.preventDefault()
    console.log(email, password)
    loginUser(email, password)
  }
    return (
        <Card style={{width:'400px', padding: '10px'}}>
            <Card.Body>
            <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email"
        onChange = {e => setEmail(e.target.value)}
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password"
        onChange = {e => setPassword(e.target.value)} />
      </Form.Group>

      <Button variant="primary" type="submit"
      onClick={handleSubmit}
      >
        Submit
      </Button>
    </Form>
            </Card.Body>
        </Card>
    )
}