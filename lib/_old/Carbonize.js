'use babel'

const carbonize = class Carbonize {

  constructor () {}

  getConfig () {
    return {
      default_path: {
        type: 'string',
        default: '/home/gabriel/Pictures'
      },

      debug_mode: {
        type: 'boolean',
        default: false
      }
    }
  }
}


export default new carbonize()
