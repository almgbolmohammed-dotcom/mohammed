const fs = require("fs");
const path = require("path");
const indexPath = path.resolve(__dirname, "../api-zod/src/index.ts");
const content = fs.readFileSync(indexPath, "utf8");
const fixed = content.split("\n").filter(line => !line.includes("generated/types")).join("\n");
fs.writeFileSync(indexPath, fixed);
console.log("Fixed api-zod/src/index.ts");
