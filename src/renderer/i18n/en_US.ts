export const en_US = {
    translation: {
        interface: {
            editor: {
                condition: {
                    initiator: 'Condition Initiator Selector',
                    selector: 'Selector Specificator',
                    attr_selector_placeholder: 'Select Attribute',
                    trait_selector_placeholder: 'Select Trait',
                },
            },
            tools: {
                common: {
                    select: 'Select',
                    cancel: 'Cancel'
                },
                attribute: {
                    title: 'Attribute',
                    search_placeholder: 'Search for attribute name, description or id',
                    empty: 'Please select a attribute by clicking the respective container, you can search using the input on the top of the modal',
                    selected: 'You selected the attribute {{attr.name}}',
                },
                trait: {
                    title: 'Trait',
                    search_placeholder: 'Search for trait name, description or id',
                    empty: 'Please select a trait by clicking the respective container, you can search using the input on the top of the modal',
                    selected: 'You selected the trait {{value.name}}',
                },
            },
        },
        model: {
            undefined: 'Undefined',
            attribute: {
                category: {
                    basic: 'Basic',
                    sun: 'Sunlight',
                    moon: 'Moonlight',
                    star: 'Starlight',
                },
                growth: {
                    technical: 'Technical',
                    mental: 'Mental',
                    physical: 'Physical',
                },
            },
            condition: {
                initiator: {
                    status_range: 'Status Range',
                    attr_range: 'Attribute Range',
                    trait: 'Trait',
                    event_flag: 'Event Flag',
                    location: 'Location',
                    time: 'Time',
                    relationship: 'Relationship',
                },
                selector: {
                    numeric: {
                        bigger_than: 'bigger than',
                        smaller_than: 'smaller than',
                        bigger_than_self: 'bigger than self',
                        bigger_than_target: 'bigger than target',
                        between: 'between',
                        exactly: 'exactly',
                    },
                    agent: {
                        self: 'Self',
                        target: 'Target',
                        specific: 'Specific',
                        self_target: 'Self and Target',
                        self_specific: 'Self and Specific Character',
                        specific_specific: 'Two specific characters',
                        player: 'Player',
                        global: 'Global',
                    },
                    trait: {
                        has: 'Has',
                        dont: "Don't",
                    },
                    event: {
                        triggered: 'Triggered',
                        not_triggered: 'Not Triggered',
                    },
                    location: {
                        at: 'Is At',
                        not_at: 'Not At',
                    },
                },
            },
            modifier:{

            }
        },
    },
};
