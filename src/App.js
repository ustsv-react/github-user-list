import React, { Component } from 'react';
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { list: [], detail: null, isLoading: false, err: null };
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    axios.get("https://api.github.com/users?per_page=100")
      .then((res) => {
        console.log(res);
        this.setState({ list: res.data, isLoading: false });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ err: err, isLoading: false });
      });
  }

  handleClick = (login) => {
    axios.get(`https://api.github.com/users/${login}`)
      .then((res) => {
        this.setState({ detail: res.data });
      })
      .catch((err) => {
        this.setState({ err: err });
      });
  };

  render() {
    const { list, detail, isLoading, err } = this.state;
    if (isLoading) {
      return <h1>Loading....</h1>;
    } else {
      return (
        <div className="container">
          {err && <h1>Error Occured!</h1>}
          <div className="user-list">
            <h2>List</h2>
            <table>
              <thead>
                <th>ID</th>
                <th>username</th>
                <th>image</th>
              </thead>
              <tbody>
                {list.map((user, index) => (
                  <tr key={user.id} onClick={() => this.handleClick(user.login)}>
                    <td>{user.id}</td>
                    <td>{user.login}</td>
                    <td><img src={user.avatar_url} alt={`${user.login} avatar`} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>


          <div>
            <h2>Detail</h2>
            <div className="user-detail">
              {detail && <div>
                <div>{`name: ${detail.name}`}</div>
                <div>{`location: ${detail.location}`}</div>
                <div>{`following: ${detail.following}`}</div>
                <div>{`follower: ${detail.followers}`}</div>
              </div>}
            </div>
          </div>

        </div>
      );
    }
  }

}

export default App;
