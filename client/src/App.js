import React from "react";
import './App.css';
import Graph from "./components/graph.js";
import CustomSearchBar from './components/SearchBar';
import useStore from "./store";
import VideoBox from "./components/VideoBox"
import TwitterCard from './components/TwitterCard';
import TikTokCard from "./components/tiktokCard";

function App() {
  const showResults = useStore(state => state.showResults)
  return (  
    <div className="App">
      <header className="App-header">
        <div>
          <CustomSearchBar/>
        </div>
        {showResults ?
            <Graph
              title="Pesquisas no Google"
              className="ct-chart"
              type="Line"
            />
          : null}
          {showResults ?
            <TwitterCard
              className="ct-chart"
              type="Line"/>
          : null}
          {showResults ?
            <VideoBox/>
          : null}
          {showResults ?
            <TikTokCard/>
          : null}
        
      </header>
    </div>
  );
}

export default App;
