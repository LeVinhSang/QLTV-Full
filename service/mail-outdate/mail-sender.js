require('dotenv').config();

let transporter = require('../cofig-mail');

class MailSender {

    constructor(provider, repository) {
        this.provider = provider;
        this.repository = repository;
    }

    send() {

        let repository = this.repository;

        return this.provider.provide().then( value => {
            for(let i =0; i< value.length; i++){
                let mainOptions = {
                    from: 'process.env.DB_EMAIL',
                    to: value[i].email,
                    subject: 'Thông Báo Trả Sách',
                    text: value[i].email[i].name_borrower,
                    html: '<p>Dear: ' + value[i].name_borrower + '</p>'+
                    '<p>Bạn đã hết thời gian mượn sách ở thư viện, bạn vui lòng tới thư viện để trả sách</p>'+
                    '<p>Xin cám ơn !</p>'
                };
                transporter.sendMail(mainOptions, function(){
                    repository.confirm_send_mail(value[i].id).then( () => {
                        return true;
                    });
                });
            }
        });

    }
}

module.exports = MailSender;

