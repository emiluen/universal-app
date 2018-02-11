import React from 'react';
import PropTypes from 'prop-types';
import { View, FlatList } from 'react-native';
import { Container, Content, List, ListItem, Card, CardItem, Body, Left, Text, Icon, Button } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Header from './Header';

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
        <List>
          {loggedIn ?
            <View>
              <Content padder>
                <Header
                  title={`Hi ${member.firstName},`}
                  content={`You are currently logged in as ${member.email}`}
                />
              </Content>

              <ListItem>
                <FlatList
                  numColumns={2}
                  data={userPersonalities}
                  renderItem={({ item }) => (
                    <Card transparent style={{ paddingHorizontal: 6 }}>
                      <CardItem cardBody>
                        <Text>{item.name}</Text>
                        <Body>
                          <Button
                            block
                            bordered
                            small
                            onPress={() => onPress(item)}
                          >
                            <Text>{item.type.name}</Text>
                          </Button>
                        </Body>
                      </CardItem>
                    </Card>
                  )}
                  keyExtractor={keyExtractor}
                />
              </ListItem>

              <ListItem onPress={Actions.updateProfile} icon>
                <Left>
                  <Icon name="person-add" />
                </Left>
                <Body>
                  <Text>Update My Profile</Text>
                </Body>
              </ListItem>
              <ListItem onPress={logout} icon>
                <Left>
                  <Icon name="power" />
                </Left>
                <Body>
                  <Text>Logout</Text>
                </Body>
              </ListItem>
            </View>
          :
            <View>
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
            </View>
          }
        </List>
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
