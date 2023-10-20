//import logo from './logo.svg';
//import './App.css';
//import MainComponent from './Compnent/MainComponent';
//import 'bootstrap/dist/css/bootstrap-grid.css'
//import 'bootstrap/dist/css/bootstrap-grid.css.map'
import 'bootstrap/dist/css/bootstrap.min.css'
//import Pro2MianComponent from './ClassComponent/Pro2MianComponent';
import MainCompo from './Snake/MainCompo';
 //import 'bootstrap/dist/css/bootstrap-grid.rtl.min.css'

function App() {
  return (
    <div>
     {/*  <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}

    {/*  <MainComponent /> */} {/* user application adding user deleting inside component folder */}

     {/*  <Pro2MianComponent /> */}  {/*  news fetching and rendering using class component inside component folder  */}

  {/*    <h1>Hello world</h1> */}

      <MainCompo />
    </div>
  );
}

export default App;
