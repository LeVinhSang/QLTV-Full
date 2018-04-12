const bcrypt = require('bcrypt');

function test() {
    bcrypt.hash('sang', 10).then(function(hash) {
        console.log(hash);
    });
    bcrypt.compare('sang', '$2a$10$Fm61LujObHNXf6Nd.se2AezgvtI2IFNB0Unl1WqD621.I2fwbjHe2').then( function(value) {
       console.log(value)
    });
}

test();