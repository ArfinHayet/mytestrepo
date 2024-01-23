import React, { useRef } from "react";
import { useDictionary } from "./hooks/useDictionary";
import { List } from "./components/List";
import "./App.css";

function App() {
  const dictionary = useDictionary();

  return (
    <div className="app">
      <div className="header">
        <div>Render Virtualized</div>
      </div>
      <div className="content">
        <List items={dictionary} />
      </div>
    </div>
  );
}

export default App;
