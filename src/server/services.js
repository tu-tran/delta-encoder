module.exports = {
  compress: (target) => {
    const result = target.split("\n").reduce(
      ({ prev, acc }, cur) => {
        let startIndex = -1;
        for (let i = 0; i < Math.min(prev.length, cur.length); i += 1) {
          if (prev.charAt(i) !== cur.charAt(i)) {
            startIndex = i;
            break;
          }
        }

        if (startIndex === -1) {
          startIndex = cur.length ? prev.length : 0;
        }

        const next = cur.substr(startIndex, cur.length - startIndex);
        return {
          prev: cur,
          acc: `${acc}${startIndex} ${next}\n`
        };
      },
      { prev: "", acc: "" }
    );

    return result.acc.slice(0, -1);
  },

  decompress: (target) => {
    const result = target.split("\n").reduce(
      ({ prev, acc }, cur) => {
        const separatorIndex = cur.indexOf(" ");
        if (separatorIndex < 0) {
          return { prev, acc };
        }

        const deltaIndex = parseInt(cur.substr(0, separatorIndex), 10);
        const nextIndex = separatorIndex + 1;
        const next = prev.substr(0, deltaIndex) + cur.substr(nextIndex, cur.length - nextIndex);
        return { prev: next, acc: `${acc}${next}\n` };
      },
      { prev: "", acc: "" }
    );

    return result.acc.slice(0, -1);
  }
};
