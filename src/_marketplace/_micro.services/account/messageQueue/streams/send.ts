import  RabbitMQStreamSender  from "../../../../messageQueue/streams/sender/index.js";

interface Cache {
    streamSender: (message: any) => void | null 
}

const cache: Cache = {
    streamSender: null
}

export const accountMessageStreamTypes = {
    accountCreated: 'account_created',
    accountUpdated: 'account_updated'
}

const rabbitMQStreamSender = (async (streamName: string) => {
    if (cache.streamSender) {
        return ({
            sendMessage: cache.streamSender.sendMessage
        }); 
        // return cache.rabbitMQStreamSender.sendMessage 
    } else {
        const streamSender = new RabbitMQStreamSender(streamName);
        await streamSender.connect();
        await streamSender.createStream();
        cache.streamSender = streamSender.sendMessage; 
        return ({
            sendMessage: streamSender.sendMessage
        });
    }
})('account');

export class AccountController {

    async updateAccount() {

        (await rabbitMQStreamSender).sendMessage({
            type:  accountMessageStreamTypes.accountCreated,
            message: 'hello'
        })
    }
    
}


export default rabbitMQStreamSender;