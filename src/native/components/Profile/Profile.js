import React from 'react';
import PropTypes from 'prop-types';
import { View, Container, Content, List, ListItem, Body, Left, Text, Icon, Button } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { ImagePicker } from 'expo';

import Header from '../Header';
import Cover from './Cover';
import TypeList from './TypeList';
import Share from './Share';

export class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.onImageClick = this.onImageClick.bind(this);
  }

  onImageClick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    console.log(result);

    if (!result.cancelled) {
      console.log('avatar to upload', result);
    }
  };

  render() {
    const {
      member,
      loggedIn,
      userPersonalities,
      shareProfile,
    } = this.props;

    return (
      <Container>
        <Content>
          {loggedIn ?
            <View>
              <Cover
                imageUrl={member.imageUrl}
                onImageClick={this.onImageClick}
                onSettings={Actions.settings}
              />

              <Content padder>
                <Header
                  title={`Hi ${member.firstName},`}
                  content="This is your Personality Profile."
                />
              </Content>

              {userPersonalities.length ?
                <TypeList personalities={userPersonalities} />
                :
                <Content padder>
                  <Button block primary onPress={Actions.personalities} to="/personalities">
                    <Text>Take Test</Text>
                  </Button>
                </Content>
              }
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

        {loggedIn && <Share shareObject={shareProfile} />}
      </Container>
    );
  }
}

Profile.propTypes = {
  member: PropTypes.shape({}),
  loggedIn: PropTypes.bool.isRequired,
  userPersonalities: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  shareProfile: PropTypes.shape({}),
};

Profile.defaultProps = {
  member: {},
  shareProfile: null,
};

export default Profile;
