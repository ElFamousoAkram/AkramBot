    module.exports = class help {

        static match (message) {
            return message.content.startsWith('a!help')
        }
        static action (message) {
            message.channel.send({embed{
                title :"Page de commande"
                description:"Le bot est encore en developpement, par consequent, cette liste est non exausthive."
                color: "2143827"
                

            }})
    )
