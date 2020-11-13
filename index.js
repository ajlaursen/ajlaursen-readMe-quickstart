const inquirer = require("inquirer");
const fs = require("fs");
//  this is what i am having issues with as well as with below
const generateMarkdown = require("./assets/js/generateMarkdown.js");



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
      let license = answers.license;
      
      switch (license) {
        case "MIT License":
          answers.license = `[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)`;
        break;

        case "Apache License 2.0": answers.license = `[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)`;
        break;

        case "GNU General Public License (GPL)": answers.license = `[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)`;
        break;

        case 'GNU Library or "Lesser" General Public License (LGPL)' : answers.license = `[![License: LGPL v3](https://img.shields.io/badge/License-LGPL%20v3-blue.svg)](https://www.gnu.org/licenses/lgpl-3.0)`;
        break;

        case "Mozilla Public License 2.0": answers.license = `[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)`;
        break;

        case "Common Development and Distribution License": answers.license = `[![License: CC0-1.0](https://img.shields.io/badge/License-CC0%201.0-lightgrey.svg)](http://creativecommons.org/publicdomain/zero/1.0/)`;
        break;

        case "Eclipse Public License version 2.0" : answers.license = `[![License](https://img.shields.io/badge/License-EPL%201.0-red.svg)](https://opensource.org/licenses/EPL-1.0)`;
        break;

        case 'BSD 3-Clause "New" or "Revised" license': answers.license = `[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)`;
        break;

        case 'BSD 2-Clause "Simplified" or "FreeBSD" license': answers.license = `[![License](https://img.shields.io/badge/License-BSD%202--Clause-orange.svg)](https://opensource.org/licenses/BSD-2-Clause)`;
        break;
      };
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
          writeToFile("./output/README.md", data);
        });
    });
};

// function to write README file

//  this is part of problem i am having
function writeToFile(fileName, data) {
  
  const mdText = generateMarkdown(data)
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

