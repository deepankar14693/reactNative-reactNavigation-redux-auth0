import _ from 'lodash';
import moment from 'moment';
import { excludeByValues, excludeByValuesIdea, filterByValues, filterByValuesIdea, getLineItemSubType, getSplitedArray, getSplitedArrayForBooleans, resolveKey } from '../../../common/utils';
import { getResolveReviewCountByName } from '../../../store/ideas2/updaters/ideaGroupUpdater';
const contains = require('lodash/includes');

export const getIdeaGroupsApplyFilters = (filteredIdeaGroups, applyFilters, itGroupId, filterCurrentGroupId, ideaIds, newCreatedIdeas) => {
    let filterGroupArray = [];
    let excludedGroupArray = [];
    let filterITGroupArray = [];
    let excludedITGroupArray = [];
    let filterFocusAreaArray = [];
    let excludedFocusAreaArray = [];
    let filterTimingArray = [];
    let excludedTimingArray = [];
    if (applyFilters !== '') {
        applyFilters.map(function (el) {
            if (el.fieldName !== 'CurrentGroupValue' && el.fieldName !== 'Plan' && el.fieldName !== 'Target' && el.fieldName !== 'Actual') {
                switch (el.filterType) {
                    case 'LastEditedBy':
                        filteredIdeaGroups = _.filter(filteredIdeaGroups, function (ideaGroup) {
                            if (el.isExcluded) {
                                return ideaGroup.Idea.ModifiedBy !== el.fieldValue;
                            } else {
                                return ideaGroup.Idea.ModifiedBy === el.fieldValue;
                            }
                        });
                        break;
                    case 'IdeaLeader':
                        filteredIdeaGroups = _.filter(filteredIdeaGroups, function (ideaGroup) {
                            let ifLeaderExist = false;
                            if (el.isExcluded) {
                                ifLeaderExist = (_.size(ideaGroup.Idea.IdeaLeaders) === 0 || _.size(_.filter(ideaGroup.Idea.IdeaLeaders, (item) => { return item.PersonnelId === el.fieldValue })) === 0) ? true : false;
                            } else {
                                ifLeaderExist = _.size(_.filter(ideaGroup.Idea.IdeaLeaders, (item) => { return item.PersonnelId === el.fieldValue })) > 0 ? true : false;
                            }
                            return ifLeaderExist;
                        });
                        break;
                    case 'IC':
                        filteredIdeaGroups = _.filter(filteredIdeaGroups, function (ideaGroup) {
                            let ifLeaderExist = false;
                            if (el.isExcluded) {
                                ifLeaderExist = (_.size(ideaGroup.Idea.IdeaICs) === 0 || _.size(_.filter(ideaGroup.Idea.IdeaICs, (item) => { return item.PersonnelId === el.fieldValue })) === 0) ? true : false;
                            } else {
                                ifLeaderExist = _.size(_.filter(ideaGroup.Idea.IdeaICs, (item) => { return item.PersonnelId === el.fieldValue })) > 0 ? true : false;
                            }
                            return ifLeaderExist;
                        });

                        break;
                    case 'DateLastEditedMin':
                    case 'DateLastEditedMax':
                    case 'TimingMilestone':
                    case 'TimingMetric':
                    case 'ImplementationStatusMilestone':
                    case 'ImplementationStatusMetric':
                    case 'ResponsiblePartyMilestone':
                    case 'ResponsiblePartyMetric':
                    case 'LineType':
                    case 'FTE':
                    case 'CompRange':
                    case 'LineItemCategory':
                    case 'TimingLineItem':
                        break;
                    case 'MyFocusArea':
                    case 'OtherFocusArea':
                        el.fieldValue.split(',').map(function (value) {
                            if (el.isExcluded) {
                                excludedFocusAreaArray.push(value);
                            } else {
                                filterFocusAreaArray.push(value);
                            }
                        })
                        break;
                    case 'OtherGroups':
                        el.fieldValue.split(',').map(function (value) {
                            if (el.isExcluded) {
                                if (value === itGroupId) {
                                    excludedITGroupArray.push(value);
                                } else {
                                    excludedGroupArray.push(value);
                                }
                            } else {
                                if (value === itGroupId) {
                                    filterITGroupArray.push(value);
                                } else {
                                    filterGroupArray.push(value);
                                }
                            }

                        })
                        break;
                    case 'ImplementationTiming':
                        el.fieldValue.split(',').map(function (value) {
                            if (el.isExcluded) {
                                excludedTimingArray.push(value);
                            } else {
                                filterTimingArray.push(value);
                            }
                        })
                        break;
                    case 'PrimaryGroup':
                        break;
                    case 'SCDecision':
                        const arrayValuesSCDecision = getSplitedArray(el.searchValue);
                        if (el.isExcluded) {
                            filteredIdeaGroups = filteredIdeaGroups.filter((item) => {
                                return (arrayValuesSCDecision.indexOf(item.SCDecisionType) === -1)
                            });
                        } else {
                            filteredIdeaGroups = filteredIdeaGroups.filter((item) => {
                                return (arrayValuesSCDecision.indexOf(item.SCDecisionType) !== -1)
                            });
                        }

                        break;
                    case 'OneTime':
                    case 'P&L':
                    case 'FTE':
                        if (el.isExcluded) {
                            filteredIdeaGroups = excludeByValues(filteredIdeaGroups, 'IdeaId', el.fieldValue);
                        } else {
                            filteredIdeaGroups = filterByValues(filteredIdeaGroups, 'IdeaId', el.fieldValue);
                        }
                        break;
                    case 'ImplementationStatusOverride':
                        const arrayValueImplementationStatusOverride = getSplitedArray(el.searchValue);
                        filteredIdeaGroups = _.filter(filteredIdeaGroups, function (o) {
                            if (o.ImplementationStatusOverride) {
                                return contains(arrayValueImplementationStatusOverride, resolveKey(o, 'ImplementationStatusOverride'));
                            } else {
                                return contains(arrayValueImplementationStatusOverride, resolveKey(o, 'ImplementationStatus'));
                            }
                        });
                        break;
                    case 'PlanLocked':
                        var arrayValuesPlanLocked = getSplitedArrayForBooleans(el.searchValue, 'boolean');
                        if (el.isExcluded) {
                            filteredIdeaGroups = excludeByValues(filteredIdeaGroups, el.fieldName, arrayValuesPlanLocked);
                        } else {
                            filteredIdeaGroups = filterByValues(filteredIdeaGroups, el.fieldName, arrayValuesPlanLocked);
                        }
                        break;
                    case 'FractionalPositions':
                        // var goIdeaLineItems = _.cloneDeep(getGoIdeaLineItems(filteredIdeaGroups, state));
                        // var arrayValues = getSplitedArray(el.searchValue);
                        // var filteredIdeasIdsWithFractions = [];
                        // if (arrayValues.length === 2) {
                        //     filteredIdeasIdsWithFractions = _.map(_.unionBy(_.filter(_.cloneDeep(goIdeaLineItems), (item) => {
                        //         return item.LineItemType === 2 &&
                        //             ((item.LineItemAmount && !_.isInteger(item.LineItemAmount)) || (item.LineItemPlanAmount && !_.isInteger(item.LineItemPlanAmount)))
                        //     }), 'IdeaId'), 'IdeaId')
                        // } else {
                        //     if (arrayValues[0] === 1) {
                        //         filteredIdeasIdsWithFractions = _.map(_.unionBy(_.filter(_.cloneDeep(goIdeaLineItems), (item) => {
                        //             return item.LineItemType === 2 &&
                        //                 ((item.LineItemAmount && !_.isInteger(item.LineItemAmount)))
                        //         }), 'IdeaId'), 'IdeaId')
                        //     } else {
                        //         filteredIdeasIdsWithFractions = _.map(_.unionBy(_.filter(_.cloneDeep(goIdeaLineItems), (item) => {
                        //             return item.LineItemType === 2 &&
                        //                 ((item.LineItemPlanAmount && !_.isInteger(item.LineItemPlanAmount)))
                        //         }), 'IdeaId'), 'IdeaId')
                        //     }
                        // }
                        // filteredIdeaGroups = filterByValues(filteredIdeaGroups, 'IdeaId', filteredIdeasIdsWithFractions);
                        break;
                    case 'RiskRating':
                        const arrayRiskRating = getSplitedArray(el.searchValue);
                        if (el.isExcluded) {
                            filteredIdeaGroups = _.filter(filteredIdeaGroups, (item) => !_.includes(arrayRiskRating, item.RiskRatingType));
                        } else {
                            filteredIdeaGroups = _.filter(filteredIdeaGroups, (item) => _.includes(arrayRiskRating, item.RiskRatingType));
                        }
                        break;
                    case 'GLRiskRating':
                        const glArrayRiskRating = getSplitedArray(el.searchValue);
                        if (el.isExcluded) {
                            filteredIdeaGroups = _.filter(filteredIdeaGroups, (item) => !_.includes(glArrayRiskRating, item.GLRiskRatingType));
                        } else {
                            filteredIdeaGroups = _.filter(filteredIdeaGroups, (item) => _.includes(glArrayRiskRating, item.GLRiskRatingType));
                        }
                        break;
                    case 'RiskStatus':
                    case 'ValueStatus':
                        const arrayValuesValueStatus = getSplitedArray(el.searchValue);
                        if (el.isExcluded) {
                            filteredIdeaGroups = excludeByValues(filteredIdeaGroups, el.fieldName, arrayValuesValueStatus);
                        } else {
                            filteredIdeaGroups = filterByValues(filteredIdeaGroups, el.fieldName, arrayValuesValueStatus);
                        }
                        break;
                    case 'SCMReview':
                        if (el.isExcluded) {
                            if (el.searchValue === false) {
                                filteredIdeaGroups = _.filter(filteredIdeaGroups, function (ideaGroup) {
                                    return (ideaGroup.IsReviewed || ideaGroup.SCMReviewNotRequired);
                                });
                            } else if (el.searchValue === true) {
                                filteredIdeaGroups = _.filter(filteredIdeaGroups, function (ideaGroup) {
                                    return (!(ideaGroup.IsReviewed || ideaGroup.SCMReviewNotRequired));
                                });
                            }
                        } else {
                            if (el.searchValue === true) {
                                filteredIdeaGroups = _.filter(filteredIdeaGroups, function (ideaGroup) {
                                    return ideaGroup.IsReviewed || ideaGroup.SCMReviewNotRequired;
                                });
                            } else if (el.searchValue === false) {
                                filteredIdeaGroups = _.filter(filteredIdeaGroups, function (ideaGroup) {
                                    return (!(ideaGroup.IsReviewed || ideaGroup.SCMReviewNotRequired));
                                });
                            }
                        }

                        break;
                    case 'GLRecommendation':
                        const arrayValuesGLRecommendation = getSplitedArray(el.searchValue);
                        if (el.isExcluded) {
                            filteredIdeaGroups = _.filter(filteredIdeaGroups, (item) => !_.includes(arrayValuesGLRecommendation, item.GLRecommendationType));
                        } else {
                            filteredIdeaGroups = _.filter(filteredIdeaGroups, (item) => _.includes(arrayValuesGLRecommendation, item.GLRecommendationType));

                        }
                        break;
                    case 'Highlighted':
                        const arrayHighlight = getSplitedArray(el.searchValue);
                        if (el.isExcluded) {
                            filteredIdeaGroups = _.filter(filteredIdeaGroups, (item) => !_.includes(arrayHighlight, item.IsHighlighted));
                        } else {
                            filteredIdeaGroups = _.filter(filteredIdeaGroups, (item) => _.includes(arrayHighlight, item.IsHighlighted));
                        }
                        break;
                    case 'ProjectProperties':
                        const fieldNumber = el.fieldValue;
                        const searchText = el.searchText;
                        filteredIdeaGroups = _.filter(filteredIdeaGroups, (item) => {
                            let rowsProject = _.filter(item.Idea.CustomFields, (el) => { return el && el.FieldNumber && el.FieldNumber === fieldNumber });
                            if (el.isExcluded) {
                                return rowsProject.length > 0 && !_.includes((rowsProject[0].Label ? rowsProject[0].Label.toLowerCase() : ''), searchText.toLowerCase());
                            } else {
                                return rowsProject.length > 0 && _.includes((rowsProject[0].Label ? rowsProject[0].Label.toLowerCase() : ''), searchText.toLowerCase());
                            }
                        });
                        break;
                    case 'GroupProperties':
                        const fieldNumber1 = el.fieldValue;
                        const searchText1 = el.searchText;
                        filteredIdeaGroups = _.filter(filteredIdeaGroups, (item) => {
                            let rowsGroup = _.filter(item.CustomFields, (el) => { return el && el.FieldNumber && el.FieldNumber === fieldNumber1 });
                            if (el.isExcluded) {
                                return rowsGroup.length > 0 && !_.includes((rowsGroup[0].Label ? rowsGroup[0].Label.toLowerCase() : ''), searchText1.toLowerCase());
                            } else {
                                return rowsGroup.length > 0 && _.includes((rowsGroup[0].Label ? rowsGroup[0].Label.toLowerCase() : ''), searchText1.toLowerCase());
                            }
                        });
                        break;
                    default:
                        switch (el.label) {
                            case 'NotReportingDetailedValue':
                            case 'RoughValueWithoutRoughTiming':
                            case 'ExpectedMultiGroupIdeaWithNoOtherGroupsAdded':
                            case 'IncompleteLineItems':
                            case 'DetailedValueNotComplete':
                            case 'RequiredFinanceValidationMissing':
                            case 'IdeasWithITCosts':
                            case 'ExpectedMultiGroupIdeas':
                            case 'ITCostingNotDecided':
                            case 'PendingITCostEstimates':
                            case 'PendingSubmissionsToIT':
                            case 'NoRoughValue':
                            case 'NoFocusArea':
                            case 'NoIdeaDescription':
                            case 'RequiredSCMReviewMissing':
                            case 'RequiredSCDecisionMissing':
                            case 'RequiredGLRecommendationMissing':
                            case 'RiskNotStarted':
                            case 'RatingsNotEntered':
                            case 'AllRiskRatersNotIdentified':
                            case 'AllRiskRatingsNotComplete':
                            case 'CTMDisagreementWithGLRisk':
                            case 'MHRiskRatingsWithoutNotes':
                            case 'RequiredSecondRiskRatings':
                            case 'GLsDisagreeOnRecommendation':
                            case 'PendingAcceptanceFromOtherGroups':
                            case 'PendingSubmissionsToOtherGroups':
                            case 'Only1LineItem':
                            case 'LargeValueWith2OrFewerLineItems':
                            case 'IdeasWithFractionalPositions':
                            case 'RiskDisagreementCTMGL':
                            case 'NoExpectedImpacts':
                            case 'NoGLRiskRating':
                                filteredIdeaGroups = getResolveReviewCountByName(el.label, filteredIdeaGroups, el.isExcluded);
                                break;
                            case 'FunctionalTitle':
                            case 'Category':
                            case 'IdeasWithVariance':
                                if (ideaIds && ideaIds.length > 0) {
                                    if (el.isExcluded) {
                                        filteredIdeaGroups = excludeByValues(filteredIdeaGroups, 'IdeaId', ideaIds);
                                    } else {
                                        filteredIdeaGroups = filterByValues(filteredIdeaGroups, 'IdeaId', ideaIds);
                                    }
                                }
                                break;
                            // case 'RiskDisagreementCTMGL':
                            //     filteredIdeaGroups = filterByValues(filteredIdeaGroups, 'IdeaId', el.ideas);
                            //     break;

                            default:
                                const arrayDefault = getSplitedArray(el.searchValue);
                                if (el.isExcluded) {
                                    filteredIdeaGroups = excludeByValuesIdea(filteredIdeaGroups, el.fieldName, arrayDefault);
                                } else {
                                    filteredIdeaGroups = filterByValuesIdea(filteredIdeaGroups, el.fieldName, arrayDefault);
                                }
                                break;
                        }
                        break;

                }
            }
        });


        var foundPrimaryGroupIncluded = applyFilters.some(function (el) {
            return el.value === "PrimaryGroup_1" && !el.isExcluded;
        });

        var foundAllOtherGroupsIncluded = applyFilters.some(function (el) {
            return el.value === "AllOtherGroups_1" && !el.isExcluded;
        });

        var foundImplementationTimingIncluded = applyFilters.filter(function (el) {
            return el.filterType === "ImplementationTiming" && !el.isExcluded;
        });

        var foundPrimaryGroupExcluded = applyFilters.some(function (el) {
            return el.value === "PrimaryGroup_1" && el.isExcluded;
        });

        var foundAllOtherGroupsExcluded = applyFilters.some(function (el) {
            return el.value === "AllOtherGroups_1" && el.isExcluded;
        });

        var foundImplementationTimingExcluded = applyFilters.filter(function (el) {
            return el.filterType === "ImplementationTiming" && el.isExcluded;
        });

        if (foundPrimaryGroupIncluded && foundAllOtherGroupsIncluded) {
            filteredIdeaGroups = filteredIdeaGroups;
        } else {
            if (foundPrimaryGroupIncluded) {
                filteredIdeaGroups = _.filter(filteredIdeaGroups, (item) => {
                    return item.Idea.GroupId === filterCurrentGroupId
                });
            } else if (foundAllOtherGroupsIncluded) {
                filteredIdeaGroups = _.filter(filteredIdeaGroups, (item) => {
                    return item.Idea.GroupId !== filterCurrentGroupId
                });
            }
        }

        if (foundPrimaryGroupExcluded && foundAllOtherGroupsExcluded) {
            filteredIdeaGroups = [];
        } else {
            if (foundPrimaryGroupExcluded) {
                filteredIdeaGroups = _.filter(filteredIdeaGroups, (item) => {
                    return item.Idea.GroupId !== filterCurrentGroupId
                });
            } else if (foundAllOtherGroupsExcluded) {
                filteredIdeaGroups = _.filter(filteredIdeaGroups, (item) => {
                    return item.Idea.GroupId === filterCurrentGroupId
                });
            }
        }

        if (filterGroupArray.length > 0) {
            filteredIdeaGroups = _.filter(filteredIdeaGroups, (item) => {
                var isFound = _.size(filterByValues(item.Idea.Groups, 'GroupId', filterGroupArray)) > 0 ? true : false;
                return isFound;
            })
        }

        if (excludedGroupArray.length > 0) {
            filteredIdeaGroups = _.filter(filteredIdeaGroups, (item) => {
                var isFound = _.size(filterByValues(item.Idea.Groups, 'GroupId', excludedGroupArray)) === 0 ? true : false;
                return isFound;
            })
        }

        if (filterTimingArray.length > 0) {
            filteredIdeaGroups = filterByValues(filteredIdeaGroups, foundImplementationTimingIncluded[0].fieldName, filterTimingArray);
        }

        if (excludedTimingArray.length > 0) {
            filteredIdeaGroups = excludeByValues(filteredIdeaGroups, foundImplementationTimingExcluded[0].fieldName, excludedTimingArray);
        }

        if (filterITGroupArray.indexOf(itGroupId) >= 0) {
            filteredIdeaGroups = _.filter(filteredIdeaGroups, (item) => { return item.Idea.ITStatus === 3 });
        }

        if (excludedITGroupArray.indexOf(itGroupId) >= 0) {
            filteredIdeaGroups = _.filter(filteredIdeaGroups, (item) => { return item.Idea.ITStatus !== 3 });
        }

        if (filterFocusAreaArray.length > 0) {
            filteredIdeaGroups = filterByValues(filteredIdeaGroups, 'FocusAreaId', filterFocusAreaArray);
        }

        if (excludedFocusAreaArray.length > 0) {
            filteredIdeaGroups = excludeByValues(filteredIdeaGroups, 'FocusAreaId', excludedFocusAreaArray);
        }

        const applyValueFilters = applyFilters.filter(function (el) { return el.fieldName === 'CurrentGroupValue' && !el.isExcluded });
        const applyDateFilters = applyFilters.filter(function (el) { return el.fieldName === 'ModifiedOn' && !el.isExcluded });
        const applyImplementationValueFilters = applyFilters.filter(function (el) { return (el.fieldName === 'Plan' || el.fieldName === 'Target' || el.fieldName === 'Actual') && !el.isExcluded });

        if (applyValueFilters.length > 0) {
            var minValue;
            var maxValue;
            applyValueFilters.map(function (el) {
                if (el.value === 'MinValue_1') {
                    minValue = parseInt(el.fieldValue);
                }
                if (el.value === 'MaxValue_2') {
                    maxValue = parseInt(el.fieldValue);
                }
            });
            if (minValue > 0 && maxValue > 0) {
                filteredIdeaGroups = _.filter(filteredIdeaGroups, function (ideaGroup) {
                    return ideaGroup.Value >= minValue && ideaGroup.Value <= maxValue;
                });
            } else if (minValue > 0) {
                filteredIdeaGroups = _.filter(filteredIdeaGroups, function (ideaGroup) {
                    return ideaGroup.Value >= minValue;
                });
            } else if (maxValue > 0) {
                filteredIdeaGroups = _.filter(filteredIdeaGroups, function (ideaGroup) {
                    return ideaGroup.Value <= maxValue;
                });
            }
        }

        if (applyImplementationValueFilters.length > 0) {
            var minValue;
            var maxValue;
            var ideaValueField = applyImplementationValueFilters[0].fieldName === 'Target' ? 'GroupUnAdjustedValue' : (applyImplementationValueFilters[0].fieldName === 'Plan' ? 'PlanValue' : 'ActualValue')
            applyImplementationValueFilters.map(function (el) {
                if (el.value === 'ImplementationIdeaMinValue_1') {
                    minValue = parseInt(el.fieldValue);
                }
                if (el.value === 'ImplementationIdeaMaxValue_2') {
                    maxValue = parseInt(el.fieldValue);
                }
            });
            if (minValue > 0 && maxValue > 0) {
                filteredIdeaGroups = _.filter(filteredIdeaGroups, function (ideaGroup) {
                    return ideaGroup[ideaValueField] >= minValue && ideaGroup[ideaValueField] <= maxValue;
                });
            } else if (minValue > 0) {
                filteredIdeaGroups = _.filter(filteredIdeaGroups, function (ideaGroup) {
                    return ideaGroup[ideaValueField] >= minValue;
                });
            } else if (maxValue > 0) {
                filteredIdeaGroups = _.filter(filteredIdeaGroups, function (ideaGroup) {
                    return ideaGroup[ideaValueField] <= maxValue;
                });
            }
        }

        if (applyDateFilters.length > 0) {
            var minDate;
            var maxDate;
            applyDateFilters.map(function (el) {
                if (el.value === 'DateLastEditedMin') {
                    minDate = el.fieldValue;
                }
                if (el.value === 'DateLastEditedMax') {
                    maxDate = el.fieldValue;
                }
            });
            var momentVar = moment;
            if (minDate && maxDate) {
                filteredIdeaGroups = _.filter(filteredIdeaGroups, function (ideaGroup) {
                    return new Date(momentVar(ideaGroup.Idea.ModifiedOn).format('L')) >= new Date(minDate) && new Date(momentVar(ideaGroup.Idea.ModifiedOn).format('L')) <= new Date(maxDate);
                });
            } else if (minDate) {
                filteredIdeaGroups = _.filter(filteredIdeaGroups, function (ideaGroup) {
                    return new Date(momentVar(ideaGroup.Idea.ModifiedOn).format('L')) >= new Date(minDate);
                });
            } else if (maxDate) {
                filteredIdeaGroups = _.filter(filteredIdeaGroups, function (ideaGroup) {
                    return new Date(momentVar(ideaGroup.Idea.ModifiedOn).format('L')) <= new Date(maxDate);
                });
            }
        }

        const applyValueFiltersExcluded = applyFilters.filter(function (el) { return el.fieldName === 'CurrentGroupValue' && el.isExcluded });
        const applyDateFiltersExcluded = applyFilters.filter(function (el) { return el.fieldName === 'ModifiedOn' && el.isExcluded });
        const applyImplementationValueFiltersExcluded = applyFilters.filter(function (el) { return (el.fieldName === 'Plan' || el.fieldName === 'Target' || el.fieldName === 'Actual') && el.isExcluded });

        if (applyValueFiltersExcluded.length > 0) {
            let minValue;
            let maxValue;
            applyValueFiltersExcluded.map(function (el) {
                if (el.value === 'MinValue_1') {
                    minValue = parseInt(el.fieldValue);
                }
                if (el.value === 'MaxValue_2') {
                    maxValue = parseInt(el.fieldValue);
                }
            });
            if (minValue > 0 && maxValue > 0) {
                filteredIdeaGroups = _.filter(filteredIdeaGroups, function (ideaGroup) {
                    return !(ideaGroup.Value >= minValue && ideaGroup.Value <= maxValue);
                });
            } else if (minValue > 0) {
                filteredIdeaGroups = _.filter(filteredIdeaGroups, function (ideaGroup) {
                    return !(ideaGroup.Value >= minValue);
                });
            } else if (maxValue > 0) {
                filteredIdeaGroups = _.filter(filteredIdeaGroups, function (ideaGroup) {
                    return !(ideaGroup.Value <= maxValue);
                });
            }
        }

        if (applyImplementationValueFiltersExcluded.length > 0) {
            var minValue;
            var maxValue;
            var ideaValueField = applyImplementationValueFiltersExcluded[0].fieldName === 'Target' ? 'GroupUnAdjustedValue' : (applyImplementationValueFiltersExcluded[0].fieldName === 'Plan' ? 'PlanValue' : 'ActualValue')
            applyImplementationValueFiltersExcluded.map(function (el) {
                if (el.value === 'ImplementationIdeaMinValue_1') {
                    minValue = parseInt(el.fieldValue);
                }
                if (el.value === 'ImplementationIdeaMaxValue_2') {
                    maxDate = parseInt(el.fieldValue);
                }
            });
            if (minValue > 0 && maxValue > 0) {
                filteredIdeaGroups = _.filter(filteredIdeaGroups, function (ideaGroup) {
                    return !(ideaGroup[ideaValueField] >= minValue && ideaGroup[ideaValueField] <= maxValue);
                });
            } else if (minValue > 0) {
                filteredIdeaGroups = _.filter(filteredIdeaGroups, function (ideaGroup) {
                    return !(ideaGroup[ideaValueField] >= minValue);
                });
            } else if (maxValue > 0) {
                filteredIdeaGroups = _.filter(filteredIdeaGroups, function (ideaGroup) {
                    return !(ideaGroup[ideaValueField] <= maxValue);
                });
            }
        }

        if (applyDateFiltersExcluded.length > 0) {
            var minDate;
            var maxDate;
            applyDateFiltersExcluded.map(function (el) {
                if (el.value === 'DateLastEditedMin') {
                    minDate = el.fieldValue;
                }
                if (el.value === 'DateLastEditedMax') {
                    maxDate = el.fieldValue;
                }
            });
            var momentVar = moment;
            if (minDate && maxDate) {
                filteredIdeaGroups = _.filter(filteredIdeaGroups, function (ideaGroup) {
                    return !(new Date(momentVar(ideaGroup.Idea.ModifiedOn).format('L')) >= new Date(minDate) && new Date(momentVar(ideaGroup.Idea.ModifiedOn).format('L')) <= new Date(maxDate));
                });
            } else if (minDate) {
                filteredIdeaGroups = _.filter(filteredIdeaGroups, function (ideaGroup) {
                    return !(new Date(momentVar(ideaGroup.Idea.ModifiedOn).format('L')) >= new Date(minDate));
                });
            } else if (maxDate) {
                filteredIdeaGroups = _.filter(filteredIdeaGroups, function (ideaGroup) {
                    return !(new Date(momentVar(ideaGroup.Idea.ModifiedOn).format('L')) <= new Date(maxDate));
                });
            }
        }

    }

    if (newCreatedIdeas) {
        if (newCreatedIdeas.length > 0) {
            return _.unionBy(filteredIdeaGroups, newCreatedIdeas, 'EntityId');
        } else {
            return filteredIdeaGroups;
        }
    } else {
        return filteredIdeaGroups;
    }
};

