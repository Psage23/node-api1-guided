const express = require('express');

const Hubs = require('./data/hubs-model.js'); //our Hubs database library
const server = express();

//middleware: teaches express new things
server.use(express.json()); //needed to parse JSON

//get to "/"
server.get('/', function(request, response) {
    response.send({ hello: 'web 25'});
});

//see a list of Hubs
server.get('/api/hubs', (req,res) => {
    //read the data from the database (Hubs)
    Hubs.find() //return a promise
        .then(hubs => {
            res.status(200).json(hubs);
        })
        .catch(error => {
            console.log(error);
            //handle the error
            res.json({errorMessage: 'sorry, we ran into an error getting a list from hubs'})
        })
})

//create a Hub
server.post('/api/hubs', (req, res) => {
    const hubData = req.body;
    // never trust the client, validate the data. for now we trust the data for the demo
    Hubs.add(hubData)
    .then(hub => {
        res.status(201).json(hub);
      })
      .catch(error => {
        console.log(error);
        // handle the error
        res.status(500).json({
          errorMessage: 'sorry, we ran into an error creating the hub',
        });
      });
  });


//delete a Hub
server.delete('/api/hubs/:id', (req, res) => {
    const id = req.params.id;
    Hubs.remove(id)
      .then(result => {
        // res.status(204).end();
        res.status(200).json(result);
      })
      .catch(error => {
        console.log(error);
        // handle the error
        res.status(500).json({
          errorMessage: 'sorry, we ran into an error removing the hub',
        });
      });
  });

//update a Hub

const port = 8000;
server.listen(port, () => console.log(`\n ** api on port: ${port} ** \n`));