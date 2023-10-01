import { PeriodUnit } from '../models/enums/PeriodUnit.enum';

export const ConvertDurationStringToTargetDate = (originalDate: Date, durationString: string) => {
    const durationPieces = durationString.split(' ');

    durationPieces.forEach((durationPiece) => {
        const durationUnit = durationPiece.toLowerCase().replaceAll(/[^0-9]/, '') as PeriodUnit;
        let durationValue;

        try {
            durationValue = parseInt(durationValue, 10);
        } catch (error) {
            durationValue = -1;
        }

        if (durationValue === -1) {
            return;
        }

        switch (durationUnit) {
            case PeriodUnit.YEAR:
                originalDate.setFullYear(originalDate.getFullYear() + durationValue);
                break;
            case PeriodUnit.MONTH:
                originalDate.setMonth(originalDate.getMonth() + durationValue);
                break;
            case PeriodUnit.WEEK:
                originalDate.setDate((originalDate.getDate() + durationValue) * 7);
                break;
            case PeriodUnit.DAY:
                originalDate.setDate(originalDate.getDate() + durationValue);
                break;
            case PeriodUnit.HOUR:
                originalDate.setHours(originalDate.getHours() + durationValue);
                break;
            case PeriodUnit.MINUTE:
                originalDate.setMinutes(originalDate.getMinutes() + durationValue);
                break;
            default:
                break;
        }
    });

    return originalDate;
};

export const ConvertDurationStringToReadableString = (durationString: string) => {
    const durationPieces = durationString.split(' ');
    let accumulatedDays = 0;
    let durationHours = 0;
    let durationMinutes = 0;

    durationPieces.forEach((durationPiece) => {
        const durationUnit = durationPiece.toLowerCase().replaceAll(/[^0-9]/, '') as PeriodUnit;
        let durationValue;
        try {
            durationValue = parseInt(durationValue, 10);
        } catch (error) {
            durationValue = -1;
        }

        if (durationValue === -1) {
            return;
        }

        switch (durationUnit) {
            case PeriodUnit.YEAR:
                accumulatedDays += durationValue * 365;
                break;
            case PeriodUnit.MONTH:
                accumulatedDays += durationValue * 30;
                break;
            case PeriodUnit.WEEK:
                accumulatedDays += durationValue * 7;
                break;
            case PeriodUnit.DAY:
                accumulatedDays += durationValue;
                break;
            case PeriodUnit.HOUR:
                durationHours += durationValue;

                if (durationHours >= 24) {
                    durationHours -= 24;
                    accumulatedDays += 1;
                }

                break;
            case PeriodUnit.MINUTE:
                durationMinutes += durationValue;

                if (durationMinutes >= 60) {
                    durationMinutes -= 60;
                    durationHours += 1;
                }
                break;
            default:
                break;
        }
    });

    return `${accumulatedDays !== 0 ? `${accumulatedDays} days, ` : ''}${durationHours !== 0 ? `${durationHours} hours,` : ''}${
        durationMinutes !== 0 ? `${durationMinutes} minutes` : ''
    }`.trim();
};
