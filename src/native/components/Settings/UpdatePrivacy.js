import React from 'react';
import PropTypes from 'prop-types';
import { Text, Body, ListItem, Form, CheckBox, Button, Container, Content } from 'native-base';
import Loading from '../Loading';
import Spacer from '../Spacer';
import Header from '../Header';

class UpdatePrivacy extends React.Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    member: PropTypes.shape({
      publicName: PropTypes.bool,
      publicImageUrl: PropTypes.bool,
    }).isRequired,
    onFormSubmit: PropTypes.func.isRequired,
    personalities: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      personalities: {},
      publicName: props.member.publicName,
      publicImageUrl: props.member.publicImageUrl,
    };

    this.handlePersonalityChange = this.handlePersonalityChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getCurrentValue = item => (
    typeof (this.state.personalities[item.id]) !== 'undefined' ? this.state.personalities[item.id] : item.isPrivate
  );

  handlePersonalityChange = (name, val) => {
    this.setState({
      ...this.state,
      personalities: { ...this.state.personalities, [name]: val },
    });
  }

  handleUserChange = (name, val) => {
    this.setState({
      ...this.state,
      [name]: val,
    });
  }

  handleSubmit = () => {
    this.props.onFormSubmit(this.state)
      .then(() => console.log('Privacy Updated'))
      .catch(e => console.log(`Error: ${e}`));
  }

  render() {
    const {
      loading,
      personalities,
    } = this.props;

    // Loading
    if (loading) return <Loading />;

    return (
      <Container>
        <Content padder>
          <Header
            title="Update my privacy"
            content="It's important for who can see your profile."
          />

          <Form>
            {personalities.map(item => (
              <ListItem key={item.id}>
                <Body>
                  <Text>{item.name}</Text>
                </Body>
                <CheckBox
                  checked={this.getCurrentValue(item)}
                  onPress={() => this.handlePersonalityChange(
                    item.id,
                    !this.getCurrentValue(item),
                  )}
                />
              </ListItem>
            ))}

            <ListItem>
              <Body>
                <Text>Make first name public</Text>
              </Body>
              <CheckBox
                checked={this.state.publicName}
                onPress={() => this.handleUserChange('publicName', !this.state.publicName)}
              />
            </ListItem>

            <ListItem>
              <Body>
                <Text>Make profile picture public</Text>
              </Body>
              <CheckBox
                checked={this.state.publicImageUrl}
                onPress={() => this.handleUserChange('publicImageUrl', !this.state.publicImageUrl)}
              />
            </ListItem>

            <Spacer size={20} />

            <Button block onPress={this.handleSubmit}>
              <Text>Update Privacy</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}

export default UpdatePrivacy;
