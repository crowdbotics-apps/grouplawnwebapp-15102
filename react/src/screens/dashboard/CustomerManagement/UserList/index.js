import React, {Component} from "react";
import Layout from "../../../../components/Layout/layout";
import List from "./UserList";

export default class UserList extends Component {
  render() {
    return (
      <Layout>
        <List />
      </Layout>
    );
  }
}
