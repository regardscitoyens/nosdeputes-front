require("dotenv").config();
const fs = require("fs");

function main() {
  fs.cpSync(
    `${process.env.TRICOTEUSES_ASSEMBLEE_API_REPO}/prisma/models`,
    `./prisma/models`,
    { recursive: true },
    (err) => {
      if (err) {
        console.error(err);
      }
    }
  );
}

main();
