'use strict'

const Telegram = require('telegram-node-bot')
// const tg = new Telegram.Telegram('700929054:AAE6FBiNVTAYSZkZLKc21OjmkbhMEb6qEUI',{workers:1})

class TodoController extends Telegram.TelegramBaseController {
    /**
     * @param {Scope} $
     */
    addHandler($) {
        let todo = $.message.text.split(' ').slice(1).join(' ');
        if(!todo) return $.sendMessage('Please send an item to add');

        $.getUserSession('todos').then(todos=>{
            if(!Array.isArray(todos)) $.setUserSession('todos',[todo]);
            else $.getUserSession('todos',todos.concat([todo]))
            $.sendMessage('Added successfully!')
        });
    }

     getHandler($) {


         $.getUserSession('todos').then(todos=>{
             $.sendMessage(this._serializeList(todos),{parse_mode : 'Markdown'})//
         });
    }

    groupHandler($){
        // console.log($.contact)
        $.sendMessage('@641899621','Hello');
    }

    _serializeList(todoList){
        let serialzed = '*Your Todos:*\n\n';
        todoList.forEach((t, i)=>{
            serialzed += `*${i}* - ${t}\n`;
        });
        return serialzed;
    }

    get routes() {
        return {
            'addCommand': 'addHandler',
            'getCommand': 'getHandler',
            'groupCommand' : 'groupHandler'
        }
    }
}

module.exports = TodoController;