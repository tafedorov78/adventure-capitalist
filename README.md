Git clone

npm install

Npm start

After analyzing the game example, I decided to use the component approach. Each business is a separate and independent component with its own view, model and controller (manager).

Obviously, an architecturally virtual manager is present from the very beginning. Buying a manager in the game only switches his work to automatic mode.

The game is too simple to use all the power of a finite state machine, so I limited myself to a few variables.

To save this, I used simple local storage.

All settings are placed in a separate configuration file and can be easily changed. /config/BusinessConfig.js
