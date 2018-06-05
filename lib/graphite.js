'use babel'

import os from 'os'
import syntax from '../config/syntax.json'
import config from '../config/entries.json'
import {el,mount,unmount} from 'redom'

export default class Graphite {

    GraphiteView = null

    constructor (view = null) {
      this.GraphiteView = view
    }

    config () {
      let conf = config
      conf.default_path.default = os.homedir()
      return conf
    }

    mapType (t) {
      return syntax.filter(i => i.a === t)[0].p
    }

    shot () {
      
      this.GraphiteView.updateImage('http://4.bp.blogspot.com/-3C9h2lbDWD0/VLWBYBkl0VI/AAAAAAAAAAY/LahmyWbeOYg/s1600/code_logo_rgb-300x300.jpg')
    }
}
