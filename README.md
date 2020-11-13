# Partner Up


Partner Up is a functionality created to make the search for a partner easy when starting a project, if you need to look for someone whom one of its best attributes is his creativity then the only thing you need to do is selecting creativity in one of the select boxes. **Remember that you need to choose between one of the options from the select, otherwise the search will not work properly.**

## Algorithms
The next algorithm is the one used for filtrating the people who have the most experience with certain skills. it uses a different function to sort the the array of objects by the weight of the skills so it is in **descending order**.
  ```
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

  ```

## How the app was built
The app was built thinking mostly in **performance**, that's why none of the data brought from torre's API is filtered on the client, as you can see in the code, all of the data is processed on the server. Partner Up has it's own API and that's where the frontend actually request the data, it doesn't go directly to torre's API, but it calls its own API and its own API requests the data to torre.

### Development Process
1. Understanding the torre API
2. Making the Partner Up API
3. Making the sorting algorithms
4. Designing frontend
5. Writing frontend code
6. implemented API on the frontend
7. Debugging


Thank you!