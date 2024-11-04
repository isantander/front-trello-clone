import { Routes, Route } from "react-router-dom";
import NavBar from "./components/site/NavBar";
import TaskBoard from "./components/trello/TaskBoard";
import Login from "./components/site/Login";
import AddTask from "./components/trello/AddTask";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <>
    <AuthProvider>
      <NavBar />
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/taskboard" element={<TaskBoard />} />
            <Route path="/add-task" element={<AddTask />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
