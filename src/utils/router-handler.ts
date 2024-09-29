
const getQueryParams = () => {
    const params = new URLSearchParams(window.location.search);
    return params;
};

const setQueryParams = (params:{
    [key:string]:string
}) => {
    const newParams = new URLSearchParams(window.location.search);
        for( const [key,value] of Object.entries(params)  ){
            newParams.set(key,value);
        }
    window.history.pushState(null, '', '?' + newParams.toString());
};

export {getQueryParams, setQueryParams}