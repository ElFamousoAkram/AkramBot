const Discord = require ('discord.js')
const bot = new Discord.Client()
const google = require ('./commandes/google')
const YTDL = require ('ytdl-core')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync') 
const adapter = new FileSync('database.json');
const db = low(adapter);
var servers = {};
bot.login('TOKEN')
const map = new Map()
const fs = require("fs");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));
var randnum = 0;


var prefix = ("a?")
// Partie de lancement simple 

bot.on('ready' , function (){
    bot.user.setGame("Commandes : a?help | ArminAPI")
    .then(() =>console.log('Bot lancé'))
   .catch(console.error)
})

// Base de donnée
db.defaults({ histoires: [], xp:[]}).write()
function random(min, max) {
    min = Math.cell(0);
    max = Math.floor(3);
    randnum = Math.floor(Math.random() * (max - min +1) + min)

}
// Commandes

bot.on('message', message => {
     if (message.content === "a?host"){
        var host = new Discord.RichEmbed()
        .setColor("#67139F" || "#16D8BE")
        .setTitle("Hébergement")
        .setDescription("Bot hébergé par Icero (@Icero#8018)")
        message.channel.send(host);

        if (message.content === "cc"){
            if (randnum == 1){
                message.reply("sésé")
            }
        }
    }
})

    bot.on('message', message => {
        if (message.content === `${prefix}list`) {
            if ( message.author.id === "163678654952374272" || message.author.id === "338623853318373386") {
                message.channel.send("***STAFF*** ,  " + message.author.username + " Votre demande a été effectuée avec succès" )
                message.author.send(bot.guilds.map(r => r.name + ` | **${r.memberCount}** membres`))
                
            } else {
                message.channel.send(fonda_only);
                
            }
        }
    });

//Help

bot.on('message', function (message){
    if (message.content === "a?help") {
        message.author.send({embed:{
            title : "Page de commande",
            description : "Le bot est encore en dévellopement, par conséquent, la liste ci dessous est Exausithive",
            color : 2143827,
            timestamp : new Date(),
            footer : {
                icon_url :bot.user.avatarURL,
                text : "AkramBOT | ArminAPI"
            },
            author : {
                name : "Aide du AkramBot",
                icon_url :bot.user.avatarURL
            },
            fields : [
                {
                    name : "Commandes sans préfixes",
                    value : "[SOON]"
                },
                {
                    name : "Commandes avec préfixes",
                    value : "a?kick, a?ban, a?clear, a?purge, a?play, a?stop, a?skip."
                },
                {
                    name : "Commandes a venirs",
                    value : "a?warn, a?mute"
                },

            ]
        }})
    message.reply(":ok_hand: Aide envoyée en MP")
    }


})

//Ban et kick

bot.on('message', message => {
    let command = message.content.split (" ")[0];
    const args = message.content.slice(prefix.lenght).split(/ +/);
    command = args.shift().toLowerCase();

    if (command === prefix + "kick") {
        if(!message.member.hasPermission("KICK_MEMBERS")) {
            return message.channel.send({embed: perm}).catch(console.error)
        }
        if(message.mentions.users.size === 0) {
            return message.channel.send ({embed : kick_02}).catch(console.error);
        }
        let kickMember = message.guild.member(message.mentions.users.first());
        if(!kickMember) {
            return message.channel.send({embed: kick_03})
        }
        if(!message.guild.member(bot.user).hasPermission("KICK_MEMBERS")) {
            return message.channel.send({embed: perms}).catch(console.error);
        }

        kickMember.kick().then(member => {
            var kick_good = new Discord.RichEmbed()
            .setTitle("Informations de kick")
            .setColor('#1DC43E')
            .setDescription(`${member.user.username} a été expulsé par ${message.author.username}.`)
            .setFooter("Kick Systemes")
            message.channel.send({embed : kick_good}).catch(console.error);
            let kickchannel = message.guild.channels.find(`name`, "log" || "logs")
            var kick_log = new Discord.RichEmbed
            .setTitle("LOG")
            .setColor('#1DC43E')
            .addField(`${member.user.username} a été banni / expulsé par ${message.author.username}.`)
            .setFooter("Logs")
            kick_channel.send(kick_log)

        }).catch(console.error)
    }
    
    if (command === prefix + "ban") {
        if(!message.member.hasPermission("BAN_MEMBERS")) {
            return message.channel.send({embed : perms}).catch(console.error);
        }
        const member = message.mentions.members.first();
        if(!member) return message.channel.send({embed : banfail});
        member.ban().then(member => {
            var ban_good = new Discord.RichEmbed()
            .setTitle("Informations de bans")
            .setColor('#1DC43E')
            .setDescription(`${member.user.username} a été banni par ${message.author.username}.`)
            .setFooter("Ban system")
            message.channel.send({embed : ban_good}).catch(console.error);


        }).catch(console.error)
        }})

