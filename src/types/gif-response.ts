export type GifResponse = {
    data:       Gif[];
    meta:       Meta;
    pagination: Pagination;
}

export type Gif = {
    type:                       unknown;
    id:                         string;
    url:                        string;
    slug:                       string;
    bitly_gif_url:              string;
    bitly_url:                  string;
    embed_url:                  string;
    username:                   string;
    source:                     string;
    title:                      string;
    rating:                     unknown;
    content_url:                string;
    source_tld:                 string;
    source_post_url:            string;
    is_sticker:                 number;
    import_datetime:            Date;
    trending_datetime:          Date | unknown;
    images:                     Images;
    user?:                      unknown;
    analytics_response_payload: string;
    analytics:                  unknown;
    alt_text:                   string;
}



export type Images = {
    original:                 ImageOriginal;
    preview:                  Preview_Normal;
    preview_gif:              Preview_Gif;
    preview_webp:             Preview_Gif;
}

export type Preview_Gif = {
    height: string;
    width:  string;
    size:   string;
    url:    string;
}

export type Preview_Normal = {
    height:   string;
    width:    string;
    mp4_size: string;
    mp4:      string;
}

export type ImageOriginal = {
    height:    string;
    width:     string;
    size:      string;
    url:       string;
    mp4_size?: string;
    mp4?:      string;
    webp_size: string;
    webp:      string;
    frames?:   string;
    hash?:     string;
}


export type Meta = {
    status:      number;
    msg:         string;
    response_id: string;
}

export type Pagination = {
    total_count: number;
    count:       number;
    offset:      number;
}
