import _ from 'lodash';
import update from 'immutability-helper';

export const updateCenterMap = (baselineDataObj, updatedCenter) => {
    let centerStateObj = Object.assign([], baselineDataObj.CenterMap);
    let hrDataStateObj = Object.assign([], baselineDataObj.HrData);
    let financeDataStateObj = Object.assign([], baselineDataObj.FinanceData);

    const index = _.findIndex(centerStateObj, { 'Center': updatedCenter.Center });
    if (index !== -1) {
        switch (updatedCenter.EventType) {
            case 'Group':
                centerStateObj = update(centerStateObj, { [index]: { GroupId: { $set: updatedCenter.GroupId }, CenterType: { $set: updatedCenter.CenterType } } });
                break;
            case 'Center':
                centerStateObj = update(centerStateObj, { [index]: { Center: { $set: updatedCenter.NewCenter } } });
                //Updated related HrData
                const centerPersonnels = _.filter(hrDataStateObj, { 'CostCenter': updatedCenter.Center });
                _.forEach(centerPersonnels, (personnel) => {
                    const personnelIndex = _.findIndex(hrDataStateObj, { 'PersonnelId': personnel.PersonnelId });
                    if (personnelIndex !== -1) {
                        hrDataStateObj = update(hrDataStateObj, { [personnelIndex]: { CostCenter: { $set: updatedCenter.NewCenter }, Group: { $set: updatedCenter.Group } } });
                    }
                });
                //Update related FinanceData
                const centerDataIds = _.filter(financeDataStateObj, { 'Center': updatedCenter.Center });
                _.forEach(centerDataIds, (centerDataRow) => {
                    const financeDataIndex = _.findIndex(financeDataStateObj, { 'CenterDataId': centerDataRow.CenterDataId });
                    if (financeDataIndex !== -1) {
                        financeDataStateObj = update(financeDataStateObj, { [financeDataIndex]: { Center: { $set: updatedCenter.NewCenter }, Group: { $set: updatedCenter.Group } } });
                    }
                });
                break;
            case 'Exclude':
            centerStateObj = update(centerStateObj, { [index]: { Exclude: { $set: updatedCenter.Exclude } } });
                break;
        }
    }
    return { centerStateObj, hrDataStateObj, financeDataStateObj };
};