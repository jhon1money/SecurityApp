import { Slot } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
// prettier-ignore

const _layout = () => {
  return (
    <SQLiteProvider databaseName="secret.db"> 
      <Slot /> 
    </SQLiteProvider>
  );
};

export default _layout;