const Discord = require('discord.js')
const client = new Discord.Client();

client.on('ready',()=>{
    console.log("켜짐.")
})

let MuteRole = '721600509525622785'
let Cooltime_Mute = 1 * 1000 //밀리세컨드 
// 1초내에 칠 시 뮤트
let User_Mute_Object = {}
client.on('message', async message => {
    MuteRole=message.guild.roles.cache.find(r => r.id==MuteRole)
    const M_Author = message.author
    if (!User_Mute_Object[M_Author.id]) {
        User_Mute_Object[M_Author.id] = { time : 0, interval: null, muted : false }
    } else {
        clearInterval(User_Mute_Object[M_Author.id].interval)
        if(Cooltime_Mute <= User_Mute_Object[M_Author.id].time) {
        message.member.roles.add(MuteRole)
        User_Mute_Object[M_Author.id].muted = true
        message.reply(`전 채팅과의 시간차 ${User_Mute_Object[M_Author.id].time}ms`)
        }
        User_Mute_Object[M_Author.id].time = 0
    }
    if(!User_Mute_Object[M_Author.id].muted && !message.member.hasPermission('ADMINISTRATOR')){
        User_Mute_Object[M_Author.id].interval = setInterval(()=>{  User_Mute_Object[M_Author.id].time++  }, 1)
    }

    if(message.member.hasPermission('ADMINISTRATOR') && /!경고해제 <@!?(\d{17,19})>/g.test(message.content)) {
        const Mention_member = message.mentions.members.first()
        Mention_member.roles.remover(MuteRole)
        User_Mute_Object[Mention_member.id].muted = false
        User_Mute_Object[Mention_member.id].time = 0
        message.channel.send(`${Mention_member}, 경고 풀림 ㅊㅊ`)        
    }
})

client.login("토큰")