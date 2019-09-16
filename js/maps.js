const mapPack = [
    [
        // 0  1  2  3  4  5  6  7  8  9  10 11   12   13  14    10   16   17  18   19   20    21  22  24  24      end of column
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], //0
        [1, 0, 4, 0, 0, 0, "V", 0, "D", 0, "K", 1], //1
        [1, 0, "W", "W", "W", 0, "V", 0, "L", "L", 0, 1], //2
        [1, 0, "W", "W", "W", 0, "V", 0, "L", "L", 0, 1], //3
        [1, 0, 1, 1, 1, 0, "V", 0, 0, 0, 0, 1], //4
        ["X", 0, 3, 10, 1, 0, "B", 0, 0, 0, 0, 7], //5
        [1, 0, 1, 1, 1, 0, "V", 0, 0, 0, 0, 1], //5
        [1, 0, "A", "A", "A", 0, "V", 1, 1, 1, 1, 1], //6
        [1, 0, "A", "A", "A", 0, "V", 0, 0, 6, 0, 1], //7
        [1, 0, 3, 0, 0, 0, "V", 0, 0, 0, 10, 1], //8
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]  //9
    ]
]


/*
// MAP Notation
// 0=floor
// 1=wall
// 2=door
// 3=locked door
// "A"...."Z" =  exit doors (store location) //use to trigger rerender of map
// 10...."" tunnels made in pairs (Lowercase -intra maps)
// 6 = treasure
// 7 = exit
// "L" = lava
// "W" = Water
// "B" = Bridge
// "A" = Acid
// "V" = Void
*/









