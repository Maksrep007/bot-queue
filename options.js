module.exports = {
    againOptions: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{text: 'Играть еще раз', callback_data: '/again'}],
            ]
        })
    },

    gameOptions: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{text: '1', callback_data: '1'}, {text: '2', callback_data: '2'}, {text: '3', callback_data: '3'}],
                [{text: '4', callback_data: '4'}, {text: '5', callback_data: '5'}, {text: '6', callback_data: '6'}],
                [{text: '7', callback_data: '7'}, {text: '8', callback_data: '8'}, {text: '9', callback_data: '9'}],
                [{text: '0', callback_data: '0'}],
            ]
        })
    },

    writeOptions: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{text: 'ИНФ-1', callback_data: 'INF'}, {text: 'ИНФ-2', callback_data: 'INF2'}, {text: 'ОЦГ', callback_data: 'OCG'}, {text: 'ФИЗ', callback_data: 'FIZ'}]
            ]
        })
    },
    writeCurrentOptions: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{text: 'Записаться в конец очереди', callback_data: 'WRT'}],
                [{text: 'Удалить себя из очереди', callback_data: 'DEL'}],
                [{text: 'Обновить', callback_data: 'OBN'}],
                [{text: 'Назад', callback_data: 'BACK'}]
            ]
        })
    },
    writeCurrentOptionsTwo: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{text: 'Записаться в конец очереди', callback_data: 'WRT2'}],
                [{text: 'Удалить себя из очереди', callback_data: 'DEL2'}],
                [{text: 'Обновить', callback_data: 'OBN2'}],
                [{text: 'Назад', callback_data: 'BACK'}]
            ]
        })
    },
    helloOptions: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{text: 'Записаться', callback_data: 'ZAP'}]
            ]
        })
    },
    regOptions: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{text: 'Зарегистрироваться', callback_data: 'REG'}]
            ]
        })
    }
}