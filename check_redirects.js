function observeDOMChangesFor5Seconds() {
    const observer = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
            // 1,
            console.log('');
            console.log('#=! DOM Mutation Detected' + mutation.target + '!-#');
            
            // 2,
            console.log('\tremoved nodes:', mutation.removedNodes);
            console.log('\told val:', mutation.oldValue);
            console.log('\tprev sibs:', mutation.previousSibling);

            // 3,
            console.log('\type:', mutation.type);
            console.log('\tattr:', mutation.attributeName);
            console.log('\tattr namespace:', mutation.attributeNamespace);
            
            // 4,
            console.log('\tnew nodes:', mutation.addedNodes);
        }
    });

    // Observe the entire document for child and attribute changes
    observer.observe(document, {
        childList: true,
        subtree: true,
        attributes: true,
        characterData: true
    });

    // Stop observing after 5 seconds
    setTimeout(() => {
        observer.disconnect();
        console.log('🛑 Stopped observing DOM changes.');
    }, 5000);
}