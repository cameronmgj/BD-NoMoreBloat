/**
 * @name TutorialPlugin2
 * @author YourName
 * @description Learning how to make BetterDiscord plugins!
 * @version 0.0.1
 */

 module.exports = meta => {

    const mySettings = {friends: true, nitro: true, shop: true};

    function buildSetting(text, key, type, value, callback = () => {}) {
        const setting = Object.assign(document.createElement("div"), {className: "setting"});
        const label = Object.assign(document.createElement("span"), {textContent: text});
        const input = Object.assign(document.createElement("input"), {type: type, name: key, value: value});
        if (type == "checkbox" && value) input.checked = true;
        input.addEventListener("change", () => {
            const newValue = type == "checkbox" ? input.checked : input.value;
            mySettings[key] = newValue;
            BdApi.Data.save(meta.name, "settings", mySettings);
            callback(newValue);
        });
        setting.append(label, input);
        return setting;
    }

	
	function initObserver() {
        const observer = new MutationObserver((mutationsList) => {
            for (const mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    // actions to take
                    run();
                }
            }
		});
		const targetNode = document.querySelector('.appAsidePanelWrapper_bd26cc');
		const config = { childList: true, subtree: true };
        observer.observe(targetNode, config);
	};
	
	//run when called
	function run() {
		if (mySettings.friends) {
			if (mySettings.nitro) {
				if (mySettings.shop) {
					/* console.log("--hiding-friends--");
					console.log("--hiding-nitro--");
					console.log("--hiding-shop--"); */
					this.shopElements = document.querySelectorAll('[role="listitem"].channel_c91bad.container_b15955, .privateChannelsHeaderContainer_c47fa9');
					const DMsIndex = Array.from(this.shopElements).findIndex(element => element.classList.contains("privateChannelsHeaderContainer_c47fa9"));
					if (DMsIndex > 0) {
						this.shopElements[2].style.display = "none";
						this.shopElements[1].style.display = "none";
						this.shopElements[0].style.display = "none";
					}
				}
				else {
					/* console.log("--hiding-friends--");
					console.log("--hiding-nitro--"); */
					this.shopElements = document.querySelectorAll('[role="listitem"].channel_c91bad.container_b15955, .privateChannelsHeaderContainer_c47fa9');
					const DMsIndex = Array.from(this.shopElements).findIndex(element => element.classList.contains("privateChannelsHeaderContainer_c47fa9"));
					if (DMsIndex > 1) {
						this.shopElements[1].style.display = "none";
						this.shopElements[0].style.display = "none";
					}
				}
			}
			else if (mySettings.shop) {
				/* console.log("--hiding-friends--");
				console.log("--hiding-shop--"); */
				this.shopElements = document.querySelectorAll('[role="listitem"].channel_c91bad.container_b15955, .privateChannelsHeaderContainer_c47fa9');
				const DMsIndex = Array.from(this.shopElements).findIndex(element => element.classList.contains("privateChannelsHeaderContainer_c47fa9"));
				if (DMsIndex > 1) {
					this.shopElements[2].style.display = "none";
					this.shopElements[0].style.display = "none";
				}
			}
			else {
				/* console.log("--hiding-friends--"); */
				this.shopElements = document.querySelectorAll('[role="listitem"].channel_c91bad.container_b15955, .privateChannelsHeaderContainer_c47fa9');
				const DMsIndex = Array.from(this.shopElements).findIndex(element => element.classList.contains("privateChannelsHeaderContainer_c47fa9"));
				if (DMsIndex > 2) {
					this.shopElements[0].style.display = "none";
				}
			}
		}
		else if (mySettings.nitro) {
			if (mySettings.shop) {
				/* console.log("--hiding-nitro--");
				console.log("--hiding-shop--"); */
				this.shopElements = document.querySelectorAll('[role="listitem"].channel_c91bad.container_b15955, .privateChannelsHeaderContainer_c47fa9');
				const DMsIndex = Array.from(this.shopElements).findIndex(element => element.classList.contains("privateChannelsHeaderContainer_c47fa9"));
				if (DMsIndex > 1) {
					this.shopElements[2].style.display = "none";
					this.shopElements[1].style.display = "none";
				}
			}
			else {
				/* console.log("--hiding-nitro--"); */
				this.shopElements = document.querySelectorAll('[role="listitem"].channel_c91bad.container_b15955, .privateChannelsHeaderContainer_c47fa9');
				const DMsIndex = Array.from(this.shopElements).findIndex(element => element.classList.contains("privateChannelsHeaderContainer_c47fa9"));
				if (DMsIndex > 2) {
					this.shopElements[2].style.display = "none";
				}
			}
		}
		else if (mySettings.shop) {
			/* console.log("--hiding-shop--"); */
			this.shopElements = document.querySelectorAll('[role="listitem"].channel_c91bad.container_b15955, .privateChannelsHeaderContainer_c47fa9');
			const DMsIndex = Array.from(this.shopElements).findIndex(element => element.classList.contains("privateChannelsHeaderContainer_c47fa9"));
			if (DMsIndex > 2) {
				this.shopElements[2].style.display = "none";
			}
		}
    };

  return {
    start: () => {
        Object.assign(mySettings, BdApi.Data.load(meta.name, "settings"));
		run();
		initObserver();
    },
    stop: () => {
    },
    getSettingsPanel: () => {
        const mySettingsPanel = document.createElement("div");
        mySettingsPanel.id = "my-settings";

        const friends = buildSetting("Friends", "friends", "checkbox", mySettings.friends, run);
		const nitro = buildSetting("Nitro", "nitro", "checkbox", mySettings.nitro, run);
        const shop = buildSetting("Shop", "shop", "checkbox", mySettings.shop, run);

        mySettingsPanel.append(friends, nitro, shop);
        return mySettingsPanel;
    }
  }
};