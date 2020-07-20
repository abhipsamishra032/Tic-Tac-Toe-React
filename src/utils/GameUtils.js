export const findWinner = boxes => {
  const winningComb = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  let winFlag = false;

  winningComb.map(comb => {
    const [a, b, c] = comb;
    if(boxes[a] && boxes[a] === boxes[b] && boxes[a] === boxes[c]) {
      winFlag = true;
    }
  });
  return winFlag;
};

export const checkAlBoxesClicked = boxes => {
  let count = 0;
  boxes.forEach(item => {
    if(item !== null) {
      count++;
    }
  });
  return count === 9 ? true : false;
};
