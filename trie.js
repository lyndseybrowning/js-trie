var app = (function() {

  var trie = {},
    words = [];

  function createTrie(dict) {

    dict.forEach(function(word) {
      if (word !== '') {
        word = word.toLowerCase();
        addNode(word);
      }
    });

    return trie;
  }

  function addNode(node) {
    node = node.split('');

    var current = trie;

    node.forEach(function(letter) {
      if (!current.hasOwnProperty(letter)) {
        current[letter] = {};
      }
      current = current[letter];
    });
    current.$ = 1;
  }

  function hasWord(word) {

    if (typeof word === 'undefined' || word === '') {
      return false;
    }

    word = word.toLowerCase();

    var i = 0,
      len = word.length,
      letter,
      cur = trie;

    for (i; i < len; i++) {
      letter = word[i];

      if (!cur.hasOwnProperty(letter)) {
        return false;
      }
      cur = cur[letter];
    }
    return cur.$ === 1;
  }

  function getSubAnagrams(word, cur, anagram) {
    cur = cur || trie;
    anagram = anagram || '';

    var i = 0,
        len = word.length,
        letter,
        results,
        curBranch;

    for (i; i<len; i++) {
        letter = word[i];
        results = anagram;

        if (cur.hasOwnProperty(letter)) {
            curBranch = cur[letter];
            results += letter;

            if (curBranch.$ === 1 && words.indexOf(results) === -1) {
              words.push(results);
            }
            getSubAnagrams(word.replace(letter, ''), curBranch, results);
        }
    }
    return words;
  }

  return {
    createTrie: createTrie,
    hasWord: hasWord,
    getSubAnagrams: getSubAnagrams
  };

})();

var trie = app.createTrie(['she', 'sh', 'he', 'hes', 'eh']);
console.log('has the word "she": ' + app.hasWord('she'));
console.log('has the word "hello": ' + app.hasWord('hello'));
console.log('sub anagrams of "she": ' + app.getSubAnagrams('she'));
