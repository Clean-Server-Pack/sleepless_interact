// import styles from "../modules/Interact.module.css";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { BackgroundImage, Flex, Text, Transition, useMantineTheme } from "@mantine/core";
import { useEffect, useState } from "react";
import { useNuiEvent } from "../hooks/useNuiEvent";
import colorWithAlpha from "../utils/colorWithAlpha";
import { fetchNui } from "../utils/fetchNui";
import { internalEvent } from "../utils/internalEvent";
import { isEnvBrowser } from "../utils/misc";
import { Options } from "./Options";

export type OptionProps = { 
  text: string; 
  icon: IconProp; 
  disable: boolean | null 
};

export type InteractionData = {
  id: string;
  options: OptionProps[];
}



const Wrapper = function(props: {children: React.ReactNode}) {
  const isBrowser = isEnvBrowser();

  return isBrowser ? (
    <BackgroundImage src="https://gcdnb.pbrd.co/images/rjKIWn6FNpDF.jpg?o=1" h='100vh' w='100vw'> 
      {props.children}
    </BackgroundImage>
  ) : (
    props.children
  )


}


const KeyIcon = function() {
  const theme = useMantineTheme();
  return (
    <Flex
      bg='rgba(0,0,0,0.5)'
      direction={'column'}
      align={'center'}
      justify={'center'}
      h='3.5vh'
      style={{
        aspectRatio: 1/1,
        borderRadius: theme.radius.sm,
        outline:  `2px solid ${colorWithAlpha(theme.colors[theme.primaryColor][theme.primaryShade as number], 0.8)}`,
      }}
    >
      <Text
        size='md'
        style={{
       

          fontFamily: 'Akrobat Black',
          color: theme.colors['gray'][1],
        }}
      >
        E
      </Text>
    </Flex>
  )
}


const Interaction = function() {
  const [display, setDisplay] = useState<boolean>(false);
  const [options, setOptions] = useState<OptionProps[]>([]);
  const [selected, setSelected] = useState<number>(0);



  useEffect(() => {
    if (!display) {
      return;
    }
    if (options.length > 0) {
      console.log('FINDING NEW ONE?')
      // find first free one to have selected as default
      const firstFree = options.findIndex(option => !option.disable);
      if (firstFree !== -1) {
        setSelected(firstFree);
        fetchNui('setCurrentTextOption', { index: firstFree + 1 });
      }
    

      // setSelected(1);
      // fetchNui('setCurrentTextOption', { index: 2 });
    } else {
      setSelected(0);
      fetchNui('setCurrentTextOption', { index: 1 });
    } 
  } , [options,display])


  useNuiEvent<InteractionData | null>("updateInteraction", (newInteraction) => {
    if (newInteraction) {
      if (newInteraction.options) {
        setOptions(newInteraction.options);
      }
      setDisplay(true);
    } else {
      setDisplay(false);
      setOptions([]);
    }
  });

  // skip disabled options

  const toggleOption = (direction: 'up' | 'down') => {
    if (!options || options.length === 0) return
    if (options.length === 1) return
    if (options.length === 2 && options[0].disable) return

    const indexChange = direction === 'up' ? -1 : 1;
    let newOption = (selected + indexChange + options.length) % options.length;
    
    let tries = 0;
    while (options[newOption].disable && tries < options.length) {
      tries++;
      newOption = (newOption + indexChange + options.length) % options.length;
    }

    setSelected(newOption);
    fetchNui('setCurrentTextOption', { index: newOption + 1 });

  } 


  // Key and scroll event listeners
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        toggleOption(event.key === 'ArrowUp' ? 'up' : 'down');
      }
    }

    const handleWheel = (event: WheelEvent) => {
      toggleOption(event.deltaY < 0 ? 'up' : 'down');
    }

    window.addEventListener('keydown', handleKeyPress);
    window.addEventListener('wheel', handleWheel, { passive: true });

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('wheel', handleWheel);
    }
  }, [selected, options]);

  return (
    <Wrapper>
      
        <Transition
          duration={500}
          timingFunction='ease'
          transition='fade'
          mounted={display}
        >
          {(transitionStyles) => (
            <Flex
              pos='absolute'
              left='50%'
              top='50%'
                gap='xs'
                style={{
                  transform: `translate(-2.25vh, -2.25vh)`,
                  transition: 'all ease-in-out 0.2s',
                  userSelect: 'none',
                  ...transitionStyles
                }}
              >
              <KeyIcon />
              {options.length > 0 && (
                <Options 
                  options={options} 
                  selected={selected}
                /> 
              )}
            </Flex>
          )}
        </Transition>

    </Wrapper>

  )
  
}

export default Interaction;

internalEvent([
  {
    action: 'updateInteraction',
    data: {
      id: '123123',
      options: [
        { text: 'Open Door', icon: 'door-open', disable: false },
      ],
    },
  }
])
