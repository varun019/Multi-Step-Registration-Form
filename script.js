let userDetails = [];
let input = document.getElementsByClassName('input');
let next = document.getElementById("next");
let submit = document.getElementById('submit');
let previous = document.getElementById('previous');
const error = document.querySelector('span')
const errorformonth = document.getElementById("errorformonth");
const errorforpassword = document.getElementById("errorforpassword");
let form = document.getElementsByTagName('form')[0];
let date = document.getElementById("dd");
let month = document.getElementById("mm");
let year = document.getElementById("yyyy");
let fname = document.getElementById("fname");
let lname = document.getElementById("lname");
let email = document.getElementById("em");
let phone = document.getElementById("phone");
let user = document.getElementById("user");
let password = document.getElementById("password");

let currentStep = 0
let currentslide = 0
const totalSteps = document.querySelectorAll('div[data-step]')
const totalslides = document.querySelectorAll('p[slide-step]')

const render = () => {
    for (let i = 0; i < totalSteps.length && i < totalslides.length; i++) {
        if (currentStep == i) {
            totalSteps[i].style.display = "block"
            totalslides[i].style.backgroundColor = "green";
        } else {
            totalSteps[i].style.display = "none"
            totalslides[i].style.backgroundColor = "#ededed";
        }
    }
    if (currentStep === totalSteps.length - 1) {
        submit.style.display = "block"
        next.style.display = "none"
    } else {
        submit.style.display = "none"
        next.style.display = "block"
    }
    if (currentStep < 1) {
        previous.style.display = "none"

    } else {
        previous.style.display = "block"
    }
}
render()
next.addEventListener("click", (e) => {
    e.preventDefault()
    const inputs = totalSteps[currentStep].querySelectorAll(".input")
    for (let i = 0; i < inputs.length; i++) {
        const input = inputs[i];
        let id = input.getAttribute('id')
        console.log(id)
        if (input.value == "") {
            error.style.display = "block"
            return error.innerText = "Please fill all details"
        } else {
            error.style.display = "none"
        }
        if (id == "dd") {
            let regdate = /(^0[1-9]|[12][0-9]|3[01])/;
            const errorfordate = document.getElementById("errorfordate");
            if (!regdate.test(date.value)) {
                errorfordate.style.display = "block";
                return errorfordate.innerText = "Please Enter valid Date"
            } else {
                errorfordate.style.display = "none";
            }
        }
        if (id == "mm") {
            let regmonth = /(0[1-9]|1[0-2])/;
            const errorformonth = document.getElementById("errorformonth");
            if (!regmonth.test(month.value)) {
                errorformonth.style.display = "block";
                return errorformonth.innerText = "Please Enter valid Month"
            } else {
                errorformonth.style.display = "none";
                continue;
            }
        }
        if (id == "yyyy") {
            let regyear = /^(19[5-9]\d|20[0-1]\d|2021)$/;
            const errorforyear = document.getElementById("errorforyear");
            if (!regyear.test(year.value)) {
                errorforyear.style.display = "block";
                return errorforyear.innerText = "Please Enter valid year"
            } else {
                errorforyear.style.display = "none";
            }
        }
        if (id == "phone") {
            let regphone =/^\d{10}$/;
            const errorforphone = document.getElementById("errorforphone");
            if (!regphone.test(phone.value)) {
                errorforphone.style.display = "block";
                return errorforphone.innerText = "Please Enter valid Phone Number"
            } else {
                errorforphone.style.display = "none";
            }
        }
    }
    currentStep++
    render()
})
previous.addEventListener("click", (e) => {
    e.preventDefault()
    error.style.display = "none"
    currentStep--
    currentslide--
    render()
})
submit.addEventListener("click", (e) => {
    e.preventDefault()
    next.style.display = "none";
    if (input.value != "") {
        userDetails.push({
            Fname: fname.value,
            Lname: lname.value,
            Email: email.value,
            Password: password.value,
            Date: date.value,
            Month: month.value,
            Year: year.value,
            Phone: phone.value,
            User: user.value,
            Password: password.value
        });
    }
    let text = "";
    for (let i = 0; i < userDetails.length; i++) {
        text += "<tr>"
        text += `<td>${userDetails[i].Fname == undefined ? "":userDetails[i].Fname}</td>`
        text += `<td>${userDetails[i].Lname}</td>`
        text += `<td>${userDetails[i].Email}</td>`
        text += `<td>${userDetails[i].Phone}</td>`
        text += `<td>${userDetails[i].Date}</td>`
        text += `<td>${userDetails[i].Month}</td>`
        text += `<td>${userDetails[i].Year}</td>`
        text += `<td>${userDetails[i].User}</td>`
        text += `<td>${userDetails[i].Password}</td>`
        text += "</tr>"
    }
    document.getElementById("table").innerHTML = text;
    form.reset();
    currentStep = 0
    render()
})