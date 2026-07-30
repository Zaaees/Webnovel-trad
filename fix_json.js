import fs from "fs";

const path = "f:/Dossiers Utilisateur/Desktop/Traduction Webnovel/data/projects.json";
const publicPath = "f:/Dossiers Utilisateur/Desktop/Traduction Webnovel/public/data/projects.json";

let content = fs.readFileSync(path, "utf8");

content = content.replace(/to return\.’\\",\s+"sour/g, 'to return.\'",\n        "sour');

try {
  const data = JSON.parse(content);
  console.log("JSON IS FULLY VALID AND REPAIRED!");
  fs.writeFileSync(path, JSON.stringify(data, null, 2), "utf8");
  fs.writeFileSync(publicPath, JSON.stringify(data, null, 2), "utf8");
  console.log("Files written successfully!");
} catch (e) {
  console.error("JSON Error:", e.message);
}
