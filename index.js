const TelegramApi = require('node-telegram-bot-api')

const token = '7221374387:AAGKeT3rTYQZqhwB4NVib1JObaznaZ20-FA'

const bot = new TelegramApi(token, {polling: true})

const {gameOptions, againOptions} = require('./options')
const UserModel = require('./models');
const sequelize = require('./db');

const startGame = async (chatId) => {
    await bot.sendMessage(chatId, 'Угадай цифру от 1 до 9')
    const randomNumber = Math.floor(Math.random() * 10)
    chats[chatId] = randomNumber;
    console.log(chats[chatId])
    await bot.sendMessage(chatId, 'Отгадывай', gameOptions)
}

const chats = {

}

const start = async () => {

    try {
        await sequelize.authenticate()
        await sequelize.sync()
    } catch (e) {
        console.log('Подключение к бд сломалось', e)
    }

    bot.setMyCommands([
        {command: '/start', description: 'Регистрация'},
        {command: '/info', description: 'Инфо'},
        {command: '/game', description: 'game'},
    ])


    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;

        try {
            if (text === '/start') {
                await UserModel.create({chatId}) //запись в бд
                return bot.sendMessage(chatId, `Для регистрации введите имя и фамилию`)
            }
            if (text === '/info') {
                const user = await UserModel.findOne({chatId})
                return  bot.sendMessage(chatId, `Тебя зовут ${msg.from.first_name} ${msg.from.username}, в игре правильных ответов ${user.right}, неправильных ${user.wrong}`)
            }
            if (text === '/game') {
                return startGame(chatId)
            }
            return bot.sendMessage(chatId, 'Я тебя не понимаю')
        } catch (e) {
            return bot.sendMessage(chatId, 'Произошла какая-то ошибка')
        }
    })
    bot.on('callback_query', async msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
        console.log(data)
        const user = await UserModel.findOne({chatId})
        if (data === '/again') {
            return startGame(chatId)
        }
        if (Number(data) === Number(chats[chatId])) {
            user.right += 1;
            await bot.sendMessage(chatId, `Верно`, againOptions)
        } else {
            user.wrong += 1;
            await bot.sendMessage(chatId, `Неверно, бот загадал цифру ${chats[chatId]}`, againOptions)
        }
        await user.save();

        // bot.sendMessage(chatId, `Вы выбрали цифру ${data}`)
        // console.log(msg)
    })
}

start()