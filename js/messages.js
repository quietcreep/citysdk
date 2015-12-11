
// Messages, derp ////////////////////////
const Messages = {
  requestIsNotObject: "Request must be an object",
  census: {
    'requestMustHaveLatitude': "request must have an latitude, lat, x, zip, or address property",
    'requestMustHaveLongitude': "request have an longitude, lng, y, zip, or address property",
    'requestLevelIsNotValidOption': 'request requires level to be one of "blockGroup", "tract", "county", "state", "us"',
    'requestVariablesMustBeArray': 'request variables must be an array'
  },
};


// Throw CitySDK Error //////////////////

function CityError( module, errorName ){
  var prefix = "CitySDK",
      moduleName,
      message;

  if ( module ){
    moduleName = module.charAt(0).toUpperCase() + module.slice(1);
    prefix += ' ' + moduleName + ': ';
    message = prefix + Messages[ module ][ errorName ]
  }
  else {
    prefix += ': ';
    message = prefix + Messages[ errorName ];
  }

  throw new Meteor.Error( message );
}


// Export //////////////
CitySDK.Error = CityError;
CitySDK.Messages = Messages;
