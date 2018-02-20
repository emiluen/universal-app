import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, TouchableOpacity, Image } from 'react-native';
import { Card, CardItem, Body, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';

import Spacer from '../Spacer';
import getImageUrl from '../../../selectors/get-image-url';

const TypeList = ({ personalities }) => {
  const keyExtractor = item => item.id;

  const onPress = item =>
    Actions.types({
      match: { params: { personalityId: String(item.id), typeId: String(item.type.id) } },
    });

  return (
    <FlatList
      numColumns={2}
      data={personalities}
      renderItem={({ item }) => (
        <Card transparent style={{ paddingHorizontal: 6 }}>
          <CardItem cardBody>
            <TouchableOpacity onPress={() => onPress(item)} style={{ flex: 1 }}>
              <Image
                source={{ uri: getImageUrl(item.type.coverImageUrl, 200, 200) }}
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
              <Text style={{ fontWeight: '800' }}>{item.type.name} - {item.type.nickname}</Text>
              <Spacer size={5} />
              <Text>{item.name} Personality Type</Text>
            </Body>
          </CardItem>
        </Card>
      )}
      keyExtractor={keyExtractor}
    />
  );
};

TypeList.propTypes = {
  personalities: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default TypeList;
