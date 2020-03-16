import React from 'react';
import './App.css';
import Nav from './Components/navbar'
import UserProfilePage from './Pages/UserProfilePage'
import { Route } from 'react-router-dom';
import Homepage from './Components/Hompage'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MyProfilePage from './Pages/MyProfilePage';

function App() {
  return (
    <div className="App">
      <Nav></Nav>
      {/* <Route path="/" exact component ={Main} /> */}
      <Route path="/" exact component = {Homepage}/>
      <Route path="/users/:id" component={UserProfilePage } />
      <Route path="/profile" component = {MyProfilePage}></Route>
      <ToastContainer position="top-right"
                      autoClose={5000}
                      hideProgressBar={false}
                      newestOnTop={false}
                      closeOnClick
                      rtl={false}
                      pauseOnVisibilityChange
                      draggable
                      pauseOnHover>

      </ToastContainer>
    </div>
  );
}

export default App;
