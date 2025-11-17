"use strict";
const menus = document.querySelectorAll('.menu li');
const pages = document.querySelectorAll('.form-group');
const fullName = document.getElementById('full-name');
const userName = document.getElementById('user-name');
const email = document.getElementById('email');
const button = document.getElementById('button');
const previous = document.getElementById('previous');
const experienceLevel = document.getElementById('experience-Level');
const currentRole = document.getElementById('current-role');
const yearsOfExperience = document.getElementById('Experience');
const pageToggle = document.querySelector('.page-toggle');
const skills = document.getElementsByName('lang');
const radio = document.getElementsByName('radio');
const errorCheckbox =document.querySelector('.error-checkbox');
const errorRadio = document.querySelector('.error-radio');
const salary = document.querySelector('#salary');



let pageStep = 0;
let userInputs =[];
let rotation = 0;
const validinput = [fullName, userName, email, experienceLevel, currentRole, yearsOfExperience];


function showStep(stepNumber) {
    pages.forEach((ele, i)=>{
        i === stepNumber? ele.classList.remove('opacity-step'): ele.classList.add('opacity-step');
    });
    menus.forEach((e, i)=>{
        i === stepNumber? e.classList.add('active'): e.classList.remove('active');
    });
    stepNumber > 0 ? previous.classList.remove('display-none'): previous.classList.add('display-none');
    stepNumber === pages.length-1 ? button.textContent = 'submit' : button.textContent = 'next';
    updatedButton();
}

function addEventsStep() {
    button.addEventListener('click', (e) =>{
    e.preventDefault(); 
    goToNextStep();
});

previous.addEventListener('click', (e) => {
    e.preventDefault();
    goToPreviousStep();
});

validinput.forEach(e=>{
    e.addEventListener('input', ()=>{
        validateStep(pageStep, true);
        updatedButton();
    })
});
[...skills].forEach(ele=>{
    ele.addEventListener('change', ()=>{
        validateStep(pageStep, true);
        updatedButton();
    })
});
[...radio].forEach(ele=>{
    ele.addEventListener('change', ()=>{
        validateStep(pageStep, true);
        updatedButton();
    })
})
}
addEventsStep();

function goToNextStep(){
    const selectedSkills = [...skills].filter(ele => ele.checked).map(ele => ele.value);
    const selectedRadio = [...radio].filter(ele => ele.checked).map(ele => ele.value);
    if (validateStep(pageStep, true)) {
        const userData = {
        fullName: fullName.value,
        userName: userName.value,
        email: email.value,
        experienceLevel: experienceLevel.value,
        currentRole: currentRole.value,
        yearsOfExperience: yearsOfExperience.value,
        salary: salary.value,
        selectedSkills: selectedSkills,
        selectedRadio: selectedRadio,
    };
    userInputs[pageStep]= userData;
    const formData = Object.assign({},...userInputs);
    if(pages.length-1 === pageStep){
        console.log('formData', formData);
        return;
    }

    pageStep<pages.length -1 ? pageStep++ :'';
    showStep(pageStep);
    }
}

function updatedButton() {
    if (validateStep(pageStep, false)) {
        button.classList.add('btn-valid');
    }else{
        button.classList.remove('btn-valid');
    }
}

function goToPreviousStep(){
    pageStep > 0 ? pageStep-- : '';
    showStep(pageStep);
}

function validateStep(stepNumber, message = true) {
    let isValid = true;
    if (stepNumber === 0) {
            const validateStep1 = [{
        input: fullName,
        regex:/\S+/
    },
    {
        input: userName,
        regex:/^.{3,}$/
    },
    {
        input: email,
        regex:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/
    }
];
        validateStep1.forEach(ele => {
            const inputValid = ele.regex.test(ele.input.value);
            if(!inputValid){
                isValid = false;
            }
            if (message) {
            if (!inputValid) {
                ele.input.nextElementSibling.classList.remove('display-none')
            }else{
                ele.input.nextElementSibling.classList.add('display-none')
            }
        }
        });
    };
    if (stepNumber === 1) {
        const validateStep2 = [{
            input: experienceLevel,
            regex:/\S+/
        },
    {
        input:currentRole,
        regex:/\S+/
    },{
        input: yearsOfExperience,
        regex: /^([0-9]|[1-9][0-9]|50)$/
    }];

    validateStep2.forEach(ele => {
        const inputValid = ele.regex.test(ele.input.value)
        if(!inputValid){
            isValid = false;
        }
        if (message) {
            if (!inputValid) {
                ele.input.nextElementSibling.classList.remove('display-none');
            }else{
                ele.input.nextElementSibling.classList.add('display-none');
            }
        }
    })
}
if (stepNumber === 2) {
    isValid = true;
    const skill = [...skills].some(ele=> ele.checked);
  if (!skill) {
    isValid = false;
  }
if (message) {
    if (!skill) {
        errorCheckbox.classList.remove('display-none');
    }else{
        errorCheckbox.classList.add('display-none');
    }
}
 const radioChecked = [...radio].some(ele=> ele.checked);
if (!radioChecked) {
    isValid = false;
}
if(message){
    if (!radioChecked) {
        errorRadio.classList.remove('display-none');
    }else{
        errorRadio.classList.add('display-none');
    }
}
}
return isValid;
}