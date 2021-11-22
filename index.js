const fs = require("fs");
const path = require("path");
const EventEmitter = require("events");
const faker = require("faker");
const Json = require("./json");

const emitter = new EventEmitter();

if (!fs.existsSync(path.resolve(__dirname, "result"))) {
  fs.mkdir(path.resolve(__dirname, "result"), () => {
    emitter.emit("ready");
  });
} else {
  emitter.emit("ready");
}

const FILE_INPUT = path.resolve(__dirname, "result", "input.json");
const FILE_OUTPUT = path.resolve(__dirname, "result", "output.json");

const createJsonObject = (length) =>
  Object.fromEntries(
    new Array(length)
      .fill("")
      .map(() => [faker.name.lastName(), Math.round(Math.random() * length)])
  );

const createFile = (path, data) => {
  fs.writeFile(path, JSON.stringify(data), "utf-8", (err) => {
    if (err) throw err;

    console.log(`File ${path} has been created`);
    emitter.emit("input-file-created");
  });
};

emitter.on("ready", () => {
  createFile(FILE_INPUT, createJsonObject(1000));
});

emitter.on("input-file-created", () => {
  new Json(FILE_INPUT).sort().saveFile(FILE_OUTPUT);
});
