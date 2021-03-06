import React from 'react';
import { Scene, Tabs, Stack } from 'react-native-router-flux';
import { Icon } from 'native-base';

import DefaultProps from '../constants/navigation';
// import AppConfig from '../../constants/config';
// import AboutComponent from '../components/About';

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

// import PublicProfileContainer from '../../containers/PublicProfile';
// import PublicProfileComponent from '../components/Profile/PublicProfile';

import SettingsContainer from '../../containers/Settings';
import SettingsComponent from '../components/Settings/Settings';

const Index = (
  <Stack key="root">
    <Scene hideNavBar key="tabbarRoot">
      <Tabs
        key="tabbar"
        swipeEnabled
        type="replace"
        showLabel={false}
        {...DefaultProps.tabProps}
      >
        {/*
          <Stack
            key="home"
            // title={AppConfig.appName.toUpperCase()}
            title="Quizzes"
            icon={() => <Icon name="planet" {...DefaultProps.icons} />}
            {...DefaultProps.navbarProps}
          >
            <Scene key="home" component={AboutComponent} />
          </Stack>
        */}

        {/*
          <Stack
            key="publicProfile"
            title="PUBLIC PROFILE"
            icon={() => <Icon name="planet" {...DefaultProps.icons} />}
            {...DefaultProps.navbarProps}
          >
            <Scene
              key="publicProfile"
              component={PublicProfileContainer}
              Layout={PublicProfileComponent}
              match={{ params: { id: 'K3AkxRZ2Z0WGnDujeCvFzogWe7k2' } }}
            />
          </Stack>
        */}

        <Stack
          key="personalities"
          title="PERSONALITIES"
          icon={() => <Icon name="md-aperture" {...DefaultProps.icons} />}
          {...DefaultProps.navbarProps}
        >
          <Scene
            key="personalities"
            component={PersonalitiesContainer}
            Layout={PersonalitiesComponent}
          />
        </Stack>

        <Stack
          key="profile"
          title="PROFILE"
          icon={() => <Icon ios="ios-body" android="md-body" {...DefaultProps.icons} />}
          {...DefaultProps.navbarProps}
        >
          <Scene key="profileHome" component={ProfileContainer} Layout={ProfileComponent} />
          <Scene
            back
            key="signUp"
            title="SIGN UP"
            {...DefaultProps.navbarProps}
            component={SignUpContainer}
            Layout={SignUpComponent}
          />
          <Scene
            back
            key="login"
            title="LOGIN"
            {...DefaultProps.navbarProps}
            component={LoginContainer}
            Layout={LoginComponent}
          />
          <Scene
            back
            key="forgotPassword"
            title="FORGOT PASSWORD"
            {...DefaultProps.navbarProps}
            component={ForgotPasswordContainer}
            Layout={ForgotPasswordComponent}
          />
          <Scene
            back
            key="settings"
            title="SETTINGS"
            {...DefaultProps.navbarProps}
            component={SettingsContainer}
            Layout={SettingsComponent}
          />
        </Stack>
      </Tabs>
    </Scene>

    <Scene
      back
      clone
      key="personality"
      title="PERSONALITY"
      {...DefaultProps.navbarProps}
      component={PersonalityContainer}
      Layout={PersonalityComponent}
    />
    <Scene
      back
      clone
      key="types"
      title="TYPES"
      {...DefaultProps.navbarProps}
      component={TypeContainer}
      Layout={TypeComponent}
    />
    <Scene
      back
      clone
      key="quiz"
      title="QUIZ"
      {...DefaultProps.navbarProps}
      component={QuizContainer}
      Layout={QuizComponent}
    />

  </Stack>
);

export default Index;
