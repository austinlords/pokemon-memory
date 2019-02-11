//back-end logic
var pokemonDbl = ["charmander", "charmander", "gengar", "gengar", "oddish", "oddish", "onix", "onix", "pikachu", "pikachu", "koffing", "koffing", "snorlax", "snorlax", "training-cards", "training-cards", "alakazam", "alakazam", "articuno", "articuno", "ash", "ash", "gameboy", "gameboy", "gym-leader", "gym-leader", "safari-ball", "safari-ball", "sandslash", "sandslash"]

var clickCount = 0;
var flipCount = 0;
var imgOne, imgTwo, pairsFound;

function shuffleArray(array) {
	var i = pokemonDbl.length;
	var newArray = [];
  while (i > 0) {
    var r = Math.floor(Math.random() * i);
    newArray.push(array[r]);
    array.splice(r, 1);
		i--;
  } return newArray;
};

var shuffledArray = shuffleArray(pokemonDbl);

//front-end logic
$(function() {
	function addImage(array) {
		var i = shuffledArray.length;
		while (i > 0) {
	    $(".col-2:nth-of-type("+ i +")").append("<img src=images/" + array[i - 1] + ".png>");
	    //$(".cardDivs:nth-of-type("+ i +")").append("<span>" + array[i - 1] + "</span>");
			i--;
	  };
	};

	addImage(shuffledArray);

	function showImage() {
		$("img").click(function() {
	    if (flipCount === 0) {
	      $(this).toggleClass("first");
	      ++flipCount;
	      ++clickCount;
	      imgOne = $(this).html();
	    } else if (flipCount === 1  && !$(this).hasClass("first")) {
	      $(this).toggleClass("second");
	      ++flipCount;
	      ++clickCount;
	      imgTwo = $(this).html();
	      if (imgOne === imgTwo) {
	          flipCount = 0;
	          pairsFound += 1;
	          $(".first, .second").toggleClass("matched");
	          $(".first").toggleClass("first");
						$(".second").toggleClass("second");
	      } else {
	        	$(".first").toggleClass("first", false);
						$(".second").toggleClass("second", false);
						imgOne = undefined;
						imagTwo = undefined;
	          flipCount = 0;
	    		}
	  		}
		});
	};


	showImage();

});
