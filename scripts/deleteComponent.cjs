const fs = require('fs');
const path = require('path');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

function listComponents() {
  const componentFolder = './src/components';


  fs.readdir(componentFolder, (err, files) => {
    if (err) {
      console.error("Error reading component directory:", err);
      return;
    }


    const components = files.filter((file) =>
      fs.statSync(path.join(componentFolder, file)).isDirectory()
    );

    if (components.length === 0) {
      console.log("No components found.");
      readline.close();
      return;
    }

    console.log("List of components:");
    components.forEach((component, index) => {
      console.log(`${index + 1}. ${component}`);
    });

    readline.question('Enter the number of the component to delete: ', (componentNumber) => {
      const selectedComponent = components[componentNumber - 1];

      if (!selectedComponent) {
        console.log("Invalid component number.");
        readline.close();
        return;
      }


      fs.rmSync(path.join(componentFolder, selectedComponent), { recursive: true });

      console.log(`Component '${selectedComponent}' deleted successfully.`);
      readline.close();
    });
  });
}

listComponents();
