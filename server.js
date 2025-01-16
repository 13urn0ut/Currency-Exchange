const server = require("./app");
require("dotenv").config();

const port = process.env.PORT;

server.listen(port, () => console.log(`Server listening on port ${port}`));
