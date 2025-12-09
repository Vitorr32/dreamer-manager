import { VariableType } from '../enums/VariableType';
import { EntityBase } from './Entity.model';
import { Variables } from './Variable.model';

export enum AgencyVariablesKey {
    ID = 'id',
    displayName = 'displayName',
    eventID = 'eventID',
    appliedTime = 'appliedTime',
    permanent = 'permanent',
    hoursToExpire = 'hoursToExpire',
    global = 'global',
}

export const FlagEntityVariables: Variables = {
    id: { key: AgencyVariablesKey.ID, displayName: 'model.id', type: VariableType.TEXT, read: true, edit: false },
    displayName: { key: AgencyVariablesKey.displayName, displayName: 'model.flag.display_name', type: VariableType.LOCALIZED_TEXT, read: true, edit: true },
    eventID: { key: AgencyVariablesKey.eventID, displayName: 'model.flag.event_id', type: VariableType.TEXT, read: true, edit: true },
    appliedTime: { key: AgencyVariablesKey.appliedTime, displayName: 'model.flag.applied_time', type: VariableType.DATE, read: true, edit: false },
    hoursToExpire: { key: AgencyVariablesKey.hoursToExpire, displayName: 'model.flag.hours_to_expire', type: VariableType.NUMBER, read: true, edit: true },
    global: { key: AgencyVariablesKey.global, displayName: 'model.flag.global', type: VariableType.BOOLEAN, read: true, edit: true },
};


export class Flag extends EntityBase {
    static get variables() {
        return FlagEntityVariables;
    }
    // Flag ID, if not set the default will be event_flag_*random uuiv4 key wihtout asterisks*
    id: string;
    // If not informed, the name will be the ID + Flag index in array
    localization: {
        [key: string]: {
            displayName: string;
        };
    };
    // The ID of the event this flag is associated with
    eventID: string;
    // Date time of the moment this flag was applied on the actor
    appliedTime?: Date | null;
    // If flag has a time to expire or will never expire / expire manually by another event
    // How many hours after the applied time this flag will expire, only necessary if the flag is not permanent.
    // If null or undefined, the flag is permanent.
    hoursToExpire?: number | null;
    // Is this flag applied to the world state?
    global: boolean;
}
