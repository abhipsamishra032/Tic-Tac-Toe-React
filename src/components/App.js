import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as gameActions from '../actions/gameActions';
import GameBoard from './GameBoard';
import Dashboard from './Dashboard';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dashboard: true,
    }
  }

  setComponent = flag => {
    this.setState({ dashboard: flag });
  }
  
  render() {

    return (
      <div className="main-content" >
        {
          this.state.dashboard
          ? <Dashboard setComponent = {this.setComponent} />
          : <GameBoard setComponent = {this.setComponent} />
        }
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    winner: state.game.winner, 
    scoreboard: state.game.scoreboard,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    gameActions: bindActionCreators(gameActions, dispatch)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);