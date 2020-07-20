import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {BoardBox} from './BoardBox';

import * as GameUtils from '../utils/GameUtils';
import * as gameActions from '../actions/gameActions';


class GameBoard extends Component {

  constructor(props) {
    super(props)
    this.state = {
      boxes: Array(9).fill(null),
      xIsNext: true,
      winner: false,
      gamesCount: 0,
      dotCount: 0,
    }
  }

  getGameRound = (gamesCount) => {
    let round = '';
    if (gamesCount === 1) round = 'firstRound';
    else if (gamesCount === 2) round = 'secondRound';
    else if (gamesCount === 3) round = 'thirdRound';
    else if (gamesCount === 4) round = 'fourthRound';
    else if (gamesCount === 5) round = 'fifthRound';
    else if (gamesCount === 6) round = 'sixthRound';

    return round;
  }

  handleBoxClick = value => {
    const boxes = this.state.boxes;
    let gamesCount = this.state.gamesCount;
    
    if (boxes[value]) {
      return;
    }

    boxes[value] = this.state.xIsNext ? 'X' : 'O';
    if(this.state.winner) {
      return;
    }
    if (GameUtils.findWinner(boxes)) {
      const winner = this.state.xIsNext ? "first" : 'second';
      gamesCount++;
      this.setState({ gamesCount, winner: true });
      this.props.gameActions.gameResult('Winner', winner, this.getGameRound(gamesCount), gamesCount);
      this.props.gameActions.setScores(winner);
      setTimeout(() => this.setState({ dotCount: gamesCount }), 3000);

      if(gamesCount === 6) {
        this.props.gameActions.findWinner();
        setTimeout(() => this.props.setComponent(true), 5000);
      } else {
       setTimeout(this.restartGame, 3000);
      }
      return;
    }
    if (GameUtils.checkAlBoxesClicked(boxes)) {
      gamesCount++;
      this.setState({ gamesCount, winner: true });
      setTimeout(() => this.setState({ dotCount: gamesCount }), 3000);
      this.props.gameActions.gameResult('Draw', 'DRAW', this.getGameRound(gamesCount), gamesCount);
      if (gamesCount === 6) {
        this.props.gameActions.findWinner();
        setTimeout(() => this.props.setComponent(true), 5000);
      } else {
        setTimeout(this.restartGame, 3000);
      }
      return;
    }

    this.setState({
      boxes,
      winner: false,
      xIsNext: !this.state.xIsNext,
    });
  }
  restartGame = () => {
    this.setState({
      boxes: Array(9).fill(null),
      xIsNext: true,
      winner: false,
    })
  }

  dotStatus = value => {
    if (this.state.dotCount === value || this.state.dotCount > value) {
      return 'fillDot';
    }

    return 'emptyDot'
  }

  render() {
    let firstStatus = '';
    let secondStatus = '';
    const firstStyle = { textAlign: 'center', height: '30px', fontSize: '16px'};
    const secondStyle = { textAlign: 'center', height: '30px', fontSize: '16px'};

    const firstBoxStyle = {border: 'none'};
    const secondBoxStyle = {border: 'none'};

     const getGameRound = this.getGameRound(this.state.gamesCount);
     const roundWinner = this.props.gameResult[getGameRound];

    if (this.state.winner && roundWinner === 'first') {
      firstStatus = "WINNER";
      firstStyle.color = '#FB9E01';
      firstStyle.fontSize = '20px';
      firstBoxStyle.border = '1px solid #FB9E01';
    } else if (this.state.winner && roundWinner === 'second') {
      secondStatus = "WINNER";
      secondStyle.color = '#FB9E01';
      secondStyle.fontSize = '20px';
      secondBoxStyle.border = '1px solid #FB9E01';
    } else if (this.state.winner && roundWinner === 'DRAW') {
      firstStatus = "DRAW";
      secondStatus = "DRAW";
      firstBoxStyle.border = '1px solid #FB9E01';
      secondBoxStyle.border = '1px solid #FB9E01';
    } else if (this.state.xIsNext) {
      firstStatus = 'Your Turn';
      secondStatus = '';
      firstStyle.color = '#FB9E01';
    } else if (!this.state.xIsNext) {
      secondStatus = 'Your Turn';
      firstStatus = '';
      secondStyle.color = '#FB9E01';
    }

    return (
      <div>
        <div className="first-player-screen">
          <div className="text" style={firstStyle}>{firstStatus}</div>
          <div className="first-player" style={firstBoxStyle}>
            <div className="text player-box-text" style={{ color: '#FB9E01' }}>Player 1</div><hr />
            <div className="big-text player-box-text">{this.props.players.first}</div><hr />
            <div className="x-component player-box-text">X</div>
          </div>
          <div style={{ marginTop: '10px' }}>
            <span className={this.dotStatus(0)}></span>
            <span className={this.dotStatus(1)}></span>
            <span className={this.dotStatus(2)}></span>
            <span className={this.dotStatus(3)}></span>
            <span className={this.dotStatus(4)}></span>
            <span className={this.dotStatus(5)}></span>
          </div>
        </div>
        <div className="wrapper-component" style={{float: 'left', marginLeft: '20%' }}>
        <div className="game-component">
              <div className="board-row">
                <BoardBox value={this.state.boxes[0]} handleBoxClick={() => this.handleBoxClick(0)} />

                <BoardBox value={this.state.boxes[1]} handleBoxClick={() => this.handleBoxClick(1)} />

                <BoardBox value={this.state.boxes[2]} handleBoxClick={() => this.handleBoxClick(2)} />
              </div>
              <div className="board-row">
                <BoardBox value={this.state.boxes[3]} handleBoxClick={() => this.handleBoxClick(3)} />

                <BoardBox value={this.state.boxes[4]} handleBoxClick={() => this.handleBoxClick(4)} />

                <BoardBox value={this.state.boxes[5]} handleBoxClick={() => this.handleBoxClick(5)} />
              </div>

              <div className="board-row">
                <BoardBox value={this.state.boxes[6]} handleBoxClick={() => this.handleBoxClick(6)} />

                <BoardBox value={this.state.boxes[7]} handleBoxClick={() => this.handleBoxClick(7)} />

                <BoardBox value={this.state.boxes[8]} handleBoxClick={() => this.handleBoxClick(8)} />
              </div>
        </div>
        </div>
        <div className="second-player-screen">
          <div className="text" style={secondStyle}>{secondStatus}</div>  
          <div className="second-player" style={secondBoxStyle}>
            <div className="text player-box-text" style={{ color: '#FB9E01' }}>Player 2</div><hr/>
            <div className="big-text player-box-text">{this.props.players.second}</div><hr />
            <div className="o-component player-box-text">O</div>
          </div>
          <div style={{ marginTop: '10px' }}>
            <span className={this.dotStatus(0)}></span>
            <span className={this.dotStatus(1)}></span>
            <span className={this.dotStatus(2)}></span>
            <span className={this.dotStatus(3)}></span>
            <span className={this.dotStatus(4)}></span>
            <span className={this.dotStatus(5)}></span>
          </div>
        </div>
        
      </div>
        
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    players: state.game.players,
    gameResult: state.game.gameResult,
    gamesCount: state.game.gamesCount,
    winner: state.game.winner,
    scoreboard: state.game.scoreboard,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    gameActions: bindActionCreators(gameActions, dispatch)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(GameBoard);