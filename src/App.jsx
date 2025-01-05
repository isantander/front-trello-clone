import { Routes, Route } from "react-router-dom";
import NavBar from "./components/site/NavBar";
import TaskBoard from "./components/trello/TaskBoard";
import Login from "./components/site/Login";
import Register from "./components/site/Register";
import AddTask from "./components/trello/AddTask";
import { AuthProvider } from "./context/AuthContext";
import { TaskProvider }  from "./context/TaskContext";
import ViewTask from "./components/trello/ViewTask";

function App() {
  return (
    <>
      <AuthProvider>
        <TaskProvider>
          <NavBar />
          <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/taskboard" element={<TaskBoard />} />
              <Route path="/add-task" element={<AddTask />} />
              <Route path="/view-task/:idTask" element={<ViewTask />} />
          </Routes>
        </TaskProvider>
      </AuthProvider> 
    </>
  );
}

export default App;
