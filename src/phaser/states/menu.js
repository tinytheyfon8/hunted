import MenuItem from '../text/menuitem';

export default class Menu extends window.Phaser.State {
  constructor(options, title) {
    super();
    this.options = options;
    this.title = title;
  }

  create() {
    this.menuSetup();
    this.generateMenu();
  }

  menuSetup() {
    this.focused = 0;

    this.keyboard = this.game.input.keyboard;

    this.controls = this.keyboard.addKeys({
      up: window.Phaser.Keyboard.UP,
      down: window.Phaser.Keyboard.DOWN,
      left: window.Phaser.Keyboard.LEFT,
      right: window.Phaser.Keyboard.RIGHT,
      interact: window.Phaser.Keyboard.SPACEBAR
    });

    this.game.add.text(20, 20, this.title, { font: "20px monospace", fill: "#888" });

    this.menuItems = [];
  }

  generateMenu() {
    for (let i = 0; i < this.options.length; i++) {
      let option, menuItem;

      option = this.options[i];

      if (window.joinedPlayer && window.joinedPlayer === option.text.toLowerCase()) {
        continue;
      }

      menuItem = new MenuItem(this.game, 20, (((i + 1) * 40) + 40), option.text, option.targetState);

      this.menuItems.push(menuItem);
    }

    this.menuItems[this.focused].focus(true);

    this.controls.interact.onDown.add(this.activateFocusedItem, this);
    this.controls.up.onDown.add(this.selectItem, this, 0, -1);
    this.controls.down.onDown.add(this.selectItem, this, 0, 1);
  }

  selectItem(key, delta) {
    this.menuItems[this.focused].focus(false);

    this.focused += delta;

    if (this.focused >= this.menuItems.length) {
      this.focused -= this.menuItems.length;
    } else if (this.focused < 0) {
      this.focused += this.menuItems.length;
    }

    this.menuItems[this.focused].focus(true);
  }

  activateFocusedItem() {
    this.menuItems[this.focused].navigate();
  }
}
