Package.describe({
  name: 'quietcreep:citysdk',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});


Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use([ 'ecmascript', 'http', 'underscore', 'check' ]);

  api.addFiles([
    'js/citysdk.js',
    'js/citysdk.census.js',
    'js/citysdk.census.aliases.js',
    'js/citysdk.ckan.js',
    'js/citysdk.eia.js',
    'js/citysdk.farmersMarket.js',
    'js/citysdk.fema.js',
    'js/citysdk.moduleTemplate.js',
    'js/citysdk.socrata.js',
    // 'js/messages.js',
    // 'js/specs.js'
    'js/methods.js',
  ], 'server' );

  api.export( 'CitySDK' );
});


Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('quietcreep:citysdk');
  api.addFiles('citysdk-tests.js');
});
