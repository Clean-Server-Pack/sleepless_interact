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
import KeyIcon from "./KeyIcon";

export type OptionProps = { 
  text: string; 
  icon: IconProp; 
  disable: boolean | null 
};

export type InteractionData = {
  id: string;
  options: OptionProps[];
}




function Wrapper({ children }: { children: React.ReactNode }) {
  return isEnvBrowser() ? ( 
    <BackgroundImage w='100vw' h='100vh' style={{overflow:'hidden'}}
      src="https://i.ytimg.com/vi/TOxuNbXrO28/maxresdefault.jpg"
    >  
      {children}
    </BackgroundImage>
  ) : (
    <>{children}</>
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

  useEffect(() => { 
    fetchNui('loaded')
  }, []);

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
              // align='center'
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


