import React from 'react';
import PropTypes from 'prop-types';
import { Container, Content, Card, CardItem, H3, List, ListItem, Text } from 'native-base';

import Loading from './Loading';
import Error from './Error';
import ErrorMessages from '../../constants/errors';
import Spacer from './Spacer';

const PersonalityView = ({
  error,
  loading,
  personalities,
  personalityId,
}) => {
  if (loading) return <Loading />;

  // Error
  if (error) return <Error content={error} />;

  // Get this Personality from all personalities
  let personality = null;
  if (personalityId && personalities) {
    personality = personalities.find(item => item.id === personalityId);
  }

  // Personality not found
  if (!personality) return <Error content={ErrorMessages.recipe404} />;

  const types = personality.types.map(item => (
    <ListItem key={item.id} rightIcon={{ style: { opacity: 0 } }}>
      <Text>{item.name}</Text>
    </ListItem>
  ));

  return (
    <Container>
      <Content padder>
        <H3>{personality.name}</H3>
        <Text>{personality.tagline}</Text>
        <Spacer size={15} />

        <Card>
          <CardItem header bordered>
            <Text>Types</Text>
          </CardItem>
          <CardItem>
            <Content>
              <List>
                {types}
              </List>
            </Content>
          </CardItem>
        </Card>
      </Content>
    </Container>
  );
};

PersonalityView.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  personalityId: PropTypes.string.isRequired,
  personalities: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

PersonalityView.defaultProps = {
  error: null,
};

export default PersonalityView;
