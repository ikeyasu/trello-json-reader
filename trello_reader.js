// vim:sw=2:ts=2:et: 

if (typeof require !== 'undefined') {
  var fs = require('fs');
}

(function(){
  // Save a reference to the global object.
  var root = this;

  // The top-level namespace. 
  var TrelloReader;
  if (typeof exports !== 'undefined') {
    // 'exports' is a global object for server-side js
    TrelloReader = exports;
  } else {
    TrelloReader = root.TrelloReader = {};
  }
  TrelloReader.VERSION = "0.0.1";

  // Require Underscore, if we're on the server, and it's not already present.
  var _ = root._;
  if (!_ && (typeof require !== 'undefined')) _ = require('underscore');

  var Data = TrelloReader.Data = function(jsonObj) {
    this._jsonObj = jsonObj;
  };

  var parse = TrelloReader.parse = function(json) {
    return new Data(JSON.parse(json));
  };

}).call(this);
