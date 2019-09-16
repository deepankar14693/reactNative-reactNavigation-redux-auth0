import _ from 'lodash';
import moment from 'moment';
import React from 'react';
import uuid from 'uuid';
import Translation from '../components/common/translation';
import i18n from '../i18n';
import { formatAmount, isEmpty2, translateKey } from './utils';


export const actionOptions = (isIT, isRevenue) => {
    if (isIT) {
        return [
            { value: -1, label: <Translation id={'Cost'} /> },
        ]
    } else if (isRevenue) {
        return [
            { value: -1, label: <Translation id={'Decrease'} /> },
            { value: 1, label: <Translation id={'Increase'} /> },
        ]
    } else {
        return [
            { value: -1, label: <Translation id={'Cost'} /> },
            { value: 1, label: <Translation id={'Savings'} /> },
        ]
    }

}

export const ideaStatus = [
    { value: 1, label: <Translation id={'Active'} /> },
    { value: 2, label: <Translation id={'Inactive'} /> },
]

export const ITStatus = [
    { value: 1, label: <Translation id={'Yes'} /> },
    { value: 2, label: <Translation id={'No'} /> },
]

export const RecurringTypes = [
    { value: 1, label: <Translation id={'OneTime'} /> },
    { value: 2, label: <Translation id={'Recurring'} /> },
]

export const npeRecurringTypes = (isWC) => {
    if (isWC) {
        return [
            { value: 3, label: <Translation id={'WorkingCapital'} /> }
        ]
    } else {
        return [
            { value: 1, label: <Translation id={'OneTime'} /> },
            { value: 2, label: <Translation id={'Recurring'} /> },
            { value: 3, label: <Translation id={'WorkingCapital'} /> }
        ]
    }

}

export const riskTypes = [
    { value: null, label: <span>&nbsp;</span> },
    { value: 1, label: <Translation id={'Low'} /> },
    { value: 2, label: <Translation id={'Medium'} /> },
    { value: 3, label: <Translation id={'High'} /> }
]

export const getSessionStatus = (status) => {
    switch (status) {
        case 1: return '';
        case 3: return i18n.t("Archived");
        default: return '';
    }
};

export const getSessionIdeaStatus = (status) => {
    switch (status) {
        case 1: return '';
        case 2: return i18n.t("MovedToIdeasList");
        case 3: return i18n.t("Archived");
        default: return '';
    }
};

export const getLineItemTypeOptions = (groupType) => {
    var lineItemTypeOptions = [];
    if (groupType !== 1) {
        lineItemTypeOptions.push({ value: 'npe', label: <Translation id={'NonPersonnelLineItem'} /> });
        lineItemTypeOptions.push({ value: 'pe', label: <Translation id={'PersonnelLineItem'} /> });
    }
    if (groupType !== 2) {
        lineItemTypeOptions.push({ value: 'revenue', label: <Translation id={'MarginLineItem'} /> });
    }
    return lineItemTypeOptions;
};

export const groupTypes = [
    { value: 1, label: <Translation id={'Revenue'} /> },
    { value: 2, label: <Translation id={'Cost'} /> }
];

export const getGroupTypeName = (value) => {
    switch (value) {
        case 1: return i18n.t("Revenue");
        case 2: return i18n.t("Cost");
        default: return '';
    }
}

export const planLockTypes = (isGroupLevel) => {
    return [
        { value: 1, label: <Translation id={isEmpty2(isGroupLevel) ? 'GroupDefault' : 'GlobalDefault'} /> },
        { value: 2, label: <Translation id={'Yes'} /> },
        { value: 3, label: <Translation id={'No'} /> }
    ]
};

export const getPlanLockLabel = (value, isGroupLevel) => {
    switch (value) {
        case 1: return isEmpty2(isGroupLevel) ? i18n.t("GroupDefault") : i18n.t("GlobalDefault");
        case 2: return i18n.t("Yes");
        case 3: return i18n.t("No");
        default: return '';
    }
}

export const ideaLeaderFilterTypes = [
    { value: 1, label: <Translation id={'All'} /> },
    { value: 2, label: <Translation id={'GoIdeas'} /> }
];

export const getIdeaLeaderFilterLabel = (value) => {
    switch (value) {
        case 1: return i18n.t("All");
        case 2: return i18n.t("GoIdeas");
        default: return '';
    }
}

export const metricStatusOptions = [
    { value: 110, label: <Translation id={'NotStarted'} /> },
    { value: 205, label: <Translation id={'Exceed'} /> },
    { value: 210, label: <Translation id={'OnTrack'} /> },
    { value: 230, label: <Translation id={'OffTrack'} /> }
];

export const milestoneStatusOptions = [
    { value: 110, label: <Translation id={'NotStarted'} /> },
    { value: 205, label: <Translation id={'Exceed'} /> },
    { value: 210, label: <Translation id={'OnTrack'} /> },
    { value: 220, label: <Translation id={'AtRisk'} /> },
    { value: 230, label: <Translation id={'OffTrack'} /> },
    { value: 910, label: <Translation id={'Completed'} /> },
]

export const implementationStatusOptions = [
    { value: 110, label: <Translation id={'NotStarted'} /> },
    { value: 205, label: <Translation id={'Exceed'} /> },
    { value: 210, label: <Translation id={'OnTrack'} /> },
    { value: 220, label: <Translation id={'AtRisk'} /> },
    { value: 230, label: <Translation id={'OffTrack'} /> },
    // { value: 910, label: <Translation id={'Completed'} /> },
]

export const implementationStatusLabels = [
    { value: 110, label: i18n.t('NotStarted') },
    { value: 205, label: i18n.t('Exceed') },
    { value: 210, label: i18n.t('OnTrack') },
    { value: 220, label: i18n.t('AtRisk') },
    { value: 230, label: i18n.t('OffTrack') },
    { value: 910, label: i18n.t('Completed') },
]
export const getImplementationStatusLabel = (implementationStatus, isReadOnly) => {
    switch (implementationStatus) {
        case 110: return i18n.t("NotStarted");
        case 205: return i18n.t("Exceed");
        case 210: return i18n.t("OnTrack");
        case 220: return i18n.t("AtRisk");
        case 230: return i18n.t("OffTrack");
        case 910: return i18n.t("Completed");
        default: return !isReadOnly ? i18n.t('Select') : '';
    }
}

export const getSubElementsStatusTooltip = (implementationStatus) => {
    return i18n.t("SubElementsStatus") + ' ' + getImplementationStatusLabel(implementationStatus);
};

export const getOverriddenStatusTooltip = (implementationStatusOverride) => {
    return i18n.t("OverriddenStatus") + ' ' + getImplementationStatusLabel(implementationStatusOverride);
};

export const emptyGLRiskDetailArray = () => {
    return {
        LRiskCount: 0, MRiskCount: 0, HRiskCount: 0, UnratedCount: 0, TotalCount: 0,
        LRiskValue: 0, MRiskValue: 0, HRiskValue: 0, UnratedValue: 0, TotalValue: 0,
        LRiskIdeas: [], MRiskIdeas: [], HRiskIdeas: [], UnratedIdeas: []
    }
};

export const emptyRiskYearlyArray = () => {
    return {
        LRisk: { Y1: 0, Y2: 0, Y3: 0, Y4: 0, Y5: 0 },
        MRisk: { Y1: 0, Y2: 0, Y3: 0, Y4: 0, Y5: 0 },
        HRisk: { Y1: 0, Y2: 0, Y3: 0, Y4: 0, Y5: 0 },
        Unrated: { Y1: 0, Y2: 0, Y3: 0, Y4: 0, Y5: 0 }
    }
};

export const emptyGLRiskValueSummaryArray = () => {
    return {
        pe: {
            LRiskFTECost: 0, MRiskFTECost: 0, HRiskFTECost: 0, UnratedFTECost: 0, UnratedPECost: 0, UnratedPESaving: 0,
            LRiskFTESaving: 0, MRiskFTESaving: 0, HRiskFTESaving: 0, UnratedFTESaving: 0,
            LRiskRecurring: 0, MRiskRecurring: 0, HRiskRecurring: 0, UnratedRecurring: 0,
            Ideas: []
        },
        npe: {
            LRisk1TimeCost: 0, MRisk1TimeCost: 0, HRisk1TimeCost: 0, Unrated1TimeCost: 0,
            LRisk1TimeSaving: 0, MRisk1TimeSaving: 0, HRisk1TimeSaving: 0, Unrated1TimeSaving: 0,
            LRisk1TimeCostUnAmortized: 0, MRisk1TimeCostUnAmortized: 0, HRisk1TimeCostUnAmortized: 0, Unrated1TimeCostUnAmortized: 0,
            LRisk1TimeSavingUnAmortized: 0, MRisk1TimeSavingUnAmortized: 0, HRisk1TimeSavingUnAmortized: 0, Unrated1TimeSavingUnAmortized: 0,
            LRiskRecurring: 0, MRiskRecurring: 0, HRiskRecurring: 0, UnratedRecurring: 0,
            Ideas: []
        },
        revenue: {
            LRisk1TimeMargin: 0, MRisk1TimeMargin: 0, HRisk1TimeMargin: 0, Unrated1TimeMargin: 0,
            LRisk1TimeMarginUnAmortized: 0, MRisk1TimeMarginUnAmortized: 0, HRisk1TimeMarginUnAmortized: 0, Unrated1TimeMarginUnAmortized: 0,
            LRiskRecurringMargin: 0, MRiskRecurringMargin: 0, HRiskRecurringMargin: 0, UnratedRecurringMargin: 0,
            LRisk1TimeRevenue: 0, MRisk1TimeRevenue: 0, HRisk1TimeRevenue: 0, Unrated1TimeRevenue: 0,
            GoRecurringRevenue: 0, MRiskRecurringRevenue: 0, HRiskRecurringRevenue: 0, UnratedRecurringRevenue: 0
        },
        IT: {
            LRisk1TimeCost: 0, MRisk1TimeCost: 0, HRisk1TimeCost: 0, Unrated1TimeCost: 0,
            LRisk1TimeCostUnAmortized: 0, MRisk1TimeCostUnAmortized: 0, HRisk1TimeCostUnAmortized: 0, Unrated1TimeCostUnAmortized: 0,
            Ideas: []
        },
        allocation: {
            LRiskSavings: 0, MRiskSavings: 0, HRiskSavings: 0, UnratedSavings: 0,
            LRiskCosts: 0, MRiskCosts: 0, HRiskCosts: 0, UnratedCosts: 0,
            LRiskAllocatedValue: 0, MRiskAllocatedValue: 0, HRiskAllocatedValue: 0, UnratedAllocatedValue: 0
        }
    }
};

export const emptyDecisionDetailArray = () => {
    return {
        GoCount: 0, NoGoCount: 0, NoRecCount: 0, PriorGoDecCount: 0, TotalCount: 0,
        GoValue: 0, NoGoValue: 0, NoRecValue: 0, PriorGoDecValue: 0, TotalValue: 0,
        GoIdeas: [], NoGoIdeas: [], NoRecIdeas: [], PriorGoDecIdeas: []
    }
};

export const emptyDecisionValueSummaryArray = () => {
    return {
        pe: {
            GoFTECost: 0, NoGoFTECost: 0, NoRecFTECost: 0, PriorGoDecFTECost: 0, PriorGoDecPECost: 0, PriorGoDecPESaving: 0,
            GoFTESaving: 0, NoGoFTESaving: 0, NoRecFTESaving: 0, PriorGoDecFTESaving: 0,
            GoRecurring: 0, NoGoRecurring: 0, NoRecRecurring: 0, PriorGoDecRecurring: 0,
            Ideas: []
        },
        npe: {
            Go1TimeCost: 0, NoGo1TimeCost: 0, NoRec1TimeCost: 0, PriorGoDec1TimeCost: 0,
            Go1TimeSaving: 0, NoGo1TimeSaving: 0, NoRec1TimeSaving: 0, PriorGoDec1TimeSaving: 0,
            GoRecurring: 0, NoGoRecurring: 0, NoRecRecurring: 0, PriorGoDecRecurring: 0,
            Ideas: []
        },
        revenue: {
            Go1TimeMargin: 0, NoGo1TimeMargin: 0, NoRec1TimeMargin: 0, PriorGoDec1TimeMargin: 0,
            GoRecurringMargin: 0, NoGoRecurringMargin: 0, NoRecRecurringMargin: 0, PriorGoDecRecurringMargin: 0,
            Go1TimeRevenue: 0, NoGo1TimeRevenue: 0, NoRec1TimeRevenue: 0, PriorGoDec1TimeRevenue: 0,
            GoRecurringRevenue: 0, NoGoRecurringRevenue: 0, NoRecRecurringRevenue: 0, PriorGoDecRecurringRevenue: 0
        },
        allocation: {
            GoSavings: 0, NoGoSavings: 0, NoRecSavings: 0, PriorGoDecSavings: 0,
            GoCosts: 0, NoGoCosts: 0, NoRecCosts: 0, PriorGoDecCosts: 0,
            GoAllocatedValue: 0, NoGoAllocatedValue: 0, NoRecAllocatedValue: 0, PriorGoDecAllocatedValue: 0
        }
    }
};

export const emptyPersonnelLineItem = (ideaId, groupId, isIT) => {
    return {
        EntityId: uuid.v4(),
        PersonnelLineItemId: null,
        DirectionType: 0,
        FunctionalTitleId: null,
        IdeaId: ideaId,
        // GroupId: isIT ? null : groupId,
        GroupId: groupId,
        TeamId: null,
        IsIT: isIT,
        PersonnelCount: null,
        SalaryRange: null,
        AverageSalary: null,
        Timing: null,
        Notes: null,
        ModifiedBy: null,
        ModifiedOn: null,
        Value: null
    }
}

export const emptyNonPersonnelLineItem = (ideaId, groupId, isIT) => {
    return {
        EntityId: uuid.v4(),
        NonPersonnelLineItemId: null,
        IdeaId: ideaId,
        // GroupId: isIT ? null : groupId,
        GroupId: groupId,
        TeamId: null,
        IsIT: isIT,
        DirectionType: 0,
        Category: null,
        IsRecurring: null,
        Amount: null,
        AmortizationPeriod: 1,
        Timing: null,
        Notes: null,
        ModifiedBy: null,
        ModifiedOn: null,
        Value: null
    }
}

export const emptyRevenueLineItem = (ideaId, groupId) => {
    return {
        EntityId: uuid.v4(),
        RevenueLineItemId: null,
        IdeaId: ideaId,
        GroupId: groupId,
        TeamId: null,
        DirectionType: 0,
        Category: null,
        IsRecurring: null,
        RevenueChange: null,
        MarginChange: null,
        AmortizationPeriod: 1,
        Timing: null,
        Notes: null,
        ModifiedBy: null,
        ModifiedOn: null,
        Value: null
    }
}

export const emptyPersonnelLineItemNew = (ideaId, groupId, isIT) => {
    return {
        EntityId: uuid.v4(),
        PersonnelLineItemId: null,
        DirectionType: (isIT ? -1 : 1),
        FunctionalTitleId: null,
        IdeaId: ideaId,
        GroupId: groupId,
        TeamId: null,
        IsIT: isIT,
        PersonnelCount: null,
        SalaryRange: null,
        AverageSalary: null,
        Timing: null,
        Notes: null,
        ModifiedBy: null,
        ModifiedOn: null,
        Value: null
    }
}

export const emptyNonPersonnelLineItemNew = (ideaId, groupId, isIT) => {
    return {
        EntityId: uuid.v4(),
        NonPersonnelLineItemId: null,
        IdeaId: ideaId,
        GroupId: groupId,
        TeamId: null,
        IsIT: isIT,
        DirectionType: (isIT ? -1 : 1),
        Category: null,
        IsRecurring: null,
        Amount: null,
        AmortizationPeriod: 1,
        Timing: null,
        Notes: null,
        ModifiedBy: null,
        ModifiedOn: null,
        Value: null
    }
}

export const emptyRevenueLineItemNew = (ideaId, groupId) => {
    return {
        EntityId: uuid.v4(),
        RevenueLineItemId: null,
        IdeaId: ideaId,
        GroupId: groupId,
        TeamId: null,
        DirectionType: 1,
        Category: null,
        IsRecurring: null,
        RevenueChange: null,
        MarginChange: null,
        AmortizationPeriod: 1,
        Timing: null,
        Notes: null,
        ModifiedBy: null,
        ModifiedOn: null,
        Value: null
    }
}

export const emptyMilestone = (ideaId, groupId) => {
    return {
        ActualTiming: null,
        CreatedBy: null,
        CreatedOn: null,
        Description: "",
        EntityId: uuid.v4(),
        GroupId: groupId,
        IdeaId: ideaId,
        IsComplete: null,
        MilestoneId: null,
        ModifiedBy: null,
        ModifiedOn: null,
        Notes: null,
        OrganizationId: "",
        PlanTiming: null,
        ResponsibleParty: null,
        Revision: 0,
        Sequence: 0,
        Title: "",
    }
}