export const getIdeaGroupsApplyFiltersImplementation = (filteredIdeaGroups, applyFilters, itGroupId, filterCurrentGroupId, ideaIds, newCreatedIdeas, metrics, milestones, personnelLineItems, nonPersonnelLineItems, revenueLineItems, selectedView) => {
    let filterGroupArray = [];
    let excludedGroupArray = [];
    let filterITGroupArray = [];
    let excludedITGroupArray = [];
    let filterFocusAreaArray = [];
    let excludedFocusAreaArray = [];
    let filterTimingArray = [];
    let excludedTimingArray = [];

    let filteredGoMetrics = metrics;
    let filteredGoMilestones = milestones;
    let filteredGoPersonnelLineItems = personnelLineItems;
    let filteredGoNonPersonnelLineItems = nonPersonnelLineItems;
    let filteredGoRevenueLineItems = revenueLineItems;
    let filteredIdeaGroupsReturned = [];
    const ideaFilters = (selectedView === 7 || selectedView === 8 || selectedView === 9) ? applyFilters : _.filter(applyFilters, (e) => { return !e.isMilestone && !e.isMetric && !e.isLineItem });
    const metricFilters = (selectedView === 7 || selectedView === 8 || selectedView === 9) ? [] : (selectedView === 11 ? _.filter(applyFilters, (e) => { return e.isMetric }) : []);
    const milestoneFilters = (selectedView === 7 || selectedView === 8 || selectedView === 9) ? [] : (selectedView === 12 ? _.filter(applyFilters, (e) => { return e.isMilestone }) : []);
    const lineItemFilters = (selectedView === 7 || selectedView === 8 || selectedView === 9) ? [] : (selectedView === 10 ? _.filter(applyFilters, (e) => { return e.isLineItem }) : []);

    if (ideaFilters.length > 0) {
        ideaFilters.map(function (el) {
            if (el.fieldName !== 'CurrentGroupValue' && el.fieldName !== 'Plan' && el.fieldName !== 'Target' && el.fieldName !== 'Actual') {
                switch (el.filterType) {
                    case 'LastEditedBy':
                        filteredIdeaGroups = _.filter(filteredIdeaGroups, function (ideaGroup) {
                            if (el.isExcluded) {
                                return ideaGroup.Idea.ModifiedBy !== el.fieldValue;
                            } else {
                                return ideaGroup.Idea.ModifiedBy === el.fieldValue;
                            }
                        });
                        break;
                    case 'IdeaLeader':
                        filteredIdeaGroups = _.filter(filteredIdeaGroups, function (ideaGroup) {
                            let ifLeaderExist = false;
                            if (el.isExcluded) {
                                ifLeaderExist = (_.size(ideaGroup.Idea.IdeaLeaders) === 0 || _.size(_.filter(ideaGroup.Idea.IdeaLeaders, (item) => { return item.PersonnelId === el.fieldValue })) === 0) ? true : false;
                            } else {
                                ifLeaderExist = _.size(_.filter(ideaGroup.Idea.IdeaLeaders, (item) => { return item.PersonnelId === el.fieldValue })) > 0 ? true : false;
                            }
                            return ifLeaderExist;
                        });
                        break;
                    case 'IC':
                        filteredIdeaGroups = _.filter(filteredIdeaGroups, function (ideaGroup) {
                            let ifLeaderExist = false;
                            if (el.isExcluded) {
                                ifLeaderExist = (_.size(ideaGroup.Idea.IdeaICs) === 0 || _.size(_.filter(ideaGroup.Idea.IdeaICs, (item) => { return item.PersonnelId === el.fieldValue })) === 0) ? true : false;
                            } else {
                                ifLeaderExist = _.size(_.filter(ideaGroup.Idea.IdeaICs, (item) => { return item.PersonnelId === el.fieldValue })) > 0 ? true : false;
                            }
                            return ifLeaderExist;
                        });
                        break;
                    case 'DateLastEditedMin':
                    case 'DateLastEditedMax':
                        break;
                    case 'MyFocusArea':
                    case 'OtherFocusArea':
                        el.fieldValue.split(',').map(function (value) {
                            if (el.isExcluded) {
                                excludedFocusAreaArray.push(value);
                            } else {
                                filterFocusAreaArray.push(value);
                            }
                        })
                        break;
                    case 'OtherGroups':
                        el.fieldValue.split(',').map(function (value) {
                            if (el.isExcluded) {
                                if (value === itGroupId) {
                                    excludedITGroupArray.push(value);
                                } else {
                                    excludedGroupArray.push(value);
                                }
                            } else {
                                if (value === itGroupId) {
                                    filterITGroupArray.push(value);
                                } else {
                                    filterGroupArray.push(value);
                                }
                            }

                        })
                        break;
                    case 'ImplementationTiming':
                        el.fieldValue.split(',').map(function (value) {
                            if (el.isExcluded) {
                                excludedTimingArray.push(value);
                            } else {
                                filterTimingArray.push(value);
                            }
                        })
                        break;
                    case 'PrimaryGroup':
                        break;
                    case 'SCDecision':
                        const arrayValuesSCDecision = getSplitedArray(el.searchValue);
                        if (el.isExcluded) {
                            filteredIdeaGroups = filteredIdeaGroups.filter((item) => {
                                return (arrayValuesSCDecision.indexOf(item.SCDecisionType) === -1)
                            });
                        } else {
                            filteredIdeaGroups = filteredIdeaGroups.filter((item) => {
                                return (arrayValuesSCDecision.indexOf(item.SCDecisionType) !== -1)
                            });
                        }

                        break;
                    case 'OneTime':
                    case 'P&L':
                    case 'FTE':
                        if (el.isExcluded) {
                            filteredIdeaGroups = excludeByValues(filteredIdeaGroups, 'IdeaId', el.fieldValue);
                        } else {
                            filteredIdeaGroups = filterByValues(filteredIdeaGroups, 'IdeaId', el.fieldValue);
                        }
                        break;
                    case 'ImplementationStatusOverride':
                        const arrayValueImplementationStatusOverride = getSplitedArray(el.searchValue);
                        filteredIdeaGroups = _.filter(filteredIdeaGroups, function (o) {
                            if (o.ImplementationStatusOverride) {
                                return contains(arrayValueImplementationStatusOverride, resolveKey(o, 'ImplementationStatusOverride'));
                            } else {
                                return contains(arrayValueImplementationStatusOverride, resolveKey(o, 'ImplementationStatus'));
                            }
                        });
                        break;
                    case 'PlanLocked':
                        var arrayValuesPlanLocked = getSplitedArrayForBooleans(el.searchValue, 'boolean');
                        if (el.isExcluded) {
                            filteredIdeaGroups = excludeByValues(filteredIdeaGroups, el.fieldName, arrayValuesPlanLocked);
                        } else {
                            filteredIdeaGroups = filterByValues(filteredIdeaGroups, el.fieldName, arrayValuesPlanLocked);
                        }
                        break;
                    case 'RiskRating':
                        const arrayRiskRating = getSplitedArray(el.searchValue);
                        if (el.isExcluded) {
                            filteredIdeaGroups = _.filter(filteredIdeaGroups, (item) => !_.includes(arrayRiskRating, item.RiskRatingType));
                        } else {
                            filteredIdeaGroups = _.filter(filteredIdeaGroups, (item) => _.includes(arrayRiskRating, item.RiskRatingType));
                        }
                        break;
                    case 'GLRiskRating':
                        const glArrayRiskRating = getSplitedArray(el.searchValue);
                        if (el.isExcluded) {
                            filteredIdeaGroups = _.filter(filteredIdeaGroups, (item) => !_.includes(glArrayRiskRating, item.GLRiskRatingType));
                        } else {
                            filteredIdeaGroups = _.filter(filteredIdeaGroups, (item) => _.includes(glArrayRiskRating, item.GLRiskRatingType));
                        }
                        break;
                    case 'RiskStatus':
                    case 'ValueStatus':
                        const arrayValuesValueStatus = getSplitedArray(el.searchValue);
                        if (el.isExcluded) {
                            filteredIdeaGroups = excludeByValues(filteredIdeaGroups, el.fieldName, arrayValuesValueStatus);
                        } else {
                            filteredIdeaGroups = filterByValues(filteredIdeaGroups, el.fieldName, arrayValuesValueStatus);
                        }
                        break;
                    case 'SCMReview':
                        if (el.isExcluded) {
                            if (el.searchValue === false) {
                                filteredIdeaGroups = _.filter(filteredIdeaGroups, function (ideaGroup) {
                                    return (ideaGroup.IsReviewed || ideaGroup.SCMReviewNotRequired);
                                });
                            } else if (el.searchValue === true) {
                                filteredIdeaGroups = _.filter(filteredIdeaGroups, function (ideaGroup) {
                                    return (!(ideaGroup.IsReviewed || ideaGroup.SCMReviewNotRequired));
                                });
                            }
                        } else {
                            if (el.searchValue === true) {
                                filteredIdeaGroups = _.filter(filteredIdeaGroups, function (ideaGroup) {
                                    return ideaGroup.IsReviewed || ideaGroup.SCMReviewNotRequired;
                                });
                            } else if (el.searchValue === false) {
                                filteredIdeaGroups = _.filter(filteredIdeaGroups, function (ideaGroup) {
                                    return (!(ideaGroup.IsReviewed || ideaGroup.SCMReviewNotRequired));
                                });
                            }
                        }
                        break;
                    case 'GLRecommendation':
                        const arrayValuesGLRecommendation = getSplitedArray(el.searchValue);
                        if (el.isExcluded) {
                            filteredIdeaGroups = _.filter(filteredIdeaGroups, (item) => !_.includes(arrayValuesGLRecommendation, item.GLRecommendationType));
                        } else {
                            filteredIdeaGroups = _.filter(filteredIdeaGroups, (item) => _.includes(arrayValuesGLRecommendation, item.GLRecommendationType));

                        }
                        break;
                    case 'Highlighted':
                        const arrayHighlight = getSplitedArray(el.searchValue);
                        if (el.isExcluded) {
                            filteredIdeaGroups = _.filter(filteredIdeaGroups, (item) => !_.includes(arrayHighlight, item.IsHighlighted));
                        } else {
                            filteredIdeaGroups = _.filter(filteredIdeaGroups, (item) => _.includes(arrayHighlight, item.IsHighlighted));
                        }
                        break;
                    case 'ProjectProperties':
                        const fieldNumber = el.fieldValue;
                        const searchText = el.searchText;
                        filteredIdeaGroups = _.filter(filteredIdeaGroups, (item) => {
                            let rowsProject = _.filter(item.Idea.CustomFields, (el) => { return el && el.FieldNumber && el.FieldNumber === fieldNumber });
                            if (el.isExcluded) {
                                return rowsProject.length > 0 && !_.includes((rowsProject[0].Label ? rowsProject[0].Label.toLowerCase() : ''), searchText.toLowerCase());
                            } else {
                                return rowsProject.length > 0 && _.includes((rowsProject[0].Label ? rowsProject[0].Label.toLowerCase() : ''), searchText.toLowerCase());
                            }
                        });
                        break;
                    case 'GroupProperties':
                        const fieldNumber1 = el.fieldValue;
                        const searchText1 = el.searchText;
                        filteredIdeaGroups = _.filter(filteredIdeaGroups, (item) => {
                            let rowsGroup = _.filter(item.CustomFields, (el) => { return el && el.FieldNumber && el.FieldNumber === fieldNumber1 });
                            if (el.isExcluded) {
                                return rowsGroup.length > 0 && !_.includes((rowsGroup[0].Label ? rowsGroup[0].Label.toLowerCase() : ''), searchText1.toLowerCase());
                            } else {
                                return rowsGroup.length > 0 && _.includes((rowsGroup[0].Label ? rowsGroup[0].Label.toLowerCase() : ''), searchText1.toLowerCase());
                            }
                        });
                        break;
                    case 'TimingMetric':
                        const timingMetricsArray = el.fieldValue ? el.fieldValue.toUpperCase().split(',') : null;
                        const metric1 = _.uniq(_.map(filterByValues(filteredGoMetrics, el.fieldName, timingMetricsArray), 'IdeaId'));
                        if (el.isExcluded) {
                            filteredIdeaGroups = excludeByValues(filteredIdeaGroups, 'IdeaId', metric1);
                        }
                        else {
                            filteredIdeaGroups = filterByValues(filteredIdeaGroups, 'IdeaId', metric1);
                        }
                        break;
                    case 'ImplementationStatusMetric':
                        const arrayValueImplementationStatusMetric = getSplitedArray(el.searchValue);
                        const metric2 = _.uniq(_.map(_.filter(filteredGoMetrics, function (o) {
                            if (o.ImplementationStatusOverride) {
                                return contains(arrayValueImplementationStatusMetric, resolveKey(o, 'ImplementationStatusOverride'));

                            } else {
                                return contains(arrayValueImplementationStatusMetric, resolveKey(o, 'ImplementationStatus'));

                            }
                        }), 'IdeaId'));

                        if (el.isExcluded) {
                            filteredIdeaGroups = excludeByValues(filteredIdeaGroups, 'IdeaId', metric2);
                        }
                        else {
                            filteredIdeaGroups = filterByValues(filteredIdeaGroups, 'IdeaId', metric2);
                        }

                        break;
                    case 'ResponsiblePartyMetric':
                        const metric3 = _.uniq(_.map(_.filter(filteredGoMetrics, function (item) {
                            if (item.ResponsibleParty) {
                                return item.ResponsibleParty.indexOf(el.fieldValue) !== -1;
                            }
                        }), 'IdeaId'));
                        if (el.isExcluded) {
                            filteredIdeaGroups = excludeByValues(filteredIdeaGroups, 'IdeaId', metric3);
                        }
                        else {
                            filteredIdeaGroups = filterByValues(filteredIdeaGroups, 'IdeaId', metric3);
                        }
                        break;
                    case 'TimingMilestone':
                        const timingMilestoneArray = el.fieldValue ? el.fieldValue.toUpperCase().split(',') : null;
                        const milestone1 = _.uniq(_.map(filterByValues(filteredGoMilestones, el.fieldName, timingMilestoneArray), 'IdeaId'));
                        if (el.isExcluded) {
                            filteredIdeaGroups = excludeByValues(filteredIdeaGroups, 'IdeaId', milestone1);
                        }
                        else {
                            filteredIdeaGroups = filterByValues(filteredIdeaGroups, 'IdeaId', milestone1);
                        }
                        break;
                    case 'ImplementationStatusMilestone':
                        const arrayValueImplementationStatusMilestone = getSplitedArray(el.searchValue);
                        const milestone2 = _.uniq(_.map(_.filter(filteredGoMilestones, function (o) {
                            if (o.ImplementationStatusOverride) {
                                return contains(arrayValueImplementationStatusMilestone, resolveKey(o, 'ImplementationStatusOverride'));

                            } else {
                                return contains(arrayValueImplementationStatusMilestone, resolveKey(o, 'ImplementationStatus'));

                            }
                        }), 'IdeaId'));
                        if (el.isExcluded) {
                            filteredIdeaGroups = excludeByValues(filteredIdeaGroups, 'IdeaId', milestone2);
                        }
                        else {
                            filteredIdeaGroups = filterByValues(filteredIdeaGroups, 'IdeaId', milestone2);
                        }
                        break;
                    case 'ResponsiblePartyMilestone':
                        const milestone3 = _.uniq(_.map(_.filter(filteredGoMilestones, function (item) {
                            if (item.ResponsibleParty) {
                                return item.ResponsibleParty.indexOf(el.fieldValue) !== -1;
                            }
                        }), 'IdeaId'));
                        if (el.isExcluded) {
                            filteredIdeaGroups = excludeByValues(filteredIdeaGroups, 'IdeaId', milestone3);
                        }
                        else {
                            filteredIdeaGroups = filterByValues(filteredIdeaGroups, 'IdeaId', milestone3);
                        }
                        break;
                    case 'FractionalPositions':
                        const lineItemFractionalPositionsFilterArray = getSplitedArray(el.searchValue);
                        let filteredFractionalLineItems = [];
                        if (lineItemFractionalPositionsFilterArray.length === 2) {
                            filteredFractionalLineItems = _.uniq(_.map(_.filter(filteredGoPersonnelLineItems, (item) => {
                                return ((item.PlanPersonnelCount && !_.isInteger(item.PlanPersonnelCount)) || (item.PersonnelCount && !_.isInteger(item.PersonnelCount)))
                            }), 'IdeaId'));

                        } else {
                            if (lineItemFractionalPositionsFilterArray.indexOf(1) !== -1) {
                                filteredFractionalLineItems = _.uniq(_.map(_.filter(filteredGoPersonnelLineItems, (item) => {
                                    return item.PersonnelCount && !_.isInteger(item.PersonnelCount)
                                }), 'IdeaId'));

                            }
                            if (lineItemFractionalPositionsFilterArray.indexOf(2) !== -1) {
                                filteredFractionalLineItems = _.uniq(_.map(_.filter(filteredGoPersonnelLineItems, (item) => {
                                    return item.PlanPersonnelCount && !_.isInteger(item.PlanPersonnelCount)
                                }), 'IdeaId'));

                            }
                        }

                        if (el.isExcluded) {
                            filteredIdeaGroups = excludeByValues(filteredIdeaGroups, 'IdeaId', filteredFractionalLineItems);
                        }
                        else {
                            filteredIdeaGroups = filterByValues(filteredIdeaGroups, 'IdeaId', filteredFractionalLineItems);
                        }
                        break;
                    case 'LineType':
                        const lineItemLineTypeFilterArray = el.fieldValue ? el.fieldValue.split(',') : null;
                        const index = lineItemLineTypeFilterArray.indexOf('All');
                        if (index === -1) {
                            let lineItemLineSubTypeArray = [];
                            _.map(lineItemLineTypeFilterArray, (item) => {
                                const subType = getLineItemSubType(item);
                                lineItemLineSubTypeArray = _.concat(lineItemLineSubTypeArray, subType);
                            });
                            const lineType1 = _.uniq(_.map(filterByValues(filteredGoPersonnelLineItems, 'LineItemSubType', lineItemLineSubTypeArray), 'IdeaId'));
                            const lineType2 = _.uniq(_.map(filterByValues(filteredGoNonPersonnelLineItems, 'LineItemSubType', lineItemLineSubTypeArray), 'IdeaId'));
                            const lineType3 = _.uniq(_.map(filterByValues(filteredGoRevenueLineItems, 'LineItemSubType', lineItemLineSubTypeArray), 'IdeaId'));
                            const uniqueIdeaIdsLineType = _.uniq(_.concat(lineType1, lineType2, lineType3));
                            if (el.isExcluded) {
                                filteredIdeaGroups = excludeByValues(filteredIdeaGroups, 'IdeaId', uniqueIdeaIdsLineType);
                            }
                            else {
                                filteredIdeaGroups = filterByValues(filteredIdeaGroups, 'IdeaId', uniqueIdeaIdsLineType);
                            }
                        } else {
                            if (el.isExcluded) {
                                filteredIdeaGroups = [];
                            }
                        }
                        break;
                    case 'FunctionalTitleLineItem':
                        const lineItemFilterArray1 = el.fieldValue ? el.fieldValue.split(',') : null;
                        const lineItem1 = _.uniq(_.map(filterByValues(filteredGoPersonnelLineItems, 'FunctionalTitleId', lineItemFilterArray1), 'IdeaId'));
                        if (el.isExcluded) {
                            filteredIdeaGroups = excludeByValues(filteredIdeaGroups, 'IdeaId', lineItem1);
                        }
                        else {
                            filteredIdeaGroups = filterByValues(filteredIdeaGroups, 'IdeaId', lineItem1);
                        }
                        break;
                    case 'CompRange':
                        let lineItemFilterArray2 = el.fieldValue ? el.fieldValue.toUpperCase().split(',') : null;
                        lineItemFilterArray2 = _.map(lineItemFilterArray2, (e) => { return e ? parseFloat(e) : null })
                        const lineItem2 = _.uniq(_.map(filterByValues(filteredGoPersonnelLineItems, el.fieldName, lineItemFilterArray2), 'IdeaId'));
                        if (el.isExcluded) {
                            filteredIdeaGroups = excludeByValues(filteredIdeaGroups, 'IdeaId', lineItem2);
                        }
                        else {
                            filteredIdeaGroups = filterByValues(filteredIdeaGroups, 'IdeaId', lineItem2);
                        }
                        break;
                    case 'LineItemCategory':
                        const lineItemFilterArray3 = el.fieldValue ? el.fieldValue.split(',') : null;
                        const lineItem3 = _.map(filterByValues(filteredGoNonPersonnelLineItems, 'Category', lineItemFilterArray3), 'IdeaId');
                        const lineItem3_1 = _.map(filterByValues(filteredGoRevenueLineItems, 'Category', lineItemFilterArray3), 'IdeaId');
                        const uniqueIdeaIds = _.uniq(_.concat(lineItem3, lineItem3_1));
                        if (el.isExcluded) {
                            filteredIdeaGroups = excludeByValues(filteredIdeaGroups, 'IdeaId', uniqueIdeaIds);
                        }
                        else {
                            filteredIdeaGroups = filterByValues(filteredIdeaGroups, 'IdeaId', uniqueIdeaIds);
                        }
                        break;
                    case 'TimingLineItem':
                        const lineItemFilterArray4 = el.fieldValue ? el.fieldValue.toUpperCase().split(',') : null;
                        const lineItem4 = _.map(_.filter(filteredGoPersonnelLineItems, (lineItem) => {
                            let formattedDate = null;
                            if (lineItem[el.fieldName]) {
                                formattedDate = moment.utc(lineItem[el.fieldName]).format('L');
                                const splittedDate = formattedDate.split('/');
                                formattedDate = splittedDate[0] + '/01/' + splittedDate[2];
                            }
                            return lineItemFilterArray4.indexOf(formattedDate) > -1
                        }), 'IdeaId');
                        const lineItem4_1 = _.map(_.filter(filteredGoNonPersonnelLineItems, (lineItem) => {
                            let formattedDate = null;
                            if (lineItem[el.fieldName]) {
                                formattedDate = moment.utc(lineItem[el.fieldName]).format('L');
                                const splittedDate = formattedDate.split('/');
                                formattedDate = splittedDate[0] + '/01/' + splittedDate[2];
                            }
                            return lineItemFilterArray4.indexOf(formattedDate) > -1
                        }), 'IdeaId');
                        const lineItem4_2 = _.map(_.filter(filteredGoRevenueLineItems, (lineItem) => {
                            let formattedDate = null;
                            if (lineItem[el.fieldName]) {
                                formattedDate = moment.utc(lineItem[el.fieldName]).format('L');
                                const splittedDate = formattedDate.split('/');
                                formattedDate = splittedDate[0] + '/01/' + splittedDate[2];
                            }
                            return lineItemFilterArray4.indexOf(formattedDate) > -1
                        }), 'IdeaId');
                        const uniqueTimingIdeaIds = _.uniq(_.concat(lineItem4, lineItem4_1, lineItem4_2));
                        if (el.isExcluded) {
                            filteredIdeaGroups = excludeByValues(filteredIdeaGroups, 'IdeaId', uniqueTimingIdeaIds);
                        }
                        else {
                            filteredIdeaGroups = filterByValues(filteredIdeaGroups, 'IdeaId', uniqueTimingIdeaIds);
                        }
                        break;
                    case 'Direction':
                        const lineItemFilterArray5 = getSplitedArray(el.searchValue);
                        const lineItem5 = _.map(filterByValues(filteredGoPersonnelLineItems, el.fieldName, lineItemFilterArray5), 'IdeaId');
                        const lineItem5_1 = _.map(filterByValues(filteredGoNonPersonnelLineItems, el.fieldName, lineItemFilterArray5), 'IdeaId');
                        const lineItem5_2 = _.map(filterByValues(filteredGoRevenueLineItems, el.fieldName, lineItemFilterArray5), 'IdeaId');
                        const uniqueDirectionIdeaIds = _.uniq(_.concat(lineItem5, lineItem5_1, lineItem5_2));
                        if (el.isExcluded) {
                            filteredIdeaGroups = excludeByValues(filteredIdeaGroups, 'IdeaId', uniqueDirectionIdeaIds);
                        }
                        else {
                            filteredIdeaGroups = filterByValues(filteredIdeaGroups, 'IdeaId', uniqueDirectionIdeaIds);
                        }
                        break;
                    case 'IdeasWithVariance':
                        if (el.ideas && el.ideas.length > 0) {
                            if (el.isExcluded) {
                                filteredIdeaGroups = _.filter(filteredIdeaGroups, (ideaGroup) => { return el.ideas.indexOf(ideaGroup.IdeaId + '-' + ideaGroup.GroupId) < 0 })
                            }
                            else {
                                filteredIdeaGroups = _.filter(filteredIdeaGroups, (ideaGroup) => { return el.ideas.indexOf(ideaGroup.IdeaId + '-' + ideaGroup.GroupId) > -1 })
                            }
                        }
                        break
                    default:
                        switch (el.label) {
                            case 'NotReportingDetailedValue':
                            case 'RoughValueWithoutRoughTiming':
                            case 'ExpectedMultiGroupIdeaWithNoOtherGroupsAdded':
                            case 'IncompleteLineItems':
                            case 'DetailedValueNotComplete':
                            case 'RequiredFinanceValidationMissing':
                            case 'IdeasWithITCosts':
                            case 'ExpectedMultiGroupIdeas':
                            case 'ITCostingNotDecided':
                            case 'PendingITCostEstimates':
                            case 'PendingSubmissionsToIT':
                            case 'NoRoughValue':
                            case 'NoFocusArea':
                            case 'NoIdeaDescription':
                            case 'RequiredSCMReviewMissing':
                            case 'RequiredSCDecisionMissing':
                            case 'RequiredGLRecommendationMissing':
                            case 'RiskNotStarted':
                            case 'RatingsNotEntered':
                            case 'AllRiskRatersNotIdentified':
                            case 'AllRiskRatingsNotComplete':
                            case 'CTMDisagreementWithGLRisk':
                            case 'MHRiskRatingsWithoutNotes':
                            case 'RequiredSecondRiskRatings':
                            case 'GLsDisagreeOnRecommendation':
                            case 'PendingAcceptanceFromOtherGroups':
                            case 'PendingSubmissionsToOtherGroups':
                            case 'Only1LineItem':
                            case 'LargeValueWith2OrFewerLineItems':
                            case 'IdeasWithFractionalPositions':
                            case 'RiskDisagreementCTMGL':
                            case 'NoExpectedImpacts':
                            case 'NoGLRiskRating':
                                filteredIdeaGroups = getResolveReviewCountByName(el.label, filteredIdeaGroups, el.isExcluded);
                                break;
                            case 'FunctionalTitle':
                            case 'Category':
                                if (ideaIds && ideaIds.length > 0) {
                                    if (el.isExcluded) {
                                        filteredIdeaGroups = excludeByValues(filteredIdeaGroups, 'IdeaId', ideaIds);
                                    } else {
                                        filteredIdeaGroups = filterByValues(filteredIdeaGroups, 'IdeaId', ideaIds);
                                    }
                                }
                                break;
                            // case 'RiskDisagreementCTMGL':
                            //     filteredIdeaGroups = filterByValues(filteredIdeaGroups, 'IdeaId', el.ideas);
                            //     break;

                            default:
                                const arrayDefault = getSplitedArray(el.searchValue);
                                if (el.isExcluded) {
                                    filteredIdeaGroups = excludeByValuesIdea(filteredIdeaGroups, el.fieldName, arrayDefault);
                                } else {
                                    filteredIdeaGroups = filterByValuesIdea(filteredIdeaGroups, el.fieldName, arrayDefault);
                                }
                                break;
                        }
                        break;

                }
            }
        });
    }

    var foundPrimaryGroupIncluded = applyFilters.some(function (el) {
        return el.value === "PrimaryGroup_1" && !el.isExcluded;
    });

    var foundAllOtherGroupsIncluded = applyFilters.some(function (el) {
        return el.value === "AllOtherGroups_1" && !el.isExcluded;
    });

    var foundImplementationTimingIncluded = applyFilters.filter(function (el) {
        return el.filterType === "ImplementationTiming" && !el.isExcluded;
    });

    var foundPrimaryGroupExcluded = applyFilters.some(function (el) {
        return el.value === "PrimaryGroup_1" && el.isExcluded;
    });

    var foundAllOtherGroupsExcluded = applyFilters.some(function (el) {
        return el.value === "AllOtherGroups_1" && el.isExcluded;
    });

    var foundImplementationTimingExcluded = applyFilters.filter(function (el) {
        return el.filterType === "ImplementationTiming" && el.isExcluded;
    });

    if (foundPrimaryGroupIncluded && foundAllOtherGroupsIncluded) {
        filteredIdeaGroups = filteredIdeaGroups;
    } else {
        if (foundPrimaryGroupIncluded) {
            filteredIdeaGroups = _.filter(filteredIdeaGroups, (item) => {
                return item.Idea.GroupId === filterCurrentGroupId
            });
        } else if (foundAllOtherGroupsIncluded) {
            filteredIdeaGroups = _.filter(filteredIdeaGroups, (item) => {
                return item.Idea.GroupId !== filterCurrentGroupId
            });
        }
    }

    if (foundPrimaryGroupExcluded && foundAllOtherGroupsExcluded) {
        filteredIdeaGroups = [];
    } else {
        if (foundPrimaryGroupExcluded) {
            filteredIdeaGroups = _.filter(filteredIdeaGroups, (item) => {
                return item.Idea.GroupId !== filterCurrentGroupId
            });
        } else if (foundAllOtherGroupsExcluded) {
            filteredIdeaGroups = _.filter(filteredIdeaGroups, (item) => {
                return item.Idea.GroupId === filterCurrentGroupId
            });
        }
    }

    if (filterGroupArray.length > 0) {
        filteredIdeaGroups = _.filter(filteredIdeaGroups, (item) => {
            var isFound = _.size(filterByValues(item.Idea.Groups, 'GroupId', filterGroupArray)) > 0 ? true : false;
            return isFound;
        })
    }

    if (excludedGroupArray.length > 0) {
        filteredIdeaGroups = _.filter(filteredIdeaGroups, (item) => {
            var isFound = _.size(filterByValues(item.Idea.Groups, 'GroupId', excludedGroupArray)) === 0 ? true : false;
            return isFound;
        })
    }

    if (filterTimingArray.length > 0) {
        filteredIdeaGroups = filterByValues(filteredIdeaGroups, foundImplementationTimingIncluded[0].fieldName, filterTimingArray);
    }

    if (excludedTimingArray.length > 0) {
        filteredIdeaGroups = excludeByValues(filteredIdeaGroups, foundImplementationTimingExcluded[0].fieldName, excludedTimingArray);
    }

    if (filterITGroupArray.indexOf(itGroupId) >= 0) {
        filteredIdeaGroups = _.filter(filteredIdeaGroups, (item) => { return item.Idea.ITStatus === 3 });
    }

    if (excludedITGroupArray.indexOf(itGroupId) >= 0) {
        filteredIdeaGroups = _.filter(filteredIdeaGroups, (item) => { return item.Idea.ITStatus !== 3 });
    }

    if (filterFocusAreaArray.length > 0) {
        filteredIdeaGroups = filterByValues(filteredIdeaGroups, 'FocusAreaId', filterFocusAreaArray);
    }

    if (excludedFocusAreaArray.length > 0) {
        filteredIdeaGroups = excludeByValues(filteredIdeaGroups, 'FocusAreaId', excludedFocusAreaArray);
    }

    const applyValueFilters = applyFilters.filter(function (el) { return el.fieldName === 'CurrentGroupValue' && !el.isExcluded });
    const applyDateFilters = applyFilters.filter(function (el) { return el.fieldName === 'ModifiedOn' && !el.isExcluded });
    const applyImplementationValueFilters = applyFilters.filter(function (el) { return (el.fieldName === 'Plan' || el.fieldName === 'Target' || el.fieldName === 'Actual') && !el.isExcluded });

    if (applyValueFilters.length > 0) {
        var minValue;
        var maxValue;
        applyValueFilters.map(function (el) {
            if (el.value === 'MinValue_1') {
                minValue = parseInt(el.fieldValue);
            }
            if (el.value === 'MaxValue_2') {
                maxValue = parseInt(el.fieldValue);
            }
        });
        if (minValue > 0 && maxValue > 0) {
            filteredIdeaGroups = _.filter(filteredIdeaGroups, function (ideaGroup) {
                return ideaGroup.Value >= minValue && ideaGroup.Value <= maxValue;
            });
        } else if (minValue > 0) {
            filteredIdeaGroups = _.filter(filteredIdeaGroups, function (ideaGroup) {
                return ideaGroup.Value >= minValue;
            });
        } else if (maxValue > 0) {
            filteredIdeaGroups = _.filter(filteredIdeaGroups, function (ideaGroup) {
                return ideaGroup.Value <= maxValue;
            });
        }
    }

    if (applyImplementationValueFilters.length > 0) {
        var minValue;
        var maxValue;
        var ideaValueField = applyImplementationValueFilters[0].fieldName === 'Target' ? 'GroupUnAdjustedValue' : (applyImplementationValueFilters[0].fieldName === 'Plan' ? 'PlanValue' : 'ActualValue')
        applyImplementationValueFilters.map(function (el) {
            if (el.value === 'ImplementationIdeaMinValue_1') {
                minValue = parseInt(el.fieldValue);
            }
            if (el.value === 'ImplementationIdeaMaxValue_2') {
                maxValue = parseInt(el.fieldValue);
            }
        });
        if (minValue > 0 && maxValue > 0) {
            filteredIdeaGroups = _.filter(filteredIdeaGroups, function (ideaGroup) {
                return ideaGroup[ideaValueField] >= minValue && ideaGroup[ideaValueField] <= maxValue;
            });
        } else if (minValue > 0) {
            filteredIdeaGroups = _.filter(filteredIdeaGroups, function (ideaGroup) {
                return ideaGroup[ideaValueField] >= minValue;
            });
        } else if (maxValue > 0) {
            filteredIdeaGroups = _.filter(filteredIdeaGroups, function (ideaGroup) {
                return ideaGroup[ideaValueField] <= maxValue;
            });
        }
    }

    if (applyDateFilters.length > 0) {
        var minDate;
        var maxDate;
        applyDateFilters.map(function (el) {
            if (el.value === 'DateLastEditedMin') {
                minDate = el.fieldValue;
            }
            if (el.value === 'DateLastEditedMax') {
                maxDate = el.fieldValue;
            }
        });
        var momentVar = moment;
        if (minDate && maxDate) {
            filteredIdeaGroups = _.filter(filteredIdeaGroups, function (ideaGroup) {
                return new Date(momentVar(ideaGroup.Idea.ModifiedOn).format('L')) >= new Date(minDate) && new Date(momentVar(ideaGroup.Idea.ModifiedOn).format('L')) <= new Date(maxDate);
            });
        } else if (minDate) {
            filteredIdeaGroups = _.filter(filteredIdeaGroups, function (ideaGroup) {
                return new Date(momentVar(ideaGroup.Idea.ModifiedOn).format('L')) >= new Date(minDate);
            });
        } else if (maxDate) {
            filteredIdeaGroups = _.filter(filteredIdeaGroups, function (ideaGroup) {
                return new Date(momentVar(ideaGroup.Idea.ModifiedOn).format('L')) <= new Date(maxDate);
            });
        }
    }

    const applyValueFiltersExcluded = applyFilters.filter(function (el) { return el.fieldName === 'CurrentGroupValue' && el.isExcluded });
    const applyDateFiltersExcluded = applyFilters.filter(function (el) { return el.fieldName === 'ModifiedOn' && el.isExcluded });
    const applyImplementationValueFiltersExcluded = applyFilters.filter(function (el) { return (el.fieldName === 'Plan' || el.fieldName === 'Target' || el.fieldName === 'Actual') && el.isExcluded });

    if (applyValueFiltersExcluded.length > 0) {
        let minValue;
        let maxValue;
        applyValueFiltersExcluded.map(function (el) {
            if (el.value === 'MinValue_1') {
                minValue = parseInt(el.fieldValue);
            }
            if (el.value === 'MaxValue_2') {
                maxValue = parseInt(el.fieldValue);
            }
        });
        if (minValue > 0 && maxValue > 0) {
            filteredIdeaGroups = _.filter(filteredIdeaGroups, function (ideaGroup) {
                return !(ideaGroup.Value >= minValue && ideaGroup.Value <= maxValue);
            });
        } else if (minValue > 0) {
            filteredIdeaGroups = _.filter(filteredIdeaGroups, function (ideaGroup) {
                return !(ideaGroup.Value >= minValue);
            });
        } else if (maxValue > 0) {
            filteredIdeaGroups = _.filter(filteredIdeaGroups, function (ideaGroup) {
                return !(ideaGroup.Value <= maxValue);
            });
        }
    }

    if (applyImplementationValueFiltersExcluded.length > 0) {
        var minValue;
        var maxValue;
        var ideaValueField = applyImplementationValueFiltersExcluded[0].fieldName === 'Target' ? 'GroupUnAdjustedValue' : (applyImplementationValueFiltersExcluded[0].fieldName === 'Plan' ? 'PlanValue' : 'ActualValue')
        applyImplementationValueFiltersExcluded.map(function (el) {
            if (el.value === 'ImplementationIdeaMinValue_1') {
                minValue = parseInt(el.fieldValue);
            }
            if (el.value === 'ImplementationIdeaMaxValue_2') {
                maxDate = parseInt(el.fieldValue);
            }
        });
        if (minValue > 0 && maxValue > 0) {
            filteredIdeaGroups = _.filter(filteredIdeaGroups, function (ideaGroup) {
                return !(ideaGroup[ideaValueField] >= minValue && ideaGroup[ideaValueField] <= maxValue);
            });
        } else if (minValue > 0) {
            filteredIdeaGroups = _.filter(filteredIdeaGroups, function (ideaGroup) {
                return !(ideaGroup[ideaValueField] >= minValue);
            });
        } else if (maxValue > 0) {
            filteredIdeaGroups = _.filter(filteredIdeaGroups, function (ideaGroup) {
                return !(ideaGroup[ideaValueField] <= maxValue);
            });
        }
    }

    if (applyDateFiltersExcluded.length > 0) {
        var minDate;
        var maxDate;
        applyDateFiltersExcluded.map(function (el) {
            if (el.value === 'DateLastEditedMin') {
                minDate = el.fieldValue;
            }
            if (el.value === 'DateLastEditedMax') {
                maxDate = el.fieldValue;
            }
        });
        var momentVar = moment;
        if (minDate && maxDate) {
            filteredIdeaGroups = _.filter(filteredIdeaGroups, function (ideaGroup) {
                return !(new Date(momentVar(ideaGroup.Idea.ModifiedOn).format('L')) >= new Date(minDate) && new Date(momentVar(ideaGroup.Idea.ModifiedOn).format('L')) <= new Date(maxDate));
            });
        } else if (minDate) {
            filteredIdeaGroups = _.filter(filteredIdeaGroups, function (ideaGroup) {
                return !(new Date(momentVar(ideaGroup.Idea.ModifiedOn).format('L')) >= new Date(minDate));
            });
        } else if (maxDate) {
            filteredIdeaGroups = _.filter(filteredIdeaGroups, function (ideaGroup) {
                return !(new Date(momentVar(ideaGroup.Idea.ModifiedOn).format('L')) <= new Date(maxDate));
            });
        }
    }

    if (newCreatedIdeas.length > 0) {
        filteredIdeaGroupsReturned = _.unionBy(filteredIdeaGroups, newCreatedIdeas, 'EntityId');
    } else {
        filteredIdeaGroupsReturned = filteredIdeaGroups;
    }

    const uniqIdeaIds = _.uniq(_.map(filteredIdeaGroups, 'IdeaId'));
    filteredGoMetrics = filterByValues(filteredGoMetrics, 'IdeaId', uniqIdeaIds);
    filteredGoMilestones = filterByValues(filteredGoMilestones, 'IdeaId', uniqIdeaIds);
    filteredGoPersonnelLineItems = filterByValues(filteredGoPersonnelLineItems, 'IdeaId', uniqIdeaIds);
    filteredGoNonPersonnelLineItems = filterByValues(filteredGoNonPersonnelLineItems, 'IdeaId', uniqIdeaIds);
    filteredGoRevenueLineItems = filterByValues(filteredGoRevenueLineItems, 'IdeaId', uniqIdeaIds);

    if (metricFilters.length > 0) {
        metricFilters.map(function (el) {
            switch (el.filterType) {
                case 'TimingMetric':
                    const timingMetricsArray = el.fieldValue ? el.fieldValue.toUpperCase().split(',') : null;
                    if (el.isExcluded) {
                        filteredGoMetrics = excludeByValues(filteredGoMetrics, el.fieldName, timingMetricsArray);
                    } else {
                        filteredGoMetrics = filterByValues(filteredGoMetrics, el.fieldName, timingMetricsArray);
                    }

                    break;
                case 'ImplementationStatusMetric':
                    const arrayValueImplementationStatusMetric = getSplitedArray(el.searchValue);
                    filteredGoMetrics = _.filter(filteredGoMetrics, function (o) {
                        if (el.isExcluded) {
                            if (o.ImplementationStatusOverride) {
                                return !contains(arrayValueImplementationStatusMetric, resolveKey(o, 'ImplementationStatusOverride'));

                            } else {
                                return !contains(arrayValueImplementationStatusMetric, resolveKey(o, 'ImplementationStatus'));

                            }
                        } else {
                            if (o.ImplementationStatusOverride) {
                                return contains(arrayValueImplementationStatusMetric, resolveKey(o, 'ImplementationStatusOverride'));

                            } else {
                                return contains(arrayValueImplementationStatusMetric, resolveKey(o, 'ImplementationStatus'));

                            }
                        }


                    });
                    break;
                case 'ResponsiblePartyMetric':
                    filteredGoMetrics = _.filter(filteredGoMetrics, function (item) {
                        if (item.ResponsibleParty) {
                            if (el.isExcluded) {
                                return item.ResponsibleParty.indexOf(el.fieldValue) === -1;
                            } else {
                                return item.ResponsibleParty.indexOf(el.fieldValue) !== -1;
                            }
                        }
                    });
                    break;
                default:
                    break;

            }
        });
    }

    if (milestoneFilters.length > 0) {
        milestoneFilters.map(function (el) {
            switch (el.filterType) {
                case 'TimingMilestone':
                    const timingMilestoneArray = el.fieldValue ? el.fieldValue.toUpperCase().split(',') : null;
                    if (el.isExcluded) {
                        filteredGoMilestones = excludeByValues(filteredGoMilestones, el.fieldName, timingMilestoneArray);
                    } else {
                        filteredGoMilestones = filterByValues(filteredGoMilestones, el.fieldName, timingMilestoneArray);
                    }
                    break;
                case 'ImplementationStatusMilestone':
                    const arrayValueImplementationStatusMilestone = getSplitedArray(el.searchValue);
                    filteredGoMilestones = _.filter(filteredGoMilestones, function (o) {
                        if (el.isExcluded) {
                            if (o.ImplementationStatusOverride) {
                                return !contains(arrayValueImplementationStatusMilestone, resolveKey(o, 'ImplementationStatusOverride'));

                            } else {
                                return !contains(arrayValueImplementationStatusMilestone, resolveKey(o, 'ImplementationStatus'));

                            }
                        } else {
                            if (o.ImplementationStatusOverride) {
                                return contains(arrayValueImplementationStatusMilestone, resolveKey(o, 'ImplementationStatusOverride'));

                            } else {
                                return contains(arrayValueImplementationStatusMilestone, resolveKey(o, 'ImplementationStatus'));

                            }
                        }


                    });
                    break;
                case 'ResponsiblePartyMilestone':
                    filteredGoMilestones = _.filter(filteredGoMilestones, function (item) {
                        if (item.ResponsibleParty) {
                            if (el.isExcluded) {
                                return item.ResponsibleParty.indexOf(el.fieldValue) === -1;
                            } else {
                                return item.ResponsibleParty.indexOf(el.fieldValue) !== -1;
                            }
                        }
                    });
                    break;
                default:
                    break;

            }
        });
    }

    if (lineItemFilters.length > 0) {
        lineItemFilters.map(function (el) {
            switch (el.filterType) {
                case 'FractionalPositions':
                    const lineItemFractionalPositionsFilterArray = getSplitedArray(el.searchValue);

                    if (el.isExcluded) {
                        if (lineItemFractionalPositionsFilterArray.length === 2) {
                            filteredGoPersonnelLineItems = _.filter(filteredGoPersonnelLineItems, (item) => {
                                return !((item.PlanPersonnelCount && !_.isInteger(item.PlanPersonnelCount)) || (item.PersonnelCount && !_.isInteger(item.PersonnelCount)))
                            });
                        } else {
                            if (lineItemFractionalPositionsFilterArray.indexOf(1) !== -1) {
                                filteredGoPersonnelLineItems = _.filter(filteredGoPersonnelLineItems, (item) => {
                                    return !(item.PersonnelCount && !_.isInteger(item.PersonnelCount))
                                });
                            }
                            if (lineItemFractionalPositionsFilterArray.indexOf(2) !== -1) {
                                filteredGoPersonnelLineItems = _.filter(filteredGoPersonnelLineItems, (item) => {
                                    return !(item.PlanPersonnelCount && !_.isInteger(item.PlanPersonnelCount))
                                });
                            }
                        }
                    } else {
                        if (lineItemFractionalPositionsFilterArray.length === 2) {
                            filteredGoPersonnelLineItems = _.filter(filteredGoPersonnelLineItems, (item) => {
                                return ((item.PlanPersonnelCount && !_.isInteger(item.PlanPersonnelCount)) || (item.PersonnelCount && !_.isInteger(item.PersonnelCount)))
                            });
                        } else {
                            if (lineItemFractionalPositionsFilterArray.indexOf(1) !== -1) {
                                filteredGoPersonnelLineItems = _.filter(filteredGoPersonnelLineItems, (item) => {
                                    return item.PersonnelCount && !_.isInteger(item.PersonnelCount)
                                });
                            }
                            if (lineItemFractionalPositionsFilterArray.indexOf(2) !== -1) {
                                filteredGoPersonnelLineItems = _.filter(filteredGoPersonnelLineItems, (item) => {
                                    return item.PlanPersonnelCount && !_.isInteger(item.PlanPersonnelCount)
                                });
                            }
                        }
                    }

                    filteredGoNonPersonnelLineItems = [];
                    filteredGoRevenueLineItems = [];
                    break;
                case 'LineType':
                    const lineItemLineTypeFilterArray = el.fieldValue ? el.fieldValue.split(',') : null;
                    const index = lineItemLineTypeFilterArray.indexOf('All');
                    if (index === -1) {
                        let lineItemLineSubTypeArray = [];
                        _.map(lineItemLineTypeFilterArray, (item) => {
                            const subType = getLineItemSubType(item);
                            lineItemLineSubTypeArray = _.concat(lineItemLineSubTypeArray, subType);
                        });
                        if (el.isExcluded) {
                            filteredGoPersonnelLineItems = excludeByValues(filteredGoPersonnelLineItems, 'LineItemSubType', lineItemLineSubTypeArray);
                            filteredGoNonPersonnelLineItems = excludeByValues(filteredGoNonPersonnelLineItems, 'LineItemSubType', lineItemLineSubTypeArray);
                            filteredGoRevenueLineItems = excludeByValues(filteredGoRevenueLineItems, 'LineItemSubType', lineItemLineSubTypeArray);
                        } else {
                            filteredGoPersonnelLineItems = filterByValues(filteredGoPersonnelLineItems, 'LineItemSubType', lineItemLineSubTypeArray);
                            filteredGoNonPersonnelLineItems = filterByValues(filteredGoNonPersonnelLineItems, 'LineItemSubType', lineItemLineSubTypeArray);
                            filteredGoRevenueLineItems = filterByValues(filteredGoRevenueLineItems, 'LineItemSubType', lineItemLineSubTypeArray);
                        }
                    } else {
                        if (el.isExcluded) {
                            filteredGoPersonnelLineItems = [];
                            filteredGoNonPersonnelLineItems = [];
                            filteredGoRevenueLineItems = [];
                        }
                    }
                    break;
                case 'FunctionalTitleLineItem':
                    const lineItemFilterArray1 = el.fieldValue ? el.fieldValue.split(',') : null;
                    if (el.isExcluded) {
                        filteredGoPersonnelLineItems = excludeByValues(filteredGoPersonnelLineItems, 'FunctionalTitleId', lineItemFilterArray1);
                    } else {
                        filteredGoPersonnelLineItems = filterByValues(filteredGoPersonnelLineItems, 'FunctionalTitleId', lineItemFilterArray1);
                    }
                    filteredGoNonPersonnelLineItems = [];
                    filteredGoRevenueLineItems = [];
                    break;
                case 'CompRange':
                    let lineItemFilterArray2 = el.fieldValue ? el.fieldValue.toUpperCase().split(',') : null;
                    lineItemFilterArray2 = _.map(lineItemFilterArray2, (e) => { return e ? parseFloat(e) : null });
                    if (el.isExcluded) {
                        filteredGoPersonnelLineItems = excludeByValues(filteredGoPersonnelLineItems, el.fieldName, lineItemFilterArray2);
                    } else {
                        filteredGoPersonnelLineItems = filterByValues(filteredGoPersonnelLineItems, el.fieldName, lineItemFilterArray2);
                    }
                    filteredGoNonPersonnelLineItems = [];
                    filteredGoRevenueLineItems = [];
                    break;
                case 'LineItemCategory':
                    const lineItemFilterArray3 = el.fieldValue ? el.fieldValue.split(',') : null;
                    filteredGoPersonnelLineItems = [];
                    if (el.isExcluded) {
                        filteredGoNonPersonnelLineItems = excludeByValues(filteredGoNonPersonnelLineItems, 'Category', lineItemFilterArray3);
                        filteredGoRevenueLineItems = excludeByValues(filteredGoRevenueLineItems, 'Category', lineItemFilterArray3);
                    } else {
                        filteredGoNonPersonnelLineItems = filterByValues(filteredGoNonPersonnelLineItems, 'Category', lineItemFilterArray3);
                        filteredGoRevenueLineItems = filterByValues(filteredGoRevenueLineItems, 'Category', lineItemFilterArray3);
                    }
                    break;
                case 'TimingLineItem':
                    const lineItemFilterArray4 = el.fieldValue ? el.fieldValue.toUpperCase().split(',') : null;
                    if (el.isExcluded) {
                        filteredGoPersonnelLineItems = _.filter(filteredGoPersonnelLineItems, (lineItem) => {
                            let formattedDate = null;
                            if (lineItem[el.fieldName]) {
                                formattedDate = moment.utc(lineItem[el.fieldName]).format('L');
                                const splittedDate = formattedDate.split('/');
                                formattedDate = splittedDate[0] + '/01/' + splittedDate[2];
                            }
                            return lineItemFilterArray4.indexOf(formattedDate) < 0
                        });
                        filteredGoNonPersonnelLineItems = _.filter(filteredGoNonPersonnelLineItems, (lineItem) => {
                            let formattedDate = null;
                            if (lineItem[el.fieldName]) {
                                formattedDate = moment.utc(lineItem[el.fieldName]).format('L');
                                const splittedDate = formattedDate.split('/');
                                formattedDate = splittedDate[0] + '/01/' + splittedDate[2];
                            }
                            return lineItemFilterArray4.indexOf(formattedDate) < 0
                        });
                        filteredGoRevenueLineItems = _.filter(filteredGoRevenueLineItems, (lineItem) => {
                            let formattedDate = null;
                            if (lineItem[el.fieldName]) {
                                formattedDate = moment.utc(lineItem[el.fieldName]).format('L');
                                const splittedDate = formattedDate.split('/');
                                formattedDate = splittedDate[0] + '/01/' + splittedDate[2];
                            }
                            return lineItemFilterArray4.indexOf(formattedDate) < 0
                        });
                    } else {
                        filteredGoPersonnelLineItems = _.filter(filteredGoPersonnelLineItems, (lineItem) => {
                            let formattedDate = null;
                            if (lineItem[el.fieldName]) {
                                formattedDate = moment.utc(lineItem[el.fieldName]).format('L');
                                const splittedDate = formattedDate.split('/');
                                formattedDate = splittedDate[0] + '/01/' + splittedDate[2];
                            }
                            return lineItemFilterArray4.indexOf(formattedDate) > -1
                        });
                        filteredGoNonPersonnelLineItems = _.filter(filteredGoNonPersonnelLineItems, (lineItem) => {
                            let formattedDate = null;
                            if (lineItem[el.fieldName]) {
                                formattedDate = moment.utc(lineItem[el.fieldName]).format('L');
                                const splittedDate = formattedDate.split('/');
                                formattedDate = splittedDate[0] + '/01/' + splittedDate[2];
                            }
                            return lineItemFilterArray4.indexOf(formattedDate) > -1
                        });
                        filteredGoRevenueLineItems = _.filter(filteredGoRevenueLineItems, (lineItem) => {
                            let formattedDate = null;
                            if (lineItem[el.fieldName]) {
                                formattedDate = moment.utc(lineItem[el.fieldName]).format('L');
                                const splittedDate = formattedDate.split('/');
                                formattedDate = splittedDate[0] + '/01/' + splittedDate[2];
                            }
                            return lineItemFilterArray4.indexOf(formattedDate) > -1
                        });
                    }


                    break;
                case 'Direction':
                    const lineItemFilterArray5 = getSplitedArray(el.searchValue);
                    if (el.isExcluded) {
                        filteredGoPersonnelLineItems = excludeByValues(filteredGoPersonnelLineItems, el.fieldName, lineItemFilterArray5);
                        filteredGoNonPersonnelLineItems = excludeByValues(filteredGoNonPersonnelLineItems, el.fieldName, lineItemFilterArray5);
                        filteredGoRevenueLineItems = excludeByValues(filteredGoRevenueLineItems, el.fieldName, lineItemFilterArray5);
                    }
                    else {
                        filteredGoPersonnelLineItems = filterByValues(filteredGoPersonnelLineItems, el.fieldName, lineItemFilterArray5);
                        filteredGoNonPersonnelLineItems = filterByValues(filteredGoNonPersonnelLineItems, el.fieldName, lineItemFilterArray5);
                        filteredGoRevenueLineItems = filterByValues(filteredGoRevenueLineItems, el.fieldName, lineItemFilterArray5);
                    }
                    break;
                default:
                    break;

            }
        });
    }
    return {
        filteredIdeaGroups: filteredIdeaGroupsReturned, filteredGoMetrics: filteredGoMetrics, filteredGoMilestones: filteredGoMilestones,
        filteredGoPersonnelLineItems: filteredGoPersonnelLineItems, filteredGoNonPersonnelLineItems: filteredGoNonPersonnelLineItems,
        filteredGoRevenueLineItems: filteredGoRevenueLineItems
    };
};
