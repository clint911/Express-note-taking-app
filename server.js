//npm install express
//npm install nodemon to avoid having to quit and restart the server after making a few changes 
//npm install ejs to use the embeded javascript templating engine 
const { contents } = require("cherio/lib/api/traversing");
const express = require("express");
const app = express();
const database = require("./database");

app.set("View engine", "ejs");
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res)=> {
	res.render("index.ejs", {
  numberOfIterations: 50
	})
})
// const notes = [
// 	{
// 		id: 1,
// 	title: "my first Note",
// 	timestamp: Date.now(),
// 	contacts :
// 	"Fucking dummy amateur text should go here"
// 	},
// 	{
// 	Id: 2,
// 	title:"My Second Note",
// 	timestamp: Date.now(),
// 	contents: "Another paragraph full of dummy text that I was too lazy to copy, just assume it was a paragraph or if it bothers you much, You can as well search for lorem ipsum generators and do the job your own fucking self!"
// 	}
// ]

app.get("/notes", (req, res) => {
	const notes = database.getNotes()
	res.render("notes.ejs"), {
		notes,
	}
})

app.get("/notes/:id", (req, res) => {
	const id = +req.params.id
	const note = notes.find(note => note.id === id)
	if(!note) {
		res.status(404).render("note404.ejs")
		return 
	}
	
	res.render("notes.ejs", {
		note,
	});
})

app.get("/createNote", (req, res) => {
	res.render("createNote.ejs");
})
 
app.post("/notes", (req, res) => {
	const searchTerm = req.query.searchTerm;
	const data = req.body;
	database.addNote(data);


	res.redirect("/notes");
})

app.post("/notes/:id/delete", (req, res)=>{
	const id = +req.params.id;
	database.deleteNote(id)
	res.redirect("/notes")
});


app.use(express.static("public"));

const port = 8080;
app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);

})

