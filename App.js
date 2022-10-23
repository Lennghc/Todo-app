import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useCallback } from 'react';

import Home from './Components/Home';

import { Container } from './assets/appStyles';

import AsyncStorage from '@react-native-async-storage/async-storage';

import * as SplashScreen from 'expo-splash-screen';


SplashScreen.preventAutoHideAsync();

export default function App() {
  const [ready, setReady] = useState(false);
  const initialTodas = [];
  const [todos, setTodos] = useState(initialTodas);

  useEffect(() => {
    async function prepare() {
      try {
        await AsyncStorage.getItem("storedTodos").then(data => {
          if (data !== null) {
            setTodos(JSON.parse(data))
          }
        })
      } catch (e) {
        console.warn(e);
      } finally {
        setReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (ready) {
      await SplashScreen.hideAsync();
    }
  }, [ready]);

  if (!ready) {
    return null;
  }


  return (
    <Container onLayout={onLayoutRootView}>
      <Home todos={todos} setTodos={setTodos} />
      <StatusBar style='light' />
    </Container>
  );
}






