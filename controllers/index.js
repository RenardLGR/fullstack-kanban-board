const Task = require('../models/Task.js')

module.exports = {
    getKanban: async (req, res) => {
        try {
            // const tasks = await Task.find().sort().lean();
            // const tasksNotStarted = tasks.filter(t => t.status === "Not Started")
            // res.render("kanban.ejs", {title: {title: "it works"}});
            // res.render("kanban.ejs", { tasksNotStarted: {title : "It works"}, controllerWorks: {title : "It works"}});
            res.render("kanban.ejs", {controllerWorks: "Controller works"});
          } catch (err) {
            console.log(err);
          }
    },

    postItem: async (req, res) => {
        try{
            const newTask = await Task.create({description: req.body.description, status: req.body.status})
            console.log('Task has been added!')
            res.json(newTask)
        }catch(err){
            console.log(err)
        }
    },
}