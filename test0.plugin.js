/**
 * @name BD Hide Shop
 * @author cameronmgj
 * @description no more bloat - hides bd shop tab from main page
 * @version 0.1.0
 */
module.exports = class MyPlugin {
	constructor(meta) {
        // Initialization code
		this.initObserver();
	};
	
	//track changes to page
	initObserver() {
        const observer = new MutationObserver((mutationsList) => {
            for (const mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    // actions to take
                    this.run();
                }
            }
		});
		const targetNode = document.body; // You can specify a different target node if needed
		const config = { childList: true, subtree: true };
        observer.observe(targetNode, config);
	};
	
	//run when called
	run() {
        console.log("--hiding-shop--");
		this.shopElements = document.querySelectorAll('[role="listitem"].channel_c91bad.container_b15955, .privateChannelsHeaderContainer_c47fa9');
		const DMsIndex = Array.from(this.shopElements).findIndex(element => element.classList.contains("privateChannelsHeaderContainer_c47fa9"));
		if (DMsIndex > 2) {
			this.shopElements[2].style.display = "none";
		}
		
    }

	//run on startup
	start() {
		// Code to run when enabled
	};
	
	//run at end
    stop() {
        // Cleanup when disabled
    }	
};
	
	
/* to do:
	- add settings
	- remove nitro tab
	- remove friends tab
*/