'use strict'

const Telegram = require('telegram-node-bot')

class OtherwiseController extends Telegram.TelegramBaseController {
    /**
     * @param {Scope} $
     */
    
    // before(scope) {
    //     scope.someData = true
    //     return scope
    // }
    handle($) {
    	try{
    		let param = JSON.parse(JSON.stringify($));
    		// console.log(param._message)
    		if(param._message.hasOwnProperty('contact')){
    			console.log('I Got new contact',param._message.contact.user_id,param._message.contact);
    			return;
    		}else if(param._message.hasOwnProperty('chat')){
    			console.log('I Got new group',param._message.chat.id,param._message.chat)	
    			return;
    		}
       }
       catch(error){
       	console.log('errrrrrrrrrrrrrrrr::::',error)
       }
    }


}

module.exports = OtherwiseController;