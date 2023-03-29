# Team1_BioCapstone

We are creating a website that takes body composition data from user input and displays the minimum amount of steps needed to lose body fat. 

We will be using the Spearman's Rho formula that will express the steps relative to fat mass:<br>
(STEPS∙kg of fat mass-1∙day-1)

STEPS = (steps∙day-1)<br>
kg of fat mass-1 = (1/kg of fat mass)<br>
day-1 = (1/day)<br>

variable needed per new pdf:<br>
sex <br>
current weight(lb)<br>
current weight(kg): (current weight(lb) * .45467)<br>
current body fat(%)<br>
current fat mass(kg): (current weight(kg) * current body fat(%))<br>
current fat-free mass(kg): current weight(kg) - current fat mass(kg)<br>
target weight loss(%)<br>
target weight loss(kg): (current weight(kg) * target weight loss(%))<br>
target body weight(kg): (current weight(kg) - target weight loss(kg)) <br>

new current fat mass: (current fat mass(kg) - target weight loss(kg))<br>
target body fat(%): (new current fat mass/95.1)<br>

Males: 39377.34/(target body fat(%)^1.3405) = STEPS∙kg of fat mass∙day<br>
Females: 261425.4/(target body fat(%)^1.8797) = STEPS∙kg of fat mass∙day<br>

steps/day = ((STEPS∙kg of fat mass∙day)* current fat mass(kg))


NPM Install Commands for files contactform, navbar, and app.js:
npm install @emailjs/browser
npm install moment-timezone
npm install --save @fortawesome/fontawesome-free
npm install @fortawesome/free-solid-svg-icons
