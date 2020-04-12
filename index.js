const Telegraf = require('telegraf');
const Markup = require('telegraf/markup');
const config = require('./config.json');
const TelegrafInlineMenu = require('telegraf-inline-menu');

const bot = new Telegraf(config.token);
const menu = new TelegrafInlineMenu(ctx => `Выберите операцию`);

calc = () => {
    menu.setCommand('start');
    var handleText = (array, oper1, ctx) => {
        switch (oper1) {
            case 'add':
                if (array.length == 2 && Number.isInteger(parseInt(array[0])) && Number.isInteger(parseInt(array[1]))) {
                    ctx.reply((+array[0]) + (+array[1]));;
                } else ctx.reply('Ошибка');
                break;
            case 'subtract':
                if (array.length == 2 && Number.isInteger(parseInt(array[0])) && Number.isInteger(parseInt(array[1]))) {
                    ctx.reply((+array[0]) - (+array[1]))
                } else ctx.reply('Ошибка');
                break;
            case 'multiply':
                if (array.length == 2 && Number.isInteger(parseInt(array[0])) && Number.isInteger(parseInt(array[1]))) {
                    ctx.reply((+array[0]) * (+array[1]))
                } else ctx.reply('Ошибка');
                break;
            case 'divide':
                if (array.length == 2 && Number.isInteger(parseInt(array[0])) && Number.isInteger(parseInt(array[1]))) {
                    ctx.reply((+array[0]) / (+array[1]))
                    oper = null;
                } else ctx.reply('Ошибка');
                break;
        }
        oper = '';
    }
    var oper;
    var func = (ctx) => {
        console.log(oper);
        let array = ctx.message.text.split(' ');
        handleText(array, oper, ctx);
    }
    
    menu.simpleButton('add', 'a', {
        doFunc: async ctx => {
            oper = 'add';
            console.log('click add');
            ctx.reply('введите 2 числа');
        }
    })
    menu.simpleButton('subtract', 'b', {
        doFunc: async ctx => {
            oper = 'subtract';
            console.log('click subtract');
            ctx.reply('введите 2 числа'); 
        }
    })
    menu.simpleButton('multiply', 'c', {
        doFunc: async ctx => {
            oper = 'multiply';
            console.log('click multiply');
            ctx.reply('введите 2 числа'); 
        }
    })
    menu.simpleButton('divide', 'd', {
        doFunc: async ctx => {
            oper = 'divide';
            console.log('click divide');
            ctx.reply('введите 2 числа'); 
        }
    })
    
    bot.use(menu.init());
    bot.startPolling();
    bot.use((ctx) => {
        func(ctx);
    })
    bot.launch();
}

calc();
