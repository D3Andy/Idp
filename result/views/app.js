var app = angular.module('catsvsdogs', []);
var socket = io.connect({transports:['polling']});

var bg1 = document.getElementById('background-stats-1');
var bg2 = document.getElementById('background-stats-2');

app.controller('statsCtrl', function($scope){
  $scope.aPercent = 50;
  $scope.bPercent = 50;

  var updateScores = function(){
    socket.on('scores', function (json) {
       data = JSON.parse(json);
	data.forEach(function(element) {
  		var id = element.name_id;
		var budget = element.budget;
		var roadtype = element.roadtype;
		var height = element.height;
		var way = element.way;
		var fit = element.fit;
		var string;
		if( budget > 8000 ){
			if( roadtype == "Road")
			if( fit == "Competitive" ){
				string = "Utilizatorului cu id-ul" + id + " ii este recomandata bicicleta Trek Madone SLR 9";
			}
			if( fit == "Good" ){
				string = "Utilizatorului cu id-ul" + id + " ii este recomandata bicicleta Trek Madone SLR 8";
			}
			if( fit == "Amator" ){
				string = "Utilizatorului cu id-ul" + id + " ii este recomandata bicicleta Trek Domane+";
			} 
			if( roadtype == "Offroad")
			if( fit == "Competitive" ){
				string = "Utilizatorului cu id-ul" + id + " ii este recomandata bicicleta Trek Top Fuel 9.9 SL AXS";
			}
			if( fit == "Good" ){
				string = "Utilizatorului cu id-ul" + id + " ii este recomandata bicicleta Trek Powerfly LT 9.7";
			}
			if( fit == "Amator" ){
				string = "Utilizatorului cu id-ul" + id + " ii este recomandata bicicleta Trek Powerfly LT 9.9 Plus";
			}
			if( roadtype == "Both")
			if( fit == "Competitive" ){
				string = "Utilizatorului cu id-ul" + id + " ii este recomandata bicicleta Trek Boone 7 Disc;
			}
			if( fit == "Good" ){
				string = "Utilizatorului cu id-ul" + id + " ii este recomandata bicicleta Trek Boone 7 Disc";
			}
			if( fit == "Amator" ){
				string = "Utilizatorului cu id-ul" + id + " ii este recomandata bicicleta Trek Powerfly LT 9.9 Plus";
			}
		}

		if( budget > 3500  && bubget < 8000 ){
			if( roadtype == "Road")
			if( fit == "Competitive" ){
				string = "Utilizatorului cu id-ul" + id + " ii este recomandata bicicleta Trek Madone SLR 8";
			}
			if( fit == "Good" ){
				string = "Utilizatorului cu id-ul" + id + " ii este recomandata bicicleta Trek Madone SLR 8";
			}
			if( fit == "Amator" ){
				string = "Utilizatorului cu id-ul" + id + " ii este recomandata bicicleta Trek Super Commuter+ 7";
			} 
			if( roadtype == "Offroad")
			if( fit == "Competitive" ){
				string = "Utilizatorului cu id-ul" + id + " ii este recomandata bicicleta Trek Procaliber 9.8 SL";
			}
			if( fit == "Good" ){
				string = "Utilizatorului cu id-ul" + id + " ii este recomandata bicicleta Trek Procaliber 9.8 SL";
			}
			if( fit == "Amator" ){
				string = "Utilizatorului cu id-ul" + id + " ii este recomandata bicicleta Trek Powerfly 5";
			}
			if( roadtype == "Both")
			if( fit == "Competitive" ){
				string = "Utilizatorului cu id-ul" + id + " ii este recomandata bicicleta Trek Boone 7 Disc;
			}
			if( fit == "Good" ){
				string = "Utilizatorului cu id-ul" + id + " ii este recomandata bicicleta Trek Boone 7 Disc";
			}
			if( fit == "Amator" ){
				string = "Utilizatorului cu id-ul" + id + " ii este recomandata bicicleta Trek Powerfly 5";
			}
		}

		if( budget < 3500 ){
			if( roadtype == "Road")
			if( fit == "Competitive" ){
				string = "Utilizatorului cu id-ul" + id + " ii este recomandata bicicleta Trek Domane SL 5 Disc";
			}
			if( fit == "Good" ){
				string = "Utilizatorului cu id-ul" + id + " ii este recomandata bicicleta Trek Domane SL 5 Disc";
			}
			if( fit == "Amator" ){
				string = "Utilizatorului cu id-ul" + id + " ii este recomandata bicicleta Trek Domane SL 5 Disc";
			} 
			if( roadtype == "Offroad")
			if( fit == "Competitive" ){
				string = "Utilizatorului cu id-ul" + id + " ii este recomandata bicicleta Trek Fuel EX 7 29";
			}
			if( fit == "Good" ){
				string = "Utilizatorului cu id-ul" + id + " ii este recomandata bicicleta Trek Fuel EX 7 29";
			}
			if( fit == "Amator" ){
				string = "Utilizatorului cu id-ul" + id + " ii este recomandata bicicleta Trek Fuel EX 7 29";
			}
			if( roadtype == "Both")
			if( fit == "Competitive" ){
				string = "Utilizatorului cu id-ul" + id + " ii este recomandata bicicleta Trek Checkpoint ALR 5;
			}
			if( fit == "Good" ){
				string = "Utilizatorului cu id-ul" + id + " ii este recomandata bicicleta Trek Checkpoint ALR 5";
			}
			if( fit == "Amator" ){
				string = "Utilizatorului cu id-ul" + id + " ii este recomandata bicicleta Trek Checkpoint ALR 5";
			}
		}


		document.getElementById('choice').innetHTML += string;
	});
	
	/*
       var a = parseInt(data.a || 0);
       var b = parseInt(data.b || 0);
       var percentages = getPercentages(a, b);

       bg1.style.width = percentages.a + "%";
       bg2.style.width = percentages.b + "%";

       $scope.$apply(function () {
         $scope.aPercent = percentages.a;
         $scope.bPercent = percentages.b;
         $scope.total = a + b;
	*/
       });
    });
  };

  var init = function(){
    document.body.style.opacity=1;
    updateScores();
  };
  socket.on('message',function(data){
    init();
  });
});

function getPercentages(a, b) {
  var result = {};

  if (a + b > 0) {
    result.a = Math.round(a / (a + b) * 100);
    result.b = 100 - result.a;
  } else {
    result.a = result.b = 50;
  }

  return result;
}
