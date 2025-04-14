function observeDOMChangesFor5Seconds() {
    const observer = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
            // 1,
            console.log('\n');
            console.log('#=! DOM Mutation Detected (' + mutation.type + ') !-#');
            
            // 2, target 
            console.log('target elem:', mutation.target);

            
            // 3,
            if (mutation.removedNodes.length > 0) {
                mutation.removedNodes.forEach((node) => {
                    console.log("node attrs: ", node.attributeName);
                    console.log("node attrs: ", node.attributes);
                    console.log("node attrs: ", node.oldValue);
                });
                console.log('\tremoved nodes:', mutation.removedNodes);
            }
            console.log('\told val:', mutation.oldValue);
            console.log('\tprev sibs:', mutation.previousSibling);

            // 3,
            console.log('\tattr:', mutation.attributeName);
            console.log('\tattr namespace:', mutation.attributeNamespace);
            
            // 4,
            if (mutation.addedNodes.length > 0) {
                mutation.addedNodes.forEach((node) => {

                });
                console.log('\tadded nodes:', mutation.addedNodes);
            }

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