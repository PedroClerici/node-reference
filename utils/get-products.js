import fs from "node:fs";

export function getProductsFromFile(filePath, callback) {
  fs.readFile(filePath, (err, data) => {
    if (err) throw err;

    callback(JSON.parse(data), filePath);
  });
}
