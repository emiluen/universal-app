import React from 'react';
import PropTypes from 'prop-types';
import { Platform, Share } from 'react-native';
import { View, Container, Content, List, ListItem, Body, Left, Text, Icon, Fab } from 'native-base';
import { Actions } from 'react-native-router-flux';

import Header from '../Header';
import Cover from './Cover';
import TypeList from './TypeList';

const onShare = () => {
  const url = 'https://aftonbladet.se';
  const title = 'This is a title';
  const message = 'This is a message';
  const displayMessage = Platform.OS === 'ios' ? message : `${message} ${url}`;

  Share.share({
    title,
    message: displayMessage,

    // iOS
    url,
    subject: title,

    // Android
    dialogTitle: title,
  });
};

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

    {loggedIn && (
      <Fab
        position="bottomRight"
        style={{ backgroundColor: '#473BE7' }}
        direction="up"
        containerStyle={{ }}
        onPress={onShare}
      >
        {/* Brand background color */}
        <Icon ios="ios-share" android="md-share" style={{ fontSize: 30, color: 'white' }} />

        {/* TouchableOpacity as child causes warning for invalid view color key */}
        {/*
          <TouchableOpacity onPress={onShare} >
            <Icon ios="ios-share" android="md-share" style={{ fontSize: 30, color: 'white' }} />
          </TouchableOpacity>
        */}
      </Fab>
    )}
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
