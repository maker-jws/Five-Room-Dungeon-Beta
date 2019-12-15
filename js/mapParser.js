const doorLocations = [];
const tunnelLocations = [];
let currentMap = 0;
let rows = 0;
let columns = 0;

function parseMap(map) {
  let n = 0;
  let t = 0;
  let m = currentMap;

  for (let r = 0; r < mapPack[currentMap].length; r++) {
    const row = $('<div class=" row justify-content-center mx-auto"/>');
    for (let c = 0; c < mapPack[m][r].length; c++) {
      const cell = $("<div class=cell></div>");
      cell.attr("id", `cell_${m}_${r}_${c}`);
      cell.attr("y", r);
      cell.attr("x", c);
      if (mapPack[m][r][c] === 1) {
        //wall
        cell.addClass("wall");
      } else if (mapPack[m][r][c] === 0) {
        //floor
        cell.addClass("floor");
      } else if (mapPack[m][r][c] === 3) {
        //locked door
        cell.addClass("locked");
      } else if (mapPack[m][r][c] === 4) {
        //door
        n++;
        doorLocations.push(["door:", r, c, m]);
        cell.addClass("door");
      } else if (mapPack[m][r][c] === 10) {
        //tunnel
        t++;
        tunnelLocations.push([t, r, c, m]);
        cell.addClass("tunnel");
      } else if (mapPack[m][r][c] === 6) {
        //treasure
        // cell.addClass("floor");
        cell.addClass("treasure");
      } else if (mapPack[m][r][c] === 7) {
        //goal
        cell.addClass("goal");
      } else if (mapPack[m][r][c] === "D") {
        //goal
        cell.addClass("trapped");
      } else if (mapPack[m][r][c] === "L") {
        //lava
        cell.addClass("lava");
      } else if (mapPack[m][r][c] === "W") {
        //Water
        cell.addClass("water");
      } else if (mapPack[m][r][c] === "B") {
        //Bridge
        cell.addClass("bridge");
      } else if (mapPack[m][r][c] === "A") {
        //Acid
        cell.addClass("acid");
      } else if (mapPack[m][r][c] === "V") {
        //Void
        cell.addClass("void");
      } else if (mapPack[m][r][c] === "T") {
        //Torch
        cell.addClass("torch");
      } else if (mapPack[m][r][c] === "K") {
        //Torch
        cell.addClass("key");
      } else if (mapPack[m][r][c] === "X") {
        cell.addClass("star");
      } else {
        cell.text("?");
      } // when designing maps put void as a class option
      row.append(cell);
      columns++;
    }
    rows++;
    $(`#gameboard`).append(row);
  }
}

//possible idea / render background image of grey/black map as div
/*
// MAP Notation
// 0=floor
// 1=wall
// 2=door
// 3=locked door
// 4=Unlocked door
// "A"...."Z" =  exit doors (store location) //use to trigger rerender of map
// "a"...."" tunnels made in pairs (Lowercase -intra maps)
// 6 = treasure
// 7 = exit
// "L" = lava
// "W" = Water
// "B" = Bridge
// "A" = Acid
// "V" = Void
*/
