/*
 * @date : 10/25/2015
 * @author : Srinivas Thungathurti
 * @description : Modified for ASQ Upgrade 2.0 changes for Sprint 1 (Registration and Login requirements).
 */
var app = angular.module('quizApp', ['ngRoute', 'highcharts-ng','toggle-switch','timer','ui.bootstrap']);

//Added by Srinivas Thungathurti for ASQ Upgrade2.0 for adding calendar fields on register/profile/updateUserInfo screens.
app.controller('DatepickerCtrl', function ($scope) {
	  	  $scope.today = function() {
		    $scope.dt = new Date();
		  };
		  $scope.today();

		  $scope.clear = function () {
		    $scope.dt = null;
		  };

		  // Disable weekend selection
		  $scope.disabled = function(date, mode) {
		    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
		  };

		  $scope.toggleMin = function() {
		    $scope.minDate = new Date(1947, 5, 22);
		  };
		  $scope.toggleMin();
		  $scope.maxDate = new Date(2050, 5, 22);

		  $scope.open = function($event) {
		    $scope.status.opened = true;
		  };

		  $scope.setDate = function(year, month, day) {
		    $scope.dt = new Date(year, month, day);
		  };

		  $scope.dateOptions = {
		    formatYear: 'yy',
		    startingDay: 1
		  };

		  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy','mm/dd/yyyy', 'shortDate'];
		  $scope.format = $scope.formats[0];

		  $scope.status = {
		    opened: false
		  };
		  
		  var tomorrow = new Date();
		  tomorrow.setDate(tomorrow.getDate() + 1);
		  var afterTomorrow = new Date();
		  afterTomorrow.setDate(tomorrow.getDate() + 2);
		  $scope.events =
		    [
		      {
		        date: tomorrow,
		        status: 'full'
		      },
		      {
		        date: afterTomorrow,
		        status: 'partially'
		      }
		    ];

		  $scope.getDayClass = function(date, mode) {
		    if (mode === 'day') {
		      var dayToCheck = new Date(date).setHours(0,0,0,0);

		      for (var i=0;i<$scope.events.length;i++){
		        var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

		        if (dayToCheck === currentDay) {
		          return $scope.events[i].status;
		        }
		      }
		    }

		    return '';
		  };
});

app.controller('indexCtrl', function($scope, ObserverService, $location, $anchorScroll) {
	$scope.gototop = function() {
		$location.hash('top');
		$anchorScroll();
	};
	$scope.$on('timer-stopped', function () {
		console.log('notify');
		ObserverService.notify('timeUp','timer');
	});
});

app.controller('registerCtrl', function($scope, $location, $rootScope, $http) {
	$scope.error = false;
	$scope.checkEmail = false;
	//Added by Srinivas Thungathurti for ASQ Upgrade 2.0.
	$scope.passwordErr = false;
    $scope.usernameErr = false;
    $scope.passwordShort = false;
	$scope.states = [
	                 {
	                     "name": "Alabama",
	                     "abbreviation": "AL"
	                 },
	                 {
	                     "name": "Alaska",
	                     "abbreviation": "AK"
	                 },
	                 {
	                     "name": "Arizona",
	                     "abbreviation": "AZ"
	                 },
	                 {
	                     "name": "Arkansas",
	                     "abbreviation": "AR"
	                 },
	                 {
	                     "name": "California",
	                     "abbreviation": "CA"
	                 },
	                 {
	                     "name": "Colorado",
	                     "abbreviation": "CO"
	                 },
	                 {
	                     "name": "Connecticut",
	                     "abbreviation": "CT"
	                 },
	                 {
	                     "name": "Delaware",
	                     "abbreviation": "DE"
	                 },
	                 {
	                     "name": "District Of Columbia",
	                     "abbreviation": "DC"
	                 },
	                 {
	                     "name": "Florida",
	                     "abbreviation": "FL"
	                 },
	                 {
	                     "name": "Georgia",
	                     "abbreviation": "GA"
	                 },
	                 {
	                     "name": "Hawaii",
	                     "abbreviation": "HI"
	                 },
	                 {
	                     "name": "Idaho",
	                     "abbreviation": "ID"
	                 },
	                 {
	                     "name": "Illinois",
	                     "abbreviation": "IL"
	                 },
	                 {
	                     "name": "Indiana",
	                     "abbreviation": "IN"
	                 },
	                 {
	                     "name": "Iowa",
	                     "abbreviation": "IA"
	                 },
	                 {
	                     "name": "Kansas",
	                     "abbreviation": "KS"
	                 },
	                 {
	                     "name": "Kentucky",
	                     "abbreviation": "KY"
	                 },
	                 {
	                     "name": "Louisiana",
	                     "abbreviation": "LA"
	                 },
	                 {
	                     "name": "Maine",
	                     "abbreviation": "ME"
	                 },
	                 {
	                     "name": "Maryland",
	                     "abbreviation": "MD"
	                 },
	                 {
	                     "name": "Massachusetts",
	                     "abbreviation": "MA"
	                 },
	                 {
	                     "name": "Michigan",
	                     "abbreviation": "MI"
	                 },
	                 {
	                     "name": "Minnesota",
	                     "abbreviation": "MN"
	                 },
	                 {
	                     "name": "Mississippi",
	                     "abbreviation": "MS"
	                 },
	                 {
	                     "name": "Missouri",
	                     "abbreviation": "MO"
	                 },
	                 {
	                     "name": "Montana",
	                     "abbreviation": "MT"
	                 },
	                 {
	                     "name": "Nebraska",
	                     "abbreviation": "NE"
	                 },
	                 {
	                     "name": "Nevada",
	                     "abbreviation": "NV"
	                 },
	                 {
	                     "name": "New Hampshire",
	                     "abbreviation": "NH"
	                 },
	                 {
	                     "name": "New Jersey",
	                     "abbreviation": "NJ"
	                 },
	                 {
	                     "name": "New Mexico",
	                     "abbreviation": "NM"
	                 },
	                 {
	                     "name": "New York",
	                     "abbreviation": "NY"
	                 },
	                 {
	                     "name": "North Carolina",
	                     "abbreviation": "NC"
	                 },
	                 {
	                     "name": "North Dakota",
	                     "abbreviation": "ND"
	                 },
	                 {
	                     "name": "Ohio",
	                     "abbreviation": "OH"
	                 },
	                 {
	                     "name": "Oklahoma",
	                     "abbreviation": "OK"
	                 },
	                 {
	                     "name": "Oregon",
	                     "abbreviation": "OR"
	                 },
	                 {
	                     "name": "Pennsylvania",
	                     "abbreviation": "PA"
	                 },
	                 {
	                     "name": "Rhode Island",
	                     "abbreviation": "RI"
	                 },
	                 {
	                     "name": "South Carolina",
	                     "abbreviation": "SC"
	                 },
	                 {
	                     "name": "South Dakota",
	                     "abbreviation": "SD"
	                 },
	                 {
	                     "name": "Tennessee",
	                     "abbreviation": "TN"
	                 },
	                 {
	                     "name": "Texas",
	                     "abbreviation": "TX"
	                 },
	                 {
	                     "name": "Utah",
	                     "abbreviation": "UT"
	                 },
	                 {
	                     "name": "Vermont",
	                     "abbreviation": "VT"
	                 },
	                 {
	                     "name": "Virginia",
	                     "abbreviation": "VA"
	                 },
	                 {
	                     "name": "Washington",
	                     "abbreviation": "WA"
	                 },
	                 {
	                     "name": "West Virginia",
	                     "abbreviation": "WV"
	                 },
	                 {
	                     "name": "Wisconsin",
	                     "abbreviation": "WI"
	                 },
	                 {
	                     "name": "Wyoming",
	                     "abbreviation": "WY"
	                 }
	               ];

	//Updated by Srinivas Thungathurti for newly added registration field information for ASQ Upgrade 2.0.
	$scope.user = {
		email:'',
		firstName:'',
		lastName:'',
		passwd1:'',
		passwd2:'',
		address1:'',
		city:'',
		state:'',
		zipcode:'',
		role:'',
		activeIn:'',
		expiryDate:'',
		subscriber:'',
		birthDate:''
		
	};

	$scope.verify = function () {

		if ($scope.user.passwd1 !== $scope.user.passwd2) {
			$scope.error = true;
			$scope.myClass = "has-error";
		}
		else {
			$scope.error = false;
			$scope.myClass = "";
		}

	};
	
	//Added by Srinivas Thungathurti for ASQ Upgrade2.0. This will clear the registration form fields.
	$scope.clear = function () {
        if(confirm("Are you sure to clear the form?")) { 
        	$scope.user = {}
        	$scope.selectedState = "";
        }
    };
    
    //Added by Srinivas Thungathurti for ASQ Upgrade2.0.Added Frontend validations for Registration fields.
    
    //listen to keypress on first and last name input boxes.
    $('#fName, #lName').keypress(function(key) {
        //prevent user from input non-letter chars.
        if((key.charCode < 97 || key.charCode > 122) && (key.charCode < 65 || key.charCode > 90)
            && ($.inArray(key.charCode, [0, 8, 16, 20, 45, 46]))) {
            //show a tooltip to let user know why the keystroke is not working.
            $('[data-toggle="tooltip"]').tooltip('show');
            return false;
        } else {
            $('[data-toggle="tooltip"]').tooltip('hide');
        }
    });
    
    //Updated for ASQ Upgrade2.0 issue#4 (Github Issues Tab).Fixed zipcode field for not showing error message when zipcode not selected.
    $('#zip').keypress(function(key) {
    	var re = /^(\d{5}-\d{4}|\d{5})$/;
    	if(((key.charCode < 48 && key.charCode != 45) || key.charCode > 57) && ($.inArray(key.charCode, [0, 8, 16, 20, 46]))) {
	            //show a tooltip to let user know why the keystroke is not working.
	    		$('[data-toggle="tooltip2"]').tooltip('show');
	            return false;
	    } else {
	        	$('[data-toggle="tooltip2"]').tooltip('hide');
	        	if($scope.user.zipcode != "") {
	        		$scope.zipCodeErr = !re.test($scope.user.zipcode);
	        	} else {
	        		$scope.zipCodeErr = false;
	        	}
	    }
    });
    
    $('#city').keypress(function(key) {
        //prevent user from input non-letter chars.
    	//Updated below logic for ASQ Upgrade 2.0 Issue#3 (Github Issues Tab) .Consider Space as valid option for city input.
        if(((key.charCode < 97 && key.charCode != 32) || key.charCode > 122) && (key.charCode < 65 || key.charCode > 90)
            && ($.inArray(key.charCode, [0, 8, 16, 20, 45, 46]))) {
            //show a tooltip to let user know why the keystroke is not working.
            $('[data-toggle="tooltip3"]').tooltip('show');
            return false;
        } else {
            $('[data-toggle="tooltip3"]').tooltip('hide');
        }
    });
    

   //regex to test the email pattern, gets invoked after the blur event of email input.
    $scope.testUsername = function () {
        var re = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if($scope.user.email != "") {
           $scope.usernameErr = !re.test($scope.user.email);
        } else {
           $scope.usernameErr = false;
        }
    };
    
    $scope.testBirthDate = function () {
        var re = /^(0?[1-9]|1[012])[\/](0?[1-9]|[12][0-9]|3[01])[\/]\d{4}$/;
        $scope.birthDateErr = !re.test($scope.user.birthDate);
        console.log($scope.user.birthDate);
    };

    //test on the length of first password.
    $scope.testPassword = function () {
        $scope.passwordShort = $scope.user.passwd1.length <= 5
    };

    //test if both passwords match.
    $scope.testPassword2 = function () {
        $scope.passwordErr = ($scope.user.passwd1 != $scope.user.passwd2);
    };
    //End changes for ASQ Upgrade2.0.

	$scope.test = function(obj) {
		//Updated by Srinivas Thungathurti for ASQ Upgrade 2.0.Email validation expression changed to correct validation.
		var re=/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
		// /^\w+@[a-z0-9]+\.[a-z]+$/i;
		if(re.test(obj)) {
			$scope.checkEmail = false;
			$scope.error = false;
		}
		else {
			$scope.checkEmail = true;
			$scope.error = true;
		}
	};

	//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	//Updated by Srinivas Thungathurti for ASQ Upgrade 2.0.Additional registration fields added for Validation.
	$scope.register = function (user){
		
		var currentDate = new moment();
		var expDate = moment(currentDate.add(3,'months')).format('MM/DD/YYYY');
		
		if ($scope.user.email == "" || $scope.user.firstName == "" || $scope.user.lastName == "" || $scope.user.passwd1 == "" || $scope.user.passwd2 == "" || $scope.user.address1 == "" || $scope.user.city == "" || $scope.user.state.name == "" || $scope.user.zipcode == "" || $scope.user.birthDate == "" || $scope.user.birthDate == undefined) {
			alert("We need your complete personal information! Please fill in all the blanks.");
		}
		else {
			$scope.user.state = $scope.user.state.name;
			$scope.user.password = $scope.user.passwd1;
			$scope.user.expiryDate = expDate;
			$scope.user.role = "user";
			$scope.user.activeIn = "Y";
			$scope.user.subscriber = "No";
			$scope.user.state = $scope.selectedState;
			$scope.user.birthDate = moment($scope.user.birthDate).format('MM/DD/YYYY');

			$http.post('/register', user).success(function (response) {
				if (response != "0") {
					alert("Success! Please login with your registered email \"" + user.email + "\" and password you created.");
					$rootScope.currentUser = response;					
					$location.path('/login');
				} else {
					alert("Sorry, the account \"" + user.email + "\" has already been registered! Please create a new one.")
				}
			})
		}
	};
});

