export const getNotifyItem = (id) => {
    switch (id) {
        case 'SendInvite':
            return { id: id, message: 'SendingInvitation', hideType: 'callBack' };
        case 'InviteSuccess':
            return { id: id, hideId: 'SendInvite', message: 'InvitationSentSuccessfully', alertType: 5 };
        case 'InviteFail':
            return { id: id, hideId: 'SendInvite', message: 'ErrorInSendingInvitation', alertType: 3 };

        case 'CreateAuth0User':
            return { id: id, message: 'CreatingUser', hideType: 'callBack' };
        case 'CreateAuth0UserSuccess':
            return { id: id, hideId: 'CreateAuth0User', message: 'UserCreatedSuccessfully', alertType: 5 };
        case 'CreateAuth0UserFail':
            return { id: id, hideId: 'CreateAuth0User', message: 'ErrorInCreatingUser', alertType: 3 };

        case 'CreatePersonnel':
            return { id: id, message: 'CreatingPersonnel', hideType: 'callBack' };
        case 'CreatePersonnelSuccess':
            return { id: id, hideId: 'CreatePersonnel', message: 'PersonnelCreatedSuccessfully', alertType: 5 };
        case 'CreatePersonnelFail':
            return { id: id, hideId: 'CreatePersonnel', message: 'ErrorInCreatingPersonnel', alertType: 3 };
        case 'LoadingGroupAdminLeadership':
            return { id: id, message: 'Loading', hideType: 'callBack' };
        case 'LoadUserMFA':
            return { id: id, message: 'Loading', hideType: 'callBack' };
        case 'ChangeMFA':
            return { id: id, message: 'ChangingMFA', hideType: 'callBack' };
        case 'ResetMFA':
            return { id: id, message: 'ResettingMFA', hideType: 'callBack' };
        case 'ComprehensiveExport':
            return { id: id, message: 'Exporting...', hideType: 'callBack' };
        default: return { id: id, message: 'Loading' };
    }
};