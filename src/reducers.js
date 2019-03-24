import { combineReducers } from 'redux';
import {
  SELECT_SUBREDDIT,
  INVALIDATE_SUBREDDIT,
  REQUEST_POSTS,
  RECEIVE_POSTS,
} from './actions';

const selectedSubreddit = (state = 'reactjs', action) => {
  switch (action.type) {
    case SELECT_SUBREDDIT:
      return action.subreddit;
    default:
      return state;
  }
};

const posts = (
  state = {
    isFetching: false,
    didInvalidation: false,
    items: [],
  },
  action
) => {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
      return Object.assign({}, state, { didInvalidation: true });
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidation: false,
      });
    case RECEIVE_POSTS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidation: false,
        items: action.posts,
        lastUpdated: action.receivedAt,
      });
    default:
      return state;
  }
};

const postsBySubreddit = (state = {}, action) => {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
    case REQUEST_POSTS:
    case RECEIVE_POSTS:
      return Object.assign({}, state, {
        [action.subreddit]: posts(state[action.subreddit], action),
      });
    default:
      return state;
  }
};

const rootReducer = combineReducers({ postsBySubreddit, selectedSubreddit });
export default rootReducer;
