module.exports = {
  title: 'angular generators',
  description: 'angular Scaffolding console',
  imports: [],
  actions: {
    module: {
      title: 'Module + routing',
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
        },
        {
          name: 'routing.module',
          map: {
            dir: '{{{ dir }}}/{{{ name | kebab }}}'
          }
        }
      ]
    },
    component: {
      arguments: ['dir', 'name'],
      title: 'Simple component',
      batch: [
        '.component',
        '.component.html',
        '.component.css'
      ]
    },
    'service': {
      title: 'Simple service',
      arguments: ['dir', 'name'],
      input: 'module/app.service.ts',
      out: '{{{ dir }}}/{{{ name | kebab }}}.service.ts'
    },
    'class': {
      title: 'Simple class/model',
      arguments: ['dir', 'name'],
      input: 'module/app.class.ts',
      out: '{{{ dir }}}/{{{ name | kebab }}}.ts'
    },
    'routing.module': {
      title: 'Simple routing module',
      arguments: ['dir', 'name'],
      input: 'module/app.routing.module.ts',
      out: '{{{ dir }}}/{{{ name | kebab }}}.routing.module.ts'
    },
    '.component.html': {
      arguments: ['dir', 'name'],
      input: 'module/app.component.html',
      out: '{{{ dir }}}/{{{ name | kebab }}}.component.html'
    },
    '.component.css': {
      arguments: ['dir', 'name'],
      input: 'module/app.component.css',
      out: '{{{ dir }}}/{{{ name | kebab }}}.component.css'
    },
    '.component': {
      arguments: ['dir', 'name'],
      input: 'module/app.component.ts',
      out: '{{{ dir }}}/{{{ name | kebab }}}.component.ts'
    },
    '.module': {
      arguments: ['dir', 'name'],
      input: 'module/app.module.ts',
      out: '{{{ dir }}}/{{{ name | kebab }}}.module.ts'
    }
  }
}
