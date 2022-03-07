const mailRe = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const cards = document.querySelectorAll('.card')
const progressSegments = document.querySelectorAll('.progress')
const data = {
	q1: null,
	q2: [],
	q3: [],
	q4: {
		name:'',
		surname: '',
		email: ''
	}
}

main();

function main(){
	stepActive(1)
	progressesUpdate()
}

function stepActive(number){
	const card = document.querySelector(`.card[data-step="${number}"]`)

	if(!card){
		return
	}

	for (const card of cards){
		card.classList.remove('card--active')
	}
	card.classList.add('card--active')

	if(card.dataset.inited) {
		return;
	}

	card.dataset.inited = true

	if(number === 1){
		initStet_01();
	}else if(number === 2){
		initStet_02();
	}else if(number === 3){
		initStet_03();
	}else if(number === 4){
		initStet_04();
	}else if(number === 5){
		initStet_05();
	}else if(number === 6){
		initStet_06();
	}
}


function initStet_01(){
	const card = document.querySelector('.card[data-step="1"]')
	const startButton = card.querySelector('button[data-action="start"]')

	startButton.addEventListener('click', ()=> stepActive(2))
}

function initStet_02(){
	const card = document.querySelector('.card[data-step="2"]')
	const toPrevButton = card.querySelector('.button[data-action="toPrev"]')
	const toNextButton = card.querySelector('.button[data-action="toNext"]')
	const variants = card.querySelectorAll("[data-value]")

	toNextButton.disabled = true

	toPrevButton.addEventListener('click', () => stepActive(1))
	toNextButton.addEventListener('click', () => stepActive(3))

	for(const variant of variants){
		variant.addEventListener('click', variantClickHandler)
	}

	function variantClickHandler(){
		data.q1 = this.dataset.value

		for(const variant of variants){
			const radioButton = variant.querySelector('input[type="radio"]')
			radioButton.checked = false
		}
		const radioButton = this.querySelector('input[type="radio"]')
		radioButton.checked = true

		toNextButton.disabled = false

		progressesUpdate()
	}
}

function initStet_03(){
	const card = document.querySelector('.card[data-step= "3"]')
	const toPrevButton = card.querySelector('.button[data-action="toPrev"]')
	const toNextButton = card.querySelector('.button[data-action="toNext"]')
	const variants = card.querySelectorAll("[data-value]")

	toNextButton.disabled = true

	toPrevButton.addEventListener('click', () => stepActive(2))
	toNextButton.addEventListener('click', () => stepActive(4))

	for(const variant of variants){
		variant.addEventListener('click', variantClickHandler)
	}

	function variantClickHandler(){
		const { value } = this.dataset
		toggleItem(data.q2, value)

		for (const variant of variants){
			const { value } = variant.dataset
			const checkbox = variant.querySelector('input[type="checkbox"]')
			checkbox.checked = data.q2.includes(value)
		}

		toNextButton.disabled = !Boolean(data.q2.length)
		progressesUpdate()
	}
}

function toggleItem(array, item){
	const index = array.indexOf(item)

	if(index === -1){
		array.push(item)
	}else(
		array.splice(index, 1)
	)
}

function initStet_04(){
	const card = document.querySelector('.card[data-step="4"]')
	const toPrevButton = card.querySelector('.button[data-action="toPrev"]')
	const toNextButton = card.querySelector('.button[data-action="toNext"]')
	const variants = card.querySelectorAll("[data-value]")

	toNextButton.disabled = true

	toPrevButton.addEventListener('click', () => stepActive(3))
	toNextButton.addEventListener('click', () => stepActive(5))

	for(const variant of variants){
		variant.addEventListener('click', variantClickHandler)
	}

	function variantClickHandler() {
		const { value } = this.dataset
		toggleItem(data.q3, value)

		for (const variant of variants){
			if(data.q3.includes(variant.dataset.value)){
				variant.classList.add('variant-square--active')
			}else{
				variant.classList.remove('variant-square--active')
			}
		}

		toNextButton.disabled = !Boolean(data.q3.length)

		progressesUpdate()
	}
}

function initStet_05(){
	const card = document.querySelector('.card[data-step="5"]')
	const toPrevButton = card.querySelector('.button[data-action="toPrev"]')
	const toNextButton = card.querySelector('.button[data-action="toNext"]')
	const variants = card.querySelectorAll("[data-value]")

	const nameInput = card.querySelector('input[data-field="name"]')
	const surnameInput = card.querySelector('input[data-field="surname"]')
	const emailInput = card.querySelector('input[data-field="email"]')

	toNextButton.disabled = true
	toPrevButton.addEventListener('click', () => stepActive(4))
	toNextButton.addEventListener('click', () => stepActive(6))

	nameInput.addEventListener('keyup', nameHandler)
	surnameInput.addEventListener('keyup', surnameHandler)
	emailInput.addEventListener('keyup', emailHandler)

	function nameHandler(){
		data.q4.name = this.value
		nextButtonUpdate()
	}
	function surnameHandler(){
		data.q4.surname = this.value
		nextButtonUpdate()
	}
	function emailHandler(){
		data.q4.email = this.value
		nextButtonUpdate()
	}

	function nextButtonUpdate () {
		let active = true

		if(!data.q4.name){
			active = false
		}

		if(!data.q4.surname){
			active = false
		}

		if(!mailRe.test(data.q4.email)){
			active = false
		}
		toNextButton.disabled = !active
		progressesUpdate()
	}
}

function initStet_06(){
	const card = document.querySelector('.card[data-step="6"]')
	const emailSpan = card.querySelector('span[data-field="email"')

	emailSpan.textContent = data.q4.email
}

function progressesUpdate (){
	let progrssValue = 0; 

	if(data.q1){
		progrssValue += 1
	}

	if(data.q2.length){
		progrssValue += 1
	}

	if(data.q3.length){
		progrssValue += 1
	}
	if(data.q4.name){
		progrssValue += 1
	}
	if(data.q4.surname){
		progrssValue += 1
	}
	if(data.q4.email){
		progrssValue += 1
	}

	const progressPercent = (progrssValue / 6) * 100

	for(const progressSegment of progressSegments){
		const progressElement = progressSegment.querySelector('progress')
		const progressTitle = progressSegment.querySelector('.progress-title')

		progressElement.value = progressPercent;
		progressTitle.textContent = `${Math.ceil(progressPercent)}%`;
		progressTitle.style.width = `${progressPercent}%`

		if(progressPercent) {
			progressTitle.style.display = ""
		}else{
			progressTitle.style.display = "none"
		}
	}
}