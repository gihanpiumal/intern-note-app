import React, { Component } from "react";
import axios from "axios";

import HomePage from "./HomePage";
import "./App.css";

let data = [];

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
    };
  }

  componentDidMount() {
    this.retrievePosts();
  }

  retrievePosts() {
    axios.get("http://localhost:8000/posts").then((res) => {
      if (res.data.success) {
        this.setState({
          posts: res.data.exixtingPosts,
        });
        {
          this.state.posts.map((posts) => {
            data = [
              ...data,
              {
                key: posts._id,
                title: posts.title,
                date: posts.date,
                description: posts.description,
              },
            ];
          });
        }
      }
    });
  }

  id = "";
  title = "";
  date = "";
  description = "";

  render() {
    return (
      <div>
        <HomePage items={data} />
      </div>
    );
  }
}
