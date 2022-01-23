// the word list can be found here: https://github.com/dwyl/english-words.git
const words_list_json = require("./words_dictionary.json");

export default function isValidWord(letters) {
  if (letters.length < 3) {
    return false;
  }

  return letters.toLowerCase() in words_list_json;
}
