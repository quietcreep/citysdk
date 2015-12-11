/**
 * This is the CitySDK Module Template's EIA API module.
 * This module requires a key from http://www.eia.gov/
 */

//Attach a new module object to the CitySDK prototype.
//It is advised to keep the filenames and module property names the same
CitySDK.prototype.modules.eia = new EIAModule();

//Module object definition. Every module should have an "enabled" property and an "enable"  function.
function EIAModule() {
  this.enabled = false;
};


// shortcuts for readability
Object.defineProperties( EIAModule.prototype, {
  'sdkInstance': {
    get: function(){ return CitySDK.prototype.sdkInstance },
    set: function(){ return CitySDK.prototype.sdkInstance },
  },
  'instance': {
    get: function(){ return this.sdkInstance.modules.eia },
    set: function(){ return this.sdkInstance.modules.eia },
  },
});


//Enable function. Stores the API key for this module and sets it as enabled
EIAModule.prototype.enable = function(apiKey) {
  this.apiKey = apiKey;
  this.enabled = true;
};

/**
 * Call which returns category listings from the dataset explorer
 *
 * Request should specify category. If no category specified, will default to the root list of datasets
 * {
 *      category: 05
 * }
 *
 * @param request
 * @param callback
 */
EIAModule.prototype.categoryRequest = function(request, callback) {
  var apiKeyPattern = /({apiKey})/,
      categoryPattern = /({category})/,
      categoryURL = "http://api.eia.gov/category/?api_key={apiKey}&category_id={category}",
      response;

  if(! ( "category" in request ))
    request.category = 371; //Default - root list of all datasets

  categoryURL = categoryURL.replace( apiKeyPattern, this.apiKey );
  categoryURL = categoryURL.replace( categoryPattern, request.category );

  response = this.sdkInstance.ajaxRequest( categoryURL );
  response = JSON.parse( response.content );
  return response;
};

/**
 * Call which returns data from the specified series
 *
 * Request should specify a series, if not, nothing will happen
 *
 * {
 *      series: "ELEC.GEN.ALL-AL-99.A"
 * }
 *
 * @param request
 * @param callback
 */
EIAModule.prototype.seriesRequest = function(request, callback) {
  var apiKeyPattern = /({apiKey})/,
      seriesPattern = /({series})/,
      seriesURL = "http://api.eia.gov/series/?api_key={apiKey}&series_id={series}",
      response;

  if (! ("series" in request )) return;

  seriesURL = seriesURL.replace(apiKeyPattern, this.apiKey);
  seriesURL = seriesURL.replace(seriesPattern, request.series);

  response = this.sdkInstance.ajaxRequest(seriesURL);
  response = JSON.parse( response.content );
  return response;
};
