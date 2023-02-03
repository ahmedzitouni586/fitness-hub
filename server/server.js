require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const verifyJWT = require('./middleware/verfyJWT');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const connectDB = require('./config/dbCon');
const PORT = process.env.PORT || 3500;


mongoose.set('strictQuery', true);


const exercises = [
    {
        id: 1,
        name: "Pushups",
        photo: "https://gymvisual.com/img/p/1/0/0/8/3/10083.gif",
        muscle:"chest",
        equipment:"body_only",
        difficulty:"intermediate"
    },
    {
        id: 2,
        name: "Close-grip bench press",
        photo: "https://gymvisual.com/img/p/1/0/0/6/1/10061.gif",
        muscle:"chest",
        equipment:"barbell",
        difficulty:"intermediate"
    },
    {
        id: 3,
        name: "Dumbbell Flyes",
        photo: "https://gymvisual.com/img/p/1/0/2/8/0/10280.gif",
        muscle:"chest",
        equipment:"dumbell",
        difficulty:"intermediate"
    },
    {
        id: 4,
        name: "Incline dumbbell bench press",
        photo: "https://www.inspireusafoundation.org/wp-content/uploads/2022/09/dumbbell-incline-chest-press.gif",
        muscle:"chest",
        equipment:"dumbell",
        difficulty:"intermediate"
    },
    {
        id: 5,
        name: "Low-cable cross-over",
        photo: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Low-Cable-Crossover.gif",
        muscle:"chest",
        equipment:"cable",
        difficulty:"intermediate"
    },
    {
        id: 6,
        name: "Barbell Bench Press - Medium Grip",
        photo: "https://www.inspireusafoundation.org/wp-content/uploads/2022/05/barbell-pause-bench.gif",
        muscle:"chest",
        equipment:"barbell",
        difficulty:"intermediate"
    },
    {
        id: 7,
        name: "Chest dip",
        photo: "https://gymvisual.com/img/p/4/9/8/4/4984.gif",
        muscle:"chest",
        equipment:"other",
        difficulty:"intermediate"
    },
    {
        id: 8,
        name: "Decline Dumbbell Flyes",
        photo: "https://gymvisual.com/img/p/2/0/7/3/8/20738.gif",
        muscle:"chest",
        equipment:"dumbell",
        difficulty:"intermediate"
    },
    {
        id: 9,
        name: "Bodyweight Flyes",
        photo: "https://images.squarespace-cdn.com/content/v1/5db20c73f80047725e83b73c/1605195160310-98LWOY7M3TH9OMRHKBCI/Br%C3%B6st%C3%B6vningar+del+1+%2821%29.gif",
        muscle:"chest",
        equipment:"e-z_curl_bar",
        difficulty:"intermediate"
    },
    {
        id: 10,
        name: "Suspended ab fall-out",
        photo: "https://fitnessprogramer.com/wp-content/uploads/2022/08/Suspended-Ab-Fall-out.gif",
        muscle:"abdominals",
        equipment:"body_only",
        difficulty:"intermediate"
    },
    {
        id: 11,
        name: "Dumbbell V-Sit",
        photo: "https://gymvisual.com/7269/dumbbell-biceps-curl-v-sit-on-bosu-ball.jpg",
        muscle:"abdominals",
        equipment:"dumbell",
        difficulty:"intermediate"
    },
    {
        id: 12,
        name: "Standing cable low-to-high twist",
        photo: "https://fitnessprogramer.com/wp-content/uploads/2021/04/Standing-Cable-low-to-high-Twist.gif",
        muscle:"abdominals",
        equipment:"cable",
        difficulty:"intermediate"
    },
    {
        id: 13,
        name: "Dumbbell spell caster",
        photo: "https://gymvisual.com/img/p/5/5/0/1/5501.gif",
        muscle:"abdominals",
        equipment:"dumbell",
        difficulty:"beginner"
    },
    {
        id: 14,
        name: "Decline reverse crunch",
        photo: "https://gymvisual.com/img/p/9/1/8/0/9180.gif",
        muscle:"abdominals",
        equipment:"bench",
        difficulty:"intermediate"
    },
    {
        id: 15,
        name: "Spider crawl",
        photo: "https://hips.hearstapps.com/hmg-prod/images/workouts/2016/08/mountainclimberspiderslow-1472072946.gif",
        muscle:"abdominals",
        equipment:"body_only",
        difficulty:"intermediate"
    },
    {
        id: 16,
        name: "Cocoons",
        photo: "https://gymvisual.com/img/p/1/1/6/9/1/11691.gif",
        muscle:"abdominals",
        equipment:"body_only",
        difficulty:"intermediate"
    },
    {
        id: 17,
        name: "Buttom up",
        photo: "https://gymvisual.com/img/p/4/8/7/4/4874.gif",
        muscle:"abdominals",
        equipment:"body_only",
        difficulty:"intermediate"
    },
    {
        id: 18,
        name: "Standing Hip Circles",
        photo: "https://gymvisual.com/img/p/1/5/0/4/0/15040.gif",
        muscle:"abductors",
        equipment:"body_only",
        difficulty:"beginner"
    },
    {
        id: 19,
        name: "Clam",
        photo: "https://fitnessprogramer.com/wp-content/uploads/2022/02/Band-Side-Lying-Clam.gif",
        muscle:"abductors",
        equipment:"body_only",
        difficulty:"intermediate"
    },
    {
        id: 20,
        name: "Thigh abductor",
        photo: "https://i.pinimg.com/originals/b4/32/f7/b432f733e4e81741b313b0e8996bdec0.gif",
        muscle:"abductors",
        equipment:"machine",
        difficulty:"intermediate"
    },
    {
        id: 21,
        name: "Fire Hydrant",
        photo: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Fire-Hydrant.gif",
        muscle:"abductors",
        equipment:"body_only",
        difficulty:"beginner"
    },
    {
        id: 22,
        name: "Windmills",
        photo: "https://fitnessprogramer.com/wp-content/uploads/2021/05/Bodyweight-Windmill.gif",
        muscle:"abductors",
        equipment:"body_only",
        difficulty:"intermediate"
    },
    {
        id: 23,
        name: "Monster Walk",
        photo: "https://gymvisual.com/img/p/5/3/6/4/5364.gif",
        muscle:"abductors",
        equipment:"body_only",
        difficulty:"intermediate"
    },
    {
        id: 24,
        name: "Single-leg lying cross-over stretch",
        photo: "https://gymvisual.com/img/p/5/3/5/2/5352.gif",
        muscle:"abductors",
        equipment:"body_only",
        difficulty:"beginner"
    },
    {
        id: 25,
        name: "Wide-grip barbell curl",
        photo: "https://gymvisual.com/img/p/4/8/5/1/4851.gif",
        muscle:"biceps",
        equipment:"barbell",
        difficulty:"beginner"
    },
    {
        id: 26,
        name: "EZ-bar spider curl",
        photo: "https://gymvisual.com/img/p/5/1/9/5/5195.gif",
        muscle:"biceps",
        equipment:"barbell",
        difficulty:"intermediate"
    },
    {
        id: 27,
        name: "Hammer Curls",
        photo: "https://gymvisual.com/img/p/5/0/4/5/5045.gif",
        muscle:"biceps",
        equipment:"dumbell",
        difficulty:"intermediate"
    },
    {
        id: 28,
        name: "EZ-Bar Curl",
        photo: "https://gymvisual.com/img/p/5/1/8/8/5188.gif",
        muscle:"biceps",
        equipment:"e-z_curl_bar",
        difficulty:"intermediate"
    },
    {
        id: 29,
        name: "Zottman Curl",
        photo: "https://www.docteur-fitness.com/wp-content/uploads/2022/01/curl-zottman.gif",
        muscle:"biceps",
        equipment:"dumbell",
        difficulty:"intermediate"
    },
    {
        id: 30,
        name: "Barbell Curl",
        photo: "https://gymvisual.com/img/p/2/2/6/4/6/22646.gif",
        muscle:"biceps",
        equipment:"barbell",
        difficulty:"beginner"
    },
    {
        id: 31,
        name: "Biceps curl to shoulder press",
        photo: "https://gymvisual.com/img/p/2/0/9/5/4/20954.gif",
        muscle:"biceps",
        equipment:"dumbell",
        difficulty:"beginner"
    },
    {
        id: 32,
        name: "Concentration curl",
        photo: "https://gymvisual.com/img/p/5/1/4/4/5144.gif",
        muscle:"biceps",
        equipment:"dumbell",
        difficulty:"intermediate"
    },
    {
        id: 33,
        name: "Flexor Incline Dumbbell Curls",
        photo: "https://fitnessprogramer.com/wp-content/uploads/2022/02/Flexor-Incline-Dumbbell-Curls.gif",
        muscle:"biceps",
        equipment:"dumbell",
        difficulty:"beginner"
    },
    {
        id: 34,
        name: "Standing Calf Raises",
        photo: "https://gymvisual.com/img/p/1/4/5/1/0/14510.gif",
        muscle:"calves",
        equipment:"machine",
        difficulty:"beginner"
    },
    {
        id: 35,
        name: "Seated Calf Raise",
        photo: "https://gymvisual.com/img/p/1/2/5/8/0/12580.gif",
        muscle:"calves",
        equipment:"machine",
        difficulty:"intermediate"
    },
    {
        id: 36,
        name: "Calf Press On The Leg Press Machine",
        photo: "https://gymvisual.com/img/p/6/6/5/4/6654.gif",
        muscle:"calves",
        equipment:"machine",
        difficulty:"intermediate"
    },
    {
        id: 37,
        name: "Standing barbell calf raise",
        photo: "https://gymvisual.com/img/p/4/8/4/9/4849.gif",
        muscle:"calves",
        equipment:"barbell",
        difficulty:"beginner"
    },
    {
        id: 38,
        name: "Calf Press",
        photo: "https://fitnessprogramer.com/wp-content/uploads/2021/06/Lever-Seated-Calf-Raise.gif",
        muscle:"calves",
        equipment:"machine",
        difficulty:"beginner"
    },
    {
        id: 39,
        name: "Barbell Seated Calf Raise",
        photo: "https://gymvisual.com/img/p/4/8/2/5/4825.gif",
        muscle:"calves",
        equipment:"barbell",
        difficulty:"beginner"
    },
    {
        id: 40,
        name: "Balance Board",
        photo: "https://gymvisual.com/img/p/4/7/5/1/4751.gif",
        muscle:"calves",
        equipment:"other",
        difficulty:"beginner"
    },
    {
        id: 41,
        name: "Wrist Rolle",
        photo: "https://gymvisual.com/img/p/6/6/7/2/6672.gif",
        muscle:"forearms",
        equipment:"barbell",
        difficulty:"intermediate"
    },
    {
        id: 42,
        name: "Dumbbell farmer's walk",
        photo: "https://www.inspireusafoundation.org/wp-content/uploads/2022/04/benefits-of-farmers-walks.gif",
        muscle:"forearms",
        equipment:"other",
        difficulty:"intermediate"
    },
    {
        id: 43,
        name: "Standing behind-the-back wrist curl",
        photo: "https://gymvisual.com/img/p/1/1/6/4/3/11643.gif",
        muscle:"forearms",
        equipment:"barbell",
        difficulty:"beginner"
    },
    {
        id: 44,
        name: "Seated finger curl",
        photo: "https://gymvisual.com/img/p/5/1/9/6/5196.gif",
        muscle:"forearms",
        equipment:"barbell",
        difficulty:"beginner"
    },
    {
        id: 45,
        name: "Barbell Hip Thrust",
        photo: "https://gymvisual.com/img/p/5/7/6/1/5761.gif",
        muscle:"glutes",
        equipment:"barbell",
        difficulty:"intermediate"
    },
    {
        id: 46,
        name: "Single-leg cable hip extension",
        photo: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Cable-Hip-Extension.gif",
        muscle:"glutes",
        equipment:"cable",
        difficulty:"intermediate"
    },
    {
        id: 47,
        name: "Glute bridge",
        photo: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Glute-Bridge-.gif",
        muscle:"glutes",
        equipment:"body_only",
        difficulty:"intermediate"
    },
    {
        id: 48,
        name: "Single-leg glute bridge",
        photo: "https://gymvisual.com/img/p/2/0/3/2/1/20321.gif",
        muscle:"glutes",
        equipment:"body_only",
        difficulty:"intermediate"
    },
    {
        id: 49,
        name: "Step-up with knee raise",
        photo: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Step-up.gif",
        muscle:"glutes",
        equipment:"body_only",
        difficulty:"intermediate"
    },
    {
        id: 50,
        name: "Kettlebell thruster",
        photo: "https://www.docteur-fitness.com/wp-content/uploads/2021/12/thruster-kettlebell.gif",
        muscle:"glutes",
        equipment:"kettlebells",
        difficulty:"intermediate"
    },
    {
        id: 51,
        name: "Kneeling Squat",
        photo: "https://gymvisual.com/img/p/4/8/4/0/4840.gif",
        muscle:"glutes",
        equipment:"barbell",
        difficulty:"beginner"
    },
    {
        id: 52,
        name: "Flutter Kicks",
        photo: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Flutter-Kicks.gif",
        muscle:"glutes",
        equipment:"none",
        difficulty:"intermediate"
    },
    {
        id: 53,
        name: "Glute Kickback",
        photo: "https://homeworkouts.org/wp-content/uploads/anim-bent-leg-kickbacks.gif",
        muscle:"glutes",
        equipment:"body_only",
        difficulty:"beginner"
    },
    {
        id: 54,
        name: "Barbell Deadlift",
        photo: "https://www.inspireusafoundation.org/wp-content/uploads/2022/02/barbell-deadlift-movement.gif",
        muscle:"hamstring",
        equipment:"barbell",
        difficulty:"intermediate"
    },
    {
        id: 55,
        name: "Romanian Deadlift With Dumbbells",
        photo: "https://www.inspireusafoundation.org/wp-content/uploads/2021/11/dumbbell-romanian-deadlift.gif",
        muscle:"hamstring",
        equipment:"dumbell",
        difficulty:"beginner"
    },
    {
        id: 56,
        name: "Clean Deadlift",
        photo: "https://gymvisual.com/img/p/6/9/8/2/6982.gif",
        muscle:"hamstring",
        equipment:"barbell",
        difficulty:"intermediate"
    },
    {
        id: 57,
        name: "Sumo deadlift",
        photo: "https://gymvisual.com/img/p/2/4/7/2/8/24728.gif",
        muscle:"hamstring",
        equipment:"barbell",
        difficulty:"intermediate"
    },
    {
        id: 58,
        name: "Power Snatch",
        photo: "https://fitnessprogramer.com/wp-content/uploads/2022/02/Barbell-Power-Snatch.gif",
        muscle:"hamstring",
        equipment:"barbell",
        difficulty:"intermediate"
    },
    {
        id: 59,
        name: "Power Clean from Blocks",
        photo: "https://gymvisual.com/img/p/6/9/9/5/6995.gif",
        muscle:"hamstring",
        equipment:"barbell",
        difficulty:"intermediate"
    },
    {
        id: 60,
        name: "Glute Ham Raise",
        photo: "https://gymvisual.com/img/p/2/0/3/0/0/20300.gif",
        muscle:"hamstring",
        equipment:"body_only",
        difficulty:"beginner"
    },
    {
        id: 61,
        name: "Snatch Deadlift",
        photo: "https://gymvisual.com/img/p/7/0/0/4/7004.gif",
        muscle:"hamstring",
        equipment:"barbell",
        difficulty:"intermediate"
    },
    {
        id: 62,
        name: "Weighted pull-up",
        photo: "https://fitnessprogramer.com/wp-content/uploads/2021/04/Weighted-Pull-up.gif",
        muscle:"lats",
        equipment:"pull-up_bar",
        difficulty:"intermediate"
    },
    {
        id: 63,
        name: "Pullups",
        photo: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Pull-up.gif",
        muscle:"lats",
        equipment:"pull-up_bar",
        difficulty:"intermediate"
    },
    {
        id: 64,
        name: "Rocky Pull-Ups/Pulldowns",
        photo: "https://gymvisual.com/img/p/1/1/7/9/4/11794.gif",
        muscle:"lats",
        equipment:"pull-up_bar",
        difficulty:"intermediate"
    },
    {
        id: 65,
        name: "Close-grip pull-down",
        photo: "https://fitnessprogramer.com/wp-content/uploads/2021/06/Close-Grip-Lat-Pulldown.gif",
        muscle:"lats",
        equipment:"cable",
        difficulty:"intermediate"
    },
    {
        id: 66,
        name: "Shotgun row",
        photo: "https://fitnessprogramer.com/wp-content/uploads/2021/06/shotgun-row.gif",
        muscle:"lats",
        equipment:"cable",
        difficulty:"intermediate"
    },
    {
        id: 67,
        name: "Rope climb",
        photo: "https://gymvisual.com/img/p/5/4/1/4/5414.gif",
        muscle:"lats",
        equipment:"body_only",
        difficulty:"intermediate"
    },
    {
        id: 68,
        name: "Lat Pull Down",
        photo: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Lat-Pulldown.gif",
        muscle:"lats",
        equipment:"cable",
        difficulty:"intermediate"
    },
    {
        id: 69,
        name: "Lying Face Down Plate Neck Resistance",
        photo: "https://thumbs.dreamstime.com/b/man-doing-lying-face-down-plate-neck-resistance-man-doing-lying-face-down-plate-neck-resistance-exercise-flat-vector-illustration-233505835.jpg",
        muscle:"neck",
        equipment:"other",
        difficulty:"beginner"
    },
    {
        id: 70,
        name: "Seated Head Harness Neck Resistance",
        photo: "https://gymvisual.com/img/p/1/0/4/6/7/10467.gif",
        muscle:"neck",
        equipment:"weights",
        difficulty:"beginner"
    },
    {
        id: 71,
        name: "Isometric Neck Exercise - Sides",
        photo: "https://www.vissco.com/wp-content/uploads/animation/sub/neck-initial-range-side-bend-isometric.gif",
        muscle:"neck",
        equipment:"body_only",
        difficulty:"beginner"
    },
    {
        id: 72,
        name: "Neck Bridge Prone",
        photo: "https://gymvisual.com/img/p/5/3/6/8/5368.gif",
        muscle:"neck",
        equipment:"body_only",
        difficulty:"intermediate"
    },
    {
        id: 73,
        name: "Single-Leg Press",
        photo: "https://fitnessprogramer.com/wp-content/uploads/2022/04/Single-Leg-Press.gif",
        muscle:"quadriceps",
        equipment:"machine",
        difficulty:"intermediate"
    },
    {
        id: 74,
        name: "Clean from Blocks",
        photo: "https://gymvisual.com/img/p/6/9/9/5/6995.gif",
        muscle:"quadriceps",
        equipment:"barbell",
        difficulty:"beginner"
    },
    {
        id: 75,
        name: "Barbell Full Squat",
        photo: "https://www.inspireusafoundation.org/wp-content/uploads/2022/03/barbell-full-squat.gif",
        muscle:"quadriceps",
        equipment:"barbell",
        difficulty:"intermediate"
    },
    {
        id: 76,
        name: "Tire flip",
        photo: "https://gymvisual.com/img/p/1/0/6/3/3/10633.gif",
        muscle:"quadriceps",
        equipment:"other",
        difficulty:"intermediate"
    },
    {
        id: 77,
        name: "Barbell back squat to box",
        photo: "https://gymvisual.com/img/p/2/0/2/6/8/20268.gif",
        muscle:"quadriceps",
        equipment:"barbell",
        difficulty:"intermediate"
    },
    {
        id: 78,
        name: "Push-press",
        photo: "https://www.inspireusafoundation.org/wp-content/uploads/2022/04/push-press.gif",
        muscle:"quadriceps",
        equipment:"barbell",
        difficulty:"intermediate"
    },
    {
        id: 79,
        name: "Power snatch",
        photo: "https://fitnessprogramer.com/wp-content/uploads/2022/02/Barbell-Power-Snatch.gif",
        muscle:"quadriceps",
        equipment:"barbell",
        difficulty:"expert"
    },
    {
        id: 80,
        name: "Leg Extension",
        photo: "https://gymvisual.com/img/p/9/2/1/0/9210.gif",
        muscle:"quadriceps",
        equipment:"machine",
        difficulty:"intermediate"
    },
    {
        id: 81,
        name: "Goblet Squat",
        photo: "https://gymvisual.com/img/p/1/0/2/8/3/10283.gif",
        muscle:"quadriceps",
        equipment:"dumbell",
        difficulty:"intermediate"
    },
    {
        id: 82,
        name: "Smith machine shrug",
        photo: "https://gymvisual.com/img/p/2/1/9/4/7/21947.gif",
        muscle:"traps",
        equipment:"machine",
        difficulty:"intermediate"
    },
    {
        id: 83,
        name: "Leverage Shrug",
        photo: "https://gymvisual.com/img/p/5/3/4/1/5341.gif",
        muscle:"traps",
        equipment:"machine",
        difficulty:"intermediate"
    },
    {
        id: 84,
        name: "Standing dumbbell shrug",
        photo: "https://fitnessprogramer.com/wp-content/uploads/2021/04/Dumbbell-Shrug.gif",
        muscle:"traps",
        equipment:"dumbell",
        difficulty:"intermediate"
    },
    {
        id: 85,
        name: "Standing dumbbell upright row",
        photo: "https://fitnessprogramer.com/wp-content/uploads/2021/04/Dumbbell-Upright-Row.gif",
        muscle:"traps",
        equipment:"dumbell",
        difficulty:"intermediate"
    },
    {
        id: 86,
        name: "Kettlebell sumo deadlift high pull",
        photo: "https://gymvisual.com/img/p/5/2/8/6/5286.gif",
        muscle:"traps",
        equipment:"kettlebells",
        difficulty:"intermediate"
    },
    {
        id: 87,
        name: "Barbell shrug",
        photo: "https://gymvisual.com/img/p/4/8/3/1/4831.gif",
        muscle:"traps",
        equipment:"barbell",
        difficulty:"beginner"
    },
    {
        id: 88,
        name: "Barbell behind-the-back shrug",
        photo: "https://gymvisual.com/img/p/1/6/9/4/3/16943.gif",
        muscle:"traps",
        equipment:"barbell",
        difficulty:"intermediate"
    },
    {
        id: 89,
        name: "Triceps dip",
        photo: "https://fitnessprogramer.com/wp-content/uploads/2021/04/Triceps-Dips-on-Floor.gif",
        muscle:"triceps",
        equipment:"body_only",
        difficulty:"intermediate"
    },
    {
        id: 90,
        name: "Decline EZ-bar skullcrusher",
        photo: "https://gymvisual.com/img/p/4/7/6/6/4766.gif",
        muscle:"triceps",
        equipment:"e-z_bar",
        difficulty:"intermediate"
    },
    {
        id: 91,
        name: "Dumbbell floor press",
        photo: "https://gymvisual.com/img/p/1/6/8/5/0/16850.gif",
        muscle:"triceps",
        equipment:"dumbell",
        difficulty:"intermediate"
    },
    {
        id: 91,
        name: "Cable V-bar push-down",
        photo: "https://gymvisual.com/img/p/1/0/4/7/2/10472.gif",
        muscle:"triceps",
        equipment:"body_only",
        difficulty:"intermediate"
    },
    {
        id: 91,
        name: "Reverse Grip Triceps Pushdown",
        photo: "https://gymvisual.com/img/p/2/4/7/8/6/24786.gif",
        muscle:"triceps",
        equipment:"cable",
        difficulty:"intermediate"
    },
    {
        id: 91,
        name: "Push-Ups - Close Triceps Position",
        photo: "https://www.inspireusafoundation.org/wp-content/uploads/2021/08/diamond-pushup.gif",
        muscle:"triceps",
        equipment:"body_only",
        difficulty:"intermediate"
    },
    {
        id: 91,
        name: "Single-arm cable triceps extension",
        photo: "https://gymvisual.com/img/p/2/2/9/7/9/22979.gif",
        muscle:"triceps",
        equipment:"cable",
        difficulty:"intermediate"
    },


]

// connect to mongoDB
connectDB();

// custom middleware logger
app.use(logger);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// middleware for cookies
app.use(cookieParser());

// built-in middleware for json 
app.use(express.json());

//serve static files
app.use('/', express.static(path.join(__dirname, '/public')));

// routes

app.get('/exercises', (req, res) => {
    res.send(exercises)
})

app.use('/', require('./routes/root'));
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));

app.use('/logout', require('./routes/logout'));
app.use(verifyJWT);
app.use('/refresh', require('./routes/refresh'));
app.use('/users', require('./routes/api/users'));

app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ "error": "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found");
    }
});

app.use(errorHandler);


mongoose.connection.once('open', () => {
    
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