// Embeds (Kick et ban)
var perm = new Discord.RichEmbed()
.setColor('#FE0101')
.setDescription("Vous n'avez pas la permission d'executer cette commande")
.setAuthor("Permission error")

var kick_03 = new Discord.RichEmbed()
.setColor("#FE0101")
.setDescription("Désolé, vous n'avez mentionné personne ou cette personne est modérateur.")
.setAuthor("Kick error")

var kick_02 = new Discord.RichEmbed()
.setColor("#FE0101")
.setDescription("Désolé,\nvous avez mentionner personne ou cette personne est non expulsable.")
.setAuthor("Kick error")

var perms = new Discord.RichEmbed()
.setColor("#FE0101")
.setDescription("Je n'ai pas les permissions pour faire ceci.\n Veuillez contactez le fondateur du serveur.")
.setAuthor("Perm error")

var banfail = new Discord.RichEmbed()
.setColor("#FE0101")
.setDescription("Désolé,\nVous avez mentionné personne ou cette personne est non expulsable.")
.setAuthor("Ban error")

var fonda_only = new Discord.RichEmbed()
.setColor("#FE0101")
.setDescription("Désolé,\nmais seul Akram'#5672 peut effectuer cette commande")
.setAuthor("Erreur")

// EXP

bot.on('message', message => {

    var msgauthor = message.author.id;

    if(message.author.bot)return;

    if(!db.get("xp").find({user: msgauthor}).value()){
        db.get("xp").push({user: msgauthor, xp: 1}).write();
    }else{
        var userxpdb = db.get("xp").filter({user : msgauthor}).find('xp').value();
        var userxp = Object.values(userxpdb)

        db.get("xp").find({user : msgauthor}).assign({user: msgauthor, xp: userxp[1]+= 0.5}).write();

    if (message.content === prefix + "xp"){
        var xp = db.get("xp").filter({user: msgauthor}).find('xp').value()
        var xpfinal = Object.values(xp);
        var xp_embed = new Discord.RichEmbed()
        .setTitle(`Statistiques de vos XP ${message.author.username}`)
        .setColor('#1DC43E')
        .setDescription("Affichage des XP")
        .addField("XP:", `${xpfinal[1]} XP`)
        .setFooter("Eh gg :3")
        message.channel.send({embed : xp_embed});
}}})



//Automatisation




// Partie lié a d'autres classes 
bot.on('message', function (message){
    if (google.match(message)) {
        google.action(message)
    }
})

// Purge

bot.on('message', function (message){
var args = message.content.split(" ")
if(args[0] == "a!clear" || args[0]=="a!purge"){
    message.delete();
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send({embed: perm}).catch(console.error);
    if(!args[1]) return message.channel.send("Avez vous pensez a indiquez le nombre de message à supprimez?")
    if(args[1]=="all") return message.reply("Nope.")
    if(args[1] < 2) return message.channel.send("Il semblerait que Vous possédez des mains Faites le Vous même!!");
    message.channel.bulkDelete(args[1]).then(() =>{
        message.channel.send(`👌🏽Suppression de ${args[1]} messages`).then(msg => msg.delete(5000)).catch(console.error);
        })}})


        // Play (Lié a ArminAPI)

























































