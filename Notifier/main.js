function script() {
    let notificationSound = new Audio("https://www.myinstants.com/media/sounds/ding-sound-effect.mp3");
    notificationSound.volume = 0;

    let previousDrops = game.combat.loot.drops.length;
    let maxDrops = game.combat.loot.maxLoot;

    let previousHealth = game.combat.player.hitpointsPercent;
    let healthThreshold = 0.6;

    function notifyLootContainerFull() {
        let drops = game.combat.loot.drops.length;

        if (drops == maxDrops && drops != previousDrops) {
            notificationSound.play();
        }

        previousDrops = drops;
    }

    function notifyLowHealth() {
        let currentHealth = game.combat.player.hitpointsPercent
        if (currentHealth < 100 * healthThreshold && currentHealth != previousHealth) {
            notificationSound.play();
        }

        previousHealth = game.combat.player.hitpointsPercent;
    }

    function injectVolumeSlider() {
        if (!document.getElementById("volume")) {
            let htmlVolumeSlider = `
				<div class="block block-rounded-double bg-combat-inner-dark text-center p-3">
					<div class="row no-gutters">
						<div class="col-12">
							<h5 class="font-w700 text-combat-smoke m-1 mb-2">Notification Volume</h5>
						</div>
					</div>
					<div class="row gutters-tiny">
						<div class="col-12">
							<input type="range" class="m-1" id="volume" min="0" max="100" style="width: 80%;">
						</div>
					</div>
				</div>
			`;

            var template = document.createElement('template');
            template.innerHTML = htmlVolumeSlider.trim();

            let combatDivs = document.querySelector("#combat-fight-container-player > div > div > div:nth-child(3) > div");
            combatDivs.appendChild(template.content.firstChild);

            let volumeElement = document.getElementById("volume")
            volumeElement.value = notificationSound.volume;

            volumeElement.addEventListener("change", function () {
                notificationSound.volume = volumeElement.value / 100;
            }, false);
        }
    }

    let intervalLoot = setInterval(notifyLootContainerFull, 100);
    let intervalHealth = setInterval(notifyLowHealth, 100);
    let intervalVolumeSlider = setInterval(injectVolumeSlider, 100);
}

function loadScript() {
    if (typeof confirmedLoaded !== typeof undefined && confirmedLoaded) {
        clearInterval(scriptLoader);
        const scriptElement = document.createElement('script');
        scriptElement.textContent = `try {(${script})();} catch (e) {console.log(e);}`;
        document.body.appendChild(scriptElement).parentNode.removeChild(scriptElement);
    }
}

const scriptLoader = setInterval(loadScript, 200);