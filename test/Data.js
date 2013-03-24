// vim:sw=2:ts=2:et: 
var assert = require("assert");
var fs = require('fs')
var TrelloReader = require("../trello_reader");

describe('TrelloReader.Data', function(){
  it('should return a instance of Data class', function(){
    assert.equal(true, (new TrelloReader.Data()) instanceof TrelloReader.Data);
  });

  it('should return a instance of Data class (2)', function(){
    fs.readFile('test/data/testdata-Data-1.json', 'utf8', function(err, data) {
      if (err) throw err;
      assert.equal(true, (new TrelloReader.Data(JSON.parse(data))) instanceof TrelloReader.Data);
    });
  });

  it('should has activity list', function(){
    fs.readFile('test/data/testdata-Data-1.json', 'utf8', function(err, data) {
      if (err) throw err;
      var data = new TrelloReader.Data(JSON.parse(data));
      assert.equal(2, data.activities.length);
      assert.equal("514e2f8fb6f1dd2d7c002dcf", data.activities[0].id);
      assert.equal("514e2ed443663060620025f7", data.activities[1].id);
      assert.equal(undefined, data.activities[2]);
    });
  });

  it('should has card list', function(){
    fs.readFile('test/data/testdata-Data-1.json', 'utf8', function(err, data) {
      if (err) throw err;
      var data = new TrelloReader.Data(JSON.parse(data));
      assert.equal(1, data.cards.length);
      assert.equal("514e2f8fb6f1dd2d7c002dce", data.cards[0].id);
      assert.equal(undefined, data.cards[1]);
    });
  });

  it('should has card list with relations to list', function(){
    fs.readFile('test/data/testdata-Data-1.json', 'utf8', function(err, data) {
      if (err) throw err;
      var data = new TrelloReader.Data(JSON.parse(data));
      assert.equal("514e2ed443663060620025f3", data.cards[0].idList);
      assert.equal("514e2ed443663060620025f3", data.cards[0].list.id);
    });
  });

  it('should has List', function(){
    fs.readFile('test/data/testdata-Data-1.json', 'utf8', function(err, data) {
      if (err) throw err;
      var data = new TrelloReader.Data(JSON.parse(data));
      assert.equal('514e2ed443663060620025f3', data.listsHash['514e2ed443663060620025f3'].id);
    });
  });

  it('should has List', function(){
    fs.readFile('test/data/testdata-Data-1.json', 'utf8', function(err, data) {
      if (err) throw err;
      var data = new TrelloReader.Data(JSON.parse(data));
      assert.equal(3, data.lists.length);
      assert.equal("514e2ed443663060620025f3", data.lists[0].id);
      assert.equal("514e2ed443663060620025f4", data.lists[1].id);
      assert.equal("514e2ed443663060620025f5", data.lists[2].id);
    });
  });

  it('should has card list with relations to cards', function(){
    fs.readFile('test/data/testdata-Data-1.json', 'utf8', function(err, data) {
      if (err) throw err;
      var data = new TrelloReader.Data(JSON.parse(data));
      assert.equal(1, data.lists[0].cards.length);
      assert.equal("514e2f8fb6f1dd2d7c002dce", data.lists[0].cards[0].id);
    });
  });
});

