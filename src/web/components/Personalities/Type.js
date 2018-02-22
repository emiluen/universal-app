import React from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  Button,
} from 'reactstrap';
import { Link } from 'react-router-dom';

import TemplateContainer from '../Templates/TemplateContainer';
import ErrorMessages from '../../../constants/errors';
import Loading from '../Loading';
import Error from '../Error';
import ArticleContainer from '../../../containers/Article';
import ArticleComponent from './Article';

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

    // Recipe not found
    if (!type) return <Error content={ErrorMessages.recipe404} />;

    return (
      <TemplateContainer>
        <Row>
          <Col sm="12">
            <h1>{type.name} - {type.nickname}</h1>
          </Col>
          <Col sm="12">
            {canAddPersonality ?
              <Button onClick={this.onAddPersonality}>
                Add to my profile
              </Button>
              : null
            }
            {canRemovePersonality ?
              <Button onClick={this.onRemovePersonality}>
                Remove from my profile
              </Button>
              : null
            }
          </Col>
        </Row>
        <Row>
          <Col lg="4" className="recipe-view-card">
            <Card>
              <CardHeader>Group</CardHeader>
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
