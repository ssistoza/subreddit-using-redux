import React from 'react';
import { Button, Header, Label, Icon, List, Grid } from 'semantic-ui-react';

const Post = ({ post }) => (
  <Grid columns={2} divided>
    <Grid.Row>
      <Grid.Column>
        <Header size="tiny">{post.title}</Header>
        <Button disabled as="div" labelPosition="right" size="mini">
          <Button color="red" size="mini">
            <Icon name="heart" />
            Likes
          </Button>
          <Label as="a" basic color="red" pointing="left">
            {post.score}
          </Label>
        </Button>
        <Button as="a" labelPosition="right" size="mini" href={post.url}>
          <Button color="blue" size="mini">
            <Icon name="comments" />
            Comments
          </Button>
          <Label color="blue" as="div" basic pointing="left">
            {post.num_comments}
          </Label>
        </Button>
      </Grid.Column>
      <Grid.Column>
        <List>
          <List.Item>
            <List.Icon name="reddit" />
            <List.Content>{post.author}</List.Content>
          </List.Item>
        </List>
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

export default Post;
