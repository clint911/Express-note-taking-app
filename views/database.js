const notes = [
	{
		id: 1,
	title: "my first Note",
	timestamp: Date.now(),
	contacts :
	"Fucking dummy amateur text should go here"
	},
	{
	Id: 2,
	title:"My Second Note",
	timestamp: Date.now(),
	contents: "Another paragraph full of dummy text that I was too lazy to copy, just assume it was a paragraph or if it bothers you much, You can as well search for lorem ipsum generators and do the job your own fucking self!"
	}
]
let currentId = 3;

function getNotes(searchTerm) {
    if(!searchTerm) {
        return notes;
    }
   return notes.filter(note => note.title.includes(searchTerm) || note.contents.includes(searchTerm));
   
}
exports.getNotes = getNotes 

function getNote(id) {
    return notes.find(note) => note.id === id);
}
exports.getNote = getNote 

function addNote(note) {
    notes.push({
        ...note,
        id: currentId,
        timestamp: Date.now()
    });
    currentId++;
}
exports.addNote = addNote 

function deleteNote(id) {
notes = notes.filter((note) => note.id !== id);
}
exports.deleteNote = deleteNote








