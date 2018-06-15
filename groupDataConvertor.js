function convertApiDataToGroupResponse(groupResults, teamResults, groupLetter, response) {
    var groupResponse = new GroupResponse();

    var groupResultsForSelectedGroup = groupResults.filter(entry => entry.group.letter === groupLetter);

    if (groupResultsForSelectedGroup.length != 0) {
        groupResponse.groupName = "Group " + groupResultsForSelectedGroup.group[0].letter;

        var groupTeams = groupResultsForSelectedGroup.group[0].teams;
        var tableTeams = [];

        groupTeams.forEach((team) => { var tableTeam })
    }
}