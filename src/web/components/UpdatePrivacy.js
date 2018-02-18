import React from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  Label,
  Input,
  Button,
  FormGroup,
} from 'reactstrap';

import Loading from './Loading';

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
      <Form onSubmit={this.handleSubmit}>
        {personalities.map(item => (
          <FormGroup key={item.id} check style={{ marginTop: 20 }}>
            <Label check>
              <Input
                type="checkbox"
                name="changeEmail"
                checked={this.getCurrentValue(item)}
                onChange={() => this.handleChange(
                  item.id,
                  !this.getCurrentValue(item),
                )}
              />{' '}
              {item.name}
            </Label>
          </FormGroup>
        ))}

        <Button style={{ marginTop: 20 }} color="primary">Update</Button>
      </Form>
    );
  }
}

export default UpdateProfile;
