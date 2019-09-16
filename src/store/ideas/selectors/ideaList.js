import _ from 'lodash';
import numeral from 'numeral';
import { filterByValues, prepareObjectFromArray } from '../../../common/utils';
import AppConfig from '../../../appConfig';

const getValue = (value) => {
    if (!value || value === undefined) return 0;
    return parseFloat(numeral(value).format('0.0000'));
};

export const getAcceptedIdeas = (ideaGroups, ideas, groupId) => {
    var acceptedIdeaGroupIdeaIds = _.map(_.filter(ideaGroups,
        { 'LinkedGroupStatus': 3, 'GroupId': groupId.toLowerCase() }
    ), 'IdeaId');
    var acceptedIdeas = filterByValues(ideas, 'IdeaId', acceptedIdeaGroupIdeaIds);
    return acceptedIdeas;
};

export const getGroupId = (filter) => {
    if (!filter.groupId) {
        filter.groupId = AppConfig.env('groupId');
    }
    return (filter.ideaView === 'CompanyView' ? '00000000-0000-0000-0000-000000000000' : filter.groupId);
};

export const getActiveIdeaGroups = (ideaGroups, filteredIdeas, groupId) => {
    var activeIdeaIds = _.map(_.filter(filteredIdeas,
        { 'Status': 1 }
    ), 'IdeaId');
    var activeIdeaGroups = filterByValues(ideaGroups, 'IdeaId', activeIdeaIds);
    return activeIdeaGroups;
};

export const getConfigSetting = (config) => {
    var configSetting = { costOfCapital: 1, bigIdeaThreshold: 1000, ideaView: 'Ideas' };
    configSetting.costOfCapital = config['ClientSetting_CostOfCapital'] ? config['ClientSetting_CostOfCapital'].Value : '1';
    configSetting.bigIdeaThreshold = config['ClientSetting_BigIdeaThreshold'] ? getValue(config['ClientSetting_BigIdeaThreshold'].Value) : 1000;
    configSetting.defaultAmortizationPeriod = this.props.masterData.config['ClientSetting_DefaultAmortizationPeriod'] ? this.props.masterData.config['ClientSetting_DefaultAmortizationPeriod'].Value : '1';
    return configSetting;
};


