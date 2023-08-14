import {useEffect, useState, useCallback} from 'react';
import { StyleSheet, Text, View } from 'react-native';

import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Login from './src/Pages/Login/Index';
import RegisterForm from './src/Pages/Register/Index';
import Home from './src/Pages/Home/Index';
import Explore from './src/Pages/Explore/Index';
import Place from './src/Pages/Place/Index';
import FavoritesList from './src/Pages/Favorites/Index';
import CreateForm from './src/Pages/Create/Index';

import * as SQLite from 'expo-sqlite';

import { createUserTable, dropUserTable, getUser, truncateUserTable} from './src/Data/Users';

import Profile from './src/Pages/Profile/Index';
import { createPlacesTable, dropPlacesTable, truncatePlacesTable } from './src/Data/Places';

const Stack = createNativeStackNavigator();
const db = SQLite.openDatabase('mydatabase.db');

export default function App() {
  const [User, setUser] = useState([]);

  const loadUser = useCallback(async () => {
    await createUserTable(db);
    await createPlacesTable(db);
    await getUser(db, setUser);
    // await truncatePlacesTable(db);
    // await dropPlacesTable(db)
    // await dropUserTable(db)
    // await truncateUserTable(db);
  }, [])

  const getUsers = async () => {
    await getUser(db, setUser);
  }

  useEffect(() => {
    loadUser()
  }, [])
  
  return (
      <NavigationContainer>
          {User.length == 0
            ?
            <Stack.Navigator>
              <Stack.Screen
              name="Login"
              component={Login}
              />

              <Stack.Screen
                name="Home"
              >
                {(props) => <Home {...props} reloadUser={getUsers} />}
              </Stack.Screen>
              
              <Stack.Screen
                name="Register"
                component={RegisterForm}
              />
              <Stack.Screen
                name="Explore"
                component={Explore}
              />
              <Stack.Screen
                name="Place"
                component={Place}
              />
              <Stack.Screen
              name="Favorites"
              component={FavoritesList}
              />
              <Stack.Screen
              name="Profile"
              component={Profile}
              />
              <Stack.Screen
              name="New"
              component={CreateForm}
              />
            </Stack.Navigator>

            :
            <Stack.Navigator>
              
              <Stack.Screen
                name="Home"
              >
                {(props) => <Home {...props} reloadUser={getUsers} />}
              </Stack.Screen>

              <Stack.Screen
                name="Register"
                component={RegisterForm}
              />
              <Stack.Screen
                name="Explore"
                component={Explore}
              />
              <Stack.Screen
                name="Place"
                component={Place}
              />
              <Stack.Screen
                name="Favorites"
                component={FavoritesList}
                />
              <Stack.Screen
                name="Profile"
                component={Profile}
              />
              <Stack.Screen
              name="New"
              component={CreateForm}
              />
              <Stack.Screen
              name="Login"
              component={Login}
              />
            </Stack.Navigator>
          }
      </NavigationContainer>
  );
}
