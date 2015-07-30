/*DiceResults = new Mongo.Collection('dice');

if (Meteor.isServer) {
	Meteor.publish("dice",function(){
	});
	
    
    Meteor.methods({
	    "diceRoll": function()
	    {
	    var num=[];
    	for(var i =0; i<DiceResults.find().count; i++){
    	num = Math.floor(Math.random() * DiceResults.find().count);
    	console.log("server side", num);
    }
	    }
    });
};*/