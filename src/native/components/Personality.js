import React from 'react';
import PropTypes from 'prop-types';
import { Container, Content, Card, CardItem, H3, List, ListItem, Text, Button } from 'native-base';
import { Actions } from 'react-native-router-flux';

import Loading from './Loading';
import Error from './Error';
import ErrorMessages from '../../constants/errors';
import Spacer from './Spacer';

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

  const types = personality.types.map(item => (
    <ListItem key={item.id} rightIcon={{ style: { opacity: 0 } }}>
      <Button
        block
        bordered
        small
        onPress={() => onPress(item)}
      >
        <Text>{item.name}</Text>
      </Button>
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
  personality: PropTypes.shape({}),
};

PersonalityView.defaultProps = {
  error: null,
  personality: null,
};

export default PersonalityView;