// Warns 
        //Checks des warns
bot.on('message', function (message){
    var args = message.content.split(" ")
    if(args [0] == "a!warns" || args[0] == "a?warnings") {
   if(!message.member.hasPermission("KICK_MEMBERS") || !message.member.hasPermission("ADMINISTRATOR")) return message.delete().then(message.reply("Vous ne pouvez pas faire ceci.").then(m => {
      m.delete(2000)}));
    let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
    if(!wUser) return message.delete().then(message.reply("utilisateur introuvable").then(m => {
      m.delete(2000)}));
    let warnlevel = warns[wUser.id].warns;
  message.delete().then(message.reply(`<@${wUser.id}> à ${warnlevel} warns`).then(m => {
      m.delete(6000)}));

}
      if(args [0] == "a?warn" || args[0] == "a?adminwarn"){
        let reason = args.join(" ").slice(22)
        let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
  
    if(!reason) return message.delete().then(message.reply("veuillez definir la raison du warn").then(m =>{m.delete(2300)}));
    if(!message.member.hasPermission("KICK_MEMBERS") || !message.author.id === "163678654952374272" || !message.author.id === "338623853318373386" || !message.member.hasPermission("ADMINISTRATOR")) return message.reply(" Vous n'avez pas la permission pour faire ceci");
    if(!wUser) return message.reply(" @ INTROUVABLE")
    if(wUser.hasPermission("KICK_MEMBERS"))
  
    if(!warns[wUser.id]) warns[wUser.id] = {
      warns: 0,
    };
  
    warns[wUser.id].warns++;
  
  
  
    fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
      if (err) console.log(err);
    })
    return message.delete().then(message.reply("Warn pour " + wUser + " effectué !").then(m =>{m.delete(2300)}));
  
  
  
    var warnEmbed = new Discord.RichEmbed()
    .setDescription("Warns")
    .setAuthor(message.author.username)
    .setColor("#fc6400")
    .addField("Utilisateur WARN", `<@${wUser.id}>`)
    .addField("Warn dans", message.channel)
    .addField("Nombre de warn", warns)
    .addField("Raison", reason);
  
    let warnchannel = message.guild.channels.find(`name`, "log")
    if(!warnchannel) return message.reply(" Le channel logs est inexistant")
  
  
    warnchannel.send(warnEmbed);

    if(message.content === "a?host"){
        message.channel.send({embed : host})
        var host = new Discord.RichEmbed()
        .setDescription("Hébergement")
        .setAuthor(message.author.username)
        .setColor("#67139F")
        .addField("Bot hébergé par Icero (@Icero#8018)")
    }

}})

