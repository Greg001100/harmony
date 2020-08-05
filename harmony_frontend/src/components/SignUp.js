import React, { useState } from "react";
import { Form, Button, Col, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../actions/authentication";

const RegistrationForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [userName, setUserName] = useState("")
  const dispatch = useDispatch();
  const valErrors = useSelector(state => state.authentication.valErrors);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password===confirm) {
      dispatch(registerUser(email, userName, password));
    } else {
      alert('Password and confirmation do not match!')
    }
  };

  const updateEmail = (e) => setEmail(e.target.value);
  const updateUserName = (e) => setUserName(e.target.value);
  const updatePassword = (e) => setPassword(e.target.value);
  const updateConfirm = (e) => setConfirm(e.target.value);

  return (
    <>
      {valErrors ? <Alert variant="danger">{valErrors.map(error => (<p>{error}</p>))}</Alert>: null}
      <Form onSubmit ={handleSubmit}>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Enter Username" value = {userName} onChange={updateUserName} />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email"value={email} placeholder='Enter Email' onChange={updateEmail} />
          </Form.Group>
      </Form.Row>
      <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password: Must have at least one capital, number, special character" onChange={updatePassword} />
        </Form.Group>

      <Form.Group controlId="formBasicPasswordConf">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" placeholder="Confirm Password" onChange={updateConfirm} />
      </Form.Group>
      <Button variant="primary" type="submit">
          Submit
      </Button>
      </Form>
    </>
    // <form>
    //       <h2>Sign Up</h2>
    //       <input type='text' name='userName' value={userName} placeholder='Enter userName' onChange={updateUserName}></input>
    //       <input type='email' name='email' value={email} placeholder='Enter email' onChange={updateEmail}></input>
    //       <input type='password' name='password' value={password} placeholder='Enter password' onChange={updatePassword}></input>
    //       <button type="submit" onClick={handleSubmit}>
    //          Sign Up
    //       </button>
    //   </form>
  )

}

// class RegistrationForm extends React.Component {
//   constructor(props) {
//     super(props);
//     // TODO: Set up default state
//     this.state = {
//         userName: '',
//         email: '',
//         password: ''
//     };
//   }

//   updateUsername = (e) => {
//     this.setState({ userName: e.target.value });
//   }

//   updateEmail = (e) => {
//     this.setState({ email: e.target.value });
//   }

//   updatePassword = (e) => {
//     this.setState({ password: e.target.value });
//   }

//   registerUser = async (e) => {
//       e.preventDefault();
//       try{
//           const res = await fetch(`http://localhost:8081/signup`, {
//               method: 'POST',
//               headers: {
//                   'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(this.state)
//             })

//             const { token, user } = await res.json();
//             console.log(token, user.id)
//             if (!res.ok) {
//                 throw res;
//             }
//         } catch(err) {
//             console.error(err)
//         }
//   }


//   render() {
//     // TODO: Render registration form
//     const { userName, email, password}= this.state;
//     return (

//       <form>
//           <h2>Sign Up</h2>
//           <input type='text' name='userName' value={userName} placeholder='Enter userName' onChange={this.updateUsername}></input>
//           <input type='email' name='email' value={email} placeholder='Enter email' onChange={this.updateEmail}></input>
//           <input type='password' name='password' value={password} placeholder='Enter password' onChange={this.updatePassword}></input>
//           <button type="submit" onClick={this.registerUser}>
//              Sign Up
//           </button>
//       </form>
//     );
//   }
// }

export default RegistrationForm;
