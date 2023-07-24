const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

async function createRouteComponent(routeName) {
  const routeComponentContent = `// src/routes/${routeName}.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { startup } from '../settings/animations.json';
import { startup as startupTransition } from '../settings/transitions.json';

const ${routeName}: React.FC = () => {
  return (
    <motion.div animate={startup} transition={startupTransition}>
      <h1>${routeName} Route</h1>
    </motion.div>
  );
};

export default ${routeName};
`;

  const filePath = path.join(__dirname, `../src/routes/${routeName}.tsx`);

  try {
    await writeFileAsync(filePath, routeComponentContent);
    console.log(`Route component file created: ${filePath}`);
  } catch (err) {
    console.error('Error creating the route component file:', err);
  }
}

async function updateAppFile(routeName) {
  const appFilePath = path.join(__dirname, '../src/App.tsx');

  try {
    let appFileContent = await readFileAsync(appFilePath, 'utf8');

    const importStatement = `import ${routeName} from "./routes/${routeName}"`;
    if (!appFileContent.includes(importStatement)) {
      appFileContent = `${importStatement}\n${appFileContent}`;

      appFileContent = appFileContent.replace(
        /(<Routes>)/,
        `$&\n\t\t<Route path="/${routeName}" element={<${routeName} />} />`
      );

      await writeFileAsync(appFilePath, appFileContent);
      console.log(`App.tsx updated with the route: ${routeName}`);
    }
  } catch (err) {
    console.error('Error updating the App.tsx file:', err);
  }
}

const fileName = './src/App.tsx';
const characterToRemove = '﻿';

async function removeCharacterFromFile(fileName, characterToRemove) {
  try {
    const data = await readFileAsync(fileName, 'utf8');
    const modifiedData = data.split(characterToRemove).join('');
    await writeFileAsync(fileName, modifiedData, 'utf8');
    console.log('Character removed successfully.');
  } catch (err) {
    console.error('Error removing the character from the file:', err);
  }
}

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

readline.question('Enter route name: ', async (routeName) => {
  await createRouteComponent(routeName);
  await updateAppFile(routeName);

  console.log('Route component created and App.tsx updated successfully.');

  readline.close();
  await removeCharacterFromFile(fileName, characterToRemove);
});
