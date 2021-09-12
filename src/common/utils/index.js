function asc(arr) {
  arr.sort(function (a, b) {
    return a - b;
  });
  return arr;
}

function quantile(ascArr, p) {
  const H = (ascArr.length - 1) * p + 1;
  const h = Math.floor(H);
  const v = +ascArr[h - 1];
  const e = H - h;
  return e ? v + e * (ascArr[h] - v) : v;
}

module.exports.prepareBoxPlotData = (rawData) => {
  const boxData = [];
  const outliers = [];
  const axisData = [];

  for (let i = 0; i < rawData.length; i++) {
    const ascList = asc(rawData[i].slice());
    axisData.push(i + '');

    const Q1 = quantile(ascList, 0.25);
    const Q2 = quantile(ascList, 0.5);
    const Q3 = quantile(ascList, 0.75);
    const min = ascList[0];
    const max = ascList[ascList.length - 1];

    const bound = 1.5 * (Q3 - Q1);

    const low = Math.max(min, Q1 - bound);
    const high = Math.min(max, Q3 + bound);

    boxData.push([low, Q1, Q2, Q3, high]);

    for (let j = 0; j < ascList.length; j++) {
      const dataItem = ascList[j];
      if (dataItem < low || dataItem > high) {
        const outlier = [i, dataItem];
        outliers.push(outlier);
      }
    }
  }

  return {
    boxData: boxData,
    outliers: outliers,
    axisData: axisData,
  };
};

module.exports.morganFormat = (tokens, req, res) =>
  [
    `[${new Date().toISOString()}]:`,
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    `${tokens['response-time'](req, res)}ms`,
  ].join(' ');
