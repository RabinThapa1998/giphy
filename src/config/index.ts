const isDevelopment = import.meta.env.MODE === 'development';

export const APP_KEY = isDevelopment ? "C1vp4KblWylpNliTYW7Q7OHnEPlQWeRO" :  import.meta.env.VITE_APP_KEY ;
export const BASE_URL = 'https://api.giphy.com/v1';
