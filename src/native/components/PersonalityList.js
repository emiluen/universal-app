import React from 'react';
import PropTypes from 'prop-types';
import { FlatList } from 'react-native';
import { Container, Content, Card, CardItem, Body, Text, Button } from 'native-base';

import Error from './Error';
import Header from './Header';
import Spacer from './Spacer';

const PersonalityList = ({
  error,
  personalities,
}) => {
  if (error) return <Error content={error} />;

  const keyExtractor = item => item.id;

  const onPress = () => console.log('onPress');

  return (
    <Container>
      <Text>This is some text</Text>
      <Content padder>
        <Header
          title="Personality List"
          content="This is here to show how you can read and display data from a data source (in our case, Firebase)."
        />
        <FlatList
          numColumns={2}
          data={personalities}
          renderItem={({ item }) => (
            <Card transparent style={{ paddingHorizontal: 6 }}>
              <CardItem cardBody>
                <Body>
                  <Spacer size={10} />
                  <Text style={{ fontWeight: '800' }}>{item.name}</Text>
                  <Spacer size={15} />
                  <Button
                    block
                    bordered
                    small
                    onPress={() => onPress(item)}
                  >
                    <Text>View Recipe</Text>
                  </Button>
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
