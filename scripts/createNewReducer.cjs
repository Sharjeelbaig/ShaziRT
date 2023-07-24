const fs = require("fs");
const path = require("path");


function createReducerFile(reducerName, initialState) {
  const reducerContent = `// src/redux/reducers/${reducerName}Reducer.ts
const initialState = ${JSON.stringify(initialState)};
interface Action {
    type: string;
    payload?: string | number;
}
function ${reducerName}Reducer(state = initialState, action: Action) {
  switch (action.type) {
    // Add your custom action cases here
    default:
      return state;
  }
}

export default ${reducerName}Reducer;
`;
  fs.writeFileSync(
    path.join(__dirname, `../src/redux/reducers/${reducerName}Reducer.ts`),
    reducerContent
  );
}


function createActionsFile(reducerName, actionTypes) {
  const actionsContent = `// src/redux/actions/${reducerName}Actions.ts
import { ${actionTypes.join(', ')} } from './actionTypes';

${actionTypes
  .map((actionType) => `export const ${actionType}Action = () => ({ type: ${actionType} });`)
  .join("\n")}
`;
  fs.writeFileSync(
    path.join(__dirname, `../src/redux/actions/${reducerName}Actions.ts`),
    actionsContent
  );
}


function appendToActionTypes(actionTypes) {
  const actionTypesContent = actionTypes
    .map((actionType) => `export const ${actionType} = '${actionType}';`)
    .join("\n");


  fs.writeFileSync(
    path.join(__dirname, "../src/redux/actions/actionTypes.ts"),
    `\n${actionTypesContent}`,
    { flag: "a" }
  );
}



function createOrUpdateStoreFile(reducerName) {
  const storeFilePath = path.join(__dirname, "../src/redux/store.ts");


  let storeContent = "";
  if (fs.existsSync(storeFilePath)) {
    storeContent = fs.readFileSync(storeFilePath, "utf8");
  }


  const importStatement = `import ${reducerName}Reducer from './reducers/${reducerName}Reducer';`;
  if (!storeContent.includes(importStatement)) {
    // Add the new reducer to the import statements
    storeContent = storeContent.replace(
      /import { createStore, combineReducers } from 'redux';/,
      `$&\n${importStatement}`
    );


    storeContent = storeContent.replace(
      /const rootReducer = combineReducers\({/,
      `$&\n  ${reducerName}: ${reducerName}Reducer,`
    );


    fs.writeFileSync(storeFilePath, storeContent);
  }
}


const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

readline.question("Enter reducer name: ", (reducerName) => {
  readline.question(
    "Enter initial state (as a valid JSON object): ",
    (initialState) => {
      try {
        initialState = JSON.parse(initialState);
      } catch (error) {
        console.error(
          "Invalid initial state. Please provide a valid JSON object."
        );
        readline.close();
        return;
      }

      readline.question(
        "Enter actionTypes (comma-separated without spaces): ",
        (actionTypesInput) => {
          const actionTypes = actionTypesInput
            .split(",")
            .map((actionType) => actionType.trim());


          createReducerFile(reducerName, initialState);


          createActionsFile(reducerName, actionTypes);


          appendToActionTypes(actionTypes);


          createOrUpdateStoreFile(reducerName);

          console.log(
            "Reducer and related files created/updated successfully."
          );

          readline.close();
        }
      );
    }
  );
});
