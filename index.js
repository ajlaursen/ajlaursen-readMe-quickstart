const inquirer = require("inquirer");
const fs = require("fs");
//  this is what i am having issues with as well as with below
const generateMarkdown = require("assets/js/generateMarkdown.js");
import { generatMarkdown } from "assets/js/generateMarkdown.js";

let data = {};
let userArrayLength;
let contributorOutput = "";
const promptUser = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "What is the title of your project?",
        default: "Untitled",
      },
      {
        type: "input",
        name: "description",
        message: "Add a short description of your project",
        default: "No description available",
      },
      {
        type: "input",
        name: "installation",
        message: "Type your installation instructions",
        default: "No instructions needed",
      },
      {
        type: "input",
        name: "testing",
        message: "Type your testing instructions",
        default: "No testing available",
      },
      {
        type: "input",
        name: "liveSite",
        message: "Enter the URL for your site",
        default: "No livesite",
      },
      {
        type: "input",
        name: "repo",
        message: "Enter your repo address",
        default: "No repo for this project",
      },
      {
        type: "list",
        name: "license",
        message: "Select a License",
        choices: [
          "MIT License",
          "Apache License 2.0",
          "GNU General Public License (GPL)",
          'GNU Library or "Lesser" General Public License (LGPL)',
          "Mozilla Public License 2.0",
          "Common Development and Distribution License",
          "Eclipse Public License version 2.0",
          'BSD 3-Clause "New" or "Revised" license',
          'BSD 2-Clause "Simplified" or "FreeBSD" license',
        ],
      },
      {
        type: "number",
        name: "contributors",
        message: "How many contributors",
        default: 1,
      },
    ])
    .then((answers) => {
      data = answers;
      contributorsArr = [];
      // dynamic function that takes previous answer and creates a number of questions based on the input from before
      for (x = 1; x <= answers.contributors; x++) {
        userArrayLength = x;
        contributorsArr.push(
          {
            type: "input",
            name: `contributor${x}`,
            message: `Name of contributor number ${x}`,
          },
          {
            type: "input",
            name: `userName${x}`,
            message: `What is their GitHub username`,
          }
        );
      }
      inquirer
        .prompt(contributorsArr)

        .then((answers) => {
          data = { ...data, ...answers };
          for (y = 1; y <= userArrayLength; y++) {
            let contrib = eval(`data.contributor${y}`);
            let user = eval(`data.userName${y}`);
            contributorOutput = contributorOutput.concat(
              `[${contrib}](https://github.com/${user})  `
            );
          }
          data.contribOutput = contributorOutput;

          writeToFile("README.md", data);
        });
    });
};

// function to write README file

//  this is part of problems i am having
function writeToFile(fileName, data) {
  // generatMarkdown(data);
  let mdText = 
  fs.writeFile(fileName, mdText, function (err) {
    if (err) throw err;
    console.log("File created!");
  });
}

// function to initialize program
function init() {
  promptUser();
}

// function call to initialize program
init();
