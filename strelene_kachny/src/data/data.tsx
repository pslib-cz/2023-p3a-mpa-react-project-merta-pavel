import { Color, Duck } from "../types";



import blue from "../img/ducks/BLUE.jpg";
import green from "../img/ducks/GREEN.jpg";
import yellow from "../img/ducks/YELLOW.jpg";
import purple from "../img/ducks/PURPLE.jpg";
import pink from "../img/ducks/PINK.jpg";
import orange from "../img/ducks/ORANGE.jpg";

export const duckImages: { id: Duck["id"], color: Color, image: string }[] = [
    {
        id: Color.BLUE,
        color: Color.BLUE,
        image: blue,
    },
    {
        id: Color.YELLOW,
        color: Color.YELLOW,
        image: yellow,
    },
    {
        id: Color.ORANGE,
        color: Color.ORANGE,
        image: orange,
    },
    {
        id: Color.GREEN,
        color: Color.GREEN,
        image: green,
    },
    {
        id: Color.PURPLE,
        color: Color.PURPLE,
        image: purple,
    },
    {
        id: Color.PINK,
        color: Color.PINK,
        image: pink,
    },
];