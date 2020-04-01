import {useLocation} from 'react-router-dom';

export function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export function updateQueryStringParameter(uri, key, value) {
    console.log('updateQueryStringParameter', uri, key, value)
    var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
    var separator = uri.indexOf('?') !== -1 ? "&" : "?";

    if (value === "" || value === undefined || value === null) {
        const a = new URLSearchParams(uri);
        a.delete(key);
        const result = '?' + decodeURIComponent(a.toString());
        console.log('result', "uri", uri, "resultUri", result);

        return result;


    } else {
        if (uri.match(re)) {
            return uri.replace(re, '$1' + key + "=" + value + '$2');
        } else {
            return uri + separator + key + "=" + value;
        }

    }
}


function removeURLParameter(url, parameter) {
    //prefer to use l.search if you have a location/link object
    var urlparts = url.split('?');
    if (urlparts.length >= 2) {

        var prefix = encodeURIComponent(parameter) + '=';
        var pars = urlparts[1].split(/[&;]/g);

        //reverse iteration as may be destructive
        for (var i = pars.length; i-- > 0;) {
            //idiom for string.startsWith
            if (pars[i].lastIndexOf(prefix, 0) !== -1) {
                pars.splice(i, 1);
            }
        }

        return urlparts[0] + (pars.length > 0 ? '?' + pars.join('&') : '');
    }
    return url;
}


