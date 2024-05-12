import { Color } from "../types";
import blue from "../img/ducks/BLUE.jpg";
import green from "../img/ducks/GREEN.jpg";
import yellow from "../img/ducks/YELLOW.jpg";
import purple from "../img/ducks/PURPLE.jpg";
import pink from "../img/ducks/PINK.jpg";
import orange from "../img/ducks/ORANGE.jpg";
import empty from "../img/ducks/Empty.jpg";
import zamirit from "../img/action/Zamirit.jpg";
import vystrelit from "../img/action/Vystrelit.jpg";
import dvojita_trefa from "../img/action/Dvojita Trefa.jpg";
import dvojita_hrozba from "../img/action/Dvojita hrozba.jpg";
import jejda_vedle from "../img/action/Jejda Vedle.jpg";
import strilej_vlevo from "../img/action/Strilej Vlevo.jpg";
import strilej_vpravo from "../img/action/Strilej Vpravo.jpg";
import divokej_bill from "../img/action/Divokej Bill.jpg";
import kachni_pochod from "../img/action/Kachni pochod.jpg";
import leharo from "../img/action/Leharo.jpg";
import chvatam from "../img/action/Chvatam.jpg";
import turbokachna from "../img/action/Turbokachna.jpg";
import background from "../img/rest/Background.jpg";

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

export const getActionCardImages: { [key: number]: string } = {
    [0]: zamirit,
    [1]: vystrelit,
    [2]: dvojita_hrozba,
    [3]: dvojita_trefa,
    [4]: jejda_vedle,
    [5]: strilej_vlevo,
    [6]: strilej_vpravo,
    [7]: divokej_bill,
    [8]: kachni_pochod,
    [9]: leharo,
    [10]: chvatam,
    [11]: turbokachna,
    [5000]: background,
};