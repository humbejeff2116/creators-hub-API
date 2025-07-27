import RabbitMQStreamReciever from "../../../../messageQueue/streams/reciever/index.js";

export const accountMessageStreamTypes = {
    accountCreated: 'account_created',
    accountUpdated: 'account_updated'
}

const configureRabbitMQStreamReciever = async (streamName: string) => {
    RabbitMQStreamReciever.
    const rabbitMQStreamSender = new RabbitMQStreamSender(streamName);
    await rabbitMQStreamSender.connect();
    await rabbitMQStreamSender.createStream();
    return ({
       sendMessage: rabbitMQStreamSender.sendMessage
    }); 
};

interface RabbitStreamSender {
    sendMessage: (message: any) => void
}


// how to use inside controller
let rabbitMQStreamSender: RabbitStreamSender

export class AccountController {
    constructor() {
        (async (streamName: string) => {
            if (!rabbitMQStreamSender) {
                await configureRabbitMQStreamSender(streamName)
                .then(streamSender => {
                    rabbitMQStreamSender = streamSender;
                });
            }
        })("account");  
    }

    async updateAccount() {
        //now, rabbitMQStreamSender is global and available to the whole module
        rabbitMQStreamSender.sendMessage({
            type:  accountMessageStreamTypes.accountCreated,
            message: 'hello'
        })
    }
    
}


export default configureRabbitMQStreamSender;