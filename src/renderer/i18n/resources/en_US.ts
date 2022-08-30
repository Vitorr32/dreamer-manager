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
                    icon_helper: 'The image used as icon for the trait, it should have a square (Optimally 100x100) proportion with transparent background when necessary.',
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
                    add_condition_label: 'Add Condition',
                },
                entity: {
                    input_label_operator: 'Operator',
                    input_label_external_filter: 'User External Entity Property as Filter',
                    input_label_comparison: 'Compare to Another Entity',
                    button_filter_add_filter: 'Add Filter to Node',
                    button_filter_add_child: 'Add Child to Node',
                    button_remove_filter: 'Removed Filter Node',
                },
                actor: {
                    input_label_selection: 'Actor Selection',
                    option_actor_all: 'All Actors',
                },
                character: {
                    title: 'Character Modifier',
                    subtitle: 'Create/Modify the character to be added to the database',
                    input_label_first_name: 'First Name',
                    input_label_nickname: 'Nickname',
                    input_label_surname: 'Surname',
                    input_label_height: 'Final Height (centimeters)',
                    input_helper_height:
                        'The height that this character will reach when its fully mature (The growth speed is decided randomly, but the final height will always be the same)',
                    input_label_weight: 'Current Weight (kilograms)',
                    input_helper_weight: 'The weight that this character has currently, it can change trough events, growth and training of certain physical attributes',
                    input_label_fat: 'Fat Percentage',
                    input_helper_fat: 'How much of this character weight is fat, this will determine the body type of the Dreamer, such as Muscular, Thin, Obese and so on.',
                    input_helper_surname: 'Characters may be referred by their nickname instead of full name',
                    character_picker_title: 'Game Characters',
                    character_picker_label: 'Character',
                    step_basic_info: 'Character Basic Info',
                    step_specific_info: 'Character Advanced Info',
                    step_sprite_info: 'Character Paper Doll',
                    section_title_living_conditions: 'Living Conditions',
                    input_label_birthday: 'Birthday',
                    input_helper_birthday: 'The game timeline goes from 1644 to 1700, character may have been born at most in 1560, having 84 years at the start of the game',
                    input_label_type: 'Character Type',
                    input_placeholder_type: 'Select a Type',
                    input_helper_type: 'Is this character a Staff character? otherwise it will be considered a Dreamer candidate.',
                    input_label_gender: 'Gender',
                    input_placeholder_gender: 'Select a Gender',
                    input_helper_gender: 'Select a gender for the character, do note that this is only available if the character is a Staff, as all Dreamers are female',
                    input_label_active: 'Is Active?',
                    input_helper_active:
                        'If this character is "Active" it will be recruitable by scouts or employable as a staff on the current city of residence, otherwise it will only be activated by events effects',
                    input_label_nationality: 'Nation of Birth',
                    input_placeholder_nationality: 'Select a Nation',
                    input_label_hometown: 'Hometown',
                    input_placeholder_hometown_disabled: 'Select a Nationality First',
                    input_placeholder_hometown: 'Select a City',
                    input_label_residence: 'Place of Residence',
                    input_placeholder_residence: 'Select a City',
                    input_label_affluence: 'Standard of Living',
                    input_placeholder_affluence: 'Select Character Wealth',
                    trait_list_label: 'Character Traits',
                    trait_list_helper: '',
                },
                dreamer: {
                    input_label_family: 'Family Situation',
                    input_placeholder_family: 'Select Family Situation',
                    input_helper_family:
                        'Family situation will influence in events, traits available and traumas that this dreamer may have or develop if they are not adults yet.',
                    input_label_potential: 'Individual Ability Potential',
                    input_helper_potential:
                        'The ability potential is the maximum sum of all attributes that this dreamer has, when it reaches it maximum, the dreamer can only increases they skill by decreasing others.\n Event the best Dreamers are not capable of being perfect in everything',
                    potential_very_weak: 'Incompetent Dreamer',
                    potential_weak: 'Inept Dreamer',
                    potential_below_average: 'Amateur Dreamer',
                    potential_medium: 'Average Dreamer',
                    potential_high: 'Professional Dreamer',
                    potential_very_high: 'Talented Dreamer',
                    potential_ultimate: 'Legendary Dreamer',
                },
                modifier: {
                    title: 'Modifier Editor',
                    subtitle: 'What this effect modify on the game character?',
                    select_type: 'Modifier Type',
                    select_type_caption: 'Select the type of modifier that this effect will have',
                    select_type_submit: 'Submit',
                    select_type_empty: 'Please select the type of modification that this effect will have on characters, events or the game world.',
                    target_tab_label_entity: "Entity's Variable",
                    target_tab_label_actors: 'Event Actors',
                    input_numeric: 'Value change',
                    input_numeric_helper: 'The value that the modifier will apply (can be negative)',
                    input_percent: 'Percentage change',
                    input_percent_helper: 'Percentage to be applied (can be negative)',
                    input_label_entity: 'Entity Type',
                    input_label_variable: 'Entity Variable',
                    input_label_conditional: 'Conditional',
                    input_label_value_change: 'Modifier Value',
                    modifier_editor_helper_text:
                        "Please select what entity variable will be modified by this modifier, select 'Manually Create a Filter' to create a new filter for the target",
                    targeting: {
                        input_label_target_select: 'Target of Effect',
                        input_label_target_helper: 'Select which entity will receive the effect modifiers',
                        input_label_origin_select: 'Creator of Effect',
                    },
                },
                event: {
                    flag_heading: 'Event Flags',
                    flag_sub_heading: 'Here the flags associated with this event can be modified.',
                    flag_id: 'Flag ID',
                    flag_id_helper: 'Flag unique identifier that will be used to find this individual flag trough the game state',
                    flag_name: 'Flag Display Name',
                    flag_name_helper: 'Flag name that will be shown to the player so we can know what flags are active on the world or actors',
                    flag_permanent: 'Permanent flag',
                    flag_permanent_helper:
                        'A permanent flag means that this flag will not be removed trough in-game time, but it can be removed by other event. \n otherwise this flag has a specific time to be automatically removed from the actor/world',
                    flag_global: 'Global flag',
                    flag_global_helper: 'The global option will determine if this flag should be applied to the world state, or to a specific actor',
                    flag_hours: 'Hours to Expire',
                    flag_hours_helper: 'How much hours in game will have to pass before this flag is to be removed from the world/actor after it is applied',
                    flag_add_new: 'Add New Flag',
                    navigate_casting: 'Event Actors Casting',
                    casting_heading: 'Actors of Event',
                    casting_sub_heading: 'Here is the list of actors that are participating on this event',
                    casting_actor_heading: 'Configurations of the actor',
                    casting_actor_type_heading: 'Actor Type',
                    casting_player: 'Is this actor the player character?',
                    casting_actor_type_helper_player: 'Player Character is the fixed character of the player, with the name he choose at the start of the game',
                    casting_is_specific: 'Is this actor an specific character that already exists on the game files?',
                    casting_actor_type_helper_is_specific: 'Specific actors are directly identified by their ID and already exist on the Characters database',
                    casting_is_dynamic: 'Is this actor dynamically pooled when the event starts?',
                    casting_actor_type_helper_is_dynamic:
                        'Dynamic actors are only known when the event actually trigger, so you need to set a character filter to pool the actor when the event is triggered',
                    casting_is_generic: 'Is this actor generic or a one-off appearance?',
                    casting_actor_type_helper_is_generic: 'Generic actors are not associated with any actual character in-game, and are only exist on this event',
                    casting_alias: 'Alias',
                    casting_alias_helper: 'What alias will this actor be recognized with?',
                    casting_alias_main_character_temp: '<Main Character>',
                    casting_sprite: 'Actor Sprite',
                    casting_sprite_cta: 'Choose Generic Sprite',
                    casting_sprite_helper: 'The image used as sprite for the generic actor, It should have transparent background when necessary.',
                    casting_actor_add_condition: 'Specify conditions for actor casting for event',
                    scene_root: 'Root',
                    scene_casting: 'Actors casted to this scene',
                    scene_casting_helper: 'Please select the actors present on this scene',
                    scene_casting_no_actors: 'There is currently no actors associated to this event chain, please go back and add actors if necessary.',
                    scene_dialogue_placeholder: 'Click to change the dialogue text of this scene',
                    scene_actor_animation_helper:
                        'Here you can edit the animations that will occurs for the actor on this scene, each animation will be tweened together into a singular movement during the scene',
                    scene_actor_animation_add: 'Add Animation Step',
                    scene_actor_duration_label: 'Duration (milliseconds)',
                    scene_actor_duration_helper: 'The duration, in milliseconds, that will take to smoothly change between the previous animation step to this one.',
                    scene_actor_animation_facing_left: 'Left side',
                    scene_actor_animation_facing_right: 'Right side',
                    scene_actor_animation_facing_helper: 'Which side of the screen is the actor facing?',
                    scene_actor_animation_type_label: 'Type of animation',
                    scene_actor_animation_type_helper:
                        'The type of animation that this keyframe will have, it could be set for transition between animation. For example: For the character entrance, the first animation would be a fade in, and the second would be a idle with the final position on the scene',
                    scene_actor_animation_scale_label: 'Scale Percentage',
                    scene_actor_animation_scale_helper: 'How much in percent the scale of the element will expand/contract from the default size',
                    scene_actor_x_offset: 'X-axis offset',
                    scene_actor_y_offset: 'Y-axis offset',
                    scene_actor_x_offset_helper: 'Set the value of offset in X axis (from 0 to 100)',
                    scene_actor_y_offset_helper: 'Set the value of offset in Y axis (from 0 to 100)',
                    scene_node_add: 'Add Child Node',
                    scene_node_remove: 'Remove Node',
                    scene_node_copy: 'Copy Parent Node as Child',
                    scene_node_edit: 'Edit Node',
                    add_link_condition: 'Add Condition for Proguession',
                    remove_link_condition: 'Remove Condition for Proguession',
                    scene_link_choice_label: 'Choice Label',
                    scene_link_choice_helper: 'Label that will appear on the condition button when the player ends the parent scene and the transition is triggered.',
                    scene_link_normal_type_helper:
                        'The Regular Progression indicates that the parent will transition to the children scene without any checks or choices, the default progression.',
                    scene_link_hidden_type_helper:
                        'The Hidden Check Connection is a simple conditional connection that does not present to the player any feedback that a check was made.',
                    scene_link_choice_type_helper:
                        'The Choice Connection is a simple branching of the event tree, it require a label for the choice button, and may have a condition to be unlocked.',
                    button_submit_edited_event: 'Select Event',
                    add_actor: 'Add Actor to Event',
                    edit_background_cta: 'Change Background',
                    background_file_search: 'Local File',
                    background_resources_search: 'Game File',
                    scene_effect_heading: 'Scene Effects',
                    scene_effect_helper:
                        'Here you can configure the effects that this scene will have on the world when it is finished, such as relationship change between two actors, if the attributes of another character should change, or any other effect in the game state. If this effect should only happen on a specific condition or world state, be sure to add that condition to the scene connection conditions',
                    scene_effect_button_add_effect: 'Add Effect To World',
                    scene_effect_button_add_flag_actor: "Add Flag to Event's Actor",
                    scene_effect_button_add_flag_any: 'Add Flag to World/Character',
                    scene_effect_label_actors_select: 'Target Actor',
                    scene_effect_label_flags_select: 'Event Flag',
                    scene_effect_world_effect_display_name: 'World Effect {{index}}',
                    scene_result_no_actors: 'There is currently no actors associated with the current event, please add them so that this list can be populated.',
                    scene_result_no_flags: 'There is currently no flags associated with the current event, please add them so that this list can be populated.',
                    event_options_helper:
                        'An event may have several effects or a Visual Novel associated with it, the effects happen immediately after the event is triggered and no visual feedback will be seen by the player; If the event has a visual novel the effects will happen, but others specific effects associated with scenes and choices are included inside the visual novel',
                    event_id_label: 'Event ID',
                    event_display_name_label: 'Event Display Name',
                    event_add_visual_novel: 'Add Visual Novel',
                    event_add_event_effect: 'Add New Effect',
                    event_open_flags_modal: 'Modify Event Flags',
                    event_open_info_modal: 'Modify Event Basic Info',
                    submit_event_button_label: 'Save Event',
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
            unknown: 'Unknown',
            undefined: 'Undefined',
            attribute: {
                category: {
                    basic: 'Basic',
                    sun: 'Sunlight',
                    moon: 'Moonlight',
                    star: 'Starlight',
                    staff: 'Staff',
                },
                growth: {
                    technical: 'Technical',
                    mental: 'Mental',
                    physical: 'Physical',
                },
            },
            actor: {
                variables: {
                    type: 'Type of Actor',
                    spritePath: 'Sprite Path',
                    characterID: 'Character',
                    id: 'ID',
                    alias: 'Alias',
                    agency: 'Employee of Agency',
                    isPlayer: 'Is Player Character',
                    isActive: 'Is Active',
                    nationality: 'Nationality',
                    hometown: 'Hometown',
                },
            },
            character: {
                type: {
                    staff: 'Staff',
                    active_dreamer: 'Dreamer',
                    retired_dreamer: 'Retired Dreamer',
                },
                culture: {
                    wakoku: 'Wakokuan',
                    germania: 'Germanian',
                    lechia: 'Lechian',
                },
                status: {
                    energy: 'Energy',
                    stress: 'Stress',
                    mood: 'Mood',
                },
                affluence: {
                    destitute: 'Destitute',
                    very_poor: 'Very Poor',
                    poor: 'Poor',
                    middle_class: 'Middle Class',
                    upper_middle_class: 'Upper Middle Class',
                    rich: 'Rich',
                    prosperous: 'Prosperous',
                    luxurious: 'Luxurious',
                    nobility: 'Nobility',
                },
                variables: {
                    id: 'ID',
                    name: 'First Name',
                    surname: 'Surname',
                    nickname: 'Nickname',
                    birthday: 'Birthday',
                    age: 'Age',
                    ethnicity: 'Ethnicity',
                    gender: 'Gender',
                    flags: 'Event Flags',
                    residence_location: 'Residence Location',
                    affluence: 'Affluence',
                    height: 'Height',
                },
                attributes: {},
            },
            dreamer: {
                family: {
                    supportive: 'Supportive',
                    orphan: 'Orphan',
                    war_orphan: 'War Orphan',
                    stable: 'Stable',
                    unstable: 'Unstable',
                    widower: 'Widowed Father',
                    widow: 'Widowed Mother',
                    war_widow: 'Mother Widowed from War',
                    divorced: 'Divorced',
                },
                variables: {
                    family: 'Family Situation',
                    potential: 'Individual Potential',
                    intelligence: 'Intelligence',
                    physical_condition: 'Physical Condition',
                    attractiveness: 'Attractiveness',
                    charisma: 'Charisma',
                    willpower: 'Willpower',
                    leadership: 'Leadership',
                    teamwork: 'Teamwork',
                    stamina: 'Stamina',
                    fitness: 'Fitness',
                    singing: 'Singing',
                    dancing: 'Dancing',
                    coordination: 'Coordination',
                    improvisation: 'Improvisation',
                    composure: 'Composure',
                    memorization: 'Memorization',
                    bravery: 'Bravery',
                    creativity: 'Creativity',
                    expressivity: 'Expressivity',
                    acting: 'Acting',
                    lyricism: 'Lyricism',
                    seduction: 'Seduction',
                    entertainment: 'Entertainment',
                    persuasion: 'Persuasion',
                    elegancy: 'Elegancy',
                    empathy: 'Empathy',
                    weight: 'Weight',
                    fat_percentage: 'Fat Percentage',
                },
            },
            condition: {
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
                    entity: {
                        any_true: 'Any entity satisfy the filter',
                        all_false: 'No entity satisfy the filter',
                        number_x_true: 'An specific number satisfy the filter',
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
                status: {
                    favor: 'Favorable',
                    love: 'Romantic',
                    power: 'Power Dynamic',
                    attraction: 'Attractiveness',
                    respect: 'Respect',
                    originChar: 'Opinion Holder',
                    targetChar: 'Opinion Target',
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
            nation: {
                government: {
                    representative_democracy: 'Representative Democracy',
                    presidential_republic: 'Presidential Republic',
                    military_junta: 'Military Junta',
                    plutocracy: 'Plutocracy',
                    technocracy: 'Technocracy',
                    theocracy: 'Theocracy',
                    absolute_monarchy: 'Absolute Monarchy',
                    constitutional_monarchy: 'Constitutional Monarchy',
                    anarchy: 'Anarchy',
                },
                base: {
                    danube: 'Kingdom of Danube',
                    elbe: 'Elbean Commonwealth',
                    rhine: 'Confederation of the Rhine',
                    wakoku: 'Wakoku Republic',
                    lechia: 'Lechian Confederation',
                },
            },
            city: {
                base: {
                    hamburg: 'Hamburg',
                    gifu: 'Gifu',
                },
            },
            entity: {
                actors: 'Actors',
                traits: 'Traits',
                characters: 'Characters',
                flags: 'Event Flags',
                relationship: 'Relationship',
                staff: 'Staff',
                agency: 'Agencies',
                companies: 'Companies',
                locations: 'Locations',
                nations: 'Nations',
            },
            variable: {
                operator: {
                    bigger_than: 'Bigger than',
                    equal_or_bigger_than: 'Equal or bigger than',
                    lesser_than: 'Less than',
                    equal_or_lesser_than: 'Equal or less than',
                    equals_to: 'Equals to / Is',
                    dont_equals_to: 'Does not equals to / Is Not',
                    contains: 'Contains / Has',
                    dont_contain: "Does not contain / Don't have",
                    starts_with: 'Starts with',
                },
            },
            modifier: {
                type: {
                    attr_value: 'Current attribute value',
                    attr_multiplier: 'Attribute value gain multiplier',
                    attr_potential: 'Potential attribute value',
                    entity_variable: 'Entity Variable Value',

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
                    entity: 'Entity Modification',
                    relationship: 'Relationship modifiers',
                    trait: 'Traits modifiers',
                    event: 'Event modifiers',
                    static: 'Character values modifier',
                },
                targeting: {
                    specific_filter: 'Manually Create a Filter',
                    protagonist: 'Main Character',
                    allStudioDreamers: 'All Dreamers of Main Studio',
                    allStudioStaff: 'All Staff of Main Studio',
                    allStudioEmployees: 'Everyone on Main Studio',
                    everyCharacter: 'All Characters',
                    self: 'This Character',
                    selfProducer: "This Character's Producer",
                    selfFriends: "This Characters's Friends",
                    selfRivals: "This Character's Rivals",
                    mainStudio: 'Main Studio',
                    allActors: 'All actors in this Event',
                },
            },
            event: {
                actor: {
                    type: {
                        generic: 'Generic Actor',
                        specific: 'Specific Actor',
                        dynamic: 'Filtered Actor',
                        mainCharacter: 'Main Character Actor',
                    },
                },
                animation: {
                    type: {
                        idle: 'Idle',
                        fadeIn: 'Fade in',
                        fadeOut: 'Fade out',
                        moveLeft: 'Move/Face Left',
                        moveRight: 'Move/Face Right',
                        getCloser: 'Get Closer',
                        getFarther: 'Get Farther',
                    },
                },
                connection: {
                    type: {
                        normal: 'Regular Progression',
                        choice: 'Regular Choice Option',
                        hidden: 'Hidden Condition Check',
                    },
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
