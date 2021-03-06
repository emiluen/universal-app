import React from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  Label,
  Input,
  FormGroup,
} from 'reactstrap';

import Loading from '../Loading';
import Button from '../Button';

class UpdateProfile extends React.Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    onFormSubmit: PropTypes.func.isRequired,
    member: PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      email: PropTypes.string,
    }).isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      firstName: props.member.firstName || '',
      lastName: props.member.lastName || '',
      email: props.member.email || '',
      password: '',
      password2: '',
      changeEmail: false,
      changePassword: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;

    this.setState({
      ...this.state,
      [event.target.name]: value,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onFormSubmit(this.state)
      .then(() => console.log('Profile updated'))
      .catch(e => console.log(`Error: ${e}`));
  }

  render() {
    const { loading } = this.props;

    // Loading
    if (loading) return <Loading />;

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormGroup>
          <Label for="firstName">First Name</Label>
          <Input
            type="text"
            name="firstName"
            id="firstName"
            placeholder="John"
            value={this.state.firstName}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="lastName">Last Name</Label>
          <Input
            type="text"
            name="lastName"
            id="lastName"
            placeholder="Doe"
            value={this.state.lastName}
            onChange={this.handleChange}
          />
        </FormGroup>

        <FormGroup check style={{ marginTop: 20 }}>
          <Label check>
            <Input
              type="checkbox"
              name="changeEmail"
              checked={this.state.changeEmail}
              onChange={this.handleChange}
            />{' '}
            Change my email
          </Label>
        </FormGroup>
        {this.state.changeEmail &&
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="john@doe.corp"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
        }

        <FormGroup check style={{ marginTop: 20 }}>
          <Label check>
            <Input
              type="checkbox"
              name="changePassword"
              checked={this.state.changePassword}
              onChange={this.handleChange}
            />{' '}
            Change my password
          </Label>
        </FormGroup>
        {this.state.changePassword &&
          <div>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="password2">Confirm Password</Label>
              <Input
                type="password"
                name="password2"
                id="password2"
                placeholder="••••••••"
                value={this.state.password2}
                onChange={this.handleChange}
              />
            </FormGroup>
          </div>
        }
        <Button button color="primary" style={{ marginTop: 20 }}>Update</Button>
      </Form>
    );
  }
}

export default UpdateProfile;
