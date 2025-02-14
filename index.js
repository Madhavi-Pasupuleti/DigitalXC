const CSVHandler = require("./src/csvHandlers/csvHandler");
const SecretSanta = require("./src/secreteSanta");

const EMPLOYEES_FILE = "./src/csvData/employees.csv";
const LAST_YEAR_FILE = "./src/csvData/previousEmployees.csv";
const OUTPUT_FILE = "./src/csvData/assignmentsOutput.csv";

async function main() {
  try {
    const employees = await CSVHandler.readCSV(EMPLOYEES_FILE);
    const lastYearAssignments = await CSVHandler.readCSV(LAST_YEAR_FILE);

    const secretSanta = new SecretSanta(employees, lastYearAssignments);
    const assignments = secretSanta.assignSecretSantas();

    await CSVHandler.writeCSV(OUTPUT_FILE, assignments);
    console.log("Secret Santa assignments saved to:", OUTPUT_FILE);
  } catch (error) {
    console.error("Error:", error.message);
  }
}

main();

