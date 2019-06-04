import React, { useEffect, useState } from "react";
import JSONPretty from "react-json-pretty";
import { Link } from "react-router-dom";
import classNames from "classnames";

import {
  Alignment,
  Button,
  Classes,
  Navbar,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading,
  Overlay,
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
  const [overlayState, setOverlayState] = useState({});
  const { actions, state } = useUserContext();
  const { user } = state;
  const classes = classNames(
    Classes.CARD,
    Classes.ELEVATION_4,
    styles["header-overlay"]
  );

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        actions.persistUser(user);
      }
    });
  }, [actions]);

  return (
    <Navbar className={styles["header-container"]}>
      {drawerState.isOpen ? (
        <EventForm
          onClose={event => {
            setDrawerState({ isOpen: false });
            setOverlayState({ event: event });
          }}
        />
      ) : (
        <span />
      )}
      {overlayState.event !== undefined ? (
        <Overlay
          isOpen={true}
          onClose={() => setOverlayState({ isOpen: false })}
          className={Classes.OVERLAY_SCROLL_CONTAINER}
        >
          <div className={classes}>
            <JSONPretty id="json-pretty" data={overlayState.event} />
          </div>
        </Overlay>
      ) : (
        <span />
      )}
      <NavbarGroup align={Alignment.LEFT}>
        <img
          alt="app"
          src="images/escape_rope.ico"
          className={styles["header-app-icon"]}
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
              setDrawerState({ isOpen: true });
            }}
          >
            Create Event
          </Button>
          <img
            alt="profile"
            className={styles["header-user-image"]}
            src={user.photoURL}
          />
          <span className={styles["header-user-name"]}>{user.displayName}</span>
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
