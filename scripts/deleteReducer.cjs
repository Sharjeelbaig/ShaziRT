const fs = require("fs");
const path = require("path");




function removeReducerAndActions(reducerName) {
  const reducerFilePath = path.join(
    __dirname,
    `../src/redux/reducers/${reducerName}Reducer.ts`
  );
  const actionsFilePath = path.join(
    __dirname,
    `../src/redux/actions/${reducerName}Actions.ts`
  );
  const actionTypesFilePath = path.join(
    __dirname,
    "../src/redux/actions/actionTypes.ts"
  );


  const storeFilePath = path.join(__dirname, "../src/redux/store.ts");
  let storeContent = fs.readFileSync(storeFilePath, "utf8");
  storeContent = storeContent.replace(
    `import ${reducerName}Reducer from './reducers/${reducerName}Reducer';\n`,
    ""
  );
  storeContent = storeContent.replace(
    `\n  ${reducerName}: ${reducerName}Reducer,`,
    ""
  );
  fs.writeFileSync(storeFilePath, storeContent);


  if (fs.existsSync(reducerFilePath)) {
    fs.unlinkSync(reducerFilePath);
  }
  if (fs.existsSync(actionsFilePath)) {
    fs.unlinkSync(actionsFilePath);
  }

  console.log(`Reducer "${reducerName}" and related files removed successfully.`);
}


function listReducers() {
  const reducersDirPath = path.join(__dirname, "../src/redux/reducers");
  const reducerFiles = fs.readdirSync(reducersDirPath);
  const reducerNames = reducerFiles.map((file) =>
    file.replace("Reducer.ts", "")
  );

  console.log("Available reducers:");
  reducerNames.forEach((name, index) => console.log(`${index + 1}. ${name}`));

  return reducerNames;
}


const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

const reducerNames = listReducers();

readline.question("Enter the number of the reducer you want to remove: ", (input) => {
  const reducerNumber = parseInt(input, 10);

  if (isNaN(reducerNumber) || reducerNumber < 1 || reducerNumber > reducerNames.length) {
    console.log("Invalid input. Please enter a valid number.");
    readline.close();
    return;
  }

  const reducerName = reducerNames[reducerNumber - 1];


  removeReducerAndActions(reducerName);

  readline.close();
});
