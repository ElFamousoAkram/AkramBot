module.exports = class google {

    static match (message) {
        return message.content.startsWith('a!google')
    }

    static action (message) {
        let args = message.content.split (' ')
        args.shift()
        message.reply('https://www.google.fr/#q=' + args.join(' '))
    }

}