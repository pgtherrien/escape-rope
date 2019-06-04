import React from "react";
import { Spinner } from "@blueprintjs/core";

import firebase from "../../firebase";
import Header from "../Header";
import ListNavbar from "./ListNavbar";

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
      let pokemon = snapshot.val();
      this.setState({ pokedex: pokemon });
    });
  }

  renderDex = () => {
    const { pokedex } = this.state;

    if (pokedex.length > 0) {
      let renderedDex = [];
      Object.keys(pokedex).forEach(function(number) {
        renderedDex.push(<li key={number}>{pokedex[number].Name}</li>);
      });
      return <span>hello world</span>;
    } else {
      return <Spinner />;
    }
  };

  render() {
    return (
      <div>
        <Header path={this.props.location.pathname} />
        <ListNavbar />
        {this.renderDex()}
      </div>
    );
  }
}

export default List;
