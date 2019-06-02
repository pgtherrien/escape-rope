import React from "react";

import styles from "./Timeline.module.css";
import { database } from "../../firebase";
import Header from "../Header";

const ICON_PATHS = {
  raid_boss: "icons/raid_boss.ico",
  event: "icons/event.ico"
};

class Timeline extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      events: []
    };
  }

  componentWillMount() {
    let now = new Date();
    let oThis = this;
    let events = [];

    database
      .collection("events")
      .where("endDate", ">", now)
      .orderBy("endDate")
      .orderBy("startDate", "asc")
      .get()
      .then(function(documents) {
        documents.forEach(function(doc) {
          events.push(doc.data());
        });
        oThis.setState({ events: events });
      });
  }

  buildEvents = events => {
    let renderedEvents = [];
    let id = 0;

    events.forEach(function(event) {
      let startDate = event.startDate.toDate();
      let endDate = event.endDate.toDate();

      renderedEvents.push(
        <li key={id}>
          <time className={styles["timeline-time"]}>
            <span>{startDate.toDateString()}</span>
            <span>
              {startDate.toLocaleString("en-US", {
                hour: "numeric",
                hour12: true
              })}
            </span>
          </time>
          <div className={styles["timeline-icon"]}>
            <img src={ICON_PATHS[event.eventType]} alt="Type" />
          </div>
          <div className={styles["timeline-label"]}>
            <h2>
              <a href={event.link}>{event.title}</a>
            </h2>
            <p>{event.summary}</p>
            <h5>
              <b>
                Event Ends on{" "}
                {endDate.toDateString() +
                  " at " +
                  endDate.toLocaleString("en-US", {
                    hour: "numeric",
                    hour12: true
                  })}
              </b>
            </h5>
          </div>
        </li>
      );
      id++;
    });

    return renderedEvents;
  };

  render() {
    let events = this.buildEvents(this.state.events);

    return (
      <div>
        <Header path={this.props.location.pathname} />
        <div className={styles["timeline-container"]}>
          <ul className={styles["timeline-ul"]}>{events}</ul>
        </div>
      </div>
    );
  }
}

export default Timeline;
