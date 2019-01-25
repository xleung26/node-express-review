const list = {
    Todos: []
  }

module.exports = {

  get: (req, res) => {
    console.log('IN GET');
    const { listName } = req.query;
    if (list[listName]) {
      res.status(200).send(list[listName]);
    } else {
      res.status(404).send('List not found');
    }
  },
  
  post: (req, res) => { //req.body is usually with post
    console.log('IN POST');
    const {todo, listName} = req.body;
    if (!list[listName]){
      list[listName] = [];
    }
    list[listName].push(todo);
    res.status(201).send('SUCCESS IN POST');
  },

  delete: (req, res) => {
    console.log('IN DELETE');
    const { index, listName } = req.query;
    list[listName].splice(index, 1);
    res.status(202).send('Success in DELETE');
  },

}