const fs = require('fs');
const path = require('path');

// Function to get a list of route files in the routes directory
function getRouteFiles() {
  const routesDir = path.join(__dirname, '../src/routes');
  return fs.readdirSync(routesDir).filter((file) => file.endsWith('.tsx'));
}

// Function to display available routes and get user selection
function getUserSelection(routeFiles) {
  console.log('Available routes to delete:');
  routeFiles.forEach((routeFile, index) => {
    console.log(`${index + 1} - ${routeFile.slice(0, -4)}`);
  });

  return new Promise((resolve, reject) => {
    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readline.question('Enter the number of the route to delete: ', (selection) => {
      readline.close();
      const selectedNumber = parseInt(selection, 10);
      if (isNaN(selectedNumber) || selectedNumber <= 0 || selectedNumber > routeFiles.length) {
        reject(new Error('Invalid selection.'));
      } else {
        resolve(routeFiles[selectedNumber - 1]);
      }
    });
  });
}

// Function to delete the selected route file
function deleteRouteFile(routeFileName) {
  const routeFilePath = path.join(__dirname, `../src/routes/${routeFileName}`);
  fs.unlinkSync(routeFilePath);
  console.log(`Route ${routeFileName.slice(0, -4)} deleted successfully.`);
}

// Function to update the App.tsx file by removing the deleted route configuration
function updateAppFile(deletedRouteName) {
  const appFilePath = path.join(__dirname, '../src/App.tsx');

  // Read the existing App.tsx content
  let appFileContent = '';
  if (fs.existsSync(appFilePath)) {
    appFileContent = fs.readFileSync(appFilePath, 'utf8');
  }

  // Remove the route import statement from the top of the file
  const importStatement = `import ${deletedRouteName.slice(0, -4)} from "./routes/${deletedRouteName.slice(0, -4)}"`;
  appFileContent = appFileContent?.replace(importStatement, '');

  // Remove the route configuration from the Routes component
  appFileContent = appFileContent.replace(
    `<Route path="/${deletedRouteName.slice(0, -4)}" element={<${deletedRouteName.slice(0, -4)} />} />`,
    ''
  );

  // Write the updated content back to the App.tsx file
  fs.writeFileSync(appFilePath, appFileContent);

  console.log(`App.tsx updated successfully after deleting ${deletedRouteName.slice(0, -4)} route.`);
}

// Main function to delete a route
async function deleteRoute() {
  const routeFiles = getRouteFiles();
  if (routeFiles.length === 0) {
    console.log('No routes found. Nothing to delete.');
    return;
  }

  try {
    const deletedRouteFileName = await getUserSelection(routeFiles);
    deleteRouteFile(deletedRouteFileName);
    updateAppFile(deletedRouteFileName);
  } catch (error) {
    console.error(error.message);
  }
}

// Call the deleteRoute function to start the process
deleteRoute();
