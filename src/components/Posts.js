import React from 'react';
import PropTypes from 'prop-types';
import { Segment } from 'semantic-ui-react';
import Post from './Post';

const Posts = ({ posts }) => (
  <React.Fragment>
    {posts.map((post, i) => (
      <Segment vertical key={i}>
        <Post post={post} />
      </Segment>
    ))}
  </React.Fragment>
);

Posts.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default Posts;
