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
      { a: 'JavaScript', p: 'javascript' },
      { a: 'JSDoc', p: 'javascript' },
      { a: 'C', p: 'c' },
      { a: 'C++', p: 'cpp' },
      { a: 'Clojure', p: 'clojure' },
      { a: 'CoffeeScript (Literate)', p: 'coffeescript' },
      { a: 'CoffeeScript', p: 'coffeescript' },
      { a: 'C# Cake File', p: 'csharp' },
      { a: 'C# Script File', p: 'csharp' },
      { a: 'C#', p: 'csharp' },
      { a: 'CSS', p: 'css' },
      { a: 'GitHub Markdown', p: 'markdown' },
      { a: 'Git Commit Message', p: 'bash' },
      { a: 'Git Rebase Message', p: 'bash' },
      { a: 'Git Config', p: 'markup' },
      { a: 'Go', p: 'go' },
      { a: 'HTML (Go)', p: 'go' },
      { a: 'Go Template', p: 'go' },
      { a: 'HTML', p: 'markup' },
      { a: 'JavaServer Pages', p: 'java' },
      { a: 'Java', p: 'java' },
      { a: 'Java Properties', p: 'java' },
      { a: 'JUnit Test Report', p: 'markup' },
      { a: 'JSON', p: 'json' },
      { a: 'Less', p: 'less' },
      { a: 'Makefile', p: 'markup' },
      { a: 'HTML (Mustache)', p: 'markup' },
      { a: 'SQL (Mustache)', p: 'sql' },
      { a: 'Objective-C', p: 'objectivec' },
      { a: 'Objective-C++', p: 'objectivec' },
      { a: 'Strings File', p: 'markup' },
      { a: 'Perl 6', p: 'perl' },
      { a: 'PHP', p: 'php' },
      { a: 'Property List (Old-Style)', p: 'markup' },
      { a: 'Property List (XML)', p: 'markup' },
      { a: 'Python Console', p: 'python' },
      { a: 'Python Traceback', p: 'python' },
      { a: 'Python', p: 'python' },
      { a: 'Regular Expressions (Python)', p: 'python' },
      { a: 'Gemfile', p: 'ruby' },
      { a: 'HTML (Ruby - ERB)', p: 'ruby' },
      { a: 'Ruby', p: 'ruby' },
      { a: 'HTML (Rails)', p: 'ruby' },
      { a: 'Ruby on Rails (RJS)', p: 'ruby' },
      { a: 'SQL (Rails)', p: 'sql' },
      { a: 'SASS', p: 'sass' },
      { a: 'SCSS', p: 'scss' },
      { a: 'Shell Session', p: 'bash' },
      { a: 'Shell Script', p: 'bash' },
      { a: 'SQL', p: 'sql' },
      { a: 'Plain Text', p: 'markdown' },
      { a: 'TOML', p: 'markdown' },
      { a: 'TypeScript', p: 'typescript' },
      { a: 'TypeScriptReact', p: 'typescript' },
      { a: 'XML', p: 'markup' },
      { a: 'XSL', p: 'markup' },
      { a: 'YAML', p: 'yaml' },
      { a: 'Blade', p: 'php' },
      { a: 'Vue Component', p: 'markup-templating' }
    ]
    return available.filter(i => i.a === type)[0].p
  }

}

export default new Graphite()
