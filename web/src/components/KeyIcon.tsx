import { useMantineTheme, Flex } from "@mantine/core";
import colorWithAlpha from "../utils/colorWithAlpha";
import { useMemo, useState } from "react";
import { useNuiEvent } from "../hooks/useNuiEvent";
import { OptionProps } from "./Interact";

function KeyIcon(props: {options: OptionProps[]}) {



  const theme = useMantineTheme();


  const isSingular = useMemo(() => {
    return props.options.filter(option => !option.disable).length === 1;
  }, [props.options]);

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
      mt={!isSingular ? '0vh' : '0'}
      bg='rgba(0,0,0,0.5)'
      direction={'column'}
      align={'center'}
      justify={'center'}
      h='2.6vh'
      w='2.6vh'
      style={{
        aspectRatio: 1/1,
        fontSize: theme.fontSizes.xxs,
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