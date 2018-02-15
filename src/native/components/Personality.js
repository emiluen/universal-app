import React from 'react';
import PropTypes from 'prop-types';
import { Container, Content, H3, List, ListItem, Thumbnail, Body, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';

import Loading from './Loading';
import Error from './Error';
import ErrorMessages from '../../constants/errors';
import ArticleContainer from '../../containers/Article';
import ArticleComponent from '../components/Article';
import getImageUrl from '../../selectors/get-image-url';

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

  const onPress = item =>
    Actions.types({
      match: { params: { personalityId: String(personality.id), typeId: String(item.id) } },
    });

  return (
    <Container>
      <Content padder>
        <ArticleContainer
          Layout={ArticleComponent}
          article={personality.article}
        />
        <H3>{personality.name} Personality Types</H3>
        <List
          dataArray={personality.types}
          renderRow={item => (
            <ListItem button onPress={() => onPress(item)}>
              <Thumbnail square size={80} source={{ uri: getImageUrl(item.coverImageUrl, 80) }} />
              <Body>
                <Text>{item.name} - {item.nickname}</Text>
                <Text note>This is a tagline.</Text>
              </Body>
            </ListItem>
          )}
        />
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
