const config = {
  textStyle: {
    font: "20px monospace",
    fill: "#888"
  },
  textStyleFocused: {
    font: '20px monospace',
    fill: '#000',
    backgroundColor: '#888'
  }
};

export default class MenuItem extends window.Phaser.Text {
  constructor(game, x, y, text, targetState, value, options, configProperty, focused = false) {
    super(game, x, y, text, config.textStyle);

    this.baseText = text;
    this.targetState = targetState;
    this.value = config[configProperty] >= 0 ? config[configProperty] : value;
    this.options = options;
    this.configProperty = configProperty;
    this.focused = focused;

    if (this.value >= 0) {
      this.text += this.options[this.value];
    }

    this.game.world.addChild(this);
  }

  focus(focused) {
    if (focused) {
      this.focused = true;
      this.setStyle(config.textStyleFocused);
    } else {
      this.focused = false;
      this.setStyle(config.textStyle);
    }
  }

  navigate() {
    if (this.targetState) {
      if ((this.text === 'New game' && window.checkedForPlayers) || this.text !== 'New Game') {
        if (this.text === 'Human' || this.text === 'Werewolf') {
          window.characterSelected = this.text.toLowerCase();
        }
        this.game.state.start(this.targetState);
      }
    }
  }

  select() {
    this.text = this.baseText + this.options[this.value];
    config[this.configProperty] = this.value;
  }
}
