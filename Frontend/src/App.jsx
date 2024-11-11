import './App.css';
import Home from './Comps/Home';
import LoginSignup from './Auth/LoginSignup';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Home></Home>
      <LoginSignup />
    </>
  );
}

export default App;
