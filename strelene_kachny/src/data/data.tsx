import { Card, duckCard } from '../types';

export const data: Card[] = [
    {id: 1, name: "ZAMERIT", description: "Umístěte kartu zaměřovače nad jednu libovolnou kartu oblohy", type: "Action", img: "strelene_kachny\src\img\action\Zamirit.jpg", position: 1},
    {id: 2, name: "VYSTRELIT", description: "Vystřelte na jednu kartu oblohy", type: "Action", img: "strelene_kachny\src\img\action\Vystrelit.jpg", position: 2},
    {id: 3, name: "DVOUTA_TREFA", description: "Vystřelte na dvě karty oblohy", type: "Action", img: "strelene_kachny\src\img\action\Dvojita trefa.jpg", position: 3},
    {id: 4, name: "JEJDA_VEDELE", description: "Všechny hráče se podívají na kartu jednoho hráče", type: "Action", img: "strelene_kachny\src\img\action\Jejda vedele.jpg", position: 4},
    {id: 5, name: "STRELEJ_VPRAVO", description: "Vystřelte na kartu hráče vpravo", type: "Action", img: "strelene_kachny\src\img\action\Strelej vpravo.jpg", position: 5},
    {id: 6, name: "STRELEJ_VLEVO", description: "Vystřelte na kartu hráče vlevo", type: "Action", img: "strelene_kachny\src\img\action\Strelej vlevo.jpg", position: 6},
    {id: 7, name: "DVOJITA_HROZBA", description: "Zaměřte dvě karty oblohy", type: "Action", img: "strelene_kachny\src\img\action\Dvojita hrozba.jpg", position: 7},
    {id: 8, name: "DIVOKEJ_BILL", description: "Vystřelte na kartu oblohy a na kartu hráče", type: "Action", img: "strelene_kachny\src\img\action\Divokej Bill.jpg", position: 8},
    {id: 9, name: "KACHNI_POCHOD", description: "Posuňte kachnu o jedno pole vpřed", type: "Movement", img: "strelene_kachny\src\img\movement\Kachni pochod.jpg", position: 9},
    {id: 10, name: "LEHARO", description: "Schovejte kachnu pod stůl", type: "Movement", img: "strelene_kachny\src\img\movement\Leharo.jpg", position: 10},
    {id: 11, name: "CHVATAM", description: "Vezměte si kartu z oblohy", type: "Movement", img: "strelene_kachny\src\img\movement\Chvatam.jpg", position: 11},
    {id: 12, name: "ROSAMBO", description: "Zahrajte kámen, nůžky nebo papír", type: "Movement", img: "strelene_kachny\src\img\movement\Rosambo.jpg", position: 12},
    {id: 13, name: "TURBOKACHNA", description: "Posuňte kachnu o dvě pole vpřed", type: "Movement", img: "strelene_kachny\src\img\movement\Turbo kachna.jpg", position: 13},
    {id: 14, name: "KACHNI_TANEC", description: "Vyměňte kachnu s kachnou hráče vpravo", type: "Movement", img: "strelene_kachny\src\img\movement\Kachni tanec.jpg", position: 14},
    {id: 15, name: "ZIVY_STIT", description: "Ochrání vás před kartou oblohy", type: "Defense", img: "strelene_kachny\src\img\defense\Zivy stit.jpg", position: 15},
    {id: 16, name: "KACHNI_UNIK", description: "Ochrání vás před kartou oblohy", type: "Defense", img: "strelene_kachny\src\img\defense\Kachni unik.jpg", position: 16},
]

export const duck: duckCard[] = [
    {id: 1, color: "Modrá", isDead: false, isHidden: true, img: "strelene_kachny\src\img\ducks\Modrá Kachna.jpg"},
    {id: 2, color: "Zelená", isDead: false, isHidden: true, img: "strelene_kachny\src\img\ducks\Zelená Kachna.jpg"},
    {id: 3, color: "Žlutá", isDead: false, isHidden: true, img: "strelene_kachny\src\img\ducks\Žlutá Kachna.jpg"},
    {id: 4, color: "Fialová", isDead: false, isHidden: false, img: "strelene_kachny\src\img\ducks\Fiolová Kachna.jpg"},
    {id: 5, color: "Řůžová", isDead: false, isHidden: false, img: "strelene_kachny\src\img\ducks\Růžová Kachna.jpg"},
    {id: 6, color: "Orandžová", isDead: false, isHidden: false, img: "strelene_kachny\src\img\ducks\Orandžová Kachna.jpg"},
    {id: 7, color: "Empty", isDead: false, isHidden: false, img: "strelene_kachny\src\img\ducks\Empty.jpg"},
]

export default data;