// back-end logic
const pokemon = ['alakazam', 'articuno', 'ash', 'charmander', 'gameboy', 'gengar', 'gym-leader', 'koffing', 'oddish', 'onix', 'pikachu', 'safari-ball', 'sandslash', 'snorlax', 'training-cards'];
var clickCount = 0;
var flipCount = 0;
var pairsFound = 0;
var sec = 0;
var min = 0;
var imgOne, imgTwo;

function duplicateArray(array) {
  array.forEach((element) => {
		array.push(element);
	});
  return array;
}

function shuffleArray(array) {
  let i = array.length;
  while (i > 0) {
    let r = Math.floor(Math.random() * i);
    array.push(array[r]);
    array.splice(r, 1);
    i--;
  } return array;
}

function addImages(array) {
  array.forEach((element, index) => {
		$('#card'+ (index + 1)).append(`<img src=images/${element}.png class='pokePics img-fluid'>`);
	});
}

function showImage(image, cls) {
	image.parent().parent().toggleClass('flip');
	image.toggleClass(cls);
	img = image.attr('src');
  return img;
}

function checkMatch(imgOne,imgTwo) {
	if (imgOne === imgTwo) return true;
	return false;
}

function matchFound() {
	$('.first, .second').toggleClass('matched');
	$('.first, .second').parent().toggleClass('shadow');
	$('.first').toggleClass('first');
  $('.second').toggleClass('second');
  ++pairsFound;
}

function matchNotFound() {
	$('.first, .second').parent().parent().toggleClass('flip');
  $('.first').toggleClass('first');
  $('.second').toggleClass('second');
  reset();
}

function startTimer() {
  setInterval(runTimer, 1000);
}

function runTimer() {
  if (sec != 59) {
    ++sec;
  } else if (sec = 59) {
    ++min;
    sec = 0;
  }
  $('#seconds').html(sec);
  $('#minutes').html(min);
}

function reset() {
  imgOne = undefined;
  imgTwo = undefined;
  flipCount = 0;
}

function youWon() {
  alert(`CONGRATULATIONS! You won in ${clickCount} moves!`);
} 


// front-end logic
$(() => {

	function prepareGame(array) {
		array = duplicateArray(array);
		array = shuffleArray(array);
		addImages(array);
		playGame(array);
	};

	function playGame(array) {
		$('.card-front').click(function() {
			if (flipCount < 2) {
				if (clickCount === 0) {
					startTimer();
				}
				activePic = $(this).siblings('.card-back').children();
				if (flipCount === 0 && !activePic.hasClass('matched')) {
					imgOne = showImage(activePic, 'first');
					++flipCount;
					++clickCount
				}	else if (flipCount === 1  && !activePic.is('.first, .matched')) {
					imgTwo = showImage(activePic, 'second');
					++flipCount;
					++clickCount;
				}
				$('#movesCounter').html(clickCount);
				if (flipCount === 2) {
					var match = checkMatch(imgOne,imgTwo);
					if (match) {
						matchFound();
						if (pairsFound < 15) {
							reset();
						} else youWon();
					} else {
						setTimeout(matchNotFound, 1200);
					}
				}
			}
		});
	};

	prepareGame(pokemon);

});
