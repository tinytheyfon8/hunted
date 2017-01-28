import Menu from './menu';

const options = [{
  text: 'Back',
  targetState: 'MainMenu'
}];

export default class MainMenu extends Menu {
  constructor() {
    super(options, 'Instructions');
  }
}
