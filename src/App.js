import './App.css';
import HorizontalMenu from "./components/HorizontalMenu/HorizontalMenu";
import Main from "./components/Main/Main";
import {useState} from "react";

function App() {

    const [data, setData] = useState("");
    const [topData, setTopData] = useState("");
    const [featuredData, setFeaturedData] = useState("");
    const [isLogged, setIsLogged] = useState(false);
    const [isLoading, setLoading] = useState(true);

    return (
        <div className="page">
          <HorizontalMenu data={data} setData={setData} isLogged={isLogged} setIsLogged={setIsLogged} setFeaturedData={setFeaturedData} isLoading={isLoading} setLoading={setLoading}/>
          <Main data={data} topData={topData} setTopData={setTopData} setData={setData} isLogged={isLogged} featuredData={featuredData} isLoading={isLoading} setLoading={setLoading}/>
        </div>
    );
}

export default App;
