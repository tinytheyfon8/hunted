import Menu from './menu';

// Creates options menu after logging in
// targetState indicates the state that will be initiated upon pressing spacebar
const options = [{
  text: 'New game',
  targetState: 'NewGameMenu'
}, {
  text: 'Instructions',
  targetState: 'InstructionMenu'
}];


export default class MainMenu extends Menu {
  constructor() {
    super(options, 'Main Menu');
  }
}
