import React from 'react';


class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);
    // TODO: Set up default state
    this.state = {
        userName: '',
        email: '',
        password: ''
    };
  }

  updateUsername = (e) => {
    this.setState({ userName: e.target.value });
  }

  updateEmail = (e) => {
    this.setState({ email: e.target.value });
  }

  updatePassword = (e) => {
    this.setState({ password: e.target.value });
  }

  registerUser = async (e) => {
      e.preventDefault();
      try{
          const res = await fetch(`http://localhost:8081/`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state)
            })

            const { token, user } = await res.json();
            console.log(token, user.id)
            if (!res.ok) {
                throw res;
            }
        } catch(err) {
            console.error(err)
        }
  }


  render() {
    // TODO: Render registration form
    const { userName, email, password}= this.state;
    return (

      <form>
          <h2>Register</h2>
          <input type='text' name='userName' value={userName} placeholder='Enter userName' onChange={this.updateUsername}></input>
          <input type='email' name='email' value={email} placeholder='Enter email' onChange={this.updateEmail}></input>
          <input type='password' name='password' value={password} placeholder='Enter password' onChange={this.updatePassword}></input>
          <button type="submit" onClick={this.registerUser}>
             Sign Up
          </button>
      </form>
    );
  }
}

export default RegistrationForm;
