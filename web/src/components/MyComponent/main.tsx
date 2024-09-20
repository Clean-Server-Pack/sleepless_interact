
import {Box, Center, Image, Title, Text, useMantineTheme} from '@mantine/core';
import React, { useState } from "react";
import { useNuiEvent } from "../../hooks/useNuiEvent";
import { fetchNui } from "../../utils/fetchNui";

export default function MyComponent() {
  const [ opened, setOpened ] = useState(true);
  const theme = useMantineTheme();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useNuiEvent('UI_STATE' , (data: any) => {
    if (data.action === 'OPEN') {
      setOpened(true);
    }
    if (data.action === 'CLOSE') {
      setOpened(false);
    }

  })

  // Listen for escape key 
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (opened){
          setOpened(false)
          fetchNui('LOSE_FOCUS', {})
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });
  
  

  return (
    <>
      {opened ? 
        <Center w='100%' h='100%'>
          <Box bg='dark.8' w='25%' h='fit-content' p='sm' style={{
            borderRadius: 'var(--mantine-radius-md)', 

            display: 'flex',
            flexDirection: 'column',
          }}>
            <Title order={1} style={{textAlign: 'center'}}>Fob</Title>
            <Text>
              A little silly React FiveM NUI boilerplate with mantine theming ready to go. 
            </Text>
            <Image src='https://static.vecteezy.com/system/resources/previews/024/704/874/original/koala-with-ai-generated-free-png.png' alt='Bernie' h='90%' w='100%' />

            <Text>Theme colour is : </Text>
            <Box
              bg={theme.primaryColor}
              h='20px'
              w='100%'
            ></Box>
          </Box>


        </Center>
      : ''}
    </>
  );
}
