import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { getProfile } from '../../apis/auth.api';
import { useAuth } from '../../context/AuthContext';
import CreatePost from '../screens/CreatePost';
import Friends from '../screens/Friends';
import Home from '../screens/Home';
import Spinner from '../screens/Spinner';
import Login from '../screens/Login';
import Profile from '../screens/Profile';
import EditProfile from '../screens/EditProfile';
import Search from '../screens/Search';
import Register from '../screens/Register';
import { Button, Text } from 'react-native';
import StyledButton from '../layouts/Button';

const Stacks = () => {
  const Stack = createNativeStackNavigator();

  const {
    authStateContext: { isLogged },
    dispatchAuth,
  } = useAuth();

  useEffect(() => {
    const refreshApp = async () => {
      const result = await getProfile();
      dispatchAuth({
        type: 'REFRESH_TOKEN',
        payload: {
          currentUser: result?.data,
        },
      });
    };

    AsyncStorage.getItem('isLogged').then(value => {
      if (value === 'true') {
        refreshApp();
      } else {
        dispatchAuth({
          type: 'SET_LOADING',
          payload: { isLoading: false },
        });
      }
    });
  }, [dispatchAuth]);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          animation: 'slide_from_right',
        }}
      >
        {localStorage.getItem('isLogged') == 'true' ? (
          <React.Fragment>
            <Stack.Screen
              name="home"
              component={Home}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="friends"
              component={Friends}
              options={{
                headerTitle: 'Friends',
              }}
            />
            <Stack.Screen
              name="profile"
              component={Profile}
              options={{
                headerTitle: 'Profile',
              }}
            />
            <Stack.Screen
              name="editProfile"
              component={EditProfile}
              options={{
                headerTitle: 'Edit profile',
              }}
            />
            <Stack.Screen
              name="search"
              component={Search}
              options={{
                headerTitle: 'Search',
              }}
            />
            <Stack.Screen
              name="createPost"
              component={CreatePost}
              options={{
                headerTitle: 'POST',
                animation: 'slide_from_bottom',
              }}
            />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Stack.Screen
              name="login"
              component={Login}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="register"
              component={Register}
              options={{
                headerShown: false,
              }}
            />
          </React.Fragment>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Stacks;
