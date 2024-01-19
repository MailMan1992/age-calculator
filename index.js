let getAge = document.getElementById("get-age");
let day = document.querySelector(".day");
let year = document.querySelector(".year");
let month = document.querySelector(".month");
let dayValue = document.getElementById("day")
let monthValue = document.getElementById("month")
let yearValue = document.getElementById("year")
let now = new Date();
let dataYears = document.querySelector("[data-years]");
let dataMonth = document.querySelector("[data-months]");
let dataDay = document.querySelector("[data-days]");

getAge.addEventListener("click", (e) => {
	e.preventDefault();
	if(checkValidation()) {
		showAge(yearValue.value, monthValue.value, dayValue.value);
	}
})

function checkValidation() {
	let validated = [];
	let array = [dayValue, monthValue, yearValue];
	array.forEach(item => {
		let parent = item.parentNode;
		if(item.value === "") {
			validated.push(handleValidation(parent, "req"));
		}
		if(!isInvalid(item)) {
			if(item.value === "") return;
			validated.push(handleValidation(parent, "invalid"))
		}
	})
	if(validated.length === 0) return true;
}


function handleValidation(element, validation) {
	switch (validation) {
		case "req":
			handleCSS(element, "req");
			return false;
		case "invalid":
			handleCSS(element, "invalid");
			return false;
		default:
			break;
	}
}

function handleCSS(element, validation) {
	let children = [...element.children];
	children.forEach(child => {
		if(child.classList.contains(validation)) {
			element.classList.add("error");
			child.classList.add("active")
		}
		setTimeout(() => {
			element.classList.remove("error")
			child.classList.remove("active")
		}, 2000)
	})
}
function isInvalid(element) {
	let patternForMonth = /(^0[1-9]$)|(^1[0-2]$)|([1-9])/
	let patternForYear = /[1-9][0-9][0-9][0-9]/
	let patternForDay = /([0-3][0-9]) |[1-9]/
	let currentYear = now.getFullYear();

	if(element.id === "day") {
		if(element.value > 31) return false;
		return patternForDay.test(element.value)}
	if(element.id === "month") return patternForMonth.test(element.value);
	if(element.id === "year") {
		if(currentYear < Number(element.value)) return false;
		return patternForYear.test(element.value)
	}
}


function showAge(y, m, d) {
	let currentYear = now.getFullYear();
	let currentMonth = now.getMonth() + 1;
	let currentDate = now.getDate();
	let yearDiff = 0;
	let monthDiff = 0;
	let dateDiff = 0;
	if(currentDate >= d && currentMonth >= m) {
		yearDiff = currentYear - y;
		monthDiff = currentMonth - m;
		dateDiff = currentDate - d;
	}
	if (currentMonth - m < 0) {
		currentMonth += 12;
		--currentYear;
	}
	if(currentDate - d < 0) {
		currentDate += 30;
		--currentMonth;
	}
	yearDiff = currentYear - y;
	monthDiff = currentMonth - m;
	dateDiff = currentDate - d;

	dataYears.textContent = `${yearDiff}`;
	dataMonth.textContent = `${monthDiff}`;
	dataDay.textContent = `${dateDiff}`;
}
