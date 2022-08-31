const LocalStrategy = require('passport-local');
const bcrypt = require('bcryptjs');
const db = require('../models')



const init = (passport) => {

    //req => passport => sessionid req.isAuthenticated() => respspose
    //done = next
    passport.use(new LocalStrategy({usernameField: 'email'}, async (email, password, done)=>{

        //scrape ifno from header 
        // check if user is in db
        // encrypt login password 
        // compare the encrypted passwords with what is in db
        // place the session on the login can persist
        try{

            console.log(email, password);
            let records = await db.users.findAll({where: {email:email}})// [{}]

            if(records){

                let record = records[0]
                //get the db password and compare it to the password that was entered in the form 

                bcrypt.compare(password, record.password, (err,  match)=>{

                    if(match){
                        console.log('passwords matched');
                        return done(null, record)
                    }
                    else{
                        console.log(`passwords didn't match`);

                        return done(null, false)
                    }
                })
            }
            else{
                // no user in our dabase 
                return done(null, false)
            }
        }
        catch(error){

            //error in trying to retrieve something from our db
            console.log(error);

            return done(error)
        }
    }))

    //add the user info to the session 
    // user is going to come from the record passed from the form
    passport.serializeUser((user, done)=>{

        done(null, user.id) // second argument is what goes on the session   session.id
    })

    // check if user is valide 
    //grab session id from usr cookie 
    // decode coode with secred
    
    passport.deserializeUser(async (id, done)=>{

        try{
            let foundUserInDBFromSessionID = await db.users.findByPk(id); //return object {}  if found

            if(foundUserInDBFromSessionID){
                done(null, foundUserInDBFromSessionID)  //still authenticated
            }
            else{
                done(null, false) // have to log back in
            }
        }
        catch(error){
            done(null, false)
        }
        
    })
}

module.exports = init;