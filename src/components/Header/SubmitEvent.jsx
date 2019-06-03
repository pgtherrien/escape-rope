import React from "react";
import {
  Button,
  Drawer,
  FormGroup,
  HTMLSelect,
  InputGroup,
  Label,
  Overlay
} from "@blueprintjs/core";
import { DatePicker, TimePrecision } from "@blueprintjs/datetime";
import JSONPretty from "react-json-pretty";

import styles from "./Header.module.css";
import { database } from "../../firebase";

class SubmitEvent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        eventType: "Select..."
      },
      isDrawerOpen: false,
      isModalOpen: false,
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
    let oThis = this;

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
        oThis.setState({ isDrawerOpen: false });
        console.log("Document successfully written!");
      })
      .catch(function(error) {
        oThis.setState({ isDrawerOpen: false });
        console.error("Error writing document: ", error);
      });
  };

  formChange = (val, type) => {
    let form = Object.assign({}, this.state.form);
    if (type === "startDate" || type === "endDate") {
      form[type] = val;
    } else {
      form[type] = val.currentTarget.value;
    }
    this.setState({ form: form });
  };

  renderForm = () => {
    return (
      <FormGroup className={styles["drawer-form"]}>
        {this.renderText("title", "Title")}
        {this.renderText("link", "Link")}
        {this.renderText("summary", "Summary")}
        <Label htmlFor={"eventType"} className={styles["drawer-field"]}>
          Event Type
          <HTMLSelect
            id="eventType"
            options={["Select...", "event", "raid_boss"]}
            value={this.state.form.eventType}
            onChange={val => {
              this.formChange(val, "eventType");
            }}
          />
        </Label>
        {this.renderDate("startDate", "Start Date")}
        {this.renderDate("endDate", "End Date")}
        <Button
          icon="plus"
          intent="success"
          text="Submit"
          className={styles["drawer-field"]}
          onClick={this.handleSubmit}
        />
      </FormGroup>
    );
  };

  renderText = (key, label) => {
    return (
      <Label htmlFor={key} className={styles["drawer-field"]}>
        {label}
        <InputGroup
          id={key}
          placeholder={label + "..."}
          value={this.state.form[key]}
          onChange={val => {
            this.formChange(val, key);
          }}
        />
      </Label>
    );
  };

  renderDate = (key, label) => {
    return (
      <Label htmlFor={key} className={styles["drawer-field"]}>
        {label}
        <DatePicker
          onChange={val => {
            this.formChange(val, key);
          }}
          showActionsBar={true}
          timePrecision={TimePrecision.MINUTE}
          value={this.state.form[key]}
        />
      </Label>
    );
  };

  render() {
    if (this.state.admins.includes(this.props.user.email)) {
      return (
        <div className="bp3-dark">
          <Button
            icon="plus"
            large={true}
            minimal={true}
            onClick={() => {
              this.setState({ isDrawerOpen: true });
            }}
          >
            Create Event
          </Button>
          <Drawer
            className={styles["drawer"]}
            icon="plus"
            isOpen={this.state.isDrawerOpen}
            onClose={() => {
              this.setState({ isDrawerOpen: false });
            }}
            size={Drawer.SIZE_SMALL}
            title="Create Event"
          >
            {this.renderForm()}
          </Drawer>
        </div>
      );
    } else {
      return <div />;
    }
  }
}

export default SubmitEvent;
