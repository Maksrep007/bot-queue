const TelegramApi = require('node-telegram-bot-api')

const token = '7221374387:AAGKeT3rTYQZqhwB4NVib1JObaznaZ20-FA'

const bot = new TelegramApi(token, {polling: true})

const {gameOptions, againOptions} = require('./options')

const startGame = async (chatId) => {
    await bot.sendMessage(chatId, 'Угадай цифру от 1 до 9')
    const randomNumber = Math.floor(Math.random() * 10)
    chats[chatId] = randomNumber;
    console.log(chats[chatId])
    await bot.sendMessage(chatId, 'Отгадывай', gameOptions)
}

const chats = {

}

const start = () => {
    bot.setMyCommands([
        {command: '/start', description: 'Регистрация'},
        {command: '/info', description: 'Жесткий докс'},
        {command: '/game', description: 'Игра угадай цифру'},
    ])


    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;
        if (text === '/start') {
            return bot.sendMessage(chatId, `Для регистрации введите имя и фамилию`)
        }
        if (text === '/info') {
            return  bot.sendMessage(chatId, `Тебя зовут ${msg.from.first_name} ${msg.from.username}`)
        }
        if (text === '/game') {
            return startGame(chatId)
        }
        return bot.sendMessage(chatId, 'Я тебя не понимаю')
    })
    bot.on('callback_query', async msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
        console.log(data)
        if (data === '/again') {
            return startGame(chatId)
        }
        if (Number(data) === Number(chats[chatId])) {
            return await bot.sendMessage(chatId, `Верно`, againOptions)
        } else {
            return await bot.sendMessage(chatId, `Неверно, бот загадал цифру ${chats[chatId]}`, againOptions)
        }

        // bot.sendMessage(chatId, `Вы выбрали цифру ${data}`)
        // console.log(msg)
    })
}

start()