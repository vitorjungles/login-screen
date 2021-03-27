var year = document.createElement("span");
year.textContent = ` ${new Date().getFullYear()}`;
document.querySelector("#copyright").after(year);

var Create = document.querySelector("#create");
var Validate = document.querySelector("#validate");