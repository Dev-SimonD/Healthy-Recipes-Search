import React, { useState } from 'react'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';


const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginDetails, setLoginDetails] = useState({});

  const setLogin = (event) => {
    event.preventDefault();
    console.log(event.target[0].value);
    console.log(event.target[1].value);
    setLoginDetails({
      email: (event.target[0].value),
      password: (event.target[1].value),
    })
  }

  console.log(loginDetails)

  return (
    <Form className='m-3 myForm' onSubmit={setLogin}>
    <FormGroup>
      <Label for="Email">Email</Label>
      <Input /* onChange={(event) => {console.log(event.target.value)}} */  type="email" name="email" id="exampleEmail" placeholder="e-mail" />
    </FormGroup>
    <FormGroup>
      <Label for="Password">Password</Label>
      <Input /* onChange={(event) => {console.log(event)}}  */type="password" name="password" id="examplePassword" placeholder="password" />
    </FormGroup>
    <Button className='myBtn' type='submit'>Submit</Button>
  </Form> 
 
   )
}

export default Login