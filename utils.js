/**
 * gennerates a unique identifier as a string
 * @returns {string}  the generated uuid
 */
module.exports.uuid = function uuid() {
  let values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
  let UUID = "";
  values.forEach((x) => {
    UUID += values[Math.floor(Math.random() * (values.length - 1))].toString();
  });
  return InsertEvery(UUID, "-", 5).toUpperCase();
};

/**Inserts a specified character into a string every (freq) index of the string
 * retuns the formatted string
 * @param {string} string - the character to inser
 * @param {char} char - the character to insert
 * @param {char} freq - the frequecny to insert the char into the string
 * @returns {string}  the updated output
 */
function InsertEvery(string, char, freq) {
  let output = "";
  let i = 0;
  let n = string.length - 1;
  string.split("").forEach((el) => {
    if (i != 0 && i != n && i % freq == 0) output += char;
    else output += el;
    i++;
  });
  return output;
}

/**Attempts to JSON parse a string, if an error occurs returns null
 * @param {string} text - the text to attempt to parse
 * @returns {string | null}  the parsed text or null
 */
module.exports.tryparse = function tryparse(text) {
  try {
    return JSON.parse(text);
  } catch (error) {
    return null;
  }
};
