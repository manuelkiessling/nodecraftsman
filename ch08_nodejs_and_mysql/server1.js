'use strict';

var mysql       = require('mysql'),
    http        = require('http'),
    url         = require('url'),
    querystring = require('querystring');


// Start a web server on port 8888. Requests go to function handleRequest

http.createServer(handleRequest).listen(8888);


// Function that handles http requests

function handleRequest(request, response) {
  
  // Page HTML as one big string, with placeholder "DBCONTENT" for data from
  // the database
  var pageContent = '<html>' +
    '<head>' +
    '<meta http-equiv="Content-Type" ' +
    'content="text/html; charset=UTF-8" />' +
    '</head>' +
    '<body>' +
    '<form action="/add" method="post">' +
    '<input type="text" name="content">' +
    '<input type="submit" value="Add content" />' +
    '</form>' +
    '<div>' +
    '<strong>Content in database:</strong>' +
    '<pre>' +
    'DBCONTENT' +
    '</pre>' +
    '</div>' +
    '<form action="/" method="get">' +
    '<input type="text" name="q">' +
    '<input type="submit" value="Filter content" />' +
    '</form>' +
    '</body>' +
    '</html>';
  
  // Parsing the requested URL path in order to distinguish between
  // the / page and the /add route
  var pathname = url.parse(request.url).pathname;
  
  // User wants to add content to the database (POST request to /add)
  if (pathname == '/add') {
    var requestBody = '';
    var postParameters;
    request.on('data', function (data) {
      requestBody += data;
    });
    request.on('end', function() {
      postParameters = querystring.parse(requestBody);
      // The content to be added is in POST parameter "content"
      addContentToDatabase(postParameters.content, function() {
        // Redirect back to homepage when the database has finished adding
        // the new content to the database
        response.writeHead(302, {'Location': '/'});
        response.end();
      });
    });
    
    // User wants to read data from the database (GET request to /)
  } else {
    // The text to use for filtering is in GET parameter "q"
    var filter = querystring.parse(url.parse(request.url).query).q;
    getContentsFromDatabase(filter, function(contents) {
      response.writeHead(200, {'Content-Type': 'text/html'});
      // Poor man's templating system: Replace "DBCONTENT" in page HTML with
      // the actual content we received from the database
      response.write(pageContent.replace('DBCONTENT', contents));
      response.end();
    });
  }
}


// Function that is called by the code that handles the / route and
// retrieves contents from the database, applying a LIKE filter if one
// was supplied

function getContentsFromDatabase(filter, callback) {
  var connection = mysql.createConnection({
    host: 'mysql',
    user: 'root',
    password: '',
    database: 'node'
  });
  var query;
  var resultsAsString = '';
  
  if (filter) {
    query = connection.query('SELECT id, content FROM test ' +
      'WHERE content LIKE "' + filter + '%"');
  } else {
    query = connection.query('SELECT id, content FROM test');
  }
  
  query.on('error', function(err) {
    console.log('A database error occured:');
    console.log(err);
  });
  
  // With every result, build the string that is later replaced into
  // the HTML of the homepage
  query.on('result', function(result) {
    resultsAsString += 'id: ' + result.id;
    resultsAsString += ', content: ' + result.content;
    resultsAsString += '\n';
  });
  
  // When we have worked through all results, we call the callback
  // with our completed string
  query.on('end', function(result) {
    connection.end();
    callback(resultsAsString);
  });
}


// Function that is called by the code that handles the /add route
// and inserts the supplied string as a new content entry

function addContentToDatabase(content, callback) {
  var connection = mysql.createConnection({
    host: 'mysql',
    user: 'root',
    password: '',
    database: 'node'
  });
  
  connection.query('INSERT INTO test (content) ' +
    'VALUES ("' + content + '")',
    function(err) {
      if (err) {
        console.log('Could not insert content "' + content +
          '" into database.');
      }
      callback();
    });
}
