exports.activeOffersPage = async (req, res) => {
    res.render('active-offers')
}

exports.closedOffersPage = async (req, res) => {
    res.render('closed-offers')
}

exports.cancelledOffersPage = async (req, res) => {
    res.render('cancelled-offers')
}
