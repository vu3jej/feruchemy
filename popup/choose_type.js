// Listen to the clicks of the buttons, and send appropriate message
// to the content script in the page.


function listenForClicks() {
    document.addEventListener("click", (e) => {


        function convertNameToSlug(name) {

            let slugs = new Map([
                ["Product", "product"],
                ["Product Listing", "product-listing"],
                ["Article", "article"],
                ["Other", "other"]
            ]);

            return slugs.get(name);
        }


        function sendMessageToTabs(tabs) {
            let slug = convertNameToSlug(e.target.textContent);
            browser.tabs.sendMessage(tabs[0].id, {tag_slug: slug, tag: slug});
        }


        function reportError(error) {
            console.error(`Could not save the page: ${error}`);
        }


        if (e.target.classList.contains("pagetype")) {
            browser.tabs.query({active: true, currentWindow: true})
                .then(sendMessageToTabs, reportError)
                .then(window.close)
        }
    });
}


function reportExecuteScriptError(error) {
    document.querySelector("#popup-content").classList.add("hidden");
    document.querySelector("#error-content").classList.remove("hidden");
}


var executing = browser.tabs.executeScript({file: "/content_scripts/feruchemy.js"});
executing.then(listenForClicks, reportExecuteScriptError);