app.controller('loginCtrl', function ($scope, $rootScope, $http, $routeParams, $location) {
	$scope.login = function (user){
		$http.post('/login', user).success(function (response){
			console.log(response);
			$rootScope.currentUser = response;
			$location.url('/home');
		}).error(function (err) {
			if(err == "Unauthorized") {
				alert("Email or password does not match! Please login again.");
			} else if(err != "Bad Request") {
				alert("User account expired in ASQ Exam Portal."+"\n"+"      	    Please contact administrator.");
			} else {
				alert("Please enter Username or Password.");
			}
		})
	};
	
	//Test on the length of first password.
    $scope.testPasswordLen = function () {
        $scope.passwordShort = $scope.user.password1.length <= 5
    };
    
	//Test if both passwords match.
    $scope.testPassword = function () {
    	if($scope.user.password2 != "") {
           $scope.passwordErr = ($scope.user.password1 != $scope.user.password2);
    	}
    };
    
    //Validate the email entered is valid.
    $scope.testLoginName = function () {
        var re = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if($scope.user.email != "") {
           $scope.loginEmailErr = !re.test($scope.user.email);
        } else {
           $scope.loginEmailErr = false;
        }
    };

    //test on the length of the password entered.
    $scope.testPassword = function () {
        $scope.passwordShort = $scope.user.password.length <= 5
    };
    //End changes for ASQ Upgrade2.0.
    
    if($scope.email == undefined) $scope.disable = true;

	$scope.testEmail = function() {
		var re = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		if($scope.email == undefined || $scope.email == "") {
			$scope.emailErr = false;
			$scope.disable = true;
		}
		else {
			$scope.emailErr = !re.test($scope.email);
			if($scope.emailErr == true) $scope.disable = true;
			else $scope.disable = false;
		}
	};
	
	//Added for ASQ Upgrade2.0 for adding Forgot Password Functionality.
	$scope.forgot = function (emailID){
		var postData = {
			email: emailID
		}
		$http.post('/forgot', postData).success(function (response){
			console.log(response);
			alert("Please check the registered email for instructions.");
			$location.url('/login');
		}).error(function (err) {
			if(err = "NotFound" ) {
				alert("Email ID not registered in ASQ Portal.");
			}
		})
	};
	
	$scope.pwReset = function (user){
		var postData = {
				password: user.password1,
				token: $routeParams.token
		}
		$http.post('/reset', postData).success(function (response){
			console.log(response);
			alert("Password Updated Successfully.");
			$location.url('/login');
		}).error(function (err) {
			if(err) {
				alert("Error while updating password.Please try again!.");
			}
		})
	};

	$scope.pressEnter = function (e,user) {
		if (e.keyCode == 13){
			$scope.login(user);
		}
	};
});

app.controller('homeCtrl', function ($q, $scope, $rootScope, $http, $location, $interval) {

	$rootScope.wrong = 0;
	$rootScope.report = {type:'',wrong:[]};
	$scope.exam = function (){
		$rootScope.submited = false;
		$http.get('/quiz').success(function (response) {
			$rootScope.questions = response;			
			$location.path('/exam/0');
		});
	};
	
	//Added by Srinivas Thungathurti for ASQ Upgrade 2.0.Get the all available certifications on the application.
	$scope.getCerts = function (){
		$scope.wrong = true;
		$http.post('/getCerts','').success(function (response) {
			$scope.certifications = response;
		  if ($scope.certifications[0] != undefined) {
			console.log(response);
			$location.url('/examInfoList');
		  }else {
			alert("No Certification found.");
		  }
		}).error(function (err) {
			alert("Error!");
			console.log(err);
		})
	};
	
	$scope.getValue = function(value) {
		if(value == "CSQE") { 
			$scope.wrong = false;
		} else {
			$scope.wrong = true;
		}
		$scope.selectedValue = value;
    }
	//End changes for ASQ Upgrade2.0.
	

	$scope.logout = function () {
		$http.post('/logout',$rootScope.user).success(function () {
			$location.url('/');
			$rootScope.currentUser = undefined;
			$rootScope.user = undefined;
		})
	};

});

