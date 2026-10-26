/** macOS stores key repeat timings in units of 15 ms. */
export const MS_PER_UNIT = 15;

export const toMs = (value) => value * MS_PER_UNIT;

/** Slider range offered by the tool. */
export const MIN_VALUE = 1;
export const MAX_VALUE = 20;

export const DEFAULT_INITIAL_KEY_REPEAT = 12;
export const DEFAULT_KEY_REPEAT = 2;

/** Fastest values reachable with the System Settings sliders. */
export const SETTINGS_MIN_INITIAL_KEY_REPEAT = 15;
export const SETTINGS_MIN_KEY_REPEAT = 2;

export const INITIAL_KEY_REPEAT_COMMAND = "defaults write -g InitialKeyRepeat -int";
export const KEY_REPEAT_COMMAND = "defaults write -g KeyRepeat -int";
export const PRESS_AND_HOLD_COMMAND =
  "defaults write -g ApplePressAndHoldEnabled -bool false";

export const REVERT_COMMANDS = [
  "defaults delete -g KeyRepeat",
  "defaults delete -g InitialKeyRepeat",
  "defaults write -g ApplePressAndHoldEnabled -bool true",
];
