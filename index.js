'use strict'

const Telegram = require('telegram-node-bot')
const tg = new Telegram.Telegram('XXXXXX:XXXXXXXXX',{workers:1})

const PingController = require('./controllers/pingController'),
 TodoController = require('./controllers/todoController'),
 OtherwiseController = require('./controllers/otherwiseController');

class DefaultController extends Telegram.TelegramBaseController {
    /**
     * @param {Scope} $
     */
    newHandler($) {
         let param = JSON.parse(JSON.stringify($));
         let messageText = param._message.text;
         console.log('Message: ',messageText);
         tg.api.sendMessage(XXXXXX, messageText); //for single user
         tg.api.sendMessage(-XXXXXXX,messageText); //for group user (-)sign before user_id
    }
    get routes() {
        return {
            'newCommand': 'newHandler'
        }
    }
}



const todoCtrl = new TodoController();
tg.router
    .when(new Telegram.TextCommand('ping', 'pingCommand'),new PingController())
    .when(new Telegram.TextCommand('/add', 'addCommand'), todoCtrl)
    .when(new Telegram.TextCommand('/get', 'getCommand'), todoCtrl)
    .when(new Telegram.TextCommand('/group', 'groupCommand'), todoCtrl)
    .when(new Telegram.TextCommand('new', 'newCommand'), new DefaultController())
        .otherwise(new OtherwiseController());        