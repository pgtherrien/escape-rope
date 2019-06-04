import React from "react";
import PropTypes from "prop-types";
import { InputGroup, Tabs, Tab, Tooltip, Position } from "@blueprintjs/core";

import styles from "./List.module.css";

// import firebase from "../../firebase";

class ListNavbar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      listName: "",
      selectedTabId: "Kanto"
    };
  }

  renderGen = gen => {
    const { genFilter } = this.props;
    return (
      <Tab id={gen}>
        <Tooltip content={gen} position={Position.BOTTOM}>
          <img
            onClick={() => genFilter(gen)}
            alt={gen}
            src={"images/" + gen + ".ico"}
          />
        </Tooltip>
      </Tab>
    );
  };

  render() {
    const { searchFilter } = this.props;
    return (
      <Tabs
        className={styles["list-filters"]}
        animate={true}
        onChange={gen => {
          this.setState({ selectedTabId: gen });
        }}
        selectedTabId={this.state.selectedTabId}
      >
        {this.renderGen("Kanto")}
        {this.renderGen("Jhoto")}
        {this.renderGen("Hoenn")}
        {this.renderGen("Sinnoh")}
        <InputGroup
          className={styles["list-search"]}
          type="text"
          placeholder="Search by name or number..."
          onChange={searchFilter}
        />
      </Tabs>
    );
  }
}

ListNavbar.propTypes = {
  genFilter: PropTypes.func.isRequired,
  searchFilter: PropTypes.func.isRequired
};

export default ListNavbar;
