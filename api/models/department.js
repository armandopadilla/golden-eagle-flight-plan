module.exports = {
	
	identity : "department",
	connection : "localDB",
	tableName: "departments",
	
	attributes: {
		
		id: {
			type: "integer",
			autoincrement : true,
			primaryKey : true
		},
		
		name : {
			type: "string",
			unique: true,
			required : true
		},
		
		//Associates department with a flight plan.
		//A department must have a flight plan.
		flightplan : {
			model : "flightplan",
			required: true
		}
		
	}
}	
