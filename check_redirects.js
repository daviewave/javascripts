// attr types
//  - childlist: 
//      -> trigger event: changes the number of DOM elements , by adding, removing
//          - div.appendChild(script)
//          - div.appendChild(<iframe></iframe visibility: none>)
//      -> if malicious: script injection or adding DOM elements
//  - attributes
//      -> trigger event: changes/edits to existing DOM elements 
//          - link.setAttribute('href', 'new.css')
//          - div.appendChild('crossorigin', '')
//      -> if malicious: script injection or removal of auth requirements
//  - characterData
//      -> trigger event: changes/edits to #textContent
//      -> if malicious: direct manipulation
//      -> only noticiing 3 in first 5 seconds


// 2.a+b, childData & attributes
const log_mutation_field = (mut, field) => {
    if((!mut[field]) || (Array.isArray(mut[field]) && mut[field].length < 1)){
        return;
    }
    console.log(field + ": ", mut[field]);
}

const log_dom_target = (dom_elem) => {
    console.log("target dom attributes:");

    // 1, values to log regardless if empty or null
    log_dom_elem_attr(dom_elem, "attributes", false);
    log_dom_elem_attr(dom_elem, "childNodes", false);
    log_dom_elem_attr(dom_elem, "hidden", false);
    log_dom_elem_attr(dom_elem, "nodeName", false);
    log_dom_elem_attr(dom_elem, "ownerDocument", false);
    log_dom_elem_attr(dom_elem, "parentNode", false);
    log_dom_elem_attr(dom_elem, "type", false);
    log_dom_elem_attr(dom_elem, "validity", false);
    
    // 2, values to log if not null/empty
    log_dom_elem_attr(dom_elem, "nodeValue", true);
    log_dom_elem_attr(dom_elem, "files", true);
    log_dom_elem_attr(dom_elem, "form", true);
    log_dom_elem_attr(dom_elem, "formAction", true);
    log_dom_elem_attr(dom_elem, "nextSibling", true);
    log_dom_elem_attr(dom_elem, "outerHtml", false);
    log_dom_elem_attr(dom_elem, "innerHtml", false);
    log_dom_elem_attr(dom_elem, "onclick", true);
    log_dom_elem_attr(dom_elem, "textContent", true);
    log_dom_elem_attr(dom_elem, "oninput", true);
    log_dom_elem_attr(dom_elem, "role", true);
    log_dom_elem_attr(dom_elem, "onsecuritypolicyviolation", true);

    return;
}

const log_dom_elem_attr = (target_dom_elem, attr, skip_if_empty) => {
    if(target_dom_elem[attr] == null || (Array.isArray(target_dom_elem[attr]) && target_dom_elem[attr].length < 1)){
        if(skip_if_empty){
            return;
        } else {
            console.log("\t-> " + attr + ": empty");
        }
    } else {
        console.log("\t-> " + attr + ": ", target_dom_elem[attr]);
    }
}


// 2.c, characterData
const log_char_data_fields = (target) => {
    console.log("\tdata: ", target.data);
    console.log("\twhole text: ", target.wholeText);
    console.log("\tparent elem: ", target.parentElement);
    console.log("\tnode type: ", target.type);
    console.log("\tis connected: ", target.isConnected);
    console.log("\towner document: ", target.ownerDocument);
    console.log("\tprevious sib: ", target.previousSibling);
}


function observeDOMChangesFor5Seconds(seconds){
    const observer = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
            // 1, log mutation alert
            console.log('\n');
            console.log('#=! DOM Mutation Detected (' + mutation.type + ') !-#');
            console.log("target --> ", mutation.target);

            // 2, log output based on type
            switch(mutation.type){
                case 'childList':
                    log_mutation_field(mutation, "removedNodes");
                    log_mutation_field(mutation, "previousSibling");
                    log_mutation_field(mutation, "addedNodes");
                    log_mutation_field(mutation, "nextSibling");
                    log_dom_target(mutation.target);
                    break;

                case 'attributes':
                    log_mutation_field(mutation, "attributeName");
                    log_mutation_field(mutation, "attributeNamespace");
                    log_mutation_field(mutation, "oldValue");
                    log_dom_target(mutation.target);
                    break;

                case 'characterData':
                    log_char_data_fields(mutation.target);
                    break;

                default:
                    break;
            }
        }
    });


    // 3, add doc observer
    observer.observe(document, {
        childList: true,
        attributes: true,
        attributeOldValue: true,
        characterDataOldValue: true,
        characterData: true,
        subtree: true,
    });

    // 4, timer for 10 secs
    setTimeout(() => {
        observer.disconnect();
        console.log('🛑 Stopped observing DOM changes.');
    }, seconds);
}