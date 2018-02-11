import React from 'react';
import PropTypes from 'prop-types';
import { Container, Content, H3, Text, Card, Button } from 'native-base';

import ErrorMessages from '../../constants/errors';
import Loading from './Loading';
import Error from './Error';
import ArticleContainer from '../../containers/Article';
import ArticleComponent from '../components/Article';

class TypeView extends React.Component {
  onAddPersonality = () => this.props.addPersonality(this.props.personality.id, this.props.type.id);
  onRemovePersonality = () => this.props.removePersonality(this.props.personality.id);

  render() {
    const {
      error,
      loading,
      personality,
      type,
      canAddPersonality,
      canRemovePersonality,
    } = this.props;

    // Loading
    if (loading) return <Loading />;

    // Error
    if (error) return <Error content={error} />;

    // Recipe not found
    if (!type) return <Error content={ErrorMessages.recipe404} />;

    return (
      <Container>
        <Content padder>
          <H3>Type name: {type.name}</H3>
          <Text>Personality id: {personality.id}</Text>
          {canAddPersonality ?
            <Button onPress={this.onAddPersonality}>
              <Text>Add to my profile</Text>
            </Button>
            : null
          }
          {canRemovePersonality ?
            <Button onPress={this.onRemovePersonality}>
              <Text>Remove from my profile</Text>
            </Button>
            : null
          }
          <Card>
            <ArticleContainer Layout={ArticleComponent} article={type.article} />
          </Card>
        </Content>
      </Container>
    );
  }
}

TypeView.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  personality: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
  type: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
  canAddPersonality: PropTypes.bool.isRequired,
  addPersonality: PropTypes.func.isRequired,
  canRemovePersonality: PropTypes.bool.isRequired,
  removePersonality: PropTypes.func.isRequired,
};

TypeView.defaultProps = {
  error: null,
  personality: null,
  type: null,
};

export default TypeView;
