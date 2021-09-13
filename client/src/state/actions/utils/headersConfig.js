const headersConfig = getState => {

    let headers = {
        "Content-Type": "application/json"
    };

    const token = getState().auth.token;
    if(token) headers['x-auth-token'] = token;

    return headers;

};

export default headersConfig;