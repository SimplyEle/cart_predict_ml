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
    const [newUser, setNewUser] = useState(false);
    const [randomProduct, setRandomProduct] = useState([]);

    return (
        <div className="page">
          <HorizontalMenu setRandomProduct={setRandomProduct} setNewUser={setNewUser} data={data} setData={setData} isLogged={isLogged} setIsLogged={setIsLogged} setFeaturedData={setFeaturedData} isLoading={isLoading} setLoading={setLoading}/>
          <Main setRandomProduct={setRandomProduct} randomProduct={randomProduct} data={data} topData={topData} setTopData={setTopData} setData={setData} isLogged={isLogged} featuredData={featuredData} isLoading={isLoading} setLoading={setLoading} newUser={newUser}/>
        </div>
    );
}

export default App;
