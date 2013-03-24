trello-json-reader.js
=====================

(c) 2013 Yasuki Ikeuchi, http://github.com/ikeyasu/trello-json-reader

This is a simple utility to read JSON file exported from Trello.

NOTE: Trello is a Trademark of Fog Creek Software, Inc.
NOTE: This utility has no relation with Fog Creek Software, Inc.

Usage
=====
    fs.readFile('trello-exported.json', 'utf8', function(err, data) {
      var data = TrelloReader.parse(data);
    });
