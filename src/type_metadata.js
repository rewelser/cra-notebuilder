const type_metadata = {
    // "typekeys_arr": ["quality", "entity", "story"],
    // "type_subtype_names": {
    //     "0": "story",
    //     "1": "turn",
    //     "2": "character",
    //     "3": "group",
    //     "4": "locale",
    //     "5": "formcons",
    //     "6": "numen"
    // },
    "types_subtypes": {
        "Quality": {
            "0": "Passage",
            "1": "Relation",
            "2": "Motif",
            "3": "Theme"
        },
        "Entity": {
            "0": "Character",
            "1": "Group",
            "2": "Formation",
            "3": "Construct",
            "4": "Numen"
        },
        "Story": null,
        "Turn": null
    },
    "type_subtype_defaults": {
        "default_type": "Quality",
        "default_subtype": "Relation"
    },
    "color_schemes": {
        "Quality": "#ffdaea",
        "Passage": "#009688",
        "Relation": "#8BC34A",
        "Motif": "#FFC107",
        "Theme": "#FF9800",
        "Entity": "#ffdaea",
        "Character": "#f5beff",
        "Group": "#ddbeff",
        "Locale": "#c1beff",
        "Formation": "#bed5ff",
        "Construct": "#bed5ff",
        "Numen": "#cae5f5",
        "Story": "#ff6d6f",
        "Turn": "#e5ffaa"
    },
    "Quality": {
        "orphanable": "Entity_tags",
        "tagsearches": {
            "Story_tags": ["Story_tags"],
            "Turn_tags": ["Turn_tags"],
            "Entity_tags": ["Character_tags", "Group_tags", "Locale_tags", "Formation_tags", "Construct_tags", "Numen_tags"]
        }
    },
    "Entity": {
        "orphanable": false,
        "tagsearches": {
            "Story_tags": ["Story_tags"],
            "Turn_tags": ["Turn_tags"]
        }
    },
    "Story": {
        "orphanable": false,
        "tagsearches": {
            "Turn_tags": ["Turn_tags"],
            "Entity_tags": ["Character_tags", "Group_tags", "Locale_tags", "Formation_tags", "Construct_tags", "Numen_tags"]
        }
    },
    "Turn": {
        "orphanable": false,
        "tagsearches": {
            "Turn_tags": ["Turn_tags"],
            "Entity_tags": ["Character_tags", "Group_tags", "Locale_tags", "Formation_tags", "Construct_tags", "Numen_tags"]
        }
    }
}