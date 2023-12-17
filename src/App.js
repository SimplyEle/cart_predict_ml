import './App.css';
import HorizontalMenu from "./components/HorizontalMenu/HorizontalMenu";
import Main from "./components/Main/Main";
import {useState} from "react";

function App() {

    const [data, setData] = useState("");
    const [isLogged, setIsLogged] = useState(false);
    return (
        <div className="page">
          <HorizontalMenu data={data} setData={setData} isLogged={isLogged} setIsLogged={setIsLogged}/>
          <Main data={data} setData={setData} isLogged={isLogged}/>
        </div>
    );
}

export default App;
