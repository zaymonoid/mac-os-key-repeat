import { HStack, VStack } from "@chakra-ui/react";
import { styled } from "../Stitches.config";
import CopyButton from "./CopyButton";
import { VSpacer } from "./Spacers";
import { Code, Heading, Text } from "./Typography";
import {
  DEFAULT_INITIAL_KEY_REPEAT,
  DEFAULT_KEY_REPEAT,
  INITIAL_KEY_REPEAT_COMMAND,
  KEY_REPEAT_COMMAND,
  MIN_VALUE,
  PRESS_AND_HOLD_COMMAND,
  REVERT_COMMANDS,
  SETTINGS_MIN_INITIAL_KEY_REPEAT,
  SETTINGS_MIN_KEY_REPEAT,
  toMs,
} from "../lib/keyRepeat";

/** Answers use `backticks` for commands; stripped for JSON-LD. */
export const FAQ = [
  {
    question: "Why didn't my change apply?",
    answer:
      "macOS only reads the key repeat preferences when you log in. After running the `defaults write` commands, log out and back in, or restart. Make sure you used the global domain (`-g`) and a whole number with `-int`. You can check the stored value with `defaults read -g KeyRepeat`.",
  },
  {
    question: "What's the fastest safe value?",
    answer: `Nothing breaks at low values: these are ordinary preferences and the revert commands above restore the defaults. The fastest this tool offers is KeyRepeat ${MIN_VALUE} (${toMs(MIN_VALUE)} ms). Very short InitialKeyRepeat values make accidental repeats likely during normal typing, so try them in the box above first. If it feels too fast here, it will feel too fast on your Mac.`,
  },
  {
    question: "Why don't letter keys repeat?",
    answer:
      "By default, holding a letter key shows the accent picker (press and hold) instead of repeating. Run `defaults write -g ApplePressAndHoldEnabled -bool false` and log out to make letters repeat. Set it back to `true` to restore the accent picker.",
  },
  {
    question: "Does this work on the latest macOS?",
    answer:
      "KeyRepeat and InitialKeyRepeat are the same global preferences that the Keyboard sliders in System Settings write to, so you can check on your own Mac: move a slider, then run `defaults read -g KeyRepeat`. If the value changed, these commands apply to your macOS version.",
  },
];

export const faqPlainText = (answer) => answer.replace(/`/g, "");

const SectionHeading = (props) => <Heading as="h2" size="lg" {...props} />;
const QuestionHeading = (props) => <Heading as="h3" size="md" {...props} />;

const InlineCode = styled("code", { color: "$orange", fontFamily: "$mono" });

const CommandLine = ({ value }) => (
  <HStack gap={2} align="center">
    <Code>{value}</Code>
    <CopyButton value={value} />
  </HStack>
);

/** Renders `backtick` spans as inline code. */
const RichText = ({ children }) => (
  <Text>
    {children
      .split("`")
      .map((part, i) =>
        i % 2 ? <InlineCode key={i}>{part}</InlineCode> : part,
      )}
  </Text>
);

const Guide = () => (
  <VStack as="section" spacing={4} align="stretch">
    <SectionHeading>How to change key repeat speed on a Mac</SectionHeading>
    <Text>
      The sliders in System Settings &gt; Keyboard cover most people. If you
      want it faster, the same two preferences can be set from Terminal with{" "}
      <InlineCode>defaults write</InlineCode>:{" "}
      <InlineCode>KeyRepeat</InlineCode> (the interval between repeats) and{" "}
      <InlineCode>InitialKeyRepeat</InlineCode> (the delay before repeating
      starts). Both are whole numbers where each unit is {toMs(1)} ms. System
      Settings stops at KeyRepeat {SETTINGS_MIN_KEY_REPEAT} (
      {toMs(SETTINGS_MIN_KEY_REPEAT)} ms) and InitialKeyRepeat{" "}
      {SETTINGS_MIN_INITIAL_KEY_REPEAT} ({toMs(SETTINGS_MIN_INITIAL_KEY_REPEAT)}{" "}
      ms); Terminal goes all the way down to {MIN_VALUE} ({toMs(MIN_VALUE)} ms).
    </Text>

    <VSpacer size="md" />
    <SectionHeading>Why test it here first?</SectionHeading>
    <Text>
      macOS only reads these preferences at login, so every guess costs a log
      out or restart. Most people try a value, find it too fast or too slow, and
      go around that loop several times. This page simulates the exact same
      timings in your browser: drag the sliders, hold a key in the box above,
      and feel the difference immediately. The commands update as you go, so
      once it feels right you copy them, run them, and restart once.
    </Text>

    <VSpacer size="md" />
    <SectionHeading>How to apply</SectionHeading>
    <Text>
      Copy the two commands beside the tool (they carry your slider values) and
      run them in Terminal. With the starting values of{" "}
      {toMs(DEFAULT_INITIAL_KEY_REPEAT)} ms delay and {toMs(DEFAULT_KEY_REPEAT)}{" "}
      ms repeat, they are:
    </Text>
    <CommandLine
      value={`${INITIAL_KEY_REPEAT_COMMAND} ${DEFAULT_INITIAL_KEY_REPEAT}`}
    />
    <CommandLine value={`${KEY_REPEAT_COMMAND} ${DEFAULT_KEY_REPEAT}`} />
    <Text>
      Optional: make letter keys repeat instead of showing the accent picker:
    </Text>
    <CommandLine value={PRESS_AND_HOLD_COMMAND} />
    <Text>
      Then log out and back in, or restart. The new timings apply from your next
      login.
    </Text>

    <VSpacer size="md" />
    <SectionHeading>How to revert</SectionHeading>
    <Text>Restore the macOS defaults, then log out or restart:</Text>
    {REVERT_COMMANDS.map((command) => (
      <CommandLine key={command} value={command} />
    ))}

    <VSpacer size="md" />
    <SectionHeading>FAQ</SectionHeading>
    {FAQ.map(({ question, answer }) => (
      <VStack key={question} spacing={1} align="stretch">
        <QuestionHeading>{question}</QuestionHeading>
        <RichText>{answer}</RichText>
      </VStack>
    ))}
  </VStack>
);

export default Guide;
