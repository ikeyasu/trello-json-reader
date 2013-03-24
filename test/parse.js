// vim:sw=2:ts=2:et: 
var assert = require("assert");
var TrelloReader = require("../trello_reader");

describe('TrelloReader.Data', function(){
  it('should return a instance of Data class', function(){
    assert.equal(true, (new TrelloReader.parse('{}')) instanceof TrelloReader.Data);
  })
});

