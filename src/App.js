import './App.css';
import * as Env from "./environments";
import Parse from "parse";
import React, { useEffect } from "react";
import Components from './Components/Components'; // Import the Components file which contains all your routes

// Initialize parse with back4app keys
Parse.initialize(Env.APPLICATION_ID, Env.JAVASCRIPT_KEY);
Parse.serverURL = Env.SERVER_URL;

function App() {
  // useEffect hook to run code after the component has mounted
  useEffect(() => {
    // Any additional initialization code or side effects can be placed here
  }, []);

  // Render the Components which includes all your Routes and logic
  return <Components />;
}

export default App;
