import React from 'react';
import PropTypes from 'prop-types';
import { Container, Content, Card, CardItem, H3, List, ListItem, Text, Button } from 'native-base';

import Error from './Error';
import Spacer from './Spacer';

const QuizList = ({
  error,
  personalities,
}) => {
  if (error) return <Error content={error} />;

  console.log('personalities', personalities);

  // Build Cards for Listing
  const quizzes = personalities.map(item => (
    <ListItem key={item.id} rightIcon={{ style: { opacity: 0 } }}>
      <Text>{item.name}</Text>
      {item.personalityMember ?
        <Text>MEMBER</Text>
        :
        <Button onClick={() => {}}><Text>BECOME MEMBER</Text></Button>
      }
    </ListItem>
  ));

  return (
    <Container>
      <Content padder>
        <H3>Quizzes</H3>
        <Spacer size={15} />

        <Card>
          <CardItem>
            <Content>
              <List>
                {quizzes}
              </List>
            </Content>
          </CardItem>
        </Card>
      </Content>
    </Container>
  );
};

QuizList.propTypes = {
  error: PropTypes.string,
  personalities: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

QuizList.defaultProps = {
  error: null,
};

export default QuizList;
