import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import List from "../List";

class App extends React.PureComponent {
  render() {
    return (
      <Router>
        <Route exact path="/" component={Home} />
        <Route exact path="/list" component={List} />
      </Router>
    );
  }
}

export default App;
