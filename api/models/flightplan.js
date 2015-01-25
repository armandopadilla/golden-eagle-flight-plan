module.exports = {
		
	identify : "flightplan",
	connection: "localDB",
	tableName : "flightplans",
	
	attributes : {
		
		id: {
			type: "integer",
			autoincrement : true,
			primaryKey : true
		},
		
		revision : {
			type: "integer",
			required : true,
			size : 5
		}
		
	}
		
}