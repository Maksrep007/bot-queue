const TelegramApi = require('node-telegram-bot-api')

const token = '7221374387:AAGKeT3rTYQZqhwB4NVib1JObaznaZ20-FA'
const fs = require('fs')
const bot = new TelegramApi(token, {polling: true})
const pathToFile = ('files/base.txt')
const pathTwo = ('files/informatika.txt')
const pathCount = ('files/count.txt')
const pathCountTwo = ('files/counttwo.txt')
const pathInfTwo = ('files/infTwo.txt')
const {gameOptions, writeOptions, regOptions ,writeCurrentOptions, helloOptions, writeCurrentOptionsTwo} = require('./options')
/*const UserModel = require('./models');*/
let currentName
let regFlag = 0;
/*const startGame = async (chatId) => {
    await bot.sendMessage(chatId, 'Угадай цифру от 1 до 9')
    const randomNumber = Math.floor(Math.random() * 10)
    chats[chatId] = randomNumber;
    console.log(chats[chatId])
    await bot.sendMessage(chatId, 'Отгадывай', gameOptions)
}*/
const startWrite = (chatId) => {
    return bot.sendMessage(chatId, 'Запись', writeOptions)
}
const startWriteInf = async (chatId, path, call) => {
    const dataInf  = fs.readFileSync(path, {encoding: "utf8", flag: 'r'});
    let dataInfArr = dataInf.split('\n')
    let dataInfFinal = ''
    for (i = 0; i < dataInfArr.length; i++) {
        if (i % 2 !== 0) {
            dataInfFinal += `${dataInfArr[i]}\n`
        }
    }
    if (call === 1) {
        await bot.sendMessage(chatId, `Текущая очередь:\n${dataInfFinal}`, writeCurrentOptions)
    }
    else {
        await bot.sendMessage(chatId, `Текущая очередь:\n${dataInfFinal}`, writeCurrentOptionsTwo)
    }
}
const reCount = async (chatId, path) => {
    const dataInf  = fs.readFileSync(path, {encoding: "utf8", flag: 'r'});
    let dataInfArr = dataInf.split('\n')
    let b
    let last
    let dataInfFinal = ''
    let flag = 0;
    let flagTwo = 0
    for (i = 0; i < dataInfArr.length; i++) {
        if (String(dataInfArr[i]) === String(chatId)) {
            flag = 1;
        }
        if ((i % 2 !== 0) && (flag === 1)) {
            b = dataInfArr[i]
            for (k = 0; k < b.length; k++) {
                if (b[k] === ' ') {
                    if (k === 2) {
                        last = Number(b[0])
                        break
                    }
                    else {
                        last = Number(b.substring(0,2))
                        flagTwo = 1
                        break
                    }
                }
            }
            last--
            let final = String(last)
            // final.slice(0,-1)
            for (j = 1; j < b.length; j++) {
                if (flagTwo === 1) {
                    j++
                    flagTwo = 0
                }
                final += b[j]
            }
            b = final
            dataInfArr[i] = b
        }
        dataInfFinal += dataInfArr[i]
        if (i + 1 < dataInfArr.length) {
            dataInfFinal += '\n'
        }
    }
    fs.writeFileSync(path, `${dataInfFinal}`, {encoding: 'utf8'})

}
const writeInf = async (chatId, path, pathCou, call) => {
    const dataInf  = fs.readFileSync(path, {encoding: "utf8", flag: 'r'});
    let dataInfArr = dataInf.split('\n')
    let dataInfFinal = ''
    /*for (i = 0; i < dataInfArr.length; i++) {
        if (String(dataInfArr[i]) === String(chatId)) {
            dataInfArr.splice(i,3)
            for (j = 0; j < dataInfArr.length-3; j++) {
                dataInfFinal+=dataInfArr[j]
            }
            console.log(dataInfFinal)
            fs.writeFileSync(pathTwo, `${dataInfFinal}\n${chatId}\n${count}. ${getName(chatId)}\n`, {encoding: 'utf8', flag: 'a'})
            await bot.sendMessage(chatId, 'Вы успешно записаны')
            return startWriteInf(chatId)
        }
    }*/
    await delInf(chatId, 1, path, pathCou)
    let count = Number(fs.readFileSync(pathCou, {encoding: "utf8", flag: 'r'}));
    fs.writeFileSync(path, `${chatId}\n${count}. ${getName(chatId)}\n`, {encoding: 'utf8', flag: 'a'})
    await bot.sendMessage(chatId, 'Вы успешно записаны')
    await startWriteInf(chatId, path, call)
}
//s
const delInf = async (chatId, k, path, pathCou) => {
    await reCount(chatId, path)
    console.log(path)
    const dataInf  = fs.readFileSync(path, {encoding: "utf8", flag: 'r'});
    let count = Number(fs.readFileSync(pathCou, {encoding: "utf8", flag: 'r'}));
    let dataInfArr = dataInf.split('\n')
    let dataInfFinal = ''
    for (i = 0; i < dataInfArr.length; i++) {
        if (String(dataInfArr[i]) === String(chatId)) {
            if (String(chatId) === String(dataInfArr[dataInfArr.length-3])) {
                dataInfArr.splice(i,3)
                for (j = 0; j < dataInfArr.length; j++) {
                    dataInfFinal+=dataInfArr[j]
                    dataInfFinal+='\n'
                }
                if (k === 0) {
                    count--
                    fs.writeFileSync(pathCou, `${count}`, {encoding: 'utf8'})
                }
            }
            else {
                dataInfArr.splice(i,2)
                for (j = 0; j < dataInfArr.length-1; j++) {
                    dataInfFinal+=dataInfArr[j]
                    dataInfFinal+='\n'
                }
                if (k === 0) {
                    count--
                    fs.writeFileSync(pathCou, `${count}`, {encoding: 'utf8'})
                }
            }
            fs.writeFileSync(path, `${dataInfFinal}`, {encoding: 'utf8'})
            return 1
        }
    }
    if (k === 1) {
        count++
    }
    fs.writeFileSync(pathCou, `${count}`, {encoding: 'utf8'})
    return 0;
}
const chats = {

}
const getName = (chatId) => {
    const dataMan  = fs.readFileSync(pathToFile, {encoding: "utf8", flag: 'r'});
    let dataArr = dataMan.split('\n')
    for (i = 0; i < dataArr.length; i++) {
        if (String(dataArr[i]) === String(chatId)) {
            ret = String(dataArr[i+1])
            return ret
        }
    }
    return 0;
}
const start = async () => {
    bot.setMyCommands([
        {command: '/start', description: 'Регистрация'},
        {command: '/info', description: 'Имя'},
        {command: '/write', description: 'Запись'},
    ])
    bot.on('message', async msg => {
        const chatId = msg.chat.id;
        const text = msg.text;

        try {
            if (text === '/start') {
                if (getName(chatId) === 0) {
                    regFlag = 1;
                    return bot.sendMessage(chatId, `Для регистрации введите имя и фамилию`)
                }
                else {
                    return bot.sendMessage(chatId, `Добро пожаловать!`, helloOptions)

                }
            }
            if (text === '/info') {
                if (getName(chatId) === 0) {
                    return bot.sendMessage(chatId,  'Вы не зарегистрированы', regOptions)
                }
                else {
                    return  bot.sendMessage(chatId, `Тебя зовут ${getName(chatId)}`)
                }
                /*const user = await UserModel.findOne({chatId})*/
            }
            if (text === '/write') {
                if (getName(chatId) === 0) {
                    return bot.sendMessage(chatId,  'Вы не зарегистрированы', regOptions)
                }
                else {
                    return startWrite(chatId)
                }
            }
            else if (regFlag === 1) {
                currentMan = msg.text;
                regFlag = 0;
                fs.writeFileSync(pathToFile, `${chatId}\n${msg.text}\n`, {encoding: 'utf8', flag: 'a'})
                return bot.sendMessage(chatId, `Добро пожаловать!`, helloOptions);
            }
            return bot.sendMessage(chatId, 'Я тебя не понимаю')
        } catch (e) {
            return bot.sendMessage(chatId, 'Произошла какая-то ошибка')
        }
    })
    bot.on('polling_error', console.log);
    bot.on('webhook_error', console.error);
    bot.on('callback_query', async msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
        // console.log(data);
        if (data === 'INF') {
            await startWriteInf(chatId, pathTwo, 1)
        }
        if (data === 'INF2') {
            await startWriteInf(chatId, pathInfTwo, 2)
        }
        if (data === 'OCG') {
            return bot.sendMessage(chatId, 'Запись на оцг')
        }
        if (data === 'FIZ') {
            return bot.sendMessage(chatId, 'Запись на физику')
        }
        if (data === 'WRT') {
            await writeInf(chatId, pathTwo, pathCount, 1)
        }
        if (data === 'WRT2') {
            await writeInf(chatId, pathInfTwo, pathCountTwo, 2)
        }
        if (data === 'DEL') {
            await delInf(chatId, 0, pathTwo, pathCount)
            await startWriteInf(chatId, pathTwo, 1)
        }
        if (data === 'DEL2') {
            await delInf(chatId, 0, pathInfTwo, pathCountTwo)
            await startWriteInf(chatId, pathInfTwo, 2)
        }
        if (data === 'ZAP') {
            await startWrite(chatId)
        }
        if (data === 'BACK') {
            await startWrite(chatId)
        }
        if (data === 'OBN') {
            await startWriteInf(chatId, pathTwo, 1)
        }
        if (data === 'OBN2') {
            await startWriteInf(chatId, pathInfTwo, 2)
        }
        if (data === 'REG') {
            regFlag = 1;
            await bot.sendMessage(chatId, `Для регистрации введите имя и фамилию`)
        }
        // bot.sendMessage(chatId, `Вы выбрали цифру ${data}`)
        // console.log(msg)
    })
}

start()