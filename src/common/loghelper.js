import _ from 'lodash';
import AppConfig from '../appConfig';

export const consoleLogMsg = (msg, env) => {
    if ((AppConfig.appMode === 'local' && (env === 1 || env === 3 || env === 7))
        || (AppConfig.appMode === 'dev' && (env === 2 || env === 3 || env === 6))
        || (AppConfig.appMode === 'prod' && (env === 4 || env === 6 || env === 7))
    ) {
        console.log(msg);
    }
};

export const consoleLogData = (msg, obj, env) => {
    if ((AppConfig.appMode === 'local' && (env === 1 || env === 3 || env === 7))
        || (AppConfig.appMode === 'dev' && (env === 2 || env === 3 || env === 6))
        || (AppConfig.appMode === 'prod' && (env === 4 || env === 6 || env === 7))
    ) {
        console.log(msg, obj);
    }
};

export const consoleTime = (key, level, env) => {
    if ((AppConfig.appMode === 'local' && (env === 1 || env === 3 || env === 7))
        || (AppConfig.appMode === 'dev' && (env === 2 || env === 3 || env === 6))
        || (AppConfig.appMode === 'prod' && (env === 4 || env === 6 || env === 7))
    ) {
        console.time(_.repeat(' ', level * 2) + key)
    }
};

export const consoleTimeEnd = (key, level, env) => {
    if ((AppConfig.appMode === 'local' && (env === 1 || env === 3 || env === 7))
        || (AppConfig.appMode === 'dev' && (env === 2 || env === 3 || env === 6))
        || (AppConfig.appMode === 'prod' && (env === 4 || env === 6 || env === 7))
    ) {
        console.timeEnd(_.repeat(' ', level * 2) + key)
    }
};

export const formatUrl = (url) => {
    var result = url;
    var baseUrl = AppConfig.env('url');
    result = url.substring(baseUrl.length);
    return result.length > 50 ? result.substring(0, 50) + '...' : result;
};
