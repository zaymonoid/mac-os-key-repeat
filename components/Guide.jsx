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
  MAX_VALUE,
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
    answer: `Nothing breaks at low values: these are ordinary preferences and the revert commands below restore the defaults. The fastest this tool offers is KeyRepeat ${MIN_VALUE} (${toMs(MIN_VALUE)} ms). Very short InitialKeyRepeat values make accidental repeats likely during normal typing, so try them in the box above first. If it feels too fast here, it will feel too fast on your Mac.`,
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

const Table = styled("table", {
  fontFamily: "$mono",
  fontSize: "$2",
  borderCollapse: "collapse",
  width: "100%",
  maxWidth: 640,

  "& th, & td": {
    textAlign: "left",
    paddingBlock: "$3",
    paddingInline: "$4",
    borderBottom: "1px solid rgba(255, 170, 72, 0.35)",
  },
  "& th": { color: "$orange", fontWeight: "normal" },
});

const TableScroller = styled("div", { overflowX: "auto" });

const VisuallyHiddenCaption = styled("caption", {
  position: "absolute",
  width: 1,
  height: 1,
  overflow: "hidden",
  clip: "rect(0 0 0 0)",
  whiteSpace: "nowrap",
});

const InlineCode = styled("code", { color: "$orange", fontFamily: "$mono" });

const valueNote = (value, settingsMin) => {
  if (value < settingsMin) return "Terminal only";
  if (value === settingsMin) return "System Settings minimum";
  return "";
};

const ValuesTable = () => {
  const values = [];
  for (let v = MIN_VALUE; v <= MAX_VALUE; v++) values.push(v);

  return (
    <TableScroller>
      <Table>
        <VisuallyHiddenCaption>
          macOS KeyRepeat and InitialKeyRepeat values in milliseconds
        </VisuallyHiddenCaption>
        <thead>
          <tr>
            <th scope="col">Value</th>
            <th scope="col">Milliseconds</th>
            <th scope="col">KeyRepeat</th>
            <th scope="col">InitialKeyRepeat</th>
          </tr>
        </thead>
        <tbody>
          {values.map((v) => (
            <tr key={v}>
              <td>{v}</td>
              <td>{`${toMs(v)} ms`}</td>
              <td>{valueNote(v, SETTINGS_MIN_KEY_REPEAT)}</td>
              <td>{valueNote(v, SETTINGS_MIN_INITIAL_KEY_REPEAT)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </TableScroller>
  );
};

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
      .map((part, i) => (i % 2 ? <InlineCode key={i}>{part}</InlineCode> : part))}
  </Text>
);

const Guide = () => (
  <VStack as="section" spacing={4} align="stretch">
    <SectionHeading>Why use this instead of System Settings?</SectionHeading>
    <Text>
      System Settings (System Preferences on older macOS) caps key repeat: the
      fastest repeat is {toMs(SETTINGS_MIN_KEY_REPEAT)} ms and the shortest
      delay is {toMs(SETTINGS_MIN_INITIAL_KEY_REPEAT)} ms. The{" "}
      <InlineCode>defaults write</InlineCode> command can go lower, but changes only apply
      after you log out or restart, which makes trial and error painful. This
      tool simulates the timings in your browser so you can find what feels
      right first.
    </Text>

    <VSpacer size="md" />
    <SectionHeading>Key repeat values in milliseconds</SectionHeading>
    <Text>
      <InlineCode>KeyRepeat</InlineCode> (the interval between repeats) and{" "}
      <InlineCode>InitialKeyRepeat</InlineCode> (the delay before repeating starts) are
      whole numbers, where each unit is {toMs(1)} ms.
    </Text>
    <ValuesTable />

    <VSpacer size="md" />
    <SectionHeading>How to apply</SectionHeading>
    <Text>
      Run these in Terminal, swapping in the values you picked above. These use
      the tool&apos;s starting values ({toMs(DEFAULT_INITIAL_KEY_REPEAT)} ms
      delay, {toMs(DEFAULT_KEY_REPEAT)} ms repeat):
    </Text>
    <CommandLine
      value={`${INITIAL_KEY_REPEAT_COMMAND} ${DEFAULT_INITIAL_KEY_REPEAT}`}
    />
    <CommandLine value={`${KEY_REPEAT_COMMAND} ${DEFAULT_KEY_REPEAT}`} />
    <Text>Optionally, make letter keys repeat instead of showing accents:</Text>
    <CommandLine value={PRESS_AND_HOLD_COMMAND} />
    <Text>
      Then log out and back in, or restart. The new timings apply from your
      next login.
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
