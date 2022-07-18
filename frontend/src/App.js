import './App.css';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home></Home>} path="home" />
        <Route element={<Login></Login>} path="login" />
        <Route element={<Signup></Signup>} path="signup" />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