const getIdeaValueComponents = (_lineitemMonthlyValues, idea) => {
    var lineitemMonthlyValues = [];

    lineitemMonthlyValues = _.filter(_lineitemMonthlyValues, (item) => {
        return (
            1 === (
                (
                    item.ValueStatus === 1 ? (item.IsRough === true ? 1 : 0) : (item.ValueStatus > 1 && !item.IsRough && !item.IsIT ? 1 : 0)
                )
                ||
                (
                    idea.ITValueStatus < 2 ? ((item.IsRough === true && item.IsIT === true) ? 1 : 0) : (idea.ITValueStatus > 1 && item.IsIT ? 1 : 0)
                )
            )
        )
    });

    var valueComponents = { npeRec: 0, peRec: 0, netOneTime: 0, netOneTimeUnAmortized: 0, recMargin: 0, oneTimeMargin: 0, oneTimeMarginUnAmortized: 0, itOneTime: 0, itOneTimeUnAmortized: 0, npeOneTime: 0, npeOneTimeUnAmortized: 0 };
    if (idea.ITValueStatus > 1) {
        valueComponents.npeRec = _.sumBy(filterByValues(lineitemMonthlyValues, 'LineItemSubType', [31, 32, 42]), 'Value');
        valueComponents.peRec = _.sumBy(filterByValues(lineitemMonthlyValues, 'LineItemSubType', [21, 22, 25]), 'Value');
        valueComponents.itOneTime = _.sumBy(_.filter(lineitemMonthlyValues, { 'LineItemSubType': 41 }), 'Value');
        valueComponents.itOneTimeUnAmortized = _.sumBy(_.filter(lineitemMonthlyValues, { 'LineItemSubType': 41 }), (item) => { return (item.DirectionType * item.Amount) });
        valueComponents.netOneTime = _.sumBy(filterByValues(lineitemMonthlyValues, 'LineItemSubType', [33, 34, 41, 35, 36, 13, 14]), 'Value');
        valueComponents.netOneTimeUnAmortized = _.sumBy(filterByValues(lineitemMonthlyValues, 'LineItemSubType', [33, 34, 41, 35, 36, 13, 14]), (item) => { return (item.DirectionType * item.Amount) });
    } else {

        if (idea.ITValueStatus > 0) {
            valueComponents.npeRec = _.sumBy(filterByValues(lineitemMonthlyValues, 'LineItemSubType', [31, 32, 42]), 'Value');
        } else {
            valueComponents.npeRec = _.sumBy(filterByValues(lineitemMonthlyValues, 'LineItemSubType', [31, 32]), 'Value');
        }
        valueComponents.peRec = _.sumBy(filterByValues(lineitemMonthlyValues, 'LineItemSubType', [21, 22]), 'Value');
        valueComponents.netOneTime = _.sumBy(filterByValues(lineitemMonthlyValues, 'LineItemSubType', [33, 34, 35, 36, 13, 14]), 'Value');
        valueComponents.netOneTimeUnAmortized = _.sumBy(filterByValues(lineitemMonthlyValues, 'LineItemSubType', [33, 34, 35, 36, 13, 14]), (item) => { return (item.DirectionType * item.Amount) });
    }
    valueComponents.npeOneTime = _.sumBy(filterByValues(lineitemMonthlyValues, 'LineItemSubType', [33, 34, 35, 36]), 'Value');
    valueComponents.npeOneTimeUnAmortized = _.sumBy(filterByValues(lineitemMonthlyValues, 'LineItemSubType', [33, 34, 35, 36]), (item) => { return (item.DirectionType * item.Amount) });

    valueComponents.recMargin = _.sumBy(_.filter(lineitemMonthlyValues, (item) => { return (item.LineItemSubType === 11 || item.LineItemSubType === 12) }), 'Value');
    valueComponents.oneTimeMargin = _.sumBy(_.filter(lineitemMonthlyValues, (item) => { return (item.LineItemSubType === 13 || item.LineItemSubType === 14) }), 'Value');
    valueComponents.oneTimeMarginUnAmortized = _.sumBy(_.filter(lineitemMonthlyValues, (item) => { return (item.LineItemSubType === 13 || item.LineItemSubType === 14) }), (item) => { return (item.DirectionType * item.Amount) });
    valueComponents.itRec = _.sumBy(_.filter(lineitemMonthlyValues, { 'LineItemSubType': 42 }), 'Value');
    valueComponents.fteNumber = _.sumBy(lineitemMonthlyValues, 'FTE');
    valueComponents.workingCapital = _.sumBy(filterByValues(lineitemMonthlyValues, 'LineItemSubType', [35, 36]), 'Value');
    valueComponents.itPERec = _.sumBy(_.filter(lineitemMonthlyValues, { 'LineItemSubType': 25 }), 'Value');
    //valueComponents.lineItemCount = lineitemMonthlyValues.length;
    valueComponents.lineItemCount = _.filter(lineitemMonthlyValues, function (l) { return (!l.IsRough) && l.CostLineItemId === null }).length;
    //valueComponents.recMargin = _.sumBy(_.filter(lineitemMonthlyValues, (item) => { return (item.LineItemSubType === 11 || item.LineItemSubType === 12) }), 'Value');
    return valueComponents;
};

const getLineItemMonthlyValueWithValueStatus = (lineitemMonthlyValues, ideaGroups) => {
    var dictionaryIdeaGroups = prepareObjectFromArray(ideaGroups, ['IdeaId', 'GroupId']);
    _.map(lineitemMonthlyValues, (item) => {
        var ideaGroup = dictionaryIdeaGroups[item.IdeaId + '-' + item.GroupId] ? dictionaryIdeaGroups[item.IdeaId + '-' + item.GroupId] : null;
        if (ideaGroup) {
            item.ValueStatus = ideaGroup.ValueStatus;
        }
    });
    return lineitemMonthlyValues;
};

