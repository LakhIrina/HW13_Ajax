function statusSuccess(data){
    console.log('Success ', data);
};
function statusError(status) {
    console.log('Something went wrong.', status);
};

function getJSON(url, successHandler, errorHandler) {
    var xhr = typeof XMLHttpRequest !== 'undefined'
        ? new XMLHttpRequest()
        : new ActiveXObject('Microsoft.XMLHTTP');

    xhr.open('GET', url);
    var log = document.getElementById("log");

    xhr.onreadystatechange = function () {
        var status;
        var arrayData;
        var keys;
        var logItem;

        if (xhr.readyState === XMLHttpRequest.DONE) {
            status = xhr.status;

            if (status === 200) {
                var innerHtml = "";
                console.log(xhr.responseText);
                arrayData = JSON.parse(xhr.responseText);

                arrayData.forEach((function (element) {

                    keys = Object.keys(element);
                    logItem = "<span>";
                    keys.forEach(function (key) {
                        logItem += key + ': ' + element[key] + '; ';
                    });
                    logItem += "</span><br> ";
                    innerHtml += logItem;
                }));
                log = log.innerHTML = innerHtml;

                successHandler && successHandler(arrayData);
            } else {
                errorHandler && errorHandler(status);
            }
        }
    };

    xhr.send();
};

window.addEventListener("load", getJSON('http://localhost:3000/posts', statusSuccess, statusError),  false);


function postJSON(url) {

    var xhr = typeof XMLHttpRequest !== 'undefined'
        ? new XMLHttpRequest()
        : new ActiveXObject('Microsoft.XMLHTTP');

    xhr.open('POST', 'http://localhost:3000/posts', true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify({title: 'PostLog', author: 'Vasia'}));

    xhr.onreadystatechange = function () {
        var status;
        var data;

        if (xhr.readyState === XMLHttpRequest.DONE) {
            status = xhr.status;

            if (status === 201) {

                data = JSON.parse(xhr.responseText);
                console.log('Succes ', data);

            } else {
                console.log('Error ', status);
            }
        }
    };
}

document.getElementById("create").addEventListener("click", postJSON, false);