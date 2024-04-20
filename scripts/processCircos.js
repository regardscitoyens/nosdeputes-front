const fs = require("fs");

fs.readFile(`${__dirname}/circo_composition.csv`, "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const rows = data.split("\n").slice(1);
  const zip2circo = {};

  rows.forEach((line) => {
    const cells = line.split(",");
    const departement = cells[0];
    const zip = cells[4];
    // const cityName = cells[5];
    const circo = cells[6];

    if (!zip) return;

    // The circo column is the concatenation of departement number and circonscription number with some useless zeros
    const circoNumber = Number.parseInt(circo.slice(departement.length));

    if (!zip2circo[zip]) {
      zip2circo[zip] = [circoNumber];
    } else {
      zip2circo[zip].push(circoNumber);
    }
  });

  fs.writeFile(
    `./public/zip2circo.json`,
    JSON.stringify(zip2circo),
    function (err) {
      if (err) {
        return console.log(err);
      }
      console.log("The file was saved!");
    }
  );
});
