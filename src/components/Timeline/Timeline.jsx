import React from "react";
import Countdown from "react-countdown-now";

import styles from "./Timeline.module.css";
import { database } from "../../firebase";
import Header from "../Header";

const ICON_PATHS = {
  raid_boss: "images/raid_boss.ico",
  event: "images/event.ico"
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
      .get()
      .then(function(documents) {
        documents.forEach(function(doc) {
          let data = doc.data();
          data.startDate = data.startDate.toDate();
          data.endDate = data.endDate.toDate();
          events.push(data);
        });

        events.sort(function compare(a, b) {
          return a.startDate - b.startDate;
        });

        oThis.setState({ events: events });
      });
  }

  buildEvents = events => {
    let renderedEvents = [];
    let id = 0;

    events.forEach(function(event) {
      renderedEvents.push(
        <li key={id}>
          <time className={styles["timeline-time"]}>
            <span>{event.startDate.toDateString()}</span>
            <span>
              {event.startDate.toLocaleString("en-US", {
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
              {new Date() > event.startDate ? (
                <b>
                  Event Ends Countdown: <Countdown date={event.endDate} />
                </b>
              ) : (
                <b>Event Ends {event.endDate.toDateString()}</b>
              )}
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
