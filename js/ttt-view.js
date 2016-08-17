const POSITIONS = [
  [0, 0],
  [0, 1],
  [0, 2],
  [1, 0],
  [1, 1],
  [1, 2],
  [2, 0],
  [2, 1],
  [2, 2]
];

var View = function (game, $el) {
  $el.append(this.setupBoard());
  this.game = game;
  this.bindEvents();
  this.grid = $el;
};

View.prototype.bindEvents = function () {
  $('.square').on("click", event => {
    this.makeMove($(event.currentTarget));
  });
};

View.prototype.makeMove = function ($square) {
  try {
    const pos = $square.data("id");
    const player = this.game.currentPlayer;
    this.game.playMove(pos);
    $square.addClass(player);
    if (this.game.isOver()) {
      this.endGame(this.game.winner());
    }
  }
  catch(e) {
    alert("Square not empty!");
  }
};

View.prototype.endGame = function (winner) {
  if (winner === null) {
    const $drawClause = $(`<h2>It's a draw!</h2>`);
    this.grid.append($drawClause);
  } else {
    $(`.${winner}`).addClass("winner");
    const $winClause = $(`<h2>You win, ${winner}!</h2>`);
    this.grid.append($winClause);
  }
  $(".square").addClass("end-game");
  $(".square").off("click");
  $(".end-game").removeClass("square");
};

View.prototype.setupBoard = function () {
  const $ul = $("<ul></ul>");
  $ul.addClass("grid");
  for(let i = 0; i < 9; i++) {
    const $li = $("<li></li>");
    $li.addClass("square");
    $li.data("id", POSITIONS[i]);
    $ul.append($li);
  }
  return $ul;
};

module.exports = View;
