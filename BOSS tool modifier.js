// ==UserScript==
// @name         BOSS tool modifier
// @namespace    http://tampermonkey.net/
// @version      2026-01-01
// @description  modifies the UI of Boss tool to make it more efficient
// @author       Jesus + amrohtm
// @match        https://boss.amazon.com/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=amazon.com
// @grant        none
// ==/UserScript==

(function() {
    document.addEventListener('DOMContentLoaded', startUp())

    const bossToolReasons = {
        //sensitive info
    }

    function startUp() {

        setTimeout(function () {
            //make the unwanted content disappear
            let secondTableRow = document.querySelector('.main > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(2) > table:nth-child(1) > tbody:nth-child(2) > tr:nth-child(2)')
            secondTableRow.style.display = 'none';

            //unfocus single offer tab
            let singleOfferTab = document.querySelector('ul.nav.nav-tabs li.active')
            //singleOfferTab.style.display = 'none';
            singleOfferTab.classList.remove('active')
            let singleOfferDiv = document.querySelector('#blacklist-page')
            singleOfferDiv.classList.remove('active')

            //focus the bulk offer tab
            let bulkOfferTab = document.querySelector('.nav > li:nth-child(2)')
            bulkOfferTab.classList.add('active')
            let bulkOfferDiv = document.querySelector('#bulkblacklist-page')
            bulkOfferDiv.classList.add('active')

            //resize the text box
            let reasonCommentBox = document.querySelector('#BulkOfferForm > div:nth-child(14) > div:nth-child(2) > textarea:nth-child(1)')
            reasonCommentBox.style.resize = 'both';
            reasonCommentBox.style.height = '150px';
            reasonCommentBox.style.width = '900px';
            setTimeout(reasonCommentBox.focus(),500);

            //add buttons
            //    let textboxParent = reasonCommentBox.parentNode.parentNode;
            const mpButtons = ['US', 'UK', 'EG', 'AE', 'SA'];
            const buttonsDiv = document.createElement('div');
            buttonsDiv.style.display = 'flex';
            buttonsDiv.style.margin = '15px 0 20px 0';
            buttonsDiv.style.padding = '0px';
            buttonsDiv.style.border = '0px';

            for (let i = 0; i < mpButtons.length; i++) {
                const button = document.createElement('button');
                const mpName = mpButtons[i];
                button.id = mpName;
                button.textContent = mpName;
                button.label = mpName;
                button.type = 'button';
                button.style.width = '160px';
                button.style.height = '30px';
                button.style.font = '16px';
                //  button.style.padding = '5px';
                button.style.margin = '0 15px 0 0';
                button.style.backgroundColor = 'black';
                button.style.color = 'white';
                button.style.borderRadius = '5px';
                button.style.textAlign = 'center';
                button.style.display = 'flex';
                button.style.alignItems = 'center';
                button.style.justifyContent = 'center';
                button.style.gap = '8px';
                button.onclick = function () {
                    reasonCommentBox.value = bossToolReasons[mpName];
                    var region = document.querySelector('#BulkOfferForm > div:nth-child(9) > div:nth-child(2) > select:nth-child(2)')
                    region.value= mpName === 'US' ? 'NA' : 'EU';
                    region.dispatchEvent(new Event('change', { bubbles: true }));

                    var action = document.querySelector('#BulkOfferForm > div:nth-child(11) > div:nth-child(2) > select:nth-child(1)')
                    action.value = 'suspend';
                    action.dispatchEvent(new Event('change', { bubbles: true }));

                    var reasonCode = document.querySelector('#BulkOfferForm > div:nth-child(12) > div:nth-child(2) > select:nth-child(1)')
                    reasonCode.value = 'Andon Cord'
                    reasonCode.dispatchEvent(new Event('change', { bubbles: true }));


                    //after this write code to read the clipboard / entire window object and get the SIM TT's address next to this BOSS
                    //window and use it for suspending the ticket , filling up the text box and submitting the info
                    //Praise the Lord, this is above and beyond what I thought was possible. Truly, what no eye has seen, no ear has hear and no mind has comprehended, that is the
                    //very thing that the Lord keeps for those who love Him and wait upon Him. Praise the Lord!!
                    //Browser extension!!!???? Praise the Lord, this is incredible yet true!! :)
                }

                buttonsDiv.appendChild(button);
            }

            reasonCommentBox.before(buttonsDiv);


        }, 3000)
    }
})();
