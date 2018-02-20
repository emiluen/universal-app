import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Templates
import TemplateNothing from '../components/Templates/TemplateNothing';
import TemplateHeader from '../components/Templates/TemplateHeader';

// Routes
import Home from '../components/Home/Home';

import RecipesContainer from '../../containers/Recipes';
import RecipesComponent from '../components/Recipes/Recipes';
import RecipeViewComponent from '../components/Recipes/Recipe';

import PersonalitiesContainer from '../../containers/Personalities';
import PersonalitiesComponent from '../components/Personalities/Personalities';

import PersonalityContainer from '../../containers/Personality';
import PersonalityComponent from '../components/Personalities/Personality';

import TypeContainer from '../../containers/Type';
import TypeComponent from '../components/Personalities/Type';

import QuizContainer from '../../containers/Quiz';
import QuizComponent from '../components/Quiz/Quiz';

import SignUpContainer from '../../containers/SignUp';
import SignUpComponent from '../components/Auth/SignUp';

import LoginContainer from '../../containers/Login';
import LoginComponent from '../components/Auth/Login';

import ForgotPasswordContainer from '../../containers/ForgotPassword';
import ForgotPasswordComponent from '../components/Auth/ForgotPassword';

import ProfileContainer from '../../containers/Profile';
import ProfileComponent from '../components/Profile/Profile';

import PublicProfileContainer from '../../containers/PublicProfile';
import PublicProfileComponent from '../components/Profile/PublicProfile';

import SettingsContainer from '../../containers/Settings';
import SettingsComponent from '../components/Settings/Settings';

import Error from '../components/Error';

const Index = () => (
  <Switch>
    <Route
      exact
      path="/"
      render={props => (
        <TemplateHeader>
          <Home {...props} />
        </TemplateHeader>
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
      exact
      path="/profile"
      render={props => (
        <TemplateHeader>
          <ProfileContainer {...props} Layout={ProfileComponent} />
        </TemplateHeader>
      )}
    />
    <Route
      path="/profile/:id"
      render={props => (
        <TemplateHeader>
          <PublicProfileContainer {...props} Layout={PublicProfileComponent} />
        </TemplateHeader>
      )}
    />
    <Route
      path="/update-profile"
      render={props => (
        <TemplateHeader>
          <SettingsContainer {...props} Layout={SettingsComponent} />
        </TemplateHeader>
      )}
    />
    <Route
      exact
      path="/personalities"
      render={props => (
        <TemplateHeader>
          <PersonalitiesContainer {...props} Layout={PersonalitiesComponent} />
        </TemplateHeader>
      )}
    />
    <Route
      exact
      path="/personalities/:personalityId"
      render={props => (
        <TemplateHeader>
          <PersonalityContainer {...props} Layout={PersonalityComponent} />
        </TemplateHeader>
      )}
    />
    <Route
      exact
      path="/personalities/:personalityId/types/:typeId"
      render={props => (
        <TemplateHeader>
          <TypeContainer {...props} Layout={TypeComponent} />
        </TemplateHeader>
      )}
    />
    <Route
      exact
      path="/personalities/:personalityId/quiz"
      render={props => (
        <TemplateHeader>
          <QuizContainer {...props} Layout={QuizComponent} />
        </TemplateHeader>
      )}
    />
    <Route
      path="/recipes"
      render={props => (
        <TemplateHeader>
          <RecipesContainer {...props} Layout={RecipesComponent} />
        </TemplateHeader>
      )}
    />
    <Route
      path="/recipe/:id"
      render={props => (
        <TemplateHeader>
          <RecipesContainer {...props} Layout={RecipeViewComponent} />
        </TemplateHeader>
      )}
    />
    <Route
      render={props => (
        <TemplateHeader>
          <Error {...props} title="404" content="Sorry, the route you requested does not exist" />
        </TemplateHeader>
      )}
    />
  </Switch>
);

export default Index;
