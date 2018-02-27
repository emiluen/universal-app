import React from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
  Card,
  CardBody,
  Button,
} from 'reactstrap';
import { Link } from 'react-router-dom';

import { TemplateContainer } from '../Templates/Templates';
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
      personality,
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

    return (
      <div>
        <div style={{ height: 200 }}>
          <img
            src={getImageUrl(type.coverImageUrl, { width: 1200 })}
            style={{ height: 200, width: '100%', objectFit: 'cover' }}
            alt="Type"
          />
        </div>
        <TemplateContainer>
          <Row>
            <Col xs="12" md="8">
              <h1>{type.name} - {type.nickname}</h1>
            </Col>
            <Col xs="12" md="4">
              {canAddPersonality ?
                <Button color="primary" onClick={this.onAddPersonality} className="float-md-right">
                  Add to my profile
                </Button>
                : null
              }
              {canRemovePersonality ?
                <Button outline color="primary" onClick={this.onRemovePersonality} className="float-md-right">
                  Remove from my profile
                </Button>
                : null
              }
            </Col>
          </Row>
          <Row>
            <Col sm="12" className="recipe-view-card">
              <Card>
                <CardBody>
                  <ArticleContainer
                    Layout={ArticleComponent}
                    article={type.article}
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row className="pb-3">
            <Col sm="12">
              <Link className="btn btn-secondary" to={`/personalities/${personality.id}`}><i className="icon-arrow-left" /> Back</Link>
            </Col>
          </Row>
        </TemplateContainer>
      </div>
    );
  }
}

TypeView.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  personality: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
  type: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
  canAddPersonality: PropTypes.bool.isRequired,
  addPersonality: PropTypes.func.isRequired,
  canRemovePersonality: PropTypes.bool.isRequired,
  removePersonality: PropTypes.func.isRequired,
};

TypeView.defaultProps = {
  error: null,
};

export default TypeView;
