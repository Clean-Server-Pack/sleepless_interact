import { Flex } from "@mantine/core";
import { OptionProps } from "./Interact";
import Option from "./Option";
import { useMemo } from "react";

export const Options = function (props: { options: OptionProps[]; selected?: number }) {
  //  check if only one prop is not disabled
  const isSingular = useMemo(() => {
    return props.options.filter(option => !option.disable).length === 1;
  }, [props.options]);

  return (
    <Flex
      w={!isSingular ? '10vw' : 'auto'}
      mt='0.2vh'
      h='100%'
      direction={'column'}
      gap='xs'
    >
      {props.options.map((option, index) => (
        !option.disable && 
          <Option 
            isSingular={isSingular}
            key={index} 
            {...option} 
            selected={props.selected === index}
          />
      ))}
    </Flex>
  );
};
