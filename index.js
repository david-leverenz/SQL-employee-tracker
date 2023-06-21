// These enable fs and inquirer.  They also identify the other files needed and create constants for those files.
const fs = require('fs');
const inquirer = require('inquirer');
const mysql = require('mysql2')

const askQuestions = require('./lib/input.js');
// const { Circle, Square, Triangle } = require('./lib/shapes.js');
// const SVG = require('./lib/svg.js');
// // This is the inquirer add in that can control input length.
// const MaxLengthInputPrompt = require('inquirer-maxlength-input-prompt');
// inquirer.registerPrompt('maxlength-input', MaxLengthInputPrompt);

// This is function that puts everything together.  First it runs my questions, then it takes that data and determines the type of shape that was selected.  Depending on the shape it runs the appropriate constructor function for that shape.  Then it runs the methods I created and inserts the data from the user.  Then it writes the string created by those methods into a file called example.svg.  Line 33 runs the function.
function init() {
    inquirer
        .prompt(askQuestions)
        .then((data) => {
            console.log(data);
//             let shape;
//             if (data.shapeName == 'circle') {
//                 shape = new Circle();
//             } else if (data.shapeName == "triangle") {
//                 shape = new Triangle();
//             } else shape = new Square();
//             shape.setColor(data.shapeColor);
//             const svg = new SVG();
//             svg.setText(data.initials, data.textColor);
//             svg.setShape(shape);
//             fs.writeFile(('example.svg'), svg.render(), (err) => {
//                 err ? console.log(err) : console.log("Success!");
//             });
        });
}

init()