// function to generate markdown for README
function generateMarkdown(data) {
  let mdText =`
# ${data.title}

## Table of Contents
[Description](##description)
[Installation](##Installation)
[Test](##Testing)
[Project Links](##live Site and Repo)
[License](##License)
[Contributors](##Contributors)

## Description
* ${data.description}

## Installation
* ${data.installation}

## Testing
* ${data.testing}

## Live Site and Repo
* [live Site](${data.liveSite})
* [Repo](${data.repo})

## License
* ${data.license}

## Contributors
* ${data.contribOutput}
`;
return mdText
}

module.exports = generateMarkdown
