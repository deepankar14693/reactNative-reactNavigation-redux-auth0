 import i18n from '../i18n';

export const phaseOptions = () => {
    return [
        { value: 1, label: i18n.t("SCR") + ' 1' },
        { value: 2, label: i18n.t("SCR") + ' 2' },
        { value: 3, label: i18n.t("SCR") + ' 3' },
        // { value: 4, label: i18n.t("SCR") + ' 4' },
    ]
};
export const roleOptions = () => {
    return [
        { value: 0, label: '-' },
        { value: 1, label: i18n.t("Ctm") },
        { value: 2, label: i18n.t("GL") },
        { value: 3, label: i18n.t("CTM&GL") },
        { value: 4, label: i18n.t("IC") }
    ]
};
export const typeOptions = () => {
    return [
        { value: 0, label: '-' },
        { value: 1, label: i18n.t('Calculated') },
        { value: 2, label: i18n.t('SelfReported') }
    ]
};
export const dayOptions = () => {
    return [
        { value: 0, label: '-' },
        { value: 1, label: i18n.t("Monday") },
        { value: 2, label: i18n.t("Tuesday") },
        { value: 3, label: i18n.t("Wednesday") },
        { value: 4, label: i18n.t("Thursday") },
        { value: 5, label: i18n.t("Friday") },
        { value: 6, label: i18n.t("Saturday") },
        { value: 7, label: i18n.t("Sunday") }
    ]
};
