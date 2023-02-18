const passValue = document.querySelector(".password-box input");
const copyBtn = document.querySelector(".password-box #copy-btn");
const passIndicator = document.querySelector(".indicator-box .indicator");
const passLength = document.querySelector(".password-length-box input");
const passLengthText = document.querySelector(  ".password-length-box .pass-length-value");
const options = document.querySelectorAll(".settings div label input");
const generateBtn = document.querySelector(".generate-btn");

const values = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%^(*)-+/><.,:}{][=",
};

function generatePassword() {
  let strongPassword = "";
  let randomPassword = "";

  let length = passLength.value; //*password-length-box input մեջի value="6" */

  options.forEach((option) => {
    if (option.checked) {
      strongPassword += values[option.id];
    }
  });
  /* option.checked վերցնում է settings միջի input-ների checked ատրիբուտը */
  /***  values ստանում է option-ի id values հատկություների հետ կապ ստեղծելու-դիմելու համար***/

  for (let i = 0; i < length; i++) {
    randomPassword +=
      strongPassword[Math.floor(Math.random() * strongPassword.length)];
  }

  /****password-box -ի  value="pass$7" արժեքը հավասարեցվում է randomPassword -ին*/
  passValue.value = randomPassword;
}
/* *navigator.clipboard.writeText սա մեթոդ է,copy անում input միջի գրվածը* */
copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(passValue.value);
});

// passIndicator.id = passValue.value <= 8 ?"weak" : passValue.value <= 16 ? "medium" : "strong";
/* այս ֆունկցիայով passIndicator ին տալիս ենք id-ներ "weak" "medium" "strong"*/
function updateIndicator() {
  if (passLength.value <= 16) {
    passIndicator.id = "weak";
  } else if (passLength.value <= 26) {
    passIndicator.id = "medium";
  } else {
    passIndicator.id = "strong";
  }
}

passLength.addEventListener("input", () => {
  updateIndicator();
  generatePassword();
  passLengthText.textContent = passLength.value;
});

generateBtn.addEventListener("click", generatePassword);
