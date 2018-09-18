var App = angular.module('App', ['ngRoute']);
    App.config(function($routeProvider) {
		$routeProvider
            .when('/login', {
                templateUrl : 'pages/login.html',
                controller  : 'loginController'
            })
            .when('/register', {
                templateUrl : 'pages/register.html',
                controller  : 'registerController'
            })
			// route for the home page
			.when('/', {
				templateUrl : 'pages/login.html',
				controller  : 'loginController'
			})
            .when('/home', {
                templateUrl : 'pages/home.html',
                controller  : 'mainController'
            })

			// route for the about page
			.when('/about', {
				templateUrl : 'pages/about.html',
				controller  : 'aboutController'
			})

			// route for the contact page
			.when('/contact', {
				templateUrl : 'pages/contact.html',
				controller  : 'contactController'
			});
	});

    App.controller('registerController', function($scope) {
        $scope.registeruser = function(){
            if($scope.password == $scope.confirm){
                localStorage.setItem('name',$scope.name );
                localStorage.setItem('email',$scope.email );
                localStorage.setItem('username',$scope.username );
                localStorage.setItem('password',$scope.password );
                var name = localStorage.getItem('name');
                console.log(name);
                location.href="#login";

            }else{
               console.log("Registration failed")
            }
        }

    });
    App.controller('loginController', function($scope) {
        $scope.loginuser = function () {
            var username = localStorage.getItem('username');
            var password = localStorage.getItem('password');
            var name = localStorage.getItem('name');
            if ($scope.password == password && $scope.username == username) {
                console.log(username);
                console.log("Login Success");
                localStorage.setItem('status','suc' );
				document.getElementById("two").style.display="block";
                document.getElementById("one").style.display="none";
                location.href="#home";
            } else {
                console.log("login failed")
            }
        }
    });
	App.controller('mainController', function($scope,$http) {
        $scope.getdata = function () {

            $scope.titlelist = new Array();
            $scope.link = new Array();

            $http.get('https://www.googleapis.com/customsearch/v1?key=AIzaSyDG9lScCWDWYveWJU0_H6qu7rpGOmRI47Q&cx=010929352625651305725:2if2piyjthc&q=' + $scope.word)
                .success(function (data) {

                    for (var i = 0; i < data.items.length; i++) {
                        $scope.titlelist[i] = {
                            "title": data.items[i].title,
                            "link": data.items[i].link

                        };


                    }
                    ;


                });
        }
        $scope.pro = "Welcome "+localStorage.getItem('username');
    });

	App.controller('aboutController', function($scope) {
		$scope.message = 'Look! I am an about page.';
	});
	App.controller('contactController', function($scope) {
		$scope.message = 'Contact us! JK. This is just a demo.';
	});
    window.fbAsyncInit = function() {
        FB.init({
            appId      : '2009407365778866',
            cookie     : true,
            xfbml      : true,
            version    : 'v2.8'
        });
        FB.getLoginStatus(function(response) {
            statusChangeCallback(response);
        });
    };
    (function(d, s, id){
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
    function statusChangeCallback(response){
        if(response.status === 'connected'){
            console.log('Logged in and authenticated');
            setElements(true);
            testAPI();
        } else {
            console.log('Not authenticated');
            setElements(false);
        }
    }
    function checkLoginState() {
        FB.getLoginStatus(function(response) {
            statusChangeCallback(response);
        });
    }
    function testAPI(){
        FB.api('/me?fields=name,email,birthday,location', function(response){
            if(response && !response.error){
                console.log(response);
                buildProfile(response);
            }

        })
    }
    function buildProfile(user){
        let profile = `
          <h3>Welcome ${user.name}</h3>
          <!--<ul class="list-group">
            <li class="list-group-item">User ID: ${user.id}</li>
            <li class="list-group-item">Email: ${user.email}</li>
            <li class="list-group-item">Birthday: ${user.birthday}</li>
            <li class="list-group-item">User ID: ${user.location.name}</li>
          </ul>-->
        `;
        document.getElementById('profile1').innerHTML = profile;
        //console.log(${user.name});
    }

    function setElements(isLoggedIn){
        if(isLoggedIn){
            var path=window.location.pathname;
            console.log(path);
            location.href = "#home";
            document.getElementById("two").style.display="block";
            document.getElementById("one").style.display="none";
            document.getElementById("hello").style.display="none";
            //document.getElementById('logout').style.display = 'block';
            document.getElementById('profile').style.display = 'block';
            //document.getElementById('feed').style.display = 'block';
            document.getElementById('fb-btn').style.display = 'none';
            //document.getElementById('heading').style.display = 'none';
        } else {
            //document.getElementById('logout').style.display = 'none';
            document.getElementById('profile').style.display = 'none';
            //document.getElementById('feed').style.display = 'none';
            document.getElementById('fb-btn').style.display = 'block';
            //document.getElementById('heading').style.display = 'block';
        }
    }
    function logout(){

            FB.logout(function (response) {
                setElements(false);
                location.href = "#login";
                document.getElementById("two").style.display = "none";
                document.getElementById("one").style.display = "block";
                document.getElementById('fb-btn').style.display = 'block';
            });

    }