//Updated by Srinivas Thungathurti for ASQ Upgrade 2.0
app.controller('profileCtrl', function ($q, $scope, $rootScope, $http, $location) {	
	$scope.firstName = $rootScope.currentUser.firstName;
	$scope.states = [
	                 {
	                     "name": "Alabama",
	                     "abbreviation": "AL"
	                 },
	                 {
	                     "name": "Alaska",
	                     "abbreviation": "AK"
	                 },
	                 {
	                     "name": "Arizona",
	                     "abbreviation": "AZ"
	                 },
	                 {
	                     "name": "Arkansas",
	                     "abbreviation": "AR"
	                 },
	                 {
	                     "name": "California",
	                     "abbreviation": "CA"
	                 },
	                 {
	                     "name": "Colorado",
	                     "abbreviation": "CO"
	                 },
	                 {
	                     "name": "Connecticut",
	                     "abbreviation": "CT"
	                 },
	                 {
	                     "name": "Delaware",
	                     "abbreviation": "DE"
	                 },
	                 {
	                     "name": "District Of Columbia",
	                     "abbreviation": "DC"
	                 },
	                 {
	                     "name": "Florida",
	                     "abbreviation": "FL"
	                 },
	                 {
	                     "name": "Georgia",
	                     "abbreviation": "GA"
	                 },
	                 {
	                     "name": "Hawaii",
	                     "abbreviation": "HI"
	                 },
	                 {
	                     "name": "Idaho",
	                     "abbreviation": "ID"
	                 },
	                 {
	                     "name": "Illinois",
	                     "abbreviation": "IL"
	                 },
	                 {
	                     "name": "Indiana",
	                     "abbreviation": "IN"
	                 },
	                 {
	                     "name": "Iowa",
	                     "abbreviation": "IA"
	                 },
	                 {
	                     "name": "Kansas",
	                     "abbreviation": "KS"
	                 },
	                 {
	                     "name": "Kentucky",
	                     "abbreviation": "KY"
	                 },
	                 {
	                     "name": "Louisiana",
	                     "abbreviation": "LA"
	                 },
	                 {
	                     "name": "Maine",
	                     "abbreviation": "ME"
	                 },
	                 {
	                     "name": "Maryland",
	                     "abbreviation": "MD"
	                 },
	                 {
	                     "name": "Massachusetts",
	                     "abbreviation": "MA"
	                 },
	                 {
	                     "name": "Michigan",
	                     "abbreviation": "MI"
	                 },
	                 {
	                     "name": "Minnesota",
	                     "abbreviation": "MN"
	                 },
	                 {
	                     "name": "Mississippi",
	                     "abbreviation": "MS"
	                 },
	                 {
	                     "name": "Missouri",
	                     "abbreviation": "MO"
	                 },
	                 {
	                     "name": "Montana",
	                     "abbreviation": "MT"
	                 },
	                 {
	                     "name": "Nebraska",
	                     "abbreviation": "NE"
	                 },
	                 {
	                     "name": "Nevada",
	                     "abbreviation": "NV"
	                 },
	                 {
	                     "name": "New Hampshire",
	                     "abbreviation": "NH"
	                 },
	                 {
	                     "name": "New Jersey",
	                     "abbreviation": "NJ"
	                 },
	                 {
	                     "name": "New Mexico",
	                     "abbreviation": "NM"
	                 },
	                 {
	                     "name": "New York",
	                     "abbreviation": "NY"
	                 },
	                 {
	                     "name": "North Carolina",
	                     "abbreviation": "NC"
	                 },
	                 {
	                     "name": "North Dakota",
	                     "abbreviation": "ND"
	                 },
	                 {
	                     "name": "Ohio",
	                     "abbreviation": "OH"
	                 },
	                 {
	                     "name": "Oklahoma",
	                     "abbreviation": "OK"
	                 },
	                 {
	                     "name": "Oregon",
	                     "abbreviation": "OR"
	                 },
	                 {
	                     "name": "Pennsylvania",
	                     "abbreviation": "PA"
	                 },
	                 {
	                     "name": "Rhode Island",
	                     "abbreviation": "RI"
	                 },
	                 {
	                     "name": "South Carolina",
	                     "abbreviation": "SC"
	                 },
	                 {
	                     "name": "South Dakota",
	                     "abbreviation": "SD"
	                 },
	                 {
	                     "name": "Tennessee",
	                     "abbreviation": "TN"
	                 },
	                 {
	                     "name": "Texas",
	                     "abbreviation": "TX"
	                 },
	                 {
	                     "name": "Utah",
	                     "abbreviation": "UT"
	                 },
	                 {
	                     "name": "Vermont",
	                     "abbreviation": "VT"
	                 },
	                 {
	                     "name": "Virginia",
	                     "abbreviation": "VA"
	                 },
	                 {
	                     "name": "Washington",
	                     "abbreviation": "WA"
	                 },
	                 {
	                     "name": "West Virginia",
	                     "abbreviation": "WV"
	                 },
	                 {
	                     "name": "Wisconsin",
	                     "abbreviation": "WI"
	                 },
	                 {
	                     "name": "Wyoming",
	                     "abbreviation": "WY"
	                 }
	               ];
	
	$scope.selectedState = $rootScope.currentUser.state;
	$scope.logout = function () {
		$http.post('/logout',$rootScope.user).success(function () {
			$location.url('/');
			$rootScope.currentUser = undefined;
			$rootScope.user = undefined;
		})
	};
	//Updated Password validation as the current behavior is asking user to fill in the New/Repeated Password while updating profile.
	$scope.save = function (currentUser) {
		
	   if ($scope.currentUser.firstName == "" || $scope.currentUser.lastName == "" || $scope.currentUser.address1 == "" || $scope.currentUser.city == "" || $scope.selectedState == "" || $scope.currentUser.zipcode == "" || $scope.currentUser.birthDate == "") {
			alert("Please fill in all the blanks!");
		}
		else {
			var postData = {
				email: currentUser.email,
				firstName: currentUser.firstName,
				lastName: currentUser.lastName,
				address1: currentUser.address1,
				address2: currentUser.address2,
				city: currentUser.city,
				state: $scope.selectedState,
				zipcode: currentUser.zipcode,
				birthDate:moment(currentUser.birthDate).format("MM/DD/YYYY")
			};
		}
		$http.post('/updateProfile', postData).success(function (response) {
			if (response == 'success'){
				$scope.firstName = postData.firstName;
				console.log("Update "+response);
				alert('Success!');
				$location.url('/home');
			} else if (response == 'error') {
				alert('error')
			}
		})
	};

	// Delete the below code for ASQ Upgrade 2.0.
	/*
	$scope.wrong = false;
	$scope.errorClass = "";
	$scope.checkPasswd = function () {

		if ($scope.currentUser.passwd1 !== $scope.currentUser.passwd2) {
			$scope.wrong = true;
			$scope.errorClass = "has-error";
		}
		else {
			$scope.wrong = false;
			$scope.errorClass = "";
		}

	}; */

});

//Added by Srinivas Thungathurti for ASQ Upgrade 2.0.New screen Change Password added to application.
app.controller('changePwdCtrl', function ($q,$scope, $rootScope, $http, $location) {
	
	$scope.currentUser.oldPassword = "";
	$scope.currentUser.password2 = "";
	$scope.firstName = $rootScope.currentUser.firstName;
	$scope.lastName = $rootScope.currentUser.lastName;
	
	$scope.logout = function () {
		$http.post('/logout',$rootScope.user).success(function () {
			$location.url('/');
			$rootScope.currentUser = undefined;
			$rootScope.user = undefined;
		})
	};
	
	$scope.pwSave = function (currentUser) {
        var postData = {
            email: $rootScope.currentUser.email,
            oldPassword: currentUser.oldPassword,
            password2: currentUser.password2
        };
        
        $http.post('/changePasswd', postData).success(function (response) {
            if (response == 'success'){
                alert ('Password Updated Successfully!');
                $scope.currentUser=response;
                alert("Please connect the ASQ appliation using New Password.");
                $scope.logout();
            } else if (response == 'incorrect') {
                alert ('Old Password is not correct!');
                $scope.currentUser={};
                $location.url('/changePassword')
            } else if (response == 'error'){
                alert ('Error!')
                $scope.currentUser={};
            }
        })
    };
    
    $scope.wrong = false;
	$scope.errorClass = "";
	$scope.checkPasswd = function () {

		if ($scope.currentUser.password1 !== $scope.currentUser.password2) {
			$scope.wrong = true;
			$scope.passwdErr = true;
		}
		else {
			$scope.wrong = false;
			$scope.passwdErr = false;
		}

	};
	
	//test on the length of first password.
    $scope.testPass = function () {
        $scope.passwordSh = $scope.currentUser.password1.length <= 5
    };
});
//End changes for ASQ Upgrade 2.0.

