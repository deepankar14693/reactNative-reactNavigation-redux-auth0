import _ from 'lodash';
import { getValue, prepareObjectFromArray, isEmpty } from '../../../common/utils';
import { emptyGLRiskDetailArray, emptyDecisionDetailArray, emptyDecisionValueSummaryArray, emptyGLRiskValueSummaryArray, emptyRiskYearlyArray } from '../../../common/constants';
import numeral from 'numeral';
import getArrayFromObject from 'object.values';

const getSCR1RiskRatingDetail = (ideaGroups, dictionaryGroupFocusAreas, peBaselineSummary, npeBaselineSummary, revenueBaselineSummary, peLineitems, npeLineitems, revenueLineitems) => {
    var glRiskDetailArray = emptyGLRiskDetailArray();
    var emptyFocusAreaId = '00000000-0000-0000-0000-000000000000';
    var result = _.map(ideaGroups,
        (item) => {

            if (item.FocusAreaId && item.FocusAreaId !== emptyFocusAreaId) {
                if (dictionaryGroupFocusAreas[item.FocusAreaId.toLowerCase()]) {
                    dictionaryGroupFocusAreas[item.FocusAreaId.toLowerCase()].TotalIdeas.push(item.IdeaId);
                    dictionaryGroupFocusAreas[item.FocusAreaId.toLowerCase()].TotalValue = dictionaryGroupFocusAreas[item.FocusAreaId.toLowerCase()].TotalValue + (item.ValueStatus < 2 ? getValue(item.RoughValue) : getValue(item.Value));
                }
            }
            else {
                if (dictionaryGroupFocusAreas[emptyFocusAreaId]) {
                    dictionaryGroupFocusAreas[emptyFocusAreaId].TotalIdeas.push(item.IdeaId);
                    dictionaryGroupFocusAreas[emptyFocusAreaId].TotalValue = dictionaryGroupFocusAreas[emptyFocusAreaId].TotalValue + (item.ValueStatus < 2 ? getValue(item.RoughValue) : getValue(item.Value));
                }
            }

            switch (item.SCR1RiskRatingType) {
                case 1:
                    glRiskDetailArray.LRiskCount = glRiskDetailArray.LRiskCount + 1;
                    glRiskDetailArray.LRiskValue = glRiskDetailArray.LRiskValue + (item.ValueStatus < 2 ? getValue(item.RoughValue) : getValue(item.Value));
                    if (item.FocusAreaId && item.FocusAreaId !== emptyFocusAreaId) {
                        if (dictionaryGroupFocusAreas[item.FocusAreaId.toLowerCase()]) {
                            dictionaryGroupFocusAreas[item.FocusAreaId.toLowerCase()].LRiskIdeas.push(item.IdeaId);
                            dictionaryGroupFocusAreas[item.FocusAreaId.toLowerCase()].LRiskValue = dictionaryGroupFocusAreas[item.FocusAreaId.toLowerCase()].LRiskValue + (item.ValueStatus < 2 ? getValue(item.RoughValue) : getValue(item.Value));
                        }
                    }
                    else {
                        if (dictionaryGroupFocusAreas[emptyFocusAreaId]) {
                            dictionaryGroupFocusAreas[emptyFocusAreaId].LRiskIdeas.push(item.IdeaId);
                            dictionaryGroupFocusAreas[emptyFocusAreaId].LRiskValue = dictionaryGroupFocusAreas[emptyFocusAreaId].LRiskValue + (item.ValueStatus < 2 ? getValue(item.RoughValue) : getValue(item.Value));
                        }
                    }
                    break;
                case 2:
                    glRiskDetailArray.MRiskCount = glRiskDetailArray.MRiskCount + 1;
                    glRiskDetailArray.MRiskValue = glRiskDetailArray.MRiskValue + (item.ValueStatus < 2 ? getValue(item.RoughValue) : getValue(item.Value));
                    if (item.FocusAreaId && item.FocusAreaId !== emptyFocusAreaId) {
                        if (dictionaryGroupFocusAreas[item.FocusAreaId.toLowerCase()]) {
                            dictionaryGroupFocusAreas[item.FocusAreaId.toLowerCase()].MRiskIdeas.push(item.IdeaId);
                            dictionaryGroupFocusAreas[item.FocusAreaId.toLowerCase()].MRiskValue = dictionaryGroupFocusAreas[item.FocusAreaId.toLowerCase()].MRiskValue + (item.ValueStatus < 2 ? getValue(item.RoughValue) : getValue(item.Value));
                        }
                    }
                    else {
                        if (dictionaryGroupFocusAreas[emptyFocusAreaId]) {
                            dictionaryGroupFocusAreas[emptyFocusAreaId].MRiskIdeas.push(item.IdeaId);
                            dictionaryGroupFocusAreas[emptyFocusAreaId].MRiskValue = dictionaryGroupFocusAreas[emptyFocusAreaId].MRiskValue + (item.ValueStatus < 2 ? getValue(item.RoughValue) : getValue(item.Value));
                        }
                    }
                    break;
                case 3:
                    glRiskDetailArray.HRiskCount = glRiskDetailArray.HRiskCount + 1;
                    glRiskDetailArray.HRiskValue = glRiskDetailArray.HRiskValue + (item.ValueStatus < 2 ? getValue(item.RoughValue) : getValue(item.Value));
                    if (item.FocusAreaId && item.FocusAreaId !== emptyFocusAreaId) {
                        if (dictionaryGroupFocusAreas[item.FocusAreaId.toLowerCase()]) {
                            dictionaryGroupFocusAreas[item.FocusAreaId.toLowerCase()].HRiskIdeas.push(item.IdeaId);
                            dictionaryGroupFocusAreas[item.FocusAreaId.toLowerCase()].HRiskValue = dictionaryGroupFocusAreas[item.FocusAreaId.toLowerCase()].HRiskValue + (item.ValueStatus < 2 ? getValue(item.RoughValue) : getValue(item.Value));
                        }
                    }
                    else {
                        if (dictionaryGroupFocusAreas[emptyFocusAreaId]) {
                            dictionaryGroupFocusAreas[emptyFocusAreaId].HRiskIdeas.push(item.IdeaId);
                            dictionaryGroupFocusAreas[emptyFocusAreaId].HRiskValue = dictionaryGroupFocusAreas[emptyFocusAreaId].HRiskValue + (item.ValueStatus < 2 ? getValue(item.RoughValue) : getValue(item.Value));
                        }
                    }
                    break;
                default:
                    glRiskDetailArray.UnratedCount = glRiskDetailArray.UnratedCount + 1;
                    glRiskDetailArray.UnratedValue = glRiskDetailArray.UnratedValue + (item.ValueStatus < 2 ? getValue(item.RoughValue) : getValue(item.Value));
                    if (item.FocusAreaId && item.FocusAreaId !== emptyFocusAreaId) {
                        if (dictionaryGroupFocusAreas[item.FocusAreaId.toLowerCase()]) {
                            dictionaryGroupFocusAreas[item.FocusAreaId.toLowerCase()].UnratedIdeas.push(item.IdeaId);
                            dictionaryGroupFocusAreas[item.FocusAreaId.toLowerCase()].UnratedValue = dictionaryGroupFocusAreas[item.FocusAreaId.toLowerCase()].UnratedValue + (item.ValueStatus < 2 ? getValue(item.RoughValue) : getValue(item.Value));
                        }
                    }
                    else {
                        if (dictionaryGroupFocusAreas[emptyFocusAreaId]) {
                            dictionaryGroupFocusAreas[emptyFocusAreaId].UnratedIdeas.push(item.IdeaId);
                            dictionaryGroupFocusAreas[emptyFocusAreaId].UnratedValue = dictionaryGroupFocusAreas[emptyFocusAreaId].UnratedValue + (item.ValueStatus < 2 ? getValue(item.RoughValue) : getValue(item.Value));
                        }
                    }
                    break;
            }

            if (item.ValueStatus < 2) {

            } else {

            }
        })

    return { glRiskDetailArray: glRiskDetailArray, focusAreaSummary: dictionaryGroupFocusAreas }
}

const getGLRiskDetail = (ideaGroups, isRoughValue) => {
    var glRiskDetailArray = emptyGLRiskDetailArray();

    var result = _(ideaGroups)
        .groupBy('GLRiskRatingType')
        .map(function (items, itemId) {
            var obj = {};
            switch (itemId) {
                case '1':
                    glRiskDetailArray.LRiskCount = _.countBy(items, 'GLRiskRatingType')[1];
                    if (isRoughValue) {
                        glRiskDetailArray.LRiskValue = items.reduce((memo, item) => {
                            return memo + getValue(item.RoughValue)
                        }, 0);
                    } else {
                        glRiskDetailArray.LRiskValue = items.reduce((memo, item) => {
                            return memo + getValue(item.Savings - item.Costs)
                        }, 0);
                    }
                    glRiskDetailArray.LRiskIdeas = _.map(items, _.partialRight(_.pick, ['IdeaId']));

                    break;
                case '2':
                    glRiskDetailArray.MRiskCount = _.countBy(items, 'GLRiskRatingType')[2];
                    if (isRoughValue) {
                        glRiskDetailArray.MRiskValue = items.reduce((memo, item) => {
                            return memo + getValue(item.RoughValue)
                        }, 0);
                    } else {
                        glRiskDetailArray.MRiskValue = items.reduce((memo, item) => {
                            return memo + getValue(item.Savings - item.Costs)
                        }, 0);
                    }
                    glRiskDetailArray.MRiskIdeas = _.map(items, _.partialRight(_.pick, ['IdeaId']));
                    break;
                case '3':
                    glRiskDetailArray.HRiskCount = _.countBy(items, 'GLRiskRatingType')[3];
                    if (isRoughValue) {
                        glRiskDetailArray.HRiskValue = items.reduce((memo, item) => {
                            return memo + getValue(item.RoughValue)
                        }, 0);
                    } else {
                        glRiskDetailArray.HRiskValue = items.reduce((memo, item) => {
                            return memo + getValue(item.Savings - item.Costs)
                        }, 0);
                    }
                    glRiskDetailArray.HRiskIdeas = _.map(items, _.partialRight(_.pick, ['IdeaId']));
                    break;
                case '0':
                    glRiskDetailArray.UnratedCount = _.countBy(items, 'GLRiskRatingType')[0];
                    if (isRoughValue) {
                        glRiskDetailArray.UnratedValue = items.reduce((memo, item) => {
                            return memo + getValue(item.RoughValue)
                        }, 0);
                    } else {
                        glRiskDetailArray.UnratedValue = items.reduce((memo, item) => {
                            return memo + getValue(item.Savings - item.Costs)
                        }, 0);
                    }
                    glRiskDetailArray.UnratedIdeas = _.map(items, _.partialRight(_.pick, ['IdeaId']));
                    break;

                default: break;
            }
            return obj
        }).value();

    return glRiskDetailArray
}

