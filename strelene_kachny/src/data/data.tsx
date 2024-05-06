import { Color } from "../types";
import blue from "../img/ducks/BLUE.jpg";
import green from "../img/ducks/GREEN.jpg";
import yellow from "../img/ducks/YELLOW.jpg";
import purple from "../img/ducks/PURPLE.jpg";
import pink from "../img/ducks/PINK.jpg";
import orange from "../img/ducks/ORANGE.jpg";
import empty from "../img/ducks/Empty.jpg";

export const duckImages: { [key in Color]: string } = {
    [Color.BLUE]: blue,
    [Color.YELLOW]: yellow,
    [Color.ORANGE]: orange,
    [Color.GREEN]: green,
    [Color.PURPLE]: purple,
    [Color.PINK]: pink,
};

export const getduckImages = (color: Color | undefined): string => {
    console.log(color)
    if (color === undefined) {
        return empty;
    }
    else {
        return duckImages[color];
    }
};