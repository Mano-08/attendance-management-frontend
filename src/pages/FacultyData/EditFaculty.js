import React, { useState } from "react";
import "./Faculty.css";
import { useLocation, useNavigate } from "react-router-dom";

function EditFaculty() {
  const location = useLocation();
  const { state } = location;
  const navigate = useNavigate();
  const [info, setInfo] = useState({
    username: state.information.username,
    name: state.information.name,
  });
  const handleDeleteSubjects = async (e) => {
    await fetch("/api/delete-subjects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: info.username,
        index: e.target.value,
      }),
    })
      .then(navigate("/faculty-data"))
      .then(window.location.reload());
  };
  const handleClick = async () => {
    let res = await fetch("/api/update-faculty", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: state.information.username,
        username: info.username,
        name: info.name,
        subjects: subjectState.object,
      }),
    })
      .then(navigate("/faculty-data"))
      .then(window.location.reload());

    const result = await res.json();
    console.log(result);
  };

  const [subjectState, setSubject] = useState({
    object: state.information.subjects,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  return (
    <div id="faculty_data_edit">
      <p>UserName:</p>
      <input
        name="username"
        type="text"
        value={info.username}
        onChange={handleChange}
        required
      />
      <p>Name:</p>
      <input
        name="name"
        type="text"
        value={info.name}
        onChange={handleChange}
        required
      />
      <p>Subjects:</p>

      <ul>
        {subjectState.object.map((element, index) => {
          return (
            <li key={index} className="new_course_box">
              <p>Subject: </p>
              <input
                name={`subject`}
                type="text"
                value={subjectState.object[index].subject}
                onChange={(e) => {
                  const { value } = e.target;
                  let arraycopy = [...subjectState.object];
                  arraycopy[index].subject = value;
                  setSubject({ ...subjectState, objects: arraycopy });
                }}
                required
              />
              <br />
              <p>Courses: </p>
              <input
                name={`courses`}
                type="text"
                value={subjectState.object[index].courses}
                onChange={(e) => {
                  const { value } = e.target;
                  let arraycopy = [...subjectState.object];
                  arraycopy[index].courses = value;
                  setSubject({ ...subjectState, objects: arraycopy });
                }}
                required
              />
              <button
                className="delete_subject_faculty"
                value={index}
                onClick={handleDeleteSubjects}
              >
                Delete Subject
              </button>
            </li>
          );
        })}
      </ul>
      <div id="add_save_data">
        <button
          id="add_faculty_data_btn"
          value={state.information.username}
          onClick={(e) => {
            navigate(
              `/faculty-data/edit-faculty/${e.target.value}/add-subjects`,
              {
                state: { info: state.information.username },
              }
            );
            console.log(state);
          }}
        >
          Add Subjects
        </button>
        <button
          id="save_faculty_data_btn"
          onClick={() => {
            handleClick(info.username);
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default EditFaculty;