const getBaselineImpacts = (ideaGroups, peBaselineSummary, npeBaselineSummary, revenueBaselineSummary, peLineitems, npeLineitems, revenueLineitems) => {
    var peDictionary = prepareObjectFromArray(peBaselineSummary, ['FunctionalTitleId']);
    var npeDictionary = prepareObjectFromArray(npeBaselineSummary, ['Category']);
    var revenueDictionary = prepareObjectFromArray(revenueBaselineSummary, ['Category']);

    var result = _.map(ideaGroups,
        (item) => {
            if (item.ValueStatus < 2) {
                if (!isEmpty(item.ExpectedRevenueImpacts)) {
                    fillBaselineExpectedImapcts(item.IdeaId, item.ExpectedRevenueImpacts, revenueDictionary);
                }
                if (!isEmpty(item.ExpectedPEImpacts)) {
                    fillBaselineExpectedImapcts(item.IdeaId, item.ExpectedPEImpacts, peDictionary);
                }
                if (!isEmpty(item.ExpectedNPEImpacts)) {
                    fillBaselineExpectedImapcts(item.IdeaId, item.ExpectedNPEImpacts, npeDictionary);
                }
            } else {
                fillBaselineLineitemCategoryImapcts(item.IdeaId, item.GroupId, peDictionary, npeDictionary, revenueDictionary, peLineitems, npeLineitems, revenueLineitems);
            }
        })

    var peBaselineSummaryArray = Object.assign([], getArrayFromObject(peDictionary));

    peBaselineSummaryArray.map((item) => {
        item.IdeaCount = item.Ideas.length;
        return item;
    });

    var totalFTDollar = _.sumBy(peBaselineSummaryArray, 'TotalDollar');
    var totalFT = _.sumBy(peBaselineSummaryArray, 'TotalFTE');
    var totalIdeaCount = _.sumBy(peBaselineSummaryArray, 'IdeaCount');
    peBaselineSummaryArray.push(
        {
            GroupId: '00000000-0000-0000-0000-000000000000', FunctionalTitleId: '00000001-0000-0000-0000-000000000001', FunctionalTitleName: 'Total',
            TotalDollar: totalFTDollar, TotalFTE: totalFT, IdeaCount: totalIdeaCount
        }
    );

    var npeBaselineSummaryArray = Object.assign([], getArrayFromObject(npeDictionary));

    npeBaselineSummaryArray.map((item) => {
        item.IdeaCount = item.Ideas.length;
        return item;
    });

    var totalGLDollar = _.sumBy(npeBaselineSummaryArray, 'GLDollar');
    var totalIdeaCount = _.sumBy(npeBaselineSummaryArray, 'IdeaCount');
    npeBaselineSummaryArray.push(
        {
            GroupId: '00000000-0000-0000-0000-000000000000', Category: 'Total',
            GLDollar: totalGLDollar, IdeaCount: totalIdeaCount
        }
    );

    var revenueBaselineSummaryArray = Object.assign([], getArrayFromObject(revenueDictionary));

    revenueBaselineSummaryArray.map((item) => {
        item.IdeaCount = item.Ideas.length;
        return item;
    });

    var totalGLDollar = _.sumBy(revenueBaselineSummaryArray, 'GLDollar');
    var totalIdeaCount = _.sumBy(revenueBaselineSummaryArray, 'IdeaCount');
    revenueBaselineSummaryArray.push(
        {
            GroupId: '00000000-0000-0000-0000-000000000000', Category: 'Total',
            GLDollar: totalGLDollar, IdeaCount: totalIdeaCount
        }
    );

    return { npe: npeBaselineSummaryArray, pe: peBaselineSummaryArray, revenue: revenueBaselineSummaryArray };
};

const fillBaselineExpectedImapcts = (ideaId, imapctsValue, dictionary) => {
    var splitedArray = imapctsValue.split(',');
    _.map(splitedArray, (item) => {
        if (dictionary[item]) {
            if (dictionary[item].Ideas.indexOf(ideaId) === -1) {
                dictionary[item].Ideas.push(ideaId);
            }
        }
    });
};

const fillBaselineLineitemCategoryImapcts = (ideaId, groupId, peDictionary, npeDictionary, revenueDictionary, peLineitems, npeLineitems, revenueLineitems) => {
    var emptyFunctionalTitleId = '00000000-0000-0000-0000-000000000000';
    //pe
    var ideaPELineitems = _.filter(peLineitems, { 'IdeaId': ideaId, 'GroupId': groupId });
    var result = _.map(ideaPELineitems,
        (item) => {
            if (item.FunctionalTitleId && item.FunctionalTitleId !== emptyFunctionalTitleId) {
                if (peDictionary[item.FunctionalTitleId.toLowerCase()]) {
                    if (peDictionary[item.FunctionalTitleId.toLowerCase()].Ideas.indexOf(item.IdeaId) === -1) {
                        peDictionary[item.FunctionalTitleId.toLowerCase()].Ideas.push(item.IdeaId);
                    }
                }
            }
        });

    //npe
    var ideaNPELineitems = _.filter(npeLineitems, { 'IdeaId': ideaId, 'GroupId': groupId });
    var result = _.map(ideaNPELineitems,
        (item) => {
            if (!isEmpty(item.Category)) {
                if (npeDictionary[item.Category]) {
                    if (npeDictionary[item.Category].Ideas.indexOf(item.IdeaId) === -1) {
                        npeDictionary[item.Category].Ideas.push(item.IdeaId);
                    }
                }
            }
        });
    //revenue
    var ideaRevenueLineitems = _.filter(revenueLineitems, { 'IdeaId': ideaId, 'GroupId': groupId });
    var result = _.map(ideaRevenueLineitems,
        (item) => {
            if (!isEmpty(item.Category)) {
                if (revenueDictionary[item.Category]) {
                    if (revenueDictionary[item.Category].Ideas.indexOf(item.IdeaId) === -1) {
                        revenueDictionary[item.Category].Ideas.push(item.IdeaId);
                    }
                }
            }
        });
};

const getPEIdeaCountByFT = (lineitems, baselineSummary) => {
    var emptyFunctionalTitleId = '00000000-0000-0000-0000-000000000000';
    var dictionary = prepareObjectFromArray(baselineSummary, ['FunctionalTitleId']);
    var result = _.map(lineitems,
        (item) => {
            if (item.FunctionalTitleId && item.FunctionalTitleId !== emptyFunctionalTitleId) {
                if (dictionary[item.FunctionalTitleId.toLowerCase()]) {
                    if (dictionary[item.FunctionalTitleId.toLowerCase()].Ideas.indexOf(item.IdeaId) === -1) {
                        dictionary[item.FunctionalTitleId.toLowerCase()].Ideas.push(item.IdeaId);
                    }
                }
            }
        });
    var baselineSummaryArray = Object.assign([], getArrayFromObject(dictionary));

    baselineSummaryArray.map((item) => {
        item.IdeaCount = item.Ideas.length;
        return item;
    });

    var totalFTDollar = _.sumBy(baselineSummaryArray, 'TotalDollar');
    var totalFT = _.sumBy(baselineSummaryArray, 'TotalFTE');
    var totalIdeaCount = _.sumBy(baselineSummaryArray, 'IdeaCount');
    baselineSummaryArray.push(
        {
            GroupId: '00000000-0000-0000-0000-000000000000', FunctionalTitleId: '00000001-0000-0000-0000-000000000001', FunctionalTitleName: 'Total',
            TotalDollar: totalFTDollar, TotalFTE: totalFT, IdeaCount: totalIdeaCount
        }
    );

    return baselineSummaryArray;
};

const getNpeAndRevenueIdeaCountByCategory = (lineitems, baselineSummary) => {
    var dictionary = prepareObjectFromArray(baselineSummary, ['Category']);
    var result = _.map(lineitems,
        (item) => {
            if (!isEmpty(item.Category)) {
                if (dictionary[item.Category]) {
                    if (dictionary[item.Category].Ideas.indexOf(item.IdeaId) === -1) {
                        dictionary[item.Category].Ideas.push(item.IdeaId);
                    }
                }
            }
        });

    var baselineSummaryArray = Object.assign([], getArrayFromObject(dictionary));

    baselineSummaryArray.map((item) => {
        item.IdeaCount = item.Ideas.length;
        return item;
    });

    var totalGLDollar = _.sumBy(baselineSummaryArray, 'GLDollar');
    var totalIdeaCount = _.sumBy(baselineSummaryArray, 'IdeaCount');
    baselineSummaryArray.push(
        {
            GroupId: '00000000-0000-0000-0000-000000000000', Category: 'Total',
            GLDollar: totalGLDollar, IdeaCount: totalIdeaCount
        }
    );

    return baselineSummaryArray;
};

const getBaselineImapctIdeaCountSummary = (ideaGroups, state, groupId, ideaView, groupType) => {
    var peLineitems = [];
    var npeLineitems = [];
    var revenueLineitems = [];
    var baselineSummary = { npe: [], pe: [], revenue: [] };

    var peBaselineSummary = Object.assign([], _.filter(state.baselineSummary.FT, { 'GroupId': groupId }));
    var npeBaselineSummary = Object.assign([], _.filter(state.baselineSummary.NPE, { 'GroupId': groupId }));
    var revenueBaselineSummary = Object.assign([], _.filter(state.baselineSummary.Revenue, { 'GroupId': groupId }));

    //if (groupType === 2 || groupType === 3) 
    {
        peBaselineSummary.map((item) => {
            item.IdeaCount = 0;
            item.Ideas = [];
            return item;
        });

        npeBaselineSummary.map((item) => {
            item.IdeaCount = 0;
            item.Ideas = [];
            return item;
        });
        peLineitems = _.filter(state.ideas.ideaPersonnelLineItems, { 'GroupId': groupId });
        npeLineitems = _.filter(state.ideas.ideaNonPersonnelLineItems, { 'GroupId': groupId });
        // baselineSummary.pe = getPEIdeaCountByFT(peLineitems, baselineSummaryFT);
        // baselineSummary.npe = getNpeAndRevenueIdeaCountByCategory(npeLineitems, baselineSummaryNPE);
    }
    //if (groupType === 1 || groupType === 3) 
    {
        revenueBaselineSummary.map((item) => {
            item.IdeaCount = 0;
            item.Ideas = [];
            return item;
        });
        revenueLineitems = _.filter(state.ideas.ideaRevenueLineItems, { 'GroupId': groupId });
        //baselineSummary.revenue = getNpeAndRevenueIdeaCountByCategory(npeLineitems, baselineSummaryNPE);
    }

    baselineSummary = getBaselineImpacts(ideaGroups, peBaselineSummary, npeBaselineSummary, revenueBaselineSummary, peLineitems, npeLineitems, revenueLineitems);

    return baselineSummary;
};

const getSC1IdeaSummary = (ideaGroups, state, totalBaseline, groupId, groupType, ideaView) => {
    var ideaSummary = { values: [], focusAreaSummary: [], baselineSummary: [] };
    var dictionaryGroupFocusAreas = [];
    var baselineSummary = { npe: [], pe: [], revenue: [] };

    var scr1IdeaIdeaGroups = _.filter(ideaGroups, (item) => {
        return (item.LinkedGroupStatus === 3)
    });

    var focusAreas = state.masterData.focusAreas;
    var groupFocusAreas = _.filter(focusAreas, (item) => {
        return (item.GroupId.toLowerCase() === groupId.toLowerCase())
    });

    groupFocusAreas.map((item) => {
        item.LRiskValue = 0;
        item.MRiskValue = 0;
        item.HRiskValue = 0;
        item.UnratedValue = 0;
        item.TotalValue = 0;

        item.LRiskIdeas = [];
        item.MRiskIdeas = [];
        item.HRiskIdeas = [];
        item.UnratedIdeas = [];
        item.TotalIdeas = [];
        return item;
    });
    groupFocusAreas.push(
        {
            FocusAreaId: '00000000-0000-0000-0000-000000000000', FocusAreaNumber: 99999, Name: 'Unassigned',
            LRiskValue: 0, MRiskValue: 0, HRiskValue: 0, UnratedValue: 0, TotalValue: 0,
            LRiskIdeas: [], MRiskIdeas: [], HRiskIdeas: [], UnratedIdeas: [], TotalIdeas: [],
        }
    );

    dictionaryGroupFocusAreas = prepareObjectFromArray(groupFocusAreas, ['FocusAreaId']);

    baselineSummary = getBaselineImapctIdeaCountSummary(scr1IdeaIdeaGroups, state, groupId, groupType, ideaView);



    var scr1IdeaSumary = getSCR1RiskRatingDetail(scr1IdeaIdeaGroups, dictionaryGroupFocusAreas);//, state, groupId, ideaView);
    var focusAreaSummary = Object.assign([], getArrayFromObject(scr1IdeaSumary.focusAreaSummary));

    ideaSummary.focusAreaSummary = focusAreaSummary;
    ideaSummary.baselineSummary = baselineSummary;

    ideaSummary.values.push(
        {
            Phase: 1,
            Title: 'RoughValue',
            LRiskCount: scr1IdeaSumary.glRiskDetailArray.LRiskCount,
            MRiskCount: scr1IdeaSumary.glRiskDetailArray.MRiskCount,
            HRiskCount: scr1IdeaSumary.glRiskDetailArray.HRiskCount,
            UnratedCount: scr1IdeaSumary.glRiskDetailArray.UnratedCount,
            TotalCount: scr1IdeaSumary.glRiskDetailArray.LRiskCount + scr1IdeaSumary.glRiskDetailArray.MRiskCount + scr1IdeaSumary.glRiskDetailArray.HRiskCount + scr1IdeaSumary.glRiskDetailArray.UnratedCount,
            LRiskValue: scr1IdeaSumary.glRiskDetailArray.LRiskValue,
            MRiskValue: scr1IdeaSumary.glRiskDetailArray.MRiskValue,
            HRiskValue: scr1IdeaSumary.glRiskDetailArray.HRiskValue,
            UnratedValue: scr1IdeaSumary.glRiskDetailArray.UnratedValue,
            TotalValue: (scr1IdeaSumary.glRiskDetailArray.LRiskValue + scr1IdeaSumary.glRiskDetailArray.MRiskValue + scr1IdeaSumary.glRiskDetailArray.HRiskValue + scr1IdeaSumary.glRiskDetailArray.UnratedValue)
        }
    );
    return ideaSummary;
};

