/**
 * @name bd bloat hider
 * @author cameronmgj
 * @description options to hide unneccessary tabs on discord home page: shop, nitro, friends.
 * @version 1.0.0
 */

 module.exports = meta => {

    const mySettings = {friends: true, nitro: true, shop: true};
	const nativeUI = BdApi.Webpack.getModule(m => m?.FormSwitch && m.FormItem);

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
            for (const mutation of mutationsList) {`
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
	
	function ToggleSwitch(toggleSetting, label) {
	    const [enabled, toggleSetting] = useState(true);
	    return BdApi.React.createElement(nativeUI.FormSwitch, {value: toggleSetting, note: 'sub text', onChange: newValue => toggleSetting(newValue),}, label);
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

