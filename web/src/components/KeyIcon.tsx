import { useMantineTheme, Flex } from "@mantine/core";
import colorWithAlpha from "../utils/colorWithAlpha";
import { useState } from "react";
import { useNuiEvent } from "../hooks/useNuiEvent";

function KeyIcon() {
  const theme = useMantineTheme();

  const [keyPressed, setKeyPressed] = useState(false);
  const [timeout, setTimeoutVar] = useState<NodeJS.Timeout | null>(null);

  useNuiEvent('keyPressed', (pressed: boolean) => {
    setKeyPressed(pressed);
    if (timeout) {
      clearTimeout(timeout);
    }
    const newTimeout = setTimeout(() => {
      setKeyPressed(false);
    }, 1000);

    setTimeoutVar(newTimeout);
  });

  return (
    <Flex
      // mt='0.2vh'
      bg='rgba(0,0,0,0.5)'
      direction={'column'}
      align={'center'}
      justify={'center'}
      h='3vh'
      w='3vh'
      style={{
        aspectRatio: 1/1,
        fontSize: theme.fontSizes.xs,
        borderRadius: theme.radius.xxs,
        fontFamily: 'Akrobat Bold',
        outline:  `${keyPressed ? '0.2vh' : '0.1vh'} solid ${colorWithAlpha(theme.colors[theme.primaryColor][theme.primaryShade as number], 0.8)}`,
      }}
    >
      E
    </Flex>
  )
}

export default KeyIcon;