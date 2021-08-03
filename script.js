//Get reference to DOM elements
const title = document.querySelector('h1'),
	  description = document.getElementById('description'),
  	  input = document.getElementById('input'),
	  extraInput = document.getElementById('extraInput'),
	  calcBtn = document.getElementById('calcBtn'),
	  calcTypeElem = document.getElementById('calcType');

//Other variables
let hash = window.location.hash;

//Object for setting title and description
const obj = {
	'#prime': {
		title: 'Prime Number Calculator',
		description: 'Checks if a number is a prime number or not.',
		execute() {
			testPrime();
		}
	},
	'#factor': {
		title: 'Factor Calculator',
		description: 'Gives you all the factors of a number.',
		execute() {
			testFactor();
		}
	},
	'#multiple': {
		title: 'Multiple Calculator',
		description: 'Gives you the first few multiples of a number.',
		extras() {
			const newText = document.createElement('p').appendChild(document.createTextNode('Amount of multiples to calculate:'))
			const newInput = document.createElement('input');
			newInput.type = 'number';
			newInput.placeholder = 'Enter a number';
			newInput.id = 'multipleAmount'
			extraInput.appendChild(newText)
			extraInput.appendChild(newInput);
		},
		execute() {
			testMultiple();
		}
	}
};

updateCalcInfo();

//When the calculator type select menu changes
calcTypeElem.addEventListener('change', (event) => {
	if (Object.keys(obj).includes('#' + event.target.value)) {
		hash = event.target.value;
		window.location.hash = hash;
	}
})

//When the anchor in url changes
window.addEventListener('hashchange', () => {
	hash = window.location.hash;
	updateCalcInfo();
})

//When the number is entered
input.addEventListener('keydown', (event) => {
	if (event.code == 'Enter') {
		event.preventDefault();
		calc();
	}
})
//When the button is clicked
calcBtn.addEventListener('click', () => calc())

function calc() {
	Object.keys(obj).forEach((element) => {
		if (hash == element) {
			obj[element].execute()
		}
	})
}
//Update calculator name and info, and add extra elements if needed
function updateCalcInfo() {
	Object.keys(obj).forEach((element) => {
		if (hash == element) {
			title.innerHTML = obj[element].title;
			description.innerHTML = obj[element].description;
			while(extraInput.firstChild) {
				extraInput.removeChild(extraInput.lastChild)
				}
			if (obj[element].extras) {

				obj[element].extras()
			}
			calcTypeElem.value = hash.substr(1);
		}
	})
}
function testPrime() {
	let num = parseFloat(input.value);

	//If input is NaN
	if (isNaN(num)) {
		return output('', `Please provide a valid number.`);
	}
	//If number is more than 53 bits in size
	if (num > 9007199254740991) {
		return output('', `Due to technical restrictions, numbers larger than 9007199254740991 can't be accurately tested.`)
	}
	//If number is a decimal
	if (num % 1 != 0) {
		return output(`${num} is not a prime number.`,  `Decimals are not prime numbers.`);
	}
	//If number is smaller than 2
	if (num < 2) {
		return output(`${num} is not a prime number.`,  `Numbers smaller than 2 are not prime numbers.`);
	}
	//Else run number through the check
	for (let i = 2; i < num; i++) {
		if (num % i == 0) {
			return output(`${num} is not a prime number.`, `It can be divided by ${i}.`);
		}
	}
	//If number passes check, it's a prime number
	return output(`${num} is a prime number.`);
}
function testFactor() {
	let num = parseFloat(input.value);
	//If input is NaN
	if (isNaN(num)) {
		return output('', `Please provide a valid number.`);
	}
	//If input is 0
	if (num == 0) {
		return output('Every number is a factor of 0.')
	}
	//If number is more than 53 bits in size
	if (num > 9007199254740991) {
		return output('', `Due to technical restrictions, numbers larger than 9007199254740991 can't be accurately tested.`)
	}
	//If number is a decimal
	if (num % 1 != 0) {
		return output(`${num} is a decimal.`,  `There's no practical point in finding a decimal's factors.`);
	}
	
	let factors = [];
	//If number is negative
	if (num < 0 ) {
		for (let i = -1; i >= num; i--) {
			if (num % i == 0) factors.push(+i)
		}
	}
	//Else run number through the check
	else {
		for (let i = 1; i <= num; i++) {
			if (num % i == 0) factors.push(+i);
		}
	}
	return output(`Factors of ${num}:`, factors.join(', ') )
}
function testMultiple() {
	let num = parseFloat(input.value);

	//If input is NaN
	if (isNaN(num)) {
		return output('', `Please provide a valid number.`);
	}
	//If input is 0
	if (num == 0) {
		return output('Multiples of 0:', '0')
	}
	//If number is more than 53 bits in size
	if (num > 9007199254740991) {
		return output('', `Due to technical restrictions, numbers larger than 9007199254740991 can't be accurately tested.`)
	}
	const multipleAmount = document.getElementById('multipleAmount').value;
	if (multipleAmount < 1) {
		return output('Please provide a valid number that is larger than 0.')
	}
	let multiples = [];
	for (let i = 2; multiples.length < multipleAmount; i++) {
		multiples.push(`${num * i}`);
	}
	if (multipleAmount == 1) return output(`The first multiple of ${num}:`, multiples.join(', '));
	return output(`The first ${multipleAmount} multiples of ${num}:`, multiples.join(', '));
}
function output(boldText, normalText) {
	let output = document.getElementById('output');
	while(output.firstChild) {
		output.removeChild(output.lastChild)
	}
	if (boldText) {
		const newEl = document.createElement('strong');
		const newText = document.createTextNode(boldText);
		newEl.appendChild(newText);
		newEl.style.fontSize = '2rem';
		output.appendChild(newEl);
	}
	if (normalText) {
		const newEl = document.createElement('p');
		const newText = document.createTextNode(normalText);
		newEl.appendChild(newText);
		output.appendChild(newEl);
	}
}