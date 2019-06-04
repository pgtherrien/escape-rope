import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  Drawer,
  FormGroup,
  HTMLSelect,
  InputGroup,
  Label
} from "@blueprintjs/core";
import { DatePicker, TimePrecision } from "@blueprintjs/datetime";

import styles from "./Form.module.css";
import { database } from "../../firebase";

class EventForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        eventType: "Select..."
      },
      admins: []
    };
  }

  componentWillMount() {
    let oThis = this;
    let admins = [];

    database
      .collection("admins")
      .get()
      .then(function(documents) {
        documents.forEach(function(doc) {
          let data = doc.data();
          admins.push(data.email);
        });
        oThis.setState({
          admins: admins
        });
      });
  }

  handleSubmit = () => {
    const {
      title,
      link,
      eventType,
      summary,
      startDate,
      endDate
    } = this.state.form;
    const { form } = this.state;
    const { onClose } = this.props;

    database
      .collection("events")
      .doc(title)
      .set({
        title: title,
        link: link,
        summary: summary,
        eventType: eventType,
        startDate: startDate,
        endDate: endDate
      })
      .then(function() {
        console.log("Document successfully written!");
        onClose(form);
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
        onClose();
      });
  };

  handleChange = (val, key) => {
    let form = Object.assign({}, this.state.form);
    if (key === "startDate" || key === "endDate") {
      form[key] = val;
    } else {
      form[key] = val.currentTarget.value;
    }
    this.setState({ form });
  };

  renderText = (key, label) => {
    return (
      <Label htmlFor={key} className={styles["eventform-field"]}>
        {label}
        <InputGroup
          id={key}
          placeholder={label + "..."}
          value={this.state.form[key]}
          onChange={val => {
            this.handleChange(val, key);
          }}
        />
      </Label>
    );
  };

  renderDate = (key, label) => {
    return (
      <Label htmlFor={key} className={styles["eventform-field"]}>
        {label}
        <DatePicker
          onChange={val => {
            this.handleChange(val, key);
          }}
          showActionsBar={true}
          timePrecision={TimePrecision.MINUTE}
          value={this.state.form[key]}
        />
      </Label>
    );
  };

  render() {
    const { onClose } = this.props;
    return (
      <Drawer
        className={styles["eventform-drawer"]}
        icon="plus"
        isOpen={true}
        onClose={onClose}
        size={Drawer.SIZE_SMALL}
        title="Create Event"
      >
        <FormGroup className={styles["eventform-form"]}>
          {this.renderText("title", "Title")}
          {this.renderText("link", "Link")}
          {this.renderText("summary", "Summary")}
          <Label htmlFor={"eventType"} className={styles["eventform-field"]}>
            Event Type
            <HTMLSelect
              id="eventType"
              options={["Select...", "event", "raid_boss"]}
              value={this.state.form.eventType}
              onChange={val => {
                this.handleChange(val, "eventType");
              }}
            />
          </Label>
          {this.renderDate("startDate", "Start Date")}
          {this.renderDate("endDate", "End Date")}
          <Button
            icon="plus"
            intent="success"
            text="Submit"
            className={styles["eventform-field"]}
            onClick={this.handleSubmit}
          />
        </FormGroup>
      </Drawer>
    );
  }
}

EventForm.propTypes = {
  onClose: PropTypes.func.isRequired
};

export default EventForm;
