import Menu from './menu';

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
