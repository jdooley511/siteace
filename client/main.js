
/*
* Routing
*/
Router.configure({
  layoutTemplate: 'ApplicationLayout'
});

Router.route('/', function () {
  this.render('navbar', {
    to:"navbar"
  });
  this.render('websites', {
    to:"main"
  });
});

Router.route('/websites', function () {
  this.render('navbar', {
    to:"navbar"
  });
  this.render('websites', {
    to:"main"
  });
});

Router.route('/websites/:_id', function () {
  this.render('navbar', {
    to:"navbar"
  });
  this.render('website_detail', {
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
  websites: function() {
    var websites = Websites.find()/*.sort({"upvotes":1})*/;
    return websites;
  }
});

Template.website_detail.helpers({
  websites: function() {
    var websites = Websites.find()/*.sort({"upvotes":1})*/;
    return websites;
  }
});

Template.website_form.helpers({
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


Template.websites.helpers({  	
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
    
});

Template.body.helpers({
  username:function(){
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

Template.website_item.events({
	"click .js-upvote":function(event){		
		var website_id = this._id;
		// put the code in here to add a vote to a website!
		Websites.update(
      {_id:website_id}, 
      {$inc: {"upvotes":1}}
    );

		return false;// prevent the button from reloading the page
	}, 
	"click .js-downvote":function(event){

		// example of how you can access the id for the website in the database
		// (this is the data context for the template)
		var website_id = this._id;

		// put the code in here to remove a vote from a website!
    Websites.update(
      {_id:website_id}, 
      {$inc: {"downvotes":1}}
    );

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
    var desc = event.target.description.value;
    var date = new Date();
    var title = event.target.title.value;
		
		if (Meteor.user()){
      Websites.insert({
        title:title, 
        createdOn:date, 
        description:desc,
        url:url,
        createdBy:Meteor.user()._id
      });
    }
    $("#website_form").hide('slow');
		return false;// stop the form submit from reloading the page

	}
});



Template.website_detail.events({
  "submit .js-save-comment-form":function(event) {
    var comment = event.target.comment.value;
    alert(comment);
    console.log(this);
    
    /*if (Meteor.user()){
      Websites.update(
        {_id:},
        {$set:{}}
        );
    }*/
    return false;
  }
});