const getCFandPLYearlyValues = (lineItemMonthlyValues, groupId, ideaId) => {
    var filteredLineItem = _.filter(lineItemMonthlyValues, { 'GroupId': groupId, 'IdeaId': ideaId });
    var pLValues = { Y1: 0, Y2: 0, Y3: 0, Y4: 0, Y5: 0 };
    var cFValues = { Y1: 0, Y2: 0, Y3: 0, Y4: 0, Y5: 0 };
    var summary = _.map(filteredLineItem, (item) => {
        if (item.LineItemType === 2) {
            cFValues.Y1 = cFValues.Y1 + getValue(item.PLY1);
            cFValues.Y2 = cFValues.Y2 + getValue(item.PLY2);
            cFValues.Y3 = cFValues.Y3 + getValue(item.PLY3);
            cFValues.Y4 = cFValues.Y4 + getValue(item.PLY4);
            cFValues.Y5 = cFValues.Y5 + getValue(item.PLY5);

            pLValues.Y1 = pLValues.Y1 + getValue(item.PLY1);
            pLValues.Y2 = pLValues.Y2 + getValue(item.PLY2);
            pLValues.Y3 = pLValues.Y3 + getValue(item.PLY3);
            pLValues.Y4 = pLValues.Y4 + getValue(item.PLY4);
            pLValues.Y5 = pLValues.Y5 + getValue(item.PLY5);
        } else {
            cFValues.Y1 = cFValues.Y1 + getValue(item.CFY1);
            cFValues.Y2 = cFValues.Y2 + getValue(item.CFY2);
            cFValues.Y3 = cFValues.Y3 + getValue(item.CFY3);
            cFValues.Y4 = cFValues.Y4 + getValue(item.CFY4);
            cFValues.Y5 = cFValues.Y5 + getValue(item.CFY5);

            pLValues.Y1 = pLValues.Y1 + getValue(item.PLY1);
            pLValues.Y2 = pLValues.Y2 + getValue(item.PLY2);
            pLValues.Y3 = pLValues.Y3 + getValue(item.PLY3);
            pLValues.Y4 = pLValues.Y4 + getValue(item.PLY4);
            pLValues.Y5 = pLValues.Y5 + getValue(item.PLY5);
        }
    });


    return { PL: pLValues, CF: cFValues };
};

