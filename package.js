/* global Package */

Package.describe({
  name: 'hacknlove:validarformulario',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'valida formularios y muestra mensajes de error',
  // URL to the Git repository containing the source code for this package.
  git: 'git@hacknlove.github.com:hacknlove/validarFormulario.git',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
})

Package.onUse(function (api) {
  api.versionsFrom('1.7.0.5')
  api.use('ecmascript')
  api.use('jquery@1.0.0', 'client')
  api.use('less', 'client')
  api.addFiles('validarFormulario.less', 'client')
  api.mainModule('validarformulario.js', 'client')
})
