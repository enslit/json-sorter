const fs = require("fs");

class Json {
  _output = null;
  _input = null;

  constructor(filePath) {
    this._readFile(filePath);
  }

  _readFile(filePath) {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath);
      this._input = JSON.parse(data);
    } else {
      throw new Error(`File ${filePath} not found`);
    }
  }

  _getSumNumber(number) {
    return String(number)
      .split("")
      .reduce((sum, num) => sum + Number(num), 0);
  }

  _comparator(a, b, direction) {
    return direction === "DESC" ? b - a : a - b;
  }

  sort(direction = "DESC") {
    const entriesSorted = Object.entries(this._input).sort((a, b) => {
      const [stringA, numberA] = a;
      const [stringB, numberB] = b;

      const sumNumberA = this._getSumNumber(numberA);
      const sumNumberB = this._getSumNumber(numberB);

      if (sumNumberA === sumNumberB) {
        return this._comparator(stringA.length, stringB.length, direction);
      }

      return this._comparator(sumNumberA, sumNumberB, direction);
    });

    this._output = Object.fromEntries(entriesSorted);

    return this;
  }

  saveFile(fileName) {
    fs.writeFile(fileName, JSON.stringify(this._output), "utf-8", (err) => {
      if (err) throw err;
      console.log(`file ${fileName} has been created`);
    });
  }
}

module.exports = Json;