//Added by Srinivas Thungathurti for ASQ Upgrade 2.0.New Admin screen added to application.
app.controller('adminCtrl', function ($q, $scope, $rootScope, $http, $location) {
	$scope.selectedValue = "";
	$scope.currentPage = 1;
	$scope.numPerPage = 10;
	$scope.maxSize = 5;
	var begin = (($scope.currentPage - 1) * $scope.numPerPage)
    , end = begin + $scope.numPerPage;
	$scope.searchQuestions = function (currentUser){
		$scope.searchCat = currentUser.searchCat;
		$scope.count = 20;
		$scope.partialQuestions = [];
		$scope.allQuestions = [];
		if(currentUser.searchCat == undefined) {
			$scope.searchCat = $rootScope.searchCat;
		}
		var postData = { 
			category : $scope.searchCat,
			count : $scope.count
		};
		$http.post('/getQuestions',postData).success(function (response){
			$scope.questionsList = response;
			for(i=0;i<=$scope.questionsList.length-1;i++) {
				$scope.allQuestions.push($scope.questionsList[i]);
			}
			$scope.partialQuestions = $scope.allQuestions.slice(begin, end);			
			$location.url('/questionInfo');
		}).error(function (err) {
			alert("Error!");
			console.log(err);
		})
	};
	
	$scope.$watch('currentPage + numPerPage', function() {
	    begin = (($scope.currentPage - 1) * $scope.numPerPage);
	    end = begin + $scope.numPerPage;
	    $scope.partialQuestions = $scope.allQuestions.slice(begin, end);
	  });
	
	//Added for ASQ Upgrade2.0.Add the new question information to ASQ Database (Feature available only for Admin Users).
	//Modified below code for Issue#5 (add question functionality is not working as expected).
	$scope.addQuestion = function (){
		var splitChoice = $scope.addQueChoice.split("\n");
		var formatChoice = angular.toJson(splitChoice);
		formatChoice = formatChoice.replace('"A:',' "A" : "');
		formatChoice = formatChoice.replace('"B:',' "B" : "');
		formatChoice = formatChoice.replace('"C:',' "C" : "');
		formatChoice = formatChoice.replace('"D:',' "D" : "');
		formatChoice = formatChoice.replace('[','{ ');
		formatChoice = formatChoice.replace(']',' }');
		var postData = { 
			category : $scope.addQueCat,
			content : $scope.addQueContent,
			//choices : JSON.parse($scope.addQueChoice),
			choices : JSON.parse(formatChoice),
			correctChoice : $scope.addQueCorChoice
		};
		$http.post('/addQuestionDet',postData).success(function (response){
			if (response != 0){
			alert('Success!');
			$location.url('/questionInfo');
			} else if (response == 'error') {
			alert('error')
			}
		}).error(function (err) {
			alert("Error!");
			console.log(err);
		})
	};
	
	$scope.editQuestion = function (question){
		$scope.searchCat = question.category;
		var postData = { 
			category : question.category,
			content : question.content,
			choice : question.choices,
			correctChoice : question.correctChoice
		};
		$http.post('/getQuestionInfo',postData).success(function (response){
		    $rootScope.searchCat = question.category;
			$rootScope.content = postData.content;
			$rootScope.choice = "A:"+postData.choice.A+"\nB:"+postData.choice.B+"\nC:"+postData.choice.C+"\nD:"+postData.choice.D;
			//$rootScope.choice = JSON.stringify(postData.choice);
			$rootScope.correctChoice = postData.correctChoice;
			$rootScope.questionID = question._id;
			$location.url('/updateQuestionInfo');
		}).error(function (err) {
			alert("Error!");
			console.log(err);
		})
	};
	
	//Added for ASQ Upgrade2.0.Edit and Save the selected question from/to ASQ Database (Feature available only for Admin Users).
	$scope.saveQuestion = function (){
		var splitChoice = $scope.choice.split("\n");
		var formatChoice = angular.toJson(splitChoice);
		formatChoice = formatChoice.replace('"A:',' "A" : "');
		formatChoice = formatChoice.replace('"B:',' "B" : "');
		formatChoice = formatChoice.replace('"C:',' "C" : "');
		formatChoice = formatChoice.replace('"D:',' "D" : "');
		formatChoice = formatChoice.replace('[','{ ');
		formatChoice = formatChoice.replace(']',' }');
		var postData = { 
			_id : $rootScope.questionID,
			category : $rootScope.searchCat,
			content : $scope.content,
			choices : formatChoice, //$scope.choice.split("\n"),
			correctCh : $scope.correctChoice
		};
		$http.post('/updateQuestionDet',postData).success(function (response){
			if (response == 'success'){
			alert('Success!');
			$location.url('/questionInfo');
			} else if (response == 'error') {
			alert('error')
			}
		}).error(function (err) {
			alert("Error!");
			console.log(err);
		})
	};
	
	//Added for ASQ Upgrade2.0.Delete the selected question from ASQ Database (Feature available only for Admin Users).
	$scope.deleteQuestion = function (){
		var postData = { 
			_id : $rootScope.questionID,
			category : $scope.searchCat
	};
	  if(confirm('Are you sure you want you delete this question?')) {
		$http.post('/deleteQuestionDet',postData).success(function (response){
		if (response == 'success'){
			alert('Success!');
			$location.url('/questionInfo');
		} else if (response == 'error') {
			alert('error')
		}
		}).error(function (err) {
			alert("Error!");
			console.log(err);
		})
	  }
	};
	
	//Added for ASQ Upgrade2.0.Exam Management Screen Flow methods.
	$scope.addCertification = function (){
		var postData = { 
			name : $scope.name,
			description : $scope.description
		};
		$http.post('/addCertDet',postData).success(function (response){
			if (response != 0){
			alert('Success!');
			$scope.name = undefined;
			$scope.description = undefined;
			$scope.getCerts();
			$location.url('/examInfo');
			} else if (response == 'error') {
			alert('error')
			}
		}).error(function (err) {
			alert("Error!");
			console.log(err);
		})
	};
	
	$scope.getCerts = function (){
		$http.post('/getCerts','').success(function (response) {
			$scope.certifications = response;
		  if ($scope.certifications[0] != undefined) {
			console.log(response);
			$location.url('/examInfo');
		  }else {
			alert("No Certification found.");
		  }
		}).error(function (err) {
			alert("Error!");
			console.log(err);
		})
	};
	
	$scope.getValue = function(value) {
		$scope.selectedValue = value;
		$scope.wrong = false;
    }
	
	//Added for ASQ Upgrade2.0.Exam Management Screen Flow methods.
	$scope.removeCert = function (){
		var postData = { 
			_id : $scope.selectedValue
		};
		if(confirm('Are you sure you want you delete this certification?')) {
		$http.post('/delCertDet',postData).success(function (response){
			if (response == "success"){
				alert('Success!');
				$scope.selectedValue = "";
				$scope.getCerts();
				$scope.wrong = true;
				$location.url('/examInfo');
			} else if (response == 'error') {
				alert('error');
				console.log("ERROR::");
			}
		}).error(function (err) {
			alert("Error!");
			console.log(err);
		})
		}
	};
	
	$scope.wrong = false;
	$scope.errorClass = "";
	if($scope.currentUser.searchCat == undefined) $scope.wrong = true;
	if($scope.selectedValue == "" || $scope.selectedValue == undefined) $scope.wrong = true;
	
	$scope.disableSearch = function () {
		if ($scope.currentUser.searchCat == "Select" || $scope.currentUser.searchCat == "") {
			$scope.wrong = true;
			$scope.errorClass = "has-error";
		}
		else {
			$scope.wrong = false;
			$scope.errorClass = "";
		}

	};
	$scope.addQueChoiceErr = false;
	//test on the format of Question choices on admin add question page.
    $scope.testQueChoice = function () {
    	if(!($scope.addQueChoice.contains("A:") && $scope.addQueChoice.contains("B:") && $scope.addQueChoice.contains("C:") && $scope.addQueChoice.contains("D:"))) {
    		$scope.addQueChoiceErr = true;
    		alert("NOTE:Please enter the choices using below format.\n\t\t A:answer1 \n\t\t B:answer2 \n\t\t C:answer3 \n\t\t D:answer4");
    	}
    };
  //test on the format of Question choices on admin update question page.
    $scope.testChoice = function () {
    	if(!($scope.choice.contains("A:") && $scope.choice.contains("B:") && $scope.choice.contains("C:") && $scope.choice.contains("D:"))) {
    		$scope.choiceErr = true;
    		alert("NOTE:Please enter the choices using below format.\n\t\t A:answer1 \n\t\t B:answer2 \n\t\t C:answer3 \n\t\t D:answer4");
    	}
    };
    
	$scope.logout = function () {
		$http.post('/logout',$rootScope.user).success(function () {
			$location.url('/');
			$rootScope.currentUser = undefined;
			$scope.user = undefined;
		})
	};

	$scope.pressEnter = function (e,user) {
		if (e.keyCode == 13){
			$scope.admin(user);
		}
	};
});

