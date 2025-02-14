const fs = require("fs");
const csvParser = require("csv-parser");

class CSVHandler {
  static async readCSV(filePath) {
    return new Promise((resolve, reject) => {
      const results = [];
      fs.createReadStream(filePath)
        .pipe(csvParser())
        .on("data", (data) => results.push(data))
        .on("end", () => resolve(results))
        .on("error", (err) => reject(err));
    });
  }

  static writeCSV(filePath, data) {
    try {
      if (data.length === 0) {
        throw new Error("No data to write!");
      }

      const headers = Object.keys(data[0]).join(",") + "\n";
      const rows = data.map((row) => Object.values(row).join(",")).join("\n");

      fs.writeFileSync(filePath, headers + rows, "utf8");
      console.log(`*********Output saved to*********** ${filePath}`);
    } catch (error) {
      console.error("Error writing CSV:", error.message);
    }
  }
}

module.exports = CSVHandler;