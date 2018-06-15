function convertApiDataToGroupResponse( teamResults, groupLetter, response) {
    var groupResponse = new GroupResponse();

    var teamResultsForSelectedGroup = teamResults.filter(entry => entry.group_letter === groupLetter);

    if (teamResultsForSelectedGroup.length != 0) {
        groupResponse.groupName = "Group " + groupLetter;
        var tableTeams = [];

        teamResultsForSelectedGroup.forEach((team) => {
            var groupTableEntry = new GroupTableEntry();

            groupTableEntry.name = team.country;
            groupTableEntry.points = team.points;
            groupTableEntry.wins = team.wins;
            groupTableEntry.losses = team.losses;
            groupTableEntry.draws = team.draws;
            groupTableEntry.goalsFor = team.goals_for;
            groupTableEntry.goalAgainst = team.goals_against;
            groupTableEntry.goalDifference = team.goal_differential;

            tableTeams.add(groupTableEntry);
        })

    }
    response.send(JSON.stringify(groupResponse));
}