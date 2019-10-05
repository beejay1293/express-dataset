var sqlite3 = require('sqlite3').verbose();

// open database in memory
let db = new sqlite3.Database(__dirname+'/express-dataset.db', (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the express-dataset SQlite database.');
  });

  db.serialize(() => {
  
  db.run(`CREATE TABLE IF NOT EXISTS events (
    id         INT        PRIMARY KEY,
    type       CHAR (200),
    actor_id      INT       ,
    actor_login ,
    actor_avatar_url,
    repo_id,
    repo_name,
    repo_url,
    created_at DATE
  ) WITHOUT ROWID`
  )



  })


 

  module.exports = db