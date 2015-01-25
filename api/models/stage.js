module.exports  = {
		
	identity : "stage",
	connection: "localDB",
	tableName : "stages",
	
	attributes : {
		
		id: {
			type: "integer",
			autoincrement : true,
			primaryKey : true
		},
	
		name: {
			type: "string",
			required: true,
			unique : true,
			size : 200
		}
			
	}
		
}