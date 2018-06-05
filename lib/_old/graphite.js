'use babel'

const Graphite = class Graphite {

  config () {
    return {
      default_path: {
        type: 'string',
        default: '/home/gabriel/Pictures'
      },

      debug_mode: {
        type: 'boolean',
        default: false
      },

      theme: {
        type: 'string',
        default: 'monokai',
        enum: [
          {value: 'coy', description: 'Coy theme'},
          {value: 'monokai', description: 'Monokai theme'},
          {value: 'dark', description: 'Dark theme'},
          {value: 'funky', description: 'Funky theme'},
          {value: 'okaidia', description: 'Okaidia theme'},
          {value: 'solarizedlight', description: 'Solarized light theme'},
          {value: 'tomorrow', description: 'Tomorrow theme'},
          {value: 'twilight', description: 'Twilight theme'}
        ]
      }
    }
  }

  mapType (type) {
    let available = [
      
    ]
    return available.filter(i => i.a === type)[0].p
  }

}

export default new Graphite()
