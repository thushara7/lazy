import "./App.css";
import axios from "axios";
import { useState, useEffect, lazy, Suspense, useRef, useMemo } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
const About = lazy(() => import("./components/about"));

function App() {
  const [title, setTitle] = useState("Thushara");
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const searchRef = useRef("");
  const [filteredCoins, setfilteredCoins] = useState([]);

  useEffect(() => {
    document.title = title;
    searchRef.current.focus();
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
      .then(res => {
        setData(res.data);
        // console.log(res.data);
      })
      .catch(err => console.log(err));
  }, []);
  const handleSearchChange = e => {
    setSearch(e.target.value);
  };

  const handleEnterPressed = e => {
    let filtered = [];
    if (e.code === "Enter") {
      // call the filter function
      filtered = data.filter(el => {
        return el.name.toLowerCase().includes(search.toLowerCase());
      });
    }
    setfilteredCoins([...filtered]);
  };

  return (
    <div className="App">
      <div className="coin-search">
        <h1 className="coin-text">search a currency</h1>
        <input
          placeholder="search"
          id="search"
          className="coin-input"
          type="text"
          ref={searchRef}
          onChange={handleSearchChange}
          value={search}
          onKeyDown={handleEnterPressed}
        ></input>
      </div>
      <div>
        {filteredCoins &&
          filteredCoins.length > 0 &&
          filteredCoins.map(el => <p>{el.name}</p>)}
        {!filteredCoins && <p>No results found</p>}
      </div>
      <Router>
        <Suspense fallback={<div>...Loading</div>}>
          <Route path="/about">
            <About></About>
          </Route>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
