export function setup(ctx) {
    ctx.onModsLoaded((ctx) => {
        ctx.settings.section('General').add({
            type: 'number',
            name: 'clicker-ticks',
            label: 'Ticks per click min 1, max 10',
            default: 1,
            min: 1,
            max: 10
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
            "b_magic"
        ];
        buttonPages.forEach(createButton)



        function createButton(skillName){  
            const clickerTicks = ctx.settings.section('General').get('clicker-ticks')
            if (!document.getElementById(skillName)) {
                let html = `
                    <div class="block block-rounded-double bg-combat-inner-dark text-center p-3">
                        <div class="row gutters-tiny">
                            <div class="col-12">
                                <button role="button" class="btn btn-xl btn-info m-1 w-100" style="height:100px" id="`+ skillName +`">
                                    Speed-up
                                </button>						
                            </div>
                        </div>
                    </div>

                `;

                // console.log(skillName.substring(1))
                var template = document.createElement('template');
                template.innerHTML = html.trim();

                let div = document.querySelector("#" + skillName.substring(2) + "-container.content");
                div.appendChild(template.content.firstChild);

                let volumeElement = document.getElementById(skillName)
                volumeElement.onclick = function () {
                    var clickerTicks = ctx.settings.section('General').get('clicker-ticks')
                    if (game.activeAction.actionTimer.ticksLeft > clickerTicks + 5) {
                        game.activeAction.actionTimer._ticksLeft = game.activeAction.actionTimer.ticksLeft - clickerTicks
                    }
                    
                    //checks if the interval got put into the negatives somehow. 
                    if (game.activeAction.actionTimer.ticksLeft < 0){
                        game.activeAction.actionTimer._ticksLeft = 10
                    }
                }

            }
        }
    });
}

