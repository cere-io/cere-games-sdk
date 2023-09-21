## Release Notes:

### vNext

-

### v0.6.4

- [[Bug]](https://www.notion.so/cere/Score-doesn-t-update-on-Leaderboard-156d4e51984c4c9c9eabca01e7c8955e?pvs=4) Fix
  user session on playAgain

### v0.6.3

- [[Feature](https://www.notion.so/Release-September-18-604831108ac940268f4c52bad61a9421?pvs=21)] Added new logic for
  already authorized user
- [[Feature](https://www.notion.so/Release-September-18-604831108ac940268f4c52bad61a9421?pvs=21)] Added sticky user row
  on leaderboard
- [[Feature](https://www.notion.so/Release-September-18-604831108ac940268f4c52bad61a9421?pvs=21)] Added new leaderboard
  layout when active tournament exists
- [[Bug](https://www.notion.so/Release-September-18-604831108ac940268f4c52bad61a9421?pvs=21)] Subtitle is not changing
  for tournament Leaderboard
- [[Bug](https://www.notion.so/Release-September-18-604831108ac940268f4c52bad61a9421?pvs=21)] New leaderboard bugs
- [[Bug](https://www.notion.so/Release-September-18-604831108ac940268f4c52bad61a9421?pvs=21)] After first clicking on
  “Play again” button user doesn’t start a new game
- [[Bug](https://www.notion.so/Release-September-18-604831108ac940268f4c52bad61a9421?pvs=21)] If user has already
  authorized in one game, then when opening another game user sees Leaderboard
- [[Bug](https://www.notion.so/Release-September-18-604831108ac940268f4c52bad61a9421?pvs=21)] Don’t display word
  “tournament” in tournament title on Leaderboard if tournament is created in Freeport
- [[Bug](https://www.notion.so/Release-September-18-604831108ac940268f4c52bad61a9421?pvs=21)] Leaderboard doesn’t scroll

### v0.6.2

- Clear Cere Wallet cache when Games SDK version increased
- Add `lerna` to automate new version publish
- Added share twitter button and game portal

### v0.6.1

- Change widget logic

### v0.6.0

- Update design and user flow
- Move static assets from SDK bundle to SDK CDN deployment

### v0.5.0

- [[Feature]](https://www.notion.so/cere/Gaming-API-Implement-link-shortener-for-Twitter-message-3dd6bfdd26004bac8e18e4d25c64fc1d?pvs=4)
  Implementation auto generated picture in tweet
- [[Bug]](https://www.notion.so/cere/No-formatting-for-preloader-for-description-field-40f7606a24db4290ace7ba78d859f140?pvs=4)
  No formatting for preloader for description field

### v0.4.1

- Fix preloader data loading state
- Configure auto-tests to work in VPN protected environment

### v0.4.0

- [[Feature](https://www.notion.so/cere/Cere-Wallet-Achieve-99-new-users-login-success-rate-in-Cere-Wallet-20610fe9e8564934b544a28aee4dacb9?pvs=4)]
  Update Cere Wallet SDK to switch to web3auth Cyan network
- [[Feature]](https://www.notion.so/cere/UI-tests-for-Wallet-Client-and-Games-49a07b7b50114f49bd4c012c6e6220f5?pvs=4)
  Add WebDriverIO auto test
- Add the SDK integration run-able examples (`/examples`)
- [[Feature]](https://www.notion.so/cere/Update-Leaderboard-modal-to-show-tournaments-65b3a7f4d8d848a384d36618e01b338c?pvs=4)
  Update Leaderboard modal to show tournaments

### v0.3.0

- [[Bug]](https://www.notion.so/cere/If-a-player-took-20th-place-or-higher-then-21st-place-has-a-gift-icon-5bb7e12a9e4544a29f21bc607b3df324?pvs=4)
  Fix bug with rank
- [[Bug]](https://www.notion.so/cere/A-rewarding-pop-up-appears-on-the-top-and-moves-the-layout-11a377734b264549aa70b75bab664333?pvs=4)
  Fix reward notification position on mobile
- [[Bug]](https://www.notion.so/cere/Confetti-animation-on-Congratulations-screen-does-not-always-work-the-first-time-f88c1b30b9074077b70bd400f6e46a96?pvs=4)
  Preload static assets in advance to fix missing confetti animation
- [[Bug]](https://www.notion.so/cere/After-interacting-with-Wallet-button-the-control-arrows-become-inactive-b4f58387f306481ead213af8cc7af364?pvs=4)
  Restore focus on game window after closing the wallet widget to fix keyboard interaction issue
- [[Bug]](https://www.notion.so/cere/By-clicking-on-Top-button-on-Leaderboard-user-can-paused-and-resumed-the-game-6c11c983f6bd47d98b7c8d476df26167?pvs=4)
  Suspend all window events when Games SDK modal is visible

### v0.2.0

- Add publicKey in tweet
- Moved static base URL in the ENV config
- Update Cere Wallet SDK to add CERE ERC20 tokens support
- Log and store session events
- Fix wallet token reward amount
- Fix bug with two leaderboards
- Fix an issue when Connect Wallet popup is shown instead of Leaderboard
- Add tags for tweet to game configuration

### v0.1.2

- Added tweet image

### v0.1.1

- Record games sessions
