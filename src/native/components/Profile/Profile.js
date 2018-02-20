import React from 'react';
import PropTypes from 'prop-types';
import { View, Container, Content, List, ListItem, Body, Left, Text, Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';

import Header from '../Header';
import Cover from './Cover';
import TypeList from './TypeList';

const Profile = ({
  member,
  loggedIn,
  userPersonalities,
}) => (
  <Container>
    <Content>
      {loggedIn ?
        <View>
          <Cover onSettings={Actions.updateProfile} />

          <Content padder>
            <Header
              title={`Hi ${member.firstName},`}
              content="This is your Personality Profile."
            />
          </Content>

          <TypeList personalities={userPersonalities} />
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

Profile.propTypes = {
  member: PropTypes.shape({}),
  loggedIn: PropTypes.bool.isRequired,
  userPersonalities: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

Profile.defaultProps = {
  member: {},
};

export default Profile;
