
/*
* Routing
*/
Router.configure({
  layoutTemplate: 'ApplicationLayout'
});

Router.route('/', function () {
  this.render('welcome', {
    to:"main"
  });
});

Router.route('/websites', function () {
  this.render('navbar', {
    to:"navbar"
  });
  this.render('website_form', {
    to:"main"
  });
});

Router.route('/website/:_id', function () {
  this.render('navbar', {
    to:"navbar"
  });
  this.render('website', {
    to:"main", 
    data:function(){
      return Websites.findOne({_id:this.params._id});
    }
  });
});

Accounts.ui.config({
	passwordSignupFields: "USERNAME_AND_EMAIL"
});

/////
// template helpers 
/////

// helper function that returns all available websites
Template.website_list.helpers({
	websites:function(){
		return Websites.find({});
	},
	filtering_websites:function(){
  if (Session.get("userFilter")){// they set a filter!
    return true;
  } 
  else {
    return false;
  }
},
getFilterUser:function(){
  if (Session.get("userFilter")){// they set a filter!
    var user = Meteor.users.findOne(
      {_id:Session.get("userFilter")});
    return user.username;
  } 
  else {
    return false;
  }
},
getUser:function(user_id){
  var user = Meteor.users.findOne({_id:user_id});
  if (user){
    return user.username;
  }
  else {
    return "anon";
  }
}
});

Template.body.helpers({username:function(){
if (Meteor.user()){
  return Meteor.user().username;
    //return Meteor.user().emails[0].address;
}
else {
  return "anonymous internet user";
}
}
});


/////
// template events 
/////

Template.website.events({
	"click .js-upvote":function(event){		
		var website_id = this._id;
		console.log("Up voting website with id "+website_id);
		// put the code in here to add a vote to a website!
		Websites.update({_id:website_id}, 
                {$set: {rating:rating}});

		return false;// prevent the button from reloading the page
	}, 
	"click .js-downvote":function(event){

		// example of how you can access the id for the website in the database
		// (this is the data context for the template)
		var website_id = this._id;
		console.log("Down voting website with id "+website_id);

		// put the code in here to remove a vote from a website!

		return false;// prevent the button from reloading the page
	}
})

Template.website_form.events({
	"click .js-toggle-website-form":function(event){
		$("#website_form").toggle('slow');
	}, 
	"submit .js-save-website-form":function(event){

		// here is an example of how to get the url out of the form:
		var url = event.target.url.value;
		console.log("The url they entered is: "+url);
		
		//  put your website saving code in here!	

		return false;// stop the form submit from reloading the page

	}
});