const getDashBoardValueSummary = (ideaGroups, lineItemMonthlyValues) => {
    var decisionIdeaSummary = emptyDecisionDetailArray();
    var decisionValueSummary = emptyDecisionValueSummaryArray();

    var glRiskDetailedIdeaSummary = emptyGLRiskDetailArray();
    var glRiskRoughValueIdeaSummary = emptyGLRiskDetailArray();
    var glRiskValueSummary = emptyGLRiskValueSummaryArray();

    var glRiskPLSummary = emptyRiskYearlyArray();
    var glRiskCFSummary = emptyRiskYearlyArray();

    var yearlyValues = [];

    var result = _.map(ideaGroups,
        (item) => {
            decisionIdeaSummary.TotalCount = decisionIdeaSummary.TotalCount + 1;
            decisionIdeaSummary.TotalValue = decisionIdeaSummary.TotalValue + (item.ValueStatus > 1 ? getValue(item.Savings - item.Costs) : getValue(item.RoughValue));

            if (item.ValueStatus > 1) {
                glRiskDetailedIdeaSummary.TotalCount = glRiskDetailedIdeaSummary.TotalCount + 1;
                glRiskDetailedIdeaSummary.TotalValue = glRiskDetailedIdeaSummary.TotalValue + getValue(item.Savings - item.Costs);

            } else {
                glRiskRoughValueIdeaSummary.TotalCount = glRiskRoughValueIdeaSummary.TotalCount + 1;
                glRiskRoughValueIdeaSummary.TotalValue = glRiskRoughValueIdeaSummary.TotalValue + getValue(item.RoughValue);
            }

            //GL Risk Rating
            switch (item.GLRiskRatingType) {
                case 1:
                    if (item.ValueStatus > 1) {
                        //Cash Flow & PL Summary
                        yearlyValues = getCFandPLYearlyValues(lineItemMonthlyValues, item.GroupId, item.IdeaId);
                        glRiskPLSummary.LRisk.Y1 = glRiskPLSummary.LRisk.Y1 + yearlyValues.PL.Y1;
                        glRiskPLSummary.LRisk.Y2 = glRiskPLSummary.LRisk.Y2 + yearlyValues.PL.Y2;
                        glRiskPLSummary.LRisk.Y3 = glRiskPLSummary.LRisk.Y3 + yearlyValues.PL.Y3;
                        glRiskPLSummary.LRisk.Y4 = glRiskPLSummary.LRisk.Y4 + yearlyValues.PL.Y4;
                        glRiskPLSummary.LRisk.Y5 = glRiskPLSummary.LRisk.Y5 + yearlyValues.PL.Y5;

                        glRiskCFSummary.LRisk.Y1 = glRiskCFSummary.LRisk.Y1 + yearlyValues.CF.Y1;
                        glRiskCFSummary.LRisk.Y2 = glRiskCFSummary.LRisk.Y2 + yearlyValues.CF.Y2;
                        glRiskCFSummary.LRisk.Y3 = glRiskCFSummary.LRisk.Y3 + yearlyValues.CF.Y3;
                        glRiskCFSummary.LRisk.Y4 = glRiskCFSummary.LRisk.Y4 + yearlyValues.CF.Y4;
                        glRiskCFSummary.LRisk.Y5 = glRiskCFSummary.LRisk.Y5 + yearlyValues.CF.Y5;

                        //decisionIdeaSummary.GoIdeas.push(item.IdeaId);
                        glRiskDetailedIdeaSummary.LRiskCount = glRiskDetailedIdeaSummary.LRiskCount + 1;
                        glRiskDetailedIdeaSummary.LRiskValue = glRiskDetailedIdeaSummary.LRiskValue + getValue(item.Savings - item.Costs);
                        //Valuation Summary
                        //pe
                        glRiskValueSummary.pe.LRiskFTECost = glRiskValueSummary.pe.LRiskFTECost + getValue(item.FTECost);
                        glRiskValueSummary.pe.LRiskFTESaving = glRiskValueSummary.pe.LRiskFTESaving + getValue(item.FTESaving);
                        glRiskValueSummary.pe.LRiskRecurring = glRiskValueSummary.pe.LRiskRecurring + (getValue(item.PESaving) - getValue(item.PECost))
                        //npe
                        //Amortized value
                        glRiskValueSummary.npe.LRisk1TimeCost = glRiskValueSummary.npe.LRisk1TimeCost + getValue(item.OneTimeNPECost);
                        glRiskValueSummary.npe.LRisk1TimeSaving = glRiskValueSummary.npe.LRisk1TimeSaving + getValue(item.OneTimeNPESaving);
                        //UnAmortized value
                        glRiskValueSummary.npe.LRisk1TimeCostUnAmortized = glRiskValueSummary.npe.LRisk1TimeCostUnAmortized + getValue(item.OneTimeNPECostUnAmortized);
                        glRiskValueSummary.npe.LRisk1TimeSavingUnAmortized = glRiskValueSummary.npe.LRisk1TimeSavingUnAmortized + getValue(item.OneTimeNPESavingUnAmortized);
                        //Recurring Value
                        glRiskValueSummary.npe.LRiskRecurring = glRiskValueSummary.npe.LRiskRecurring + (getValue(item.RecurringNPESaving) - getValue(item.RecurringNPECost) + getValue(item.WorkingCapitalSaving) - getValue(item.WorkingCapitalCost));
                        //Revenue
                        //Margin
                        glRiskValueSummary.revenue.LRisk1TimeMargin = glRiskValueSummary.revenue.LRisk1TimeMargin + (getValue(item.OneTimeMarginSaving) - getValue(item.OneTimeMarginCost));
                        glRiskValueSummary.revenue.LRisk1TimeMarginUnAmortized = glRiskValueSummary.revenue.LRisk1TimeMarginUnAmortized + (getValue(item.OneTimeMarginSavingUnAmortized) - getValue(item.OneTimeMarginCostUnAmortized));
                        glRiskValueSummary.revenue.LRiskRecurringMargin = glRiskValueSummary.revenue.LRiskRecurringMargin + (getValue(item.RecurringMarginSaving) - getValue(item.RecurringMarginCost))
                        //Revenue
                        glRiskValueSummary.revenue.LRisk1TimeRevenue = glRiskValueSummary.revenue.LRisk1TimeRevenue + (getValue(item.OneTimeRevenueSaving) - getValue(item.OneTimeRevenueCost));
                        glRiskValueSummary.revenue.LRiskRecurringRevenue = glRiskValueSummary.revenue.LRiskRecurringRevenue + (getValue(item.RecurringRevenueSaving) - getValue(item.RecurringRevenueCost));
                        //Net Allocation From Other Groups
                        glRiskValueSummary.allocation.LRiskCosts = glRiskValueSummary.allocation.LRiskCosts + getValue(item.Costs);
                        glRiskValueSummary.allocation.LRiskSavings = glRiskValueSummary.allocation.LRiskSavings + getValue(item.Savings);
                        glRiskValueSummary.allocation.LRiskAllocatedValue = glRiskValueSummary.allocation.LRiskAllocatedValue + getValue(item.Value);
                        //IT
                        //Amortized
                        glRiskValueSummary.IT.LRisk1TimeCost = glRiskValueSummary.IT.LRisk1TimeCost + getValue(item.OneTimeNPECostIT);
                        //UnAmortized
                        glRiskValueSummary.IT.LRisk1TimeCostUnAmortized = glRiskValueSummary.IT.LRisk1TimeCostUnAmortized + getValue(item.OneTimeNPECostITUnAmortized);
                    } else {
                        glRiskRoughValueIdeaSummary.LRiskCount = glRiskRoughValueIdeaSummary.LRiskCount + 1;
                        glRiskRoughValueIdeaSummary.LRiskValue = glRiskRoughValueIdeaSummary.LRiskValue + getValue(item.RoughValue);
                    }
                    if (item.ITValueStatus > 1) {
                        //IT
                        //Amortized
                        glRiskValueSummary.IT.LRisk1TimeCost = glRiskValueSummary.IT.LRisk1TimeCost + getValue(item.OneTimeNPECostIT);
                        //UnAmortized
                        glRiskValueSummary.IT.LRisk1TimeCostUnAmortized = glRiskValueSummary.IT.LRisk1TimeCostUnAmortized + getValue(item.OneTimeNPECostITUnAmortized);
                    }
                    break;
                case 2:

                    if (item.ValueStatus > 1) {
                        //Cash Flow & PL Summary

                        yearlyValues = getCFandPLYearlyValues(lineItemMonthlyValues, item.GroupId, item.IdeaId);
                        glRiskPLSummary.MRisk.Y1 = glRiskPLSummary.MRisk.Y1 + yearlyValues.PL.Y1;
                        glRiskPLSummary.MRisk.Y2 = glRiskPLSummary.MRisk.Y2 + yearlyValues.PL.Y2;
                        glRiskPLSummary.MRisk.Y3 = glRiskPLSummary.MRisk.Y3 + yearlyValues.PL.Y3;
                        glRiskPLSummary.MRisk.Y4 = glRiskPLSummary.MRisk.Y4 + yearlyValues.PL.Y4;
                        glRiskPLSummary.MRisk.Y5 = glRiskPLSummary.MRisk.Y5 + yearlyValues.PL.Y5;

                        glRiskCFSummary.MRisk.Y1 = glRiskCFSummary.MRisk.Y1 + yearlyValues.CF.Y1;
                        glRiskCFSummary.MRisk.Y2 = glRiskCFSummary.MRisk.Y2 + yearlyValues.CF.Y2;
                        glRiskCFSummary.MRisk.Y3 = glRiskCFSummary.MRisk.Y3 + yearlyValues.CF.Y3;
                        glRiskCFSummary.MRisk.Y4 = glRiskCFSummary.MRisk.Y4 + yearlyValues.CF.Y4;
                        glRiskCFSummary.MRisk.Y5 = glRiskCFSummary.MRisk.Y5 + yearlyValues.CF.Y5;

                        //decisionIdeaSummary.NoGoIdeas.push(item.IdeaId);
                        glRiskDetailedIdeaSummary.MRiskCount = glRiskDetailedIdeaSummary.MRiskCount + 1;
                        glRiskDetailedIdeaSummary.MRiskValue = glRiskDetailedIdeaSummary.MRiskValue + getValue(item.Savings - item.Costs);

                        //Valuation Summary
                        //pe
                        glRiskValueSummary.pe.MRiskFTECost = glRiskValueSummary.pe.MRiskFTECost + getValue(item.FTECost);
                        glRiskValueSummary.pe.MRiskFTESaving = glRiskValueSummary.pe.MRiskFTESaving + getValue(item.FTESaving);
                        glRiskValueSummary.pe.MRiskRecurring = glRiskValueSummary.pe.MRiskRecurring + (getValue(item.PESaving) - getValue(item.PECost));
                        //npe
                        //Amortized
                        glRiskValueSummary.npe.MRisk1TimeCost = glRiskValueSummary.npe.MRisk1TimeCost + getValue(item.OneTimeNPECost);
                        glRiskValueSummary.npe.MRisk1TimeSaving = glRiskValueSummary.npe.MRisk1TimeSaving + getValue(item.OneTimeNPESaving);
                        //UnAmortized
                        glRiskValueSummary.npe.MRisk1TimeCostUnAmortized = glRiskValueSummary.npe.MRisk1TimeCostUnAmortized + getValue(item.OneTimeNPECostUnAmortized);
                        glRiskValueSummary.npe.MRisk1TimeSavingUnAmortized = glRiskValueSummary.npe.MRisk1TimeSavingUnAmortized + getValue(item.OneTimeNPESavingUnAmortized);
                        //Recurring
                        glRiskValueSummary.npe.MRiskRecurring = glRiskValueSummary.npe.MRiskRecurring + (getValue(item.RecurringNPESaving) - getValue(item.RecurringNPECost) + getValue(item.WorkingCapitalSaving) - getValue(item.WorkingCapitalCost));
                        //Revenue 
                        //Margin
                        glRiskValueSummary.revenue.MRisk1TimeMargin = glRiskValueSummary.revenue.MRisk1TimeMargin + (getValue(item.OneTimeMarginSaving) - getValue(item.OneTimeMarginCost));
                        glRiskValueSummary.revenue.MRisk1TimeMarginUnAmortized = glRiskValueSummary.revenue.MRisk1TimeMarginUnAmortized + (getValue(item.OneTimeMarginSavingUnAmortized) - getValue(item.OneTimeMarginCostUnAmortized));
                        glRiskValueSummary.revenue.MRiskRecurringMargin = glRiskValueSummary.revenue.MRiskRecurringMargin + (getValue(item.RecurringMarginSaving) - getValue(item.RecurringMarginCost));
                        //Revenue
                        glRiskValueSummary.revenue.MRisk1TimeRevenue = glRiskValueSummary.revenue.MRisk1TimeRevenue + (getValue(item.OneTimeRevenueSaving) - getValue(item.OneTimeRevenueCost));
                        glRiskValueSummary.revenue.MRiskRecurringRevenue = glRiskValueSummary.revenue.MRiskRecurringRevenue + (getValue(item.RecurringRevenueSaving) - getValue(item.RecurringRevenueCost));
                        //Net Allocation From Other Groups
                        glRiskValueSummary.allocation.MRiskCosts = glRiskValueSummary.allocation.MRiskCosts + getValue(item.Costs);
                        glRiskValueSummary.allocation.MRiskSavings = glRiskValueSummary.allocation.MRiskSavings + getValue(item.Savings);
                        glRiskValueSummary.allocation.MRiskAllocatedValue = glRiskValueSummary.allocation.MRiskAllocatedValue + getValue(item.Value);

                    } else {
                        glRiskRoughValueIdeaSummary.MRiskCount = glRiskRoughValueIdeaSummary.MRiskCount + 1;
                        glRiskRoughValueIdeaSummary.MRiskValue = glRiskRoughValueIdeaSummary.MRiskValue + getValue(item.RoughValue);
                        glRiskRoughValueIdeaSummary.MRiskIdeas.push(item);
                    }
                    if (item.ITValueStatus > 1) {
                        //IT
                        //Amortized
                        glRiskValueSummary.IT.MRisk1TimeCost = glRiskValueSummary.IT.MRisk1TimeCost + getValue(item.OneTimeNPECostIT);
                        //UnAmortized
                        glRiskValueSummary.IT.MRisk1TimeCostUnAmortized = glRiskValueSummary.IT.MRisk1TimeCostUnAmortized + getValue(item.OneTimeNPECostITUnAmortized);
                    }
                    break;
                case 3:
                    if (item.ValueStatus > 1) {
                        //Cash Flow & PL Summary
                        yearlyValues = getCFandPLYearlyValues(lineItemMonthlyValues, item.GroupId, item.IdeaId);
                        glRiskPLSummary.HRisk.Y1 = glRiskPLSummary.HRisk.Y1 + yearlyValues.PL.Y1;
                        glRiskPLSummary.HRisk.Y2 = glRiskPLSummary.HRisk.Y2 + yearlyValues.PL.Y2;
                        glRiskPLSummary.HRisk.Y3 = glRiskPLSummary.HRisk.Y3 + yearlyValues.PL.Y3;
                        glRiskPLSummary.HRisk.Y4 = glRiskPLSummary.HRisk.Y4 + yearlyValues.PL.Y4;
                        glRiskPLSummary.HRisk.Y5 = glRiskPLSummary.HRisk.Y5 + yearlyValues.PL.Y5;

                        glRiskCFSummary.HRisk.Y1 = glRiskCFSummary.HRisk.Y1 + yearlyValues.CF.Y1;
                        glRiskCFSummary.HRisk.Y2 = glRiskCFSummary.HRisk.Y2 + yearlyValues.CF.Y2;
                        glRiskCFSummary.HRisk.Y3 = glRiskCFSummary.HRisk.Y3 + yearlyValues.CF.Y3;
                        glRiskCFSummary.HRisk.Y4 = glRiskCFSummary.HRisk.Y4 + yearlyValues.CF.Y4;
                        glRiskCFSummary.HRisk.Y5 = glRiskCFSummary.HRisk.Y5 + yearlyValues.CF.Y5;

                        //decisionIdeaSummary.NoGoIdeas.push(item.IdeaId);
                        glRiskDetailedIdeaSummary.HRiskCount = glRiskDetailedIdeaSummary.HRiskCount + 1;
                        glRiskDetailedIdeaSummary.HRiskValue = glRiskDetailedIdeaSummary.HRiskValue + getValue(item.Savings - item.Costs);
                        //Valuation Summary
                        //pe
                        glRiskValueSummary.pe.HRiskFTECost = glRiskValueSummary.pe.HRiskFTECost + getValue(item.FTECost);
                        glRiskValueSummary.pe.HRiskFTESaving = glRiskValueSummary.pe.HRiskFTESaving + getValue(item.FTESaving);
                        glRiskValueSummary.pe.HRiskRecurring = glRiskValueSummary.pe.HRiskRecurring + (getValue(item.PESaving) - getValue(item.PECost));
                        //npe
                        //Amortized
                        glRiskValueSummary.npe.HRisk1TimeCost = glRiskValueSummary.npe.HRisk1TimeCost + getValue(item.OneTimeNPECost);
                        glRiskValueSummary.npe.HRisk1TimeSaving = glRiskValueSummary.npe.HRisk1TimeSaving + getValue(item.OneTimeNPESaving);
                        //UnAmortized
                        glRiskValueSummary.npe.HRisk1TimeCostUnAmortized = glRiskValueSummary.npe.HRisk1TimeCostUnAmortized + getValue(item.OneTimeNPECostUnAmortized);
                        glRiskValueSummary.npe.HRisk1TimeSavingUnAmortized = glRiskValueSummary.npe.HRisk1TimeSavingUnAmortized + getValue(item.OneTimeNPESavingUnAmortized);
                        //Recurring
                        glRiskValueSummary.npe.HRiskRecurring = glRiskValueSummary.npe.HRiskRecurring + (getValue(item.RecurringNPESaving) - getValue(item.RecurringNPECost) + getValue(item.WorkingCapitalSaving) - getValue(item.WorkingCapitalCost));
                        //Revenue 
                        //Margin
                        glRiskValueSummary.revenue.HRisk1TimeMargin = glRiskValueSummary.revenue.HRisk1TimeMargin + (getValue(item.OneTimeMarginSaving) - getValue(item.OneTimeMarginCost));
                        glRiskValueSummary.revenue.HRisk1TimeMarginUnAmortized = glRiskValueSummary.revenue.HRisk1TimeMarginUnAmortized + (getValue(item.OneTimeMarginSavingUnAmortized) - getValue(item.OneTimeMarginCostUnAmortized));
                        glRiskValueSummary.revenue.HRiskRecurringMargin = glRiskValueSummary.revenue.HRiskRecurringMargin + (getValue(item.RecurringMarginSaving) - getValue(item.RecurringMarginCost));
                        //Revenue Revenue
                        glRiskValueSummary.revenue.HRisk1TimeRevenue = glRiskValueSummary.revenue.HRisk1TimeRevenue + (getValue(item.OneTimeRevenueSaving) - getValue(item.OneTimeRevenueCost));
                        glRiskValueSummary.revenue.HRiskRecurringRevenue = glRiskValueSummary.revenue.HRiskRecurringRevenue + (getValue(item.RecurringRevenueSaving) - getValue(item.RecurringRevenueCost));
                        //Net Allocation From Other Groups
                        glRiskValueSummary.allocation.HRiskCosts = glRiskValueSummary.allocation.HRiskCosts + getValue(item.Costs);
                        glRiskValueSummary.allocation.HRiskSavings = glRiskValueSummary.allocation.HRiskSavings + getValue(item.Savings);
                        glRiskValueSummary.allocation.HRiskAllocatedValue = glRiskValueSummary.allocation.HRiskAllocatedValue + getValue(item.Value);

                    } else {
                        glRiskRoughValueIdeaSummary.HRiskCount = glRiskRoughValueIdeaSummary.HRiskCount + 1;
                        glRiskRoughValueIdeaSummary.HRiskValue = glRiskRoughValueIdeaSummary.HRiskValue + getValue(item.RoughValue);
                    }
                    if (item.ITValueStatus > 1) {
                        //IT
                        //Amortized
                        glRiskValueSummary.IT.HRisk1TimeCost = glRiskValueSummary.IT.HRisk1TimeCost + getValue(item.OneTimeNPECostIT);
                        //UnAmortized
                        glRiskValueSummary.IT.HRisk1TimeCostUnAmortized = glRiskValueSummary.IT.HRisk1TimeCostUnAmortized + getValue(item.OneTimeNPECostITUnAmortized);
                    }
                    break;
                default:
                    if (item.ValueStatus > 1) {
                        //Cash Flow & PL Summary
                        yearlyValues = getCFandPLYearlyValues(lineItemMonthlyValues, item.GroupId, item.IdeaId);
                        glRiskPLSummary.Unrated.Y1 = glRiskPLSummary.Unrated.Y1 + yearlyValues.PL.Y1;
                        glRiskPLSummary.Unrated.Y2 = glRiskPLSummary.Unrated.Y2 + yearlyValues.PL.Y2;
                        glRiskPLSummary.Unrated.Y3 = glRiskPLSummary.Unrated.Y3 + yearlyValues.PL.Y3;
                        glRiskPLSummary.Unrated.Y4 = glRiskPLSummary.Unrated.Y4 + yearlyValues.PL.Y4;
                        glRiskPLSummary.Unrated.Y5 = glRiskPLSummary.Unrated.Y5 + yearlyValues.PL.Y5;

                        glRiskCFSummary.Unrated.Y1 = glRiskCFSummary.Unrated.Y1 + yearlyValues.CF.Y1;
                        glRiskCFSummary.Unrated.Y2 = glRiskCFSummary.Unrated.Y2 + yearlyValues.CF.Y2;
                        glRiskCFSummary.Unrated.Y3 = glRiskCFSummary.Unrated.Y3 + yearlyValues.CF.Y3;
                        glRiskCFSummary.Unrated.Y4 = glRiskCFSummary.Unrated.Y4 + yearlyValues.CF.Y4;
                        glRiskCFSummary.Unrated.Y5 = glRiskCFSummary.Unrated.Y5 + yearlyValues.CF.Y5;

                        //glRiskDetailedIdeaSummary.NoRecIdeas.push(item.IdeaId);
                        glRiskDetailedIdeaSummary.UnratedCount = glRiskDetailedIdeaSummary.UnratedCount + 1;
                        glRiskDetailedIdeaSummary.UnratedValue = glRiskDetailedIdeaSummary.UnratedValue + getValue(item.Savings - item.Costs);
                        //Valuation Summary
                        //pe
                        glRiskValueSummary.pe.UnratedFTECost = glRiskValueSummary.pe.UnratedFTECost + getValue(item.FTECost);
                        glRiskValueSummary.pe.UnratedFTESaving = glRiskValueSummary.pe.UnratedFTESaving + getValue(item.FTESaving);
                        glRiskValueSummary.pe.UnratedRecurring = glRiskValueSummary.pe.UnratedRecurring + (getValue(item.PESaving) - getValue(item.PECost));
                        //npe
                        //Amortized
                        glRiskValueSummary.npe.Unrated1TimeCost = glRiskValueSummary.npe.Unrated1TimeCost + getValue(item.OneTimeNPECost);
                        glRiskValueSummary.npe.Unrated1TimeSaving = glRiskValueSummary.npe.Unrated1TimeSaving + getValue(item.OneTimeNPESaving);
                        //UnAmortized
                        glRiskValueSummary.npe.Unrated1TimeCostUnAmortized = glRiskValueSummary.npe.Unrated1TimeCostUnAmortized + getValue(item.OneTimeNPECostUnAmortized);
                        glRiskValueSummary.npe.Unrated1TimeSavingUnAmortized = glRiskValueSummary.npe.Unrated1TimeSavingUnAmortized + getValue(item.OneTimeNPESavingUnAmortized);
                        //Recurring
                        glRiskValueSummary.npe.UnratedRecurring = glRiskValueSummary.npe.UnratedRecurring + (getValue(item.RecurringNPESaving) - getValue(item.RecurringNPECost) + getValue(item.WorkingCapitalSaving) - getValue(item.WorkingCapitalCost));
                        //Revenue 
                        //Margin
                        glRiskValueSummary.revenue.Unrated1TimeMargin = glRiskValueSummary.revenue.Unrated1TimeMargin + (getValue(item.OneTimeMarginSaving) - getValue(item.OneTimeMarginCost));
                        glRiskValueSummary.revenue.Unrated1TimeMarginUnAmortized = glRiskValueSummary.revenue.Unrated1TimeMarginUnAmortized + (getValue(item.OneTimeMarginSavingUnAmortized) - getValue(item.OneTimeMarginCostUnAmortized));
                        glRiskValueSummary.revenue.UnratedRecurringMargin = glRiskValueSummary.revenue.UnratedRecurringMargin + (getValue(item.RecurringMarginSaving) - getValue(item.RecurringMarginCost));
                        //Revenue
                        glRiskValueSummary.revenue.Unrated1TimeRevenue = glRiskValueSummary.revenue.Unrated1TimeRevenue + (getValue(item.OneTimeRevenueSaving) - getValue(item.OneTimeRevenueCost));
                        glRiskValueSummary.revenue.UnratedRecurringRevenue = glRiskValueSummary.revenue.UnratedRecurringRevenue + (getValue(item.RecurringRevenueSaving) - getValue(item.RecurringRevenueCost));
                        //Net Allocation From Other Groups
                        glRiskValueSummary.allocation.UnratedCosts = glRiskValueSummary.allocation.UnratedCosts + getValue(item.Costs);
                        glRiskValueSummary.allocation.UnratedSavings = glRiskValueSummary.allocation.UnratedSavings + getValue(item.Savings);
                        glRiskValueSummary.allocation.UnratedAllocatedValue = glRiskValueSummary.allocation.UnratedAllocatedValue + getValue(item.Value);

                    } else {
                        glRiskRoughValueIdeaSummary.UnratedCount = glRiskRoughValueIdeaSummary.UnratedCount + 1;
                        glRiskRoughValueIdeaSummary.UnratedValue = glRiskRoughValueIdeaSummary.UnratedValue + getValue(item.RoughValue);
                    }
                    if (item.ITValueStatus > 1) {
                        //IT
                        //Amortized
                        glRiskValueSummary.IT.Unrated1TimeCost = glRiskValueSummary.IT.Unrated1TimeCost + getValue(item.OneTimeNPECostIT);
                        //UnAmortized
                        glRiskValueSummary.IT.Unrated1TimeCostUnAmortized = glRiskValueSummary.IT.Unrated1TimeCostUnAmortized + getValue(item.OneTimeNPECostITUnAmortized);
                    }
                    break;
            }

            //Recommendation
            switch (item.RecommendationType) {
                case 1:
                    //decisionIdeaSummary.GoIdeas.push(item.IdeaId);
                    decisionIdeaSummary.GoCount = decisionIdeaSummary.GoCount + 1;
                    decisionIdeaSummary.GoValue = decisionIdeaSummary.GoValue + (item.ValueStatus > 1 ? getValue(item.Savings - item.Costs) : getValue(item.RoughValue));
                    if (item.ValueStatus > 1) {
                        //Valuation Summary
                        //pe
                        decisionValueSummary.pe.GoFTECost = decisionValueSummary.pe.GoFTECost + getValue(item.FTECost);
                        decisionValueSummary.pe.GoFTESaving = decisionValueSummary.pe.GoFTESaving + getValue(item.FTESaving);
                        decisionValueSummary.pe.GoRecurring = decisionValueSummary.pe.GoRecurring + (getValue(item.PESaving) - getValue(item.PECost))
                        //npe
                        decisionValueSummary.npe.Go1TimeCost = decisionValueSummary.npe.Go1TimeCost + getValue(item.OneTimeNPECost);
                        decisionValueSummary.npe.Go1TimeSaving = decisionValueSummary.npe.Go1TimeSaving + getValue(item.OneTimeNPESaving);
                        decisionValueSummary.npe.GoRecurring = decisionValueSummary.npe.GoRecurring + (getValue(item.RecurringNPESaving) - getValue(item.RecurringNPECost) + getValue(item.WorkingCapitalSaving) - getValue(item.WorkingCapitalCost));
                        //Revenue Margin
                        decisionValueSummary.revenue.Go1TimeMargin = decisionValueSummary.revenue.Go1TimeMargin + (getValue(item.OneTimeMarginSaving) - getValue(item.OneTimeMarginCost));
                        decisionValueSummary.revenue.GoRecurringMargin = decisionValueSummary.revenue.GoRecurringMargin + (getValue(item.RecurringMarginSaving) - getValue(item.RecurringMarginCost))
                        //Revenue Revenue
                        decisionValueSummary.revenue.Go1TimeRevenue = decisionValueSummary.revenue.Go1TimeRevenue + (getValue(item.OneTimeRevenueSaving) - getValue(item.OneTimeRevenueCost));
                        decisionValueSummary.revenue.GoRecurringRevenue = decisionValueSummary.revenue.GoRecurringRevenue + (getValue(item.RecurringRevenueSaving) - getValue(item.RecurringRevenueCost));
                        //Net Allocation From Other Groups
                        decisionValueSummary.allocation.GoCosts = decisionValueSummary.allocation.GoCosts + getValue(item.Costs);
                        decisionValueSummary.allocation.GoSavings = decisionValueSummary.allocation.GoSavings + getValue(item.Savings);
                        decisionValueSummary.allocation.GoAllocatedValue = decisionValueSummary.allocation.GoAllocatedValue + getValue(item.Value);
                    }
                    break;
                case 2:
                    //decisionIdeaSummary.NoGoIdeas.push(item.IdeaId);
                    decisionIdeaSummary.NoGoCount = decisionIdeaSummary.NoGoCount + 1;
                    decisionIdeaSummary.NoGoValue = decisionIdeaSummary.NoGoValue + (item.ValueStatus > 1 ? getValue(item.Savings - item.Costs) : getValue(item.RoughValue));
                    if (item.ValueStatus > 1) {
                        //Valuation Summary
                        //pe
                        decisionValueSummary.pe.NoGoFTECost = decisionValueSummary.pe.NoGoFTECost + getValue(item.FTECost);
                        decisionValueSummary.pe.NoGoFTESaving = decisionValueSummary.pe.NoGoFTESaving + getValue(item.FTESaving);
                        decisionValueSummary.pe.NoGoRecurring = decisionValueSummary.pe.NoGoRecurring + (getValue(item.PESaving) - getValue(item.PECost));
                        //npe
                        decisionValueSummary.npe.NoGo1TimeCost = decisionValueSummary.npe.NoGo1TimeCost + getValue(item.OneTimeNPECost);
                        decisionValueSummary.npe.NoGo1TimeSaving = decisionValueSummary.npe.NoGo1TimeSaving + getValue(item.OneTimeNPESaving);
                        decisionValueSummary.npe.NoGoRecurring = decisionValueSummary.npe.NoGoRecurring + (getValue(item.RecurringNPESaving) - getValue(item.RecurringNPECost) + getValue(item.WorkingCapitalSaving) - getValue(item.WorkingCapitalCost));
                        //Revenue Margin
                        decisionValueSummary.revenue.NoGo1TimeMargin = decisionValueSummary.revenue.NoGo1TimeMargin + (getValue(item.OneTimeMarginSaving) - getValue(item.OneTimeMarginCost));
                        decisionValueSummary.revenue.NoGoRecurringMargin = decisionValueSummary.revenue.NoGoRecurringMargin + (getValue(item.RecurringMarginSaving) - getValue(item.RecurringMarginCost));
                        //Revenue Revenue
                        decisionValueSummary.revenue.NoGo1TimeRevenue = decisionValueSummary.revenue.NoGo1TimeRevenue + (getValue(item.OneTimeRevenueSaving) - getValue(item.OneTimeRevenueCost));
                        decisionValueSummary.revenue.NoGoRecurringRevenue = decisionValueSummary.revenue.NoGoRecurringRevenue + (getValue(item.RecurringRevenueSaving) - getValue(item.RecurringRevenueCost));
                        //Net Allocation From Other Groups
                        decisionValueSummary.allocation.NoGoCosts = decisionValueSummary.allocation.NoGoCosts + getValue(item.Costs);
                        decisionValueSummary.allocation.NoGoSavings = decisionValueSummary.allocation.NoGoSavings + getValue(item.Savings);
                        decisionValueSummary.allocation.NoGoAllocatedValue = decisionValueSummary.allocation.NoGoAllocatedValue + getValue(item.Value);
                    }
                    break;
                default:
                    //decisionIdeaSummary.NoRecIdeas.push(item.IdeaId);
                    decisionIdeaSummary.NoRecCount = decisionIdeaSummary.NoRecCount + 1;
                    decisionIdeaSummary.NoRecValue = decisionIdeaSummary.NoRecValue + (item.ValueStatus > 1 ? getValue(item.Savings - item.Costs) : getValue(item.RoughValue));
                    if (item.ValueStatus > 1) {
                        //Valuation Summary
                        //pe
                        decisionValueSummary.pe.NoRecFTECost = decisionValueSummary.pe.NoRecFTECost + getValue(item.FTECost);
                        decisionValueSummary.pe.NoRecFTESaving = decisionValueSummary.pe.NoRecFTESaving + getValue(item.FTESaving);
                        decisionValueSummary.pe.NoRecRecurring = decisionValueSummary.pe.NoRecRecurring + (getValue(item.PESaving) - getValue(item.PECost));
                        //npe
                        decisionValueSummary.npe.NoRec1TimeCost = decisionValueSummary.npe.NoRec1TimeCost + getValue(item.OneTimeNPECost);
                        decisionValueSummary.npe.NoRec1TimeSaving = decisionValueSummary.npe.NoRec1TimeSaving + getValue(item.OneTimeNPESaving);
                        decisionValueSummary.npe.NoRecRecurring = decisionValueSummary.npe.NoRecRecurring + (getValue(item.RecurringNPESaving) - getValue(item.RecurringNPECost) + getValue(item.WorkingCapitalSaving) - getValue(item.WorkingCapitalCost));
                        //Revenue Margin
                        decisionValueSummary.revenue.NoRec1TimeMargin = decisionValueSummary.revenue.NoRec1TimeMargin + (getValue(item.OneTimeMarginSaving) - getValue(item.OneTimeMarginCost));
                        decisionValueSummary.revenue.NoRecRecurringMargin = decisionValueSummary.revenue.NoRecRecurringMargin + (getValue(item.RecurringMarginSaving) - getValue(item.RecurringMarginCost));
                        //Revenue Revenue
                        decisionValueSummary.revenue.NoRec1TimeRevenue = decisionValueSummary.revenue.NoRec1TimeRevenue + (getValue(item.OneTimeRevenueSaving) - getValue(item.OneTimeRevenueCost));
                        decisionValueSummary.revenue.NoRecRecurringRevenue = decisionValueSummary.revenue.NoRecRecurringRevenue + (getValue(item.RecurringRevenueSaving) - getValue(item.RecurringRevenueCost));
                        //Net Allocation From Other Groups
                        decisionValueSummary.allocation.NoRecCosts = decisionValueSummary.allocation.NoRecCosts + getValue(item.Costs);
                        decisionValueSummary.allocation.NoRecSavings = decisionValueSummary.allocation.NoRecSavings + getValue(item.Savings);
                        decisionValueSummary.allocation.NoRecAllocatedValue = decisionValueSummary.allocation.NoRecAllocatedValue + getValue(item.Value);
                    }
                    break;
            }

            if (item.DecisionType === 1) {
                //decisionIdeaSummary.GoIdeas.push(item.IdeaId);
                decisionIdeaSummary.PriorGoDecCount = decisionIdeaSummary.PriorGoDecCount + 1;
                decisionIdeaSummary.PriorGoDecValue = decisionIdeaSummary.PriorGoDecValue + (item.ValueStatus > 1 ? getValue(item.Savings - item.Costs) : 0);
                if (item.ValueStatus > 1) {
                    //Valuation Summary
                    //pe
                    decisionValueSummary.pe.PriorGoDecFTECost = decisionValueSummary.pe.PriorGoDecFTECost + getValue(item.FTECost);
                    decisionValueSummary.pe.PriorGoDecFTESaving = decisionValueSummary.pe.PriorGoDecFTESaving + getValue(item.FTESaving);
                    decisionValueSummary.pe.PriorGoDecRecurring = decisionValueSummary.pe.PriorGoDecRecurring + (getValue(item.PESaving) - getValue(item.PECost));
                    decisionValueSummary.pe.PriorGoDecPECost = decisionValueSummary.pe.PriorGoDecPECost + getValue(item.PECost);
                    decisionValueSummary.pe.PriorGoDecPESaving = decisionValueSummary.pe.PriorGoDecPESaving + getValue(item.PESaving);
                    //npe
                    decisionValueSummary.npe.PriorGoDec1TimeCost = decisionValueSummary.npe.PriorGoDec1TimeCost + getValue(item.OneTimeNPECost);
                    decisionValueSummary.npe.PriorGoDec1TimeSaving = decisionValueSummary.npe.PriorGoDec1TimeSaving + getValue(item.OneTimeNPESaving);
                    decisionValueSummary.npe.PriorGoDecRecurring = decisionValueSummary.npe.PriorGoDecRecurring + (getValue(item.RecurringNPESaving) + getValue(item.WorkingCapitalSaving) - getValue(item.RecurringNPECost) - getValue(item.WorkingCapitalCost));
                    decisionValueSummary.npe.Ideas.push(item);
                    //Revenue Margin
                    decisionValueSummary.revenue.PriorGoDec1TimeMargin = decisionValueSummary.revenue.PriorGoDec1TimeMargin + (getValue(item.OneTimeMarginSaving) - getValue(item.OneTimeMarginCost));
                    decisionValueSummary.revenue.PriorGoDecRecurringMargin = decisionValueSummary.revenue.PriorGoDecRecurringMargin + (getValue(item.RecurringMarginSaving) - getValue(item.RecurringMarginCost));
                    //Revenue Revenue
                    decisionValueSummary.revenue.PriorGoDec1TimeRevenue = decisionValueSummary.revenue.PriorGoDec1TimeRevenue + (getValue(item.OneTimeRevenueSaving) - getValue(item.OneTimeRevenueCost));
                    decisionValueSummary.revenue.PriorGoDecRecurringRevenue = decisionValueSummary.revenue.PriorGoDecRecurringRevenue + (getValue(item.RecurringRevenueSaving) - getValue(item.RecurringRevenueCost));
                    //Net Allocation From Other Groups
                    decisionValueSummary.allocation.PriorGoDecCosts = decisionValueSummary.allocation.PriorGoDecCosts + getValue(item.Costs);
                    decisionValueSummary.allocation.PriorGoDecSavings = decisionValueSummary.allocation.PriorGoDecSavings + getValue(item.Savings);
                    decisionValueSummary.allocation.PriorGoDecAllocatedValue = decisionValueSummary.allocation.PriorGoDecAllocatedValue + getValue(item.Value);
                }
            }

        });

    return {
        phase2DetailedIdeaSummary: glRiskDetailedIdeaSummary, phase2RoughValueIdeaSummary: glRiskRoughValueIdeaSummary, phase2ValueSummary: glRiskValueSummary,
        phase2PLSummary: glRiskPLSummary, phase2CFSummary: glRiskCFSummary,
        phase3ideaSummary: decisionIdeaSummary, phase3ValueSummary: decisionValueSummary
    };
}

