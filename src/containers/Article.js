import React from 'react';
import PropTypes from 'prop-types';

class Article extends React.Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    article: PropTypes.shape({}).isRequired,
    title: PropTypes.bool,
    readMore: PropTypes.bool,
  };

  static defaultProps = {
    title: null,
    readMore: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
    };

    this.onToggle = this.onToggle.bind(this);
  }

  onToggle = () => {
    this.setState({
      expanded: !this.state.expanded,
    });
  }

  render() {
    const {
      Layout,
      article,
      title,
      readMore,
    } = this.props;
    const { expanded } = this.state;

    let displayText = article.description;

    if (readMore && !expanded && article.description) {
      displayText = article.description.split('\n', 1).join();
    }

    return (
      <Layout
        title={title ? article.title : null}
        markdown={displayText}
        onToggle={this.onToggle}
        readMore={readMore}
        buttonText={expanded ? 'Read Less' : 'Read More'}
      />
    );
  }
}

export default Article;
