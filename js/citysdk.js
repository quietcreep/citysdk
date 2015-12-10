/**
 * CitySDK
**/

/**
 * Instantiates an instance of the CitySDK object.
 * @constructor
 */
CitySDK = function CitySDK() {
    CitySDK.prototype.sdkInstance = this;
}

//SDK instance for the callback functions
CitySDK.prototype.sdkInstance = null;

/**
 * Stores each module
 * @type {object}
 */
CitySDK.prototype.modules = {};

/**
 * Makes an AJAX call
 * @param url {string} URL to request
 * @return {promise} Returns a standard ajax promise
 */
CitySDK.prototype.ajaxRequest = function(url) {
    return HTTP.get( url, {
      headers: {
        dataType: 'text',
        contentType: 'text/plain',
      }
    });
};

/**
 * Makes an AJAX call (using jsonp)
 * @param url {string} URL to request
 * @return {object} Returns a standard ajax promise
 */
CitySDK.prototype.jsonpRequest = function(url) {
    return HTTP.get( url, {
      headers: {
        dataType: "json",
        contentType: 'application/json'
      }
    });
};

/**
 * Make an AJAX call (using POST)
 * @param url
 * @param data
 * @returns {*}
 */
CitySDK.prototype.postRequest = function(url, data) {
    return HTTP.post( url, {
        data: data,
        headers: { dataType: "text" }
    });
};