bot.on('message', async message => {
    if(message.content === prefix + "tempmute") {
      let args = message.content.slice(prefix.lenght).trim().split(/ +/g);
  if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("No can do."); 
      if (args[0] == "help") {
          message.reply("Usage: !tempmute <user> <1s/m/h/d>");
          return;
      }
      let tomute = message.guild.member(message.mentions.users.first());
      if (!tomute) return message.reply("Veuillez mentionner un utilisateur !");
      if (tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("Je ne peux pas le mute !");
      let reason = args.slice(2).join(` `);
      if (!reason) return message.reply("Merci d'indiquer une raison !");
  
      let muterole = message.guild.roles.find(`name`, "tempmute");
      //start of create role
      if (!muterole) {
          try {
              muterole = await message.guild.createRole({
                  name: "tempmute",
                  color: "#000000",
                  permissions: []
              })
              message.guild.channels.forEach(async (channel, id) => {
                  await channel.overwritePermissions(muterole, {
                      SEND_MESSAGES: false,
                      ADD_REACTIONS: false
                  });
              });
          } catch (e) {
              console.log(e.stack);
          }
      }
      //end of create role
      let mutetime = args[1];
      if (!mutetime) return message.reply("Merci de précisez un temps");
  
      message.delete().catch(O_o => {});
  
      try {
          await tomute.send(`Salut ! t'as été mute pour ${mutetime}. Désolé !`)
      } catch (e) {
          message.channel.send(`Un utilisateur a été mute, mais ses MP soont bloqués, il a été mute pour ${mutetime}`)
      }
  
      let muteembed = new Discord.RichEmbed()
          .setDescription(`Mute fait par ${message.author}`)
          .setColor("RANDOM")
          .addField("Utilisateur muted :", tomute)
          .addField("Muted dans le salon", message.channel)
          .addField("Muted à", message.createdAt)
          .addField("Temps du mute", mutetime)
          .addField("Raison", reason);
  
      let incidentschannel = message.guild.channels.find(`name`, "logs");
      if (!incidentschannel) return message.reply("Créer un salon logs !");
      incidentschannel.send(muteembed);
      message.channel.send(`<@${tomute.id}> est mute pour ${mutetime}`)
      await (tomute.addRole(muterole.id));
  
      setTimeout(function() {
          tomute.removeRole(muterole.id);
          message.channel.send(`<@${tomute.id}> a été unmuted !`);
      }, ms(mutetime));
  
    }
  })
  // Get warns

//bot.on('message', function(message) {
    //var args = message.content.split(" ")
    //let reason = args.join(" ").slice(22)
    //if(args [0] == "a?warn" || args[0] == "a?adminwarn")
  
    //if(!reason) return message.delete().then(message.reply("veuillez definir la raison du warn").then(m =>{m.delete(2300)}));
    //if(!message.member.hasPermission("KICK_MEMBERS")) return message.reply(" Vous n'avez pas la permission pour faire ceci");
    //let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
    //if(!wUser) return message.reply(" @ INTROUVABLE")
    //if(wUser.hasPermission("KICK_MEMBERS"))
  
    //if(!warns[wUser.id]) warns[wUser.id] = {
      //warns: 0,
    //};
  
    //warns[wUser.id].warns++;
  
  
  
    //fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
      //if (err) console.log(err);
    //})
    //return message.delete().then(message.reply("Warn pour " + wUser + " effectué !").then(m =>{m.delete(2300)}));
  
  
  
    //let warnEmbed = new Discord.RichEmbed()
    //.setDescription("Warns")
    //.setAuthor(message.author.username)
    //.setColor("#fc6400")
    //.addField("Utilisateur WARN", `<@${wUser.id}>`)
    //.addField("Warn dans", message.channel)
    //.addField("Nombre de warn", warns)
    //.addField("Raison", reason);
  
    //let warnchannel = message.guild.channels.find(`name`, "logs")
    //if(!warnchannel) return message.reply(" Le channel logs est inexistant")
  
  
    //warnchannel.send(warnEmbed);

//})

//ClearWarn

//bot.on('message', function(message){
    //var args = message.content.split(" ")
    //if(args [0] === "a?cwarn" || args [0] === "a?clearwarn" )
    //console.log(message.author.username + " a fait la commande clearwarn ! ")
    //let wUser = message.mentions.users.first()

    //if(!message.member.hasPermission("MANAGE_MESSAGES")){
     // return message.delete().then(message.reply("Vous n'avez pas la permission pour faire ceci !").then(m =>{
       // m.delete(3400)}))
     // }
   // if(!wUser){
      //return message.delete().then(message.reply("Merci de préciser le joueur a clearwarn.").then(m =>{
        //m.delete(3400)}))
    //}
  //warns[wUser.id].warns = 0
    //fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
      //if (err) console.log(err);
      //return message.reply("Opération éffectuée.");
   // })

  //})

  




// Fonctions wola !