const getNetCostShareFromOtherGroups = (allocatedValue, savings, costs) => {
    if (savings < 0) {
        return 0;
    }
    return (allocatedValue - (savings - costs));
};

const getDecisionValueSummary = (valueSummary, groupType) => {
    var decisionValueSummary = { valueComponents: [], margin: [], revenue: [], fteImpact: [], pl: [] };

    if (groupType === 2) {
        //ValueComponents
        decisionValueSummary.valueComponents.push(
            {
                Sequence: 10, Title: 'RecurringNonPersonnelExpenses',
                Go: valueSummary.npe.GoRecurring, NoGo: valueSummary.npe.NoGoRecurring, NoRec: valueSummary.npe.NoRecRecurring,
                Total: (valueSummary.npe.GoRecurring + valueSummary.npe.NoGoRecurring + valueSummary.npe.NoRecRecurring),
                PriorGoDec: valueSummary.npe.PriorGoDecRecurring
            });
        decisionValueSummary.valueComponents.push({
            Sequence: 20, Title: 'RecurringPersonnelExpenses',
            Go: valueSummary.pe.GoRecurring, NoGo: valueSummary.pe.NoGoRecurring, NoRec: valueSummary.pe.NoRecRecurring,
            Total: (valueSummary.pe.GoRecurring + valueSummary.pe.NoGoRecurring + valueSummary.pe.NoRecRecurring),
            PriorGoDec: valueSummary.pe.PriorGoDecRecurring
        });
        decisionValueSummary.valueComponents.push({
            Sequence: 30, Title: 'OneTimeAdditions',
            Go: valueSummary.npe.Go1TimeCost, NoGo: valueSummary.npe.NoGo1TimeCost, NoRec: valueSummary.npe.NoRec1TimeCost,
            Total: (valueSummary.npe.Go1TimeCost + valueSummary.npe.NoGo1TimeCost + valueSummary.npe.NoRec1TimeCost),
            PriorGoDec: valueSummary.npe.PriorGoDec1TimeCost
        });
        decisionValueSummary.valueComponents.push({
            Sequence: 40, Title: 'OneTimeReductions',
            Go: valueSummary.npe.Go1TimeSaving, NoGo: valueSummary.npe.NoGo1TimeSaving, NoRec: valueSummary.npe.NoRec1TimeSaving,
            Total: (valueSummary.npe.Go1TimeSaving + valueSummary.npe.NoGo1TimeSaving + valueSummary.npe.NoRec1TimeSaving),
            PriorGoDec: valueSummary.npe.PriorGoDec1TimeSaving
        });

        //FTE Impact
        var fteCostTotal = valueSummary.pe.GoFTECost + valueSummary.pe.NoGoFTECost + valueSummary.pe.NoRecFTECost;
        decisionValueSummary.fteImpact.push(
            {
                Sequence: 10, Title: 'NumberOfPersonnelAdditions',
                Go: valueSummary.pe.GoFTECost, NoGo: valueSummary.pe.NoGoFTECost, NoRec: valueSummary.pe.NoRecFTECost,
                Total: fteCostTotal,
                PriorGoDec: valueSummary.pe.PriorGoDecFTECost
            }
        );
        var fteSavingTotal = valueSummary.pe.GoFTESaving + valueSummary.pe.NoGoFTESaving + valueSummary.pe.NoRecFTESaving;
        decisionValueSummary.fteImpact.push(
            {
                Sequence: 20, Title: 'NumberOfPersonnelReductions',
                Go: valueSummary.pe.GoFTESaving, NoGo: valueSummary.pe.NoGoFTESaving, NoRec: valueSummary.pe.NoRecFTESaving,
                Total: fteSavingTotal,
                PriorGoDec: valueSummary.pe.PriorGoDecFTESaving
            }
        );
        decisionValueSummary.fteImpact.push(
            {
                Sequence: 30, Title: 'Total',
                Go: (valueSummary.pe.GoFTESaving - valueSummary.pe.GoFTECost),
                NoGo: (valueSummary.pe.NoGoFTESaving - valueSummary.pe.NoGoFTECost),
                NoRec: (valueSummary.pe.NoRecFTESaving - valueSummary.pe.NoRecFTECost),
                Total: (fteSavingTotal - fteCostTotal),
                PriorGoDec: (valueSummary.pe.PriorGoDecFTESaving - valueSummary.pe.PriorGoDecFTECost)
            }
        );
    }

    if (groupType === 1) {
        decisionValueSummary.margin.push(
            {
                Sequence: 10, Title: 'RecurringMargin',
                Go: valueSummary.revenue.GoRecurringMargin, NoGo: valueSummary.revenue.NoGoRecurringMargin, NoRec: valueSummary.revenue.NoRecRecurringMargin,
                Total: (valueSummary.revenue.GoRecurringMargin + valueSummary.revenue.NoGoRecurringMargin + valueSummary.revenue.NoRecRecurringMargin),
                PriorGoDec: valueSummary.revenue.PriorGoDecRecurringMargin
            }
        );
        decisionValueSummary.margin.push(
            {
                Sequence: 20, Title: 'OneTimeMargin',
                Go: valueSummary.revenue.GoRecurringMargin, NoGo: valueSummary.revenue.NoGoRecurringMargin, NoRec: valueSummary.revenue.NoRecRecurringMargin,
                Total: (valueSummary.revenue.GoRecurringMargin + valueSummary.revenue.NoGoRecurringMargin + valueSummary.revenue.NoRecRecurringMargin),
                PriorGoDec: valueSummary.revenue.PriorGoDecRecurringMargin
            }
        );

        decisionValueSummary.revenue.push(
            {
                Sequence: 10, Title: 'RecurringRevenue',
                Go: valueSummary.revenue.GoRecurringRevenue, NoGo: valueSummary.revenue.NoGoRecurringRevenue, NoRec: valueSummary.revenue.NoRecRecurringRevenue,
                Total: (valueSummary.revenue.GoRecurringRevenue + valueSummary.revenue.NoGoRecurringRevenue + valueSummary.revenue.NoRecRecurringRevenue),
                PriorGoDec: valueSummary.revenue.PriorGoDecRecurringRevenue
            }
        );
        decisionValueSummary.revenue.push(
            {
                Sequence: 20, Title: 'OneTimeRevenue',
                Go: valueSummary.revenue.Go1TimeRevenue, NoGo: valueSummary.revenue.NoGo1TimeRevenue, NoRec: valueSummary.revenue.NoRec1TimeRevenue,
                Total: (valueSummary.revenue.Go1TimeRevenue + valueSummary.revenue.NoGo1TimeRevenue + valueSummary.revenue.NoRec1TimeRevenue),
                PriorGoDec: valueSummary.revenue.PriorGoDec1TimeRevenue
            }
        );
    }
    //For Both Group Type
    var GoAllocation = getNetCostShareFromOtherGroups(valueSummary.allocation.GoAllocatedValue, valueSummary.allocation.GoSavings, valueSummary.allocation.GoCosts);
    var NoGoAllocation = getNetCostShareFromOtherGroups(valueSummary.allocation.NoGoAllocatedValue, valueSummary.allocation.NoGoSavings, valueSummary.allocation.NoGoCosts);
    var NoRecAllocation = getNetCostShareFromOtherGroups(valueSummary.allocation.NoRecAllocatedValue, valueSummary.allocation.NoRecSavings, valueSummary.allocation.NoRecCosts);
    decisionValueSummary.valueComponents.push({
        Sequence: 50, Title: 'NetAllocationFromOtherGroups',
        Go: GoAllocation,
        NoGo: NoGoAllocation,
        NoRec: NoRecAllocation,
        Total: (GoAllocation + NoGoAllocation + NoRecAllocation),
        PriorGoDec: getNetCostShareFromOtherGroups(valueSummary.allocation.PriorGoDecAllocatedValue, valueSummary.allocation.PriorGoDecSavings, valueSummary.allocation.PriorGoDecCosts)
    });
    return decisionValueSummary;
};

