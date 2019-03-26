import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid, Button, Icon, Label, Loader, Segment } from 'semantic-ui-react';

import {
  selectSubreddit,
  fetchPostsIfNeeded,
  invalidateSubreddit,
} from '../actions';
import Picker from '../components/Picker';
import Posts from '../components/Posts';

class AsyncApp extends React.Component {
  static propTypes = {
    selectedSubreddit: PropTypes.string.isRequired,
    posts: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { dispatch, selectedSubreddit } = this.props;
    dispatch(fetchPostsIfNeeded(selectedSubreddit));
  }

  componentDidUpdate(prevProps) {
    if (this.props.selectedSubreddit !== prevProps.selectedSubreddit) {
      const { dispatch, selectedSubreddit } = this.props;
      dispatch(fetchPostsIfNeeded(selectedSubreddit));
    }
  }

  handleChange = nextSubreddit => {
    this.props.dispatch(selectSubreddit(nextSubreddit));
    this.props.dispatch(fetchPostsIfNeeded(nextSubreddit));
  };

  handleRefreshClick = e => {
    e.preventDefault();
    const { dispatch, selectedSubreddit } = this.props;
    dispatch(invalidateSubreddit(selectedSubreddit));
    dispatch(fetchPostsIfNeeded(selectedSubreddit));
  };

  render() {
    const { selectedSubreddit, posts, isFetching, lastUpdated } = this.props;

    return (
      <React.Fragment>
        <h1>{selectedSubreddit}</h1>
        <Grid columns="equal">
          <Grid.Column>
            <Picker
              value={selectedSubreddit}
              onChange={this.handleChange}
              options={['reactjs', 'frontend']}
            />
          </Grid.Column>
          <Grid.Column>
            <Button floated="right" as="div" labelPosition="left">
              <Label as="a" basic>
                {lastUpdated && (
                  <React.Fragment>
                    Updated: {new Date(lastUpdated).toLocaleTimeString()}
                  </React.Fragment>
                )}
              </Label>
              <Button onClick={this.handleRefreshClick} icon>
                <Icon name="sync" />
              </Button>
            </Button>
          </Grid.Column>
        </Grid>

        {isFetching && posts.length === 0 && <h2>Loading...</h2>}
        {!isFetching && posts.length === 0 && <h2>Empty.</h2>}
        {posts.length > 0 && (
          <Segment>
            {isFetching ? (
              <Loader id="loading" active inline="centered" size="massive" />
            ) : (
              <Posts posts={posts} />
            )}
          </Segment>
        )}
      </React.Fragment>
    );
  }
} // AsyncApp

function mapStateToProps(state) {
  const { selectedSubreddit, postsBySubreddit } = state;
  const { isFetching, lastUpdated, items: posts } = postsBySubreddit[
    selectedSubreddit
  ] || { isFetching: true, items: [] };

  return { selectedSubreddit, posts, isFetching, lastUpdated };
}

export default connect(mapStateToProps)(AsyncApp);
