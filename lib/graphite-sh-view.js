'use babel';

import {el,mount} from 'redom'
import Graphite from './graphite'

export default class GraphiteShView {

  constructor(serializedState) {
    const CloseButton = el('button.action', { type: 'button' }, 'Close')
    const ClearButton = el('button.action', { type: 'button' }, 'Clear screenshot')
    const Screenshot = el('img#screenshot', { src: '' })
    const ActionsWrapper = el('div.actions-wrapper', [CloseButton])


    this.image = Screenshot
    this.element = el('div.graphite-sh', [
      Screenshot,
      ActionsWrapper
    ])


    CloseButton.addEventListener('click', e => { this.hide() })
    ClearButton.addEventListener('click', e => { this.clear() })
  }

  // Returns an object that can be retrieved when package is activated
  serialize () {}

  // Tear down any state and detach
  destroy () {
    this.element.remove();
  }

  // Hide panel
  hide () {
    this.element.classList.toggle('hidden')
  }

  // Show panel
  show () {
    this.element.classList.remove('hidden')
  }

  clear () {
    this.updateImage('')
    this.image.classList.add('hidden')
  }

  // Take screenshot of the selected code
  takeScreenshot () {
    alert('shot!')
  }

  updateImage (src) {
    this.image.src = src + '?avoid=cache' + (Math.random() * 584575)
    this.image.classList.remove('hidden')
  }

  getElement () {
    return this.element;
  }

}
