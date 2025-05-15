// ==UserScript==
// @name         remove page bloat
// @namespace    http://tampermonkey.net/
// @version      2025-05-15
// @description  removes dom elements that are unused and suspicious
// @author       You
// @match        https://chatgpt.com/*
// ==/UserScript==

(function() {
    'use strict';

    const wait = (s) => {
        return new Promise(resolve => setTimeout(resolve, s * 1000));
    }

    const remove_elems = (els) => {
        els.forEach(el => el.remove());
    }

    const remove_elems_with_hidden = () => {
        remove_elems(document.querySelectorAll('[class="hidden"]'));
    }

    // header functions
    const remove_empty_crossorigin_links = () => {
        let elems = document.querySelectorAll('[crossorigin=""]');
        console.log('before');
        console.log(elems);
        elems.forEach(el => el.remove());
        console.log('after');
        console.log(document.querySelectorAll('[crossorigin=""]'));
    };

    const remove_preloads = () => {
        document.querySelectorAll('[rel="preload"]').forEach(el => el.remove());
    }

    const remove_preconnects = () => {
        document.querySelectorAll('[rel="preconnect"]').forEach(el => el.remove());
    }

    const remove_nonce_scripts = () => {
        remove_elems(document.querySelectorAll('[nonce=""]'));
    };

    const remove_unneeded_metadata = () => {
        remove_elems(document.querySelectorAll('meta[name]'));
    }

    // body functions
    const clean_spans = () => {
        let spans = document.querySelectorAll('span');

        spans.forEach((s) => {
            // hidden spans
            if(s.getAttribute('class') === "hidden"){
                s.remove();
            }

//            if(s.getAttribute('class').includes("pointer-events-none")){
//               s.remove();
//            }

            //
            if(s.hasAttribute('data-radix-focus-guard')){
                s.remove();
            }
        });

        // remove_elems(document.querySelectorAll('span[class*="pointer-events-none"]'));
    }

    const remove_accessibility_elems = () => {
        remove_elems(document.querySelectorAll('[aria-live]'));
    }

    //** NOTE: when i add this function to remove the audio tag, which i suspect is a way to DOM inject, i am able to use chagpt normally on the first chat but the 2nd chat it breaks it. definitely need to examine its functionality closer 
    const remove_audio = () => {
        remove_elems(document.querySelectorAll('audio'));
    }

    const remove_left_0 = () => {
        remove_elems(document.querySelectorAll('[style*="left: 0px"]'));
    }

    const remove_pointer_events_set_to_none = () => {}

    const remove_a_tag_to_main = () => {
        remove_elems(document.querySelectorAll('a[href="#main"]'));
    }

    // 1,
    async function clean_head(){
        remove_preloads();

        await wait(1.5);
        remove_nonce_scripts();
        remove_preconnects();
        remove_accessibility_elems();
        //remove_audio();
        remove_left_0();

        await wait(2.0);
        remove_unneeded_metadata();
        remove_empty_crossorigin_links();


        await wait(3.0);
        clean_spans();
        remove_a_tag_to_main();
    }

    // 2,
    async function clean_body(){


        //await wait(2);
        clean_spans();

        // await wait(2);
    }

    console.log('runnning');
    clean_head();
    //clean_body();
})();