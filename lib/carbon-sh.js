'use babel';

import CarbonShView from './carbon-sh-view';
import { CompositeDisposable } from 'atom';

export default {

  carbonShView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.carbonShView = new CarbonShView(state.carbonShViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.carbonShView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'carbon-sh:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.carbonShView.destroy();
  },

  serialize() {
    return {
      carbonShViewState: this.carbonShView.serialize()
    };
  },

  toggle() {
    console.log('CarbonSh was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
