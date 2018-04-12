require('dotenv').config();
let transporter = require('../cofig-mail');

class CodeSender {

    constructor(provider, repository) {
        this.provider = provider;
        this.repository = repository;
    }

    sendCode() {

        let repository = this.repository;

        return this.provider.provideForSendCode().then( value => {
            let rn = require('random-number');
            let options = {
                min:  100000
                , max:  999999
                , integer: true
            };

            let code = rn(options);

            let mainOptions = {

                from: 'process.env.DB_EMAIL',
                to: value.email,
                subject: 'Mã Xác Nhận',
                text: value.email.name_borrower,
                html: '<p>Dear: You</p>'+
                '<p>Mã xác nhận của bạn là: ' + code + '</p>'+
                '<p>Xin cám ơn !</p>'
            };


            transporter.sendMail(mainOptions, function(){
                repository.writeCode(code).then( () => {
                    return 0;
                });
            });
        });

    }
}

module.exports = CodeSender;

