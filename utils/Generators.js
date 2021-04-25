module.exports = {
    generateId: (length) => {
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

        var result = '';
        for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
        return result;

    },
    generateActivationCode: (length) => {
        var chars = '0123456789';

        var result = '';
        for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
        return result;

    },
    getDate: () => {
        var currentDate = new Date();

        var date = currentDate.getDate();
        var month = currentDate.getMonth();
        var year = currentDate.getFullYear();

        if (date < 10) {
            date = "0" + date
        }
        month = month + 1
        if (month < 10) {
            month = "0" + month
        }

        const dateString = date + "" + month + "" + year;
        return dateString
    },
    
}