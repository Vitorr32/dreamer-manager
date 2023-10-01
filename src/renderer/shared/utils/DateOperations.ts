export enum PERIOD_UNIT {
    YEAR = 'y',
    MONTH = 'm',
    WEEK = 'w',
    DAY = 'd',
    HOUR = 'h',
    MINUTE = 'min',
}

export const ConvertDurationStringToTargetDate = (originalDate: Date, durationString: string) => {
    const durationPieces = durationString.split(' ');

    durationPieces.forEach((durationPiece) => {
        const durationUnit = durationPiece.toLowerCase().replaceAll(/[^0-9]/, '') as PERIOD_UNIT;
        let durationValue;

        try {
            durationValue = parseInt(durationValue);
        } catch (error) {
            durationValue = -1;
        }

        if (durationValue === -1) {
            return;
        }

        switch (durationUnit) {
            case PERIOD_UNIT.YEAR:
                originalDate.setFullYear(originalDate.getFullYear() + durationValue);
                break;
            case PERIOD_UNIT.MONTH:
                originalDate.setMonth(originalDate.getMonth() + durationValue);
                break;
            case PERIOD_UNIT.WEEK:
                originalDate.setDate((originalDate.getDate() + durationValue) * 7);
                break;
            case PERIOD_UNIT.DAY:
                originalDate.setDate(originalDate.getDate() + durationValue);
                break;
            case PERIOD_UNIT.HOUR:
                originalDate.setHours(originalDate.getHours() + durationValue);
                break;
            case PERIOD_UNIT.MINUTE:
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
        const durationUnit = durationPiece.toLowerCase().replaceAll(/[^0-9]/, '') as PERIOD_UNIT;
        let durationValue;
        try {
            durationValue = parseInt(durationValue);
        } catch (error) {
            durationValue = -1;
        }

        if (durationValue === -1) {
            return;
        }

        switch (durationUnit) {
            case PERIOD_UNIT.YEAR:
                accumulatedDays += durationValue * 365;
                break;
            case PERIOD_UNIT.MONTH:
                accumulatedDays += durationValue * 30;
                break;
            case PERIOD_UNIT.WEEK:
                accumulatedDays += durationValue * 7;
                break;
            case PERIOD_UNIT.DAY:
                accumulatedDays += durationValue;
                break;
            case PERIOD_UNIT.HOUR:
                durationHours += durationValue;

                if (durationHours >= 24) {
                    durationHours -= 24;
                    accumulatedDays += 1;
                }

                break;
            case PERIOD_UNIT.MINUTE:
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

    return `${accumulatedDays !== 0 ? `${accumulatedDays  } days, ` : ''}${durationHours !== 0 ? `${durationHours  } hours,` : ''}${
        durationMinutes !== 0 ? `${durationMinutes  } minutes` : ''
    }`.trim();
};
