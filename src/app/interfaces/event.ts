export interface User {
    id: string;
    email: string;
    createdAt: string;
    lastLoginAt: string;
    refreshToken: string;
    accessToken: string;
    expirationTime: number;
}

export interface Event {
    date_created: number;
    event_code: string;
}

export interface EventSettings {
    event_code: string;
    event_type: string;
    is_published: boolean;
    title: string;
    description: string;
    start_date: string;
    end_date: string;
    signIn: boolean;
    signUp: boolean;
    event_languages: string[];
    event_default_lang: string;
    event_lang: string;
    custom_css: string;
    custom_js: string;
}

export interface EventFeatures {

}

export interface EventDesign {
    colors: {
        primary_background: string;
        primary_color: string;
    };
    icon_img: string;
    cover_img: string;
}

export interface EventTranslations {

}
