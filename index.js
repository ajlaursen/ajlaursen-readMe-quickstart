const inquirer = require( "inquirer" );
let data = {};
let userArrayLength;
    const promptUser = () => {
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
        data.projectName = answers.projectName;
        console.log(data)
        contributorsArr = [];
        // dynamic function that takes previous answer and creates a number of questions based on the input from before
      for (x = 1; x <= answers.contributors; x++){
          userArrayLength = x
          contributorsArr.push({
            type: 'input',
            name: `contributor${x}`,
            message: `Name of contributor number ${x}`
            },
            {type: 'input',
            name: `userName${x}`,
            message: `What is their GitHub username`}
            )  
        }
        inquirer.prompt(contributorsArr)
        .then((answers) => {
          data = {...data,...answers}
        console.log(data);
        })
      })
      inquirer.prompt([
        
      ])
    }

    

  
// function to write README file
function writeToFile(fileName, data) {
}

// function to initialize program
function init() {
    promptUser();
}

// function call to initialize program
init();
