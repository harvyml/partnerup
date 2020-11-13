const express = require("express")
const app = express()
const axios = require("axios")
const bodyParser = require("body-parser")
const routes = require("./router")

//static assets
app.use("/public", express.static("public"))
app.use("/routes", routes)
//body-parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
/**
 * function to get my skills
 */
app.get("/api/user/:username", (req, res) => {
    const {username} = req.params
    getStrengths(username, req, res)
})

app.get("/api/users", (req, res) => {
    axios.post(`https://search.torre.co/people/_search/?offset=${req.query.offset}&size=${req.query.size}&aggregate=8`, {}).then(snap => {
        console.log(snap.data.results.length)
        //res.json(snap.data)
        res.json(skills(snap.data.results, req.query.array_of_skills))
        //res.json(openTo(snap.data.results, ["freelance-gigs", "hiring"]))
    }).catch(err => {
        res.json({err: err.message})
    })
})

/**
 * returns an array with the skills
 * @param {*} username 
 */
function getStrengths(username, req, res){
    axios.get(`https://bio.torre.co/api/bios/${username}`).then(snap => {
        console.log(snap.data)
        res.json(snap.data.strengths)
    }).catch(err => {
        console.log(err.message)
        res.json(err)
    })
}

/**
 * evaluate skills
 * @param people stands for the whole array of people brought from the api
 * @param prefered_user_skills stands for what the user currently using the app is looking for as a partner
 */
function skills(people, prefered_user_skills, default_skills = ["Leadership", "Communication", "Creativity", "Strategic Thinking"]){
    let best_people = [] // array of people according to the weight of their skills, this array has the username, name, and average weight of the default_skills and the prefered_user_skills
    people.forEach((person, i) => {
        let skills_list = person.skills
        var avg_skill = 0;
        for(let i = 0; i < skills_list.length; i++){
            //only if the skill exists in the default_skills array it will count them and make an average
            if(prefered_user_skills.length > 0 && prefered_user_skills.indexOf(skills_list[i].name) != -1){
                avg_skill += skills_list[i].weight
            }else if(prefered_user_skills.length == 0 && default_skills.indexOf(skills_list[i].name != -1)){
                avg_skill += skills_list[i].weight
            }
            
        }
        avg_skill = avg_skill / default_skills.length
        if(avg_skill > 0){
            best_people.push({username: person.username, average: avg_skill, picture: person.picture, name: person.name})
        }
    })
    return best_people.sort(compareValues("average", "desc"))
}

/**
 * Determines the people in which an openTo category appears the most in a descending order (NOT IMPLEMENTED YET IN THE APP, BUT ALGORITHM WORKS)
 * @param {Array} people 
 * @param {Array} user_openTo this are the arguments in which the user wants to get a partner to work with
 * @param {Array} default_openTo 
 */
function openTo(people, prefered_user_openTo, default_openTo=["advising", "freelance-gigs", "hiring", "mentoring"]){
    var best_people = []
    people.forEach((person, i) => {
        var times_of_found_openTo = 0; 
        for(let i = 0; i < person.openTo.length; i++){
            if(prefered_user_openTo.indexOf(person.openTo[i]) != -1){
                times_of_found_openTo += 1
            }
        }
        best_people.push({username: person.username, times_openedTo: times_of_found_openTo})
    })
    return best_people.sort(compareValues("times_openedTo", "desc"))
}

/**
 * compareValues is a function that sorts an array of objects
 * sort from best to worst weight  
 * @param key is the key in which we want to direct the sorting
 */
function compareValues(key, order = 'asc') {
    return function innerSort(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        // property doesn't exist on either object
        return 0;
      }
  
      const varA = (typeof a[key] === 'string')
        ? a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string')
        ? b[key].toUpperCase() : b[key];
  
      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return (
        (order === 'desc') ? (comparison * -1) : comparison
      );
    };
}


app.listen(3000, () => console.log("listening on port 3000"))