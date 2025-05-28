import React, { useState } from "react";
import "../css/Login.css";
import { getAllStudents } from "../api/StudentApi";
import { getAllInstructors } from "../api/InstructorApi";

export default function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const getAll = props.isStudent ? getAllStudents : getAllInstructors;
  const type = props.isStudent ? "student" : "instructor";

  const authUser = (person) => {
    return person.username == username && person.password == password;
  };

  const redirectError = () => {
    const errorDiv = document.querySelector(".error");
    errorDiv.classList.remove("not-exist");
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    console.log("Username:", username);
    console.log("Password:", password);

    getAll().then((resp) => {
      const user = resp.filter((student) => authUser(student.person)); // TODO: make this find
      console.log("user: " + user);
      console.log(user);
      if (!user.length) {
        redirectError();
        return;
      }
      console.log("user passed");
      props.setPersonId(user[0].id);
    });
  };

  return (
    <div className="page-container flex center column gap">
      <h2>{type} Login</h2>
      <form className="login-form flex column gap" onSubmit={handleSubmit}>
        <div className="flex pos-relative">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="flex pos-relative">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="submit-field">
          <button type="submit">Login</button>
          <div className="error right not-exist">
            * Wrong username or password
          </div>
        </div>
      </form>
      <div className="form-footer">
        <p>
          <a href="#">Forgot your password?</a>
        </p>
      </div>
      <button onClick={() => props.setIsPersonTypeSelected(false)}>
        Go back to user selection
      </button>
    </div>
  );
}
