import React from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  Label,
  Input,
  Button,
  FormGroup,
} from 'reactstrap';
import { Link } from 'react-router-dom';

import Loading from '../Loading';

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

  handleUserChange = (event) => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.checked,
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
      member,
      personalities,
    } = this.props;

    // Loading
    if (loading) return <Loading />;

    return (
      <Form onSubmit={this.handleSubmit}>
        <legend>Public Profile Privacy</legend>
        <p>
          Select what you want to keep private in your Public Personality Profile.
          You can see how it looks <Link target="_blank" to={`/profile/${member.uid}`}>here</Link>.
        </p>

        <FormGroup check style={{ marginTop: 20 }}>
          <Label check>
            <Input
              type="checkbox"
              name="publicName"
              checked={this.state.publicName}
              onChange={this.handleUserChange}
            />{' '}
            First Name
          </Label>
        </FormGroup>

        <FormGroup check style={{ marginTop: 20 }}>
          <Label check>
            <Input
              type="checkbox"
              name="publicImageUrl"
              checked={this.state.publicImageUrl}
              onChange={this.handleUserChange}
            />{' '}
            Profile Picture
          </Label>
        </FormGroup>

        <div style={{ marginTop: 40 }}>
          {personalities.length ?
            <div>
              <p>
                You have these Personality Types in your Personality Profile.
                Do you want any of them to be private?
              </p>
              {personalities.map(item => (
                <FormGroup key={item.id} check style={{ marginTop: 20 }}>
                  <Label check>
                    <Input
                      type="checkbox"
                      checked={this.getCurrentValue(item)}
                      onChange={() => this.handlePersonalityChange(
                        item.id,
                        !this.getCurrentValue(item),
                      )}
                    />{' '}
                    {item.name}
                  </Label>
                </FormGroup>
              ))}
            </div>
            :
            <p>
              You don't have any Personality Types in your Personality Profile.
              When you do, you can set their privacy here.
            </p>
          }
        </div>

        <Button style={{ marginTop: 20 }} color="primary">Update</Button>
      </Form>
    );
  }
}

export default UpdatePrivacy;
