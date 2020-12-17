const db = require('megadb');
const Discord = require('discord.js');
let levels_db = new db.crearDB("niveles");
const config = require("./config.json");
const { length } = require('ffmpeg-static');
const client = new Discord.Client();
module.exports = {
 nivelesFunc: async (message) => {
if(!levels_db.tiene(message.guild.id)) levels_db.establecer(message.guild.id,{})
if(!levels_db.tiene(`${message.guild.id}.${message.author.id}`)) levels_db.establecer(`${message.guild.id}.${message.author.id}`, {xp: 0, nivel: 1})
let { xp, nivel } = await levels_db.obtener(`${message.guild.id}.${message.author.id}`)
let randomxp   = Math.floor(Math.random() * 10) + 1
let levelup = 5 * (nivel ** 2) + 50 * nivel + 100
if(message.author.bot) return;
if(nivel >= 5){ message.member.roles.add('770672995714596884')
}
if(nivel >= 15){ message.member.roles.add('770673080866439168')
}
if(nivel >= 30){ message.member.roles.add('770673180255715330')
}
if(nivel >= 55){ message.member.roles.add('770673251344056320')
}
if(nivel >= 70){ message.member.roles.add('770673353056321586')
}
let canal = message.guild.channels.cache.get('763956039946338314')
console.log(canal)
if((xp + randomxp) >= levelup) {
  levels_db.establecer(`${message.guild.id}.${message.author.id}`, {xp: 0, nivel: parseInt(nivel+1)})
canal.send(`${message.member} Subiste al nivel: ${parseInt(nivel+1)}`)
}
    else{
   levels_db.sumar(`${message.guild.id}.${message.author.id}.xp`, randomxp)
       
      return;
       }

     },
     getRank: (users, message) => {
     let userlist = []

     for(var key in users){
      let usuario = message.guild.members.cache.has(key) ? message.guild.members.cache.get(key).user.tag : `Salio del server (${key})`
      userlist.push([usuario, users[key].nivel, users[key].xp])
      }
      
      userlist.sort((user1, user2) => {
      return user2[1] - user1[1] || user2[2] - user1[2]
      })
        return userlist
      
    }
}

////////////////////////////////////////////////


client.login(config.token)