//Added by Srinivas Thungathurti for ASQ Upgrade 2.0.New User Information screen added to application.
app.controller('usersCtrl', function ($q,$scope, $rootScope, $http, $location) {
	
	$scope.currentPage = 1;
	$scope.numPerPage = 10;
	$scope.maxSize = 5;
	var begin = (($scope.currentPage - 1) * $scope.numPerPage)
    , end = begin + $scope.numPerPage;
	
	$scope.search = function (user){
		if($scope.user != undefined) {
		var postData ={
				email: $scope.user.search
		};
		} else {
			var postData ={
			};
		}
		$http.post('/getUsers',postData).success(function (response) {
			$scope.partialUsers = [];
			$scope.allUsers = [];
			$scope.users = response;
			for(i=0;i<=$scope.users.length-1;i++) {
				$scope.allUsers.push($scope.users[i]);
			}
			$scope.partialUsers = $scope.allUsers.slice(begin, end);
		  if ($scope.users[0] != undefined) {			
			$location.url('/userInfo');
		  }else {
			console.log("No Users found for your Search.");
		  }
		}).error(function (err) {
			alert("Error!");
			console.log(err);
		})
	};
	
	$scope.$watch('currentPage + numPerPage', function() {
	    begin = (($scope.currentPage - 1) * $scope.numPerPage);
	    end = begin + $scope.numPerPage;
	    $scope.partialUsers = $scope.allUsers.slice(begin, end);
	  });
	//End Pagination changes here.
	
	$scope.states = [
	                 {
	                     "name": "Alabama",
	                     "abbreviation": "AL"
	                 },
	                 {
	                     "name": "Alaska",
	                     "abbreviation": "AK"
	                 },
	                 {
	                     "name": "Arizona",
	                     "abbreviation": "AZ"
	                 },
	                 {
	                     "name": "Arkansas",
	                     "abbreviation": "AR"
	                 },
	                 {
	                     "name": "California",
	                     "abbreviation": "CA"
	                 },
	                 {
	                     "name": "Colorado",
	                     "abbreviation": "CO"
	                 },
	                 {
	                     "name": "Connecticut",
	                     "abbreviation": "CT"
	                 },
	                 {
	                     "name": "Delaware",
	                     "abbreviation": "DE"
	                 },
	                 {
	                     "name": "District Of Columbia",
	                     "abbreviation": "DC"
	                 },
	                 {
	                     "name": "Florida",
	                     "abbreviation": "FL"
	                 },
	                 {
	                     "name": "Georgia",
	                     "abbreviation": "GA"
	                 },
	                 {
	                     "name": "Hawaii",
	                     "abbreviation": "HI"
	                 },
	                 {
	                     "name": "Idaho",
	                     "abbreviation": "ID"
	                 },
	                 {
	                     "name": "Illinois",
	                     "abbreviation": "IL"
	                 },
	                 {
	                     "name": "Indiana",
	                     "abbreviation": "IN"
	                 },
	                 {
	                     "name": "Iowa",
	                     "abbreviation": "IA"
	                 },
	                 {
	                     "name": "Kansas",
	                     "abbreviation": "KS"
	                 },
	                 {
	                     "name": "Kentucky",
	                     "abbreviation": "KY"
	                 },
	                 {
	                     "name": "Louisiana",
	                     "abbreviation": "LA"
	                 },
	                 {
	                     "name": "Maine",
	                     "abbreviation": "ME"
	                 },
	                 {
	                     "name": "Maryland",
	                     "abbreviation": "MD"
	                 },
	                 {
	                     "name": "Massachusetts",
	                     "abbreviation": "MA"
	                 },
	                 {
	                     "name": "Michigan",
	                     "abbreviation": "MI"
	                 },
	                 {
	                     "name": "Minnesota",
	                     "abbreviation": "MN"
	                 },
	                 {
	                     "name": "Mississippi",
	                     "abbreviation": "MS"
	                 },
	                 {
	                     "name": "Missouri",
	                     "abbreviation": "MO"
	                 },
	                 {
	                     "name": "Montana",
	                     "abbreviation": "MT"
	                 },
	                 {
	                     "name": "Nebraska",
	                     "abbreviation": "NE"
	                 },
	                 {
	                     "name": "Nevada",
	                     "abbreviation": "NV"
	                 },
	                 {
	                     "name": "New Hampshire",
	                     "abbreviation": "NH"
	                 },
	                 {
	                     "name": "New Jersey",
	                     "abbreviation": "NJ"
	                 },
	                 {
	                     "name": "New Mexico",
	                     "abbreviation": "NM"
	                 },
	                 {
	                     "name": "New York",
	                     "abbreviation": "NY"
	                 },
	                 {
	                     "name": "North Carolina",
	                     "abbreviation": "NC"
	                 },
	                 {
	                     "name": "North Dakota",
	                     "abbreviation": "ND"
	                 },
	                 {
	                     "name": "Ohio",
	                     "abbreviation": "OH"
	                 },
	                 {
	                     "name": "Oklahoma",
	                     "abbreviation": "OK"
	                 },
	                 {
	                     "name": "Oregon",
	                     "abbreviation": "OR"
	                 },
	                 {
	                     "name": "Pennsylvania",
	                     "abbreviation": "PA"
	                 },
	                 {
	                     "name": "Rhode Island",
	                     "abbreviation": "RI"
	                 },
	                 {
	                     "name": "South Carolina",
	                     "abbreviation": "SC"
	                 },
	                 {
	                     "name": "South Dakota",
	                     "abbreviation": "SD"
	                 },
	                 {
	                     "name": "Tennessee",
	                     "abbreviation": "TN"
	                 },
	                 {
	                     "name": "Texas",
	                     "abbreviation": "TX"
	                 },
	                 {
	                     "name": "Utah",
	                     "abbreviation": "UT"
	                 },
	                 {
	                     "name": "Vermont",
	                     "abbreviation": "VT"
	                 },
	                 {
	                     "name": "Virginia",
	                     "abbreviation": "VA"
	                 },
	                 {
	                     "name": "Washington",
	                     "abbreviation": "WA"
	                 },
	                 {
	                     "name": "West Virginia",
	                     "abbreviation": "WV"
	                 },
	                 {
	                     "name": "Wisconsin",
	                     "abbreviation": "WI"
	                 },
	                 {
	                     "name": "Wyoming",
	                     "abbreviation": "WY"
	                 }
	               ];
	
	$scope.edit = function (username){
		$scope.search = username;
		var postData ={
				search: $scope.search
		};
		$http.post('/getUserInfo',postData).success(function (response) {
			$rootScope.user = response;
			$scope.selectState = $rootScope.user.state;
			$location.url('/updateUserInfo');
		}).error(function (err) {
			alert("Error!");
			console.log(err);
		})
	};
	
	//Added by Srinivas Thungathurti for ASQ Upgrade2.0.saveUser function added to update the user profile information using Admin User Management screen.
	$scope.saveUser = function (user){
		if ($scope.user.firstName == "" || $scope.user.lastName == "" || $scope.user.address1 == "" || $scope.user.city == "" || $scope.selectedState == "" || $scope.user.zipcode == "" || $scope.user.birthDate == "") {
			alert("Please fill in all the blanks!");
		}
		else {
			var postData = {
				email: user.email,
				firstName: user.firstName,
				lastName: user.lastName,
				address1: user.address1,
				address2: user.address2,
				city: user.city,
				state: user.state,
				zipcode: user.zipcode,
				birthDate:moment(user.birthDate).format("MM/DD/YYYY"),
				expiryDate:moment(user.expiryDate).format("MM/DD/YYYY"),
				role:user.role,
				activeIn:user.activeIn,
				subscriber:user.subscriber
			};
		}
		$http.post('/saveUserProfile', postData).success(function (response) {
			if (response == 'success'){
				$scope.firstName = postData.firstName;
				console.log("Update "+response);
				alert('Success!');
				$location.url('/userInfo');
			} else if (response == 'error') {
				alert('error')
			}
		})
	};
	
	//Added by Srinivas Thungathurti for ASQ Upgrade2.0.del function added to delete the user profile information using Admin User Management screen.
	$scope.del = function (user){
		var postData ={
				email: $scope.user.email
		};
		if(confirm('Are you sure you want you delete this user?')) {
			$http.post('/deleteUserInfo',postData).success(function (response) {
				if (response == 'success'){
					alert("User deleted successfully.");
					console.log("User removed from application");
					$location.url('/userInfo');
				}
			}).error(function (err) {
				alert("Error!");
				console.log(err);
			})
		}
	};
	  
	$scope.logout = function () {
		$http.post('/logout',$rootScope.user).success(function () {
			$location.url('/');
			$rootScope.currentUser = undefined;
			$rootScope.user = undefined;
		})
	};

	$scope.pressEnter = function (e,user) {
		if (e.keyCode == 13){
			$scope.admin(user);
		}
	};
});

app.controller('aboutCtrl', function ($q, $scope, $rootScope, $http, $location) {
	$scope.logout = function () {
		$http.post('/logout',$rootScope.user).success(function () {
			$location.url('/');
			$rootScope.currentUser = undefined;
			$rootScope.user = undefined;
		})
	};

	$scope.mouseover1 = function () {
		var oDiv1=document.getElementById("harry");
		startMove(oDiv1, {opacity: 100});
	};
	$scope.mouseover2 = function () {
		var oDiv2=document.getElementById("jaime");
		startMove(oDiv2, {opacity: 100});
	};
	$scope.mouseover3 = function () {
		var oDiv3=document.getElementById("neeru");
		startMove(oDiv3, {opacity: 100});
	};
	$scope.mouseover4 = function () {
		var oDiv4=document.getElementById("nikitha");
		startMove(oDiv4, {opacity: 100});
	};

	function getStyle(obj, name) {
		if(obj.currentStyle) {
			return obj.currentStyle[name];
		}
		else {
			return getComputedStyle(obj, false)[name];
		}
	}

	function startMove(obj, json, fnEnd) {
		clearInterval(obj.timer);
		obj.timer=setInterval(function() {
			var bStop=true;

			for(var attr in json) {
				var cur=0;
				if(attr=="opacity") {
					cur=Math.round(parseFloat(getStyle(obj, attr))*100);
				}
				else {
					cur=parseInt(getStyle(obj, attr));
				}

				var speed=(json[attr]-cur)/8;
				speed=speed>0?Math.ceil(speed):Math.floor(speed);

				if(cur!=json[attr])
					bStop=false;

				if(attr=="opacity") {
					obj.style.filter="alpha(opacity:" + (cur+speed) + ")";
					obj.style.opacity=(cur+speed)/100;
				}
				else {
					obj.style[attr]=cur+speed+"px";
				}
			}

			if(bStop) {
				clearInterval(obj.timer);
				if(fnEnd) fnEnd();
			}
		}, 30)
	}
});

