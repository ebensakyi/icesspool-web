#!/usr/bin/env nodejs

const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const uuid = require("uuid-v4");
const hbs = require("hbs");
const path = require("path");

const cors = require("cors");

const redis = require("redis");
const redisStore = require("connect-redis")(session);

const routes = require("./routes");

const app = express();
const client = redis.createClient();

process.env.NODE_ENV = "production";

app.use(logger("dev"));
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "public")));

hbs.registerPartials(__dirname + "/views/partials");

hbs.registerHelper("compare", function(lvalue, rvalue, options) {
    if (arguments.length < 3)
        throw new Error("Handlerbars Helper 'compare' needs 2 parameters");

    operator = options.hash.operator || "==";

    var operators = {
        "==": function(l, r) {
            return l == r;
        },
        "===": function(l, r) {
            return l === r;
        },
        "!=": function(l, r) {
            return l != r;
        },
        "<": function(l, r) {
            return l < r;
        },
        ">": function(l, r) {
            return l > r;
        },
        "<=": function(l, r) {
            return l <= r;
        },
        ">=": function(l, r) {
            return l >= r;
        },
        typeof: function(l, r) {
            return typeof l == r;
        },
    };

    if (!operators[operator])
        throw new Error(
            "Handlerbars Helper 'compare' doesn't know the operator " + operator
        );

    var result = false;

    if (rvalue.indexOf("|") != -1) {
        var values = rvalue.split("|");
        var matches = 0;
        for (var i = 0, j = values.length; i < j; i++) {
            if (operators[operator](lvalue, values[i])) {
                matches++;
            }
        }
        result = matches > 0;
    } else {
        result = operators[operator](lvalue, rvalue);
    }

    if (result) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});

app.use(
    session({
        genid: (req) => {
            return uuid();
        },
        store: new redisStore({ host: "localhost", port: 6379, client: client }),
        name: "_redis",
        secret: "faeb4453e5d14fe6f6d04637f78077c76c73d1b4", // process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,

        cookie: {
            secure: false,
            httpOnly: true,
            maxAge: 15400000,
        },
    })
);

const active = require("./utils/Helper");
active.isActive(hbs);

const disbursed = require("./utils/Helper");
disbursed.isDisbursed(hbs);

const inactivate = require("./utils/Helper");
inactivate.inactivateBtn(hbs);

const inactivateCloseTx = require("./utils/Helper");
inactivateCloseTx.inactivateCloseTxBtn(hbs);

const statusColors = require("./utils/Helper");
statusColors.statusColors(hbs);

const PerformSeeding = require("./db/seeders/PerformSeeding");
PerformSeeding.start(app);

routes.UserRoutes(app);
routes.LoginRoutes(app);
routes.PricingRoutes(app);
routes.ActivationRoutes(app);
routes.LocationRoutes(app);
routes.TransactionRoutes(app);
routes.TipOffPointRoutes(app);
routes.PaymentRoutes(app);
routes.WithdrawalRoutes(app);
routes.EarningRoutes(app);
routes.CommissionRoutes(app);
routes.RatingRoutes(app);
routes.PrivacyTermsRoutes(app);

routes.ProviderRoutes(app);
routes.ClientRoutes(app);
routes.DashboardRoutes(app);
routes.ScannerUserRoutes(app);
routes.WebOffersRoutes(app);
routes.DiscountRoutes(app);
routes.FcmRoutes(app)
routes.MessagingRoutes(app)
app.get("*", (req, res) =>
    // res.status(200).send({
    //   message: "Welcome to the beginning of nothingness." ,
    // })
    res.render("404")
);

const port = 3000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});