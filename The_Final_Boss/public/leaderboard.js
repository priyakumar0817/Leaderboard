/*
Leaderboard js file
*/
document.addEventListener('DOMContentLoaded', () => {

    // Retrieve common variables used
    let template = document.querySelector('template');
    let container = document.querySelector('.idea-container');
    let section;
    let sectionid;
    let idea;
    let teamname;
    let teamid;
    let rank;
    // first fetch the section numbers
    fetch('https://slidespace.icu/api/sections')
        .then(async response => {
            response = await response.text();
            let sections = JSON.parse(response);
            sections = JSON.parse(sections['sections'])

            // now fetch section ids
            for (const i in sections) {

                section = "SECTION: " + sections[i];
                sectionid = "SEC ID: " + i;
                await fetch(`https://slidespace.icu/api/sections/${i}/teams`)
                    .then(async response => await response.json())
                    .then(section_id => {
                        section_id = JSON.parse(section_id['names'])
                        console.log(section_id)
                        for (const j in section_id) {
                            // create the new ideas from the template
                            container.insertAdjacentHTML('beforeend', template.innerHTML);
                            let row = container.lastElementChild;
                            let columns = row.querySelectorAll('p');
                            columns[0].innerText = section_id[j];
                            columns[1].innerText = section;
                            columns[2].innerText = sectionid;
                            // fetch the teams
                            fetch(`https://slidespace.icu/api/teams/${j}`)
                                .then(response => response.json())
                                .then(team_id => {
                                    team_id = JSON.parse(team_id['team'])

                                    idea = "idea: " + team_id['name'];
                                    teamname = "MEMBERS: ";
                                    JSON.parse(team_id.members).forEach((name) => {
                                        teamname += name + ", ";
                                    });

                                    teamid = "TEAM ID: " + team_id['id'];
                                    // fetch scores 
                                    fetch(`https://slidespace.icu/api/teams/${team_id.id}/scores`)
                                        .then(response => response.json())
                                        .then(scores => {
                                            scores = JSON.parse(scores['scores'])
                                            var sum = 0;
                                            for (let i in scores) {
                                                sum += parseInt(scores[i]);
                                            }
                                            sum = (sum / Object.keys(scores).length)
                                            rank = sum;
                                            columns[5].innerText = 'RANK: ' + rank;
                                        })
                                        .catch(err => console.error(err));


                                    columns[3].innerText = teamname;
                                    columns[4].innerText = teamid;
                                })
                                .catch(err => console.error(err));
                        }
                    })
                    .catch(err => console.error(err));
            }
        })
        .catch(err => console.error(err));
});