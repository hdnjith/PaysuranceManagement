//import config from "react-global-configuration";
//import { AESEncryption, AESDecryption } from "./AesUtil";
//var serviceUrl = config.get('apidomain');
//var username = config.get('username');
var username = "teller";


export const CommonGet = (url, queryString) => {

   // console.log(url);
   // console.log(queryString);
    return new Promise((resolve, reject) => {
      
        let request  = new XMLHttpRequest();
        if (queryString != null) {
            queryString = queryString + '&username=' + username;
            request.open("GET",  url +"?"+ queryString);
        } else {

            queryString = 'username=' + username;
           // console.log('in get: ' + queryString);

            request.open("GET",  url + "?" + queryString);
        }

        request.setRequestHeader("Content-type", "application/json; charset=utf-8");
       // request.setRequestHeader('Authorization', 'Bearer ' + window.access_token);
        request.setRequestHeader('Access-Control-Allow-Methods', '*');
        request.setRequestHeader('Accept-Language', 'en-US');  
     //   console.log('before onload');
        request.onload = () => {
            if (request.response === 'Token Time Exceed') {
                window.logout.logout();
            }
            else {
                if (request.status >= 200 && request.status < 300) {
                  //  console.log(request.response);
                    resolve(JSON.parse(request.response));
                } else {
                    reject(request.statusText);
                }
            }
        };
        request.onerror = () => {
            reject(request.statusText);
        };
        request.send();
    });
};

export const CommonPost = (url, queryString, body) => {
    const encryptedResult = JSON.stringify(body);
  //  console.log(JSON.stringify(body));
    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        if (queryString != null) {
            queryString = queryString + '&username=' + username;
            request.open("POST",  url + "?"+ queryString);
        } else {
            queryString = 'username=' + username;
            request.open("POST",  url + "?" + queryString);
        }

        request.setRequestHeader("Content-type", "application/json; charset=utf-8");
      //  request.setRequestHeader('Authorization', 'Bearer ' + window.access_token);
        request.setRequestHeader('Access-Control-Allow-Methods', '*');
        request.setRequestHeader('Accept-Language', 'en-US');
        request.onload = () => {
            if (request.response === 'Token Time Exceed') {
                window.logout.logout();
            }
            else {
                if (request.status >= 200 && request.status < 300) {
                    resolve(JSON.parse(request.response));
                 //   console.log('res');
                 //   console.log(JSON.parse(request.response));
                } else {
                    reject(request.statusText);
                }
            }
        };
        request.onerror = () => {
            reject(request.statusText);
        };
        request.send(encryptedResult);
    });
};




