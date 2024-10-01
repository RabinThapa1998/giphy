import {  http, HttpResponse } from 'msw';
import { BASE_URL } from '@/config';

const dummyData = {
    type: 'gif',
    id: 'PgirKCKEWHXK7ox5QO',
    url: '/test.png',
    slug: 'peacocktv-downton-abbey-violet-crawley-dowager-countess-PgirKCKEWHXK7ox5QO',
    bitly_gif_url: '/test.png',
    bitly_url: '/test.png',
    embed_url: '/test.png',
    username: 'peacock',
    source: '/test.png',
    title: 'Downton Abbey Violet Crawley GIF by Peacock',
    rating: 'g',
    content_url: '',
    source_tld: 'peacocktv.com',
    source_post_url: '/test.png',
    is_sticker: 0,
    import_datetime: '2020-07-01 00:32:40',
    trending_datetime: '2024-09-27 14:18:28',
    images: {
        original: {
            height: '281',
            width: '500',
            size: '895788',
            url: '/test.png',
            mp4_size: '134757',
            mp4: '/test.png',
            webp_size: '453698',
            webp: '/test.png',
            frames: '30',
            hash: '8695243128f42b43d77b6c8ae0600834',
        },
        downsized: {
            height: '281',
            width: '500',
            size: '895788',
            url: '/test.png',
        },
        downsized_large: {
            height: '281',
            width: '500',
            size: '895788',
            url: '/test.png',
        },
        downsized_medium: {
            height: '281',
            width: '500',
            size: '895788',
            url: '/test.png',
        },
        downsized_small: {
            height: '268',
            width: '478',
            mp4_size: '134757',
            mp4: '/test.png',
        },
        downsized_still: {
            height: '281',
            width: '500',
            size: '895788',
            url: '/test.png',
        },
        fixed_height: {
            height: '200',
            width: '358',
            size: '568020',
            url: '/test.png',
            mp4_size: '97960',
            mp4: '/test.png',
            webp_size: '289596',
            webp: '/test.png',
        },
    },
};
export const handlers = [
    http.get(BASE_URL + '/gifs/trending', () => {
        return HttpResponse.json({
            data: [dummyData, dummyData, dummyData],
            meta: {
                status: 200,
                msg: 'OK',
                response_id: 'key',
            },
            pagination: {
                total_count: 3,
                count: 0,
                offset: 50,
            },
        });
    }),
    http.get(BASE_URL + '/gifs/search', async() => {
        // const url = new URL(request.url);
        // const isErrorTest = url.searchParams.has('q') && url.searchParams.get('q') === 'errorTest';
        // if (isErrorTest) {
        //     return HttpResponse.json({
        //         meta: {
        //             status: 500,
        //             msg: 'Internal Server Error',
        //             response_id: 'key',
        //         },
            
        //     });
        // }
        // await delay(2000)

        return HttpResponse.json({
            data: [dummyData, dummyData, dummyData],
            meta: {
                status: 200,
                msg: 'OK',
                response_id: 'key',
            },
            pagination: {
                total_count: 3,
                count: 0,
                offset: 50,
            },
        });
    }),
];
