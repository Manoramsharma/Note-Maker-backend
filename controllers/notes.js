const client = require("../configs/db");

exports.addNote = (req, res) => {
  const { heading, content } = req.body;
  client
    .query(
      `INSERT INTO notes (email, heading, content) VALUES ('${req.email}', '${heading}' , '${content}');`
    )
    .then((data) => {
      res.status(200).json({
        message: "yoo !! Note added successfully",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({
        message: "DB error occured",
      });
    });
};

exports.getAllNotes = (req, res) => {
  client
    .query(`SELECT * FROM notes WHERE email = '${req.email}'`)
    .then((data) => {
      const noteData = data.rows;
      const filteredData = noteData.map((value) => {
        return {
          noteId: value.noteid,
          heading: value.heading,
          content: value.content,
        };
      });
      res.status(200).json({
        message: "These r ur notes",
        data: filteredData,
      });
    })
    .catch((err) => {
      console.log(erro);
      res.status(400).json({
        message: "DB error occured",
      });
    });
};

exports.updateNote = (req, res) => {
  const noteId = req.noteId;
  const { heading, content } = req.body;
  client
    .query(
      `UPDATE notes SET heading='${heading}' , content='${content}' WHERE noteid='${noteId}'`
    )
    .then((data) => {
      res.status(200).json({
        message: "Success",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({
        message: "DB error occured",
      });
    });
};


exports.deleteNote = (req, res) => {
  const noteId = req.noteId;
  
  client
    .query(
      `DELETE FROM notes  WHERE noteid='${noteId}'`
    )
    .then((data) => {
      res.status(200).json({
        message: " Note deleted ",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({
        message: "DB error occured",
      });
    });
};
