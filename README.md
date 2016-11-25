# About this fork

This fork fixes some minor issues found in the code of: 'The Node Craftsman Book' (online version published 2015-10-10).  It is to be reviewed and either merged or cherry picked into the main repo as the repo author sees fit.

The specific issue it fixes are these:

* **resetDatabase.js**; mysql dbSession altered to use TRUNCATE
* **server.js**; Altered POST keywords section for showing id.   mysql was seeing result.insertId as undefined so used dbSession.getLastInsertID() instead.  Also corrected require for dbSession.
* **app.js**; Altered as per Angular style guide to use a controllerAs - linked to not referencing $scope in controller
* **KeywordsController.js**; Altered as per Angular style guide
* **resolveEntity.js**; Altered as per Angular style guide
* **RepositoryFactory.js**; Altered as per Angular style guide


----

# About this repository

This repo hosts accompanying resources for *The Node Craftsman Book*.

Visit https://leanpub.com/nodecraftsman for more info.


# License

The MIT License (MIT)

Copyright (c) 2015 Manuel Kiessling

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
