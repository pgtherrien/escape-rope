import React from "react";
import { Spinner } from "@blueprintjs/core";

import Header from "../Header";
import ListNavbar from "./ListNavbar";
import firebase from "../../firebase";
import styles from "./List.module.css";

class List extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      pokedex: []
    };
  }

  componentWillMount() {
    const pokemonRef = firebase.database().ref("pokemon");
    pokemonRef.on("value", snapshot => {
      let pokedex = snapshot.val();
      this.REFERENCE_POKEDEX = pokedex;
      this.setState({ pokedex });
    });
  }

  renderDex = () => {
    const { pokedex } = this.state;

    if (Object.keys(pokedex).length > 0) {
      let renderedDex = [];
      Object.keys(pokedex).forEach(function(number) {
        renderedDex.push(
          <li key={number}>
            {pokedex[parseInt(number)].Name}
            <img
              src={
                "https://www.serebii.net/pokemongo/pokemon/" +
                parseInt(number).toLocaleString("en", {
                  minimumIntegerDigits: 3,
                  useGrouping: false
                }) +
                ".png"
              }
            />
          </li>
        );
      });
      return <ul>{renderedDex}</ul>;
    } else {
      return <Spinner />;
    }
  };

  onFilter = e => {
    let referenceDex = this.REFERENCE_POKEDEX;
    let filter = e.currentTarget.value;
    let pokedex = {};

    if (isNaN(filter) || filter === "") {
      if (filter.length === 0) {
        this.setState({ pokedex: referenceDex });
      }
      Object.keys(referenceDex).forEach(function(number) {
        if (referenceDex[number].Name.toLowerCase().includes(filter)) {
          pokedex[number] = referenceDex[number];
        }
      });
      this.setState({ pokedex });
    } else {
      pokedex[parseInt(filter)] = referenceDex[parseInt(filter)];
      this.setState({ pokedex });
    }
  };

  render() {
    let dex = this.renderDex();
    return (
      <div>
        <Header path={this.props.location.pathname} />
        <div className={styles["list-container"]}>
          <ListNavbar onFilter={this.onFilter} />
          <div className={styles["list-pokedex"]}>{dex}</div>
        </div>
      </div>
    );
  }
}

export default List;
