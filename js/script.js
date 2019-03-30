//back-end logic
var pokemon = ["charmander", "gengar", "oddish", "onix", "pikachu", "koffing", "snorlax", "training-cards", "alakazam", "articuno", "ash", "gameboy", "gym-leader", "safari-ball", "sandslash"]

var clickCount = 0;
var flipCount = 0;
var pairsFound = 0;
var sec = 0;
var min = 0;
var imgOne, imgTwo;

function prepareGame(array) {
	array = duplicateArray(array);
	array = shuffleArray(array);
	addImages(array);
	hideImages(array);
	playGame(array);
};

function duplicateArray(array) {
	array.forEach(function(element) {
		array.push(element);
	});
	return array;
};

function shuffleArray(array) {
	var i = array.length;
  while (i > 0) {
		var r = Math.floor(Math.random() * i);
		array.push(array[r]);
		array.splice(r, 1);
		i--;
  } return array;
}

function addImages(array) {
	array.forEach(function(element, index) {
		$(".col-2:nth-of-type("+ (index + 1) +")").append("<img src=images/" + element + ".png class='pokePics img-fluid'>");
	});
};

function hideImages(array) {
	$('.pokePics').hide();
};

function playGame(array) {
	$(".col-2").click(function() {
		if (flipCount < 2) {
			++clickCount;
			if (clickCount === 1) {
				startTimer();
			}
			activePic = $(this).children('.pokePics');
			if (flipCount === 0 && !activePic.hasClass("matched")) {
				imgOne = showImage(activePic, 'first');
				++flipCount;
			}	else if (flipCount === 1  && !activePic.is('.first, .matched')) {
				imgTwo = showImage(activePic, 'second');
				++flipCount;
			}
			if (flipCount === 2) {
				var match = checkMatch(imgOne,imgTwo);
				if (match) {
					matchFound();
					if (pairsFound < 15) {
						reset();
					} else youWon();
				} else {
					setTimeout(matchNotFound, 2000);
				}
			}
			$('#movesCounter').html(clickCount);
		}
	});
};


function showImage(image, imgClass) {
	image.show();
	image.toggleClass(imgClass);
	image.siblings().hide();
	img = image.attr('src');
	return img
}

function checkMatch(imgOne,imgTwo) {
	if (imgOne === imgTwo) return true;
	else return false;
}

function matchFound(imgOne,imgTwo) {
	$('.first').toggleClass('matched first');
	$('.second').toggleClass('matched second');
	++pairsFound;
	console.log(pairsFound);
}

function matchNotFound(imgOne,imgTwo) {
	$('.first').hide();
	$('.first').siblings().show();
	$('.second').hide();
	$('.second').siblings().show();
	$('.first').toggleClass('first');
	$('.second').toggleClass('second');
	reset();
}

function startTimer() {
	setInterval(runTimer, 1000);
};

function runTimer() {
	if (sec != 59) {
			++sec;
		} else if (sec = 59) {
			++min;
			sec = 0;
		}
	$("#seconds").html(sec);
	$("#minutes").html(min);
};

function reset() {
	imgOne = undefined;
	imgTwo = undefined;
	flipCount = 0;
}

function youWon() {
	alert('CONGRATULATIONS! You won in ' + clickCount + ' moves!')
}


//front-end logic
$(function() {

	prepareGame(pokemon);

});
