import _ from 'lodash';
import update from 'immutability-helper';

export const updateJobTitle = (functionalTitleMap, updatedFunctionalTitleMap) => {
    const updatedFTMapIndex = _.findIndex(functionalTitleMap, { 'JobTitle': updatedFunctionalTitleMap.JobTitle });
    if (updatedFTMapIndex !== -1) {
        functionalTitleMap = update(functionalTitleMap, {
            [updatedFTMapIndex]: {
                FunctionalTitleMapId: { $set: updatedFunctionalTitleMap.FunctionalTitleMapId }, 
                FunctionalTitles: { $set: updatedFunctionalTitleMap.FunctionalTitles },
                FunctionalTitleId: { $set: '' },
                ManualFTCount: { $set: updatedFunctionalTitleMap.ManualFTCount }, ModifiedOn: { $set: updatedFunctionalTitleMap.ModifiedOn },
                PositionCount: { $set: updatedFunctionalTitleMap.PositionCount }
            }
        });
    }
    return functionalTitleMap;
};

export const updatePersonnel = (personnel, updatedPersonnelData) => {
    const updatedPersonnelFTIndex = _.findIndex(personnel, { 'PersonnelId': updatedPersonnelData.PersonnelId });
    if (updatedPersonnelFTIndex !== -1) {
        personnel = update(personnel, {
            [updatedPersonnelFTIndex]: {
                FunctionalTitle: { $set: updatedPersonnelData.FunctionalTitle },
                FunctionalTitleId: { $set: updatedPersonnelData.FunctionalTitleId },
                IsManualFT: { $set: updatedPersonnelData.IsManualFT },
            }
        });
    }
    return personnel;
};

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