app.controller('examCtrl', function ($q, $scope, $rootScope, $http, $location, $routeParams, ObserverService,$timeout) {
	$rootScope.questionDistribution = undefined;
	$rootScope.wrong = 0;
	var div = document.getElementById('div1');

	$scope.choose = function (index,choice) {
		$rootScope.questions[index].answer = choice;
	};

	$scope.jump = function (index) {
		$location.url('/exam/' + index)
	};

	$scope.mouseover = function () {
		startMove(div,{left: 0}, function () {
			startMove(div,{opacity: 100, height: 475});
		});
	};

	$scope.mouseout = function () {
		startMove(div,{height: 60}, function() {
			startMove(div, {opacity: 50, left: -293});
		});
	};

	function getStyle(obj, name) {
		if(obj.currentStyle) {
			return obj.currentStyle[name];
		}
		else {
			return getComputedStyle(obj, false)[name];
		}
	}

	function startMove(obj, json, fnEnd) {
		clearInterval(obj.timer);
		obj.timer=setInterval(function() {
			var bStop=true;

			for(var attr in json) {
				var cur=0;
				if(attr=="opacity") {
					cur=Math.round(parseFloat(getStyle(obj, attr))*100);
				}
				else {
					cur=parseInt(getStyle(obj, attr));
				}

				var speed=(json[attr]-cur)/3;
				speed=speed>0?Math.ceil(speed):Math.floor(speed);

				if(cur!=json[attr])
					bStop=false;

				if(attr=="opacity") {
					obj.style.filter="alpha(opacity:" + (cur+speed) + ")";
					obj.style.opacity=(cur+speed)/100;
				}
				else {
					obj.style[attr]=cur+speed+"px";
				}
			}

			if(bStop) {
				clearInterval(obj.timer);
				if(fnEnd) fnEnd();
			}
		}, 30)
	}




	$rootScope.timer = true;
	$rootScope.report ={
		ep:0,
		gk:0,
		ma:0,
		pm:0,
		scm:0,
		sqm:0,
		svv:0,
		wrong:[]
	};
	$scope.index =Number($routeParams.id);
	$scope.previous = function(){
		$location.path('/exam/'+(Number($routeParams.id) - 1));
	};
	$scope.next = function(){
		$location.path('/exam/'+(Number($routeParams.id) + 1));
	};
	$scope.quit = function () {
		$rootScope.questions = [];
		$location.url('/home')
	};
	$scope.logout = function () {
		$http.post('/logout',$rootScope.user).success(function () {
			$location.url('/');
			$rootScope.currentUser = undefined;
			$rootScope.user = undefined;
		})
	};
	
	$scope.submit = function () {
		$rootScope.latest = Date.now();
		$rootScope.timer = false;
		$rootScope.submited = true;
		var epwrong = 0, gkwrong = 0, mawrong = 0, pmwrong = 0, scmwrong = 0, sqmwrong = 0, svvwrong = 0;
		var postData = {
			"email":$rootScope.currentUser.email,
			"mode": "Exam",
			date: $rootScope.latest,
			score: 0,
			epWrong: 0,
			gkWrong: 0,
			maWrong: 0,
			pmWrong: 0,
			scmWrong: 0,
			sqmWrong: 0,
			svvWrong: 0,
			epNumber: 11,
			gkNumber: 11,
			maNumber: 11,
			pmNumber: 11,
			scmNumber: 12,
			sqmNumber: 12,
			svvNumber: 12,
			total:80,
			report:{},
		    epScore: 0,
            gkScore: 0,
            maScore: 0,
            pmScore: 0,
            scmScore: 0,
            sqmScore: 0,
            svvScore: 0
		};
		$rootScope.questions.forEach(function (value, index, array) {
			if (value.answer != value.correctChoice){
				$rootScope.wrong ++;
				$rootScope.report.wrong.push(value);
				switch (value.category){
					case 'ep':
						epwrong ++;
						$rootScope.report.ep ++;
						break;
					case 'gk':
						gkwrong ++;
						$rootScope.report.gk ++;
						break;
					case 'mam':
						mawrong ++;
						$rootScope.report.ma ++;
						break;
					case 'pm':
						pmwrong ++;
						$rootScope.report.pm ++;
						break;
					case 'scm':
						scmwrong ++;
						$rootScope.report.scm ++;
						break;
					case 'sqm':
						sqmwrong ++;
						$rootScope.report.sqm ++;
						break;
					case 'SVV':
						svvwrong ++;
						$rootScope.report.svv ++;
						break;
				}

			}

			if (index == array.length - 1){
				postData.score = Math.round((1-($rootScope.wrong/80))*100);
				$rootScope.report.score = postData.score;
				$rootScope.report.epScore = Math.round((1-(epwrong/11))*100);
				$rootScope.report.gkScore = Math.round((1-(gkwrong/11))*100);
				$rootScope.report.maScore = Math.round((1-(mawrong/11))*100);
				$rootScope.report.pmScore = Math.round((1-(pmwrong/11))*100);
				$rootScope.report.scmScore = Math.round((1-(scmwrong/12))*100);
				$rootScope.report.sqmScore = Math.round((1-(sqmwrong/12))*100);
				$rootScope.report.svvScore = Math.round((1-(svvwrong/12))*100);
				postData.epWrong  = epwrong;
				postData.gkWrong  = gkwrong;
				postData.maWrong  = mawrong;
				postData.pmWrong  = pmwrong;
				postData.scmWrong = scmwrong;
				postData.sqmWrong = sqmwrong;
				postData.svvWrong = svvwrong;
				postData.report = $rootScope.report;
				//Added by Srinivas Thungathurti for Dynamic Chart to display on the View History screen.
				postData.epScore = $rootScope.report.epScore;
                postData.gkScore = $rootScope.report.gkScore;
                postData.maScore = $rootScope.report.maScore;
                postData.pmScore = $rootScope.report.pmScore;
                postData.scmScore = $rootScope.report.scmScore;
                postData.sqmScore = $rootScope.report.sqmScore;
                postData.svvScore = $rootScope.report.svvScore;
				$http.post('/saveRecord', postData).success(function () {
					$timeout(function () {
						$location.url('/report')
					},20);
				});
			}
		});
	};

	$scope.$on('$destroy', function () {
		$rootScope.timer = false;
	});

	ObserverService.detachByEventAndId('timeUp', 'exam');
	ObserverService.attach(function () {
		$scope.submit();
	}, 'timeUp', 'exam')
});

app.controller('practiseCtrl', function($scope, $routeParams, $http, $rootScope, $location, $timeout) {
	$scope.index =Number($routeParams.id);
	$rootScope.wrong = 0;
	$rootScope.report ={
		ep:0,
		gk:0,
		ma:0,
		pm:0,
		scm:0,
		sqm:0,
		svv:0,
		wrong:[]
	};

	$scope.choose = function (index,choice) {
		$rootScope.questions[index].answer = choice;
	};

	$scope.previous = function(){
		$location.path('/practise/'+(Number($routeParams.id) - 1));
		if ($scope.choice){
			$rootScope.questions[$scope.index].answer = $scope.choice;
		}

	};
	$scope.next = function(){
		$location.path('/practise/'+(Number($routeParams.id) + 1));
		if ($scope.choice){
			$rootScope.questions[$scope.index].answer = $scope.choice;
		}
	};
	$scope.quit = function () {
		$rootScope.questions = [];
		$location.url('/home')
	};
	$scope.logout = function () {
		$http.post('/logout',$rootScope.user).success(function () {
			$location.url('/');
			$rootScope.currentUser = undefined;
			$rootScope.user = undefined;
		})
	};
	$scope.submit = function () {
		$rootScope.submited = true;
		$rootScope.latest = Date.now();
		var epwrong = 0, gkwrong = 0, mawrong = 0, pmwrong = 0, scmwrong = 0, sqmwrong = 0, svvwrong = 0;
		var postData = {
			"email":$rootScope.currentUser.email,
			"mode": "Practice",
			date: $rootScope.latest,
			//Added by Srinivas Thungathurti for ASQ Upgrade2.0.Added time information for Dynamic Chart history.
			time: new Date(),
			category:"",
			score: 0,
			epWrong: 0,
			gkWrong: 0,
			maWrong: 0,
			pmWrong: 0,
			scmWrong: 0,
			sqmWrong: 0,
			svvWrong: 0,
			epNumber: 0,
			gkNumber: 0,
			maNumber: 0,
			pmNumber: 0,
			scmNumber: 0,
			sqmNumber: 0,
			svvNumber: 0,
			total:$rootScope.questionDistribution.total,
			report:{}
		};
		$rootScope.questions.forEach(function (value, index, array) {
			if (value.answer != value.correctChoice){
				$rootScope.wrong ++;
				$rootScope.report.wrong.push(value);
				switch (value.category){
					case 'ep':
						epwrong ++;
						$rootScope.report.ep ++;
						break;
					case 'gk':
						gkwrong ++;
						$rootScope.report.gk ++;
						break;
					case 'mam':
						mawrong ++;
						$rootScope.report.ma ++;
						break;
					case 'pm':
						pmwrong ++;
						$rootScope.report.pm ++;
						break;
					case 'scm':
						scmwrong ++;
						$rootScope.report.scm ++;
						break;
					case 'sqm':
						sqmwrong ++;
						$rootScope.report.sqm ++;
						break;
					case 'SVV':
						svvwrong ++;
						$rootScope.report.svv ++;
						break;
				}

			}

			if (index == array.length - 1){
				console.log($rootScope.questionDistribution.total);
				//Added by Srinivas Thungathurti for ASQ Upgrade2.0.Added Category for historyModels for Dynamic Chart in History.
				postData.category = value.category,
				postData.score = Math.round((1-($rootScope.wrong/$rootScope.questionDistribution.total))*100);
				$rootScope.report.score = postData.score;
				$rootScope.report.epScore = $rootScope.questionDistribution.data.EP?Math.round((1-(epwrong/$rootScope.questionDistribution.data.EP))*100):null;
				$rootScope.report.gkScore = $rootScope.questionDistribution.data.GK?Math.round((1-(gkwrong/$rootScope.questionDistribution.data.GK))*100):null;
				$rootScope.report.maScore = $rootScope.questionDistribution.data.MA?Math.round((1-(mawrong/$rootScope.questionDistribution.data.MA))*100):null;
				$rootScope.report.pmScore = $rootScope.questionDistribution.data.PM?Math.round((1-(pmwrong/$rootScope.questionDistribution.data.PM))*100):null;
				$rootScope.report.scmScore = $rootScope.questionDistribution.data.SCM?Math.round((1-(scmwrong/$rootScope.questionDistribution.data.SCM))*100):null;
				$rootScope.report.sqmScore = $rootScope.questionDistribution.data.SQM?Math.round((1-(sqmwrong/$rootScope.questionDistribution.data.SQM))*100):null;
				$rootScope.report.svvScore = $rootScope.questionDistribution.data.SVV?Math.round((1-(svvwrong/$rootScope.questionDistribution.data.SVV))*100):null;
				postData.epNumber  = $rootScope.questionDistribution.data.EP;
				postData.gkNumber  = $rootScope.questionDistribution.data.GK;
				postData.maNumber  = $rootScope.questionDistribution.data.MA;
				postData.pmNumber  = $rootScope.questionDistribution.data.PM;
				postData.scmNumber = $rootScope.questionDistribution.data.SCM;
				postData.sqmNumber = $rootScope.questionDistribution.data.SQM;
				postData.svvNumber = $rootScope.questionDistribution.data.SVV;
				postData.epWrong  = epwrong;
				postData.gkWrong  = gkwrong;
				postData.maWrong  = mawrong;
				postData.pmWrong  = pmwrong;
				postData.scmWrong = scmwrong;
				postData.sqmWrong = sqmwrong;
				postData.svvWrong = svvwrong;
				postData.report = $rootScope.report;
				$http.post('/saveRecord', postData).success(function () {
					 $timeout(function () {
					 $location.url('/report')
					 },20);
				});
			}
		});
	};

});

