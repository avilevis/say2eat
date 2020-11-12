const express = require('express');
const router = express.Router();
const psql_req = require('../db/database.js')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/new', function(req, res, next) {
  psql_req.newWeekdays()
      .then((results)=>{
          res.send(results)
      })
      .catch(()=>res.status(500).send())

});

router.post('/patch', function(req, res, next) {
    psql_req.updateWeekdays(req.body.id, req.body.field, req.body.value)
        .then((results)=>{
            res.send(results)
        })
        .catch((err)=>res.status(500).send(err))

});

module.exports = router;
