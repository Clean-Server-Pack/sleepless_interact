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
  


  
  const [curTheme, setCurTheme] = useState(theme);
  
  useNuiEvent<ThemeProps>('SET_THEME', (data) => {

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
  }); 



  return (
        
    <MantineProvider theme={curTheme} defaultColorScheme='dark'>
      <Interaction />
    </MantineProvider>
  );
};

export default App;