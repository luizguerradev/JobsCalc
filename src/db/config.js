const sqlite3 = require('sqlite3')
const { open } = require('sqlite')


module.exports = () => {
        open({
        //arquivo onde vão ser salvos os dados
        filename: './database.sqlite',
        //pega e salva os dados
        driver: sqlite3.Database
    }); 
};