import fetch from 'cross-fetch';

export const SELECT_SUBREDDIT = 'SELECT_SUBBREDDIT';
export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT';
export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';

export const selectSubreddit = subreddit => ({
  type: SELECT_SUBREDDIT,
  subreddit,
});

export function invalidateSubreddit(subreddit) {
  return {
    type: INVALIDATE_SUBREDDIT,
    subreddit,
  };
}

function requestPosts(subreddit) {
  return {
    type: REQUEST_POSTS,
    subreddit,
  };
}

function receivePosts(subreddit, json) {
  return {
    type: RECEIVE_POSTS,
    subreddit,
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now(),
  };
}

// Thunk
function fetchPosts(subreddit) {
  return dispatch => {
    dispatch(requestPosts(subreddit));

    return fetch(`https://www.reddit.com/r/${subreddit}.json`)
      .then(response => response.json())
      .then(json => dispatch(receivePosts(subreddit, json)));
  };
}

function shouldFetchPosts(state, subreddit) {
  const posts = state.postsBySubreddit[subreddit];
  if (!posts) {
    console.log('should fetch true');
    return true;
  } else if (posts.isFetching) {
    console.log('should fetch false');
    return false;
  } else {
    console.log('should fetch', posts.didInvalidation);
    return posts.didInvalidation;
  }
}

export function fetchPostsIfNeeded(subreddit) {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), subreddit)) {
      dispatch(fetchPosts(subreddit));
    } else {
      return Promise.resolve();
    }
  };
}

export const REQUEST_POSTER = 'REQUEST_POSTER';
export const RECEIVE_POSTER = 'RECEIVE_POSTER';

function requestPoster(username) {
  return { type: REQUEST_POSTER, username };
}

function receivePoster(username) {
  return { type: RECEIVE_POSTER, username };
}

// Thunk
function fetchPoster(username) {
  return dispatch => {
    dispatch(requestPoster(username));

    return fetch(`https://www.redit.com/user/${username}/about.json`)
      .then(response => response.json())
      .then(json => dispatch(receivePoster(username, json)));
  };
}
