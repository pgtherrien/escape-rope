import React from "react";
import { auth, provider } from "../../firebase";
import { Navbar, Alignment, Button, Tabs, Tab } from "@blueprintjs/core";
import { Link } from "react-router-dom";

import styles from "./Header.module.css";

class Header extends React.PureComponent {
  constructor(props) {
    super();
    this.state = {
      selectedTabId: props.path,
      user: null
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });
      }
    });
  }

  signOut = () => {
    auth.signOut().then(() => {
      this.setState({
        user: null
      });
    });
  };

  signIn = () => {
    auth.signInWithPopup(provider).then(result => {
      const user = result.user;
      this.setState({ user });
    });
  };

  handleTabChange = selectedTabId => this.setState({ selectedTabId });

  render() {
    return (
      <Navbar>
        <Navbar.Group align={Alignment.LEFT}>
          <Navbar.Heading>Escape Rope</Navbar.Heading>
          <Navbar.Divider />
          <Tabs
            animate={true}
            id="navbar"
            large={true}
            onChange={this.handleTabChange}
            selectedTabId={this.state.selectedTabId}
          >
            <Tab title={<Link to="/">Home</Link>} id="/" />
            <Tab title={<Link to="/list">Lists</Link>} id="/list" />
          </Tabs>
        </Navbar.Group>
        {this.state.user ? (
          <Navbar.Group align={Alignment.RIGHT}>
            <div className={styles["user-image"]}>
              <img alt="Profile" src={this.state.user.photoURL} />
            </div>
            <span className={styles["user-name"]}>
              {this.state.user.displayName}
            </span>
            <Navbar.Divider />
            <Button minimal={true} onClick={this.signOut} icon={"log-out"}>
              Sign Out
            </Button>
          </Navbar.Group>
        ) : (
          <Navbar.Group align={Alignment.RIGHT}>
            <Button minimal={true} onClick={this.signIn} icon={"log-in"}>
              Sign In
            </Button>
          </Navbar.Group>
        )}
      </Navbar>
    );
  }
}

export default Header;
