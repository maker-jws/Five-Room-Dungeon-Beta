const statArray = [
    {
        name: "goblin",
        hp: 2,
        color: "lightgreen",
        bordercolor: "darkgreen",
        cell: 8,
        row: 5,
        map: currentMap,
        options: ["up", "down"]
    },
    {
        name: "hobgoblin",
        hp: 3,
        color: "brown",
        bordercolor: "magenta",
        cell: 10,
        row: 8,
        map: currentMap,
        options: ["left", "right"]
    },
    {
        name: "orc",
        hp: 10,
        color: "darkgreen",
        bordercolor: "green",
        cell: player.x + 6,
        row: player.y + 2,
        map: currentMap,
        options: ["left", "right", "up", "down"]
    },
    {
        name: "ooze",
        hp: 10,
        color: "darkblue",
        bordercolor: "blue",
        cell: player.x + 7,
        row: player.y + 2,
        map: currentMap,
        options: ["left", "right", "up", "down"]
    },
    {
        name: "ogre",
        hp: 10,
        color: "darkgrey",
        bordercolor: "gray",
        cell: player.x + 5,
        row: player.y + 2,
        map: currentMap,
        options: ["left", "right", "up", "down"]
    },
    // {
    //   name: "goblin2",
    //   hp: 2,
    //   color: "lightgreen",
    //   cell: 17,
    //   row: 6,
    //   map: 0
    // },
    // {
    //   name: "hobgoblin2",
    //   hp: 3,
    //   color: "brown",
    //   cell: 21,
    //   row: 19,
    //   map: 0
    // },
    // {
    //   name: "orc2",
    //   hp: 0,
    //   color: "darkgreen",
    //   cell: 9,
    //   row: 22,
    //   map: 0
    // },
    // {
    //   name: "ooze2",
    //   hp: 10,
    //   color: "darkblue",
    //   cell: 3,
    //   row: 14,
    //   map: 0
    // },
    // {
    //   name: "ogre2",
    //   hp: 10,
    //   color: "darkgrey",
    //   cell: 7,
    //   row: 7,
    //   map: 0
    // }
]