export const customFieldSetsDataGNF = () => {
    let GNFFields = {};
    // GNFFields["PrimaryGroup"] = { checked: false, fieldLabel: 'CustomizeTablePrimaryGroupId', column: 'PrimaryGroup', customFieldSet: 'GNF' };
    GNFFields["PrimaryGroupName"] = { checked: false, fieldLabel: 'CustomizeTablePrimaryGroupName', column: 'PrimaryGroupName', customFieldSet: 'GNF' };
    GNFFields["LinkedGroups"] = { checked: false, fieldLabel: 'LinkedGroups', column: 'LinkedGroups', customFieldSet: 'GNF' };
    GNFFields["ITCostingRequired"] = { checked: false, fieldLabel: 'ITCostingRequired', column: 'ITCostingRequired', customFieldSet: 'GNF' };
    GNFFields["FocusArea"] = { checked: true, fieldLabel: 'CustomizeTableGroupFocusArea', column: 'FocusArea', customFieldSet: 'GNF' };
    GNFFields["FocusAreaLeaderNames"] = { checked: false, fieldLabel: 'FocusAreaLeaderNames', column: 'FocusAreaLeaderNames', customFieldSet: 'GNF' };
    // GNFFields["ITStatus"] = { checked: false, fieldLabel: 'CustomizeTableITStatus', column: 'ITStatus', customFieldSet: 'GNF' };
    return GNFFields;
}

export const customFieldSetsDataDTL = () => {
    let DTLFields = {};
    DTLFields["IdeaNumber"] = { checked: true, fieldLabel: 'CustomizeTableIdeaId', column: 'IdeaNumber', customFieldSet: 'DTL', disabled: true };
    DTLFields["Title"] = { checked: true, fieldLabel: 'CustomizeTableIdeaTitle', column: 'Title', customFieldSet: 'DTL' };
    DTLFields["Description"] = { checked: true, fieldLabel: 'CustomizeTableIdeaDescription', column: 'Description', customFieldSet: 'DTL' };
    DTLFields["ScratchpadPreview"] = { checked: false, fieldLabel: 'Scratchpad', column: 'ScratchpadPreview', customFieldSet: 'DTL' };
    DTLFields["CurrentStatePreview"] = { checked: false, fieldLabel: 'CurrentState', column: 'CurrentStatePreview', customFieldSet: 'DTL' };
    DTLFields["RecommendedApproachPreview"] = { checked: false, fieldLabel: 'RecommendedApproach', column: 'RecommendedApproachPreview', customFieldSet: 'DTL' };
    DTLFields["ValuationSummaryPreview"] = { checked: false, fieldLabel: 'ValuationSummary', column: 'ValuationSummaryPreview', customFieldSet: 'DTL' };
    DTLFields["RiskSummaryPreview"] = { checked: false, fieldLabel: 'RiskSummary', column: 'RiskSummaryPreview', customFieldSet: 'DTL' };
    DTLFields["MetricsAndMilestonesPreview"] = { checked: false, fieldLabel: 'MetricsAndMilestones', column: 'MetricsAndMilestonesPreview', customFieldSet: 'DTL' };
    DTLFields["IdeaLeadersName"] = { checked: false, fieldLabel: 'IdeaLeaders', column: 'IdeaLeadersName', customFieldSet: 'DTL' };
    DTLFields["AttachmentCount"] = { checked: false, fieldLabel: 'Attachments', column: 'AttachmentCount', customFieldSet: 'DTL' };
    DTLFields["IsHighlighted"] = { checked: false, fieldLabel: 'CustomizeTableHighlighted', column: 'IsHighlighted', valueBy: 'IdeaGroupId', customFieldSet: 'DTL' };
    // DTLFields["ArchivedDate"] = { checked: false, fieldLabel: 'CustomizeTableArchivedDate', column: 'ArchivedDate', customFieldSet: 'DTL' };
    // DTLFields["ArchivedBy"] = { checked: false, fieldLabel: 'CustomizeTableArchivedBy', column: 'ArchivedBy', customFieldSet: 'DTL' };
    // DTLFields["ArchiveRequestNote"] = { checked: false, fieldLabel: 'CustomizeTableArchiveRequestNote', column: 'ArchiveRequestNote', customFieldSet: 'DTL' };
    // DTLFields["EFL7"] = { checked: false, fieldLabel: '[Each Custom Field]', column: 'EFL7',customFieldSet:'DTL' };
    DTLFields["StatusName"] = { checked: false, fieldLabel: 'IdeaStatus', column: 'StatusName', customFieldSet: 'DTL' };
    // DTLFields["ModifiedByName"] = { checked: false, fieldLabel: 'ModifiedBy', column: 'ModifiedByName', customFieldSet: 'DTL' };
    // DTLFields["ModifiedOnFormatted"] = { checked: false, fieldLabel: 'ModifiedOn', column: 'ModifiedOnFormatted', customFieldSet: 'DTL' };
    return DTLFields;
}

export const customFieldSetsDataRIS = () => {
    let RISFields = {};
    RISFields["RiskStage"] = { checked: false, fieldLabel: 'CustomizeTableRiskStage', column: 'RiskStage', customFieldSet: 'RIS' };
    RISFields["GroupRisk"] = { checked: false, fieldLabel: 'GroupRisk', column: 'GroupRisk', customFieldSet: 'RIS' };
    RISFields["RoughRiskRatingType"] = { checked: true, fieldLabel: 'RoughRisk', column: 'RoughRiskRatingType', customFieldSet: 'RIS' };
    RISFields["RoughRiskRatingNote"] = { checked: false, fieldLabel: 'CustomizeTableRoughRiskNote', column: 'RoughRiskRatingNote', customFieldSet: 'RIS' };
    RISFields["GLRating"] = { checked: true, fieldLabel: 'GLRating', column: 'GLRating', valueBy: 'GLRiskRatingId', customFieldSet: 'RIS' };
    RISFields["GLRatingNote"] = { checked: false, fieldLabel: 'CustomizeTableGLRatingNote', column: 'GLRatingNote', valueBy: 'GLRiskRatingId', customFieldSet: 'RIS' };
    RISFields["GLRatingEditDate"] = { checked: false, fieldLabel: 'CustomizeTableGLRatingEditDate', column: 'GLRatingEditDate', customFieldSet: 'RIS' };
    RISFields["RiskRatersCount"] = { checked: false, fieldLabel: 'CustomizeTableRiskRatersCount', column: 'RiskRatersCount', customFieldSet: 'RIS' };
    RISFields["HRiskCount"] = { checked: false, fieldLabel: 'CustomizeTableHRiskCount', column: 'HRiskCount', customFieldSet: 'RIS' };
    RISFields["MRiskCount"] = { checked: false, fieldLabel: 'CustomizeTableMRiskCount', column: 'MRiskCount', customFieldSet: 'RIS' };
    RISFields["LRiskCount"] = { checked: false, fieldLabel: 'CustomizeTableLRiskCount', column: 'LRiskCount', customFieldSet: 'RIS' };
    //RISFields["3rdPartyReview"] = { checked: false, fieldLabel: 'CustomizeTable3rdPartyReview', column: '3rdPartyReview', customFieldSet: 'RIS' };
    return RISFields;

}

export const customFieldSetsDataVAL = () => {
    let VALFields = {};
    VALFields["ValueStage"] = { checked: false, fieldLabel: 'CustomizeTableValueStage', column: 'ValueStage', customFieldSet: 'VAL' };
    VALFields["GroupValue"] = { checked: false, fieldLabel: 'GroupValue', column: 'GroupValue', customFieldSet: 'VAL' };
    VALFields["CompanyValue"] = { checked: false, fieldLabel: 'IdeaValue', column: 'CompanyValue', customFieldSet: 'VAL' };
    VALFields["GroupRoughValue"] = { checked: true, fieldLabel: 'CustomizeTableGroupRoughValue', column: 'GroupRoughValue', valueBy: 'IdeaGroupId', customFieldSet: 'VAL' };
    // VALFields["RoughValue"] = { checked: false, fieldLabel: 'CustomizeTableIdeaRoughValue', column: 'RoughValue', customFieldSet: 'VAL' };
    VALFields["IsImpactsAssigned"] = { checked: false, fieldLabel: 'CustomizeTableIsImpactsAssigned', column: 'IsImpactsAssigned', customFieldSet: 'VAL' };
    VALFields["GroupFTENumber"] = { checked: false, fieldLabel: 'CustomizeTableGroupFTENumber', column: 'GroupFTENumber', customFieldSet: 'VAL' };
    VALFields["GroupPEValue"] = { checked: false, fieldLabel: 'CustomizeTableGroupPEValue', column: 'GroupPEValue', customFieldSet: 'VAL' };
    VALFields["GroupOnetimeNPEValue"] = { checked: false, fieldLabel: 'CustomizeTableGroupOnetimeNPEValue', column: 'GroupOnetimeNPEValue', customFieldSet: 'VAL' };
    VALFields["GroupRecurringNPEValue"] = { checked: false, fieldLabel: 'CustomizeTableGroupRecurringNPEValue', column: 'GroupRecurringNPEValue', customFieldSet: 'VAL' };
    VALFields["GroupOneTimeITValue"] = { checked: false, fieldLabel: 'CustomizeTableGroupOneTimeIT', column: 'GroupOneTimeITValue', customFieldSet: 'VAL' };
    VALFields["GroupRecurringITValue"] = { checked: false, fieldLabel: 'CustomizeTableGroupRecurringIT', column: 'GroupRecurringITValue', customFieldSet: 'VAL' };
    // VALFields["GroupOnetimeRevValue"] = { checked: false, fieldLabel: 'CustomizeTableGroupOnetimeRevValue', column: 'GroupOnetimeRevValue', customFieldSet: 'VAL' };
    // VALFields["GroupRecurringRevValue"] = { checked: false, fieldLabel: 'CustomizeTableGroupRecurringRevValue', column: 'GroupRecurringRevValue', customFieldSet: 'VAL' };
    VALFields["GroupOnetimeMarginChangeValue"] = { checked: false, fieldLabel: 'CustomizeTableGroupOnetimeMarginChangeValue', column: 'GroupOnetimeMarginChangeValue', customFieldSet: 'VAL' };
    VALFields["GroupRecurringMarginChangeValue"] = { checked: false, fieldLabel: 'CustomizeTableGroupRecurringMarginChangeValue', column: 'GroupRecurringMarginChangeValue', customFieldSet: 'VAL' };
    //VALFields["GroupWorkingCapitalValue"] = { checked: false, fieldLabel: 'CustomizeTableGroupWorkingCapitalValue', column: 'GroupWorkingCapitalValue', customFieldSet: 'VAL' };
    VALFields["GroupLineItemCount"] = { checked: false, fieldLabel: 'CustomizeTableGroupLineItemCount', column: 'GroupLineItemCount', customFieldSet: 'VAL' };
    VALFields["IdeaFTENumber"] = { checked: false, fieldLabel: 'CustomizeTableIdeaFTENumber', column: 'IdeaFTENumber', customFieldSet: 'VAL' };
    VALFields["IdeaPEValue"] = { checked: false, fieldLabel: 'CustomizeTableIdeaPEValue', column: 'IdeaPEValue', customFieldSet: 'VAL' };
    VALFields["IdeaOnetimeNPEValue"] = { checked: false, fieldLabel: 'CustomizeTableIdeaOnetimeNPEValue', column: 'IdeaOnetimeNPEValue', customFieldSet: 'VAL' };
    VALFields["IdeaRecurringNPEValue"] = { checked: false, fieldLabel: 'CustomizeTableIdeaRecurringNPEValue', column: 'IdeaRecurringNPEValue', customFieldSet: 'VAL' };
    VALFields["IdeaOneTimeITValue"] = { checked: false, fieldLabel: 'CustomizeTableIdeaOneTimeIT', column: 'IdeaOneTimeITValue', customFieldSet: 'VAL' };
    VALFields["IdeaRecurringITValue"] = { checked: false, fieldLabel: 'CustomizeTableIdeaRecurringIT', column: 'IdeaRecurringITValue', customFieldSet: 'VAL' };
    // VALFields["IdeaOnetimeRevValue"] = { checked: false, fieldLabel: 'CustomizeTableIdeaOnetimeRevValue', column: 'IdeaOnetimeRevValue', customFieldSet: 'VAL' };
    // VALFields["IdeaRecurringRevValue"] = { checked: false, fieldLabel: 'CustomizeTableIdeaRecurringRevValue', column: 'IdeaRecurringRevValue', customFieldSet: 'VAL' };
    VALFields["IdeaOnetimeMarginChangeValue"] = { checked: false, fieldLabel: 'CustomizeTableIdeaOnetimeMarginChangeValue', column: 'IdeaOnetimeMarginChangeValue', customFieldSet: 'VAL' };
    VALFields["IdeaRecurringMarginChangeValue"] = { checked: false, fieldLabel: 'CustomizeTableIdeaRecurringMarginChangeValue', column: 'IdeaRecurringMarginChangeValue', customFieldSet: 'VAL' };
    //VALFields["IdeaWorkingCapitalValue"] = { checked: false, fieldLabel: 'CustomizeTableIdeaWorkingCapitalValue', column: 'IdeaWorkingCapitalValue', customFieldSet: 'VAL' };
    VALFields["IdeaLineItemCount"] = { checked: false, fieldLabel: 'CustomizeTableIdeaLineItemCount', column: 'IdeaLineItemCount', customFieldSet: 'VAL' };
    VALFields["FinanceValidationRequired"] = { checked: false, fieldLabel: 'FinanceValidationRequired', column: 'FinanceValidationRequired', valueBy: 'ValueStatus', customFieldSet: 'VAL' };
    VALFields["IsFinanceValidated"] = { checked: false, fieldLabel: 'CustomizeTableFinanceValidated', column: 'IsFinanceValidated', valueBy: 'ValueStatus', customFieldSet: 'VAL' };
    // VALFields["IdeaTiming"] = { checked: false, fieldLabel: 'Idea Timing', column: 'IdeaTiming',customFieldSet:'VAL' };
    return VALFields;
}

export const customFieldSetsDataDEC = () => {
    let DECFields = {};
    DECFields["DecisionStage"] = { checked: false, fieldLabel: 'CustomizeTableDecisionStage', column: 'DecisionStage', customFieldSet: 'DEC' };
    DECFields["Decision"] = { checked: false, fieldLabel: 'Decision', column: 'Decision', valueBy: 'Decision', customFieldSet: 'DEC' };
    DECFields["PrimaryGLRecommendation"] = { checked: false, fieldLabel: 'CustomizeTablePrimaryGLRecommendation', column: 'PrimaryGLRecommendation', valueBy: 'GLRecommendationId', customFieldSet: 'DEC' };
    DECFields["GLRecommendationNote"] = { checked: false, fieldLabel: 'CustomizeTableGLReccomendationNote', column: 'GLRecommendationNote', valueBy: 'GLRecommendationId', customFieldSet: 'DEC' };
    // DECFields["PrimarySCMReview"] = { checked: false, fieldLabel: 'Primary SCM Review', column: 'PrimarySCMReview',customFieldSet:'DEC' };
    DECFields["SCMReviewNote"] = { checked: false, fieldLabel: 'CustomizeTableSCMReviewNote', column: 'SCMReviewNote', valueBy: 'SCMReviewId', customFieldSet: 'DEC' };
    DECFields["SCDecision"] = { checked: false, fieldLabel: 'SCDecision', column: 'SCDecision', valueBy: 'SCMReviewId', customFieldSet: 'DEC' };
    DECFields["SCDecisionNote"] = { checked: false, fieldLabel: 'CustomizeTableSCDecisionNote', column: 'SCDecisionNote', valueBy: 'SCMReviewId', customFieldSet: 'DEC' };
    DECFields["SCDecisionDate"] = { checked: false, fieldLabel: 'CustomizeTableDecisionDate', column: 'SCDecisionDate', customFieldSet: 'DEC' };
    return DECFields;
}

export const customFieldSetsDataCUS = () => {
    let CUSFields = {};
    CUSFields["ProjectProperties"] = { checked: false, fieldLabel: 'ProjectProperties', column: 'ProjectProperties', customFieldSet: 'CUS' };
    CUSFields["GroupProperties"] = { checked: false, fieldLabel: 'GroupProperties', column: 'GroupProperties', customFieldSet: 'CUS' };
    return CUSFields;
}

export const groupSortOptionsPrimary = () => {
    return [
        { value: 1, sortColumnName: 'GroupName', isAsc: true, label: 'AtoZ', sortingOn: 'Group' },
        { value: 2, sortColumnName: 'GroupName', isAsc: false, label: 'ZtoA', sortingOn: 'Group' }
    ]
}

export const riskSortOptionsPrimary = () => {
    return [
        { value: 1, sortColumnName: 'Risk', isAsc: true, label: 'LowToHigh', sortingOn: 'Risk' },
        { value: 2, sortColumnName: 'Risk', isAsc: false, label: 'HighToLow', sortingOn: 'Risk' },
    ]
}

export const riskSortOptionsSecondary = () => {
    return [
        { value: 3, sortColumnName: 'RiskStatus', isAsc: true, label: 'LeastCompleteFirst', sortingOn: 'Risk' },
        { value: 4, sortColumnName: 'RiskStatus', isAsc: false, label: 'MostCompleteFirst', sortingOn: 'Risk' }
    ]
}

