import 'isomorphic-fetch';
import { appendServiceApiEndpoint } from './configOptions';

export interface ICustomFetchOptions {
    hasResult?: boolean;
    requestAction?: string;
    responseAction?: string;
    errorAction?: string;
}

export function fetcher(url: string, customOptions: ICustomFetchOptions, dispatch: any, init?: RequestInit): Promise<any> {
    let options: any = {
        mode: 'cors',
        credentials: 'omit',
        headers: {
            'Content-Type': 'application/json'
        },
        ...init
    };

    let fullUrl = appendServiceApiEndpoint(url);

    const { requestAction, responseAction, errorAction } = customOptions;

    dispatch({
        type: requestAction,
        payload: null
    });

    return fetch(fullUrl, options)
        .then(response => {
            if (response.ok) {
                if (customOptions.hasResult) {
                    return response.json().then(jsonResponse => {
                        dispatch({
                            type: responseAction,
                            payload: jsonResponse
                        });

                        return Promise.resolve(jsonResponse);
                    });
                }

                dispatch({
                    type: responseAction,
                    payload: null
                });

                Promise.resolve();
            } else {
                const error = new Error(response.statusText);

                dispatch({
                    type: errorAction,
                    payload: null
                });

                throw error;
            }
        });
}
