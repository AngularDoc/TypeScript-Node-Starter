import express from 'express';
import { Request, Response } from 'express';
import compression from 'compression'; // compresses requests
import bodyParser from 'body-parser';
import lusca from 'lusca';
import flash from 'express-flash';
import mongoose from 'mongoose';
import passport from 'passport';
import bluebird from 'bluebird';
import { User } from './models/User';

// Create Express server
const app = express();

// Connect to MongoDB
const mongoHost = process.env['MONGO_HOST'];
const mongoPort = process.env['MONGO_PORT'];

if (!mongoHost || !mongoPort) {
    console.error(
        'No mongo connection parameters. Set MONGO_HOST & MONGO_PORT environment variables.',
    );
    process.exit(1);
}

const mongoUrl = `mongodb://${mongoHost}:${mongoPort}/test`;
mongoose.Promise = bluebird;

mongoose
    .connect(mongoUrl, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
    })
    .catch(err => {
        console.log(
            'MongoDB connection error. Please make sure MongoDB is running. ' +
                err,
        );
        // process.exit();
    });

// Express configuration
app.set('port', process.env.PORT || 3000);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));

/**
 * Primary app routes.
 */
app.get('/', (req: Request, res: Response) => {
    res.json({
        status: 'success',
        message: 'Hello world!',
    });
});

/**
 * API examples routes.
 */
app.get('/api', (req: Request, res: Response) => {
    User.find({}, (err, users) => {
        if (err) {
            res.json({
                status: 'error',
                message: err,
            });
        }
        res.json({
            status: 'success',
            message: 'Users retrieved successfully',
            data: users,
        });
    });
});

export default app;
