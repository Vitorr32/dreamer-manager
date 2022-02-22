export const en_US = {
    translation: {
        interface: {
            commons: {
                next: 'Next',
                previous: 'Previous',
                cancel: 'Cancel',
                delete: 'Delete',
                close: 'Close',
                submit: 'Submit',
                by: 'by',
                increase: 'increase',
                decrease: 'decrease',
                language: 'Language',
            },
            editor: {
                trait: {
                    next_step: 'Next',
                    previous_step: 'Previous',
                    select_type: 'Select a Trait Type',
                    id_label: 'ID code',
                    id_helper: 'The unique identifier that this trait will have, it is used for quick search and saving into the static files',
                    name_label: 'Name',
                    default_locale_name_label: 'English Name',
                    name_helper: `The name of the trait to be displayed. Examples: 'Leader', 'Charismatic', 'Shy'`,
                    description_label: 'Description of effects/personality',
                    default_locale_description_label: 'English Description',
                    description_helper: `The description of the trait to give better context of it's effects on game play and character personality. Example: " 'Leader' defines the capacity of this character to inspire, command and support his peers in his job and daily life"`,
                    type_label: 'Type category of the Trait',
                    type_helper: 'The type of the trait, it defines the category that the trait will be presented and in what type of situation it can be obtainable',
                    spawn_label: 'Spawnable',
                    spawn_helper: `Whatever this trait can be found on generated Dreamers, otherwise it can be obtainable only by events (Do note that traits of type 'National' will always be spawned), generated dreamers will have up to {{max}}
                    traits on generation.`,
                    icon_label: 'Avatar Icon',
                    icon_helper: 'The image used as icon for the trait, it should have a square (Optimally 100x100) proportion with transparent background when nescessary.',
                    localization_message:
                        'To create a new trait, you need to have the localized name and description in at least American English, since it is the default language.',
                    is_spawnable: 'Can spawn',
                    not_spawnable: "Can't spawn",
                },
                effect: {
                    unset_modifier: 'New Modifier',
                    unset_value: 'Unknown value',
                    effect_instruction:
                        "* Here you can create/edit the effects that the new trait will have, each effect can have it's own conditions and modifiers, a single trait can have up to {{max}} effects.",
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
                    time_selector_placeholder: 'Select time logic',
                    flag_selector_placeholder: 'Select the event tag',
                    location_type_selector_placeholder: 'Select the type of Location',
                    numeric_selector_input_from: 'From',
                    numeric_selector_input_to: 'To',
                    time_datepicker_label: 'Pick the date',
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
                event: {
                    add_actor: 'Add Actor to Event',
                    edit_background_cta: 'Change Background',
                    background_file_search: 'Local File',
                    background_resources_search: 'Game File',
                },
                validation: {
                    duplicated_id: 'The id {{id}} is already being used',
                    missing_name: "The name of the trait is missing, or it's not set in english",
                    missing_description: "The description of the trait is missing, or it's not set in english",
                    missing_type: 'The type of the trait is not set',
                    missing_icon: 'The selected icon is missing from the file system, please select the icon again',
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
                flag: {
                    title: 'Event Flag',
                    search_placeholder: 'Search for event name or id',
                    flag_select: 'Select the flag from the event {{value.displayName}}',
                    empty: 'Please select a flag by clicking the respective container and selecting the flag, you can search using the input on the top of the modal',
                    selected: 'You selected the flag {{value.flag}} of the event {{value.event}}',
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
                        flagged: 'Flagged',
                        not_flagged: 'Not Flagged',
                    },
                    location: {
                        of_type: 'The location type',
                        to_of_type: 'Moving to a location of type',
                        of_type_with: 'With target at location of type',
                    },
                    time: {
                        weekday: 'Is/During Weekday',
                        weekend: 'Is/During Weekend',
                        holiday: 'Is/During Holiday',
                        night: 'Is/During Nighttime',
                        day: 'Is/During Daytime',
                        isDate: 'At Specific Date',
                        afterDate: 'After specific date',
                        beforeDate: 'Before specific date',
                    },
                },
            },
            location: {
                type: {
                    canteen: 'Canteen',
                    audio_studio: 'Audio Studio',
                    dance_hall: 'Dance Hall',
                    modeling_studio: 'Modeling Studio',
                    photo_studio: 'Photo Studio',
                    stadium: 'Stadium',
                    television_studio: 'Television Studio',
                    theater: 'Theater',
                    park: 'Natural Park',
                    restaurant: 'Restaurant',
                    zoo: 'Zoo',
                },
            },
            relationship: {
                variable: {
                    favor: 'Favorable',
                    love: 'Romantic',
                    power: 'Power Dynamic',
                    attraction: 'Attractiveness',
                    respect: 'Respect',
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
                    relationship_favor: 'Relationship favorable metric',
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
            common: {
                defaultValue: '*Unset*',
                defaultAgent: '*Unset Character*',
                defaultSelector: 'Select the selector to get the summary of the condition.',
            },
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
                unknown_self: `this character`,
                unknown_interacted: `interacted character`,
                unknown_producer: `character's producer`,
                unknown_tutor: `character's tutor`,
            },
            status: {
                pattern: '{{name}} status',
            },
            relationship: {
                pattern: 'relationship attribute {{name}}',
            },
            condition: {
                between: '{{activeAgent}} {{variable}} is between {{lowerValue}} and {{higherValue}}',
                bigger_than: 'The {{variable}} of the {{activeAgent}} is bigger than {{parameter}}',
                bigger_than_target: `The {{variable}} of {{activeAgent}} is bigger than the {{passiveAgent}}`,
                exactly: `The {{activeAgent}} {{variable}} is exactly than {{parameter}}`,
                smaller_than: 'The {{variable}} of the {{activeAgent}} is smaller than {{parameter}}',
                smaller_than_target: `The {{variable}} of {{activeAgent}} is smaller than the {{passiveAgent}}`,
                has_trait: 'The {{passiveAgent}} has the trait {{variable}}',
                has_trait_plural: 'The {{passiveAgent}} has the following traits: {{variable}}',
                no_trait: 'The {{passiveAgent}} does not have the trait {{variable}}',
                no_trait_plural: 'The {{passiveAgent}} does not have any of the following traits: {{variable}}',
                is_date: `Today is {{parameter, short}}`,
                after_date: `The current date is after {{parameter, short}}`,
                before_date: `The current date is before {{parameter, short}}`,
                is_weekday: `Today is a weekday`,
                is_weekend: `Today is a weekend`,
                is_holiday: `Today is a holiday`,
                is_night: `Is currently nighttime (06:00 PM to 5:00 AM)`,
                is_day: `Is currently daytime (06:00 AM to 05:00 PM)`,
                is_at: '{{activeAgent}} is in a {{parameter}}',
                is_at_with: '{{activeAgent}} is in a {{parameter}} with {{passiveAgent}}',
                is_going_to: '{{activeAgent}} is going to a {{parameter}}',
                is_flagged: '{{passiveAgent}} is flagged with {{variable}}',
                is_not_flagged: '{{passiveAgent}} is not flagged with {{variable}}',
                is_triggered: 'The flag {{variable}} is active in the world state',
                is_not_triggered: 'The flag {{variable}} is not active in the world state',
            },
        },
    },
};
