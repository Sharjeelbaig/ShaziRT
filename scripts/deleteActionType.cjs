const fs = require('fs');
const readline = require('readline');


const filePath = './src/redux/actions/actionTypes.ts';


fs.readFile(filePath, 'utf8', (err, content) => {
  if (err) {
    console.error(`Error reading file: ${err.message}`);
    return;
  }


  const options = content.match(/export const (\w+) =/g).map(match => match.match(/export const (\w+) =/)[1]);


  console.log('What do you want to delete:');
  options.forEach((option, index) => {
    console.log(`${index + 1}. ${option}`);
  });

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });


  rl.question('Enter the number of the option you want to delete: ', (userChoice) => {
    rl.close();


    userChoice = parseInt(userChoice);
    if (isNaN(userChoice) || userChoice < 1 || userChoice > options.length) {
      console.error('Invalid input. Please enter a valid number between 1 and ' + options.length);
      return;
    }


    const lineToDelete = `export const ${options[userChoice - 1]} =`;


    const updatedContent = content.replace(new RegExp(`${lineToDelete}.+\\n?`), '');


    fs.writeFile(filePath, updatedContent, 'utf8', (err) => {
      if (err) {
        console.error(`Error writing to file: ${err.message}`);
        return;
      }
      console.log(`Line '${lineToDelete}' removed successfully from ${filePath}`);
    });
  });
});
