export interface Flag {
    // Flag ID, if not set the default will be event_flag_*random uuiv4 key wihtout asterisks*
    id: string;
    // If not informed, the name will be the ID + Flag index in array
    displayName: string;
    // The ID of the event this flag is associated with
    eventID: string;
    // Date time of the moment this flag was applied on the actor
    appliedTime?: Date | null;
    // Whatever the flag has a time to expire or will never expire / expire manually by another event
    permanent: boolean;
    // How many hours after the applied time this flag will expire, only necessary if the flag is not permanent.
    hoursToExpire?: number | null;
    // Is this flag applied to the world state?
    global: boolean;
}
