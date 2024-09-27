import { Flex } from "@mantine/core";
import { OptionProps } from "./Interact";
import Option from "./Option";

export const Options = function (props: { options: OptionProps[]; selected?: number }) {
  return (
    <Flex
      w={props.options.length > 1 ? '10vw' : 'auto'}
      mt='0.2vh'
      h='100%'
      direction={'column'}
      gap='xs'
    >
      {props.options.map((option, index) => (
        !option.disable && 
          <Option 
            optionsLength={props.options.length}
            key={index} 
            {...option} 
            selected={props.selected === index}
          />
      ))}
    </Flex>
  );
};
