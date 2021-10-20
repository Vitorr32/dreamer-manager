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
                modifier: {
                    title: 'Modifier Editor',
                    subtitle: 'What this effect modify on the game character?',
                    select_type: 'Modifier Type',
                    select_type_caption: 'Select the type of modifier that this effect will have',
                    select_type_submit: 'Submit',
                    select_type_empty: 'Please select the type of modification that this effect will have on characters, events or the game world.',
                    input_numeric: 'Value change'
                },
            },
            tools: {
                common: {
                    select: 'Select',
                    cancel: 'Cancel',
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
            modifier: {
                type: {
                    attr_value: 'Current attribute value',
                    attr_multiplier: 'Attribute value gain multiplier',
                    attr_potential: 'Potential attribute value',

                    relationship_respect: 'Relationship respect metric',
                    relationship_favor: 'Relationship favorability metric',
                    relationship_attraction: 'Relationship attraction metric',
                    relationship_love: 'Relationship love metric',
                    relationship_power: 'Relationship power dynamic metric',
                    relationship_familiarity: 'Relationship familiarity metric',

                    trait_gain: 'Receive new trait',
                    trait_remove: 'Remove existing trait',

                    event_flag_remove: 'Remove event flag',
                    event_flag_add: 'Add event flag',
                    event_trigger: 'Set event trigger',

                    static_mood: 'Character mood metric',
                    static_learning_rate: 'Character learning rate',
                    static_energy: 'Character energy value',
                    static_energy_gain: 'Character energy gain multiplier',
                    static_energy_fall: 'Character energy fall multiplier',
                    static_energy_max: 'Maximum character energy value',
                    static_stress: 'Character stress value',
                    static_stress_gain: 'Character stress gain multiplier',
                    static_stress_fall: 'Character stress fall multiplier',
                    static_stress_max: 'Maximum character stress value',
                },
                section: {
                    attr: 'Attribute modifiers',
                    relationship: 'Relationship modifiers',
                    trait: 'Traits modifiers',
                    event: 'Event modifiers',
                    static: 'Character values modifier',
                },
            },
        },
    },
};
