const permutations = (word)=>
    {
        if (word.length == 0) return [];
        let ret = [];
        if (word.length == 1) return [word];
        if (word.length == 2) return Array.from(new Set([word, word[1]+word[0]]));
        word.split('').forEach(function (chr, idx, arr) {
          var sub = [].concat(arr); // "clone" arr
          sub.splice(idx, 1);
          permutations(sub.join('')).forEach(function (perm) {
            ret.push(chr+perm);
          });
        });
      
        return Array.from(new Set(ret));
      }

      module.exports = {permutations}