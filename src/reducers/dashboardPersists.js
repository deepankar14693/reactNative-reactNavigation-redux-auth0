const dashboardPersists = (state = [], action) => {
    switch (action.type) {
        case 'SET_DASHBOARD_PERSISTS':
            var stateObj = Object.assign({}, state);
            stateObj.selectedPhase = action.selectedPhase ? action.selectedPhase : stateObj.selectedPhase;
            stateObj.selectedDashboardMenu = action.selectedDashboardMenu ? action.selectedDashboardMenu : stateObj.selectedDashboardMenu;
            stateObj.selectedDashboardSubmenu = action.selectedDashboardSubmenu ? action.selectedDashboardSubmenu : stateObj.selectedDashboardSubmenu;
            return stateObj;
        case 'SET_IDEAVIEW_PERSISTS':
            var stateObj = Object.assign({}, state);
            stateObj.selectedIdeaView = action.selectedView;
            return stateObj;
        default:
            return state;
    }
}

export default dashboardPersists;