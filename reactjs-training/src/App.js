import logo from './logo.svg';
import './App.css';
import Login from './login/Login';
import Register from './login/Register';
import AddReport from './dataflow/AddReport';
import UpdateReport from './dataflow/UpdateReport';
import SearchReport from './SearchReport';
import Protected from './protected';
import ReportList from 'F:/reactjs/reactjs-training/reactjs-training/src/dataflow/ReportList';
import { BrowserRouter, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
            <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/addReport' element={<Protected Cmp={AddReport} />} />
            <Route path='/updateReport/:id'element={<Protected Cmp={UpdateReport} />} />
            <Route path='/search'element={<Protected Cmp={SearchReport} />} />
            <Route path='/' element={<Protected Cmp={ReportList} />} />
            </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
