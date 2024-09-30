import '@mantine/dates/styles.css';
import React, { useEffect, useState } from "react";
import { MantineProvider } from '@mantine/core';
import theme from '../theme';
import { useSettings } from '../providers/settings/settings';
import Interaction from './Interact';
import { fetchNui } from '../utils/fetchNui';

const App: React.FC = () => {
  const [curTheme, setCurTheme] = useState(theme);
  const settings = useSettings();
  // Ensure the theme is updated when the settings change

  useEffect(() => {
    const updatedTheme = {
      ...theme, // Start with the existing theme object
      colors: {
        ...theme.colors, // Copy the existing colors
        custom: settings.customTheme
      },
    };
    
    setCurTheme(updatedTheme);

    // set primary color
    setCurTheme({
      ...updatedTheme,
      primaryColor: settings.primaryColor,
      primaryShade: settings.primaryShade,
    });

  }, [settings]);
 
  useEffect(() => {
    fetchNui("loaded");
  }, []);
  return (
        
    <MantineProvider theme={curTheme} defaultColorScheme='dark'>
      <Interaction />
    </MantineProvider>
  );
};

export default App;
