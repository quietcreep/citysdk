/**
 * This is the CitySDK Module Template
 */

//Attach a new module object to the CitySDK prototype.
//It is advised to keep the filenames and module property names the same
CitySDK.prototype.modules.moduleTemplate = new ModuleTemplateModule();

//Module object definition. Every module should have an "enabled" property and an "enable"  function.
function ModuleTemplateModule() {
  this.enabled = false;
};

// shortcuts for readability
Object.defineProperties( ModuleTemplateModule.prototype, {
  'sdkInstance': {
    get: function(){ return CitySDK.prototype.sdkInstance },
    set: function(){ return CitySDK.prototype.sdkInstance },
  },
  'instance': {
    get: function(){ return this.sdkInstance.modules.moduleTemplate },
    set: function(){ return this.sdkInstance.modules.moduleTemplate },
  },
});

//Enable function. Stores the API key for this module and sets it as enabled
ModuleTemplateModule.prototype.enable = function(apiKey) {
  this.apiKey = apiKey;
  this.enabled = true;
};

// After this point the module is all up to you
// References to an instance of the SDK should be called as:
// this.sdkInstance;

// And references to this module should be called as
// this.instance;
