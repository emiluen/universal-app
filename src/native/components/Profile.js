import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, TouchableOpacity, Image } from 'react-native';
import { View, Container, Content, List, ListItem, Card, CardItem, Body, Left, Text, Icon, Thumbnail } from 'native-base';
import { Actions } from 'react-native-router-flux';

import Header from './Header';
import Spacer from './Spacer';
import getImageUrl from '../../selectors/get-image-url';

const Profile = ({
  member,
  logout,
  loggedIn,
  userPersonalities,
}) => {
  const keyExtractor = item => item.id;

  const onPress = item =>
    Actions.types({
      match: { params: { personalityId: String(item.id), typeId: String(item.type.id) } },
    });

  return (
    <Container>
      <Content>
        {loggedIn ?
          <View>
            <View
              primary
              style={{
              flex: 1,
              backgroundColor: '#473BE7',
              height: 150,
              }}
            >
              <Content
                padder
                contentContainerStyle={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Thumbnail large source={{ uri: 'http://primo.ws/files/Disks/Avatars/Avatar_girl_face3.png' }} />
                <TouchableOpacity
                  onPress={Actions.updateProfile}
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                  }}
                >
                  <Icon ios="ios-settings" android="md-settings" style={{ fontSize: 30, color: 'white' }} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={logout}
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                  }}
                >
                  <Text style={{ color: 'white' }} >
                    Log out
                  </Text>
                </TouchableOpacity>
              </Content>
            </View>
            <Content padder>
              <Header
                title={`Hi ${member.firstName},`}
                content="This is your Personality Profile."
              />
            </Content>

            <FlatList
              numColumns={2}
              data={userPersonalities}
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
          </View>
        :
          <List>
            <Content padder>
              <Header
                title="Hi there,"
                content="Please login to gain extra access"
              />
            </Content>

            <ListItem onPress={Actions.login} icon>
              <Left>
                <Icon name="power" />
              </Left>
              <Body>
                <Text>Login</Text>
              </Body>
            </ListItem>
            <ListItem onPress={Actions.signUp} icon>
              <Left>
                <Icon name="add-circle" />
              </Left>
              <Body>
                <Text>Sign Up</Text>
              </Body>
            </ListItem>
            <ListItem onPress={Actions.forgotPassword} icon>
              <Left>
                <Icon name="help-buoy" />
              </Left>
              <Body>
                <Text>Forgot Password</Text>
              </Body>
            </ListItem>
          </List>
        }
      </Content>
    </Container>
  );
};

Profile.propTypes = {
  member: PropTypes.shape({}),
  logout: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  userPersonalities: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

Profile.defaultProps = {
  member: {},
};

export default Profile;