export const valueSortOptionsPrimary = () => {
    return [
        { value: 1, sortColumnName: 'CurrentGroupValue', isAsc: true, label: 'LowestFirst', sortingOn: 'Value' },
        { value: 2, sortColumnName: 'CurrentGroupValue', isAsc: false, label: 'HighestFirst', sortingOn: 'Value' },
    ]
}

export const valueSortOptionsSecondary = () => {
    return [
        { value: 3, sortColumnName: 'ValueStatus', isAsc: true, label: 'LeastCompleteFirst', sortingOn: 'Value' },
        { value: 4, sortColumnName: 'ValueStatus', isAsc: false, label: 'MostCompleteFirst', sortingOn: 'Value' }
    ]
}

export const palnningValueSortOptionsPrimary = () => {
    return [
        { value: 1, sortColumnName: 'PlanValue', isAsc: true, label: 'LowestFirst', sortingOn: 'PlanValue' },
        { value: 2, sortColumnName: 'PlanValue', isAsc: false, label: 'HighestFirst', sortingOn: 'PlanValue' },

    ]
}


export const palnningValueSortOptionsSecondary = () => {
    return [
        { value: 7, sortColumnName: 'PlanTiming', isAsc: true, label: 'LowestFirst', sortingOn: 'PlanValue' },
        { value: 8, sortColumnName: 'PlanTiming', isAsc: false, label: 'HighestFirst', sortingOn: 'PlanValue' }
    ]
}


export const metricsSortOptionsPrimary = () => {
    return [
        { value: 1, sortColumnName: 'MetricCount', isAsc: true, label: 'LowestFirst', sortingOn: 'Metrics' },
        { value: 2, sortColumnName: 'MetricCount', isAsc: false, label: 'HighestFirst', sortingOn: 'Metrics' },

    ]
}

export const metricsSortOptionsSecondary = () => {
    return [
        { value: 3, sortColumnName: 'MetricPlanTiming', isAsc: true, label: 'LowestFirst', sortingOn: 'Metrics' },
        { value: 4, sortColumnName: 'MetricPlanTiming', isAsc: false, label: 'HighestFirst', sortingOn: 'Metrics' }
    ]
}

export const milestonesSortOptionsPrimary = () => {
    return [
        { value: 1, sortColumnName: 'MilestoneCount', isAsc: true, label: 'LowestFirst', sortingOn: 'Milestones' },
        { value: 2, sortColumnName: 'MilestoneCount', isAsc: false, label: 'HighestFirst', sortingOn: 'Milestones' },

    ]
}

export const milestonesSortOptionsSecondary = () => {
    return [
        { value: 3, sortColumnName: 'MilestonePlanTiming', isAsc: true, label: 'LowestFirst', sortingOn: 'Milestones' },
        { value: 4, sortColumnName: 'MilestonePlanTiming', isAsc: false, label: 'HighestFirst', sortingOn: 'Milestones' }
    ]
}

export const focusAreaSortOptionsPrimary = () => {
    return [
        { value: 1, sortColumnName: 'FocusArea', isAsc: true, label: 'AtoZ', sortingOn: 'FocusAreas' },
        { value: 2, sortColumnName: 'FocusArea', isAsc: false, label: 'ZtoA', sortingOn: 'FocusAreas' },
        { value: 3, sortColumnName: 'FocusAreaNumber', isAsc: true, label: 'SteeringCommitteeReportOrder', sortingOn: 'FocusAreas' },
    ]
}

export const decisionSortOptionsPrimary = () => {
    return [
        { value: 1, sortColumnName: 'DecisionGo', isAsc: true, label: 'GoIdeasFirst', sortingOn: 'Decision' },
        { value: 2, sortColumnName: 'DecisionNoGo', isAsc: false, label: 'NOGoIdeasFirst', sortingOn: 'Decision' },
    ]
}

export const decisionSortOptionsSecondary = () => {
    return [
        { value: 3, sortColumnName: 'CurrentGroupDecisionStatus', isAsc: true, label: 'LeastCompleteFirst', sortingOn: 'Decision' },
        { value: 4, sortColumnName: 'CurrentGroupDecisionStatus', isAsc: false, label: 'MostCompleteFirst', sortingOn: 'Decision' }
    ]
}

export const detailSortOptionsPrimary = () => {
    return [
        { value: 1, sortColumnName: 'Title', isAsc: true, label: 'AtoZ', sortingOn: 'Details' },
        { value: 2, sortColumnName: 'Title', isAsc: false, label: 'ZtoA', sortingOn: 'Details' },
    ]
}

export const detailSortOptionsSecondary = () => {
    return [
        { value: 3, sortColumnName: 'IdeaNumber', isAsc: true, label: 'LowestFirst', sortingOn: 'Details' },
        { value: 4, sortColumnName: 'IdeaNumber', isAsc: false, label: 'HighestFirst', sortingOn: 'Details' }
    ]
}

export const detailSortOptionsTertiary = () => {
    return [
        { value: 5, sortColumnName: 'ImplementationStatus', isAsc: false, label: 'CompletedFirst', sortingOn: 'Details' },
        { value: 6, sortColumnName: 'ImplementationStatus', isAsc: true, label: 'NotStartedFirst', sortingOn: 'Details' }
    ]
}

export const starredSortOptionsPrimary = () => {
    return [
        { value: 1, sortColumnName: 'IsFavourite', isAsc: true, label: 'NotStarredFirst', sortingOn: 'IsFavourite' },
        { value: 2, sortColumnName: 'IsFavourite', isAsc: false, label: 'StarredFirst', sortingOn: 'IsFavourite' }
    ]
}

export const noteSortOptionsPrimary = () => {
    return [
        { value: 1, sortColumnName: 'Context', isAsc: true, label: 'ContextBased', sortingOn: 'Notes' },
    ]
}

export const noteSortOptionsSecondary = () => {
    return [
        { value: 3, sortColumnName: 'IdeaNumber', isAsc: true, label: 'LowestFirst', sortingOn: 'Notes' },
        { value: 4, sortColumnName: 'IdeaNumber', isAsc: false, label: 'HighestFirst', sortingOn: 'Notes' },
    ]
}

export const noteSortOptionsTertiary = () => {
    return [
        { value: 5, sortColumnName: 'ModifiedOn', isAsc: true, label: 'OldestFirst', sortingOn: 'Notes' },
        { value: 6, sortColumnName: 'ModifiedOn', isAsc: false, label: 'RecentFirst', sortingOn: 'Notes' },
    ]
}


export const emptyIdea = (groupId, ideaId) => {
    return {
        EntityId: ideaId,
        ArchiveRequestNote: null,
        AttachmentCount: null,
        CreatedBy: "00000000-0000-0000-0000-000000000000",
        CreatedOn: "",
        DecisionStatus: null,
        DecisionType: null,
        Description: "",
        Details: null,
        FocusAreaId: null,
        GLRiskRatingType: null,
        GroupId: groupId,
        Groups: [{
            GroupId: groupId,
            LinkedGroupStatus: 3,
            Name: "",
        }],
        HRiskCount: null,
        ITNotes: null,
        ITRoughValue: null,
        ITStatus: null,
        IdeaId: ideaId,
        IdeaLeaderIDs: null,
        IdeaICIDs: null,
        IdeaNumber: null,
        IsArchivePending: null,
        IsAcceptancePending: null,
        IsFavourite: null,
        IsHighlighted: null,
        LRiskCount: null,
        MRiskCount: null,
        ModifiedBy: "",
        ModifiedOn: "",
        NoRiskCount: null,
        OrganizationId: "",
        RecommendationType: null,
        Revision: 0,
        RiskReviewStatus: null,
        RiskStatus: null,
        RoughRiskRatingNote: null,
        RoughRiskRatingType: 0,
        RoughValue: 0,
        SpecialEventsTimeStamp: null,
        Status: 1,
        Title: "",
        Value: null,
        ValueStatus: null,
    }

}

export const getRecurringTypeLabel = (type, isIdeaReadOnly) => {
    var label = isIdeaReadOnly ? '' : i18n.t('Select')
    switch (type) {
        case false:
            label = i18n.t('OneTime');
            break;
        case true:
            label = i18n.t('Recurring');
            break;
        default:
            label = isIdeaReadOnly ? '' : i18n.t('Select');
    }
    return label;
};

export const getRecurringTypeValue = (type) => {
    switch (type) {
        case false:
            return 1;
        case true:
            return 2;
        default:
            return 0;
    }
};

export const getNPERecurringTypeLabel = (type, isWorkingCapital, selectNotNeeded) => {
    var RecurringType = 0;
    if (type === true && isWorkingCapital === true) {
        RecurringType = 3;
    } else if (type === true) {
        RecurringType = 2;
    } else if (type === false) {
        RecurringType = 1;
    }
    var label = selectNotNeeded ? '' : i18n.t('Select');
    switch (RecurringType) {
        case 1:
            label = i18n.t('OneTime');
            break;
        case 2:
            label = i18n.t('Recurring');
            break;
        case 3:
            label = i18n.t('WorkingCapital');
            break;
        default:
            label = selectNotNeeded ? '' : i18n.t('Select');
    }
    return label;
};

export const getNPERecurringTypeValue = (type, isWorkingCapital) => {
    var RecurringType = 0;
    if (type === true && isWorkingCapital === true) {
        RecurringType = 3;
    } else if (type === true) {
        RecurringType = 2;
    } else if (type === false) {
        RecurringType = 1;
    }
    return RecurringType;
};

export const getGroupTypeText = (groupType) => {
    var groupTypeLabel = '';
    switch (groupType) {
        case 1:
            groupTypeLabel = <Translation id={'Revenue'} />;
            break;
        case 2:
            groupTypeLabel = <Translation id={'Cost'} />;
            break;
        case 3:
            groupTypeLabel = <Translation id={'Both'} />;
            break;
        default: break;
    }
    return groupTypeLabel;
};

export const getGroupType = (groupType, isIdeaReadOnly, isRevenue, textOnly) => {
    var groupTypeLabel = isIdeaReadOnly ? '' : i18n.t('Select');
    switch (groupType) {
        case 1:
            groupTypeLabel = isRevenue ? (textOnly ? translateKey('Increase') : <Translation id={'Increase'} />) : (textOnly ? translateKey('Savings') : <Translation id={'Savings'} />);
            break;
        case -1:
            groupTypeLabel = isRevenue ? (textOnly ? translateKey('Decrease') : <Translation id={'Decrease'} />) : (textOnly ? translateKey('Cost') : <Translation id={'Cost'} />);
            break;
        default:
            groupTypeLabel = isIdeaReadOnly ? '' : i18n.t('Select');
    }
    return groupTypeLabel;
};

export const getRevenueGroupType = (groupType) => {
    var groupTypeLabel = i18n.t('Select');
    switch (groupType) {
        case 1:
            groupTypeLabel = i18n.t('Increase');
            break;
        case -1:
            groupTypeLabel = i18n.t('Decrease');
            break;
        default:
            groupTypeLabel = i18n.t('Select');
    }
    return groupTypeLabel;
};


export const decisionOptions = [
    { value: 1, label: <Translation id={'Go'} /> },
    { value: 2, label: <Translation id={'NoGo'} /> },
    // { value: 3, label: <Translation id={'FurtherStudy'} /> }
];

export const decisionOptionsWithEmptyOption = [
    { value: null, label: <span>&nbsp;</span> },
    { value: 1, label: <Translation id={'Go'} /> },
    { value: 2, label: <Translation id={'NoGo'} /> },
    // { value: 3, label: <Translation id={'FurtherStudy'} /> }
];

export const getDecisionName = (decisionType) => {
    var decisionName = i18n.t('Select');
    switch (decisionType) {
        case 1:
            decisionName = i18n.t('Go');
            break;
        case 2:
            decisionName = i18n.t('NoGo');
            break;
        // case 3:
        //     decisionName = i18n.t('FurtherStudy');
        //     break;
        default:
            decisionName = i18n.t('Select');
    }
    return decisionName;
};

export const getRecommendation = (recommendationType) => {
    var recommendationLabel = i18n.t('NotStarted');
    switch (recommendationType) {
        case 1:
            recommendationLabel = i18n.t('Go');
            break;
        case 2:
            recommendationLabel = i18n.t('NoGo');
            break;
        // case 3:
        //     recommendationLabel = i18n.t('FurtherStudy');
        //     break;
        default:
            recommendationLabel = i18n.t('NotStarted');
    }
    return recommendationLabel;
};

export const getRecommendationForReport = (recommendationType) => {
    var recommendationLabel = '';
    switch (recommendationType) {
        case 1:
            recommendationLabel = i18n.t('Go');
            break;
        case 2:
            recommendationLabel = i18n.t('NoGo');
            break;
        // case 3:
        //     recommendationLabel = i18n.t('FurtherStudy');
        //     break;
        default:
            recommendationLabel = '';
    }
    return recommendationLabel;
};

export const getRecommendationForWorkFlow = (recommendationType) => {
    var recommendationLabel = i18n.t('No');
    switch (recommendationType) {
        case 1:
            recommendationLabel = i18n.t('Yes');
            break;
        case 2:
            recommendationLabel = i18n.t('Yes');
            break;
        // case 3:
        //     recommendationLabel = i18n.t('FurtherStudy');
        //     break;
        default:
            recommendationLabel = i18n.t('No');
    }
    return recommendationLabel;
};

export const getRecommendationForWorkFlowText = (recommendationType) => {
    let recommendationLabel = 'No';
    switch (recommendationType) {
        case 1:
            recommendationLabel = 'Yes';
            break;
        case 2:
            recommendationLabel = 'Yes';
            break;
        // case 3:
        //     recommendationLabel = 'FurtherStudy';
        //     break;
        default:
            recommendationLabel = 'No';
    }
    return recommendationLabel;
};

export const calculateRevenueValue = (marginChange, isRecurring, amortizationPeriod, directionType) => {
    directionType = directionType ? directionType : 0;

    switch (isRecurring) {
        case true: return (marginChange * directionType).toFixed(0);
        case false: return (marginChange * directionType / (amortizationPeriod ? amortizationPeriod : 1)).toFixed(0);
        default: return 0;
    }
    // if (isRecurring) {
    //     return (marginChange * directionType).toFixed(0);
    // } else {
    //     return (marginChange * directionType / (amortizationPeriod ? amortizationPeriod : 1)).toFixed(0);
    // }
};

export const calculatePersonnelValue = (averageSalary, personnelCount, directionType) => {
    if (averageSalary === null || personnelCount === null || directionType === null) { return 0; }
    return ((averageSalary ? averageSalary : 0) * (personnelCount ? personnelCount : 0) * (directionType ? directionType : 0)).toFixed(0);
};

export const calculateNonPersonnelValue = (amount, isRecurring, amortizationPeriod, directionType, isWorkingCapital, costOfCapital) => {
    directionType = directionType ? directionType : 0;

    switch (isRecurring) {
        case true: if (isWorkingCapital) {
            return (amount * parseFloat(costOfCapital) * directionType).toFixed(0);
        } else {
            return (amount * directionType).toFixed(0);
        }
        case false: return (amount * directionType / (amortizationPeriod ? amortizationPeriod : 1)).toFixed(0);
        default: return 0;
    }

    // if (isRecurring) {
    //     if (isWorkingCapital) {
    //         return (amount * parseFloat(costOfCapital) * directionType).toFixed(0);
    //     } else {
    //         return (amount * directionType).toFixed(0);
    //     }
    // } else {
    //     return (amount * directionType / (amortizationPeriod ? amortizationPeriod : 1)).toFixed(0);
    // }
};


export const getTimingLabel = (timings, time) => {
    if ((!time) || time === "" || time === " " || time === null) return '';
    var timeWithFormat = moment.utc(time).format('YYYYMM');
    var timing = timings.filter(function (el) { return el.value === timeWithFormat });
    if (timing.length > 0) {
        return timing[0].label;
    } else {
        return '';
    }
};

export const getRoleLabel = (roleType) => {
    var roleLabel = i18n.t('Other');
    switch (roleType) {
        case 1:
            roleLabel = i18n.t('GL');
            break;
        case 2:
            roleLabel = i18n.t('AGL');
            break;
        case 3:
            roleLabel = i18n.t('Ctm');
            break;
        default:
            roleLabel = i18n.t('Other');
    }
    return roleLabel;
};

export const getRiskRatingLabel = (riskRtingType) => {
    var riskRatingLabel = '';
    switch (riskRtingType) {
        case 1:
            riskRatingLabel = i18n.t('Low');
            break;
        case 2:
            riskRatingLabel = i18n.t('Medium');
            break;
        case 3:
            riskRatingLabel = i18n.t('High');
            break;
        default:
            riskRatingLabel = '';
    }
    return riskRatingLabel;
};


export const getRiskRaterRoleLabel = (roleType) => {
    var roleLabel = '--'
    switch (roleType) {
        case 1:
            roleLabel = i18n.t('GroupLeader');
            break;
        case 2:
            roleLabel = i18n.t('AGL');
            break;
        case 3:
            roleLabel = i18n.t('Ctm');
            break;
        default:
            roleLabel = 'Other';
    }
    return roleLabel;
};

