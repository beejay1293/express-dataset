var db  = require('../db/index');
var moment = require('moment');

var getAllEvents = (req, res) => {
	db.all(`SELECT id,
	type,
	actor_id,
	actor_login,
	actor_avatar_url,
	repo_id,
	repo_name,
	repo_url,
	created_at
	FROM events ORDER BY id ASC;`,
	    (err, rows) => {
			if (err) {
				return res.status(400).json({
						status: 400
				})
			}
				return res.status(200).json({
						status: 200,
						data: rows.map(row => {
							return {
								"id": row.id,
								"type": row.type,
								"actor": {
									"id": row.actor_id,
									"login": row.actor_login,
									"avatar_url": row.actor_avatar_url
								},
								"repo": {
									"id": row.repo_id,
									"name": row.repo_name,
									"url": row.repo_url
								},
								"created_at": row.created_at
							}
						})
				})
		}
	);
};

var addEvent = (req, res) => {
	const { type, id, actor, repo } = req.body
	const time = req.body.created_at || moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
	
	db.run(`
	    INSERT INTO events (
		id,
		type,
		actor_id,
		actor_login,
		actor_avatar_url,
		repo_id,
		repo_name,
		repo_url,
		created_at
	    )
	    VALUES (
		'${id}',
		'${type}',
		'${actor.id}',
		'${actor.login}',
		'${actor.avatar_url}',
		'${repo.id}',
		'${repo.name}',
		'${repo.url}',
		'${time}'
	    ); returning *`,
	    (err, rows) => {
			if (err) {
				return res.status(400).json({
						status: 400,
						error: err.message
				})
			} else {
				return res.status(201).json({
					status: 201,
					data: rows
				}) 
			}
	    }
    );   
};


var getByActor = (req, res) => {
    const { actorId } = req.params;

	db.all(`
	    SELECT     
		type,
		actor_id,
		actor_login,
		actor_avatar_url,
		repo_id,
		repo_name,
		repo_url,
		created_at FROM events WHERE actor_id = ${actorId}`, 
		(err, rows) => {	
			if(err){
				return res.status(400).json({
						status: 400
				})
			}else {
				if(rows.length === 0){
					return res.status(404).json({
						status: 404,
						message: "not found"
					})
				}
				return res.status(200).json({
						status: 200,
						data: rows.map(row => {
							return {
								"id": row.id,
								"type": row.type,
								"actor": {
									"id": row.actor_id,
									"login": row.actor_login,
									"avatar_url": row.actor_avatar_url
								},
								"repo": {
									"id": row.repo_id,
									"name": row.repo_name,
									"url": row.repo_url
								},
								"created_at": row.created_at
							}
						})
				})
			}
		}
	)
};


var eraseEvents = (req, res) => {
	db.run(`DELETE FROM events;`,
		(err, rows) => {
			if (err) {
				return res.status(400).json({
				status: 400,
				})
			} else {
				return res.status(200).json({
				status: 200,
				}) 
			}
		}
	)
};

module.exports = {
	getAllEvents: getAllEvents,
	addEvent: addEvent,
	getByActor: getByActor,
	eraseEvents: eraseEvents
};

















