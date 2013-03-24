// vim:sw=2:ts=2:et: 
var assert = require("assert");
var fs = require('fs')
var _ = require('underscore')
var TrelloReader = require("../trello-json-reader");

describe('TrelloReader.Data', function(){
  it('should return a instance of Data class', function(){
    assert.equal(true, (new TrelloReader.Data()) instanceof TrelloReader.Data);
  });

  it('should return a instance of Data class (file load)', function(){
    fs.readFile('test/data/testdata-Data-1.json', 'utf8', function(err, data) {
      if (err) throw err;
      assert.equal(true, (new TrelloReader.Data(JSON.parse(data))) instanceof TrelloReader.Data);
    });
  });
});

describe('TrelloReader.Data.activity', function(){
  it('should has a list', function(){
    fs.readFile('test/data/testdata-Data-1.json', 'utf8', function(err, data) {
      if (err) throw err;
      var data = new TrelloReader.Data(JSON.parse(data));
      assert.equal(2, data.activities.length);
      assert.equal("514e2f8fb6f1dd2d7c002dcf", data.activities[0].id);
      assert.equal("514e2ed443663060620025f7", data.activities[1].id);
      assert.equal(undefined, data.activities[2]);
    });
  });
});

describe('TrelloReader.Data.cards', function(){
  it('should has a list', function(){
    fs.readFile('test/data/testdata-Data-1.json', 'utf8', function(err, data) {
      if (err) throw err;
      var data = new TrelloReader.Data(JSON.parse(data));
      assert.equal(1, data.cards.length);
      assert.equal("514e2f8fb6f1dd2d7c002dce", data.cards[0].id);
      assert.equal(undefined, data.cards[1]);
    });
  });

  it('should has a list of comment', function(){
    fs.readFile('test/data/testdata-Data-2.json', 'utf8', function(err, data) {
      if (err) throw err;
      var data = new TrelloReader.Data(JSON.parse(data));
      var found = _.reduce(data.activities, function(memo, value, key) {
        return memo || value.type == "commentCard";
      }, false);
      assert.equal(true, found);
      assert.equal("514f84a03ce30630230003ee", data.cards[0].comments[0].id);
      assert.equal("514f7ecb832735846c005694", data.cards[0].comments[1].id);
    });
  });

  it('should has relations with list', function(){
    fs.readFile('test/data/testdata-Data-1.json', 'utf8', function(err, data) {
      if (err) throw err;
      var data = new TrelloReader.Data(JSON.parse(data));
      assert.equal("514e2ed443663060620025f3", data.cards[0].idList);
      assert.equal("514e2ed443663060620025f3", data.cards[0].list.id);
    });
  });
});

describe('TrelloReader.Data.listsHash', function(){
  it('should has a list internaly', function(){
    fs.readFile('test/data/testdata-Data-1.json', 'utf8', function(err, data) {
      if (err) throw err;
      var data = new TrelloReader.Data(JSON.parse(data));
      assert.equal('514e2ed443663060620025f3', data.listsHash['514e2ed443663060620025f3'].id);
    });
  });
});

describe('TrelloReader.Data.lists', function(){
  it('should has list', function(){
    fs.readFile('test/data/testdata-Data-1.json', 'utf8', function(err, data) {
      if (err) throw err;
      var data = new TrelloReader.Data(JSON.parse(data));
      assert.equal(3, data.lists.length);
      assert.equal("514e2ed443663060620025f3", data.lists[0].id);
      assert.equal("514e2ed443663060620025f4", data.lists[1].id);
      assert.equal("514e2ed443663060620025f5", data.lists[2].id);
    });
  });

  it('should has relations with cards', function(){
    fs.readFile('test/data/testdata-Data-1.json', 'utf8', function(err, data) {
      if (err) throw err;
      var data = new TrelloReader.Data(JSON.parse(data));
      assert.equal(1, data.lists[0].cards.length);
      assert.equal("514e2f8fb6f1dd2d7c002dce", data.lists[0].cards[0].id);
    });
  });
});

