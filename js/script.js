// back-end logic
const allPokemon = ['alakazam', 'articuno', 'ash', 'charmander', 'gameboy', 'gengar', 'gym-leader', 'koffing', 'oddish', 'onix', 'pikachu', 'safari-ball', 'sandslash', 'snorlax', 'training-cards'];

const defaultPokemon =  ['alakazam', 'ash', 'charmander', 'gengar', 'onix', 'pikachu'];

const easyPokemon = ['alakazam', 'ash', 'charmander', 'gengar', 'onix', 'pikachu'];

const avgPokemon = ['alakazam', 'articuno', 'ash', 'charmander', 'gengar', 'koffing', 'pikachu', 'sandslash', 'snorlax'];

const hardPokemon = ['alakazam', 'articuno', 'ash', 'charmander', 'gameboy', 'gengar', 'koffing', 'oddish', 'onix', 'pikachu', 'sandslash', 'snorlax'];

const canHover = !(matchMedia('(hover: none)').matches);
if(canHover) {
document.body.classList.add('can-hover');
}

var clickCount = 0;
var flipCount = 0;
var pairsFound = 0;
var sec = 0;
var min = 0;
var pairsToWin = 6;
var selectedLevel = 'easy';
var imgOne, imgTwo;
var clockrun = true;

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
	$('.first, .second').toggleClass('incorrect');
  setTimeout(finishNotFound, 1200);
}

function finishNotFound() {
	$('.first, .second').toggleClass('incorrect');
	$('.first, .second').parent().parent().toggleClass('flip');
	$('.first').toggleClass('first');
	$('.second').toggleClass('second');
	clearSelections();
}

function startTimer() {
  setInterval(runTimer, 1000);
}

function runTimer() {
	if (clockrun) {
		if (sec != 59) {
			++sec;
		} else if (sec = 59) {
			++min;
			sec = 0;
		}
		$('.seconds').html(sec);
		$('.minutes').html(min);
	}
}

function clearSelections() {
  imgOne = undefined;
  imgTwo = undefined;
  flipCount = 0;
}

function youWon() {
	clockrun = false;
  launchScoreModal();
} 

function launchLevelModal() {
	$('#levelModal').modal()
};

function launchScoreModal() {
	$('#scoreModal').modal()
};

function eraseHTML() {
	$('.cardsRow').empty();
};

function createHTML(array) {
	array.forEach(function(element, index) {
		$('.cardsRow').append(`
		<div class="col-3 col-md-2 card-container">
			<div class="card-inner">
				<div class="card-front">
					<img src="images/pokeball.png" alt="pokemon ball" class="pokeball img-fluid">
				</div>
				<div class="card-back" id="card${index + 1}">
					<img src="images/${element}.png" class="pokePics img-fluid">
				</div>
			</div>
		</div>
		`)
	})
};

// front-end logic
$(() => {

	function prepareGame(array) {
		array = duplicateArray(array);
		array = shuffleArray(array);
		pairsToWin = array.length/2;
		eraseHTML();
		createHTML(array);
		playGame();
	};

	function playGame() {
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
				$('.movesCounter').html(clickCount);
				if (flipCount === 2) {
					var match = checkMatch(imgOne,imgTwo);
					if (match) {
						matchFound();
						if (pairsFound < pairsToWin) {
							clearSelections();
						} else setTimeout(youWon, 2000);
					} else {
						setTimeout(matchNotFound, 200);
					}
				}
			}
		});
	};

	$('#modalSubmit').click(function(event) {
		event.preventDefault();
		selectedLevel = $('[name=radio]:checked').val();
		$('.level').html(selectedLevel);
		if (selectedLevel == "easy") {
			prepareGame(easyPokemon);
		}
		if (selectedLevel == "average") {
			prepareGame(avgPokemon);
		}
		if (selectedLevel == "hard") {
			prepareGame(hardPokemon);
		}
	});

	$('#playAgain').click(function() {
		location.reload();
	});

	$('#levelSelector').click(function() {
		launchLevelModal();
	});

	$('#reset').click(function() {
		location.reload();
	})
	
	prepareGame(defaultPokemon);
	setTimeout(launchLevelModal, 200);
	
});
