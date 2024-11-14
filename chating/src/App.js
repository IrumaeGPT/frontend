import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route,Link } from 'react-router-dom';
import ChatingPage from './page/ChatingPage';


function App() {
  return (
      <Routes>
        <Route path='/' element={<ChatingPage></ChatingPage>}></Route>
      </Routes>
  );
}

export default App;
