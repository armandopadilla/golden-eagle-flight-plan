/***
 * User unit test
 * 
 * To run: mocha test/unit/bootstrap.test.js test/unit/models/User.test.js
 */
var should = require("should");

//Start Suite.
describe("UserModel", function(){
	
	
	//Test Case #1
	describe("There is a user with the username jdoe1 and a user with the username jdoe2.", function(){
		
		it("should verify jdoe1 is present", function(done){
			
			user.findOne({"username" : "jdoe1"}).then(function(userResp){
				
				userResp.should.have.property("username");
				userResp.username.should.equal("jdoe1");
				
				done();
				
			}).catch(done);
			
		})
		
		it("should verify jdoe2 is present", function(done){
		
			user.findOne({"username" : "jdoe2"}).then(function(userResp){
				
				userResp.should.have.property("username");
				userResp.username.should.equal("jdoe2");
				
				done();
				
			}).catch(done);
			
		});
		
	});
	
	
	//Test Case #2
	describe("Check jdoe1 checked one checkpoint in plan.", function(){
		
		it("should verify jdoe1 checked one checkpoint in his plan.", function(done){
			
			user.findOne({"username" : "jdoe1"}).populateAll().then(function(resp){
				
				//Fetch the checkpoints.
				var flightplanId = resp.flightplan.id;
			
				//fetch all checkpoints which are checked. Should be 1
				checkpoint.find({"flightplan" : flightplanId, "status" : "checked"}).then(function(checkpoints){
					
					checkpoints.should.have.lengthOf(1);
					done();
					
				});	
				
			});
			
		});
		
	});
	
	
	//Test Case #3
	describe("Check jdoe2 checked all checkpoints in plan.", function(){
		
		it("should verify jdoe2 checked all the checkpoints in his/her plan.", function(done){
			
			user.findOne({"username" : "jdoe2"}).populateAll().then(function(resp){
				
				//Fetch the checkpoints.
				var flightplanId = resp.flightplan.id;
			
				//fetch all checkpoints which are checked. Should be all
				checkpoint.find({"flightplan" : flightplanId, "status" : "checked"}).then(function(checkpoints){
					
					checkpoints.should.have.lengthOf(7);
					done();
					
				});	
				
			});
		});
		
	});
	
	//Test #4 - Test Authentication
	describe("Check Authentication - valid and invalid logins.", function(){
		
		it("should check for correct login", function(done){
			
			//
			
		});
		
		it("should check for bad login", function(done){
			
			//
			
		})
		
	})
	
});