export const getRampMonthText = (months) => {
    return <Translation id={'MonthRamp'} params={{ count: months }} />;
};

export const qualityCheckListItems = () => {
    return {
        PositionsWithoutFunctionalTitles: {
            isExcluded: false, label: 'PositionsWithoutFunctionalTitles', helperText: 'Positions',
            ideas: [], amount: 0, type: 1, phase: 1
        },
        //Value
        NoRoughValue: {
            isExcluded: false, label: 'NoRoughValue', helperText: 'ActiveIdeas', ideas: [], amount: 0, type: 1, phase: 1,
            filterType: 'Value', value: 'Value_1', orderId: 320, fieldName: 'NoRoughValue', fieldValue: 'null,0', isChecked: false
        },
        NoExpectedImpacts: {
            isExcluded: false, label: 'NoExpectedImpacts', helperText: 'ActiveIdeas', ideas: [], amount: 0, type: 1, phase: 1,
            filterType: 'Value', value: 'Value_10', orderId: 321, fieldName: 'NoExpectedImpacts', fieldValue: true, isChecked: false
        },
        NotReportingDetailedValue: {
            isExcluded: false, label: 'NotReportingDetailedValue', helperText: 'ActiveIdeas', ideas: [], amount: 0, type: 1, phase: 2,
            filterType: 'Value', value: 'Value_2', orderId: 322, fieldName: 'NotReportingDetailedValue', fieldValue: 'null, 0, 1', isChecked: false
        },
        DetailedValueNotComplete: {
            isExcluded: false, label: 'DetailedValueNotComplete', helperText: 'ActiveIdeas', ideas: [], amount: 0, type: 1, phase: 3,
            filterType: 'Value', value: 'Value_3', orderId: 323, fieldName: 'DetailedValueNotComplete', fieldValue: '2', isChecked: false
        },
        RequiredFinanceValidationMissing: {
            isExcluded: false, label: 'RequiredFinanceValidationMissing', helperText: 'ActiveIdeas', ideas: [], amount: 0, type: 2, phase: 3,
            filterType: 'Value', value: 'Value_4', orderId: 324, fieldName: 'RequiredFinanceValidationMissing', fieldValue: 4, isChecked: false
        },
        IdeasWithITCosts: {
            isExcluded: false, label: 'IdeasWithITCosts', helperText: 'ActiveIdeas', ideas: [], amount: 0, type: 2, phase: 2,
            filterType: 'Value', value: 'Value_5', orderId: 325, showCount: true, fieldName: 'IdeasWithITCosts', fieldValue: '3', isChecked: false
        },
        Only1LineItem: {
            isExcluded: false, label: 'Only1LineItem', helperText: 'ActiveIdeas', ideas: [], amount: 0, type: 2, phase: 2,
            filterType: 'Value', value: 'Value_6', orderId: 326, fieldName: 'Only1LineItem', fieldValue: '1', isChecked: false
        },
        LargeValueWith2OrFewerLineItems: {
            isExcluded: false, label: 'LargeValueWith2OrFewerLineItems', helperText: 'ActiveIdeas', ideas: [], amount: 0, type: 2, phase: 2,
            filterType: 'Value', value: 'Value_7', orderId: 327, fieldName: 'LargeValueWith2OrFewerLineItems', fieldValue: '1', isChecked: false
        },
        IdeasWithFractionalPositions: {
            isExcluded: false, label: 'IdeasWithFractionalPositions', helperText: 'ActiveIdeas', ideas: [], amount: 0, type: 2, phase: 2,
            filterType: 'Value', value: 'Value_8', orderId: 328, fieldName: 'IdeasWithFractionalPositions', fieldValue: '', isChecked: false
        },
        ExpectedMultiGroupIdeas: {
            isExcluded: false, label: 'ExpectedMultiGroupIdeas', helperText: 'ActiveIdeas', ideas: [], amount: 0, type: 2, phase: 1,
            filterType: 'Value', value: 'Value_9', orderId: 329, fieldName: 'ExpectedMultiGroupIdeas', fieldValue: true, isChecked: false
        },
        CategoriesWithoutAnyImpact: {
            isExcluded: false, label: 'CategoriesWithoutAnyImpact', helperText: '', ideas: [], amount: 0, type: 2, phase: 2,
            filterType: 'Value', value: 'Value_10', orderId: 330, showCount: true, fieldValue: 'CategoriesWithoutAnyImpact', isChecked: false
        },
        FunctionalTitlesWithoutAnyImpact: {
            isExcluded: false, label: 'FunctionalTitlesWithoutAnyImpact', helperText: '', ideas: [], amount: 0, type: 2, phase: 2,
            filterType: 'Value', value: 'Value_11', orderId: 331, showCount: true, fieldValue: 'FunctionalTitlesWithoutAnyImpact', isChecked: false
        },
        RoughValueWithoutRoughTiming: {
            isExcluded: false, label: 'RoughValueWithoutRoughTiming', helperText: 'ActiveIdeas', ideas: [], amount: 0, type: 1, phase: 2,
            filterType: 'Value', value: 'Value_12', orderId: 332, fieldName: 'RoughValueWithoutRoughTiming', fieldValue: 'null, 0, 1', isChecked: false
        },

        IncompleteLineItems: {
            isExcluded: false, label: 'IncompleteLineItems', helperText: 'ActiveIdeas', ideas: [], amount: 0, type: 1, phase: 2,
            filterType: 'Value', value: 'Value_14', orderId: 334, fieldName: 'IncompleteLineItems', fieldValue: 'null, 0, 1', isChecked: false
        },
        //Group
        PendingSubmissionsToOtherGroups: {
            isExcluded: false, label: 'PendingSubmissionsToOtherGroups', helperText: 'ActiveIdeas', ideas: [], amount: 0, type: 1, phase: 2,
            filterType: 'Group', value: 'Group_1', orderId: 21, fieldName: 'PendingSubmissionsToOtherGroups', fieldValue: 1, isChecked: false
        },
        PendingSubmissionsToIT: {
            isExcluded: false, label: 'PendingSubmissionsToIT', helperText: 'ActiveIdeas', ideas: [], amount: 0, type: 1, phase: 2,
            filterType: 'Group', value: 'Group_2', orderId: 22, fieldName: 'PendingSubmissionsToIT', fieldValue: 1, isChecked: false
        },
        ITCostingNotDecided: {
            isExcluded: false, label: 'ITCostingNotDecided', helperText: 'ActiveIdeas', ideas: [], amount: 0, type: 1, phase: 2,
            filterType: 'Group', value: 'Group_3', orderId: 23, fieldName: 'ITCostingNotDecided', fieldValue: null, isChecked: false
        },
        PendingAcceptanceFromOtherGroups: {
            isExcluded: false, label: 'PendingAcceptanceFromOtherGroups', helperText: 'ActiveIdeas', ideas: [], amount: 0, type: 2, phase: 2,
            filterType: 'Group', value: 'Group_4', orderId: 24, fieldName: 'PendingAcceptanceFromOtherGroups', fieldValue: 2, isChecked: false
        },
        PendingITCostEstimates: {
            isExcluded: false, label: 'PendingITCostEstimates', helperText: 'ActiveIdeas', ideas: [], amount: 0, type: 2, phase: 2,
            filterType: 'Group', value: 'Group_5', orderId: 25, fieldName: 'PendingITCostEstimates', fieldValue: 2, isChecked: false
        },
        PendingSharesTransfers: {
            isExcluded: false, label: 'PendingSharesTransfers', helperText: 'ActiveIdeas', ideas: [], amount: 0, type: 1, phase: 1,
            filterType: 'Group', value: 'Group_1', orderId: 26, fieldName: 'PendingSharesTransfers', fieldValue: 1, isChecked: false
        },
        ExpectedMultiGroupIdeaWithNoOtherGroupsAdded: {
            isExcluded: false, label: 'ExpectedMultiGroupIdeaWithNoOtherGroupsAdded', helperText: 'ActiveIdeas', ideas: [], amount: 0, type: 2, phase: 2,
            filterType: 'Group', value: 'Group_4_1', orderId: 27, fieldName: 'ExpectedMultiGroupIdeaWithNoOtherGroupsAdded', fieldValue: 'null, 0, 1', isChecked: false
        },
        //Focus Area
        NoFocusArea: {
            isExcluded: false, label: 'NoFocusArea', helperText: 'ActiveIdeas', ideas: [], amount: 0, type: 1, phase: 1,
            filterType: 'FocusArea', value: 'FocusArea_1', orderId: 50, fieldName: 'NoFocusArea', fieldValue: 'null', isChecked: false
        },
        //Details
        NoIdeaDescription: {
            isExcluded: false, label: 'NoIdeaDescription', helperText: 'ActiveIdeas', ideas: [], amount: 0, type: 1, phase: 1,
            filterType: 'Details', value: 'Details_1', orderId: 121, fieldName: 'NoIdeaDescription', fieldValue: 'null', isChecked: false
        },
        //Decision
        RequiredGLRecommendationMissing: {
            isExcluded: false, label: 'RequiredGLRecommendationMissing', helperText: 'ActiveIdeas', ideas: [], amount: 0, type: 1, phase: 3,
            filterType: 'Decision', value: 'Decision_1', orderId: 411, showCount: true, fieldName: 'RequiredGLRecommendationMissing', fieldValue: 'null,0', isChecked: false
        },
        RequiredSCMReviewMissing: {
            isExcluded: false, label: 'RequiredSCMReviewMissing', helperText: 'ActiveIdeas', ideas: [], amount: 0, type: 1, phase: 3,
            filterType: 'Decision', value: 'Decision_2', orderId: 412, showCount: true, fieldName: 'RequiredSCMReviewMissing', fieldValue: 'null,false', isChecked: false
        },
        RequiredSCDecisionMissing: {
            isExcluded: false, label: 'RequiredSCDecisionMissing', helperText: 'ActiveIdeas', ideas: [], amount: 0, type: 1, phase: 3,
            filterType: 'Decision', value: 'Decision_3', orderId: 413, showCount: true, fieldName: 'RequiredSCDecisionMissing', fieldValue: 0, isChecked: false
        },
        GLsDisagreeOnRecommendation: {
            isExcluded: false, label: 'GLsDisagreeOnRecommendation', helperText: 'ActiveIdeas', ideas: [], amount: 0, type: 2, phase: 3,
            filterType: 'Decision', value: 'Decision_4', orderId: 414, showCount: true, fieldName: 'GLsDisagreeOnRecommendation', fieldValue: 0, isChecked: false
        },
        //Risk
        RiskNotStarted: {
            isExcluded: false, label: 'RiskNotStarted', helperText: 'ActiveIdeas', ideas: [], amount: 0, type: 1, phase: 1,
            filterType: 'Risk', value: 'Risk_2', orderId: 231, fieldName: 'RiskNotStarted', fieldValue: 0, isChecked: false
        },
        NoGLRiskRating: {
            isExcluded: false, label: 'NoGLRiskRating', helperText: 'ActiveIdeas', ideas: [], amount: 0, type: 1, phase: 1,
            filterType: 'Risk', value: 'Risk_1', orderId: 233, fieldName: 'GLRiskRatingType', fieldValue: 'null,0', isChecked: false
        },
        RiskDisagreementCTMGL: {
            isExcluded: false, label: 'RiskDisagreementCTMGL', helperText: 'ActiveIdeas', ideas: [], amount: 0, type: 2, phase: 1,
            filterType: 'Risk', value: 'Risk_7', orderId: 234, fieldName: 'RiskDisagreementCTMGL', fieldValue: 0, isChecked: false
        },

        AllRiskRatersNotIdentified: {
            isExcluded: false, label: 'AllRiskRatersNotIdentified', helperText: 'ActiveIdeas', ideas: [], amount: 0, type: 1, phase: 2,
            filterType: 'Risk', value: 'Risk_4', orderId: 235, fieldName: 'AllRiskRatersNotIdentified', fieldValue: 0, isChecked: false
        },
        RatingsNotEntered: {
            isExcluded: false, label: 'RatingsNotEntered', helperText: 'ActiveIdeas', ideas: [], amount: 0, type: 1, phase: 2,
            filterType: 'Risk', value: 'Risk_8', orderId: 232, fieldName: 'RatingsNotEntered', fieldValue: 0, isChecked: false
        },
        MHRiskRatingsWithoutNotes: {
            isExcluded: false, label: 'MHRiskRatingsWithoutNotes', helperText: 'ActiveIdeas', ideas: [], amount: 0, type: 2, phase: 2,
            filterType: 'Risk', value: 'Risk_3', orderId: 236, fieldName: 'MHRiskRatingsWithoutNotes', fieldValue: '', isChecked: false
        },
        AllRiskRatingsNotComplete: {
            isExcluded: false, label: 'AllRiskRatingsNotComplete', helperText: 'ActiveIdeas', ideas: [], amount: 0, type: 1, phase: 3,
            filterType: 'Risk', value: 'Risk_6', orderId: 237, fieldName: 'AllRiskRatingsNotComplete', fieldValue: 0, isChecked: false
        },
        CTMDisagreementWithGLRisk: {
            isExcluded: false, label: 'CTMDisagreementWithGLRisk', helperText: 'ActiveIdeas', ideas: [], amount: 0, type: 2, phase: 1,
            filterType: 'Risk', value: 'Risk_5', orderId: 238, fieldName: 'CTMDisagreementWithGLRisk', fieldValue: 0, isChecked: false
        },
        RequiredSecondRiskRatings: {
            isExcluded: false, label: 'RequiredSecondRiskRatings', helperText: 'ActiveIdeas', ideas: [], amount: 0, type: 2, phase: 2,
            filterType: 'Risk', value: 'Risk_9', orderId: 239, fieldName: 'RequiredSecondRiskRatings', fieldValue: '', isChecked: false
        },
        PendingMultiGroupAction: {
            isExcluded: false, label: 'PendingMultiGroupAction', helperText: '', ideas: [], amount: 0, type: 1, phase: 3,
            filterType: 'Risk', value: 'Risk_6', orderId: 240, fieldName: 'PendingMultiGroupAction', fieldValue: 0, isChecked: false
        },
    }
};

export const resolveReviewListArray = () => [
    qualityCheckListItems().PositionsWithoutFunctionalTitles,

    //Phase1
    qualityCheckListItems().NoIdeaDescription,
    qualityCheckListItems().NoFocusArea,
    qualityCheckListItems().RiskNotStarted,
    qualityCheckListItems().NoGLRiskRating,
    qualityCheckListItems().NoRoughValue,
    qualityCheckListItems().NoExpectedImpacts,

    qualityCheckListItems().RiskDisagreementCTMGL,
    qualityCheckListItems().ExpectedMultiGroupIdeas,

    qualityCheckListItems().PendingSharesTransfers,

    //Phase2
    qualityCheckListItems().AllRiskRatersNotIdentified,
    qualityCheckListItems().RatingsNotEntered,
    qualityCheckListItems().IncompleteLineItems,
    qualityCheckListItems().NotReportingDetailedValue,
    qualityCheckListItems().RoughValueWithoutRoughTiming,
    qualityCheckListItems().MHRiskRatingsWithoutNotes,
    qualityCheckListItems().RequiredSecondRiskRatings,
    qualityCheckListItems().PendingSubmissionsToOtherGroups,
    qualityCheckListItems().ITCostingNotDecided,
    qualityCheckListItems().PendingSubmissionsToIT,

    qualityCheckListItems().Only1LineItem,
    qualityCheckListItems().LargeValueWith2OrFewerLineItems,
    qualityCheckListItems().IdeasWithFractionalPositions,
    qualityCheckListItems().PendingAcceptanceFromOtherGroups,
    qualityCheckListItems().ExpectedMultiGroupIdeaWithNoOtherGroupsAdded,
    qualityCheckListItems().PendingITCostEstimates,
    qualityCheckListItems().IdeasWithITCosts,
    qualityCheckListItems().CategoriesWithoutAnyImpact,
    qualityCheckListItems().FunctionalTitlesWithoutAnyImpact,

    //Phase3
    qualityCheckListItems().AllRiskRatingsNotComplete,
    qualityCheckListItems().DetailedValueNotComplete,
    qualityCheckListItems().RequiredGLRecommendationMissing,
    qualityCheckListItems().RequiredSCMReviewMissing,
    qualityCheckListItems().RequiredSCDecisionMissing,
    qualityCheckListItems().RequiredFinanceValidationMissing,
    qualityCheckListItems().GLsDisagreeOnRecommendation,
    qualityCheckListItems().PendingMultiGroupAction,
];

