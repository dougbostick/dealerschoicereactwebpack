import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      counters: [],
    };
    this.getAndRender = this.getAndRender.bind(this);
    this.addCounter = this.addCounter.bind(this);
  }
  async componentDidMount() {
    await this.getAndRender();
  }
  async addCounter() {
    await axios.post("/api/counters");
    await this.getAndRender();
  }
  //   async deleteCounter() {
  //     await axios.delete(`api/counters/:id`);
  //    // await this.getAndRender();
  //   }
  async getAndRender() {
    const response = await axios.get("/api/counters");
    const data = response.data;
    this.setState({ counters: data });
  }
  render() {
    const counterEls = this.state.counters.map((counter) => {
      return <li key={counter.id}>{counter.value}</li>;
    });
    return (
      <div>
        <h1>Counters</h1>
        <ul>{counterEls}</ul>
        <button onClick={this.addCounter}>Add New Value</button>
      </div>
    );
  }
}

const root = document.querySelector("#root");
ReactDOM.render(<App />, root);
