
/*   Enum of CSS Classes for the static elements   */
var Tiles = {
    Wall: "tile-wall",
    Space: "tile-space",
    Goal: "tile-goal"
};

/*   Enum of CSS Classes for the moving elements   */
var Entities = {
    Character: "entity-player",
    Block: "entity-block",
    BlockDone: "entity-block-goal"
};

/*  Legend
    W = Wall
    B = Movable block
    P = Player starting position
    G = Goal area for the blocks
*/

var tileMap01 = {
    width: 19,
    height: 16,
    mapGrid: [
    [[' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' ']],
    [[' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' ']],
    [[' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' ']],
    [[' '], [' '], [' '], [' '], ['W'], ['W'], ['W'], ['W'], ['W'], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' ']],
    [[' '], [' '], [' '], [' '], ['W'], [' '], [' '], [' '], ['W'], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' ']],
    [[' '], [' '], [' '], [' '], ['W'], ['B'], [' '], [' '], ['W'], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' ']],
    [[' '], [' '], ['W'], ['W'], ['W'], [' '], [' '], ['B'], ['W'], ['W'], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' ']],
    [[' '], [' '], ['W'], [' '], [' '], ['B'], [' '], ['B'], [' '], ['W'], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' ']],
    [['W'], ['W'], ['W'], [' '], ['W'], [' '], ['W'], ['W'], [' '], ['W'], [' '], [' '], [' '], ['W'], ['W'], ['W'], ['W'], ['W'], ['W']],
    [['W'], [' '], [' '], [' '], ['W'], [' '], ['W'], ['W'], [' '], ['W'], ['W'], ['W'], ['W'], ['W'], [' '], [' '], ['G'], ['G'], ['W']],
    [['W'], [' '], ['B'], [' '], [' '], ['B'], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], ['G'], ['G'], ['W']],
    [['W'], ['W'], ['W'], ['W'], ['W'], [' '], ['W'], ['W'], ['W'], [' '], ['W'], ['P'], ['W'], ['W'], [' '], [' '], ['G'], ['G'], ['W']],
    [[' '], [' '], [' '], [' '], ['W'], [' '], [' '], [' '], [' '], [' '], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W']],
    [[' '], [' '], [' '], [' '], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' ']],
    [[' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' ']],
    [[' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' ']]
    ]
};


var gameBoard = document.getElementById("game-board");
gameBoard.style.width = "950px";
gameBoard.style.height = "800px";

//Create the rows (16)
for (let index = 0; index < tileMap01.mapGrid.length; index++) {

    var row = document.createElement("div");
    row.id = "row" + index;
    document.getElementById("game-board").appendChild(row);

    //create the columns (19)
    for (let ind = 0; ind < tileMap01.mapGrid[index].length; ind++) {
        
        var column = document.createElement("div");
        column.id = row.id + "-column" + ind;
        document.getElementById(row.id).appendChild(column);

        var tile = document.getElementById(column.id);
        tile.style.width = "50px";
        tile.style.height = "50px";
        tile.style.float = "left";

        //Add the css classes to the tiles

        var value = tileMap01.mapGrid[index][ind][0];

        switch(value) {
            case 'W':
                tile.classList.add(Tiles.Wall);
                break;
            case 'B':
                tile.classList.add(Entities.Block);
                break;
            case 'P':
                tile.classList.add(Entities.Character);
                break;
            case 'G':
                tile.classList.add(Tiles.Goal);
                break;
            default:
                tile.classList.add(Tiles.Space);
        }
    }
}

var playerCurrentPositionRow = 11;
var playerCurrentPositionColumn = 11;
var gameActive = true;


window.addEventListener("keydown", move);


function move(e) {

    e.preventDefault();

    var currentPosition = "row" + playerCurrentPositionRow + "-column" + playerCurrentPositionColumn;

    if (gameActive) {

    //left
        if (e.keyCode === 37) {

            var newPosition = "row" + playerCurrentPositionRow + "-column" + (playerCurrentPositionColumn - 1);


        if (document.getElementById(newPosition).classList.contains(Entities.Block)) {

                var blockCurrentPosition = newPosition;
                var blockNewPosition = "row" + playerCurrentPositionRow + "-column" + (playerCurrentPositionColumn - 2);


                if (canMoveBlock(blockNewPosition)) {
                    
                    movePlayer(currentPosition, newPosition, 'L');
                    moveBlock(blockCurrentPosition, blockNewPosition);
                
                }  
            }
            
            else if (canMovePlayer(newPosition)) {

                
                movePlayer(currentPosition, newPosition, 'L');
                

            }
        }

        //up
        else if (e.keyCode === 38) {

            var newPosition = "row" + (playerCurrentPositionRow - 1) + "-column" + playerCurrentPositionColumn;

            
            if (document.getElementById(newPosition).classList.contains(Entities.Block)) {

                var blockCurrentPosition = newPosition;
                var blockNewPosition = "row" + (playerCurrentPositionRow -2) + "-column" + playerCurrentPositionColumn;

                
                if (canMoveBlock(blockNewPosition)) {
                    
                    
                    movePlayer(currentPosition, newPosition, 'U');
                    moveBlock(blockCurrentPosition, blockNewPosition);
                
                }  
            } else if (canMovePlayer(newPosition)) {

                movePlayer(currentPosition, newPosition, 'U');
            }
        }


        //right
        else if (e.keyCode === 39) {

            var newPosition = "row" + playerCurrentPositionRow + "-column" + (playerCurrentPositionColumn + 1);


            if (document.getElementById(newPosition).classList.contains(Entities.Block)) {

                var blockCurrentPosition = newPosition;
                var blockNewPosition = "row" + playerCurrentPositionRow + "-column" + (playerCurrentPositionColumn + 2);

                if (canMoveBlock(blockNewPosition)) {
                    
                    movePlayer(currentPosition, newPosition, 'R');
                    moveBlock(blockCurrentPosition, blockNewPosition);

                }  
            } else if (canMovePlayer(newPosition)) {

                movePlayer(currentPosition, newPosition, 'R');
            } 
        }  

        //down
        else if (e.keyCode === 40) {
            
            var newPosition = "row" + (playerCurrentPositionRow + 1) + "-column" + playerCurrentPositionColumn;

            if (document.getElementById(newPosition).classList.contains(Entities.Block)) {

                var blockCurrentPosition = newPosition;
                var blockNewPosition = "row" + (playerCurrentPositionRow + 2) + "-column" + playerCurrentPositionColumn;

                if (canMoveBlock(blockNewPosition)) {
                    
                    movePlayer(currentPosition, newPosition, 'D');
                    moveBlock(blockCurrentPosition, blockNewPosition);

                } 
            }  else if (canMovePlayer(newPosition)) {

                movePlayer(currentPosition, newPosition, 'D');

            }
        }
    }

}



function movePlayer(currentPosition, newPosition, direction) {
    document.getElementById(currentPosition).classList.remove(Entities.Character);
    document.getElementById(currentPosition).classList.add(Tiles.Space);
    document.getElementById(newPosition).classList.add(Entities.Character);
    
    switch (direction) {

        case 'L':
            playerCurrentPositionColumn--;
            break;
        case 'U':
            playerCurrentPositionRow--;
            break;
        case 'R':
            playerCurrentPositionColumn++;
            break;
        case 'D':
            playerCurrentPositionRow++;
            break;
    }      
}

function moveBlock(currentPosition, newPosition) {
    document.getElementById(currentPosition).classList.remove(Entities.Block);
    document.getElementById(currentPosition).classList.add(Tiles.Space);
    document.getElementById(newPosition).classList.add(Entities.Block);
    document.getElementById(newPosition).classList.remove(Tiles.Space);

    gameCompleted();
} 


function canMoveBlock(newPosition) {
    var element = document.getElementById(newPosition);
    if ( (element.classList.contains(Tiles.Space) || element.classList.contains(Tiles.Goal) ) 
        && !element.classList.contains(Entities.Block)) {
        return true;
    } else {
        return false;
    }
}

function canMovePlayer(newPosition) {
    var element = document.getElementById(newPosition);
    
    if (element.classList.contains(Tiles.Space) || element.classList.contains(Tiles.Goal)) {
        return true;
    } else {
        return false;
    }
}
function gameCompleted() {
    var goal1 = document.getElementById("row9-column16");
    var goal2 = document.getElementById("row9-column17");
    var goal3 = document.getElementById("row10-column16");
    var goal4 = document.getElementById("row10-column17");
    var goal5 = document.getElementById("row11-column16");
    var goal6 = document.getElementById("row11-column17");



    if(
        (goal1.classList.contains(Tiles.Goal) && goal1.classList.contains(Entities.Block)) &&
        (goal2.classList.contains(Tiles.Goal) && goal2.classList.contains(Entities.Block)) &&
        (goal3.classList.contains(Tiles.Goal) && goal3.classList.contains(Entities.Block)) &&
        (goal4.classList.contains(Tiles.Goal) && goal4.classList.contains(Entities.Block)) &&
        (goal5.classList.contains(Tiles.Goal) && goal5.classList.contains(Entities.Block)) &&
        (goal6.classList.contains(Tiles.Goal) && goal6.classList.contains(Entities.Block))
    ) {

        goal1.className = Entities.BlockDone;
        goal2.className = Entities.BlockDone;
        goal3.className = Entities.BlockDone;
        goal4.className = Entities.BlockDone;
        goal5.className = Entities.BlockDone;
        goal6.className = Entities.BlockDone;


        var currentPosition = "row" + playerCurrentPositionRow + "-column" + playerCurrentPositionColumn;

        document.getElementById(currentPosition).className = "entity-player-completed";

        gameActive = false;
    }
}
