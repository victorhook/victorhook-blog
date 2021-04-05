import React from "react";
import { render } from "react-dom";

const App = () => {

  fetch('/api/post')
    .then(res => res.json())
    .then(res => console.log(res));

  return (
    <div>
      <h3>HELLO REACT</h3>
    </div>
  )
}

export default App;

const container = document.getElementById("app");
render(<App />, container);