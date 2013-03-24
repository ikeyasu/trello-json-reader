// vim:sw=2:ts=2:et:
/*
 * (c) 2013 Yasuki Ikeuchi, http://github.com/ikeyasu/trello-json-reader
 */
// Note: YUIDoc syntax: http://yui.github.com/yuidoc/syntax/index.html

(function(){
  // Save a reference to the global object.
  var root = this;

  // Require Underscore, if we're on the server, and it's not already present.
  var _ = root._;
  if (!_ && (typeof require !== 'undefined')) _ = require('underscore');

  /**
   * The top-level namespace.
   * @class TrelloReader
   */
  var TrelloReader;
  if (typeof exports !== 'undefined') {
    // 'exports' is a global object for server-side js
    TrelloReader = exports;
  } else {
    TrelloReader = root.TrelloReader = {};
  }
  TrelloReader.VERSION = "0.0.1";
 
  /**
   * Parse json exported from Trello
   * @method parse
   * @return Data
   */
  var parse = TrelloReader.parse = function(json) {
    return new Data(JSON.parse(json));
  };

  /**
   * The top-level namespace.
   * @class Data
   */ 
  var Data = TrelloReader.Data = function(jsonObj) {
    var self = this;
    self._jsonObj = jsonObj;
    if (!(jsonObj instanceof Object))
      return;
    /**
     * Array for all activities.
     * @property activities
     */ 
    self.activities = jsonObj.actions;
    /**
     * Array for all cards.
     * @property cards
     */ 
    self.cards = jsonObj.cards;
    /**
     * Array for all lists.
     * @property lists
     */ 
    self.lists = jsonObj.lists;
    self.listsHash = {};
    self.cardsHash = {};
    _.each(self.lists, function(value, key) {
      self.listsHash[value.id] = value;
    });
    _.each(self.cards, function(value, key) {
      self.cardsHash[value.id] = value;
    });
    /**
     * cards property has reference to comments having oneself.
     * @property cards[].comments[]
     */ 
    _.map(self.cards, function(value, key) {
      value.comments = [];
    });
    _.each(self.activities, function(value, key) {
      if(value.type == "commentCard") {
        self.cardsHash[value.data.card.id].comments.push(value);
      }
    });
    /**
     * cards property has reference to the list including oneself.
     * @property cards[].list
     */ 
    /**
     * list property has references to cards having oneself.
     * @property lists.cards[]
     */ 
    _.each(self.cards, function(value, key) {
      value.list = self.listsHash[value.idList];
      if (value.list.cards == undefined) value.list.cards = [];
      value.list.cards.push(value);
    });
  };

}).call(this);
