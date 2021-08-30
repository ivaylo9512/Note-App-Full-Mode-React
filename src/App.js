import './App.css';
import Login from './components/Login/Login';
import { BrowserRouter as Router} from 'react-router-dom';
const App = () => {
  return (
    <div className="App">
      <Router>
        <Login/>
      </Router>
    </div>
  );
}

export default App;
