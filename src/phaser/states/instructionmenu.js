import Menu from './menu';

const options = [{
  text: 'Back',
  targetState: 'MainMenu'
}];

export default class MainMenu extends Menu {
  constructor() {
    super(options, 'Instructions');
  }

  create() {
    this.menuSetup();
    this.generateMenu();
    //this adds text beneath the back selection in the InstructionMenu state.
    //area is finite. Make sure code doesnt run off page.
    this.game.add.text(20, 120,
      `* HOW TO PLAY *
      Use arrow keys to control the movement of your character.
      If you are the hunter, chase the prey and collide with them to win the game.
      If you are the prey, run from the hunter while collecting enough items to
      become the hunter.
      \n * AS WEREWOLF *
      You start off as the hunter. Kill human before they obtain enough silver to
      kill you.
      If human has a sword, run away from human and eat meat to gain enough strength
      to hunt again!
      Once all meat has been eaten, kill human!
      \n * AS HUMAN *
      Start off by evading the werewolf.
      Move over the silver pieces to collect them and increase your score.
      Once you've collected enough silver, you are now the hunter.`,
      { fill: '#888', font:'20px monospace' });
  }

}
