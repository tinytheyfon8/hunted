import React, { Component } from 'react';
import axios from 'axios';

import './Scores.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Scores extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scores: []
    };
  }

  componentDidMount() {
    axios.get('/api/scores')
      .then(res => {
        console.log(res);
        this.setState({ scores: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="container Scores">
        <div className="row">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Type</th>
                <th>Score</th>
                <th>Won</th>
              </tr>
            </thead>
            <tbody>
              {this.state.scores.map(score => (
                <tr>
                  <td>{score.name}</td>
                  <td>{score.email}</td>
                  <td>{score.player_type}</td>
                  <td>{score.player_score}</td>
                  <td>{score.player_won ? 'Yes' : 'No'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
