//back-end logic
var pokemonDbl = ["charmander", "charmander", "gengar", "gengar", "oddish", "oddish", "onix", "onix", "pikachu", "pikachu", "koffing", "koffing", "snorlax", "snorlax", "training-cards", "training-cards", "alakazam", "alakazam", "articuno", "articuno", "ash", "ash", "gameboy", "gameboy", "gym-leader", "gym-leader", "safari-ball", "safari-ball", "sandslash", "sandslash"]

var clickCount = 0;
var flipCount = 0;
var imgOne, imgTwo, pairsFound, sec, min;

function shuffleArray(array) {
	var i = pokemonDbl.length;
	var newArray = [];
  while (i > 0) {
    var r = Math.floor(Math.random() * i);
    newArray.push(array[r]);
    array.splice(r, 1);
		i--;
  } return newArray;
}

var shuffledArray = shuffleArray(pokemonDbl);


//front-end logic
$(function() {
	function addImage(array) {
		var i = shuffledArray.length;
		while (i > 0) {
	    $(".col-2:nth-of-type("+ i +")").append("<img src=images/" + array[i - 1] + ".png class=''>");
			i--;
	  };
	};

	function runningTimer() {
		sec = parseInt($("#seconds").html());
		min = parseInt($("#minutes").html());
		if (sec != 59) {
			++sec;
		} else if (sec = 59) {
			++min;
			sec = 0;
		}
		$("#seconds").html(sec);
		$("#minutes").html(min);
	};

	function showImage() {
		$("img").click(function() {
	    if (flipCount === 0 & !$(this).hasClass("matched")) {
				imgOne = $(this).parent().html();
				$(this).toggleClass("first");
	      ++flipCount;
	      ++clickCount;
	    } else if (flipCount === 1  && !$(this).hasClass("first") && !$(this).hasClass("matched")) {
				imgTwo = $(this).parent().html();
				$(this).toggleClass("second");
	      ++flipCount;
	      ++clickCount;
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
						imgTwo = undefined;
	          flipCount = 0;
	    		}
				}
			$("#movesCounter").html(clickCount);
		});
	};


	setInterval(runningTimer, 1000);
	addImage(shuffledArray);
	showImage();

});
