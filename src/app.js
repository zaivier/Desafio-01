const express = require("express");
const cors = require("cors");
// const { uuid } = require('uuid');
const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());


/*
{ id: "uuid", title: 'Desafio Node.js', url: 'http://github.com/...', techs: ["Node.js", "..."], likes: 0 };
*/
const repositories = [];

app.post("/repositories", (request, response) => {

  const { title, url, techs } = request.body;

  const rep = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  };

  repositories.push(rep);

  return response.status(201).json(rep);
});

app.get("/repositories", (request, response) => {

  return response.json(repositories);
});



app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  
  const rep = repositories.find(f => f.id === id);
  const repIndex = repositories.findIndex(f => f.id === id);

  if (repositories[repIndex] == null) {
    return response.status(400).json({ error: "Repositories not found" });
  }


  const updateRep = {
    id: rep.id,
    title,
    url,
    techs,
    likes: rep.likes
  };

  repositories[repIndex] = updateRep;

  return response.json(updateRep);

});

app.delete("/repositories/:id", (request, response) => {

  const { id } = request.params;

  const repIndex = repositories.findIndex(f => f.id == id);
  if(repIndex < 0){
    return response.status(400).json({error:"Repositories not found"});
  }
  repositories.splice(repIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repIndex = repositories.findIndex(f => f.id == id);
  if (repIndex < 0) {
    return response.status(400).json({ error: "Repositories not found" });
  }
  repositories[repIndex].likes++;

  return response.status(200).json({likes: repositories[repIndex].likes});
});

module.exports = app;