export const ideaFilters = [
    //Value
    qualityCheckListItems().NoRoughValue,
    qualityCheckListItems().NoExpectedImpacts,
    qualityCheckListItems().IncompleteLineItems,
    qualityCheckListItems().NotReportingDetailedValue,
    qualityCheckListItems().RoughValueWithoutRoughTiming,
    qualityCheckListItems().DetailedValueNotComplete,
    qualityCheckListItems().RequiredFinanceValidationMissing,
    qualityCheckListItems().IdeasWithITCosts,
    qualityCheckListItems().Only1LineItem,
    qualityCheckListItems().LargeValueWith2OrFewerLineItems,
    qualityCheckListItems().IdeasWithFractionalPositions,
    qualityCheckListItems().ExpectedMultiGroupIdeas,
    qualityCheckListItems().PendingSubmissionsToOtherGroups,
    qualityCheckListItems().PendingSubmissionsToIT,
    qualityCheckListItems().ITCostingNotDecided,
    qualityCheckListItems().PendingAcceptanceFromOtherGroups,
    qualityCheckListItems().ExpectedMultiGroupIdeaWithNoOtherGroupsAdded,
    qualityCheckListItems().PendingITCostEstimates,
    //Focus Area
    qualityCheckListItems().NoFocusArea,
    //Details
    qualityCheckListItems().NoIdeaDescription,
    //Decision
    qualityCheckListItems().RequiredGLRecommendationMissing,
    qualityCheckListItems().RequiredSCMReviewMissing,
    qualityCheckListItems().RequiredSCDecisionMissing,
    qualityCheckListItems().GLsDisagreeOnRecommendation,

    //Risk
    qualityCheckListItems().RiskNotStarted,
    qualityCheckListItems().NoGLRiskRating,
    qualityCheckListItems().AllRiskRatersNotIdentified,
    qualityCheckListItems().RatingsNotEntered,
    qualityCheckListItems().RiskDisagreementCTMGL,
    qualityCheckListItems().MHRiskRatingsWithoutNotes,
    qualityCheckListItems().RequiredSecondRiskRatings,
    //qualityCheckListItems().CTMDisagreementWithGLRisk,
    qualityCheckListItems().AllRiskRatingsNotComplete,


    { isExcluded: false, filterType: 'Starred', value: 'Starred_1', orderId: 0, showCount: true, fieldName: 'IsFavourite', fieldValue: true, isChecked: false, label: 'Starred' },
    { isExcluded: false, filterType: 'Starred', value: 'Starred_2', orderId: 1, showCount: true, fieldName: 'IsFavourite', fieldValue: null || false, isChecked: false, label: 'NotStarred' },

    { isExcluded: false, filterType: 'Highlighted', value: 'Highlighted_1', orderId: 2, showCount: true, fieldName: 'IsHighlighted', fieldValue: true, isChecked: false, label: 'Highlighted' },
    { isExcluded: false, filterType: 'Highlighted', value: 'Highlighted_2', orderId: 3, showCount: true, fieldName: 'IsHighlighted', fieldValue: null || false, isChecked: false, label: 'NotHighlighted' },

    { isExcluded: false, filterType: 'PrimaryGroup', value: 'PrimaryGroup_1', orderId: 10, showCount: true, isChecked: false, fieldName: 'GroupId', fieldValue: '', label: 'Group ', displayLabel: '', isPrimary: true },
    { isExcluded: false, filterType: 'PrimaryGroup', value: 'AllOtherGroups_1', orderId: 15, showCount: true, isChecked: false, fieldName: 'GroupId', fieldValue: 'AllOtherGroups', label: 'Group ', displayLabel: 'AllOtherGroups', isPrimary: true },

    { isExcluded: false, filterType: 'OtherGroups', value: 'OtherGroups_1', orderId: 20, showCount: true, isChecked: false, fieldName: 'GroupId', fieldValue: '', label: 'Group ', displayLabel: '' },
    { isExcluded: false, filterType: 'MyFocusArea', value: 'MyFocusArea_1', orderId: 30, showCount: true, isChecked: false, fieldName: 'FocusAreaId', fieldValue: '', label: 'FocusArea', displayLabel: '' },
    { isExcluded: false, filterType: 'OtherFocusArea', value: 'OtherFocusArea_1', orderId: 40, showCount: true, isChecked: false, fieldName: 'FocusAreaId', fieldValue: '', label: 'FocusAreas ', displayLabel: '' },

    { isExcluded: false, filterType: '#', value: 'IdeaNumber_1', orderId: 60, fieldName: 'IdeaNumber', fieldValue: '', isChecked: false, label: 'SeparateMultipleIDsWithCommas' },
    { isExcluded: false, filterType: 'IdeaStatus', value: 'IdeaStatus_1', orderId: 70, showCount: true, fieldName: 'Status', fieldValue: 1, isChecked: false, label: 'Active' },
    { isExcluded: false, filterType: 'IdeaStatus', value: 'IdeaStatus_2', orderId: 80, showCount: true, fieldName: 'Status', fieldValue: 2, isChecked: false, label: 'Inactive' },
    { isExcluded: false, filterType: 'IdeaLeader', value: 'IdeaLeader', orderId: 90, isChecked: false, fieldName: 'IdeaLeaderIDs', fieldValue: '', label: 'IdeaLeader', displayLabel: '' },
    { isExcluded: false, filterType: 'IC', value: 'IC', orderId: 91, isChecked: false, fieldName: 'IdeaICIDs', fieldValue: '', label: 'IC', displayLabel: '' },
    { isExcluded: false, filterType: 'LastEditedBy', value: 'LastEditedBy_1', orderId: 100, isChecked: false, fieldName: 'ModifiedBy', fieldValue: '', label: 'LastEditedBy', displayLabel: '' },
    { isExcluded: false, filterType: 'DateLastEditedMin', value: 'DateLastEditedMin', orderId: 110, fieldName: 'ModifiedOn', fieldValue: '', isChecked: false, label: 'LastEditedOn' },
    { isExcluded: false, filterType: 'DateLastEditedMax', value: 'DateLastEditedMax', orderId: 120, fieldName: 'ModifiedOn', fieldValue: '', isChecked: false, label: 'LastEditedOn' },

    { isExcluded: false, filterType: 'RiskRating', value: 'RiskRating_0', orderId: 130, showCount: true, fieldName: 'Risk', fieldValue: null || 0, isChecked: false, label: 'None' },
    { isExcluded: false, filterType: 'RiskRating', value: 'RiskRating_1', orderId: 140, showCount: true, fieldName: 'Risk', fieldValue: 1, isChecked: false, label: 'Low' },
    { isExcluded: false, filterType: 'RiskRating', value: 'RiskRating_2', orderId: 150, showCount: true, fieldName: 'Risk', fieldValue: 2, isChecked: false, label: 'Medium' },
    { isExcluded: false, filterType: 'RiskRating', value: 'RiskRating_3', orderId: 160, showCount: true, fieldName: 'Risk', fieldValue: 3, isChecked: false, label: 'High' },

    { isExcluded: false, filterType: 'GLRiskRating', value: 'GLRiskRating_0', orderId: 165, showCount: true, fieldName: 'GLRiskRating', fieldValue: null || 0, isChecked: false, label: 'None' },
    { isExcluded: false, filterType: 'GLRiskRating', value: 'GLRiskRating_1', orderId: 166, showCount: true, fieldName: 'GLRiskRating', fieldValue: 1, isChecked: false, label: 'Low' },
    { isExcluded: false, filterType: 'GLRiskRating', value: 'GLRiskRating_2', orderId: 167, showCount: true, fieldName: 'GLRiskRating', fieldValue: 2, isChecked: false, label: 'Medium' },
    { isExcluded: false, filterType: 'GLRiskRating', value: 'GLRiskRating_3', orderId: 168, showCount: true, fieldName: 'GLRiskRating', fieldValue: 3, isChecked: false, label: 'High' },

    { isExcluded: false, filterType: 'RiskStatus', value: 'RiskStatus_0', orderId: 180, showCount: true, fieldName: 'RiskStatus', fieldValue: 0, isChecked: false, label: 'NotStarted' },
    { isExcluded: false, filterType: 'RiskStatus', value: 'RiskStatus_1', orderId: 190, showCount: true, fieldName: 'RiskStatus', fieldValue: 1, isChecked: false, label: 'RiskRoughStage' },
    { isExcluded: false, filterType: 'RiskStatus', value: 'RiskStatus_2', orderId: 200, showCount: true, fieldName: 'RiskStatus', fieldValue: 2, isChecked: false, label: 'RiskGLStage' },
    { isExcluded: false, filterType: 'RiskStatus', value: 'RiskStatus_3', orderId: 210, showCount: true, fieldName: 'RiskStatus', fieldValue: 3, isChecked: false, label: 'RiskAllRatersStage' },
    { isExcluded: false, filterType: 'RiskStatus', value: 'RiskStatus_4', orderId: 220, showCount: true, fieldName: 'RiskStatus', fieldValue: 4, isChecked: false, label: 'RiskCompleteStage' },

    { isExcluded: false, filterType: 'MinValue', value: 'MinValue_1', orderId: 240, fieldName: 'CurrentGroupValue', fieldValue: '', isChecked: false, label: 'MinValue', displayLabel: '' },
    { isExcluded: false, filterType: 'MaxValue', value: 'MaxValue_2', orderId: 250, fieldName: 'CurrentGroupValue', fieldValue: '', isChecked: false, label: 'MaxValue', displayLabel: '' },

    { isExcluded: false, filterType: 'ValueStatus', value: 'ValueStatus_0', orderId: 270, showCount: true, fieldName: 'ValueStatus', fieldValue: 0, isChecked: false, label: 'NotStarted' },
    { isExcluded: false, filterType: 'ValueStatus', value: 'ValueStatus_1', orderId: 280, showCount: true, fieldName: 'ValueStatus', fieldValue: 1, isChecked: false, label: 'ValueRoughStage' },
    { isExcluded: false, filterType: 'ValueStatus', value: 'ValueStatus_2', orderId: 290, showCount: true, fieldName: 'ValueStatus', fieldValue: 2, isChecked: false, label: 'ValueDetailedStage' },
    { isExcluded: false, filterType: 'ValueStatus', value: 'ValueStatus_3', orderId: 300, showCount: true, fieldName: 'ValueStatus', fieldValue: 3, isChecked: false, label: 'ValueCompleteStage' },
    { isExcluded: false, filterType: 'ValueStatus', value: 'ValueStatus_4', orderId: 310, showCount: true, fieldName: 'ValueStatus', fieldValue: 4, isChecked: false, label: 'ValueValidatedStage' },

    { isExcluded: false, filterType: 'GLRecommendation', value: 'GLRecommendation_0', orderId: 330, showCount: true, fieldName: 'GLRecommendation', fieldValue: 0, isChecked: false, label: 'NotEntered' },
    { isExcluded: false, filterType: 'GLRecommendation', value: 'GLRecommendation_1', orderId: 340, showCount: true, fieldName: 'GLRecommendation', fieldValue: 1, isChecked: false, label: 'Go' },
    { isExcluded: false, filterType: 'GLRecommendation', value: 'GLRecommendation_2', orderId: 350, showCount: true, fieldName: 'GLRecommendation', fieldValue: 2, isChecked: false, label: 'NoGo' },

    { isExcluded: false, filterType: 'SCMReview', value: 'SCMReview_0', orderId: 360, showCount: true, isChecked: false, fieldName: 'SCMReview', fieldValue: false, label: 'Incomplete' },
    { isExcluded: false, filterType: 'SCMReview', value: 'SCMReview_1', orderId: 370, showCount: true, isChecked: false, fieldName: 'SCMReview', fieldValue: true, label: 'Complete' },

    { isExcluded: false, filterType: 'SCDecision', value: 'SCDecision_0', orderId: 380, showCount: true, isChecked: false, fieldName: 'DecisionType', fieldValue: 0, label: 'NotEntered' },
    { isExcluded: false, filterType: 'SCDecision', value: 'SCDecision_1', orderId: 390, showCount: true, isChecked: false, fieldName: 'DecisionType', fieldValue: 1, label: 'Go' },
    { isExcluded: false, filterType: 'SCDecision', value: 'SCDecision_2', orderId: 400, showCount: true, isChecked: false, fieldName: 'DecisionType', fieldValue: 2, label: 'NoGo' },

    { isExcluded: false, filterType: 'Category', value: 'NPECategory', orderId: 431, showCount: true, isChecked: false, fieldName: 'NPECategory', fieldValue: '', label: 'Category', displayLabel: '' },
    { isExcluded: false, filterType: 'Category', value: 'RevenueCategory', orderId: 432, showCount: true, isChecked: false, fieldName: 'RevenueCategory', fieldValue: '', label: 'Category', displayLabel: '' },
    { isExcluded: false, filterType: 'FunctionalTitle', value: 'FunctionalTitle', orderId: 433, showCount: true, isChecked: false, fieldName: 'FunctionalTitle', fieldValue: '', label: 'FunctionalTitle', displayLabel: '' },



    { isExcluded: false, filterType: 'ImplementationIdeaMinValue', value: 'ImplementationIdeaMinValue_1', orderId: 446, fieldName: 'Target', fieldValue: '', isChecked: false, label: 'MinValue', displayLabel: '' },
    { isExcluded: false, filterType: 'ImplementationIdeaMaxValue', value: 'ImplementationIdeaMaxValue_2', orderId: 447, fieldName: 'Target', fieldValue: '', isChecked: false, label: 'MaxValue', displayLabel: '' },

    { isExcluded: false, filterType: 'ImplementationStatusOverride', value: 'ImplementationStatusOverride_1', orderId: 452, showCount: true, fieldName: 'Status', fieldValue: 110, isChecked: false, label: 'NotStarted' },
    { isExcluded: false, filterType: 'ImplementationStatusOverride', value: 'ImplementationStatusOverride_2', orderId: 453, showCount: true, fieldName: 'Status', fieldValue: 205, isChecked: false, label: 'Exceed' },
    { isExcluded: false, filterType: 'ImplementationStatusOverride', value: 'ImplementationStatusOverride_3', orderId: 454, showCount: true, fieldName: 'Status', fieldValue: 210, isChecked: false, label: 'OnTrack' },
    { isExcluded: false, filterType: 'ImplementationStatusOverride', value: 'ImplementationStatusOverride_4', orderId: 455, showCount: true, fieldName: 'Status', fieldValue: 220, isChecked: false, label: 'AtRisk' },
    { isExcluded: false, filterType: 'ImplementationStatusOverride', value: 'ImplementationStatusOverride_5', orderId: 456, showCount: true, fieldName: 'Status', fieldValue: 230, isChecked: false, label: 'OffTrack' },
    { isExcluded: false, filterType: 'ImplementationStatusOverride', value: 'ImplementationStatusOverride_6', orderId: 457, showCount: true, fieldName: 'Status', fieldValue: 910, isChecked: false, label: 'Completed' },


    { isExcluded: false, filterType: 'ImplementationStatus', value: 'ImplementationStatus_1', orderId: 453, showCount: true, fieldName: 'Status', fieldValue: 110, isChecked: false, label: 'NotStarted' },
    { isExcluded: false, filterType: 'ImplementationStatus', value: 'ImplementationStatus_2', orderId: 454, showCount: true, fieldName: 'Status', fieldValue: 205, isChecked: false, label: 'Exceed' },
    { isExcluded: false, filterType: 'ImplementationStatus', value: 'ImplementationStatus_3', orderId: 455, showCount: true, fieldName: 'Status', fieldValue: 210, isChecked: false, label: 'OnTrack' },
    { isExcluded: false, filterType: 'ImplementationStatus', value: 'ImplementationStatus_4', orderId: 456, showCount: true, fieldName: 'Status', fieldValue: 220, isChecked: false, label: 'AtRisk' },
    { isExcluded: false, filterType: 'ImplementationStatus', value: 'ImplementationStatus_5', orderId: 457, showCount: true, fieldName: 'Status', fieldValue: 230, isChecked: false, label: 'OffTrack' },
    { isExcluded: false, filterType: 'ImplementationStatus', value: 'ImplementationStatus_6', orderId: 458, showCount: true, fieldName: 'Status', fieldValue: 910, isChecked: false, label: 'Completed' },


    { isExcluded: false, filterType: 'ResponsibleParty', value: 'ResponsibleParty', orderId: 459, isChecked: false, fieldName: 'ResponsibleParty', fieldValue: '', label: 'ResponsibleParty', displayLabel: '' },

    { isExcluded: false, filterType: 'ImplementationTiming', value: 'ImplementationTiming_1', orderId: 460, showCount: true, isChecked: false, fieldName: 'PlanTiming', fieldValue: '', label: 'Timing', displayLabel: '' },


    { isExcluded: false, filterType: 'PlanLocked', value: 'PlanLocked_1', orderId: 461, showCount: true, fieldName: 'PlanLockedException', fieldValue: null, isChecked: false, label: 'GroupDefault' },
    { isExcluded: false, filterType: 'PlanLocked', value: 'PlanLocked_2', orderId: 462, showCount: true, fieldName: 'PlanLockedException', fieldValue: true, isChecked: false, label: 'Yes' },
    { isExcluded: false, filterType: 'PlanLocked', value: 'PlanLocked_3', orderId: 463, showCount: true, fieldName: 'PlanLockedException', fieldValue: false, isChecked: false, label: 'No' },

    { isExcluded: false, filterType: 'ProjectProperties', value: 'ProjectProperties', searchText: '', orderId: 464, isChecked: false, fieldName: 'ProjectProperties', fieldValue: '', label: 'ProjectProperties', displayLabel: '' },
    { isExcluded: false, filterType: 'GroupProperties', value: 'GroupProperties', searchText: '', orderId: 465, isChecked: false, fieldName: 'GroupProperties', fieldValue: '', label: 'GroupProperties', displayLabel: '' },

    { isExcluded: false, filterType: 'TimingMilestone', value: 'Timing_1', searchText: '', orderId: 466, showCount: false, isChecked: false, fieldName: 'PlanTiming', fieldValue: '', label: 'Timing', displayLabel: '', isMilestone: true },
    { isExcluded: false, filterType: 'ResponsiblePartyMilestone', value: 'ResponsiblePartyMilestone', orderId: 467, showCount: false, isChecked: false, fieldName: 'ResponsiblePartyMilestone', fieldValue: '', label: 'ResponsiblePartyMilestone', displayLabel: '', isMilestone: true },
    { isExcluded: false, filterType: 'ImplementationStatusMilestone', value: 'ImplementationStatus_7', orderId: 468, showCount: false, fieldName: 'ImplementationStatusMilestone', fieldValue: 110, isChecked: false, label: 'NotStarted', isMilestone: true },
    { isExcluded: false, filterType: 'ImplementationStatusMilestone', value: 'ImplementationStatus_8', orderId: 469, showCount: false, fieldName: 'ImplementationStatusMilestone', fieldValue: 205, isChecked: false, label: 'Exceed', isMilestone: true },
    { isExcluded: false, filterType: 'ImplementationStatusMilestone', value: 'ImplementationStatus_9', orderId: 470, showCount: false, fieldName: 'ImplementationStatusMilestone', fieldValue: 210, isChecked: false, label: 'OnTrack', isMilestone: true },
    { isExcluded: false, filterType: 'ImplementationStatusMilestone', value: 'ImplementationStatus_10', orderId: 471, showCount: false, fieldName: 'ImplementationStatusMilestone', fieldValue: 220, isChecked: false, label: 'AtRisk', isMilestone: true },
    { isExcluded: false, filterType: 'ImplementationStatusMilestone', value: 'ImplementationStatus_11', orderId: 472, showCount: false, fieldName: 'ImplementationStatusMilestone', fieldValue: 230, isChecked: false, label: 'OffTrack', isMilestone: true },
    { isExcluded: false, filterType: 'ImplementationStatusMilestone', value: 'ImplementationStatus_12', orderId: 473, showCount: false, fieldName: 'ImplementationStatusMilestone', fieldValue: 910, isChecked: false, label: 'Completed', isMilestone: true },

    { isExcluded: false, filterType: 'TimingMetric', value: 'Timing_2', searchText: '', orderId: 474, showCount: false, isChecked: false, fieldName: 'PlanTiming', fieldValue: '', label: 'Timing', displayLabel: '', isMetric: true },
    { isExcluded: false, filterType: 'ResponsiblePartyMetric', value: 'ResponsiblePartyMetric', orderId: 475, showCount: false, isChecked: false, fieldName: 'ResponsiblePartyMetric', fieldValue: '', label: 'ResponsiblePartyMetric', displayLabel: '', isMetric: true },
    { isExcluded: false, filterType: 'ImplementationStatusMetric', value: 'ImplementationStatus_13', orderId: 476, showCount: false, fieldName: 'ImplementationStatusMetric', fieldValue: 110, isChecked: false, label: 'NotStarted', isMetric: true },
    { isExcluded: false, filterType: 'ImplementationStatusMetric', value: 'ImplementationStatus_14', orderId: 477, showCount: false, fieldName: 'ImplementationStatusMetric', fieldValue: 205, isChecked: false, label: 'Exceed', isMetric: true },
    { isExcluded: false, filterType: 'ImplementationStatusMetric', value: 'ImplementationStatus_15', orderId: 478, showCount: false, fieldName: 'ImplementationStatusMetric', fieldValue: 210, isChecked: false, label: 'OnTrack', isMetric: true },
    { isExcluded: false, filterType: 'ImplementationStatusMetric', value: 'ImplementationStatus_16', orderId: 480, showCount: false, fieldName: 'ImplementationStatusMetric', fieldValue: 230, isChecked: false, label: 'OffTrack', isMetric: true },

    { isExcluded: false, filterType: 'LineType', value: 'LineType_1', orderId: 481, showCount: false, isChecked: false, fieldName: 'LineType', fieldValue: '', label: 'LineType', displayLabel: '', isLineItem: true },
    { isExcluded: false, filterType: 'FunctionalTitleLineItem', value: 'FTE_1', orderId: 482, showCount: false, isChecked: false, fieldName: 'FunctionalTitleId', fieldValue: '', label: 'FunctionalTitle', displayLabel: '', isLineItem: true },
    { isExcluded: false, filterType: 'CompRange', value: 'CompRange_1', orderId: 483, showCount: false, isChecked: false, fieldName: 'SalaryRange', fieldValue: '', label: 'CompRange', displayLabel: '', isLineItem: true },
    { isExcluded: false, filterType: 'LineItemCategory', value: 'LineItemCategory_1', orderId: 484, showCount: false, isChecked: false, fieldName: 'Category', fieldValue: '', label: 'Category', displayLabel: '', isLineItem: true },
    { isExcluded: false, filterType: 'Direction', value: 'Direction_1', orderId: 485, showCount: false, fieldName: 'DirectionType', fieldValue: 1, isChecked: false, label: 'Savings', isLineItem: true },
    { isExcluded: false, filterType: 'Direction', value: 'Direction_2', orderId: 486, showCount: false, fieldName: 'DirectionType', fieldValue: -1, isChecked: false, label: 'Cost', isLineItem: true },
    { isExcluded: false, filterType: 'TimingLineItem', value: 'TimingLineItem_1', searchText: '', orderId: 487, isChecked: false, fieldName: 'Timing', fieldValue: '', label: 'TimingLineItem', displayLabel: '', isLineItem: true },
    { isExcluded: false, filterType: 'FractionalPositions', value: 'LineItemAmount', orderId: 444, showCount: false, fieldName: 'FractionalPositions', fieldValue: 1, isChecked: false, label: 'Target', isLineItem: true },
    { isExcluded: false, filterType: 'FractionalPositions', value: 'LineItemPlanAmount', orderId: 445, showCount: false, fieldName: 'FractionalPositions', fieldValue: 2, isChecked: false, label: 'Plan', isLineItem: true },
    { isExcluded: false, filterType: 'IdeasWithVariance', value: 'IdeasWithVariance', orderId: 446, showCount: false, isChecked: false, fieldName: '', fieldValue: '', label: 'IdeasWithVariance', displayLabel: '', isImplementation: true },
    { isExcluded: false, filterType: 'FractionalPositionsTS', value: 'FTE', orderId: 447, showCount: false, fieldName: 'FractionalPositionsTS', fieldValue: 1, isChecked: false, label: 'Included', isLineItem: true },

    // { filterType: 'Value', value: 'Value_1', orderId: 000', showCount: true, fieldName: 'RoughValue', fieldValue: 0, isChecked: false, label: 'MissingRoughValue' },
    // { filterType: 'Value', value: 'Value_2', orderId: 001', showCount: true, fieldName: 'ValueStatus', fieldValue: 'null, 0, 1', isChecked: false, label: 'IncompleteDetailedValuation' },
    // { filterType: 'Value', value: 'Value_3', orderId: 002', showCount: true, fieldName: 'ValueStatus', fieldValue: 3, isChecked: false, label: 'IncompleteFinanceValidation' },
    // { filterType: 'Value', value: 'Value_4', orderId: 003', showCount: true, fieldName: 'ITStatus', fieldValue: null, isChecked: false, label: 'ITCostingNotDecided' },
    // { filterType: 'Value', value: 'Value_5', orderId: 004', showCount: true, fieldName: 'ITStatus', fieldValue: '1,2', isChecked: false, label: 'IncompleteITCosting' },

    // { filterType: 'Risk', value: 'Risk_1', orderId: 005', showCount: true, fieldName: 'RoughRiskRatingType', fieldValue: 0, isChecked: false, label: 'MissingRoughRiskRating' },
    // { filterType: 'Risk', value: 'Risk_2', orderId: 006', showCount: true, fieldName: 'ValueStatus', fieldValue: 0, isChecked: false, label: 'MissingAdditionalRiskRaters' },
    // { filterType: 'Risk', value: 'Risk_3', orderId: 007', showCount: true, fieldName: 'RiskStatus', fieldValue: 'null,0,1,2,3', isChecked: false, label: 'IncompleteRiskRating' },
    //{ filterType: 'Risk', value: 'Risk_4', orderId: 008', showCount: true, isChecked: false, label: 'IncompleteRiskValidation' },

    // { filterType: 'Decision', value: 'Decision_1', orderId: 009', showCount: true, fieldName: 'GLRecommendation', fieldValue: 0, isChecked: false, label: 'IncompleteGLRecommendation' },
    // { filterType: 'Decision', value: 'Decision_2', orderId: 010', showCount: true, fieldName: 'SCMReview', fieldValue: 0, isChecked: false, label: 'IncompleteSCMReview' },
    // { filterType: 'Decision', value: 'Decision_3', orderId: 011', showCount: true, fieldName: 'DecisionType', fieldValue: 0, isChecked: false, label: 'IncompleteSCMDecision' },



    // { filterType: 'IdeaStatus', value: 'IdeaStatus_3', orderId: 015', fieldName: 'IsArchivePending', fieldValue: true, isChecked: false, label: 'ArchivePending' },







];


