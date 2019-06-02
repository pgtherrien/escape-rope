import React from "react";
import PropTypes from "prop-types";
import { Card, H4, H5 } from "@blueprintjs/core";

import styles from "./Home.module.css";
import { database } from "../../firebase";
import Header from "../Header";

class Home extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeEvents: [],
      upcomingEvents: []
    };
  }

  componentDidMount() {
    var activeEvents = [];
    var upcomingEvents = [];
    var today = new Date();
    var oThis = this;

    database
      .collection("events")
      .get()
      .then(function(documents) {
        documents.forEach(function(doc) {
          let data = doc.data();
          if (today > data.startDate.toDate()) {
            upcomingEvents.push(data);
          } else {
            activeEvents.push(data);
          }
        });
        oThis.setState({
          activeEvents: activeEvents,
          upcomingEvents: upcomingEvents
        });
      });
  }

  eventRenderer = events => {
    let renderedEvents = [];
    let id = 0;

    events.forEach(function(event) {
      renderedEvents.push(
        <Card elevation={0} className={styles["event"]} key={id}>
          <H5>
            <a href={event.link}>{event.title}</a>
          </H5>
          <span className="bp3-text-muted">
            {event.startDate.toDate().toDateString()} to{" "}
            {event.endDate.toDate().toDateString()}
          </span>
          <br />
          <br />
          <p>{event.summary}</p>
        </Card>
      );
      id++;
    });

    return renderedEvents;
  };

  render() {
    return (
      <div className={styles["home-container"]}>
        <Header path={this.props.location.pathname} />
        <div className={styles["active-events-container"]}>
          <H4 className={styles["events-title"]}>Active Events</H4>
          {this.eventRenderer(this.state.activeEvents)}
        </div>
        <div className={styles["upcoming-events-container"]}>
          <H4 className={styles["events-title"]}>Upcoming Events</H4>
          {this.eventRenderer(this.state.upcomingEvents)}
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  activeEvents: PropTypes.array,
  upcomingEvents: PropTypes.array
};

export default Home;
