export function setup(ctx) {
    let counter = 0
    ctx.onModsLoaded((ctx) => {
        ctx.settings.section('General').add({
            type: 'number',
            name: 'clicker-ticks',
            label: 'Ticks per click min 1, max 200',
            default: 5,
            min: 1,
            max: 200
        });
        ctx.settings.section('General').add({
            type: 'number',
            name: 'button-height',
            label: 'Button Height min 50, max 1000. Requires reload',
            default: 100,
            min: 50,
            max: 1000
        });
        ctx.settings.section('General').add({
            type: 'number',
            name: 'combat-ticks',
            label: 'Number of ticks per combat action',
            default: 1,
            min: 1,
            max: 200
        });
    });
    
    ctx.onInterfaceReady(ctx => {
        //This holds all the pages we want to add the button too. the b_ is to avoid any
        //id's clashing with the base game. 
        const buttonPages = [
            "b_cooking",
            "b_woodcutting",
            "b_fishing",
            "b_astrology",
            "b_firemaking",
            "b_mining",
            "b_smithing",
            "b_thieving",
            "b_fletching",
            "b_crafting",
            "b_runecrafting",
            "b_herblore",
            "b_agility",
            "b_summoning",
            "b_magic",
            "b_combat"
        ];
        buttonPages.forEach(createButton)
    });

    function createButton(skillName) {
        var buttonHeight = ctx.settings.section('General').get('button-height')

        if (!document.getElementById(skillName)) {
            let html = `
                    <div class="block block-rounded-double bg-combat-inner-dark text-center p-3">
                        <div class="row gutters-tiny">
                            <div class="col-12">
                                <button role="button" class="btn btn-xl btn-info m-1 w-100" style="height:`+ buttonHeight + `px" id="` + skillName + `">
                                    Speed-up
                                </button>						
                            </div>
                        </div>
                    </div>

                `;

            var template = document.createElement('template');
            template.innerHTML = html.trim();

            let div = document.querySelector("#" + skillName.substring(2) + "-container.content");
            div.appendChild(template.content.firstChild);

            let volumeElement = document.getElementById(skillName)
            volumeElement.onclick = function () {
                counter++; 
                this.innerHTML = counter.toString(); 
                if(this.id == "b_combat"){
                    var clickerTicks = ctx.settings.section('General').get('combat-ticks')
                    if (game.combat.player.timers.act._ticksLeft > clickerTicks + 5) {
                        game.combat.player.timers.act._ticksLeft = game.combat.player.timers.act._ticksLeft - clickerTicks
                    } else {
                        game.combat.player.timers.act._ticksLeft = 1
                    }

                    //checks if the interval got put into the negatives somehow. 
                    if (game.combat.player.timers.act._ticksLeft < 0) {
                        game.combat.player.timers.act._ticksLeft = 10
                    }

                    //lower spawn timer if running
                    if (game.combat.spawnTimer._ticksLeft > clickerTicks * 2  + 2){
                        game.combat.spawnTimer._ticksLeft = game.combat.spawnTimer._ticksLeft - (clickerTicks * 2)
                    } else {
                        game.combat.spawnTimer._ticksLeft = 1
                    }

                } else {
                    var clickerTicks = ctx.settings.section('General').get('clicker-ticks')
                    if (game.activeAction.actionTimer.ticksLeft > clickerTicks + 5) {
                        game.activeAction.actionTimer._ticksLeft = game.activeAction.actionTimer.ticksLeft - clickerTicks
                    } else {
                        game.activeAction.actionTimer._ticksLeft = 1
                    }
    
                    //checks if the interval got put into the negatives somehow. 
                    if (game.activeAction.actionTimer.ticksLeft < 0) {
                        game.activeAction.actionTimer._ticksLeft = 10
                    }
                }
            }

        }
    }
}

