
// Messages, derp //////////////////
const CityRequestSpec = Match.Where( function( request ){
  if (! ( request instanceof Object ) )
    CitySDK.Error( null, 'requestIsNotObject' );
  return true;
});



/// Census //////////////////////
const CensusRequestSpec = new Match.Where( function( request ){
  const levelPattern = Match.OneOf( "blockGroup", "tract", "county", "state", "us" );

  check( request, CityRequestSpec );
  _.defaults( request, CensusModule.prototype.DEFAULTS );

  // lat / lng check
  if (! ( request.lat || request.x || request.latitude || request.zip || request.address ))
    CitySDK.Error( 'census', 'requestMustHaveLatitude' );
  if (! ( request.lng || request.y || request.longitude || request.zip || request.address ))
    CitySDK.Error( 'census', 'requestMustHaveLongitude' );

  // level check
  if (! Match.test( request.level, levelPattern ))
    CitySDK.Error( 'census', 'requestLevelIsNotValidOption' )

  return true;
});


// EXPORT ///////
CitySDK.Specs = {
  Request: CityRequestSpec,
  CensusRequest: CensusRequestSpec,
};
