((main) => {
    const script = document.createElement('script');
    script.textContent = `try { (${main})(); } catch (e) { console.log(e); }`;
    document.body.appendChild(script).parentNode.removeChild(script);
})(() => {

    function startAutoFarming() {
        window.maf = {}
        maf.log = (...x) => {
            console.log('Auto Fishing:', ...x);
        }

        if(!game.combat.isActive 
                && !game.cooking.isActive
                && !game.firemaking.isActive
                && !game.mining.isActive
                && !game.woodcutting.isActive
                && !game.herblore.isActive
                && !game.smithing.isActive
                && !game.runecrafting.isActive
                && !game.altMagic.isActive
                && !game.crafting.isActive
                && !game.fletching.isActive
                && !game.summoning.isActive
                && !game.fishing.isActive
                && !game.agility.isActive
                && !game.astrology.isActive)
        {
            game.cooking.start(); 
            maf.log('cooking cuz im bord');
        }
    }

    function loadScript() {
        if (typeof confirmedLoaded !== typeof undefined && confirmedLoaded) {
            // Only load script after game has opened
            clearInterval(scriptLoader);
            startAutoFarming();
        }
    }

    function loadScript() {
        if (typeof confirmedLoaded !== typeof undefined && confirmedLoaded) {
            // Only load script after game has opened
            clearInterval(scriptLoader);
            startAutoFarming();
        }
    }

    const scriptLoader = setInterval(loadScript, 200);
});