const getGLRiskValueSummary = (valueSummary, groupType) => {
    var glRiskValueSummary = { valueComponents: [], margin: [], revenue: [], fteImpact: [], pl: [], it: [] };
    //IT
    //One Time Un-Amortized Value
    glRiskValueSummary.it.push({
        Sequence: 10, Title: 'ITOneTimeAmortized',
        LRisk: valueSummary.IT.LRisk1TimeCost, MRisk: valueSummary.IT.MRisk1TimeCost, HRisk: valueSummary.IT.HRisk1TimeCost, Unrated: valueSummary.IT.Unrated1TimeCost,
        Total: (valueSummary.IT.LRisk1TimeCost + valueSummary.IT.MRisk1TimeCost + valueSummary.IT.HRisk1TimeCost + valueSummary.IT.Unrated1TimeCost),
    });
    glRiskValueSummary.it.push({
        Sequence: 20, Title: 'ITOneTimeUnAmortized',
        LRisk: valueSummary.IT.LRisk1TimeCostUnAmortized, MRisk: valueSummary.IT.MRisk1TimeCostUnAmortized, HRisk: valueSummary.IT.HRisk1TimeCostUnAmortized, Unrated: valueSummary.IT.Unrated1TimeCostUnAmortized,
        Total: (valueSummary.IT.LRisk1TimeCostUnAmortized + valueSummary.IT.MRisk1TimeCostUnAmortized + valueSummary.IT.HRisk1TimeCostUnAmortized + valueSummary.IT.Unrated1TimeCostUnAmortized),
    });

    if (groupType === 2) {
        //ValueComponents
        glRiskValueSummary.valueComponents.push(
            {
                Sequence: 10, Title: 'RecurringNonPersonnelExpenses',
                LRisk: valueSummary.npe.LRiskRecurring, MRisk: valueSummary.npe.MRiskRecurring, HRisk: valueSummary.npe.HRiskRecurring, Unrated: valueSummary.npe.UnratedRecurring,
                Total: (valueSummary.npe.LRiskRecurring + valueSummary.npe.MRiskRecurring + valueSummary.npe.HRiskRecurring + valueSummary.npe.UnratedRecurring)
            });
        glRiskValueSummary.valueComponents.push({
            Sequence: 20, Title: 'RecurringPersonnelExpenses',
            LRisk: valueSummary.pe.LRiskRecurring, MRisk: valueSummary.pe.MRiskRecurring, HRisk: valueSummary.pe.HRiskRecurring, Unrated: valueSummary.pe.UnratedRecurring,
            Total: (valueSummary.pe.LRiskRecurring + valueSummary.pe.MRiskRecurring + valueSummary.pe.HRiskRecurring + valueSummary.pe.UnratedRecurring),
        });
        glRiskValueSummary.valueComponents.push({
            Sequence: 30, Title: 'OneTimeAdditions',
            LRisk: valueSummary.npe.LRisk1TimeCost, MRisk: valueSummary.npe.MRisk1TimeCost, HRisk: valueSummary.npe.HRisk1TimeCost, Unrated: valueSummary.npe.Unrated1TimeCost,
            Total: (valueSummary.npe.LRisk1TimeCost + valueSummary.npe.MRisk1TimeCost + valueSummary.npe.HRisk1TimeCost + valueSummary.npe.Unrated1TimeCost),
        });
        glRiskValueSummary.valueComponents.push({
            Sequence: 40, Title: 'OneTimeReductions',
            LRisk: valueSummary.npe.LRisk1TimeSaving, MRisk: valueSummary.npe.MRisk1TimeSaving, HRisk: valueSummary.npe.HRisk1TimeSaving, Unrated: valueSummary.npe.Unrated1TimeSaving,
            Total: (valueSummary.npe.LRisk1TimeSaving + valueSummary.npe.MRisk1TimeSaving + valueSummary.npe.HRisk1TimeSaving + valueSummary.npe.Unrated1TimeSaving),
        });
        //One Time Un-Amortized Value
        glRiskValueSummary.valueComponents.push({
            Sequence: 30, Title: 'OneTimeAdditionsUnAmortized',
            LRisk: valueSummary.npe.LRisk1TimeCostUnAmortized, MRisk: valueSummary.npe.MRisk1TimeCostUnAmortized, HRisk: valueSummary.npe.HRisk1TimeCostUnAmortized, Unrated: valueSummary.npe.Unrated1TimeCostUnAmortized,
            Total: (valueSummary.npe.LRisk1TimeCostUnAmortized + valueSummary.npe.MRisk1TimeCostUnAmortized + valueSummary.npe.HRisk1TimeCostUnAmortized + valueSummary.npe.Unrated1TimeCostUnAmortized),
        });
        glRiskValueSummary.valueComponents.push({
            Sequence: 40, Title: 'OneTimeReductionsUnAmortized',
            LRisk: valueSummary.npe.LRisk1TimeSavingUnAmortized, MRisk: valueSummary.npe.MRisk1TimeSavingUnAmortized, HRisk: valueSummary.npe.HRisk1TimeSavingUnAmortized, Unrated: valueSummary.npe.Unrated1TimeSavingUnAmortized,
            Total: (valueSummary.npe.LRisk1TimeSavingUnAmortized + valueSummary.npe.MRisk1TimeSavingUnAmortized + valueSummary.npe.HRisk1TimeSavingUnAmortized + valueSummary.npe.Unrated1TimeSavingUnAmortized),
        });

        //FTE Impact
        var fteCostTotal = valueSummary.pe.LRiskFTECost + valueSummary.pe.MRiskFTECost + valueSummary.pe.HRiskFTECost + valueSummary.pe.UnratedFTECost;
        glRiskValueSummary.fteImpact.push(
            {
                Sequence: 10, Title: 'NumberOfPersonnelAdditions',
                LRisk: valueSummary.pe.LRiskFTECost, MRisk: valueSummary.pe.MRiskFTECost, HRisk: valueSummary.pe.HRiskFTECost, Unrated: valueSummary.pe.UnratedFTECost,
                Total: fteCostTotal,
            }
        );
        var fteSavingTotal = valueSummary.pe.LRiskFTESaving + valueSummary.pe.MRiskFTESaving + valueSummary.pe.HRiskFTESaving + valueSummary.pe.UnratedFTESaving;
        glRiskValueSummary.fteImpact.push(
            {
                Sequence: 20, Title: 'NumberOfPersonnelReductions',
                LRisk: valueSummary.pe.LRiskFTESaving, MRisk: valueSummary.pe.MRiskFTESaving, HRisk: valueSummary.pe.HRiskFTESaving, Unrated: valueSummary.pe.UnratedFTESaving,
                Total: fteSavingTotal,
            }
        );
        glRiskValueSummary.fteImpact.push(
            {
                Sequence: 30, Title: 'Total',
                LRisk: (valueSummary.pe.LRiskFTESaving - valueSummary.pe.LRiskFTECost),
                MRisk: (valueSummary.pe.MRiskFTESaving - valueSummary.pe.MRiskFTECost),
                HRisk: (valueSummary.pe.HRiskFTESaving - valueSummary.pe.HRiskFTECost),
                Unrated: (valueSummary.pe.UnratedFTESaving - valueSummary.pe.UnratedFTECost),
                Total: (fteSavingTotal - fteCostTotal),
            }
        );
    }

    if (groupType === 1) {
        glRiskValueSummary.margin.push(
            {
                Sequence: 10, Title: 'RecurringMargin',
                LRisk: valueSummary.revenue.LRiskRecurringMargin, MRisk: valueSummary.revenue.MRiskRecurringMargin, HRisk: valueSummary.revenue.HRiskRecurringMargin, Unrated: valueSummary.revenue.UnratedRecurringMargin,
                Total: (valueSummary.revenue.LRiskRecurringMargin + valueSummary.revenue.MRiskRecurringMargin + valueSummary.revenue.HRiskRecurringMargin + valueSummary.revenue.UnratedRecurringMargin),
            }
        );
        glRiskValueSummary.margin.push(
            {
                Sequence: 20, Title: 'OneTimeMargin',
                LRisk: valueSummary.revenue.LRiskRecurringMargin, MRisk: valueSummary.revenue.MRiskRecurringMargin, HRisk: valueSummary.revenue.HRiskRecurringMargin, Unrated: valueSummary.revenue.UnratedRecurringMargin,
                Total: (valueSummary.revenue.LRiskRecurringMargin + valueSummary.revenue.MRiskRecurringMargin + valueSummary.revenue.HRiskRecurringMargin + valueSummary.revenue.UnratedRecurringMargin),
            }
        );
        glRiskValueSummary.margin.push(
            {
                Sequence: 20, Title: 'OneTimeMarginUnAmortized',
                LRisk: valueSummary.revenue.LRiskRecurringMarginUnAmortized, MRisk: valueSummary.revenue.MRiskRecurringMarginUnAmortized, HRisk: valueSummary.revenue.HRiskRecurringMarginUnAmortized, Unrated: valueSummary.revenue.UnratedRecurringMarginUnAmortized,
                Total: (valueSummary.revenue.LRiskRecurringMarginUnAmortized + valueSummary.revenue.MRiskRecurringMarginUnAmortized + valueSummary.revenue.HRiskRecurringMarginUnAmortized + valueSummary.revenue.UnratedRecurringMarginUnAmortized),
            }
        );

        glRiskValueSummary.revenue.push(
            {
                Sequence: 10, Title: 'RecurringRevenue',
                LRisk: valueSummary.revenue.LRiskRecurringRevenue, MRisk: valueSummary.revenue.MRiskRecurringRevenue, HRisk: valueSummary.revenue.HRiskRecurringRevenue, Unrated: valueSummary.revenue.UnratedRecurringRevenue,
                Total: (valueSummary.revenue.LRiskRecurringRevenue + valueSummary.revenue.MRiskRecurringRevenue + valueSummary.revenue.HRiskRecurringRevenue + valueSummary.revenue.UnratedRecurringRevenue),
            }
        );
        glRiskValueSummary.revenue.push(
            {
                Sequence: 20, Title: 'OneTimeRevenue',
                LRisk: valueSummary.revenue.LRisk1TimeRevenue, MRisk: valueSummary.revenue.MRisk1TimeRevenue, HRisk: valueSummary.revenue.HRisk1TimeRevenue, Unrated: valueSummary.revenue.Unrated1TimeRevenue,
                Total: (valueSummary.revenue.LRisk1TimeRevenue + valueSummary.revenue.MRisk1TimeRevenue + valueSummary.revenue.HRisk1TimeRevenue + valueSummary.revenue.Unrated1TimeRevenue),
            }
        );
    }
    //For Both Group Type
    var LRiskAllocation = getNetCostShareFromOtherGroups(valueSummary.allocation.LRiskAllocatedValue, valueSummary.allocation.LRiskSavings, valueSummary.allocation.LRiskCosts);
    var MRiskAllocation = getNetCostShareFromOtherGroups(valueSummary.allocation.MRiskAllocatedValue, valueSummary.allocation.MRiskSavings, valueSummary.allocation.MRiskCosts);
    var HRiskAllocation = getNetCostShareFromOtherGroups(valueSummary.allocation.HRiskAllocatedValue, valueSummary.allocation.HRiskSavings, valueSummary.allocation.HRiskCosts);
    var UnratedAllocation = getNetCostShareFromOtherGroups(valueSummary.allocation.UnratedAllocatedValue, valueSummary.allocation.UnratedSavings, valueSummary.allocation.UnratedCosts);
    glRiskValueSummary.valueComponents.push({
        Sequence: 50, Title: 'NetAllocationFromOtherGroups',
        LRisk: LRiskAllocation,
        MRisk: MRiskAllocation,
        HRisk: HRiskAllocation,
        Unrated: UnratedAllocation,
        Total: (LRiskAllocation + MRiskAllocation + HRiskAllocation + UnratedAllocation)
    });
    return glRiskValueSummary;
};

