import LoginPrimary from "./components/login/LoginPrimary";
import LoginSecondary from "./components/login/LoginSecondary";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FacultyData from "./pages/FacultyData/FacultyData";
import StudentData from "./pages/StudentData/StudentData";
import Admin from "./components/admin/Admin";
import Faculty from "./components/faculty/Faculty";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPrimary />}></Route>
        <Route
          exact
          path="/adminlogin"
          element={<LoginSecondary id="admin" />}
        ></Route>
        <Route
          exact
          path="/facultylogin"
          element={<LoginSecondary id="faculty" />}
        ></Route>
        <Route path="/faculty/home" element={<Faculty />}></Route>
        <Route path="/admin/home" element={<Admin />}></Route>
        <Route path="/faculty-data" element={<FacultyData />}></Route>
        <Route path="/student-data" element={<StudentData />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;