export const en_US = {
    translation: {
        interface: {
            commons: {
                next: 'Next',
                previous: 'Previous',
                cancel: 'Cancel',
                delete: 'Delete',
                submit: 'Submit',
                by: 'by',
                increase: 'increase',
                decrease: 'decrease',
            },
            editor: {
                trait: {
                    next_step: 'Next',
                    previous_step: 'Previous',
                    select_type: 'Select a Trait Type',
                    name_label: 'Trait name',
                    name_helper: `The name of the trait to be displayed. Examples: 'Leader', 'Charismatic', 'Shy'`,
                    description_label: 'Description of effects/personality',
                    description_helper: `The description of the trait to give better context of it's effects on gameplay and character personality. Example: " 'Leader' defines the capacity of this character to inspire, command and support his peers in his job and daily life"`,
                    type_label: 'Type category of the Trait',
                    type_helper: 'The type of the trait, it defines the category that the trait will be presented and in what type of situation it can be obtainable',
                    spawn_label: 'Spawnable',
                    spawn_helper: `Whetever this trait can be found on generated Dreamers, otherwise it can be obtainable only by events (Do note that traits of type 'National' will always be spawned), generated dreamers will have up to {{max}}
                    traits on generation.`,
                },
                effect: {
                    unset_modifier: 'New Modifier',
                    unset_value: 'Unknown value',
                    effect_instruction: "* Here you can create/edit the effects that the new trait will have, each effect can have it's own conditions and modifiers, a single trait can have up to {{max}} effects.",
                    add_effect: 'Add new effect',
                    edit_effect: 'Edit effect',
                    remove_effect: 'Remove effect',
                    remove_effect_title: 'Delete effect confirmation',
                    remove_effect_confirmation: 'Are you sure you want to delete this effect? This operation cannot be reverted',
                },
                condition: {
                    initiator: 'Condition Initiator Selector',
                    activeAgent: 'Condition active agent',
                    passiveAgent: 'Condition passive agent',
                    selector: 'Selector Specificator',
                    attr_selector_placeholder: 'Select Attribute',
                    trait_selector_placeholder: 'Select Trait',
                    status_selector_placeholder: 'Select Status',
                    relationship_selector_placeholder: 'Select Relationship Attribute',
                    numeric_selector_input_from: 'From',
                    numeric_selector_input_to: 'To',
                },
                modifier: {
                    title: 'Modifier Editor',
                    subtitle: 'What this effect modify on the game character?',
                    select_type: 'Modifier Type',
                    select_type_caption: 'Select the type of modifier that this effect will have',
                    select_type_submit: 'Submit',
                    select_type_empty: 'Please select the type of modification that this effect will have on characters, events or the game world.',
                    input_numeric: 'Value change',
                    input_numeric_helper: 'The value that the modifier will apply (can be negative)',
                    input_percent: 'Percentage change',
                    input_percent_helper: 'Percentage to be applied (can be negative)',
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
            character: {
                status: {
                    energy: 'Energy',
                    stress: 'Stress',
                    mood: 'Mood',
                },
            },
            relationship: {
                variable: {
                    favor: 'Favorability',
                    love: 'Romantic',
                    power: 'Power Dynamic',
                    attraction: 'Attractiviness',
                    respect: 'Respect',
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
                agent: {
                    self: 'Self',
                    producer: 'Producer',
                    interacted: 'Interacted',
                    tutor: 'Tutor',
                    specific_character: 'Specific Character',
                    tagged_character: 'Tagged Character',
                    global: 'Global variable',
                },
                selector: {
                    numeric: {
                        bigger_than: 'bigger than',
                        smaller_than: 'smaller than',
                        bigger_than_target: 'bigger than target',
                        smaller_than_target: 'smaller than target',
                        between: 'between',
                        exactly: 'exactly',
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
            trait: {
                type: {
                    normal: 'Normal',
                    physical: 'Physical',
                    mental: 'Mental',
                    personality: 'Personality',
                    development: 'Development',
                    national: 'National',
                    special: 'Special',
                },
            },
            modifier: {
                type: {
                    attr_value: 'Current attribute value',
                    attr_multiplier: 'Attribute value gain multiplier',
                    attr_potential: 'Potential attribute value',

                    relationship_respect: 'Relationship respect metric',
                    relationship_favor: 'Relationship favorability metric',
                    relationship_attract: 'Relationship attraction metric',
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
        summary: {
            node: {
                logic: {
                    if: 'If the following is true',
                    and: 'If all of the following is true',
                    or: 'If any of the following is true',
                },
                initiator: {
                    attr_range: '{{attr}} ',
                },
                numeric_selector: {
                    between: '{{main}} is between {{value1}} and {{value2}}',
                    higher: '{{main}} is higher than {{value}}',
                    lesser: '{{main}}less than {{value}}',
                    exactly: 'is exactly {{value}}',
                },
            },
            effect: {
                increase: 'Increase the {{value}} by {{change}}',
                decrease: 'Decrease the {{value}} by {{change}}',
                increase_with_targets: 'Increase the {{value}} of {{targets}} by {{change}}',
                decrease_with_targets: 'Decrease the {{value}} of {{targets}} by {{change}}',
            },
            agent: {
                unknown_self: `This character own`,
                unknown_interacted: `The interacted character`,
                unknown_producer: `The character's producer`,
                unknown_tutor: `The character's tutor`,
            },
            attribute: {
                singular: '{{name}} attribute is',
                plural: '{{name}} attributes are',
            },
            condition: {
                between: '{{agent}} {{variable}} between {{lowerValue}} and {{higherValue}}',
                bigger_than: 'The {{value_name}} of {{actor}} is bigger than {{parameter}}',
                bigger_than_target: `The {{value_name}}'s of {{actor}} is bigger than {{parameter}}`,
            },
        },
    },
};
