import React from 'react';
import PropTypes from 'prop-types';
import { Container, Content, H3, List, ListItem, Thumbnail, Body, Text, Row, Right, Button } from 'native-base';
import { Actions } from 'react-native-router-flux';

import Loading from '../Loading';
import Error from '../Error';
import ErrorMessages from '../../../constants/errors';
import ArticleContainer from '../../../containers/Article';
import ArticleComponent from './Article';
import getImageUrl from '../../../selectors/get-image-url';

const PersonalityView = ({
  error,
  loading,
  personality,
}) => {
  if (loading) return <Loading />;

  // Error
  if (error) return <Error content={error} />;

  // Personality not found
  if (!personality) return <Error content={ErrorMessages.recipe404} />;

  const onTypePress = item =>
    Actions.types({
      match: { params: { personalityId: String(personality.id), typeId: String(item.id) } },
    });

  const onQuizPress = () =>
    Actions.quiz({
      match: { params: { personalityId: String(personality.id) } },
    });

  const types = personality.types.map(item => (
    <ListItem key={item.id} button onPress={() => onTypePress(item)}>
      <Thumbnail
        square
        size={80}
        source={{ uri: getImageUrl(item.coverImageUrl, { width: 80 }) }}
      />
      <Body>
        <Text>{item.name} - {item.nickname}</Text>
        <Text note>This is a tagline.</Text>
      </Body>
    </ListItem>
  ));

  return (
    <Container>
      <Content padder>
        <Row>
          <Right>
            <Button primary onPress={() => onQuizPress()}>
              <Text>Test Me</Text>
            </Button>
          </Right>
        </Row>
        <ArticleContainer
          title
          readMore
          Layout={ArticleComponent}
          article={personality.article}
        />
        <H3>{personality.name} Personality Types</H3>
        <List>
          {types}
        </List>
      </Content>
    </Container>
  );
};

PersonalityView.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  personality: PropTypes.shape({}),
};

PersonalityView.defaultProps = {
  error: null,
  personality: null,
};

export default PersonalityView;
