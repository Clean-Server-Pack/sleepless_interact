// import styles from "../modules/Interact.module.css";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { Center, Flex, Text, useMantineTheme } from "@mantine/core";
import { isEnvBrowser } from "../utils/misc";
import { BackgroundImage } from "@mantine/core";
import colorWithAlpha from "../utils/colorWithAlpha";
import { useEffect, useState } from "react";
import { useNuiEvent } from "../hooks/useNuiEvent";
import { fetchNui } from "../utils/fetchNui";
import { Options } from "./Options";
import { internalEvent } from "../utils/internalEvent";

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
      bg='rgba(0,0,0,0.8)'
      direction={'column'}
      align={'center'}
      justify={'center'}
      h='4vh'
      style={{
        aspectRatio: 1/1, 
        outline: `5px solid ${colorWithAlpha(theme.colors[theme.primaryColor][9], 0.5)}`,
      }}
    >
      <Text
        size='2vh'
        style={{
          borderRadius: theme.radius.sm,

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
  const [rawDisplay, setRawDisplay] = useState<boolean>(false);
  const [fade, setFade] = useState<boolean>(false);

  useEffect(() => {
    if (display) {
      setRawDisplay(true);

      setTimeout(() => {
        setFade(true);
      }, 100);
    } else {
      setFade(false);
      setTimeout(() => {
        setRawDisplay(false);
      }, 250);
    }
  }, [display]);


  const [id, setId] = useState<string>('none');
  const [color, setColor] = useState<string>('rgba(0,0,0,0.8)');
  const [options, setOptions] = useState<OptionProps[]>([]);
  const [selected, setSelected] = useState<number>(0);

  useEffect(() => {
    if (options.length > 0 && options[0].disable) {
      setSelected(1);
      fetchNui('setCurrentTextOption', { index: 1 });
    } else {
      setSelected(0);
      fetchNui('setCurrentTextOption', { index: 0 });
    } 
  } , [options]);






  useNuiEvent<{ x: number; y: number; z: number; w: number }>(
    "setColor",
    (color) => {
      setColor(`rgba(${color.x}, ${color.y}, ${color.z}, ${color.w / 255})`);
    }
  );

  useNuiEvent<InteractionData | null>("updateInteraction", (newInteraction) => {
    if (newInteraction) {
      setId(newInteraction.id);
      setOptions(newInteraction.options);
      setDisplay(true);
    } else {
      setDisplay(false);
      setId("none");
      setOptions([]);
    }
  });

  useEffect(() => {
    fetchNui("loaded");
  }, []);


  // skip disabled options

  const toggleOption = (direction: 'up' | 'down') => {
    if (!options || options.length === 0) return
    if (options.length === 1) return
    if (options.length === 2 && options[0].disable) return

    let indexChange = direction === 'up' ? -1 : 1;
    let newOption = (selected + indexChange + options.length) % options.length;
    
    let tries = 0;
    while (options[newOption].disable && tries < options.length) {
      tries++;
      newOption = (newOption + indexChange + options.length) % options.length;
    }

    setSelected(newOption);
    fetchNui('setCurrentTextOption', { index: newOption });

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
      
        {rawDisplay && (
          <Flex
          pos='absolute'
          left='50%'
          top='50%'
            gap='lg'
            opacity={fade ? 1 : 0}

            style={{
              transition: 'all ease-in-out 0.2s',
              userSelect: 'none',
            }}
          >
            <KeyIcon />
            <Options 
              options={options} 
              selected={selected}
            />

          </Flex>
        )}
 

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
        { text: 'Lock Door', icon: 'lock', disable: false },
      ],
    },
  }
])




// const Interaction: React.FC<{
//   interaction: InteractionData;
//   color: string;
// }> = ({ interaction, color }) => {
//   // const { id, options } = interaction;
//   // const [currentOption, setCurrentOption] = useState(0);
//   // const maxOptions = options.length;
//   // const lastActive = useRef<number | null>(null);

