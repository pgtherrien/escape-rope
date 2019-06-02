import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Timeline from "../Timeline";
import List from "../List";

class App extends React.PureComponent {
  render() {
    return (
      <Router>
        <Route exact path="/" component={Timeline} />
        <Route exact path="/list" component={List} />
      </Router>
    );
  }
}

export default App;
