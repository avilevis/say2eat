const express = require('express');
const router = express.Router();
const psql_req = require('../db/database.js')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api', function(req, res, next) {
    psql_req.listWeekdays()
        .then((results)=>{
            let res_formated = results.map((obj)=> psql_req.format_week(obj))
            res.status(200).send(res_formated)
        })
        .catch(()=>res.status(500).send())

});

router.post('/api', function(req, res, next) {
  psql_req.newWeekdays()
      .then((results)=>{
          res.send(results)
      })
      .catch(()=>res.status(500).send())

});

router.patch('/api', function(req, res, next) {
    psql_req.updateWeekdays(req.body.id, req.body.field, req.body.value)
        .then((results)=>{
            res.send(results)
        })
        .catch((err)=>res.status(500).send(err))

});

router.delete('/api', function(req, res, next) {
    psql_req.deleteWeekdays(req.body.id)
        .then((results)=>{
            res.send(results)
        })
        .catch((err)=>res.status(500).send(err))

});

module.exports = router;