//   // const updateOption = useCallback(
//   //   (direction: "up" | "down") => {
//   //     if (!options || options.length === 0) return;

//   //     if (maxOptions == 0) return;
//   //     let indexChange = direction === "up" ? -1 : 1;
//   //     let newOption = (currentOption + indexChange + maxOptions) % maxOptions;

//   //     let tries = 0;
//   //     while (options[newOption].disable && tries < maxOptions) {
//   //       tries++;
//   //       newOption = (newOption + indexChange + maxOptions) % maxOptions;
//   //     }
//   //     lastActive.current = currentOption;
//   //     setCurrentOption(newOption);
//   //     fetchNui("setCurrentTextOption", { index: newOption + 1 });
//   //   },
//   //   [currentOption, options]
//   // );

//   // useEffect(() => {
//   //   if (options.length > 0 && options[0].disable) {
//   //     updateOption("down");
//   //   } else {
//   //     setCurrentOption(0);
//   //     fetchNui("setCurrentTextOption", { index: 1 });
//   //   }
//   // }, [options]);

//   // useEffect(() => {
//   //   const handleKeyPress = (event: KeyboardEvent) => {
//   //     if (event.key === "ArrowUp" || event.key === "ArrowDown") {
//   //       updateOption(event.key === "ArrowUp" ? "up" : "down");
//   //     }
//   //   };

//   //   const handleWheel = (event: WheelEvent) => {
//   //     updateOption(event.deltaY < 0 ? "up" : "down");
//   //   };

//   //   window.addEventListener("keydown", handleKeyPress);
//   //   window.addEventListener("wheel", handleWheel, { passive: true });

//   //   return () => {
//   //     window.removeEventListener("keydown", handleKeyPress);
//   //     window.removeEventListener("wheel", handleWheel);
//   //   };
//   // }, [updateOption]);

//   // const numberOfActiveOptions = useMemo(
//   //   () => options.filter((option) => !option.disable).length,
//   //   [options]
//   // );

//   // const OptionButton = ({
//   //   text,
//   //   icon,
//   //   isActive,
//   //   wasActive,
//   // }: {
//   //   text: string;
//   //   icon: IconProp;
//   //   isActive: boolean;
//   //   wasActive: boolean;
//   // }) => (
//   //   <>
//   //     <div
//   //       style={{
//   //         translate: numberOfActiveOptions < 2 ? "-1.5rem" : "",
//   //       }}
//   //       className={styles.button}
//   //     >
//   //       <div
//   //         className={`${styles.innerButton} ${isActive && styles.active} ${
//   //           wasActive && styles.wasActive
//   //         }`}
//   //       ></div>

//   //       {numberOfActiveOptions > 1 && isActive && (
//   //         <FontAwesomeIcon icon={"caret-right"} className={styles.indicator} />
//   //       )}
//   //       {icon && <FontAwesomeIcon icon={icon} className={styles.buttonIcon} />}
//   //       <div className={styles.buttonText}>{text}</div>
//   //     </div>
//   //   </>
//   // );

//   // const renderOptions = () => {
//   //   if (!options || typeof options === "string") return null;

//   //   return options.map(
//   //     (option, index) =>
//   //       !option.disable && (
//   //         <OptionButton
//   //           key={index}
//   //           text={option.text}
//   //           icon={option.icon}
//   //           isActive={currentOption === index}
//   //           wasActive={typeof lastActive == "number" && lastActive === index}
//   //         />
//   //       )
//   //   );
//   // };

//   return (
//     <>


//     <Flex
//       bg='red'
//       w='25%'
//       h='25%'
//     >

//     </Flex>
//       {/* <div className={styles.container} style={{ color: color }}>
//         <div className={styles.interactKey}>
//           <div>E</div>
//         </div>
//         <div className={styles.ButtonsContainer}>{renderOptions()}</div>
//       </div> */}
//     </>
//   );
// };

// export default Interaction;
