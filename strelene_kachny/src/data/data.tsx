import { Card, duckCard } from '../types';

export const data: Card[] = [
    {id: 1, name: "ZAMERIT", description: "Umístěte kartu zaměřovače nad jednu libovolnou kartu oblohy", type: "Action", img: "strelene_kachny\src\img\action\Zamirit.svg", position: 1},
    {id: 2, name: "VYSTRELIT", description: "Vystřelte na jednu kartu oblohy", type: "Action", img: "strelene_kachny\src\img\action\Vystrelit.svg", position: 2},
    {id: 3, name: "DVOUTA_TREFA", description: "Vystřelte na dvě karty oblohy", type: "Action", img: "strelene_kachny\src\img\action\Dvojita trefa.svg", position: 3},
    {id: 4, name: "JEJDA_VEDELE", description: "Všechny hráče se podívají na kartu jednoho hráče", type: "Action", img: "strelene_kachny\src\img\action\Jejda vedele.svg", position: 4},
    {id: 5, name: "STRELEJ_VPRAVO", description: "Vystřelte na kartu hráče vpravo", type: "Action", img: "strelene_kachny\src\img\action\Strelej vpravo.svg", position: 5},
    {id: 6, name: "STRELEJ_VLEVO", description: "Vystřelte na kartu hráče vlevo", type: "Action", img: "strelene_kachny\src\img\action\Strelej vlevo.svg", position: 6},
    {id: 7, name: "DVOJITA_HROZBA", description: "Zaměřte dvě karty oblohy", type: "Action", img: "strelene_kachny\src\img\action\Dvojita hrozba.svg", position: 7},
    {id: 8, name: "DIVOKEJ_BILL", description: "Vystřelte na kartu oblohy a na kartu hráče", type: "Action", img: "strelene_kachny\src\img\action\Divokej Bill.svg", position: 8},
    {id: 9, name: "KACHNI_POCHOD", description: "Posuňte kachnu o jedno pole vpřed", type: "Movement", img: "strelene_kachny\src\img\movement\Kachni pochod.svg", position: 9},
    {id: 10, name: "LEHARO", description: "Schovejte kachnu pod stůl", type: "Movement", img: "strelene_kachny\src\img\movement\Leharo.svg", position: 10},
    {id: 11, name: "CHVATAM", description: "Vezměte si kartu z oblohy", type: "Movement", img: "strelene_kachny\src\img\movement\Chvatam.svg", position: 11},
    {id: 12, name: "ROSAMBO", description: "Zahrajte kámen, nůžky nebo papír", type: "Movement", img: "strelene_kachny\src\img\movement\Rosambo.svg", position: 12},
    {id: 13, name: "TURBOKACHNA", description: "Posuňte kachnu o dvě pole vpřed", type: "Movement", img: "strelene_kachny\src\img\movement\Turbo kachna.svg", position: 13},
    {id: 14, name: "KACHNI_TANEC", description: "Vyměňte kachnu s kachnou hráče vpravo", type: "Movement", img: "strelene_kachny\src\img\movement\Kachni tanec.svg", position: 14},
    {id: 15, name: "ZIVY_STIT", description: "Ochrání vás před kartou oblohy", type: "Defense", img: "strelene_kachny\src\img\defense\Zivy stit.svg", position: 15},
    {id: 16, name: "KACHNI_UNIK", description: "Ochrání vás před kartou oblohy", type: "Defense", img: "strelene_kachny\src\img\defense\Kachni unik.svg", position: 16},
]

export const duck: duckCard[] = [
    {id: 1, color: "Modrá", isDead: false, isHidden: true, img: "strelene_kachny\src\img\ducks\Modrá Kachna.svg"},
    {id: 2, color: "Zelená", isDead: false, isHidden: true, img: "strelene_kachny\src\img\ducks\Zelená Kachna.svg"},
    {id: 3, color: "Žlutá", isDead: false, isHidden: true, img: "strelene_kachny\src\img\ducks\Žlutá Kachna.svg"},
    {id: 4, color: "Fialová", isDead: false, isHidden: false, img: "strelene_kachny\src\img\ducks\Fiolová Kachna.svg"},
    {id: 5, color: "Řůžová", isDead: false, isHidden: false, img: "strelene_kachny\src\img\ducks\Růžová Kachna.svg"},
    {id: 6, color: "Orandžová", isDead: false, isHidden: false, img: "strelene_kachny\src\img\ducks\Orandžová Kachna.svg"},
    {id: 7, color: "Empty", isDead: false, isHidden: false, img: "strelene_kachny\src\img\ducks\Empty.svg"},
]

export default data;