import { TrendingResponse } from "../../types";
import { APP_KEY } from "../config";

export async function findAllGifs(
    query: string,
    limit: number,
    offset: number
): Promise<TrendingResponse> {
    if (!query) {
        // return fetch('http://localhost:3000/data').then((res) => res.json());
        return fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${APP_KEY}&limit=${limit}&offset=${offset}`).then((res) => res.json());
    } else {
        return fetch(
            `https://api.giphy.com/v1/gifs/search?api_key=${APP_KEY}&q=${query}&limit=${limit}&offset=${offset}`
        ).then((res) => res.json());
    }
}
