/**
 * This is the CitySDK CKAN Module Template
 */

//Attach a new module object to the CitySDK prototype.
//It is advised to keep the filenames and module property names the same
CitySDK.prototype.modules.ckan = new CkanModule();

//Module object definition. Every module should have an "enabled" property and an "enable"  function.
function CkanModule() {
  this.enabled = false;
};


// shortcuts for readability
Object.defineProperties( CkanModule.prototype, {
  'sdkInstance': {
    get: function(){ return CitySDK.prototype.sdkInstance },
    set: function(){ return CitySDK.prototype.sdkInstance },
  },
  'instance': {
    get: function(){ return this.sdkInstance.modules.ckan },
    set: function(){ return this.sdkInstance.modules.ckan },
  },
});


//Enable function.
CkanModule.prototype.enable = function() {
  this.enabled = true;
};

/**
 * Sends a SQL query to a CKAN server.
 * The DataStore extension must be installed to utilise this.
 *
 * var request = {
 *     "url": 'catalog.opendata.city',
 *     "Select": '"name","streetAddress","postalCode"',
 *     "From": '"e4491e0c-ba09-4cb2-97c1-d466e3e976a5"',
 *     "Limit": '2'
 * }
 *
 * Response:
 * {
 *     "success": true,
 *     "result": {
 *         "records": [
 *             {
 *                 "postalCode": "10001",
 *                 "streetAddress": "441 WEST 26 STREET",
 *                 "name": "Hudson Guild Ccc"
 *             },
 *             {
 *                 "postalCode": "10001",
 *                 "streetAddress": "459 WEST 26 STREET",
 *                 "name": "Hudson Guild Children's Center"
 *             }
 *         ],
 *         "fields": [
 *             {
 *                 "type": "text",
 *                 "id": "name"
 *             },
 *             {
 *                 "type": "text",
 *                 "id": "streetAddress"
 *             },
 *             {
 *                 "type": "numeric",
 *                 "id": "postalCode"
 *             }
 *         ],
 *         "sql": "SELECT \"name\",\"streetAddress\",\"postalCode\" FROM \"e4491e0c-ba09-4cb2-97c1-d466e3e976a5\" LIMIT 2 "
 *     }
 * }
 *
 * @param request
 */
CkanModule.prototype.search = function( request ) {
  var urlPattern  = /({url})/,
      ckanURL     = "https://{url}/api/action/datastore_search_sql?sql=",
      limit       = false,
      response;

  ckanURL = ckanURL.replace( urlPattern, request.url );

  for ( var key in request ) {
    if ( request.hasOwnProperty( key ) ) {
      if ( key != "url" ) {
        ckanURL += encodeURIComponent( key ) + '%20' + encodeURIComponent( request[key] ) + '%20';
        if ( key.toLowerCase() == "limit" )
          limit = true;
      }
    }
  }

  if (!limit)
    ckanURL += 'Limit%201000';  //Limit results to 1000 records by default

  response = this.sdkInstance.ajaxRequest(ckanURL)
  response = JSON.parse( response.content );
  return response;
};
