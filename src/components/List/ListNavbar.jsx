import React from "react";
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
    return (
      <Tab id={gen}>
        <Tooltip content={gen} position={Position.BOTTOM}>
          <img alt={gen} src={"images/" + gen + ".ico"} />
        </Tooltip>
      </Tab>
    );
  };

  onSearch = val => {};

  render() {
    return (
      <div className={styles["list-container"]}>
        <div className={styles["list-filters"]}>
          <Tabs
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
            <div className={styles["gen-search"]}>
              <InputGroup
                type="text"
                placeholder="Search..."
                onChange={this.onSearch}
              />
            </div>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default ListNavbar;
