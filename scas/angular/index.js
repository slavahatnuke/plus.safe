module.exports = {
  title: 'angular generators',
  description: 'angular Scaffolding console',
  imports: [],
  actions: {
    module: {
      arguments: ['dir', 'name'],
      batch: [
        {
          name: '.module',
          map: {
            dir: '{{{ dir }}}/{{{ name | kebab }}}'
          }
        },
        {
          name: 'component',
          map: {
            dir: '{{{ dir }}}/{{{ name | kebab }}}'
          }
        },
        {
          name: 'service',
          map: {
            dir: '{{{ dir }}}/{{{ name | kebab }}}'
          }
        },
        {
          name: 'class',
          map: {
            dir: '{{{ dir }}}/{{{ name | kebab }}}'
          }
        }
      ]
    },
    component: {
      arguments: ['dir', 'name'],
      batch: [
        '.component',
        '.component.html',
        '.component.css'
      ]
    },
    'service': {
      arguments: ['dir', 'name'],
      input: 'module/app.service.ts',
      out: '{{{ dir }}}/{{{ name | kebab }}}.service.ts'
    },
    'class': {
      arguments: ['dir', 'name'],
      input: 'module/app.class.ts',
      out: '{{{ dir }}}/{{{ name | kebab }}}.ts'
    },
    '.component.html': {
      arguments: ['dir', 'name'],
      input: 'module/app.component.html',
      out: '{{{ dir }}}/{{{ name | kebab }}}.html'
    },
    '.component.css': {
      arguments: ['dir', 'name'],
      input: 'module/app.component.css',
      out: '{{{ dir }}}/{{{ name | kebab }}}.css'
    },
    '.component': {
      arguments: ['dir', 'name'], // required arguments
      input: 'module/app.component.ts', // path to template
      out: '{{{ dir }}}/{{{ name | kebab }}}.component.ts' // path to generated file
    },
    '.module': {
      arguments: ['dir', 'name'], // required arguments
      input: 'module/app.module.ts', // path to template
      out: '{{{ dir }}}/{{{ name | kebab }}}.module.ts' // path to generated file
    }
  }
}
