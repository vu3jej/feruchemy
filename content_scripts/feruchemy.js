(function () {

    if (window.hasRun) {
        return;
    }
    window.hasRun = true;


    function saveCurrentPage(message) {
        message.text = document.body.innerText;
        message.webpage_url = window.location.href;
        message.html = document.body.innerHTML;

        makeRequest(message);
    }

    var httpRequest;


    function makeRequest(data) {
        httpRequest = new XMLHttpRequest();

        if (!httpRequest) {
            alert('Giving up :( Cannot create an XMLHTTP instance');
            return false;
        }
        httpRequest.onreadystatechange = alertContents;
        httpRequest.open("POST", "https://coppermind.herokuapp.com/webpages/", true);
        httpRequest.setRequestHeader("Content-Type", "application/json");

        httpRequest.send(JSON.stringify(data));

    }


    function alertContents() {
        try {
            if (httpRequest.readyState === XMLHttpRequest.DONE) {
                if (httpRequest.status === 201) {
                    console.log(httpRequest.responseText);
                } else {
                    console.log('There was a problem with the request.');
                }
            }
        } catch (e) {
            alert('Caught Exception: ' + e.description);
        }
    }


    browser.runtime.onMessage.addListener(saveCurrentPage);
})();
