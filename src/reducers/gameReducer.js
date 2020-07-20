// contactReducer.js

import * as actionTypes from '../actions/actionTypes';
import initialstate from './initialstate';

export default (state = initialstate.game, action) => {
  switch (action.type) {

    case actionTypes.GAME_RESULT: {
      const gameResult = {
        ...state.gameResult
      };
      gameResult[action.round] = action.winner;
      return {
        ...state,
        gameResult,
        gamesCount: action.gamesCount,
      };
    };

    case actionTypes.FIND_WINNER: {
      const scoreboard = {
        ...state.scoreboard
      };
      let winner = '';
      if (scoreboard.first > scoreboard.second) {
        winner = 'first';
      } else if (scoreboard.first < scoreboard.second) {
        winner = 'second'
      } else {
        winner = 'DRAW';
      }
      return {
        ...state,
        winner,
      };
    }

    case actionTypes.SET_PLAYER_NAMES: {
      return {
        ...state,
        players: action.players,
      }
    }

    case actionTypes.SET_SCORES_BOARD: {
      const scoreboard = {...state.scoreboard};
      scoreboard[action.roundWinner] = scoreboard[action.roundWinner] + 1;
      return {
        ...state,
        scoreboard,
      };
    }

    case actionTypes.RESET_SCOREBOARD: {
      return {
        ...state,
        scoreboard: {
          first: 0,
          second: 0
        },
        winner: '',
        gamesCount: 0,
        gameResult: {
          firstRound: '',
          secondRound: '',
          thirdRound: '',
          fourthRound: '',
          fifthRound: '',
          sixthRound: '',
        },
      }
    }
      
    default:
      return state;
  }
};