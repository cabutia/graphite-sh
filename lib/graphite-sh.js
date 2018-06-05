'use babel';

import Graphite from './graphite'
import GraphiteShView from './graphite-sh-view';
import { CompositeDisposable } from 'atom';

export default {

  config: (new Graphite()).config(),
  graphiteShView: null,
  rightPanel: null,
  subscriptions: null,
  Graphite: null,

  activate (state) {
    this.graphiteShView = new GraphiteShView(state.graphiteShViewState)
    this.rightPanel = atom.workspace.addRightPanel({
      item: this.graphiteShView.getElement(),
      visible: true
    });
    this.Graphite = new Graphite(this.graphiteShView)

    this.subscriptions = new CompositeDisposable();

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'graphite-sh:toggle': () => this.toggle(),
      'graphite-sh:take-screenshot': () => this.Graphite.shot(),
      'graphite-sh:show-panel': () => this.graphiteShView.show(),
      'graphite-sh:hide-panel': () => this.graphiteShView.hide(),
      'graphite-sh:clear-screenshot': () => this.graphiteShView.clear(),
      'graphite-sh:settings': () => atom.workspace.open("atom://config/packages/graphite-sh"),
      'graphite-sh:test': () => this.test()
    }));
  },

  deactivate () {
    this.rightPanel.destroy();
    this.subscriptions.dispose();
    this.graphiteShView.destroy();
  },

  serialize () {
    return {
      graphiteShViewState: this.graphiteShView.serialize()
    };
  },

  toggle () {
    return (
      this.rightPanel.isVisible() ?
      this.rightPanel.hide() :
      this.rightPanel.show()
    );
  },

  test () {
    let e = atom.workspace.getActiveTextEditor()
    let s = e.getLastSelection()
    let r = s.getBufferRowRange()
    let cr = e.getCursorBufferPosition()
    let start = r[0]
    let end = r[1]
    console.log('Cursor:', cr)
    console.log(start + 1, end + 1)
    s.selectLine(start)
    // if (start < end) {
      let c = end - start
      s.selectDown(c)
    // } else if (end < start) {
    //   let c = start - end
    //   s.selectUp(c)
    // } else if (end === start) {
    // }
  }
};