app.controller('practiseConfCtrl', function($q, $scope, $http, $rootScope, $location, ObserverService) {
	$scope.logout = function () {
		$http.post('/logout',$rootScope.user).success(function () {
			$location.url('/');
			$rootScope.currentUser = undefined;
			$rootScope.user = undefined;
		})
	};

	$rootScope.questions = [];
	$rootScope.report = {};
	$rootScope.report.wrong = [];
	$rootScope.wrong = 0;
	$rootScope.questionDistribution = {
		total : 0
	};
	$scope.GKValue = 5;
	$scope.EPValue = 5;
	$scope.MAValue = 5;
	$scope.PMValue = 5;
	$scope.SCMValue = 5;
	$scope.SQMValue = 5;
	$scope.SVVValue = 5;

	var postData = {};

	$scope.submit = function () {
		if ($scope.GK) {
			postData.GK = $scope.GKValue;
			$rootScope.questionDistribution.total += postData.GK
		}
		if ($scope.EP) {
			postData.EP = $scope.EPValue;
			$rootScope.questionDistribution.total += postData.EP
		}
		if ($scope.MA) {
			postData.MA = $scope.MAValue;
			$rootScope.questionDistribution.total += postData.MA
		}
		if ($scope.PM) {
			postData.PM = $scope.PMValue;
			$rootScope.questionDistribution.total += postData.PM
		}
		if ($scope.SCM) {
			postData.SCM = $scope.SCMValue;
			$rootScope.questionDistribution.total += postData.SCM
		}
		if ($scope.SQM) {
			postData.SQM = $scope.SQMValue;
			$rootScope.questionDistribution.total += postData.SQM
		}
		if ($scope.SVV) {
			postData.SVV = $scope.SVVValue;
			$rootScope.questionDistribution.total += postData.SVV
		}

		$rootScope.questionDistribution.data = postData;

		$http.post('/practise', postData).success(function (response) {
			$rootScope.questions = response;
			console.log("questions "+response);
			$location.url('practise/0')
		})
	}
});

app.controller('reportCtrl', function ($q, $scope, $rootScope, $http, $location) {

	$scope.showReview = false;
	$scope.logout = function () {
		$http.post('/logout',$rootScope.user).success(function () {
			$location.url('/');
			$rootScope.currentUser = undefined;
			$rootScope.user = undefined;
		})
	};
	
	var detailData = {
		email:$rootScope.currentUser.email,
		date: $rootScope.latest
	};
	$http.post('/getRecord',detailData).success(function (response) {
		$rootScope.historyDetail = response;
		$location.url('historyDetail/');

	});

	$scope.vis = true;
	$scope.invis = false;
	$scope.review = function () {
		$scope.showReview = true;
		$scope.vis = false;
		$scope.invis = true;
	};

	$scope.hide = function () {
		$scope.showReview = false;
		$scope.vis = true;
		$scope.invis = false;
	};

	$scope.cate = function (category) {
		var cate = "";
		switch(category)
		{
			case "ep":
				cate = "Software Engineering Processes";
				break;
			case "gk":
				cate = "Software Engineering Processes";
				break;
			case "mam":
				cate = "Software Metrics & Analysis";
				break;
			case "pm":
				cate = "Software Project Management";
				break;
			case "scm":
				cate = "Software Configuration Management";
				break;
			case "sqm":
				cate = "Software Quality Management";
				break;
			case "SVV":
				cate = "Software Verification & Validation";
				break;
			default:
				cate = "";
		}
		return cate;
	};

	//Added by Srinivas Thungathurti for ASQ Upgrade2.0.For integrating Dynamic Chart application part of ASQ Exam portal.
	function getData (postData,number){
        var deferred = $q.defer();
        if (number){
            postData.number = number
        }
        $http.post('/getRecordForChart', postData).success(function(response){
            deferred.resolve(response)
        });
        return deferred.promise
    }
	
	var quizPostData = {
	        email: $rootScope.currentUser.email,
	        mode:'Exam',
	        number: 3
	};

	var practisePostData = {
	        email: $rootScope.currentUser.email,
	        mode:'Practice',
	        number: 3
	};
	
	$scope.init = function (num){
		if(num > 3) $rootScope.numbers = num;
        quizPostData.number = $rootScope.numbers? $rootScope.numbers: 3;
        practisePostData.number = $rootScope.numbers? $rootScope.numbers: 3;
        $scope.quizChartConfig = {
            "options": {
                "chart": {
                    "type": "areaspline"
                },
                "plotOptions": {
                    "series": {
                        "stacking": ""
                    }
                }
            },
            xAxis: {
                categories: []
            },
            yAxis:{
                title:{text:"Score"},
                max: 100,
                min: 0
            },
            "series": [
                {
                    "name": "Overall Score",
                    "data": [],
                    "connectNulls": true,
                    "id": "series-1"
                },
                {
                    "name": "General Knowledge",
                    "data": [],
                    "type": "column",
                    "id": "series-2"
                },
                {
                    "name": "Software Quality Management",
                    "data": [],
                    "type": "column",
                    "id": "series-3"
                },
                {
                    "data": [],
                    "id": "series-4",
                    "name": "Engineering Process",
                    "type": "column",
                    "dashStyle": "Solid"
                },
                {
                    "data": [],
                    "id": "series-5",
                    "name": "Project Management",
                    "dashStyle": "Solid",
                    "type": "column"
                },
                {
                    "data": [],
                    "id": "series-6",
                    "type": "column",
                    "name": "Metrics & Analysis"
                },
                {
                    "data": [],
                    "id": "series-7",
                    "type": "column",
                    "name": "Software Verification & Validation"
                },
                {
                    "data": [],
                    "id": "series-8",
                    "type": "column",
                    "name": "Software Configuration Management"
                }
            ],
            "title": {
                "text": "Exam Mode Progression"
            },
            "credits": {
                "enabled": false
            },
            "loading": false,
            "size": {}
        };

        $scope.practiseChartConfig = {
            "options": {
                "chart": {
                    "type": "line"
                },
                "plotOptions": {
                    "series": {
                        "stacking": ""
                    }
                }
            },
            xAxis: {
                categories: []
            },
            yAxis:{
                title:{text:"Score"},
                max: 100,
                min: 0
            },
            "series": [
                {
                    "name": "Score",
                    "data": [],
                    "type": "spline",
                    "id": "series-3",
                    "dashStyle": "LongDash",
                    "connectNulls": false
                }
            ],
            "title": {
                "text": "Practise Mode Progression"
            },
            "credits": {
                "enabled": false
            },
            "loading": false,
            "size": {}
        };


        getData(practisePostData).then(function(data){
            data.forEach(function (value) {
                $scope.practiseChartConfig.xAxis.categories.unshift(value.time);
                $scope.practiseChartConfig.series[0].data.unshift(value.score)
            })

        });

        getData(quizPostData).then(function(data){
            data.forEach(function (value) {
                $scope.quizChartConfig.xAxis.categories.unshift(value.time);
                $scope.quizChartConfig.series[0].data.unshift(value.score);
                $scope.quizChartConfig.series[1].data.unshift(value.gkScore);
                $scope.quizChartConfig.series[2].data.unshift(value.sqmScore);
                $scope.quizChartConfig.series[3].data.unshift(value.epScore);
                $scope.quizChartConfig.series[4].data.unshift(value.pmScore);
                $scope.quizChartConfig.series[5].data.unshift(value.maScore);
                $scope.quizChartConfig.series[6].data.unshift(value.svvScore);
                $scope.quizChartConfig.series[7].data.unshift(value.scmScore);

            })
        });
    };

});

