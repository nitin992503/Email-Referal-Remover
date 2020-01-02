function onClickHandler(info, tab) {
    console.log('clicked')
    let str = info.linkUrl;
    console.log('clipboardContent: ' + str);
    let arr = str.split('?');
    if(arr.length > 1){
        let q = arr[1];
        let email = q.split('&').map(e=>e.split('='));
        arr.splice(1,1,email.filter(e=>e[0] == 'source' ? false : true).map(e=>e.join('=')).join('&'))
    }
    let url = arr.join('?');
    console.log(url);
    chrome.tabs.create({url},()=>{console.log('created')});
}

// Register the click handler for our context menu.
chrome.contextMenus.onClicked.addListener(onClickHandler);

// Set up the single one item "paste"
chrome.runtime.onInstalled.addListener(function(details) {
    chrome.contextMenus.create({
        'title': 'Remove referal',
        'id': 'RemoveReferal',
        'contexts': ['link']
    });
});