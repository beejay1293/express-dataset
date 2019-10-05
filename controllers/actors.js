var db  = require('../db/index');



var getAllActors = (req, res) => {
    db.all(`SELECT     
		actor_id,
		actor_login,
		actor_avatar_url FROM events GROUP BY actor_id ORDER BY COUNT('actor_id')`, 
		(err, rows) => {
		    if(err){
				return res.status(400).json({
						status: 400
				})
		    }else {
			    return res.status(200).json({
						status: 200,
						data: rows
			    })
		    }
		}
    )
};

var updateActor = (req, res) => {
	const { id, login, avatar_url } = req.body;

	db.run(`UPDATE events SET actor_avatar_url = '${avatar_url}' WHERE actor_id = '${id}' AND  actor_login = '${login}';`, 
	    (err, rows) => {
			if(err){
				return res.status(400).json({
					status: 400
				})
			} else {
				return res.status(200).json({
					status: 200
				})
			}
		}
	)
};

var getStreak = (req, res) => {
	db.all(`select max(actor_id) as actor_id, actor_login, actor_avatar_url, count(*) as streak
	       from (select t1.actor_id, t1.actor_login, t1.actor_avatar_url
		   ,date(t1.created_at,-(select count(*) from events t2 where t2.created_at<=t1.created_at)||' day') as grp
		   from events t1
		   ) events 
		   group by grp `,
		  (err, rows) => {		  
		  if(err){
			return res.status(400).json({
				status: 400
			})
		} else {
			return res.status(200).json({
				 status: 200,
				 data: rows
			})
		}
	}
	
	
	)

};


module.exports = {
	updateActor: updateActor,
	getAllActors: getAllActors,
	getStreak: getStreak
};

















