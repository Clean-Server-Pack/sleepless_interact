import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Flex, Text, useMantineTheme } from "@mantine/core";
import colorWithAlpha from "../utils/colorWithAlpha";
import { OptionProps } from "./Interact";

const Option = function (props: OptionProps & 
  {
    isSingular: boolean;
    selected?: boolean;
  }
) {
  const theme = useMantineTheme();
  return (
    <Flex
      bg={props.selected ? 'rgba(0,0,0,0.7)': 'rgba(0,0,0,0.5)'}
      p='0.6vh'
      w='100%'
      h='100%'
      align='center'
      gap='xs'
      style={{
        boxShadow:  !props.isSingular && props.selected ? `inset 0 0 0.9vh ${colorWithAlpha(theme.colors[theme.primaryColor][theme.primaryShade as number], 0.8)}` : 'inset 0 0 10px rgba(0,0,0,0.6)',
        transition: 'all ease-in-out 0.2s',
        borderRadius: theme.radius.sm,
        border: !props.isSingular && props.selected ? `2px solid ${colorWithAlpha(theme.colors[theme.primaryColor][theme.primaryShade as number], 0.8)}` : 'none',
        
        
      }}
    >
      <FontAwesomeIcon 
      size='1x'
        color={ !props.isSingular && props.selected ?  colorWithAlpha(theme.colors[theme.primaryColor][theme.primaryShade as number], 0.9) : 'white'}
        style={{
          aspectRatio: 1/1,
          transition: 'all ease-in-out 0.2s',
          // fontSize: '1.5vh',
        }}
        icon={ !props.isSingular && props.selected ? 'caret-left': props.icon}
      />
      <Text
        c={ !props.isSingular && props.selected ? 'rgba(255,255,255,0.9)': 'rgba(255,255,255,0.7)'}
        size='sm'
        fw='bold'
        style={{
          transition: 'all ease-in-out 0.2s',
          fontFamily: 'Akrobat Bold',
        }}
      >{props.text} {props.selected}</Text>


    </Flex>
  );
};

export default Option;