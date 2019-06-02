import React from "react";
import {
  Alignment,
  HTMLSelect,
  InputGroup,
  Navbar,
  Tabs,
  Tab
} from "@blueprintjs/core";

import firebase from "../../firebase";

class ListNavbar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      listName: "",
      selectedGeneration: "1"
    };
  }

  componentDidMount() {
    const listsRef = firebase.database().ref("lists");
    listsRef.on("value", snapshot => {
      let userLists = snapshot.val();
      let newLists = [];
      for (let list in userLists) {
        newLists.push(list);
      }
      this.setState({
        userLists: newLists
      });
    });
  }

  render() {
    return (
      <Navbar>
        <Navbar.Group aligh={Alignment.LEFT}>
          <HTMLSelect
            large={true}
            minimal={true}
            value={this.state.selectedList}
          />
        </Navbar.Group>
        <Navbar.Group align={Alignment.RIGHT}>
          <Navbar.Heading>Generations:</Navbar.Heading>
          <Navbar.Divider />
          <Tabs
            animate={true}
            id="generations"
            selectedFilter={this.state.selectedGeneration}
          >
            <Tab id="1" title="Kanto" />
            <Tab id="2" title="Johto" />
            <Tab id="3" title="Hoenn" />
            <Tab id="4" title="Sinnoh" />
            <Tab id="7" title="Alolan" />
            <Tabs.Expander />
            <InputGroup type="text" Placeholder="Search..." />
          </Tabs>
        </Navbar.Group>
      </Navbar>
    );
  }
}

export default ListNavbar;
