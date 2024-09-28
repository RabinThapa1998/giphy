const isDevelopment = import.meta.env.MODE === 'development';

export const APP_KEY = isDevelopment ? import.meta.env.VITE_APP_KEY :  import.meta.env.VITE_APP_KEY ;