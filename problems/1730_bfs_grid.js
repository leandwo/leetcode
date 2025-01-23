const FOOD = "#";
const OBSTACLE = "X";
const PERSON = "*";

const DELTAS = [[-1, 0], [0, -1], [0, 1], [1, 0]];

/**
 * @param {string[][]} grid
 * @return {number}
 */
function getFood(grid) {
    const Y = grid.length;
    const X = grid[0].length;

    // Populate queue with food cells
    let queue = [];
    for (let y = 0; y < Y && queue.length == 0; ++y) {
        for (let x = 0; x < X; ++x) {
            if (grid[y][x] == PERSON) {
                grid[y][x] = OBSTACLE;
                queue.push(y, x);
                break;
            }
        }
    }

    // From each food cell, BFS to person
    let distance = 0;
    while (queue.length > 0) {
        ++distance;
        const nextQ = [];
        for (let i = 0; i < queue.length; i += 2) {
            const y = queue[i];
            const x = queue[i+1];
            for (let j = 0; j < DELTAS.length; ++j) {
                const y2 = y + DELTAS[j][0];
                const x2 = x + DELTAS[j][1];
                if (y2 < 0 || y2 >= Y || 
                    x2 < 0 || x2 >= X ||
                    grid[y2][x2] == OBSTACLE
                ) {
                    continue;
                }
                if (grid[y2][x2] == FOOD) {
                    return distance;
                }
                grid[y2][x2] = OBSTACLE;
                nextQ.push(y2, x2);
            }
        }
        queue = nextQ;
    }

    // No paths from food to person found
    return -1;
};