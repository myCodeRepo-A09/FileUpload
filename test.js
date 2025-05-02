function chunkArray(arr, n) {
  // Your implementation
  if (arr.length <= n) {
    return arr;
  } else {
    let chunkArr = [];
    let completeArrSize = Math.floor(arr.length / n);
    let incomplete = arr.length % n;
    let i = 0;
    let j = 0;

    while (i < completeArrSize) {
      chunkArr.push(arr.slice(j, j + n));
      j = j + n;
      i++;
    }
    if (incomplete > 0) {
      chunkArr.push(arr.slice(arr.length - incomplete, arr.length + 1));
    }
    return chunkArr;
  }
}

console.log(chunkArray([1, 2, 3, 4], 1));