export const sessionIdeaFilters = [
    { isExcluded: false, filterType: '#', value: 'IdeaNumber_1', orderId: 1000, fieldName: 'IdeaNumber', fieldValue: '', isChecked: false, label: 'SeparateMultipleIDsWithCommas' },
    { isExcluded: false, filterType: 'MovedToIdeasList', value: 'MovedToIdeasList_1', orderId: 1001, showCount: true, fieldName: 'MovedToIdeasList', fieldValue: 2, isChecked: false, label: 'Yes' },
    { isExcluded: false, filterType: 'MovedToIdeasList', value: 'MovedToIdeasList_2', orderId: 1002, showCount: true, fieldName: 'MovedToIdeasList', fieldValue: 1, isChecked: false, label: 'No' },
    { isExcluded: false, filterType: 'RoughRiskRating', value: 'RiskRating_0', orderId: 1006, showCount: true, fieldName: 'Risk', fieldValue: null || 0, isChecked: false, label: 'None' },
    { isExcluded: false, filterType: 'RoughRiskRating', value: 'RiskRating_1', orderId: 1007, showCount: true, fieldName: 'Risk', fieldValue: 1, isChecked: false, label: 'Low' },
    { isExcluded: false, filterType: 'RoughRiskRating', value: 'RiskRating_2', orderId: 1008, showCount: true, fieldName: 'Risk', fieldValue: 2, isChecked: false, label: 'Medium' },
    { isExcluded: false, filterType: 'RoughRiskRating', value: 'RiskRating_3', orderId: 1009, showCount: true, fieldName: 'Risk', fieldValue: 3, isChecked: false, label: 'High' },
    { isExcluded: false, filterType: 'MinRoughValue', value: 'MinValue_1', orderId: 1010, fieldName: 'CurrentGroupValue', fieldValue: '', isChecked: false, label: 'MinRoughValue', displayLabel: '' },
    { isExcluded: false, filterType: 'MaxRoughValue', value: 'MaxValue_2', orderId: 1011, fieldName: 'CurrentGroupValue', fieldValue: '', isChecked: false, label: 'MaxRoughValue', displayLabel: '' },
];

export const nonPersonnelValueTooltip = (amount, isRecurring, amortizationPeriod, directionType, isWorkingCapital, costOfCapital, defaultAmortizationPeriod) => {
    amount = formatAmount(amount * directionType, true);
    switch (isRecurring) {
        case true: if (isWorkingCapital) {
            if (costOfCapital > 0) {
                return amount + ' * ' + costOfCapital;
            } else {
                return amount + ' / ' + defaultAmortizationPeriod;
            }
        } else {
            return amount;
        }
        case false: return amount + ' / ' + defaultAmortizationPeriod;//amortizationPeriod;
        default: return '';
    }
};

export const revenueValueTooltip = (marginChange, isRecurring, amortizationPeriod, directionType) => {
    marginChange = formatAmount(marginChange * directionType, true);
    switch (isRecurring) {
        case true:
            return marginChange;
        case false: return marginChange + ' / ' + amortizationPeriod;
        default: return '';
    }
};

export const personnelValueTooltip = (averageSalary, personnelCount, directionType) => {
    averageSalary = formatAmount(averageSalary * directionType, true);

    return averageSalary + ' * ' + personnelCount;
};

export const phaseOptions = () => {
    return [
        { value: 1, label: i18n.t('SCR') + ' 1' },
        { value: 2, label: i18n.t('SCR') + ' 2' },
        { value: 3, label: i18n.t('SCR') + ' 3' }
    ];
}

export const scrReportOptions = () => {
    const items = [
        { value: 1, label: i18n.t('SteeringCommitteeReview1') },
        { value: 2, label: i18n.t('SteeringCommitteeReview2') },
        { value: 3, label: i18n.t('SteeringCommitteeReview3') },
    ];

    return items;
}

export const emptySCRReportData = (scrType, groupId) => {
    return {
        CTMApprovalBy: null,
        CTMApprovalByName: '',
        CTMApprovalOn: '',
        FileName: null,
        GroupId: groupId,
        GroupName: '',
        LockedBy: null,
        LockedByName: null,
        LockedOn: null,
        PPApprovalBy: null,
        PPApprovalByName: null,
        PPApprovalOn: null,
        SCRNumber: scrType,
        SCRReportId: uuid.v4(),
        UploadedBy: null,
        UploadedByName: '',
        UploadedOn: null,
    }
}

export const defaultFieldsPermission = () => {
    return {
        CurrentSCDecision: { status: false, message: '' },
        Title: { status: false, message: '' },
        Description: { status: false, message: '' },
        Scratchpad: { status: false, message: '' },
        CurrentState: { status: false, message: '' },
        RecommendedApproach: { status: false, message: '' },
        ValuationSummary: { status: false, message: '' },
        RiskSummary: { status: false, message: '' },
        MetricsAndMilestones: { status: false, message: '' },
        IdeaLeaders: { status: false, message: '' },
        FocusArea: { status: false, message: '' },
        IdeaLeader: { status: false, message: '' },
        RoughRisk: { status: false, message: '' },
        RoughRiskNote: { status: false, message: '' },
        GLRating: { status: false, message: '' },
        GLRatingNote: { status: false, message: '' },
        GroupRoughValue: { status: false, message: '' },
        ValidationRequired: { status: false, message: '' },
        FinanceValidated: { status: false, message: '' },
        PrimaryGLRecommendation: { status: false, message: '' },
        GLRecommendationNote: { status: false, message: '' },
        SCMReviewNote: { status: false, message: '' },
        SCDecision: { status: false, message: '' },
    };
}

export const valueTooltipArray = [
    { text: 'NotStarted', stage: 0 },
    { text: 'ValueRoughStage', stage: 1 },
    { text: 'ValueDetailedStage', stage: 2 },
    { text: 'ValueCompleteStage', stage: 3 },
    { text: 'ValueValidatedStage', stage: 4 }
];


export const riskTooltipArray = [
    { text: 'NotStarted', stage: 0 },
    { text: 'RiskRoughStage', stage: 1 },
    { text: 'RiskGLStage', stage: 2 },
    { text: 'RiskAllRatersStage', stage: 3 },
    { text: 'RiskCompleteStage', stage: 4 },
];



export const decisionTooltipArray = [
    { text: 'NotStarted', stage: 0 },
    { text: 'DecisionGLRecStage', stage: 1 },
    { text: 'DecisionSCReviewStage', stage: 2 },
    { text: 'DecisionSCDecisionStage', stage: 3 },
];


