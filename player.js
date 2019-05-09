"use strict"

// Raid player object

class Player{
    constructor(uid){
        this.uid = uid;

        // active raid
        this.active = undefined;

        // raid array index;
        this.index = 0;

        //player's timezone
        this.timeZone = "Asia/Hong_Kong";
    }
    switchRaid(name, raids, resigned = false){
        // TODO: check if player is even a member of any raids

        if (name != ""){
            name = name.toLowerCase();
            index = raids.findIndex(x => x.name === name);

            if (index < 0){
                return `Raid ${name} not found`;
                //return;
            }
            else if (index > -1 && this.active.name == raids[index].name){
                return `This raid is already your active raid`;
                //return;
            }
            else if (index > -1 && raids[i].isMember(this.uid)){
                active = raids[i];
                return `Switched to raid ${name}`;
                //return;
            }
            else{
                return `You have not joined raid ${name}`;
                //return;
            }
        }

        if (raids.length == 0){
            //return `There are no raids to switch to`;
            return;
        }
        /*else if (raids.length = 1){
            //return `You are in the only existing raid`;
            return;
        }*/

        let i = this.index;
        do{
            i++;
            if (i >= raids.length){ i = 0; }
            this.index = i;
            if (raids[this.index].isMember(this.uid)){
                this.active = raids[this.index];
                if (resigned){
                    return `Switched active raid to ${name}`;
                }
                return;
            }
        } while(i != this.index);
        return `There are no raids you can switch to`;
    }
}

module.exports = Player;
