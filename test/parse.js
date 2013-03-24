// vim:sw=2:ts=2:et: 
var assert = require("assert");
var fs = require('fs')
var TrelloReader = require("../trello-json-reader");

describe('TrelloReader.Data', function(){
  it('should return a instance of Data class', function(){
    assert.equal(true, (TrelloReader.parse('{}')) instanceof TrelloReader.Data);
    fs.readFile('test/data/testdata-Data-1.json', 'utf8', function(err, data) {
      assert.equal(true, (TrelloReader.parse(data)) instanceof TrelloReader.Data);
    });
  })
});

