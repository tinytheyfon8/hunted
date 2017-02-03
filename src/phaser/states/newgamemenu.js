import axios from 'axios';

import Menu from './menu';

const options = [{
  text: 'Human',
  targetState: 'Waiting'
  //waiting
}, {
  text: 'Werewolf',
  targetState: 'Waiting'
  //waiting
}, {
  text: 'Back',
  targetState: 'MainMenu'
}];

export default class NewGameMenu extends Menu {
  constructor() {
    super(options, 'Choose character');
  }

  create() {
    this.menuSetup();

    axios.get('/api/players/true')
      .then(res => {
        console.log('PLAYERS', res.data);
        if (res.data.length) {
          window.app.model.joinedPlayer = res.data[0].type;
          window.app.model.checkedForPlayers = true;
        }

        this.generateMenu();
      })
      .catch(err => {
        console.log(err);
      });
  }
}
