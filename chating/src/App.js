import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route,Link } from 'react-router-dom';
import ChatingPage from './page/ChatingPage';
import LoginPage from './page/LoginPage';


function App() {
  return (
      <Routes>
        <Route path='/login' element={<LoginPage></LoginPage>}></Route>
        <Route path='/' element={<ChatingPage></ChatingPage>}></Route>
      </Routes>
  );
}

export default App;
