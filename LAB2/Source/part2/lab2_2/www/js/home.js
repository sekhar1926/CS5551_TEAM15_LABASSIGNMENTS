angular.module('myhome', ['naif.base64']).controller('home', function($scope,$http,$window){

  $scope.imageUpload = function(element){
    var reader = new FileReader();
    reader.onload = $scope.imageIsLoaded;
    reader.readAsDataURL(element.files[0]);
  }

  $scope.imageIsLoaded = function(e){
    $scope.$apply(function() {

      document.getElementById("img").src = e.target.result;
      document.getElementById("img").style.removeProperty("display");
    });
  }

  $scope.faceUpload = function(element){
    var reader = new FileReader();
    reader.onload = $scope.faceIsLoaded;
    reader.readAsDataURL(element.files[0]);
  }

  $scope.faceIsLoaded = function(e){
    $scope.$apply(function() {

      document.getElementById("face").src = e.target.result;
      document.getElementById("face").style.removeProperty("display");
    });
  }



  $scope.upload = function(file) {
    var fname = file.base64;
    var itemList = "";

    const app = new Clarifai.App({apiKey: 'b28edbf1050d46da8a72be045d2f6c0e'});
    app.models.predict(Clarifai.GENERAL_MODEL, {base64: fname}).then(

      function(response) {
        console.log(response);
        console.log(response.outputs[0].data.concepts[0].name);
        console.log(response.outputs[0].data.concepts.length);

        for (var i = 0; i < 10;i++) {
           var temp = response.outputs[0].data.concepts[i].name;
           itemList = itemList+ temp +"<br/>";

        }
        document.getElementById("notes").innerHTML =itemList;
      }

    );
  }



        $scope.getdata = function () {

            $scope.titlelist = new Array();
            $scope.link = new Array();

            $http.get('https://api.duckduckgo.com/?q='+ $scope.word +'&format=json&pretty=1')
                .success(function (data) {
                    console.log(data);
                    for (var i = 0; i < data.RelatedTopics.length; i++) {
                        $scope.titlelist[i] = {
                            "title": data.RelatedTopics[i].Text,
                            "link": data.RelatedTopics[i].FirstURL

                        };
                        


                    }
                    ;


                });
        }
       

});
