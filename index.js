const Discord = require('discord.js');
const client = new Discord.Client();
const token = process.argv.length == 2 ? process.env.token : "";
const welcomeChannelName = "안녕하세요";
const byeChannelName = "안녕히가세요";
const welcomeChannelComment = "어서오세요.";
const byeChannelComment = "안녕히가세요.";

client.on('ready', () => {
  console.log('켰다.');
  client.user.setPresence({ game: { name: '김토끼 잡일' }, status: 'online' })
});

client.on("guildMemberAdd", (member) => {
  const guild = member.guild;
  const newUser = member.user;
  const welcomeChannel = guild.channels.find(channel => channel.name == welcomeChannelName);

  welcomeChannel.send(`<@${newUser.id}> ${welcomeChannelComment}\n`);

  member.addRole(guild.roles.find(role => role.name == "게스트"));
});

client.on("guildMemberRemove", (member) => {
  const guild = member.guild;
  const deleteUser = member.user;
  const byeChannel = guild.channels.find(channel => channel.name == byeChannelName);

  byeChannel.send(`<@${deleteUser.id}> ${byeChannelComment}\n`);
});

client.on('message', (message) => {
  if(message.author.bot) return;

  if(message.content == '!김토끼') {
    return message.reply('펀,쿨,섹시한 우리만의 수장님이자 디코최고 존잘남!그리고 옷 좋아함ㅋㅋㄹ');
  }
  if(message.content == '!피베') {
    return message.reply('병ㅅ...(읍읍)');
  }
  if(message.content == '!민수') {
    return message.reply('날 만든 찐다쉑');
  }
  if(message.content == '!원핵') {
    return message.reply('롤창ㅋㅋ들어와보면 항상 롤한다고 되있음');
  }
  if(message.content == '!둠피스트') {
    return message.reply('악 더러워!');
  }
  if(message.content == '!ㄴㅇㄱ') {
    return message.reply('ㄴㅇㄱ');
  }
  if(message.content == '!토끼봇') {
    return message.reply('나다 이 씹새꺄');
  }
  if(message.content == '!민수야') {
  return message.reply('민수가 뭐지 먹는건가??');
  }
  if(message.content == '!민수님') {
    return message.reply('아 그 싸가지 없는얘?');
  }
  if(message.content == '!야짤') {
    return message.reply('https://cdn.discordapp.com/attachments/761390715670364190/766540418388459540/3.png');
  }
  if(message.content == '사랑해') {
    return message.reply('ㅈㄹ');
  }
  if(message.content == '!김토끼 얼굴') {
    return message.reply('https://media.discordapp.net/attachments/761390715670364190/767287432843886622/8.PNG');
  }
  if(message.content == '!각성한 레킹볼') {
    return message.reply('https://media.discordapp.net/attachments/761390715670364190/767287432843886622/8.PNG');
  }
  if(message.content == '!전적이') {
    return message.reply('사기꾼 쉑');
  }
  if(message.content == '!끝말잇기') {
    return message.reply('오...나한테 덤빈다고? 그럼 나부터 하지...해질녘!');
  }
  if(message.content == '!토끼봇 가입해') {
    message.channel.send('!가입');
  }
  if(message.content == '!토끼봇 동의해') {
    message.channel.send('동의');
  }
  if(message.content == '!토끼봇 도박 300') {
    message.channel.send('!ㄷㅂ 300');
  }
  if(message.content == '!김토끼 정보') {
    let img = 'https://media.discordapp.net/attachments/745482814987698290/762501940143325204/20201005_113013.jpg';
    let embed = new Discord.RichEmbed()
      .setTitle('타이틀')
      .setURL('http://www.naver.com')
      .setAuthor('14민수', img, 'http://www.naver.com')
      .setThumbnail(img)
      .addBlankField()
      .addField('김토끼 나이', '17세')
      .addField('싫어하는것', '조르기,구걸,도배', true)
      .addField('좋아하는것', '옷', true)
      
      .addField('주면 좋아하는거', '거의다')
      .addBlankField()
      .setTimestamp()
      .setFooter('14민수가 만듬', img)

    message.channel.send(embed)
  } else if(message.content == 'help') {
    let helpImg = 'https://media.discordapp.net/attachments/745482814987698290/762501940143325204/20201005_113013.jpg';
    let commandList = [
      {name: 'ping', desc: '현재 핑 상태'},
      {name: 'embed', desc: 'embed 예제1'},
      {name: 'embed2', desc: 'embed 예제2 (help)'},
      {name: '!전체공지', desc: 'dm으로 전체 공지 보내기'},
      {name: '!청소', desc: '텍스트 지움'},
    ];
    let commandStr = '';
    let embed = new Discord.RichEmbed()
      .setAuthor('Help of 콜라곰 BOT', helpImg)
      .setColor('#186de6')
      .setFooter(`콜라곰 BOT ❤️`)
      .setTimestamp()
    
    commandList.forEach(x => {
      commandStr += `• \`\`${changeCommandStringLength(`${x.name}`)}\`\` : **${x.desc}**\n`;
    });

    embed.addField('Commands: ', commandStr);

    message.channel.send(embed)
  }

  if(message.content.startsWith('!전체공지')) {
    if(checkPermission(message)) return
    if(message.member != null) { // 채널에서 공지 쓸 때
      let contents = message.content.slice('!전체공지'.length);
      message.member.guild.members.array().forEach(x => {
        if(x.user.bot) return;
        x.user.send(`<@${message.author.id}> ${contents}`);
      });
  
      return message.reply('공지를 전송했습니다.');
    } else {
      return message.reply('채널에서 실행해주세요.');
    }
  }

  if(message.content.startsWith('!청소')) {
    if(checkPermission(message)) return

    var clearLine = message.content.slice('!청소 '.length);
    var isNum = !isNaN(clearLine)

    if(isNum && (clearLine <= 0 || 100 < clearLine)) {
      message.channel.send("1부터 100까지의 숫자만 입력해주세요.")
      return;
    } else if(!isNum) { // c @나긋해 3
      if(message.content.split('<@').length == 2) {
        if(isNaN(message.content.split(' ')[2])) return;

        var user = message.content.split(' ')[1].split('<@!')[1].split('>')[0];
        var count = parseInt(message.content.split(' ')[2])+1;
        const _limit = 10;
        let _cnt = 0;

        message.channel.fetchMessages({limit: _limit}).then(collected => {
          collected.every(msg => {
            if(msg.author.id == user) {
              msg.delete();
              ++_cnt;
            }
            return !(_cnt == count);
          });
        });
      }
    } else {
      message.channel.bulkDelete(parseInt(clearLine)+1)
        .then(() => {
          AutoMsgDelete(message, `<@${message.author.id}> ` + parseInt(clearLine) + "개의 메시지를 삭제했습니다. (이 메세지는 잠시 후에 사라집니다.)");
        })
        .catch(console.error)
    }
  }
});

function checkPermission(message) {
  if(!message.member.hasPermission("MANAGE_MESSAGES")) {
    message.channel.send(`<@${message.author.id}> ` + "명령어를 수행할 관리자 권한을 소지하고 있지않습니다.")
    return true;
  } else {
    return false;
  }
}

function changeCommandStringLength(str, limitLen = 8) {
  let tmp = str;
  limitLen -= tmp.length;

  for(let i=0;i<limitLen;i++) {
      tmp += ' ';
  }

  return tmp;
}

async function AutoMsgDelete(message, str, delay = 3000) {
  let msg = await message.channel.send(str);

  setTimeout(() => {
    msg.delete();
  }, delay);
}


client.login(token);