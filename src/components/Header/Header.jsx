import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  Alignment,
  Button,
  Navbar,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading,
  Tab,
  Tabs
} from "@blueprintjs/core";

import { useUserContext } from "../../contexts/user_context";
import EventForm from "../Forms/EventForm";
import styles from "./Header.module.css";
import { auth } from "../../firebase";

function Header(props) {
  const [tabState, setTabState] = useState({
    selectedTabId: props.path
  });
  const [drawerState, setDrawerState] = useState({
    isOpen: false
  });
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
    <Navbar className={styles["navbar-container"]}>
      {drawerState.isOpen ? (
        <EventForm onClose={() => setDrawerState({ isOpen: false })} />
      ) : (
        <span />
      )}
      <NavbarGroup align={Alignment.LEFT}>
        <img
          alt="app"
          src="images/escape_rope.ico"
          className={styles["navbar-app-icon"]}
        />
        <NavbarHeading>
          <span>Escape Rope</span>
        </NavbarHeading>
        <NavbarDivider />
        <Tabs
          large={true}
          onChange={tabId => {
            setTabState({ selectedTabId: tabId });
          }}
          selectedTabId={tabState.selectedTabId}
        >
          <Tab title={<Link to="/">Events</Link>} id="/" />
          <Tab title={<Link to="/list">Lists</Link>} id="/list" />
        </Tabs>
      </NavbarGroup>
      {user ? (
        <NavbarGroup align={Alignment.RIGHT}>
          <Button
            icon="plus"
            large={true}
            minimal={true}
            onClick={() => {
              setDrawerState({ drawerOpen: true });
            }}
          >
            Create Event
          </Button>
          <img
            alt="profile"
            className={styles["navbar-user-image"]}
            src={user.photoURL}
          />
          <span className={styles["navbar-user-name"]}>{user.displayName}</span>
          <NavbarDivider />
          <Button minimal={true} onClick={actions.signOut} icon="log-out">
            Sign Out
          </Button>
        </NavbarGroup>
      ) : (
        <NavbarGroup align={Alignment.RIGHT}>
          <Button minimal={true} onClick={actions.signIn} icon="log-in">
            Sign In
          </Button>
        </NavbarGroup>
      )}
    </Navbar>
  );
}

export default Header;
