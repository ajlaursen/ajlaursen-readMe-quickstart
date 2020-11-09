const inquirer = require( "inquirer" );

    const promptUser = () =>
    inquirer.prompt([
        {
            type: 'input',
            name: 'projectName',
            message: 'What is the title of your project?',
          },
          {
            type: 'number',
            name: 'contributors',
            message: 'How many contributors',
          },
    ])
    .then((answers) => {
        // trying to write a dynamic function that will ask a number of questions based on the user input
      for (x = 1; x <= answers.contributors; x++){
          inquirer.prompt([
              {
                  type: 'input',
                  name: `contributor ${x}`,
                  message: `Name of contributor number ${x}`
              }
          ])
      }
  })
    

  
// function to write README file
function writeToFile(fileName, data) {
}

// function to initialize program
function init() {
    promptUser();
}

// function call to initialize program
init();
