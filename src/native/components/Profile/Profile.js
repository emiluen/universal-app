import React from 'react';
import PropTypes from 'prop-types';
import { View, Container, Content, List, ListItem, Body, Left, Text, Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { ImagePicker } from 'expo';

import Header from '../Header';
import Cover from './Cover';
import TypeList from './TypeList';
import Share from './Share';

export class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrl: null,
    };

    this.onImageClick = this.onImageClick.bind(this);
  }

  onImageClick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ imageUrl: result.uri });
    }
  };

  render() {
    const { imageUrl } = this.state;
    const {
      member,
      loggedIn,
      userPersonalities,
      shareProfileUrl,
    } = this.props;

    return (
      <Container>
        <Content>
          {loggedIn ?
            <View>
              <Cover
                image={imageUrl}
                onImageClick={this.onImageClick}
                onSettings={Actions.settings}
              />

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

        {loggedIn && <Share shareUrl={shareProfileUrl} />}
      </Container>
    );
  }
}

Profile.propTypes = {
  member: PropTypes.shape({}),
  loggedIn: PropTypes.bool.isRequired,
  userPersonalities: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  shareProfileUrl: PropTypes.string.isRequired,
};

Profile.defaultProps = {
  member: {},
};

export default Profile;
