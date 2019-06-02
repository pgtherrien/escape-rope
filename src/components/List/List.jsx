import React from "react";

import Header from "../Header";
import ListNavbar from "./ListNavbar";

class List extends React.PureComponent {
  render() {
    return (
      <div>
        <Header path={this.props.location.pathname} />
        <ListNavbar />
      </div>
    );
  }
}

export default List;
