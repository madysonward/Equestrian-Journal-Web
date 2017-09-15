$(function(){
	$.extend(WorkoutLog, {
		//Sign Up Method:
		signup: function(){
			//Username, Password, & DOB variables:
			var username = $("#su_username").val();
			var password = $("#su_password").val();
		//	var dob = $("#su_DOB").val();
			//User object:
			var user = {
				user: {
					username: username,
					password: password,
				//	dob: dob
				}
			};
			//Sign Up post:
			var signup = $.ajax({
				type: "POST",
				url: WorkoutLog.API_BASE + "user",
				data: JSON.stringify(user),
				contentType: "application/json"
			});
			//Sign Up done/fail:
			signup.done(function(data){
				if (data.sessionToken){
					WorkoutLog.setAuthHeader(data.sessionToken);
					WorkoutLog.definition.fetchAll();
					WorkoutLog.log.fetchAll();
					
				//	console.log("You made it!");
				//	console.log(data.sessionToken);
				}
				$("#signup-modal").modal("hide");
				$(".disabled").removeClass("disabled");
				$(".hidden").removeClass("hidden");
				$(".tab1").show();
				$("#loginout").text("Logout");
				$("#defineTab").text("Define Workouts");
				$("#logTab").text("Log Your Workout");
				$("#historyTab").text("View History");				
				//go to define tab
				$('.nav-tabs a[href="#define"]').tab("show");

				$('a[href="#define"]').tab("show");
				$("#su_username").val("");
				$("#su_password").val("");
				$("#su_DOB").val("");
			})
			.fail(function(){
				$("#su_error").text("There was an issue with sign up").show();
			});
		},
		//Login Method:
		login: function(){
			//Login variables:
			var username = $("#li_username").val();
			var password = $("#li_password").val();
			var user = { user: {
				username: username,
				password: password
			}};

			//Login POST:
			var login = $.ajax({
				type: "POST",
				url: WorkoutLog.API_BASE + "login",
				data: JSON.stringify(user),
				contentType: "application/json"
			});

			//Login done/fail:
			login.done(function(data){
				if (data.sessionToken){
					WorkoutLog.setAuthHeader(data.sessionToken);
					WorkoutLog.definition.fetchAll();
					WorkoutLog.log.fetchAll();
				}
				$("#login-modal").modal("hide");
				$(".disabled").removeClass("disabled");
				$(".hidden").removeClass("hidden");
				$(".tab1").show();
				$("#loginout").text("Logout");
				$("#defineTab").text("Define Workouts");
				$("#logTab").text("Log Your Workout");
				$("#historyTab").text("View History");		
				$("#li_username").val("");
				$("#li_password").val("");
				$('a[href="#define"]').tab("show");
			})
			.fail(function(){
				$("#li_error").text("There was an issue with your username or password.").show();
			});

		},

		//Loginout Method:
		loginout: function(){
			if (window.localStorage.getItem("sessionToken")){
				window.localStorage.removeItem("sessionToken");
			}
			$(".tab1").hide().addClass("disabled");
		}


		
	});

	//Sign Up & Login Modal Bind Events
	$("#signup-modal").on("shown.bs.modal", function(){
		$("#su_username").focus();
	});
	//-------
	$("#login-modal").on("shown.bs.modal", function(){
		$("#li_username").focus();
	});


	//Other Bind Events:
	$("#login").on("click", WorkoutLog.login);
	$("#signup").on("click", WorkoutLog.signup);
	$("#loginout").on("click", WorkoutLog.loginout);

	if (window.localStorage.getItem("sessionToken")){
		$("#loginout").text("Logout");
	}
});