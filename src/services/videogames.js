import { instance_axios } from "../middlewares/axios";

const options = {
    method: 'GET',
    url: 'https://free-to-play-games-database.p.rapidapi.com/api/games',
    params: { tag: '3d.mmorpg.fantasy.pvp' },
    headers: {
        'X-RapidAPI-Key': '054da42c59msh5049a7d66b5af97p18628ejsn9c9ae8e37ba9',
        'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
    }
};

export const getVideogames = async() => {
    return instance_axios.request(options).then(response => {
        const videogames = response.data;
        return videogames;
    }).catch(error => {
        console.error(error);
    });
};