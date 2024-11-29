import { Routes, Route } from "react-router-dom";
import NavBar from "./components/site/NavBar";
import TaskBoard from "./components/trello/TaskBoard";
import Login from "./components/site/Login";
import AddTask from "./components/trello/AddTask";
import { AuthProvider } from "./context/AuthContext";
import { TasksProvider } from "./context/TasksContext";
import ViewTask from "./components/trello/ViewTask";

function App() {
  return (
    <>
   <AuthProvider>
    <TasksProvider>
      <NavBar />
      <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/taskboard" element={<TaskBoard />} />
          <Route path="/add-task" element={<AddTask />} />
          <Route path="/view-task/:idTask" element={<ViewTask />} />
      </Routes>
    </TasksProvider>
   </AuthProvider> 
  </>
  );
}

export default App;
