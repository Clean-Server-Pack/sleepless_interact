import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Flex, Text, useMantineTheme } from "@mantine/core";
import colorWithAlpha from "../utils/colorWithAlpha";
import { OptionProps } from "./Interact";

const Option = function (props: OptionProps & 
  {
    selected?: boolean;
  }
) {
  const theme = useMantineTheme();
  return (
    <Flex
      bg='rgba(0,0,0,0.8)'
      p='0.75vh'
      w='100%'
      h='100%'
      align='center'
      gap='xs'
      style={{
  
        transition: 'all ease-in-out 0.2s',
        borderRadius: theme.radius.xs,
        border: props.selected ? `5px solid ${colorWithAlpha(theme.colors[theme.primaryColor][9], 0.6)}` : '3px solid transparent',
        
        
      }}
    >
      <FontAwesomeIcon 
        color={props.selected ? 'rgba(255,255,255,0.8)': 'rgba(255,255,255,0.6)'}
        style={{
          aspectRatio: 1/1,
          fontSize: '1.5vh',
        }}
        icon={!props.selected ? props.icon : 'caret-left'} 
      />
      <Text
        c={props.selected ? 'rgba(255,255,255,0.8)': 'rgba(255,255,255,0.6)'}
        size='1.5vh'
        fw='bold'
      >{props.text} {props.selected}</Text>


    </Flex>
  );
};

export default Option;