app.controller('historyCtrl', function ($q, $scope, $rootScope, $http, $location) {
	
	//Updated for ASQ Upgrade2.0 and added code for Pagination.
	$scope.currentPage = 1;
	$scope.numPerPage = 10;
	$scope.maxSize = 5;
	var begin = (($scope.currentPage - 1) * $scope.numPerPage)
    , end = begin + $scope.numPerPage;

	$scope.showReview = false;
	$scope.logout = function () {
		$http.post('/logout',$rootScope.user).success(function () {
			$location.url('/');
			$rootScope.currentUser = undefined;
			$rootScope.user = undefined;
		})
	};
	var postData ={
		email: $rootScope.currentUser.email
	};

	//Modified below code to add the Pagination for all the history records.
	$http.post('/getRecord',postData).success(function (response) {
		$scope.partialHistory = [];
		$scope.allHistory = [];
		$scope.histories = response;
		for(i=0;i<=$scope.histories.length-1;i++) {
			$scope.allHistory.push($scope.histories[i]);
		}
		$scope.partialHistory = $scope.allHistory.slice(begin, end);
		console.log(response);
	});
	
	$scope.$watch('currentPage + numPerPage', function() {
	    begin = (($scope.currentPage - 1) * $scope.numPerPage);
	    end = begin + $scope.numPerPage;
	    $scope.partialHistory = $scope.allHistory.slice(begin, end);
	  });
	//End Pagination changes here.
	
	$scope.detail = function (lol) {
		var detailData = {
			email:$rootScope.currentUser.email,
			date: lol
		};
		$http.post('/getRecord',detailData).success(function (response) {
			$rootScope.historyDetail = response;
			$location.url('historyDetail/');

		});
	};
	
	//Added this method to get the details related to practice/exam history progress details.
	$scope.detailProgress = function (histDate) {
		var detailProgressData = {
			email:$rootScope.currentUser.email,
			date: histDate
		};
		$http.post('/getRecord',detailProgressData).success(function (response) {
			$rootScope.historyProgressDetail = response;
			console.log("historyProgressDetail is "+$rootScope.historyProgressDetail);
			$location.url('historyDetailsStatus/');

		});
	};

	$scope.vis = true;
	$scope.invis = false;
	$scope.review = function () {
		$scope.showReview = true;
		$scope.vis = false;
		$scope.invis = true;
	};

	$scope.hide = function () {
		$scope.showReview = false;
		$scope.vis = true;
		$scope.invis = false;
	};

	$scope.cate = function (category) {
		var cate = "";
		switch(category)
		{
			case "ep":
				cate = "Software Engineering Processes";
				break;
			case "gk":
				cate = "Software Engineering Processes";
				break;
			case "mam":
				cate = "Software Metrics & Analysis";
				break;
			case "pm":
				cate = "Software Project Management";
				break;
			case "scm":
				cate = "Software Configuration Management";
				break;
			case "sqm":
				cate = "Software Quality Management";
				break;
			case "SVV":
				cate = "Software Verification & Validation";
				break;
			default:
				cate = "";
		}
		return cate;
	};

	//Added by Srinivas Thungathurti for ASQ Upgrade2.0.For integrating Dynamic Chart application part of ASQ Exam portal.
	function getData (postData,number){
        var deferred = $q.defer();
        if (number){
            postData.number = number
        }
        $http.post('/getRecordForChart', postData).success(function(response){
            deferred.resolve(response)
        });
        return deferred.promise
    }
	
	var quizPostData = {
	        email: $rootScope.currentUser.email,
	        mode:'Exam',
	        number: 3
	};

	var practisePostData = {
	        email: $rootScope.currentUser.email,
	        mode:'Practice',
	        number: 3
	};
	
	$scope.init = function (num){
		if(num > 3) $rootScope.numbers = num;
        quizPostData.number = $rootScope.numbers? $rootScope.numbers: 3;
        practisePostData.number = $rootScope.numbers? $rootScope.numbers: 3;
        $scope.quizChartConfig = {
            "options": {
                "chart": {
                    "type": "areaspline"
                },
                "plotOptions": {
                    "series": {
                        "stacking": ""
                    }
                }
            },
            xAxis: {
                categories: []
            },
            yAxis:{
                title:{text:"Score"},
                max: 100,
                min: 0
            },
            "series": [
                {
                    "name": "Overall Score",
                    "data": [],
                    "connectNulls": true,
                    "id": "series-1"
                },
                {
                    "name": "General Knowledge",
                    "data": [],
                    "type": "column",
                    "id": "series-2"
                },
                {
                    "name": "Software Quality Management",
                    "data": [],
                    "type": "column",
                    "id": "series-3"
                },
                {
                    "data": [],
                    "id": "series-4",
                    "name": "Engineering Process",
                    "type": "column",
                    "dashStyle": "Solid"
                },
                {
                    "data": [],
                    "id": "series-5",
                    "name": "Project Management",
                    "dashStyle": "Solid",
                    "type": "column"
                },
                {
                    "data": [],
                    "id": "series-6",
                    "type": "column",
                    "name": "Metrics & Analysis"
                },
                {
                    "data": [],
                    "id": "series-7",
                    "type": "column",
                    "name": "Software Verification & Validation"
                },
                {
                    "data": [],
                    "id": "series-8",
                    "type": "column",
                    "name": "Software Configuration Management"
                }
            ],
            "title": {
                "text": "Exam Mode Progression"
            },
            "credits": {
                "enabled": false
            },
            "loading": false,
            "size": {}
        };

        $scope.practiseChartConfig = {
            "options": {
                "chart": {
                    "type": "line"
                },
                "plotOptions": {
                    "series": {
                        "stacking": ""
                    }
                }
            },
            xAxis: {
                categories: []
            },
            yAxis:{
                title:{text:"Score"},
                max: 100,
                min: 0
            },
            "series": [
                {
                    "name": "Score",
                    "data": [],
                    "type": "spline",
                    "id": "series-3",
                    "dashStyle": "LongDash",
                    "connectNulls": false
                }
            ],
            "title": {
                "text": "Practise Mode Progression"
            },
            "credits": {
                "enabled": false
            },
            "loading": false,
            "size": {}
        };


        getData(practisePostData).then(function(data){
            data.forEach(function (value) {
                $scope.practiseChartConfig.xAxis.categories.unshift(value.time);
                $scope.practiseChartConfig.series[0].data.unshift(value.score)
            })

        });

        getData(quizPostData).then(function(data){
            data.forEach(function (value) {
                $scope.quizChartConfig.xAxis.categories.unshift(value.time);
                $scope.quizChartConfig.series[0].data.unshift(value.score);
                $scope.quizChartConfig.series[1].data.unshift(value.gkScore);
                $scope.quizChartConfig.series[2].data.unshift(value.sqmScore);
                $scope.quizChartConfig.series[3].data.unshift(value.epScore);
                $scope.quizChartConfig.series[4].data.unshift(value.pmScore);
                $scope.quizChartConfig.series[5].data.unshift(value.maScore);
                $scope.quizChartConfig.series[6].data.unshift(value.svvScore);
                $scope.quizChartConfig.series[7].data.unshift(value.scmScore);

            })
        });
    };
});

app.controller('navCtrl', function ($scope, $http, $location, $rootScope){
    $scope.logout = function () {
        $http.post('/logout',$rootScope.user).success(function () {
            $location.url('/');
            $rootScope.currentUser = undefined;
            $rootScope.user = undefined;
        })
    }
});

app.config(function ($routeProvider, $httpProvider, $locationProvider) {
	var checkLoggedIn = function ($q, $timeout, $http, $location, $rootScope) {
		var deferred = $q.defer();
		$http.get('/loggedin').success(function (user) {
			$rootScope.errorMessage = null;
			if (user !== '0'){
				$rootScope.currentUser =  user;
				$rootScope.currentUser.passwd1 = "";
				$rootScope.isLoggedIn = (user != 0);
				deferred.resolve();
			} else {
				$rootScope.errorMessage = "You are not login yet.";
				deferred.reject();
				$location.url('/login');
				$rootScope.isLoggedIn = (user != 0);
			}
		})
	};
	$locationProvider.html5Mode(true);
	$routeProvider.
		when('/', {
			templateUrl: 'partials/login.html',
			controller: 'loginCtrl'
		}).
		when('/login', {
			templateUrl: 'partials/login.html',
			controller: 'loginCtrl'
		}).
		//Added by Srinivas Thungathurti for ASQ Upgrade 2.0.New screens Forget Password added.
		when('/forgetPasswd', {
			templateUrl: 'partials/forgetPassword.html',
			controller: 'loginCtrl'
		}).
		when('/reset',{
			templateUrl : 'partials/resetPassword.html',
			controller : 'loginCtrl'
		}).
		when('/home', {
			templateUrl: 'partials/home.html',
			controller: 'homeCtrl',
			resolve: {
				loggedin: checkLoggedIn
			}
		}).
		when('/profile', {
			templateUrl: 'partials/profile.html',
			controller: 'profileCtrl',
			resolve: {
				loggedin: checkLoggedIn
			}
		}).
		when('/about', {
			templateUrl: 'partials/about.html',
			controller: 'aboutCtrl',
			resolve: {
				loggedin: checkLoggedIn
			}
		}).
		when('/register', {
			templateUrl: 'partials/register.html',
			controller: 'registerCtrl'
		}).
		when('/exam/:id', {
			templateUrl: 'partials/exam.html',
			controller: 'examCtrl',
			resolve: {
				loggedin: checkLoggedIn
			}
		}).
		when('/examInfoList', {
			templateUrl: 'partials/examInfoList.html',
			controller: 'homeCtrl',
			resolve: {
				loggedin: checkLoggedIn
			}
		}).
		when('/report', {
			templateUrl: 'partials/historyDetail.html',
			controller: 'reportCtrl',
			resolve: {
				loggedin: checkLoggedIn
			}
		}).
		when('/history', {
			templateUrl: 'partials/history.html',
			controller: 'historyCtrl',
			resolve: {
				loggedin: checkLoggedIn
			}
		}).
		when('/practise', {
			templateUrl: 'partials/practiseConf.html',
			controller: 'practiseConfCtrl',
			resolve: {
				loggedin: checkLoggedIn
			}
		}).
		when('/practise/:id', {
			templateUrl: 'partials/practise.html',
			controller: 'practiseCtrl',
			resolve: {
				loggedin: checkLoggedIn
			}
		}).
		when('/historyDetail', {
			templateUrl: 'partials/historyDetail.html',
			controller: 'historyCtrl',
			resolve: {
				loggedin: checkLoggedIn
			}
		}).
		//Added by Srinivas Thungathurti for ASQ Upgrade 2.0.New screens Change Password,Admin Control and User/Question Control added.
		when('/changePassword', {
			templateUrl: 'partials/changePassword.html',
			controller: 'changePwdCtrl',
			resolve: {
				loggedin: checkLoggedIn
			}
		}).
		when('/admin', {
			templateUrl: 'partials/admin.html',
			controller: 'adminCtrl',
			resolve: {
				loggedin: checkLoggedIn
			}
		}).
		when('/userInfo', {
			templateUrl: 'partials/userInfo.html',
			controller: 'usersCtrl',
			resolve: {
				loggedin: checkLoggedIn
			}
		}).
		when('/updateUserInfo', {
			templateUrl: 'partials/updateUserInfo.html',
			controller: 'usersCtrl',
			resolve: {
				loggedin: checkLoggedIn
			}
		}).
		when('/questionInfo', {
			templateUrl: 'partials/questionInfo.html',
			controller: 'adminCtrl',
			resolve: {
				loggedin: checkLoggedIn
			}
		}).
		when('/updateQuestionInfo', {
			templateUrl: 'partials/updateQuestionInfo.html',
			controller: 'adminCtrl',
			resolve: {
				loggedin: checkLoggedIn
			}
		}).
		when('/addQuestionInfo', {
			templateUrl: 'partials/addQuestionInfo.html',
			controller: 'adminCtrl',
			resolve: {
				loggedin: checkLoggedIn
			}
		}).
		when('/historyDetailsStatus', {
			templateUrl: 'partials/historyDetailStatus.html',
			controller: 'historyCtrl',
			resolve: {
				loggedin: checkLoggedIn
			}
		}).
		when('/examInfo', {
			templateUrl: 'partials/examInfo.html',
			controller: 'adminCtrl',
			resolve: {
				loggedin: checkLoggedIn
			}
		}).
		when('/testDynamic', {
			templateUrl: 'partials/TestDynamic.html',
			controller: 'historyCtrl',
			resolve: {
				loggedin: checkLoggedIn
			}
		}).
		when('/404', {
			templateUrl: 'partials/404.html'
		})
		.
		otherwise({
			redirectTo: '/'
		});
});

