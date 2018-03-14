import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, TouchableOpacity, Image } from 'react-native';
import { Container, Content, Card, CardItem, Body, Text, Button } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { Flag } from 'flag';

import Error from '../Error';
import Header from '../Header';
import Spacer from '../Spacer';
import getImageUrl from '../../../selectors/get-image-url';

const PersonalityList = ({
  error,
  personalities,
}) => {
  if (error) return <Error content={error} />;

  const keyExtractor = item => item.id;

  const onPersonalityPress = item =>
    Actions.personality({ match: { params: { personalityId: String(item.id) } } });

  const onQuizPress = item =>
    Actions.quiz({ match: { params: { personalityId: String(item.id) } } });

  return (
    <Container>
      <Content padder>
        <Flag
          name="quizzes"
          render={() => (
            <Header
              title="Personality Tests"
              content="This is here to show how you can read and display data from a data source (in our case, Firebase)."
            />
          )}
          fallbackRender={() => (
            <Header
              title="Personality Typologies"
              content="This is here to show how you can read and display data from a data source (in our case, Firebase)."
            />
          )}
        />
        <FlatList
          numColumns={2}
          data={personalities}
          renderItem={({ item }) => (
            <Card transparent style={{ paddingHorizontal: 6 }}>
              <CardItem cardBody>
                <TouchableOpacity onPress={() => onPersonalityPress(item)} style={{ flex: 1 }}>
                  <Image
                    source={{ uri: getImageUrl(item.profileImageUrl, { width: 200, height: 200 }) }}
                    style={{
                      height: 150,
                      width: null,
                      flex: 1,
                      borderRadius: 5,
                    }}
                  />
                </TouchableOpacity>
              </CardItem>
              <CardItem cardBody>
                <Body>
                  <Spacer size={10} />
                  <Text style={{ fontWeight: '800' }}>{item.name}</Text>
                  <Spacer size={15} />
                  <Flag
                    name="quizzes"
                    render={() => (
                      <Button
                        block
                        bordered
                        small
                        onPress={() => onQuizPress(item)}
                      >
                        <Text>Take Test</Text>
                      </Button>
                    )}
                    fallbackRender={() => (
                      <Button
                        block
                        bordered
                        small
                        onPress={() => onPersonalityPress(item)}
                      >
                        <Text>Learn More</Text>
                      </Button>
                    )}
                  />
                  <Spacer size={5} />
                </Body>
              </CardItem>
            </Card>
          )}
          keyExtractor={keyExtractor}
        />
      </Content>
    </Container>
  );
};

PersonalityList.propTypes = {
  error: PropTypes.string,
  personalities: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

PersonalityList.defaultProps = {
  error: null,
};

export default PersonalityList;
