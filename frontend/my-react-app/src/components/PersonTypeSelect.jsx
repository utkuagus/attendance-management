import { useEffect } from "react";
import "../css/Login.css";

export default function PersonTypeSelect(props) {
  function setPersonType(type) {
    if (type == "student") {
      props.setIsStudent(true);
      props.setIsPersonTypeSelected(true);
    } else if (type == "instructor") {
      props.setIsStudent(false);
      props.setIsPersonTypeSelected(true);
    }
  }

  return (
    <div className="flex center column gap-large">
      <div style={{ fontSize: 30 }}>Who are you?</div>
      <div className="flex gap-large">
        <button onClick={() => setPersonType("student")}>student</button>
        <button onClick={() => setPersonType("instructor")}>instructor</button>
      </div>
    </div>
  );
}
