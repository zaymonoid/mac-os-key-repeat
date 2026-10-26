import {
  Box,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Stack,
  Switch,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { atom, useAtom } from "jotai";
import useKeyRepeat from "../hooks/useKeyRepeat";
import { pure } from "../lib/utils";
import { styled } from "../Stitches.config";
import { VSpacer } from "./Spacers";
import { Code, Text } from "./Typography";
import { UpdateIcon, LapTimerIcon, KeyboardIcon } from "@radix-ui/react-icons";
import { AnimatedNumber } from "./AnimatedNumber";
import CopyButton from "./CopyButton";
import {
  DEFAULT_INITIAL_KEY_REPEAT,
  DEFAULT_KEY_REPEAT,
  INITIAL_KEY_REPEAT_COMMAND,
  KEY_REPEAT_COMMAND,
  MAX_VALUE,
  MIN_VALUE,
  PRESS_AND_HOLD_COMMAND,
  toMs,
} from "../lib/keyRepeat";

const KeyRepeatInput = styled("textarea", {
  fontFamily: "$mono",
  color: "$typeHighlight",

  width: "100%",
  padding: "$4",

  backgroundColor: "rgba(0, 0, 0, 0.0)",

  borderColor: "$orange",
  borderStyle: "solid",
  borderWidth: "$1",

  "&::placeholder": {
    opacity: "0.8",
    color: "$type",
  },

  "&:focus": {
    outline: "none",
    boxShadow: "0 0 0 1px #ffaa48",
  },
});

const delayAtom = atom(DEFAULT_INITIAL_KEY_REPEAT);
const repeatAtom = atom(DEFAULT_KEY_REPEAT);
const autoClearAtom = atom(true);

const MillisecondSlider = ({ valueAtom, icon, label }) => {
  const [value, setValue] = useAtom(valueAtom);

  return (
    <Box maxWidth={300}>
      <Stack direction="row" alignItems="center">
        {icon}
        <Text>
          {label}: {toMs(value)} ms
        </Text>
      </Stack>
      <Slider
        onChange={setValue}
        value={value}
        min={MIN_VALUE}
        max={MAX_VALUE}
        aria-label={label}
      >
        <SliderTrack bg="whiteAlpha.500">
          <SliderFilledTrack bg="white" />
        </SliderTrack>
        <SliderThumb />
      </Slider>
    </Box>
  );
};

const BufferToggle = () => {
  const [autoClear, setAutoClear] = useAtom(autoClearAtom);

  return (
    <Box maxWidth={300}>
      <Stack direction="row" alignItems="center">
        <KeyboardIcon />
        <Text>Typing mode</Text>
        <Switch
          aria-label="Typing mode: keep typed text instead of clearing it on key up"
          isChecked={!autoClear}
          onChange={(e) => setAutoClear((a) => !a)}
          size="sm"
          colorScheme="yellow"
          pt={0.5}
        />
      </Stack>
    </Box>
  );
};

const KeyRepeatControls = () => (
  <>
    <MillisecondSlider
      valueAtom={delayAtom}
      icon={<LapTimerIcon />}
      label="Initial delay"
    />
    <MillisecondSlider
      valueAtom={repeatAtom}
      icon={<UpdateIcon />}
      label="Key repeat interval"
    />
    <BufferToggle />
  </>
);

const delayMsAtom = atom((get) => toMs(get(delayAtom)));
const repeatMsAtom = atom((get) => toMs(get(repeatAtom)));

const KeyRepeat = () => {
  const { down, up, buffer } = useKeyRepeat(
    delayMsAtom,
    repeatMsAtom,
    autoClearAtom,
  );

  return (
    <KeyRepeatInput
      placeholder="Press and hold a key to feel the timings above"
      aria-label="Key repeat test area"
      value={buffer}
      onKeyDown={down}
      onKeyUp={up}
      onBlur={up}
      onChange={pure(null)}
    />
  );
};

const Commands = () => {
  const [delay] = useAtom(delayAtom);
  const [repeat] = useAtom(repeatAtom);

  return (
    <div role="none">
      <VStack spacing={4} align="stretch">
        <Text>
          When it feels right, run these in Terminal. They update as you move
          the sliders:
        </Text>
        <HStack gap={2} align="center">
          <Code>
            {INITIAL_KEY_REPEAT_COMMAND} <AnimatedNumber value={delay} />
          </Code>
          <CopyButton value={`${INITIAL_KEY_REPEAT_COMMAND} ${delay}`} />
        </HStack>
        <HStack gap={2} align="center">
          <Code>
            {KEY_REPEAT_COMMAND} <AnimatedNumber value={repeat} />
          </Code>
          <CopyButton value={`${KEY_REPEAT_COMMAND} ${repeat}`} />
        </HStack>
        <VSpacer size="xs" />
        <Text>
          Optional: make letter keys repeat instead of showing the accent
          picker:
        </Text>
        <HStack gap={2} align="center">
          <Code>{PRESS_AND_HOLD_COMMAND}</Code>
          <CopyButton value={PRESS_AND_HOLD_COMMAND} />
        </HStack>
        <VSpacer size="xs" />
        <Text>
          Changes apply after you log out or restart. Nothing here changes your
          Mac until you run the commands.
        </Text>
      </VStack>
    </div>
  );
};

const KeyRepeatApp = () => (
  <>
    <KeyRepeatControls />
    <VSpacer size="lg" />
    <KeyRepeat />
    <VSpacer size="lg" />
    <Commands />
  </>
);

export default KeyRepeatApp;
