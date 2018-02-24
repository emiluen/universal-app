import React from 'react';
import PropTypes from 'prop-types';
import { Dimensions, Image } from 'react-native';
import { Container, Content, H3, Text, Button, View } from 'native-base';

import ErrorMessages from '../../../constants/errors';
import Loading from '../Loading';
import Error from '../Error';
import ArticleContainer from '../../../containers/Article';
import ArticleComponent from './Article';
import getImageUrl from '../../../selectors/get-image-url';

class TypeView extends React.Component {
  onAddPersonality = () => this.props.addPersonality(this.props.personality, this.props.type.id);
  onRemovePersonality = () => this.props.removePersonality(this.props.personality.id);

  render() {
    const {
      error,
      loading,
      type,
      canAddPersonality,
      canRemovePersonality,
    } = this.props;

    // Loading
    if (loading) return <Loading />;

    // Error
    if (error) return <Error content={error} />;

    // Type not found
    if (!type) return <Error content={ErrorMessages.recipe404} />;

    const deviceWidth = Dimensions.get('window').width;

    return (
      <Container>
        <Content>
          <Image
            source={{ uri: getImageUrl(type.coverImageUrl, deviceWidth) }}
            style={{
              height: 150,
              width: '100%',
              flex: 1,
              alignSelf: 'stretch',
            }}
          />
          <View padder>
            <H3>{type.name} - {type.nickname}</H3>
            <ArticleContainer Layout={ArticleComponent} article={type.article} />
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
          </View>
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
