import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as gameActions from '../actions/gameActions';

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      players: {
        first: 'A',
        second: 'B',
      },
    }
  }

  nameChange = (e, player) => {
    const players = this.state.players;
    players[player] = e.target.value;
    this.setState({ players });
  }

  handleContinue = () => {
    this.props.gameActions.setPlayerNames(this.state.players);
    this.props.setComponent(false);
  }

  getWinnerName = () => {
    let winner = '';
    if (this.props.winner === 'first') {
      winner = `Winner is ${this.props.players['first']}`;
    } else if (this.props.winner === 'second') {
      winner = `Winner is ${this.props.players['second']}`;
    } if (this.props.winner === 'DRAW') {
      winner = 'Match is DRAW';
    }
    return winner;
  }

  render() {

    return (
      <div className="wrapper-component">
        {
          this.props.winner !== ''
            ? 
            (<div className="game-component">
              <div className="heading">Match Result !!</div>
              <h1 className="winner-text">{this.getWinnerName()}</h1>
              <div className="board-footer">
                <button className="btn" onClick={() => {
                  this.props.gameActions.resetScoreboard();
                  this.props.setComponent(true)}
                  }>Start new game</button>
              </div>
            </div>)
            : (<div className="game-component">
              <div className="heading">Welcome to <span style={{ color: '#FBA202'}}>TIC TAC TOE</span></div>
              <div className="player-section">
                <div className="text">PLAYER 1</div>
                <div><input type="text" placeholder="Player 1" onChange={e => this.nameChange(e, 'first')} /></div>
              </div>
              <div className="player-section" >
                <div className="text" > PLAYER 2 </div>
                <div > <input type="text" placeholder="Player 2" onChange={e => this.nameChange(e, 'second')} /> </div>
              </div>
              <div className="continue-section">
                <button className="continue-btn" onClick={this.handleContinue}>Continue</button>
              </div>
            </div>)
        }
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    winner: state.game.winner,
    players: state.game.players,
    scoreboard: state.game.scoreboard,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    gameActions: bindActionCreators(gameActions, dispatch)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);