export const getDashboardFilterFocusArea = (name, secondaryFilter, entityId, entityName) => {
    let dashboardFilterArray = [];
    let activeIdeaFilter;
    let ideaFilter1;
    let ideaFilter2;
    switch (name) {
        case 'LowRisk':
            activeIdeaFilter = ideaFilters.filter(function (el) { return el.value === 'IdeaStatus_1' });
            ideaFilter1 = ideaFilters.filter(function (el) { return el.value === 'RiskRating_1' });
            if (secondaryFilter) {
                ideaFilter2 = ideaFilters.filter(function (el) { return el.value === secondaryFilter });
            }
            if (ideaFilter2) {
                dashboardFilterArray = [
                    { filterItem: activeIdeaFilter[0], entityName: activeIdeaFilter[0].label, entityId: null },
                    { filterItem: ideaFilter1[0], entityName: ideaFilter1[0].label, entityId: null },
                    { filterItem: ideaFilter2[0], entityName: entityName, entityId: entityId }
                ];
            } else {
                dashboardFilterArray = [
                    { filterItem: activeIdeaFilter[0], entityName: activeIdeaFilter[0].label, entityId: null },
                    { filterItem: ideaFilter1[0], entityName: ideaFilter1[0].label, entityId: null }
                ];
            }
            break;
        case 'MediumRisk':
            activeIdeaFilter = ideaFilters.filter(function (el) { return el.value === 'IdeaStatus_1' });
            ideaFilter1 = ideaFilters.filter(function (el) { return el.value === 'RiskRating_2' });
            if (secondaryFilter) {
                ideaFilter2 = ideaFilters.filter(function (el) { return el.value === secondaryFilter });
            }
            if (ideaFilter2) {
                dashboardFilterArray = [
                    { filterItem: activeIdeaFilter[0], entityName: activeIdeaFilter[0].label, entityId: null },
                    { filterItem: ideaFilter1[0], entityName: ideaFilter1[0].label, entityId: null },
                    { filterItem: ideaFilter2[0], entityName: entityName, entityId: entityId }
                ];
            } else {
                dashboardFilterArray = [
                    { filterItem: activeIdeaFilter[0], entityName: activeIdeaFilter[0].label, entityId: null },
                    { filterItem: ideaFilter1[0], entityName: ideaFilter1[0].label, entityId: null }
                ];
            }
            break;
        case 'SubtotalRisk':
            activeIdeaFilter = ideaFilters.filter(function (el) { return el.value === 'IdeaStatus_1' })
            ideaFilter1 = ideaFilters.filter(function (el) { return el.value === 'RiskRating_1' })
            ideaFilter2 = ideaFilters.filter(function (el) { return el.value === 'RiskRating_2' })
            let ideaFilter3;
            if (secondaryFilter) {
                ideaFilter3 = ideaFilters.filter(function (el) { return el.value === secondaryFilter });
            }
            if (ideaFilter3) {
                dashboardFilterArray = [
                    { filterItem: activeIdeaFilter[0], entityName: activeIdeaFilter[0].label, entityId: null },
                    { filterItem: ideaFilter1[0], entityName: ideaFilter1[0].label, entityId: null },
                    { filterItem: ideaFilter2[0], entityName: ideaFilter2[0].label, entityId: null },
                    { filterItem: ideaFilter3[0], entityName: entityName, entityId: entityId }
                ];
            } else {
                dashboardFilterArray = [
                    { filterItem: activeIdeaFilter[0], entityName: activeIdeaFilter[0].label, entityId: null },
                    { filterItem: ideaFilter1[0], entityName: ideaFilter1[0].label, entityId: null },
                    { filterItem: ideaFilter2[0], entityName: ideaFilter2[0].label, entityId: null },
                ];
            }
            break;
        case 'UnratedRisk':
            activeIdeaFilter = ideaFilters.filter(function (el) { return el.value === 'IdeaStatus_1' })
            ideaFilter1 = ideaFilters.filter(function (el) { return el.value === 'RiskRating_0' });
            if (secondaryFilter) {
                ideaFilter2 = ideaFilters.filter(function (el) { return el.value === secondaryFilter });
            }
            if (ideaFilter2) {
                dashboardFilterArray = [
                    { filterItem: activeIdeaFilter[0], entityName: activeIdeaFilter[0].label, entityId: null },
                    { filterItem: ideaFilter1[0], entityName: ideaFilter1[0].label, entityId: null },
                    { filterItem: ideaFilter2[0], entityName: entityName, entityId: entityId }
                ];
            } else {
                dashboardFilterArray = [
                    { filterItem: activeIdeaFilter[0], entityName: activeIdeaFilter[0].label, entityId: null },
                    { filterItem: ideaFilter1[0], entityName: ideaFilter1[0].label, entityId: null },
                ];
            }
            break;
        case 'HighRisk':
            activeIdeaFilter = ideaFilters.filter(function (el) { return el.value === 'IdeaStatus_1' })
            ideaFilter1 = ideaFilters.filter(function (el) { return el.value === 'RiskRating_3' });
            if (secondaryFilter) {
                ideaFilter2 = ideaFilters.filter(function (el) { return el.value === secondaryFilter });
            }
            if (ideaFilter2) {
                dashboardFilterArray = [
                    { filterItem: activeIdeaFilter[0], entityName: activeIdeaFilter[0].label, entityId: null },
                    { filterItem: ideaFilter1[0], entityName: ideaFilter1[0].label, entityId: null },
                    { filterItem: ideaFilter2[0], entityName: entityName, entityId: entityId }
                ];
            } else {
                dashboardFilterArray = [
                    { filterItem: activeIdeaFilter[0], entityName: activeIdeaFilter[0].label, entityId: null },
                    { filterItem: ideaFilter1[0], entityName: ideaFilter1[0].label, entityId: null },
                ];
            }
            break;
        case 'TotalRisk':
            activeIdeaFilter = ideaFilters.filter(function (el) { return el.value === 'IdeaStatus_1' })
            let ideaFilter = ideaFilters.filter(function (el) { return el.value === secondaryFilter });
            dashboardFilterArray = [
                { filterItem: activeIdeaFilter[0], entityName: activeIdeaFilter[0].label, entityId: null },
                { filterItem: ideaFilter[0], entityName: entityName, entityId: entityId }
            ];
            break;
        default: break;
    }
    return dashboardFilterArray;
}

export const getDashboardFilterCategoryAndFTE = (filter, entityId, entityName) => {
    let dashboardFilterArray = [];
    let activeIdeaFilter;
    let ideaFilter2;
    switch (filter) {
        case 'NPECategory':
            activeIdeaFilter = ideaFilters.filter(function (el) { return el.value === 'IdeaStatus_1' });
            ideaFilter2 = ideaFilters.filter(function (el) { return el.value === filter });
            dashboardFilterArray = [
                { filterItem: activeIdeaFilter[0], entityName: activeIdeaFilter[0].label, entityId: null },
                { filterItem: ideaFilter2[0], entityName: entityName, entityId: entityId }
            ];
            break;
        case 'FunctionalTitle':
            activeIdeaFilter = ideaFilters.filter(function (el) { return el.value === 'IdeaStatus_1' });
            ideaFilter2 = ideaFilters.filter(function (el) { return el.value === filter });
            dashboardFilterArray = [
                { filterItem: activeIdeaFilter[0], entityName: activeIdeaFilter[0].label, entityId: null },
                { filterItem: ideaFilter2[0], entityName: entityName, entityId: entityId }
            ];
            break;
        case 'RevenueCategory':
            activeIdeaFilter = ideaFilters.filter(function (el) { return el.value === 'IdeaStatus_1' });
            ideaFilter2 = ideaFilters.filter(function (el) { return el.value === filter });
            dashboardFilterArray = [
                { filterItem: activeIdeaFilter[0], entityName: activeIdeaFilter[0].label, entityId: null },
                { filterItem: ideaFilter2[0], entityName: entityName, entityId: entityId }
            ];
            break;
        default: break;
    }
    return dashboardFilterArray;
};

export const getResolveReviewFilter = (filterType, riskType) => {
    let dashboardFilterArray = [];
    let activeIdeaFilter = ideaFilters.filter(function (el) { return el.value === 'IdeaStatus_1' })
    let ideaFilter = ideaFilters.filter(function (el) { return el.label === filterType })
    dashboardFilterArray = [
        { filterItem: activeIdeaFilter[0], entityName: activeIdeaFilter[0].label, entityId: null },
        { filterItem: ideaFilter[0], entityName: ideaFilter[0].label, entityId: null }
    ];
    let riskFilter;
    if (riskType) {
        switch (riskType) {
            case 'LowRisk':
                riskFilter = ideaFilters.filter(function (el) { return el.value === 'RiskRating_1' });
                dashboardFilterArray.push(
                    { filterItem: riskFilter[0], entityName: riskFilter[0].label, entityId: null }
                );
                break;
            case 'MediumRisk':
                riskFilter = ideaFilters.filter(function (el) { return el.value === 'RiskRating_2' });
                dashboardFilterArray.push(
                    { filterItem: riskFilter[0], entityName: riskFilter[0].label, entityId: null }
                );
                break;
            case 'SubtotalRisk':
                riskFilter = ideaFilters.filter(function (el) { return el.value === 'RiskRating_1' });
                let riskFilter1 = ideaFilters.filter(function (el) { return el.value === 'RiskRating_2' });
                dashboardFilterArray.push(
                    { filterItem: riskFilter[0], entityName: riskFilter[0].label, entityId: null },
                    { filterItem: riskFilter1[0], entityName: riskFilter1[0].label, entityId: null }
                );
                break;
            case 'HighRisk':
                riskFilter = ideaFilters.filter(function (el) { return el.value === 'RiskRating_3' });
                dashboardFilterArray.push(
                    { filterItem: riskFilter[0], entityName: riskFilter[0].label, entityId: null }
                );
                break;
            case 'UnratedRisk':
                riskFilter = ideaFilters.filter(function (el) { return el.value === 'RiskRating_0' });
                dashboardFilterArray.push(
                    { filterItem: riskFilter[0], entityName: riskFilter[0].label, entityId: null }
                );
                break;
            default: break;
        }
    }
    return dashboardFilterArray;
};
export const getDashBoardFilterByRisk = (name, selectedRadio, selectedRecommRadio, selectedDecisionRadio) => {
    let activeIdeaFilter = ideaFilters.filter(function (el) { return el.value === 'IdeaStatus_1' });
    let riskStatusFilter1 = ideaFilters.filter(function (el) { return el.value === 'RiskStatus_2' });
    let riskStatusFilter2 = ideaFilters.filter(function (el) { return el.value === 'RiskStatus_3' });
    let riskStatusFilter3 = ideaFilters.filter(function (el) { return el.value === 'RiskStatus_4' });
    let riskFilter1 = ideaFilters.filter(function (el) { return el.value === 'RiskRating_1' });
    let riskFilter2 = ideaFilters.filter(function (el) { return el.value === 'RiskRating_2' });
    let riskFilter3 = ideaFilters.filter(function (el) { return el.value === 'RiskRating_3' });
    let valueStatusFilter = [];
    let valueStatusArray = [];

    let recommendationFilter = [];
    let recommendationArray = [];

    let decisionFilter = [];
    let decisionArray = [];


    let filterArray = [];
    if (selectedRadio === '2') {
        valueStatusArray = ideaFilters.filter(function (el) { return (el.value === 'ValueStatus_1' || el.value === 'ValueStatus_0') });
        valueStatusFilter = _.map(valueStatusArray, function (o) { return { filterItem: o, entityName: o.label, entityId: null } });
    } else if (selectedRadio === '3') {
        valueStatusArray = ideaFilters.filter(function (el) { return (el.value === 'ValueStatus_2' || el.value === 'ValueStatus_3' || el.value === 'ValueStatus_4') });
        valueStatusFilter = _.map(valueStatusArray, function (o) { return { filterItem: o, entityName: o.label, entityId: null } });
    }

    if (selectedRecommRadio === '2') {
        recommendationArray = ideaFilters.filter(function (el) { return (el.value === 'GLRecommendation_1') });
        recommendationFilter = _.map(recommendationArray, function (o) { return { filterItem: o, entityName: o.label, entityId: null } });
    } else if (selectedRecommRadio === '3') {
        recommendationArray = ideaFilters.filter(function (el) { return (el.value === 'GLRecommendation_2') });
        recommendationFilter = _.map(recommendationArray, function (o) { return { filterItem: o, entityName: o.label, entityId: null } });
    } else if (selectedRecommRadio === '4') {
        recommendationArray = ideaFilters.filter(function (el) { return (el.value === 'GLRecommendation_0') });
        recommendationFilter = _.map(recommendationArray, function (o) { return { filterItem: o, entityName: o.label, entityId: null } });
    }

    if (selectedDecisionRadio === '2') {
        decisionArray = ideaFilters.filter(function (el) { return (el.value === 'SCDecision_1') });
        decisionFilter = _.map(decisionArray, function (o) { return { filterItem: o, entityName: o.label, entityId: null } });
    } else if (selectedDecisionRadio === '3') {
        decisionArray = ideaFilters.filter(function (el) { return (el.value === 'SCDecision_2') });
        decisionFilter = _.map(decisionArray, function (o) { return { filterItem: o, entityName: o.label, entityId: null } });
    } else if (selectedDecisionRadio === '4') {
        decisionArray = ideaFilters.filter(function (el) { return (el.value === 'SCDecision_0') });
        decisionFilter = _.map(decisionArray, function (o) { return { filterItem: o, entityName: o.label, entityId: null } });
    }

    switch (name) {
        case 'LowRisk':
            filterArray = [
                { filterItem: activeIdeaFilter[0], entityName: activeIdeaFilter[0].label, entityId: null },
                { filterItem: riskFilter1[0], entityName: riskFilter1[0].label, entityId: null },
                { filterItem: riskStatusFilter1[0], entityName: riskStatusFilter1[0].label, entityId: null },
                { filterItem: riskStatusFilter2[0], entityName: riskStatusFilter2[0].label, entityId: null },
                { filterItem: riskStatusFilter3[0], entityName: riskStatusFilter3[0].label, entityId: null }
            ];
            break;
        case 'MediumRisk':
            filterArray = [
                { filterItem: activeIdeaFilter[0], entityName: activeIdeaFilter[0].label, entityId: null },
                { filterItem: riskFilter2[0], entityName: riskFilter2[0].label, entityId: null },
                { filterItem: riskStatusFilter1[0], entityName: riskStatusFilter1[0].label, entityId: null },
                { filterItem: riskStatusFilter2[0], entityName: riskStatusFilter2[0].label, entityId: null },
                { filterItem: riskStatusFilter3[0], entityName: riskStatusFilter3[0].label, entityId: null }
            ];
            break;
        case 'SubtotalRisk':
            filterArray = [
                { filterItem: activeIdeaFilter[0], entityName: activeIdeaFilter[0].label, entityId: null },
                { filterItem: riskFilter1[0], entityName: riskFilter1[0].label, entityId: null },
                { filterItem: riskFilter2[0], entityName: riskFilter2[0].label, entityId: null },
                { filterItem: riskStatusFilter1[0], entityName: riskStatusFilter1[0].label, entityId: null },
                { filterItem: riskStatusFilter2[0], entityName: riskStatusFilter2[0].label, entityId: null },
                { filterItem: riskStatusFilter3[0], entityName: riskStatusFilter3[0].label, entityId: null }
            ];
            break;
        case 'HighRisk':
            filterArray = [
                { filterItem: activeIdeaFilter[0], entityName: activeIdeaFilter[0].label, entityId: null },
                { filterItem: riskFilter3[0], entityName: riskFilter3[0].label, entityId: null },
                { filterItem: riskStatusFilter1[0], entityName: riskStatusFilter1[0].label, entityId: null },
                { filterItem: riskStatusFilter2[0], entityName: riskStatusFilter2[0].label, entityId: null },
                { filterItem: riskStatusFilter3[0], entityName: riskStatusFilter3[0].label, entityId: null }
            ];
            break;
    }
    return (_.concat(filterArray, valueStatusFilter, recommendationFilter, decisionFilter));
};

export const getTableColumnHeader = (fieldName) => {
    let columnHeader = '';
    switch (fieldName) {
        case 'IdeaNumber': columnHeader = 'Idea#'; break;
        case 'ImplementationStatus': columnHeader = 'Status'; break;
        case 'GroupName': columnHeader = 'Group'; break;
        case 'IsIT': columnHeader = 'IT'; break;
        case 'LineItemType': columnHeader = 'Line Type'; break;
        case 'DirectionType': columnHeader = 'Direction'; break;
        case 'Category': columnHeader = 'Category / FT'; break;
        case 'PlanNotes': columnHeader = 'Notes'; break;
        case 'CompRange': columnHeader = 'Comp'; break;
        case 'LineItemAmount':
        case 'LineItemPlanAmount':
        case 'LineItemActualAmount':
        case 'PlanAmount':
        case 'ActualAmount':
            columnHeader = 'FTE#/Amount'; break;
        case 'AmortizationPeriod':
        case 'PlanAmortizationPeriod':
            columnHeader = 'Amrt'; break;
        case 'PlanValue':
        case 'ActualValue':
        case 'LineItemPlanValue':
        case 'LineItemActualValue':
            columnHeader = 'Value'; break;
        case 'PlanTiming':
        case 'ActualTiming':
            columnHeader = 'Timing'; break;
        case 'Center':
            columnHeader = 'CostCenter'; break;
        case 'LineNumber':
            columnHeader = 'Line#'; break;
        default: columnHeader = fieldName; break;
    }
    return columnHeader;
}

export const getTableColumnHeaderTooltip = (fieldName) => {
    var text = '';
    switch (fieldName) {
        case 'GroupName':
        case 'PrimaryGroupName':
            text = 'PrimaryGroup'; break;
        case 'Category': text = 'CategoryFTTooltip'; break;
        case 'CompRange': text = 'CompensationRange'; break;
        case 'LineItemAmount':
        case 'LineItemPlanAmount':
        case 'LineItemActualAmount':
        case 'PlanAmount':
        case 'ActualAmount':
            text = 'FTEAmtMgnTooltip'; break;
        case 'AmortizationPeriod':
        case 'PlanAmortizationPeriod':
            text = 'AmortizationPeriod'; break;
        default: text = fieldName; break;
    }
    return text;
};


