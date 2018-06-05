'use babel';

import GraphiteShView from './graphite-sh-view';
import { CompositeDisposable } from 'atom';

export default {

  graphiteShView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.graphiteShView = new GraphiteShView(state.graphiteShViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.graphiteShView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'graphite-sh:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.graphiteShView.destroy();
  },

  serialize() {
    return {
      graphiteShViewState: this.graphiteShView.serialize()
    };
  },

  toggle() {
    console.log('GraphiteSh was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
