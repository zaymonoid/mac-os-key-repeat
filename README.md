# Mac Key Repeat Tester

Use this interactive online tool to dial in your macOS key repeat by feel. Test speeds faster than System Settings allows, then copy the defaults write commands.

**Try it:** [mac-key-repeat.zaymon.dev](https://mac-key-repeat.zaymon.dev/)

<!-- TODO: record a short screen capture of the sliders + test box and save it as docs/demo.gif -->
![Demo of adjusting the key repeat sliders and testing in the browser](docs/demo.gif)

## What it does and why

System Settings caps key repeat at 30 ms with a shortest delay of 225 ms. The `defaults write` command can go faster, but changes only apply after you log out or restart, so finding the right values by trial and error means restarting again and again. This tool simulates key repeat in the browser so you can find timings that feel right first, then apply them with one restart.

## Commands

Run these in Terminal with the values you picked (shown here with the tool's starting values), then log out and back in, or restart:

```bash
defaults write -g InitialKeyRepeat -int 12   # delay before repeating starts (180 ms)
defaults write -g KeyRepeat -int 2           # interval between repeats (30 ms)

# Optional: make letter keys repeat instead of showing the accent picker
defaults write -g ApplePressAndHoldEnabled -bool false
```

### Values

Both settings are whole numbers where each unit is 15 ms.

| Value | Milliseconds | KeyRepeat               | InitialKeyRepeat        |
| ----- | ------------ | ----------------------- | ----------------------- |
| 1     | 15 ms        | Terminal only           | Terminal only           |
| 2     | 30 ms        | System Settings minimum | Terminal only           |
| 3     | 45 ms        |                         | Terminal only           |
| 4     | 60 ms        |                         | Terminal only           |
| 5     | 75 ms        |                         | Terminal only           |
| 6     | 90 ms        |                         | Terminal only           |
| 7     | 105 ms       |                         | Terminal only           |
| 8     | 120 ms       |                         | Terminal only           |
| 9     | 135 ms       |                         | Terminal only           |
| 10    | 150 ms       |                         | Terminal only           |
| 11    | 165 ms       |                         | Terminal only           |
| 12    | 180 ms       |                         | Terminal only           |
| 13    | 195 ms       |                         | Terminal only           |
| 14    | 210 ms       |                         | Terminal only           |
| 15    | 225 ms       |                         | System Settings minimum |
| 16    | 240 ms       |                         |                         |
| 17    | 255 ms       |                         |                         |
| 18    | 270 ms       |                         |                         |
| 19    | 285 ms       |                         |                         |
| 20    | 300 ms       |                         |                         |

### Revert

Restore the macOS defaults, then log out or restart:

```bash
defaults delete -g KeyRepeat
defaults delete -g InitialKeyRepeat
defaults write -g ApplePressAndHoldEnabled -bool true
```

## Development

This is a [Next.js](https://nextjs.org/) project. Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Contributing

We appreciate your feedback, suggestions, and contributions to make this project even better! If you encounter any issues or have ideas for improvements, please don't hesitate to [submit an Issue](https://github.com/zaymonoid/mac-os-key-repeat/issues/new). Pull requests are welcome!
