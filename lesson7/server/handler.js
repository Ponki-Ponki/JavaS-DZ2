const date = require('date-and-time');
const fs = require('fs');
const cart = require('./cart');

const actions = {
  add: cart.add,
  change: cart.change,
  delete: cart.del,
};

const handler = (req, res, action, file) => {
  fs.readFile(file, 'utf-8', (err, data) => {
    if (err) {
      res.sendStatus(404, JSON.stringify({result: 0, text: err}));
    } else {
      const newCart = actions[action](JSON.parse(data), req);
      fs.writeFile(file, newCart, (err) => {
        if (err) {
          res.send('{"result": 0}');
        } else {
          res.send('{"result": 1}');
          stats(action,req,newCart);
        }
      });
    }
  });
};

const stats = (action,req) =>{
  fs.readFile('./server/api/stats.json',(err,data)=>{
            if (!err){
              const now = new Date();
              const stats = JSON.parse(data);
              let activ = `Действие: ${action},  'ID товара: ${req.params.id} Дата: ${date.format(now, 'YYYY/MM/DD HH:mm:ss')}
              `;
              stats.push(activ);
              fs.writeFile('./server/api/stats.json',JSON.stringify(stats),()=>{})
            }
  })
};

module.exports = handler;
