// let arr = [];

// for (let i = 0; i < 16; i++) {
//   arr.push(Math.random() > 0.5 ? 1 : 0);
// }

// print(arr);

function printArr(arr) {
  let tmp = [];
  let full = [];
  arr.forEach((e, index) => {
    tmp.push(e);
    let rowLength = Math.sqrt(arr.length);
    if (index + 1 >= rowLength && (index + 1) % rowLength == 0) {
      full.push(tmp);
      tmp = [];
    }
  });
  console.log(full);
}
var cols, rows;
var w = 20;
var grid = [];
var current;
var stack = [];
function setup() {
  createCanvas(400, 400);
  cols = floor(width / w);
  rows = floor(height / w);
  frameRate(10);
  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < cols; y++) {
      let cell = new Cell(x, y);
      grid.push(cell);
    }
  }
  current = grid[0];
}

function draw() {
  background(51);
  for (let i = 0; i < grid.length; i++) {
    grid[i].show();
  }
  current.visited = true;
  //step 1
  let next = current.checkNeighbours();

  if (next) {
    next.visited = true;
    current.highlight();

    //step 2
    stack.push(current);

    //step 3
    removeWalls(current, next);

    current = next;

    //step 4
  } else if (stack.length) {
    current = stack.pop();
    current.highlight();
  }
}

function index(x, y) {
  if (x < 0 || y < 0 || x > cols - 1 || y > rows - 1) return -1;

  let index = rows * x + y;

  return index; //calculating index ias if was 2 dimensional array
}

function Cell(x, y) {
  this.x = x;
  this.y = y;
  this.walls = [true, true, true, true];
  this.visited = false;
  this.show = function() {
    let x = this.x * w;
    let y = this.y * w;
    stroke(255);
    // noFill();
    // rect(x, y, w, w);
    if (this.walls[0]) {
      line(x, y, x + w, y); //top
    }
    if (this.walls[1]) {
      line(x + w, y, x + w, y + w); //right
    }
    if (this.walls[2]) {
      line(x + w, y + w, x, y + w); //bottom
    }
    if (this.walls[3]) {
      line(x, y, x, y + w); //left
    }
    if (this.visited) {
      noStroke();
      fill(100, 100, 200);
      rect(x, y, w, w);
    }
  };
  this.highlight = function() {
    let x = this.x * w;
    let y = this.y * w;
    noStroke();
    fill(100, 122, 255);
    rect(x, y, w, w);
  };

  this.checkNeighbours = function() {
    let neighbors = [];
    let top = grid[index(x, y - 1)];
    let right = grid[index(x + 1, y)];
    let bottom = grid[index(x, y + 1)];
    let left = grid[index(x - 1, y)];

    if (top && !top.visited) {
      neighbors.push(top);
    }
    if (right && !right.visited) {
      neighbors.push(right);
    }
    if (bottom && !bottom.visited) {
      neighbors.push(bottom);
    }
    if (left && !left.visited) {
      neighbors.push(left);
    }

    if (neighbors.length > 0) {
      let r = floor(random(0, neighbors.length));
      return neighbors[r];
    } else {
      return undefined;
    }
  };
}

function removeWalls(a, b) {
  let x = a.x - b.x;
  if (x === 1) {
    a.walls[3] = false;
    b.walls[1] = false;
  } else if (x === -1) {
    a.walls[1] = false;
    b.walls[3] = false;
  }

  let y = a.y - b.y;

  if (y === 1) {
    a.walls[0] = false;
    b.walls[2] = false;
  } else if (y === -1) {
    a.walls[2] = false;
    b.walls[0] = false;
  }
}
