import React, {Component} from "react";
import Layout from "../../../../components/Layout/layout";
import List from "./TaskerList";

export default class TaskerList extends Component {
  render() {
    return (
      <Layout>
        <List />
      </Layout>
    );
  }
}
