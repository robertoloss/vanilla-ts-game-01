import { TILE_SIZE } from "../types.js";
function getTile(y, x) {
    return [Math.floor(y / TILE_SIZE), Math.floor(x / TILE_SIZE)];
}
function str(arr) {
    return JSON.stringify(arr);
}
export function checkPlayerCollisionsVertical(_a) {
    var player = _a.player, tilesHashMap = _a.tilesHashMap;
    var pTop = player.position.top;
    var pBottom = player.position.top + TILE_SIZE;
    var pLeft = player.position.left;
    var pRight = player.position.left + TILE_SIZE;
    var vSpeed = player.speed.vertical;
    var topLeft = getTile(pTop + vSpeed, pLeft);
    var topRight = getTile(pTop + vSpeed, pRight);
    var bottomLeft = getTile(pBottom + vSpeed, pLeft);
    var bottomRight = getTile(pBottom + vSpeed, pRight);
    var collision = {
        top: false,
        bottom: false,
    };
    function checkTile(arr) {
        return tilesHashMap[str(arr)] != undefined;
    }
    if (vSpeed < 0)
        collision.top = checkTile(topLeft) || checkTile(topRight);
    if (vSpeed > 0)
        collision.bottom = checkTile(bottomLeft) || checkTile(bottomRight);
    if (collision.top || collision.bottom) {
        player.speed.vertical = 0;
        if (collision.top) {
            player.position.top = (topLeft[0] * TILE_SIZE) + TILE_SIZE;
            console.log("top collision: ", topLeft, topRight);
        }
        else {
            player.position.top = (bottomLeft[0] * TILE_SIZE) - (TILE_SIZE + 0.5);
            //console.log("bottom collision: ", bottomLeft, bottomRight, player.speed.vertical)
        }
    }
    return collision.top || collision.bottom;
}
export function checkPlayerCollisionsHorizontal(_a) {
    var player = _a.player, tilesHashMap = _a.tilesHashMap;
    var pTop = player.position.top;
    var pBottom = player.position.top + TILE_SIZE;
    var pLeft = player.position.left;
    var pRight = player.position.left + TILE_SIZE;
    var hSpeed = player.speed.horizontal;
    var leftTop = getTile(pTop, pLeft + hSpeed);
    var leftBottom = getTile(pBottom, pLeft + hSpeed);
    var rightTop = getTile(pTop, pRight + hSpeed);
    var rightBottom = getTile(pBottom, pRight + hSpeed);
    var collision = {
        left: false,
        right: false
    };
    function checkTile(arr) {
        return tilesHashMap[str(arr)] != undefined;
    }
    if (hSpeed < 0)
        collision.left = checkTile(leftTop) || checkTile(leftBottom);
    if (hSpeed > 0)
        collision.right = checkTile(rightTop) || checkTile(rightBottom);
    if (collision.left || collision.right) {
        player.speed.horizontal = 0;
        if (collision.left) {
            player.position.left = (leftTop[1] * TILE_SIZE) + TILE_SIZE;
            console.log("left collision: ", leftTop, leftBottom);
        }
        else {
            player.position.left = rightBottom[1] * TILE_SIZE - (TILE_SIZE + 0.5);
            console.log("right collision: ", rightTop, rightBottom, player.position.left);
        }
    }
    return collision.left || collision.right;
}
