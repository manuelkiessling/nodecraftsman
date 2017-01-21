'use strict'

let path = require('path')
let Percolator = require('percolator').Percolator
let dbSession = require('../../src/backend/dbSession.js')

let Server = function (port) {
  let server = Percolator({'port': port, 'autoLink': false, 'staticDir': path.join(__dirname, '/../frontend')})

  server.route('/api/keywords',
    {
      GET: function (req, res) {
        dbSession.fetchAll('SELECT id, value, categoryID FROM keyword ORDER BY id', function (err, rows) {
          if (err) {
            console.log(err)
            res.status.internalServerError(err)
          } else {
            res.collection(rows).send()
          }
        })
      },
      POST: function (req, res) {
        req.onJson(function (err, newKeyword) {
          if (err) {
            console.log(err)
            res.status.internalServerError(err)
          } else {
            dbSession.insert('keyword', newKeyword, function (err, result) {
              if (err) {
                console.log(err)
                res.status.internalServerError(err)
              } else {
                res.object({'status': 'ok', 'id': dbSession.getLastInsertId()}).send()
              }
            })
          }
        })
      }
    }
  )

  server.route('/api/keywords/categories',
    {
      GET: function (req, res) {
        dbSession.fetchAll('SELECT id, name FROM category ORDER BY id', function (err, rows) {
          if (err) {
            console.log(err)
            res.status.internalServerError(err)
          } else {
            res.collection(rows).send()
          }
        })
      }
    }
  )

  server.route('/api/keywords/:id',
    {
      POST: function (req, res) {
        var keywordId = req.uri.child()
        req.onJson(function (err, keyword) {
          if (err) {
            console.log(err)
            res.status.internalServerError(err)
          } else {
            let updateKeyword = {'value': keyword.value, 'categoryID': keyword.categoryID}
            dbSession.update('keyword', updateKeyword, [['id=?', parseInt(keywordId)]],
              function (err, result) {
                if (err) {
                  console.log(err)
                  res.status.internalServerError(err)
                } else {
                  res.object({'status': 'ok'}).send()
                }
              })
          }
        })
      },
      DELETE: function (req, res) {
        var keywordId = req.uri.child()
        dbSession.remove('keyword', [['id=?', parseInt(keywordId)]], function (err, result) {
          if (err) {
            console.log(err)
            res.status.internalServerError(err)
          } else {
            res.object({'status': 'ok'}).send()
          }
        })
      }
    }
  )

  return server
}

module.exports = {'Server': Server}
