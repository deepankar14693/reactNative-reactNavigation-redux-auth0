import _ from 'lodash';
import update from 'immutability-helper';

export const updateFunctionalTitleData = (functionalTitles, updatedFunctionalTitle) => {
    const updatedFTIndex = _.findIndex(functionalTitles, { 'FunctionalTitleId': updatedFunctionalTitle.FunctionalTitleId });
    if (updatedFTIndex !== -1) {
        functionalTitles = update(functionalTitles, {
            [updatedFTIndex]: {
                GroupId: { $set: updatedFunctionalTitle.GroupId },
                Name: { $set: updatedFunctionalTitle.Name }, ModifiedOn: { $set: updatedFunctionalTitle.ModifiedOn },
                FTE: { $set: updatedFunctionalTitle.FTE },
                JobTitleCount: { $set: updatedFunctionalTitle.JobTitleCount },
                PersonnelCount: { $set: updatedFunctionalTitle.PersonnelCount },
                LineItemCount: { $set: updatedFunctionalTitle.LineItemCount }
            }
        });
    } else {
        functionalTitles = update(functionalTitles, { $splice: [[0, 0, updatedFunctionalTitle]] });
    }
    return functionalTitles;
};

export const deleteFunctionalTitleData = (functionalTitles, deletedFunctionalTitleId) => {
    const deletedFTIndex = _.findIndex(functionalTitles, { 'FunctionalTitleId': deletedFunctionalTitleId });
    if (deletedFTIndex !== -1) {
        functionalTitles = update(functionalTitles, { $splice: [[deletedFTIndex, 1]] });
    }
    return functionalTitles;
};