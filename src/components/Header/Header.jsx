import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../firebase";
import { Navbar, Alignment, Button, Tabs, Tab } from "@blueprintjs/core";

import { useUserContext } from "../../contexts/user_context";
import styles from "./Header.module.css";

function Header(props) {
  const [tabState, setTabState] = useState({ selectedTabId: props.path });
  const { actions, state } = useUserContext();
  const { user } = state;

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        actions.persistUser(user);
      }
    });
  }, [actions]);

  return (
    <Navbar>
      <Navbar.Group align={Alignment.LEFT}>
        <div className={styles["site-icon"]}>
          <img alt="Escape Rope" src="icons/escape_rope.ico" />
        </div>
        <Navbar.Heading>
          <span>Escape Rope</span>
        </Navbar.Heading>
        <Navbar.Divider />
        <Tabs
          animate={true}
          id="navbar"
          large={true}
          onChange={tabId => {
            setTabState({ selectedTabId: tabId });
          }}
          selectedTabId={tabState.selectedTabId}
        >
          <Tab title={<Link to="/">Events</Link>} id="/" />
          <Tab title={<Link to="/list">Lists</Link>} id="/list" />
        </Tabs>
      </Navbar.Group>
      {user ? (
        <Navbar.Group align={Alignment.RIGHT}>
          <div className={styles["user-image"]}>
            <img alt="Profile" src={user.photoURL} />
          </div>
          <span className={styles["user-name"]}>{user.displayName}</span>
          <Navbar.Divider />
          <Button minimal={true} onClick={actions.signOut} icon={"log-out"}>
            Sign Out
          </Button>
        </Navbar.Group>
      ) : (
        <Navbar.Group align={Alignment.RIGHT}>
          <Button minimal={true} onClick={actions.signIn} icon={"log-in"}>
            Sign In
          </Button>
        </Navbar.Group>
      )}
    </Navbar>
  );
}

export default Header;
