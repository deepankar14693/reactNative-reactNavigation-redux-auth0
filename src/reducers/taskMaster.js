 import i18n from '../i18n';

const masterDataReducer = (state = [], action, entireState) => {
    var parsedData;
    switch (action.type) {
        case 'GET_MASTERDATA':
            var masterData = {};
            masterData["phaseOptions"] = [
                { value: 1, label: i18n.t("SCR") + ' 1' },
                { value: 2, label: i18n.t("SCR") + ' 2' },
                { value: 3, label: i18n.t("SCR") + ' 3' },
                { value: 4, label: i18n.t("SCR") + ' 4' },
            ]
            masterData["roleOptions"] = [
               { value: 0, label: '-' },
                { value: 1, label: i18n.t("Ctm") },
                { value: 2, label: i18n.t("GL") },
                { value: 3, label: i18n.t("CTM&GL") },
                { value: 4, label: i18n.t("IC") }
            ];
            masterData["typeOptions"] = [
                { value: 0, label: '-' },
                { value: 1, label: i18n.t("Calculated") },
                { value: 2, label: i18n.t("SelfReported") }
            ];
            masterData["dayOptions"] = [
                { value: 0, label: '-' },
                { value: 1, label: i18n.t("Monday")  },
                { value: 2, label: i18n.t("Tuesday")  },
                { value: 3, label: i18n.t("Wednesday")  },
                { value: 4, label: i18n.t("Thursday")  },
                { value: 5, label: i18n.t("Friday")  },
                { value: 6, label: i18n.t("Saturday")  },
                { value: 7, label: i18n.t("Sunday")  }
            ];
            return masterData;
        default: return state;
    }
};
export default masterDataReducer;