export const lineItemValueTooltip = (lineItemType, lineItemSubType, amount, directionType, amortizationPeriod, averageSalary) => {
    let toolTiptext = formatAmount(averageSalary * directionType, true);
    switch (lineItemType) {
        case 1:
        case 3:
            toolTiptext = formatAmount(amount * directionType, true);
            break;
        case 2:
            toolTiptext = formatAmount(averageSalary * directionType, true);
            break;
    }

    switch (lineItemSubType) {
        case 11: case 12: return toolTiptext
        case 13: case 14: return toolTiptext + ' / ' + amortizationPeriod;
        case 21: case 22: case 25: return toolTiptext + ' * ' + amount;
        case 31: case 32: case 42: return toolTiptext;
        case 33: case 34: case 41: case 35: case 36: return toolTiptext + ' / ' + amortizationPeriod;
        default: return '';
    }
}

export const completionTrackerScopeOptions = [
    { value: 1, label: i18n.t('All Line Items') },
    { value: 2, label: i18n.t('Selected Line Item Idea') }
];

export const completionTrackerValueOptions = [
    { value: 1, label: <Translation id={'AnnualizedHeader'} /> },
    { value: 2, label: <Translation id={'P&L'} /> },
    { value: 3, label: <Translation id={'CashFlow'} /> }
];

export const proformaValueType1Options = [
    { value: 1, label: <Translation id={'AnnualizedHeader'} /> },
    { value: 2, label: <Translation id={'P&L'} /> },
    { value: 3, label: <Translation id={'CashFlow'} /> },
    { value: 4, label: <Translation id={'All'} /> }
];

export const proformaColumnOptions = [
    { value: 1, label: <Translation id={'Years'} /> },
    { value: 2, label: <Translation id={'Years & months'} /> }
];

export const completionTrackerTableViews = [
    { value: 1, label: <Translation id={'TargetAndPlan'} /> },
    { value: 2, label: <Translation id={'PlanAndActual'} /> },
    { value: 3, label: <Translation id={'TargetAndActual'} /> },
    { value: 4, label: <Translation id={'TargetAndPlanAndActual'} /> }
];

export const completionTrackerValueTypeOptions = [
    { value: 1, label: <Translation id={'Incremental'} /> },
    { value: 2, label: <Translation id={'Cumulative'} /> }
];

export const proformaValueType2Options = [
    { value: 1, label: <Translation id={'Incremental'} /> },
    { value: 2, label: <Translation id={'Cumulative'} /> },
    { value: 3, label: <Translation id={'Both'} /> }
];

export const completionTrackerVarianceOptions = [
    { value: 1, label: i18n.t('$') },
    { value: 2, label: i18n.t('%') },
];



export const testPushData = '[{"OrganizationId":"ad663f6d-2bd6-c538-aa56-ed3f4e9e915e","UserId":"cf1388b4-fe3f-46eb-8d7b-9c86133e597d","ConnectionId":"bce74133-12f5-478a-9d9d-311c921bc482","Time":"0001-01-01T00:00:00Z","Data":[{"OrganizationId":"ad663f6d-2bd6-c538-aa56-ed3f4e9e915e","EntityType":"FunctionalTitleMap","EntityId":"8518ff2e-0432-4c0a-af08-ae83ee856021","SnapshotData":{"FunctionalTitleMap":{"FunctionalTitleMapId":"8518ff2e-0432-4c0a-af08-ae83ee856021","GroupId":"cf86013d-b035-4ac2-8b04-f69e42e8ec4e","JobTitle":"Account Executive II","FunctionalTitleId":"ee1bd1a1-f543-4532-a5ec-ef62fb8ebac2","ManualFTCount":3,"PositionCount":4,"ModifiedOn":"2018-11-29T11:06:06.8716351Z"},"Personnel":[{"PositionId":"25800E","GroupId":"cf86013d-b035-4ac2-8b04-f69e42e8ec4e","PId":479,"ManagerPositionId":null,"LastName":"Warner","FirstName":"Dominic","EmployeeId":null,"CostCenter":"NA-2191C","JobTitle":"Account Executive II","FunctionalTitle":"testFT29100","FunctionalTitleId":"2345129f-4422-d4b1-0a11-7b9b3187220b","PayType":"H","FTE":1.0,"Exempt":"N","EmpUnion":null,"IsOpen":"N","WorkLocation":"US / NA / Central Region_Centralized 10910R","DivisionId":"","OtherId1":"Regular","OtherId2":"","Email":null,"City":"Central Region_Centralized 10910R","StateRegion":"NA","Country":"US","ServiceDate":null,"Exclude":"N","SalaryRange":null,"Group":"DirSls","Team":null,"IsManualFT":true,"ModifiedOn":"2018-11-29T09:25:36.216046Z","PersonnelId":"2cdb95b5-07a3-4b8c-b303-debb7ed4de32"},{"PositionId":"25124A","GroupId":"cf86013d-b035-4ac2-8b04-f69e42e8ec4e","PId":700,"ManagerPositionId":null,"LastName":"Test","FirstName":"Rinkesh","EmployeeId":null,"CostCenter":"NA-2191C","JobTitle":"Account Executive II","FunctionalTitle":"testFT29100","FunctionalTitleId":"2345129f-4422-d4b1-0a11-7b9b3187220b","PayType":"H","FTE":1.0,"Exempt":"N","EmpUnion":null,"IsOpen":"N","WorkLocation":"US / NA / West Region_Centralized 10915R","DivisionId":"","OtherId1":"Regular","OtherId2":"","Email":"rin10kesh@gmail.com","City":"West Region_Centralized 10915R","StateRegion":"NA","Country":"US","ServiceDate":null,"Exclude":"N","SalaryRange":null,"Group":"DirSls","Team":null,"IsManualFT":true,"ModifiedOn":"2018-11-29T09:24:18.3121145Z","PersonnelId":"f45e2072-0046-4852-9229-3cab23d4f907"},{"PositionId":"25637E","GroupId":"cf86013d-b035-4ac2-8b04-f69e42e8ec4e","PId":589,"ManagerPositionId":null,"LastName":"Osborne","FirstName":"Alexandra","EmployeeId":null,"CostCenter":"NA-2191C","JobTitle":"Account Executive II","FunctionalTitle":"Inside Sales","FunctionalTitleId":"de4480fa-70b1-4d42-8c82-ebe7748ea44c","PayType":"H","FTE":1.0,"Exempt":"N","EmpUnion":null,"IsOpen":"N","WorkLocation":"US / NA / East Region_Centralized 10920R","DivisionId":"","OtherId1":"Regular","OtherId2":"","Email":null,"City":"East Region_Centralized 10920R","StateRegion":"NA","Country":"US","ServiceDate":null,"Exclude":"N","SalaryRange":null,"Group":"DirSls","Team":null,"IsManualFT":true,"ModifiedOn":"2018-11-29T09:40:40.8836332Z","PersonnelId":"42f388c9-1d8c-4436-b00e-888fd02399bf"},{"PositionId":"20655E","GroupId":"cf86013d-b035-4ac2-8b04-f69e42e8ec4e","PId":578,"ManagerPositionId":null,"LastName":"Howell","FirstName":"Tommy","EmployeeId":null,"CostCenter":"NA-2191C","JobTitle":"Account Executive II","FunctionalTitle":"Training","FunctionalTitleId":"ee1bd1a1-f543-4532-a5ec-ef62fb8ebac2","PayType":"H","FTE":1.0,"Exempt":"N","EmpUnion":null,"IsOpen":"N","WorkLocation":"US / NA / West Region_Centralized 10915R","DivisionId":"","OtherId1":"Regular","OtherId2":"","Email":null,"City":"West Region_Centralized 10915R","StateRegion":"NA","Country":"US","ServiceDate":null,"Exclude":"N","SalaryRange":null,"Group":"DirSls","Team":null,"IsManualFT":false,"ModifiedOn":"2018-11-29T11:06:06.8716351Z","PersonnelId":"9004afdb-ccc3-4e27-ac0e-cf71f0dfd783"}]},"IsDelete":false},{"OrganizationId":"ad663f6d-2bd6-c538-aa56-ed3f4e9e915e","EntityType":"FunctionalTitle","EntityId":"5c9d6cf2-9d07-4c75-98c7-aa25cab5627f","SnapshotData":{"FunctionalTitle":{"OrganizationId":"ad663f6d-2bd6-c538-aa56-ed3f4e9e915e","FunctionalTitleId":"5c9d6cf2-9d07-4c75-98c7-aa25cab5627f","GroupId":"cf86013d-b035-4ac2-8b04-f69e42e8ec4e","Name":"Recruiting","CreatedBy":"00000000-0000-0000-0000-000000000000","CreatedOn":"0001-01-01T00:00:00Z","ModifiedBy":"00000000-0000-0000-0000-000000000000","ModifiedOn":"2018-04-12T08:45:10.2268324Z","JobTitleCount":4,"PersonnelCount":0,"LineItemCount":17,"SalaryRanges":null}},"IsDelete":false},{"OrganizationId":"ad663f6d-2bd6-c538-aa56-ed3f4e9e915e","EntityType":"FunctionalTitle","EntityId":"ee1bd1a1-f543-4532-a5ec-ef62fb8ebac2","SnapshotData":{"FunctionalTitle":{"OrganizationId":"ad663f6d-2bd6-c538-aa56-ed3f4e9e915e","FunctionalTitleId":"ee1bd1a1-f543-4532-a5ec-ef62fb8ebac2","GroupId":"cf86013d-b035-4ac2-8b04-f69e42e8ec4e","Name":"Training","CreatedBy":"00000000-0000-0000-0000-000000000000","CreatedOn":"0001-01-01T00:00:00Z","ModifiedBy":"00000000-0000-0000-0000-000000000000","ModifiedOn":"2018-04-12T08:45:11.0237171Z","JobTitleCount":10,"PersonnelCount":1,"LineItemCount":10,"SalaryRanges":null}},"IsDelete":false}]}]';

export const getBitCodeForViews = (view) => {
    switch (view) {
        case 1: return 1;
        case 2: return 2;
        case 3: return 4;
        case 4: return 8;
        case 5: return 16;
        case 6: return 32;
        case 7: return 64;
        case 8: return 128;
        case 9: return 256;
        case 10: return 512;
        case 11: return 1024;
        case 12: return 2048;
        case 13: return 4096;
        case 14: return 8192;
        default: return 0;
    }

}

export const permissionTypes = [
    { value: 1, label: <Translation id={'PermissionsByUser'} /> },
    { value: 2, label: <Translation id={'PermissionsByOrganizationElement'} /> },
];

export const permissionViews = [
    { value: 1, label: <Translation id={'ShowItemsWithAssignedPermissions'} /> },
    { value: 2, label: <Translation id={'ShowItemsWithAssignedPermissionsAndDerivedPermissions'} /> },
    { value: 3, label: <Translation id={'ShowAllItems'} /> },
];

export const groupLevelRolesOnly = [
    'f2c2dc15-278d-4e79-aa43-4bbefb088bb1',
    '9d74ffcf-126f-47f5-987b-14e4f91a10e0',
    '5659374e-ad72-4638-a37f-9217dd4b32f5'
];

export const notesCreationTypes = [
    { value: 1, label: <Translation id={'Created'} /> },
    { value: 2, label: <Translation id={'Modified'} /> },
]

export const notesStatusTypes = [
    { value: 1, label: <Translation id={'Active'} /> },
    { value: 2, label: <Translation id={'Archived'} /> },
    { value: 3, label: <Translation id={'All'} /> },
]

export const notesCreationTimings = [
    { value: 1, label: <Translation id={'Today'} /> },
    { value: 2, label: <Translation id={'Yesterday'} /> },
    { value: 3, label: <Translation id={'ThisWeek'} /> },
    { value: 4, label: <Translation id={'LastWeek'} /> },
    { value: 5, label: <Translation id={'ThisMonth'} /> },
    { value: 6, label: <Translation id={'LastMonth'} /> },
    { value: 7, label: <Translation id={'TimePeriod'} /> },
]

export const getNotesCreationTypes = (type) => {
    switch (type) {
        case 1: return { value: 1, label: i18n.t('Created') };
        case 2: return { value: 2, label: i18n.t('Modified') };
    }
}

export const getNotesStatusTypes = (type) => {
    switch (type) {
        case 1: return { value: 1, label: i18n.t('Active') };
        case 2: return { value: 2, label: i18n.t('Archived') };
        case 3: return { value: 3, label: i18n.t('All') };
    }
}

export const getNotesCreationTimings = (type) => {
    switch (type) {
        case 1: return { value: 1, label: i18n.t('Today') };
        case 2: return { value: 2, label: i18n.t('Yesterday') };
        case 3: return { value: 3, label: i18n.t('ThisWeek') };
        case 4: return { value: 4, label: i18n.t('LastWeek') };
        case 5: return { value: 5, label: i18n.t('ThisMonth') };
        case 6: return { value: 6, label: i18n.t('LastMonth') };
        case 7: return { value: 7, label: i18n.t('TimePeriod') };
        default: return ' ';
    }
}

export const getSessions = (sessions, sessionId) => {
    let sessionValues = [];
    let sortedSession = _.filter(_.orderBy(sessions, ['SessionDate'], ['desc']), (item) => { return item.Status === 2 || item.Status === 3 });
    if (sessionId) {
        sortedSession = _.filter(sortedSession, { 'SessionId': sessionId });
    }
    _.map(sortedSession, (item) => {
        if (item.SessionDate) {
            sessionValues.push({
                value: item.SessionId,
                label: ((moment(item.SessionDate).format('MM/DD/YY hh:mm A')) + (item.Title ? ' - ' + item.Title : '') + ' (' + (item.Status === 2 ? i18n.t('Open') : i18n.t('Closed')) + ')'),
                status: item.Status
            });
        }
    });
    return sessionValues;
};

export const getTimeScenarioSessions = (timeScenarioSessions, groupId, timingScenarioId) => {
    let sessionValues = [];
    let sortedSession = _.filter(_.orderBy(timeScenarioSessions, ['Title'], ['desc']), (item) => {
        return item.GroupId === groupId
        //&& (item.Status === 2 || item.Status === 3)
    });
    if (timingScenarioId) {
        sortedSession = _.filter(sortedSession, { 'TimingScenarioId': timingScenarioId });
    }
    _.map(sortedSession, (item) => {
        sessionValues.push({
            value: item.TimingScenarioId,
            label: (item.Title ? item.Title : ''),
            //status: item.Status
        });
    });

    return sessionValues;
};

export const getTimeScenarioViews = () => {
    return [
        { value: 1, label: translateKey('AnnualizedHeader') },
        { value: 2, label: translateKey('P&L') },
        { value: 3, label: translateKey('CashFlow') },
    ]
}

export const getTimeScenarioSubViews = () => {
    return [
        { value: 1, label: translateKey('Incremental') },
        { value: 2, label: translateKey('Cumulative') },
    ]
}


export const getYearsCountArray = (years) => {
    let yearValues = [];
    _.forEach(years, (item) => {
        yearValues.push(0);
    });
    return yearValues;
};

export const getLineItemWorkFlow = (valueStatus) => {
    const workFlow = {
        RoughValueState: 1,
        DetailedValueState: 1,
        DetailedValueCompletedState: 1,
        FinancialValidationState: 1,
    };
    switch (valueStatus) {
        case 1:
            workFlow.RoughValueState = 3;
            workFlow.DetailedValueState = 2;
            workFlow.DetailedValueCompletedState = 1;
            workFlow.FinancialValidationState = 1;
            break;
        case 2:
            workFlow.RoughValueState = 3;
            workFlow.DetailedValueState = 3;
            workFlow.DetailedValueCompletedState = 2;
            workFlow.FinancialValidationState = 1;
            break;
        case 3:
            workFlow.RoughValueState = 3;
            workFlow.DetailedValueState = 3;
            workFlow.DetailedValueCompletedState = 3;
            workFlow.FinancialValidationState = 2;
            break;
        case 4:
            workFlow.RoughValueState = 3;
            workFlow.DetailedValueState = 3;
            workFlow.DetailedValueCompletedState = 3;
            workFlow.FinancialValidationState = 3;
            break;
        default:
            workFlow.RoughValueState = 2;
            workFlow.DetailedValueState = 1;
            workFlow.DetailedValueCompletedState = 1;
            workFlow.FinancialValidationState = 1;
    }
    return workFlow;
};

export const getNotesTypes = (type) => {
    switch (type) {
        case 1: return { value: 1, label: i18n.t('Group') };
        case 2: return { value: 2, label: i18n.t('Idea') };
        case 3: return { value: 3, label: i18n.t('Risk') };
        case 4: return { value: 3, label: i18n.t('Line') };
        case 5: return { value: 3, label: i18n.t('Metric') };
        case 6: return { value: 3, label: i18n.t('Milestone') };
    }
}

export const notesTypes = [
    { value: 1, label: <Translation id={'Group'} /> },
    { value: 2, label: <Translation id={'Idea'} /> },
    { value: 3, label: <Translation id={'Risk'} /> },
    { value: 4, label: <Translation id={'Line'} /> },
    { value: 5, label: <Translation id={'Metric'} /> },
    { value: 6, label: <Translation id={'Milestone'} /> },
]

export const proformSummaryTypeOptions = [
    { label: <Translation id={'AllLineItems'} />, value: 1 },
    { label: <Translation id={'SelectedLineItems'} />, value: 2 },
];

export const proformSummaryValueTypeOptions = [
    { label: <Translation id={'NewValue'} />, value: 1 },
    { label: <Translation id={'ChangedValue'} />, value: 2 },
];