const getPhase3DecisionSummary = (decisionSummary, groupType) => {
    var decisionValueSummary = getDecisionValueSummary(decisionSummary.phase3ValueSummary, groupType);

    return { ideaSummary: decisionSummary.phase3ideaSummary, valueSummary: decisionValueSummary };
};

const getDashboardSummary = (dashboardSummary, groupType) => {
    var decisionValueSummary = getDecisionValueSummary(dashboardSummary.phase3ValueSummary, groupType);
    var glRiskValueSummary = getGLRiskValueSummary(dashboardSummary.phase2ValueSummary, groupType);

    return {
        phase2IdeaSummary:
        {
            detailedIdeaSummary: dashboardSummary.phase2DetailedIdeaSummary, roughValueIdeaSummary: dashboardSummary.phase2RoughValueIdeaSummary
        },
        phase2ValueSummary: glRiskValueSummary,
        phase2PLSummary: dashboardSummary.phase2PLSummary, phase2CFSummary: dashboardSummary.phase2CFSummary,
        phase3IdeaSummary: dashboardSummary.phase3ideaSummary, phase3ValueSummary: decisionValueSummary
    };
};

export const getPhase1DashboardSummary = (ideaGroups, totalBaseline) => {
    var ideaSummary = { counts: [], values: [] };

    var detailedIdeaGroups = _.filter(ideaGroups, (item) => {
        return item.ValueStatus > 1
    });

    var detailedResult = getGLRiskDetail(detailedIdeaGroups);
    ideaSummary.counts.push(
        {
            Phase: 2,
            Title: 'DetailedValue',
            LRisk: detailedResult.LRiskCount,
            MRisk: detailedResult.MRiskCount,
            HRisk: detailedResult.HRiskCount,
            Unrated: detailedResult.UnratedCount,
            Total: detailedResult.LRiskCount + detailedResult.MRiskCount + detailedResult.HRiskCount + detailedResult.UnratedCount
        }
    );

    var totalDetailedValue = detailedResult.LRiskValue + detailedResult.MRiskValue + detailedResult.HRiskValue + detailedResult.UnratedValue;
    ideaSummary.values.push(
        {
            Phase: 2,
            Title: 'DetailedValue',
            LRisk: detailedResult.LRiskValue,
            MRisk: detailedResult.MRiskValue,
            HRisk: detailedResult.HRiskValue,
            Unrated: detailedResult.UnratedValue,
            Total: totalDetailedValue,
            LRiskPercentage: totalBaseline === 0 ? 0 : detailedResult.LRiskValue / totalBaseline,
            MRiskPercentage: totalBaseline === 0 ? 0 : detailedResult.MRiskValue / totalBaseline,
            HRiskPercentage: totalBaseline === 0 ? 0 : detailedResult.HRiskValue / totalBaseline,
            UnratedPercentage: totalBaseline === 0 ? 0 : detailedResult.UnratedValue / totalBaseline,
            TotalPercentage: totalBaseline === 0 ? 0 : totalDetailedValue / totalBaseline
        }
    );

    var roughValueIdeas = _.filter(ideaGroups, (item) => {
        return item.ValueStatus <= 1
    });

    var roughValueResult = getGLRiskDetail(roughValueIdeas, true);
    ideaSummary.counts.push(
        {
            Phase: 2,
            Title: 'RoughValue',
            LRisk: roughValueResult.LRiskCount,
            MRisk: roughValueResult.MRiskCount,
            HRisk: roughValueResult.HRiskCount,
            Unrated: roughValueResult.UnratedCount,
            Total: roughValueResult.LRiskCount + roughValueResult.MRiskCount + roughValueResult.HRiskCount + roughValueResult.UnratedCount
        }
    )
    var totalRoughValue = roughValueResult.LRiskValue + roughValueResult.MRiskValue + roughValueResult.HRiskValue + roughValueResult.UnratedValue;
    ideaSummary.values.push(
        {
            Phase: 2,
            Title: 'RoughValue',
            LRisk: roughValueResult.LRiskValue,
            MRisk: roughValueResult.MRiskValue,
            HRisk: roughValueResult.HRiskValue,
            Unrated: roughValueResult.UnratedValue,
            Total: totalRoughValue,
            LRiskPercentage: totalBaseline === 0 ? 0 : roughValueResult.LRiskValue / totalBaseline,
            MRiskPercentage: totalBaseline === 0 ? 0 : roughValueResult.MRiskValue / totalBaseline,
            HRiskPercentage: totalBaseline === 0 ? 0 : roughValueResult.HRiskValue / totalBaseline,
            UnratedPercentage: totalBaseline === 0 ? 0 : roughValueResult.UnratedValue / totalBaseline,
            TotalPercentage: totalBaseline === 0 ? 0 : totalRoughValue / totalBaseline
        }
    )

    //Total Row
    var totalIdeaCount = detailedResult.LRiskCount + detailedResult.MRiskCount + detailedResult.HRiskCount + detailedResult.UnratedCount
        + roughValueResult.LRiskCount + roughValueResult.MRiskCount + roughValueResult.HRiskCount + roughValueResult.UnratedCount;

    ideaSummary.counts.push(
        {
            Title: 'Total',
            LRisk: detailedResult.LRiskCount + roughValueResult.LRiskCount,
            MRisk: detailedResult.MRiskCount + roughValueResult.MRiskCount,
            HRisk: detailedResult.HRiskCount + roughValueResult.HRiskCount,
            Unrated: detailedResult.UnratedCount + roughValueResult.UnratedCount,
            Total: totalIdeaCount
        }
    )

    var lRiskTotal = detailedResult.LRiskValue + roughValueResult.LRiskValue;
    var mRiskTotal = detailedResult.MRiskValue + roughValueResult.MRiskValue;
    var hRiskTotal = detailedResult.HRiskValue + roughValueResult.HRiskValue;
    var unratedTotal = detailedResult.UnratedValue + roughValueResult.UnratedValue;
    ideaSummary.values.push(
        {
            Phase: 2,
            Title: 'Total',
            LRisk: lRiskTotal,
            MRisk: mRiskTotal,
            HRisk: hRiskTotal,
            Unrated: unratedTotal,
            Total: totalDetailedValue + totalRoughValue,
            LRiskPercentage: totalBaseline === 0 ? 0 : lRiskTotal / totalBaseline,
            MRiskPercentage: totalBaseline === 0 ? 0 : mRiskTotal / totalBaseline,
            HRiskPercentage: totalBaseline === 0 ? 0 : hRiskTotal / totalBaseline,
            UnratedPercentage: totalBaseline === 0 ? 0 : unratedTotal / totalBaseline,
            TotalPercentage: totalBaseline === 0 ? 0 : (totalDetailedValue + totalRoughValue) / totalBaseline
        }
    )
    return ideaSummary;
};

