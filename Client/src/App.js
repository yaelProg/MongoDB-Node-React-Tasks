import './App.css';
import NavBar from './designers/NavBar';
import { Route, Routes } from 'react-router';
import UsersPage from './Pages/UsersPage';
import PostsPage from './Pages/PostsPage';
import PhotosPage from './Pages/PhotosPage';
import TodosPage from './Pages/TodosPage';
import HomePage from './Pages/HomePage';
import Login from './auth/Login';
import Register from './auth/Register';
import SignUp from './auth/SignUp';

/**
 * Main component for the application.
 * This component defines the routing structure for different pages in the application.
 */
function App() {

  return (
    <>
      <div className="App">

        <Routes>
          <Route path="/" element={<Login />}> </Route>
          <Route path="/Register" element={<Register />}> </Route>
          <Route path="/SignUp" element={<SignUp />}> </Route>
          <Route path="/HomePage" element={<HomePage />}> </Route>
          <Route path="/Users" element={<UsersPage />}> </Route>
          <Route path="/Todos" element={<TodosPage />}> </Route>
          <Route path="/Posts" element={<PostsPage />}> </Route>
          <Route path="/Photos" element={<PhotosPage />}> </Route>
          <Route path="/NavBar" element={<NavBar />}> </Route>
          <Route path="/Login" element={<Login />}> </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
