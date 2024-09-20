import { Flex } from "@mantine/core";
import { OptionProps } from "./Interact";
import Option from "./Option";

export const Options = function (props: { options: OptionProps[]; selected?: number }) {
  return (
    <Flex
      w='10vw'
      mt='0.4vh'
      h='100%'
      direction={'column'}
      gap='xs'
    >
      {props.options.map((option, index) => (
        !option.disable && 
          <Option 
            key={index} 
            {...option} 
            selected={props.selected === index}
          />
      ))}
    </Flex>
  );
};
