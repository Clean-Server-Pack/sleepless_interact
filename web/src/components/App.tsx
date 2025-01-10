import { MantineColorShade, MantineColorsTuple, MantineProvider } from '@mantine/core';
import '@mantine/dates/styles.css';
import React, { useEffect, useState } from "react";
import { useNuiEvent } from '../hooks/useNuiEvent';
import theme from '../theme';
import Interaction from './Interact';


type ThemeProps = {
  customTheme: MantineColorsTuple;
  primaryColor: string;
  primaryShade: MantineColorShade;
}

const App: React.FC = () => {
  // Ensure the theme is updated when the settings change
  
  useEffect(() => {
    console.log('THE APP HAS LOADED FOR SLEEPLESS INTERACT IS IT TOO SOON?');
  }, []);

  
  
  const [curTheme, setCurTheme] = useState(theme);
  
  useNuiEvent<ThemeProps>('SET_THEME', (data) => {
    console.log('THEME DATA', data);
    const updatedTheme = {
      ...theme, // Start with the existing theme object
      colors: {
        ...theme.colors, // Copy the existing colors
        custom: data.customTheme
      },
    };

    setCurTheme(updatedTheme);

    // set primary color
    setCurTheme({
      ...updatedTheme,
      primaryColor: data.primaryColor,
      primaryShade: data.primaryShade,
    });

    console.log('SET THE THEME FOR THIS DUI OBJECT', data);
  }); 



  return (
        
    <MantineProvider theme={curTheme} defaultColorScheme='dark'>
      <Interaction />
    </MantineProvider>
  );
};

export default App;