export const getSCReviewSummary = (activeIdeaGroups, state, groupId) => {
    var groupIdeaSumary = {};
    var groupIdeaSumaryList = [];
    var groups = Object.assign([], Object.keys(state.permissions.userGroups));
    var ideaView = state.ideaGroupFilter.ideaView;
    if (ideaView !== 'CompanyView') {
        groups = _.filter(groups, (groupItem) => {
            return groupItem.toLowerCase() === groupId.toLowerCase()
        });
    }

    var groupFilteredIdeaGroups = [];
    var primaryFilteredIdeaGroups = [];
    var dashboardSummary = [];

    var totalBaseline = 0;
    _.map(groups, (groupItem) => {
        var group = state.masterData.groups[groupItem];
        if(group) {
            groupIdeaSumary = {};
            groupIdeaSumary.GroupId = group.GroupId;
            groupIdeaSumary.Name = group.Name;
            groupIdeaSumary.GroupType = group.GroupType;
            groupIdeaSumary.GroupNumber = group.GroupNumber;
    
            groupFilteredIdeaGroups = [];
            //primaryFilteredIdeaGroups = [];
            groupFilteredIdeaGroups = _.filter(activeIdeaGroups, (item) => {
                return item.GroupId.toLowerCase() === group.GroupId.toLowerCase() //&& item.IsPrimary
            });
    
            // primaryFilteredIdeaGroups = _.filter(groupFilteredIdeaGroups, (item) => {
            //     return item.IsPrimary
            // });
    
            totalBaseline = 0;
            totalBaseline = state.masterData.groups[group.GroupId.toLowerCase()] ? state.masterData.groups[group.GroupId.toLowerCase()].TotalBaseline : 0;
            //Idea Summary => Number of Ideas, Value (% of Baseline)
            groupIdeaSumary.ideaSummary = getSC1IdeaSummary(groupFilteredIdeaGroups, state, totalBaseline, group.GroupId, group.GroupType, ideaView);
            //Value Sumary
            dashboardSummary = getDashBoardValueSummary(groupFilteredIdeaGroups, state.lineItemMonthlyValueData.lineItemMonthlyValues);
            //groupIdeaSumary.phase3DashboardSummary = getPhase3DecisionSummary(dashboardSummary, group.GroupType);
            groupIdeaSumary.dashboardSummary = getDashboardSummary(dashboardSummary, group.GroupType);
            groupIdeaSumary.totalBaseline = totalBaseline;
            groupIdeaSumaryList.push(groupIdeaSumary);
        }
    });

    return groupIdeaSumaryList;
};
