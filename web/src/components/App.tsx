import { MantineProvider } from '@mantine/core';
import '@mantine/dates/styles.css';
import React, { useEffect, useState } from "react";
import { useSettings } from '../providers/settings/settings';
import theme from '../theme';
import Interaction from './Interact';

const App: React.FC = () => {
  // Ensure the theme is updated when the settings change
  
  
  
  const [curTheme, setCurTheme] = useState(theme);
  const settings = useSettings();


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
 

  return (
        
    <MantineProvider theme={curTheme} defaultColorScheme='dark'>
      <Interaction />
    </MantineProvider>
  );
};

export default App;
