
const City = new CitySDK();
var APIKey;


// Census
Meteor.methods({
  'city/census/request': function( request ){
    return City.modules.census.APIRequest( request );
  },
})


// Settings
Meteor.methods({
  'city/settings/key': function( key ){
    if ( typeof( key ) !== 'string' )
      throw new Meteor.Error( "A CitySDK API key must be a string" );
    APIKey = key;
  },

  'city/settings/enable': function(){
    if ( APIKey == null )
      throw new Meteor.Error( "Enabling all CitySDK modules requires an API key. Set it by calling Meteor.call( 'city/settings/key', <APIKEY> )" );

    for ( var mod in City.modules ){
      City.modules[ mod ].enable( APIKey );
    }
  },
  'city/settings/census/enable':        City.modules.census.enable.bind( City.modules.census, APIKey ),
  'city/settings/ckan/enable':          City.modules.ckan.enable.bind( City.modules.ckan, APIKey ),
  'city/settings/eia/enable':           City.modules.eia.enable.bind( City.modules.eia, APIKey ),
  'city/settings/farmersMarket/enable': City.modules.farmersMarket.enable.bind( City.modules.farmersMarket, APIKey ),
  'city/settings/fema/enable':          City.modules.fema.enable.bind( City.modules.fema, APIKey ),
  'city/settings/socrata/enable':       City.modules.socrata.enable.bind( City.modules.socrata, APIKey ),
});