export const getIdeaList = (ideas, permissions, filter, selectedView, showInactiveIdea, lineitemMonthlyValues) => {
    if (Object.keys(ideas).length === 0 || ideas["ideas"] === undefined) { return '' }
    var filteredIdeas = [];
    if (!filter.groupId) {
        filter.groupId = AppConfig.env('groupId');  //44EDEFE5-BE29-6CB1-473B-AD57B7965DE9,50377BA4-31EA-449D-9ABA-99E1773A77B5
    }

    var groupId = (filter.ideaView === 'CompanyView' ? '00000000-0000-0000-0000-000000000000' : filter.groupId);
    if (groupId === null) {
        filteredIdeas = [];
    } else {
        var permissions = Object.keys(Object.assign({}, permissions.userPermissions));
        if (groupId === '00000000-0000-0000-0000-000000000000') {
            filteredIdeas = ideas.ideas;
            filteredIdeas = _.filter(filteredIdeas, function (idea) {
                var focusAreaId = (idea.FocusAreaId === '00000000-0000-0000-0000-000000000000' || idea.FocusAreaId == null ? '' : idea.FocusAreaId.toLowerCase());
                return (permissions.indexOf(idea.IdeaGroupId.toLowerCase()) > -1 || (focusAreaId !== '' && permissions.indexOf(focusAreaId) > -1) || (permissions.indexOf(idea.GroupId.toLowerCase()) > -1));
            });
        } else {
            filteredIdeas = getAcceptedIdeas(ideas.ideaGroups, ideas.ideas, groupId);
            //Implemented permission for groups not having any role.
            if (permissions.indexOf(groupId) === -1) {
                filteredIdeas = _.filter(filteredIdeas, function (idea) {
                    var focusAreaId = (idea.FocusAreaId === '00000000-0000-0000-0000-000000000000' || idea.FocusAreaId == null ? '' : idea.FocusAreaId.toLowerCase());
                    return (permissions.indexOf(idea.IdeaGroupId.toLowerCase()) > -1 || (focusAreaId !== '' && permissions.indexOf(focusAreaId) > -1));
                });
            }
            if (selectedView !== 1 && selectedView !== 2) {
                filteredIdeas = _.filter(ideas.ideas, function (idea) {
                    return idea.GroupId.toLowerCase() === groupId.toLowerCase();
                });
            }
        }
    }
    filteredIdeas = filteredIdeas.filter(function (el) {
        return (el.Status !== 3 && (el.Status !== 2 || !el.IsArchivePending) && !el.IsAcceptancePending)
    });
    var _lineitemMonthlyValues = [];
    var ideaLineitemMonthlyValues = [];
    if (lineitemMonthlyValues) {
        _lineitemMonthlyValues = _.cloneDeep(getLineItemMonthlyValueWithValueStatus(_.cloneDeep(lineitemMonthlyValues), ideas.ideaGroups));
    }
    var _ideaGroups = _.groupBy(ideas.ideaGroups, 'IdeaId');
    _.map(filteredIdeas, (item) => {
        item.IsImpactsAssigned = !_.isEmpty(item.ExpectedPEImpacts) || !_.isEmpty(item.ExpectedPEImpacts) || !_.isEmpty(item.ExpectedRevenueImpacts) ? true : false;
        item.IsFinancialValidated = item.ValueStatus === 4 ? true : false;
        var filterIdeaGroups = _.filter(_ideaGroups[item.IdeaId], { 'IdeaId': item.IdeaId, 'LinkedGroupStatus': 3 });
        item.LinkedGroupsCount = filterIdeaGroups.length - 1;
        if (lineitemMonthlyValues) {
            ideaLineitemMonthlyValues = _.filter(_lineitemMonthlyValues, (obj) => { return obj.IdeaId === item.IdeaId && obj.CostLineItemId === null });
            var valueComponentsCompanyImpact = getIdeaValueComponents(ideaLineitemMonthlyValues, item);
            item.CompanyImpactNPERecurring = valueComponentsCompanyImpact.npeRec;
            item.CompanyImpactPERecurring = valueComponentsCompanyImpact.peRec;
            item.CompanyImpactNetOneTime = valueComponentsCompanyImpact.netOneTime;
            item.CompanyImpactOneTimeMargin = valueComponentsCompanyImpact.oneTimeMargin;
            item.CompanyImpactITOneTime = valueComponentsCompanyImpact.itOneTime;
            item.CompanyImpactNpeOneTime = valueComponentsCompanyImpact.npeOneTime;
            item.IdeaOneTimeITValue = valueComponentsCompanyImpact.itOneTime;
            item.CompanyImpactRecurringMargin = valueComponentsCompanyImpact.recMargin;
            item.IdeaRecurringITValue = valueComponentsCompanyImpact.itRec + valueComponentsCompanyImpact.itPERec;
            item.IdeaFTENumber = valueComponentsCompanyImpact.fteNumber;
            item.IdeaRecurringNPEValue = valueComponentsCompanyImpact.npeRec;
            item.IdeaPEValue = valueComponentsCompanyImpact.peRec;
            item.IdeaOnetimeNPEValue = valueComponentsCompanyImpact.npeOneTime;
            item.IdeaOnetimeMarginChangeValue = valueComponentsCompanyImpact.oneTimeMargin;
            item.IdeaRecurringMarginChangeValue = valueComponentsCompanyImpact.recMargin;
            item.IdeaWorkingCapitalValue = valueComponentsCompanyImpact.workingCapital;
            item.IdeaLineItemCount = valueComponentsCompanyImpact.lineItemCount;

        }

        item.IsValidationNotRequired = item.IsValidationNotRequired;
        item.GroupRisk = item.RiskName;

    });

    if (!showInactiveIdea) {
        filteredIdeas = _.filter(filteredIdeas,
            { 'Status': 1 }
        );
    }

    return filteredIdeas;
};

