import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Templates
import TemplateNothing from '../components/TemplateNothing';
import TemplateSidebar from '../components/TemplateSidebar';

// Routes
import RecipesContainer from '../../containers/Recipes';
import RecipesComponent from '../components/Recipes';
import RecipeViewComponent from '../components/Recipe';

import PersonalitiesContainer from '../../containers/Personalities';
import PersonalitiesComponent from '../components/Personalities';

import PersonalityContainer from '../../containers/Personality';
import PersonalityComponent from '../components/Personality';

import TypeContainer from '../../containers/Type';
import TypeComponent from '../components/Type';

import QuizzesContainer from '../../containers/Quizzes';
import QuizzesComponent from '../components/Quizzes';

import SignUpContainer from '../../containers/SignUp';
import SignUpComponent from '../components/SignUp';

import LoginContainer from '../../containers/Login';
import LoginComponent from '../components/Login';

import ForgotPasswordContainer from '../../containers/ForgotPassword';
import ForgotPasswordComponent from '../components/ForgotPassword';

import ProfileContainer from '../../containers/Profile';
import ProfileComponent from '../components/Profile';

import UpdateProfileContainer from '../../containers/UpdateProfile';
import UpdateProfileComponent from '../components/UpdateProfile';

import Error from '../components/Error';

const Index = () => (
  <Switch>
    <Route
      exact
      path="/"
      render={props => (
        <TemplateSidebar>
          <QuizzesContainer {...props} Layout={QuizzesComponent} />
        </TemplateSidebar>
      )}
    />
    <Route
      path="/sign-up"
      render={props => (
        <TemplateNothing>
          <SignUpContainer {...props} Layout={SignUpComponent} />
        </TemplateNothing>
      )}
    />
    <Route
      path="/login"
      render={props => (
        <TemplateNothing>
          <LoginContainer {...props} Layout={LoginComponent} />
        </TemplateNothing>
      )}
    />
    <Route
      path="/forgot-password"
      render={props => (
        <TemplateNothing>
          <ForgotPasswordContainer {...props} Layout={ForgotPasswordComponent} />
        </TemplateNothing>
      )}
    />
    <Route
      path="/profile"
      render={props => (
        <TemplateSidebar>
          <ProfileContainer {...props} Layout={ProfileComponent} />
        </TemplateSidebar>
      )}
    />
    <Route
      path="/update-profile"
      render={props => (
        <TemplateSidebar>
          <UpdateProfileContainer {...props} Layout={UpdateProfileComponent} />
        </TemplateSidebar>
      )}
    />
    <Route
      exact
      path="/personalities"
      render={props => (
        <TemplateSidebar>
          <PersonalitiesContainer {...props} Layout={PersonalitiesComponent} />
        </TemplateSidebar>
      )}
    />
    <Route
      exact
      path="/personalities/:personalityId"
      render={props => (
        <TemplateSidebar>
          <PersonalityContainer {...props} Layout={PersonalityComponent} />
        </TemplateSidebar>
      )}
    />
    <Route
      exact
      path="/personalities/:personalityId/types/:typeId"
      render={props => (
        <TemplateSidebar>
          <TypeContainer {...props} Layout={TypeComponent} />
        </TemplateSidebar>
      )}
    />
    <Route
      path="/recipes"
      render={props => (
        <TemplateSidebar>
          <RecipesContainer {...props} Layout={RecipesComponent} />
        </TemplateSidebar>
      )}
    />
    <Route
      path="/recipe/:id"
      render={props => (
        <TemplateSidebar>
          <RecipesContainer {...props} Layout={RecipeViewComponent} />
        </TemplateSidebar>
      )}
    />
    <Route
      render={props => (
        <TemplateSidebar>
          <Error {...props} title="404" content="Sorry, the route you requested does not exist" />
        </TemplateSidebar>
      )}
    />
  </Switch>
);

export default Index;
