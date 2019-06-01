import React from "react";

import Header from "../Header";

class List extends React.PureComponent {
  render() {
    return (
      <div>
        <Header path={this.props.location.pathname} />
      </div>
    );
  }
}

export default List;
