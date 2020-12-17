// CODIGO NO AFECTARA SU BOT, SCRIPT DE ARRANQUE

const http = require('http');
const express = require('express');
const app = express();
const config = require("./config.json");
const prefix = config.prefix;
const token = config.token;

app.use(express.static('public'));

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/", (request, response) => {
  response.sendStatus(200);
});

app.listen(process.env.PORT);

setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`); 
}, 280000);


//DESDE AQUI EMPIEZA A ESCRIBIR EL CODIGO PARA SU BOT


let Discord = require("discord.js")
let client = new Discord.Client();
let { nivelesFunc , getRank } = require("./niveles.js")
 let db = require("megadb")

client.on("ready", async() =>{
  console.log("que pro :v")
})
client.on("message", async(message) =>{
    const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const command = args.shift().toLowerCase();
  if(message.author.bot) return;
  if(!message.content.startsWith(prefix)) {
    nivelesFunc(message)
    return;
  }
  if(message.content.startsWith(prefix+"nivel")) {

    let db = require("megadb")
let niveles = new db.crearDB("niveles")
if(!niveles.tiene(`${message.guild.id}`)) return message.channel.send("Este servidor no tiene ningun usuario rankeando")
const usuario = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.member;
if(!niveles.tiene(`${message.guild.id}.${usuario.id}`)) return message.channel.send("Este usuario no cuenta con nivel ni xp")
const { xp , nivel } = await niveles.obtener(`${message.guild.id}.${usuario.id}`)
let levelup = 5 * (nivel ** 2) + 50 * nivel + 100
let embed = new Discord.MessageEmbed()
.setColor("RANDOM")
.setThumbnail(message.author.displayAvatarURL)
.setDescription(`Nivel de ${usuario}`, true)
.addField(`**XP:** `, "`"+xp+"/"+levelup+"`", true)
.addField(`**Nivel:**`, "`"+nivel+"`", true)
message.channel.send(embed)
}
if(message.content.startsWith(prefix+"lb")) {
  let db = require("megadb")
let niveles = new db.crearDB("niveles")
if(!niveles.tiene(message.guild.id)) return message.channel.send("Este servidor no tiene ningun usuario en la ranklist!")
let usuarios = getRank(await niveles.obtener(message.guild.id), message)
usuarios.map((usuario, index) => usuarios[index] = "**Usuario**: "+usuario[0]+"\n**Nivel**: "+usuario[1]+"")
let paginas = []
let cantidad = 3
while(usuarios.length > 0) {
paginas.push(usuarios.splice(0, cantidad))
}
 let embed = new Discord.MessageEmbed()
.setColor("ORANGE")
.setThumbnail(message.guild.iconURL)

if(!args[0]) {
embed.setDescription("Top niveles de "+message.guild.name+" (pagina 1/"+paginas.length+"\n\n"+paginas[0].join("\n")+"")
return message.channel.send(embed)
}
if(isNaN(!args[0])) return message.channel.send("Tienes que ingresar el numero de la pagina")
let seleccion = parseInt(args[0])
if(seleccion <= 0 || seleccion > paginas.length) return message.channel.send("La pagina "+seleccion+" no existe")

embed.setDescription("Top niveles de "+message.guild.name+" (pagina "+seleccion+"/"+paginas.length+"\n\n"+paginas[seleccion-1].join("\n")+"")
return message.channel.send(embed)

}
if(command === 'rank'){
const fetch = require("node-fetch")
let imagen = await fetch('aqui el url del fondo de tanto card png o jpg')
let usuario = message.mentions.users.first() || message.author;
const Canvas = require('canvas');
  let niveles = new db.crearDB("niveles")
  let id = new db.crearDB("Id-user")
//let prueba = niveles.ordenar(message.guild.id, usuario.id)//aquí esta error ok No se puede aceder el ususario antes :v
let rank = niveles.obtener(message.guild.id, "nivel")
//let rank1 = niveles.findIndex( )
const  height= 934, width = 282, x= 42, y=62, radius = 80;
  const canvas = Canvas.createCanvas(height, width);
  const ctx = canvas.getContext('2d');
let buffer = await imagen.buffer();
const background = await Canvas.loadImage(buffer)
ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
//ctx.fillText(`/ ${client.ssn(levelup)} XP`, 884, 165, 500)
  //Exp actual
  //ctx.fillStyle = '#23272a';
  //ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.stroke();
 ctx.beginPath()

  //ctx.arc(x+radius,y+radius, radius+3, 0, Math.PI * 2, true)
  ctx.fillStyle= '#00000'
  ctx.fill()
  ctx.lineWidth=1
  ctx.stroke()
  ctx.closePath()
  
	ctx.font = '40px Verdana'
	ctx.fillStyle = '#00000'
	ctx.fillText(usuario.username, 274, 165, 500)
  //Discriminador
  let largo= ctx.measureText(usuario.username).width
  ctx.font = '24px Verdana'
  ctx.fillStyle = '#000000'
  ctx.fillText("#"+usuario.discriminator, 274+largo+14, 165, 200)

  //ctx.save()
  //ctx.beginPath()
  //ctx.arc(x+radius, y+radius, radius, 0, Math.PI*2, true)
  //ctx.closePath()
  //ctx.clip()

const { xp , nivel } = await niveles.obtener(`${message.guild.id}.${usuario.id}`)
let levelup = 5 * (nivel ** 2) + 50 * nivel + 100
  const foto = usuario.avatarURL({ format: 'png', dynamic: false, size: 1024 });
  const avatar = await Canvas.loadImage(foto)
ctx.lineWidth = 10
  ctx.drawImage(avatar, x, y, radius*2, radius*2)
ctx.strokeRect(x, y, radius*2, radius*2)
  ctx.restore()
  ctx.font = '22px Verdana'
  ctx.fillStyle = '#7f8384'
  ctx.textAlign = "right"




   
ctx.fillRect(257, 183, 634, 38)
ctx.lineWidth = 10
ctx.fillStyle = '#FF0000'
ctx.fillRect(257, 183, xp * 634 / levelup, 38)
 ctx.strokeRect(257, 183, 634, 38)
ctx.fillStyle = '#000000'
//let rank = prueba.indexOf(`${message.guild.id}.${usuario.id}`); 
if(!niveles.tiene(`${message.guild.id}`)) return message.channel.send("Este servidor no tiene ningun usuario rankeando")
if(!niveles.tiene(`${message.guild.id}.${usuario.id}`)) return message.channel.send("Este usuario no cuenta con nivel ni xp")
  largo= ctx.measureText(`/ ${xp} XP`).width
  //ctx.fillStyle = '#ffffff'
//  ctx.fillText(client.ssn(nivel)), 884-largo-8, 165, 200)
ctx.font = '60px Verdana'
  ctx.strokeStyle = '#000000'
//  ctx.fillStyle = usuario.color[0]
  ctx.lineWidth=1
  largo = ctx.measureText(nivel).width
  ctx.strokeText(nivel, 884, 100, 400)
  ctx.fillText(nivel, 884, 100, 400)

  ctx.font = '22px Verdana'
  ctx.strokeText('LEVEL', 884-largo-5, 100, 400)
  ctx.fillText('LEVEL', 884-largo-5, 100, 400)
  largo += ctx.measureText('LEVEL').width

            
  //Rank
  ctx.font = '40px Verdana'
  ctx.strokeStyle = '#7f8384'
  ctx.fillStyle = '#7f8384'
  ctx.lineWidth=1
  ctx.strokeText("`"+xp+"/"+levelup+"`")
  ctx.fillText(+xp+"/"+levelup, 884-largo-15, 100, 400)
  largo += ctx.measureText(+xp+"/"+levelup+'  ').width

  ctx.font = '30px Verdana'
  ctx.strokeText('exp', 884-largo-2, 100, 400)
  ctx.fillText('exp', 884-largo-2, 100, 400)
  largo += ctx.measureText('exp').width



ctx.fillRect(ctx, 257, 183, 634, 38, 23,true,'#484b4e', false,'#bababa')
const attachment = new Discord.MessageAttachment(
    canvas.toBuffer(), 'Niveles-Runner.jpg')
message.channel.send(attachment)

}

})
//weekly//
client.login(token)
