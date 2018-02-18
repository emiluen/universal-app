import React from 'react';
import PropTypes from 'prop-types';
import { Text, Body, ListItem, Form, CheckBox, Button, Container, Content } from 'native-base';
import Loading from './Loading';
import Spacer from './Spacer';
import Header from './Header';

class UpdateProfile extends React.Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    onFormSubmit: PropTypes.func.isRequired,
    personalities: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getCurrentValue = item => (
    typeof (this.state[item.id]) !== 'undefined' ? this.state[item.id] : item.isPrivate
  );

  handleChange = (name, val) => {
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
                  onPress={() => this.handleChange(
                    item.id,
                    !this.getCurrentValue(item),
                  )}
                />
              </ListItem>
            ))}

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

export default UpdateProfile;
