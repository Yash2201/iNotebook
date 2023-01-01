import './App.css';
// React Router
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Navbar from './components/Navbar';
import About from './components/About';
import Home from './components/Home';
import NoteState from './context/Notes/NoteState';
import Login from './components/Login';
import Signup from './components/Signup';
import Alert from './components/Alert';
import { useState } from 'react';

function App() {

  const [alert, setAlert] = useState(null);

  const showAlert = (message,type)=>{
    setAlert({
      type:type,
      message:message
    });

    setTimeout(() => {
      setAlert(null);
    }, 2000);
  }

  return (
    <>
      <NoteState>
        <Router>
            <Navbar />
            <Alert alert={alert} />
            <div className="container">
              <Routes>
                <Route exact path='/about' element={<About/>} />
                <Route exact path='/' element={ <Home showAlert={showAlert} /> } />
                <Route exact path='/login' element={ <Login showAlert={showAlert} /> } />
                <Route exact path='/signup' element={ <Signup showAlert={showAlert} /> } />
              </Routes>
            </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
