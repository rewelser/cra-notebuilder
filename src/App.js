import React from 'react';
// import logo from './logo.svg';
// import { ReactComponent as Logo } from './logo.svg';
// import { ReactComponent as NotebookIcon } from './notebook_icon.svg';
import { ReactComponent as NotebookIcon } from './notebook_icon_red.svg';
import { ReactComponent as NotebookBig } from './notebook_big_thckr_2.svg';
import './App.css';
import _ from 'lodash';
import * as firebase from 'firebase';

const FocusTrap = require('focus-trap-react');
// const cloneDeep = require('lodash.clonedeep');


// const firebase = require('firebase');
const fbase = firebase.initializeApp({
    apiKey: "AIzaSyAcqZGHMkYrauZiKu_KFIHIMbsGALfHedA",
    authDomain: "welserver-b6a02.firebaseapp.com",
    databaseURL: "https://welserver-b6a02.firebaseio.com",
    projectId: "welserver-b6a02",
    storageBucket: "welserver-b6a02.appspot.com",
    messagingSenderId: "168014149590",
    appId: "1:168014149590:web:9f99527ef1d5cf19289677"
});


const type_metadata = {
    "types_subtypes": {
        "Quality": ["Passage", "Relation", "Motive", "Theme"],
        "Entity": ["Character", "Group", "Formation", "Construct", "Numen"],
        "Story": null,
        "Turn": null
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

let generic_tag = {
    "meta_type": "Quality",
    "meta_subtype": "Relation",
    "title": "",
    "preliminary_description": "",
    "Story_tags": {},
    "Turn_tags": {},
    "Entity_tags": {
        "Character_tags": {},
        "Group_tags": {},
        "Locale_tags": {},
        "Formation_tags": {},
        "Construct_tags": {},
        "Numen_tags": {}
    }
}

let q1 = {
    "meta_type": "Quality",
    "meta_subtype": "Passage",
    "title": "This is a Title!",
    // "preliminary_description": "this is a description. \n it will go inside a textarea. \n ..... \n fuggit.",
    // "preliminary_description": "012345\n678910",
    "preliminary_description": "Daniel: Ahhh yes! We've been expecting you. There are several ways to do this and the choice is yours.\nEvan: Dussy pick!",
    // "preliminary_description": "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    "Story_tags": {},
    "Turn_tags": {},
    "Entity_tags": {
        "Character_tags": {
            "Daniel": {
                "tagsearch": "Character_tags",
                // "substrings": ["2,5", "7,20"]
                "substrings": ["0,102"],
                "substrings": ["90,102"]
                // "substrings": []
            },
            "Yevan": {
                "tagsearch": "Character_tags",
                // "substrings": ["102,120"]
                // "substrings": ["110,120"]
                "substrings": ["3,16"]
                // "substrings": []
            },
        },
        "Group_tags": {},
        "Locale_tags": {},
        "Formation_tags": {},
        "Construct_tags": {},
        "Numen_tags": {}
    },
}

let q2 = {
    "meta_type": "Quality",
    "meta_subtype": "Passage",
    "title": "TITLE 2",
    "preliminary_description": "Descr the 2nd. \n it will go inside a textarea. \n ..... \n fuggit again.",
    "Story_tags": {
        "test2": {
            "tagsearch": "Story_tags",
            "substrings": []
        },
        "snake2": {
            "tagsearch": "Story_tags",
            "substrings": []
        },
    },
    "Turn_tags": {
        "T1": {
            "tagsearch": "Turn_tags",
            "substrings": []
        },
    },
    "Entity_tags": {
        "Character_tags": {},
        "Group_tags": {},
        "Locale_tags": {},
        "Formation_tags": {},
        "Construct_tags": {},
        "Numen_tags": {}
    }
}

let qarr = [q1, q2];

var tagarr_dictionary = {
    "Story_tags": ["Story 1", "Story 2", "Story 3"],
    "Turn_tags": ["Turn 1", "Turn 2", "Turn 3"],
    "Character_tags": ["Character 1", "Character 2", "Character 3"],
    "Group_tags": ["Group 1", "Group 2", "Group 3"],
    "Locale_tags": ["Locale 1", "Locale 2", "Locale 3"],
    "Formation_tags": ["Formation 1", "Formation 2", "Formation 3"],
    "Construct_tags": ["Construct 1", "Construct 2", "Construct 3"],
    "Numen_tags": ["Numen 1", "Numen 2", "Numen 3"]
}

function findObj(obj, goal_key) {
    var goal_nested_obj;
    for (var key in obj) {
        if (key === goal_key) {
            return obj;
        } else if (obj[key].constructor.name === "Object") {
            goal_nested_obj = findObj(obj[key], goal_key);
        }
    }
    return goal_nested_obj;
}

class SingleNote extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            identifier_height: 40,
            identifier_height_clicked: 0,
            clicked_class: "",
            tag_ranges_showed: "",
            tags_ranges_shown: [],
            new_text: ""
        }
        // this.handleDescrClick = this.handleDescrClick.bind(this);
        this.tagzone_ref = React.createRef();
        this.descrarea_ref = React.createRef();
    }

    componentDidMount() {
        this.setState({ identifier_height_clicked: this.tagzone_ref.current.offsetHeight + 45 });
    }

    showmoreClick() {
        this.state.clicked_class === "clicked" ? this.setState({ clicked_class: "" }) : this.setState({ clicked_class: "clicked" });
    }

    // handleDescrClick(e) {
    //     let ranges = [];
    //     if (window.getSelection) {

    //         let range = window.getSelection().getRangeAt(0);
    //         let start = range.startOffset;
    //         let end = range.endOffset;
    //         let start_node = range.startContainer;
    //         let end_node = range.endContainer;

    //         if (!range.collapsed && end !== 0) {
    //             let desc = this.props.data_obj.preliminary_description;

    //             let length_start = 0;
    //             for (let i = 0; i < this.descrarea_ref.current.childNodes.length; i++) {
    //                 let childnode = this.descrarea_ref.current.childNodes[i];
    //                 if (childnode.nodeName === "MARK") {
    //                     if (childnode.childNodes[0] === start_node) {
    //                         break;
    //                     } else {
    //                         length_start += childnode.childNodes[0].textContent.length;
    //                     }
    //                 } else if (childnode.nodeName === "#text") {
    //                     if (childnode === start_node) {
    //                         length_start += start;
    //                         break;
    //                     } else {
    //                         length_start += childnode.textContent.length;
    //                     }
    //                 }
    //             }

    //             console.log(length_start);


    //             let length_end = 0;
    //             for (let i = 0; i < this.descrarea_ref.current.childNodes.length; i++) {
    //                 let childnode = this.descrarea_ref.current.childNodes[i];
    //                 if (childnode.nodeName === "MARK") {
    //                     if (childnode.childNodes[0] === end_node) {
    //                         length_end += childnode.childNodes[0].length;
    //                         break;
    //                     } else {
    //                         length_end += childnode.childNodes[0].textContent.length;
    //                     }
    //                 } else if (childnode.nodeName === "#text") {
    //                     if (childnode === end_node) {
    //                         length_end += end;
    //                         break;
    //                     } else {
    //                         length_end += childnode.textContent.length;
    //                     }
    //                 }
    //             }

    //             console.log(length_end);


    //             let new_text = (
    //                 <>
    //                     {desc.substring(0, length_start)}
    //                     <mark>
    //                         {/* {range.toString()} */}
    //                         {desc.substring(length_start, length_end)}
    //                     </mark>
    //                     {desc.substring(length_end, desc.length)}
    //                 </>
    //             )
    //             console.log("----------------------------");
    //             console.log(new_text);
    //             console.log(new_text.props.children[0]);
    //             console.log(new_text.props.children[1].props.children);
    //             console.log(new_text.props.children[2]);

    //             this.setState({ new_text: new_text });
    //         }

    //     }
    // }


    // componentDidMount() {
    //     Object.entries(this.props.tagsearches).map(([type_key, type_value]) =>
    //         type_value.map(tagsearch =>
    //             Object.entries(findObj(this.props.data_obj, tagsearch)[tagsearch]).map(([type_key, type_value]) => {
    //                 // console.log(type_value.substrings);
    //                 let desc = this.props.data_obj.preliminary_description;
    //                 let buffer = [];
    //                 let prev_end = 0;
    //                 if (type_value.substrings.length) {
    //                     for (let i = 0; i < type_value.substrings.length; i++) {
    //                         let range = type_value.substrings[i].split(",");
    //                         if (i === 0) {
    //                             buffer.push(desc.substring(0, range[0]));
    //                         } else {
    //                             buffer.push(desc.substring(prev_end, range[0]));
    //                         }
    //                         prev_end = range[1];
    //                         buffer.push(
    //                             <mark>{desc.substring(range[0], range[1])}</mark>
    //                         )
    //                         // console.log(range[0]);
    //                         // console.log(range[1]);
    //                         if (i + 1 === type_value.substrings.length) {
    //                             buffer.push(desc.substring(range[1], desc.length));
    //                         }
    //                     }
    //                     this.setState({ new_text: buffer });
    //                 }
    //                 console.log(buffer);

    //             })
    //         )
    //     )
    // }

    toggleHighlightRanges(tagsearch_type_key, type_value) {
        // console.log(type_value.substrings);
        console.log(tagsearch_type_key);
        console.log(tagsearch_type_key);
        let tags_ranges_shown = [...this.state.tags_ranges_shown];
        let to_delete = [];
        let contains_tagsearch_type_key = this.tagRangesShownInclude(tagsearch_type_key);

        if (!contains_tagsearch_type_key) {

            let desc = this.props.data_obj.preliminary_description;
            let buffer = [];
            let prev_end = 0;
            if (type_value.substrings.length) {
                for (let i = 0; i < type_value.substrings.length; i++) {
                    let range = type_value.substrings[i].split(",");
                    if (i === 0) {
                        buffer.push(desc.substring(0, range[0]));
                    } else {
                        buffer.push(desc.substring(prev_end, range[0]));
                    }
                    prev_end = range[1];
                    buffer.push(
                        <mark
                            className="ranges_mark"
                            key={`${tagsearch_type_key}_${i}`}
                            style={this.props.lightdarkColorCalcRangesShown(type_value.tagsearch.replace("_tags", ""))}
                        >
                            {desc.substring(range[0], range[1])}
                        </mark>
                    )
                    if (i + 1 === type_value.substrings.length) {
                        buffer.push(desc.substring(range[1], desc.length));
                    }
                }
                tags_ranges_shown.push([tagsearch_type_key, buffer]);
                this.setState({ tags_ranges_shown: tags_ranges_shown });
            } else {
                tags_ranges_shown.push([tagsearch_type_key, []]);
                this.setState({ tags_ranges_shown: tags_ranges_shown });
            }
        } else {
            for (let i = 0; i < tags_ranges_shown.length; i++) {
                if (tags_ranges_shown[i][0] === tagsearch_type_key) {
                    to_delete.push(i);
                }
            }
            for (let i = 0; i < to_delete.length; i++) {
                tags_ranges_shown.splice(to_delete[i], 1);
            }
            this.setState({ tags_ranges_shown: tags_ranges_shown });

        }

        // if (tagsearch_type_key !== this.state.tag_ranges_showed) {
        //     this.setState({ tag_ranges_showed: tagsearch_type_key });
        //     let desc = this.props.data_obj.preliminary_description;
        //     let buffer = [];
        //     let prev_end = 0;
        //     if (type_value.substrings.length) {
        //         for (let i = 0; i < type_value.substrings.length; i++) {
        //             let range = type_value.substrings[i].split(",");
        //             if (i === 0) {
        //                 buffer.push(desc.substring(0, range[0]));
        //             } else {
        //                 buffer.push(desc.substring(prev_end, range[0]));
        //             }
        //             prev_end = range[1];
        //             buffer.push(
        //                 <mark
        //                     className="ranges_mark"
        //                     key={`${tagsearch_type_key}_${i}`}
        //                     style={this.props.lightdarkColorCalcRanges(type_value.tagsearch.replace("_tags", ""))}
        //                 >
        //                     {desc.substring(range[0], range[1])}
        //                 </mark>
        //             )
        //             // console.log(range[0]);
        //             // console.log(range[1]);
        //             if (i + 1 === type_value.substrings.length) {
        //                 buffer.push(desc.substring(range[1], desc.length));
        //             }
        //         }
        //         this.setState({ new_text: buffer });
        //     } else {
        //         this.setState({ new_text: "" });
        //     }
        //     console.log(buffer);
        // } else {
        //     this.setState({ tag_ranges_showed: "" });
        //     this.setState({ new_text: "" });
        // }
    }

    tagRangesShownInclude(tagsearch_type_key) {
        let contains_tagsearch_type_key = false;
        for (let i = 0; i < this.state.tags_ranges_shown.length; i++) {
            this.state.tags_ranges_shown[i][0] === tagsearch_type_key && (contains_tagsearch_type_key = true);
        }
        return contains_tagsearch_type_key;
    }

    render() {
        return (
            <section className="single_note data_parent">
                <div className="row">
                    <section className="single_note_description_section">
                        <section className="single_note_type_identifier"
                            style={{ height: (this.state.clicked_class === "clicked" ? this.state.identifier_height_clicked : this.state.identifier_height) + "px" }}
                        >
                            <div className="identifier_header">
                                <div className="identifier_header_meta_type_andor_subtype">
                                    <span
                                        className="tag_item"
                                        style={this.props.lightdarkColorCalc(this.props.data_obj.meta_subtype)}
                                    >
                                        {this.props.data_obj.meta_subtype}
                                    </span>
                                </div>
                                <button className={`showmore small_button lightdark_w_color ${this.state.clicked_class}`}
                                    onClick={() => this.showmoreClick()}
                                >
                                    see tags
                              </button>
                            </div>
                            <div
                                className="identifier_tagzone"
                                ref={this.tagzone_ref}
                            >
                                {
                                    Object.entries(this.props.tagsearches).map(([type_key, type_value]) =>
                                        type_value.map(tagsearch =>
                                            Object.entries(findObj(this.props.data_obj, tagsearch)[tagsearch]).map(([type_key, type_value]) =>
                                                <span
                                                    key={tagsearch.replace("_tags", "") + "_" + type_key}
                                                    className={`tag_item noselect ${this.tagRangesShownInclude(tagsearch.replace("_tags", "") + "_" + type_key) ? "tag_ranges_shown" : ""}`}
                                                    style={this.props.lightdarkColorCalc(tagsearch.replace("_tags", ""))}
                                                    onClick={() => this.toggleHighlightRanges((tagsearch.replace("_tags", "") + "_" + type_key), type_value)}
                                                >
                                                    {type_key}
                                                </span>
                                            )
                                        )
                                    )
                                }
                            </div>
                        </section>
                        <section className="single_note_title">{this.props.data_obj.title}</section>
                        <section
                            className="single_note_description"
                            // onClick={this.handleDescrClick}
                            ref={this.descrarea_ref}
                        >
                            {this.props.data_obj.preliminary_description}
                            {
                                Object.entries(this.props.tagsearches).map(([type_key, type_value]) =>
                                    type_value.map(tagsearch =>
                                        Object.entries(findObj(this.props.data_obj, tagsearch)[tagsearch]).map(([type_key, type_value]) =>
                                            this.state.tags_ranges_shown.map(tag_ranges_shown =>
                                                (tagsearch.replace("_tags", "") + "_" + type_key === tag_ranges_shown[0]) &&
                                                <div
                                                    className="posabs_descr_range"
                                                    key={tagsearch.replace("_tags", "") + "_" + type_key}
                                                >
                                                    {tag_ranges_shown[1]}
                                                </div>
                                            )
                                        )
                                    )
                                )
                            }
                        </section>
                    </section>
                    <section className="single_note_edit_btn_section">
                        <button
                            className="edit_context_btn material-icons noselect"
                            onClick={() => this.props.openMenuActivitySlider("edit_panel", this.props.data_obj)}
                        >
                            edit
                      </button>
                    </section>
                </div>
            </section>
        );
    }
}

const e = React.createElement;

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menu_state: "",
            menu_data_state: "",
            menu_focustrap_state: false,
            darkmode_state: "",
            app_type_metadata: Object.assign({}, type_metadata),
            curr_tag: {},
            object_data: "",
            loadable_notes: [...qarr],
            modal_open: false,
            modal_args: {},
            modal_return: {},
            userid: "fishy"
        }
    }

    componentDidMount() {
        const user_ref = firebase.database().ref().child('users').child(this.state.userid);
        user_ref.on('value', snap => {
            this.setState({
                darkmode_state: snap.val().darkmode_state
            });
        });
    }

    toggleDarkMode() {
        const user_ref = firebase.database().ref().child('users').child(this.state.userid);
        this.state.darkmode_state === "" ?
            firebase.database().ref(user_ref).update({ darkmode_state: "darkmode" }) :
            firebase.database().ref(user_ref).update({ darkmode_state: "" });
    }

    lightdarkColorCalc(tagtype) {
        let lightdarkstyle;
        if (this.state.darkmode_state !== "darkmode") {
            lightdarkstyle = {
                color: "rgba(0,0,0,0.7)",
                backgroundColor: this.state.app_type_metadata.color_schemes[tagtype],
            }
        } else {
            lightdarkstyle = {
                color: this.state.app_type_metadata.color_schemes[tagtype],
                // backgroundColor: "rgba(0,0,0,0.2)",
                backgroundColor: "#1a1a1d"
            }
        }
        return lightdarkstyle;
    }

    lightdarkColorCalcRangesShown(tagtype) {
        let lightdarkstyle;
        if (this.state.darkmode_state !== "darkmode") {
            lightdarkstyle = {
                color: "rgba(0,0,0,0.7)",
                backgroundColor: this.state.app_type_metadata.color_schemes[tagtype],
            }
        } else {
            lightdarkstyle = {
                boxShadow: "0 0 0 2pt" + this.state.app_type_metadata.color_schemes[tagtype] + "88",
                // backgroundColor: "rgba(0,0,0,0.2)",
                backgroundColor: "transparent"
            }
        }
        return lightdarkstyle;
    }

    lightdarkColorCalcRanges(tagtype) {
        let lightdarkstyle = {
            color: "rgba(0,0,0,0.7)",
            backgroundColor: this.state.app_type_metadata.color_schemes[tagtype]
        }
        return lightdarkstyle;
    }

    openMenuActivitySlider(text, data_obj) {
        this.setState({ menu_data_state: text });
        this.setState({ menu_state: "activity_panel_slider_open" });
        this.setState({ menu_focustrap_state: true });
        if (text === "add_panel") {
            // this.setState({ curr_tag: Object.assign({}, generic_tag) });
            this.setState({ curr_tag: _.cloneDeep(generic_tag) });

        } else if (text === "edit_panel") {
            // this.setState({ curr_tag: Object.assign({}, data_obj) });
            this.setState({ curr_tag: _.cloneDeep(data_obj) });
        }
    }

    closeMenuActivitySlider() {
        this.setState({ menu_state: "" });
        this.setState({ menu_focustrap_state: false });

    }

    switchMenuActivitySlider(text) {
        Promise.resolve(
            this.setState({ menu_state: "" }),
        ).then(p => {
            setTimeout(() => {
                this.setState({ menu_state: "activity_panel_slider_open" });
                this.setState({ menu_data_state: text });
            }, 600)
            return p;
        });
    }

    toggleModal(modal_args) {
        this.setState({
            modal_open: !this.state.modal_open,
            modal_args: modal_args
        });
    }

    setModalReturn(modal_return) {
        this.setState({ modal_return: modal_return });
    }

    render() {
        return (
            <section id="app" className={`lightdark_w_color ${this.state.darkmode_state} ${this.state.menu_state} ${(this.state.modal_open ? "modal_open" : "")}`}>
                <section id="page-wrapper">
                    <section id="page_subject">
                        <h1>Fish Tacos</h1>
                        {
                            this.state.loadable_notes.map(data_obj =>
                                <SingleNote
                                    key={data_obj.title}
                                    openMenuActivitySlider={(text, data_obj) => this.openMenuActivitySlider(text, data_obj)}
                                    data_obj={data_obj}
                                    lightdarkColorCalc={(tagtype) => this.lightdarkColorCalc(tagtype)}
                                    lightdarkColorCalcRanges={(tagtype) => this.lightdarkColorCalcRanges(tagtype)}
                                    lightdarkColorCalcRangesShown={(tagtype) => this.lightdarkColorCalcRangesShown(tagtype)}
                                    tagsearches={this.state.app_type_metadata[data_obj.meta_type].tagsearches}
                                />
                            )
                        }

                    </section>
                </section>
                <FocusTrap
                    active={this.state.menu_focustrap_state}
                >
                    <Menu
                        toggleDarkMode={() => this.toggleDarkMode()}
                        darkmode_state={this.state.darkmode_state}
                        openMenuActivitySlider={(text) => this.openMenuActivitySlider(text)}
                        closeMenuActivitySlider={() => this.closeMenuActivitySlider()}
                        switchMenuActivitySlider={(text) => this.switchMenuActivitySlider(text)}
                        menu_state={this.state.menu_state}
                        menu_data_state={this.state.menu_data_state}
                        app_type_metadata={this.state.app_type_metadata}
                        curr_tag={this.state.curr_tag}
                        lightdarkColorCalc={(tagtype) => this.lightdarkColorCalc(tagtype)}
                        lightdarkColorCalcRanges={(tagtype) => this.lightdarkColorCalcRanges(tagtype)}
                        toggleModal={(modal_args) => this.toggleModal(modal_args)}
                        modal_return={this.state.modal_return}
                    />
                </FocusTrap>
                {(this.state.modal_open) &&
                    <Modal
                        modal_args={this.state.modal_args}
                        toggleModal={(modal_args) => this.toggleModal(modal_args)}
                        setModalReturn={(modal_return) => this.setModalReturn(modal_return)}
                        lightdarkColorCalc={(tagtype) => this.lightdarkColorCalc(tagtype)}
                    />
                }
            </section>
        );
    }
}

class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected_dummy_tag: ""
        }
        this.handleDummyTagEnter = this.handleDummyTagEnter.bind(this);
    }

    selectDummyTag(text) {
        this.setState({ selected_dummy_tag: text });
    }

    handleDummyTagEnter(e) {
        if (e.keyCode === 13) {
            this.props.setModalReturn({ [this.props.modal_args.tagsearch.curval]: this.state.selected_dummy_tag });
            this.props.toggleModal({});
        }
    }

    render() {
        return (
            <FocusTrap>
                <section id="modal_container">
                    <section id="modal">
                        {(Object.entries(this.props.modal_args)[0][0] === "tagsearch") ? (
                            <>
                                <h3>There are multiple possible subtypes for this tag.</h3>
                                <section className="modal_show_inlineblock_wrapper">
                                    <section id="proposed_tag_value" className="modal_show_tag_area">
                                        <span className="tag_item tag_blank">{this.props.modal_args.tagsearch.curval}</span>
                                    </section>
                                </section>
                                <h4>Choose one below:</h4>
                                <section id="subtype_choices" className="modal_show_tag_area">
                                    {
                                        this.props.modal_args.tagsearch.tagsearch_arr.map(tagsearch_arr_name =>
                                            <button
                                                key={tagsearch_arr_name}
                                                className={`tag_item dummy_tag_btn ${this.state.selected_dummy_tag === tagsearch_arr_name ? "selected new_tag" : ""}`}
                                                style={this.props.lightdarkColorCalc(tagsearch_arr_name.replace("_tags", ""))}
                                                onClick={() => this.selectDummyTag(tagsearch_arr_name)}
                                                onFocus={() => this.selectDummyTag(tagsearch_arr_name)}
                                                onKeyDown={this.handleDummyTagEnter}
                                            >
                                                {tagsearch_arr_name.replace("_tags", "")}
                                            </button>
                                        )
                                    }

                                </section>
                                <section id="modal_btns">
                                    <button
                                        id="cancel_create_new_tag_btn"
                                        onClick={() => this.props.toggleModal({})}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        id="create_new_tag_btn"
                                        className={`${this.state.selected_dummy_tag === "" ? "disabled" : ""}`}
                                        disabled={this.state.selected_dummy_tag === "" ? true : false}
                                        onClick={() => { this.props.setModalReturn({ [this.props.modal_args.tagsearch.curval]: this.state.selected_dummy_tag }); this.props.toggleModal({}); }}
                                    >
                                        Create Tag
                                    </button>
                                </section>
                            </>
                        ) :
                            <div>
                                {Object.entries(this.props.modal_args)[0][0]}
                                <input />
                            </div>
                        }
                    </section>
                </section>
            </FocusTrap>
        );
    }
}

class Menu extends React.Component {

    render() {
        const is_slider_open = this.props.menu_state === "activity_panel_slider_open";
        return (
            <section id="menu">
                <section id="section-addnew">
                    <button
                        id="addnew"
                        className="material-icons noselect"
                        onClick={() => { is_slider_open ? this.props.closeMenuActivitySlider() : this.props.openMenuActivitySlider("add_panel") }}
                    >
                        add
                  </button>
                </section>
                <section id="nav_menu_btns">
                    <button
                        id="view_notebooks_btn"
                        className={(is_slider_open && this.props.menu_data_state === "notebooks_panel") ? "notebooks_panel" : ""}
                        onClick={() => { (is_slider_open && this.props.menu_data_state !== "notebooks_panel") ? this.props.switchMenuActivitySlider("notebooks_panel") : this.props.openMenuActivitySlider("notebooks_panel") }}
                    >
                        <NotebookIcon />
                    </button>
                    <div id="lightdark_switch_container">
                        <label className="switch">
                            <input
                                type="checkbox"
                                id="darkmode_switch"
                                checked={this.props.darkmode_state === "darkmode" ? true : false}
                                onChange={this.props.toggleDarkMode}
                            />
                            <span className="slider round"></span>
                        </label>
                    </div>

                    {/* <span className="input_width_placeholder"></span> */}
                </section>
                <ActivityPanelSlider
                    menu_data_state={this.props.menu_data_state}
                    app_type_metadata={this.props.app_type_metadata}
                    curr_tag={this.props.curr_tag}
                    lightdarkColorCalc={(tagtype) => this.props.lightdarkColorCalc(tagtype)}
                    lightdarkColorCalcRanges={(tagtype) => this.props.lightdarkColorCalcRanges(tagtype)}
                    toggleModal={(modal_args) => this.props.toggleModal(modal_args)}
                    modal_return={this.props.modal_return}
                />
            </section>
        );
    }
}

class ActivityPanelSlider extends React.Component {

    render() {
        const menu_data_state = this.props.menu_data_state;
        return (
            <section id="activity_panel_slider">
                {(menu_data_state === "add_panel" || menu_data_state === "edit_panel") ? (
                    <AddEditPanel
                        menu_data_state={menu_data_state}
                        app_type_metadata={this.props.app_type_metadata}
                        curr_tag={this.props.curr_tag}
                        lightdarkColorCalc={(tagtype) => this.props.lightdarkColorCalc(tagtype)}
                        lightdarkColorCalcRanges={(tagtype) => this.props.lightdarkColorCalcRanges(tagtype)}
                        toggleModal={(modal_args) => this.props.toggleModal(modal_args)}
                        modal_return={this.props.modal_return}
                    />
                ) : (
                        <NotebookPanel />
                    )}
            </section>
        );
    }
}

const user_data = {
    default_notebook: ""
}

// const user_notebooks = {
//     0: {
//         title: "World for book!",
//         roles: ["author", "contributor", "viewer"]
//     },
//     1: {
//         title: "other world",
//         roles: ["contributor", "viewer"]
//     },
//     2: {
//         title: "third world",
//         roles: ["contributor", "viewer"]
//     }
// }

class NotebookPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notebookpanel_state: "list",
            userid: "fishy",
            // user_notebooks: _.cloneDeep(user_notebooks),
            user_notebooks: {},
            // user_data: _.cloneDeep(user_data),
            user_data: {},
            notebook_key: -1,
            default_notebook: ""
        }
    }

    componentDidMount() {
        // const user_ref = firebase.database().ref().child('users').child(this.state.userid);
        // const notebooks_ref = firebase.database().ref().child('notebooks');
        // user_ref.on('value', snap => {
        //     this.setState({
        //         default_notebook: snap.val().default_notebook,
        //         user_notebooks: snap.val().user_notebooks,
        //         user_notebook_objects: snap.val().user_notebooks.map((val, index) => {
        //             return index;
        //         })
        //     }, () => {
        //         notebooks_ref.on('value', snap => {
        //             this.setState((prevState) => ({
        //                 user_notebook_objects: prevState.user_notebooks.map((val, index) => {
        //                     return snap.child(index).val();
        //                 })
        //             }));
        //         });
        //     });
        // });


        // firebase.database().ref().on('value', snap => {
        //     const user_ref = snap.child('users').child(this.state.userid);
        //     const notebooks_ref = snap.child('notebooks');
        //     this.setState({
        //         default_notebook: user_ref.child("default_notebook").val(),
        //         user_notebooks: user_ref.child("user_notebooks").val(),
        //         user_notebook_objects: user_ref.child("user_notebooks").val().map((val, index) => {
        //             return notebooks_ref.child(index).val();
        //         })
        //     })
        // })


        firebase.database().ref().on('value', snap => {
            const user_ref = snap.child('users').child(this.state.userid);
            const notebooks_ref = snap.child('notebooks_surface_metadata');
            this.setState({
                default_notebook: user_ref.child("default_notebook").val(),
                user_notebooks: user_ref.child("user_notebooks").val(),
                user_notebook_objects: Object.fromEntries(Object.entries(user_ref.child("user_notebooks").val()).map(obj => {
                    return [notebooks_ref.child(obj[0]).key, notebooks_ref.child(obj[0]).val()];
                }))
            })
        })
    }

    setDefault(type_key) {
        const user_ref = firebase.database().ref().child('users').child(this.state.userid);
        firebase.database().ref(user_ref).update({
            default_notebook: type_key
        });
    }

    returnToList() {
        this.setState({
            notebookpanel_state: "list",
            notebook_key: -1
        });
    }

    render() {
        return (
            <section id="notebookpanel">
                <div id="notebook_big_svg_wrapper">
                    <div id="notebook_big_svg">
                        <NotebookBig />
                    </div>
                </div>

                {(this.state.notebookpanel_state === "list") ?
                    <section id="notebooks_section_wrapper">
                        <section id="notebooks_section">
                            <section id="add_new_notebook">
                                <button
                                    id="add_new_notebook_btn"
                                    className="lightdark material-icons"
                                    onClick={() => this.setState({ notebookpanel_state: "add_notebook" })}
                                >
                                    add
                                </button>
                            </section>

                            {
                               /*this.state.user_notebooks != null &&*/ Object.entries(this.state.user_notebooks).map(([type_key, type_value]) =>
                                <section
                                    key={type_key}
                                    className="notebook_section lightdark">
                                    <section className="options">
                                        <button
                                            className="visit_btn lightdark_w_color material-icons"
                                        // onClick={() => this.setState({
                                        //     notebookpanel_state: "edit_notebook",
                                        //     notebook_key: type_key
                                        // })}
                                        >
                                            arrow_forward
                                            </button>
                                        <button
                                            className={`settings_btn lightdark_w_color material-icons-outlined`}
                                            onClick={() => this.setState({
                                                notebookpanel_state: "edit_notebook",
                                                notebook_key: type_key
                                            })}
                                        >
                                            settings
                                            </button>
                                    </section>
                                    <section className="notebook_summary">
                                        <section className="display_title_section">
                                            <h1 className="notebook_summary_field lightdark display_title">
                                                {this.state.user_notebook_objects[type_key].title}
                                            </h1>
                                        </section>
                                        <section className="lastupdate_section">
                                            <span>Last updated:</span>
                                            <h2 className="notebook_summary_field lightdark lastupdate">
                                                {new Date(this.state.user_notebook_objects[type_key].lastupdate * 1000).toLocaleString()}
                                            </h2>
                                        </section>
                                        <section className="yourroles_section">
                                            <span>Your roles:</span>
                                            {
                                                type_value.map(role =>
                                                    <span
                                                        key={`${type_key}_${role}`}
                                                        title={role}
                                                        className={`yourroles ${role}`}
                                                    >
                                                    </span>
                                                )
                                            }
                                        </section>
                                    </section>
                                    <button
                                        title="set default notebook"
                                        className={`is_default is_default_notebook lightdark ${this.state.default_notebook === type_key ? "clicked" : ""} material-icons`}
                                        onClick={() => this.setDefault(type_key)}
                                    >
                                        favorite_border
                                    </button>
                                </section>
                            )
                            }
                        </section>
                    </section>
                    : (
                        <NotebookAddEdit
                            notebookpanel_state={this.state.notebookpanel_state}
                            user_notebooks={this.state.user_notebooks}
                            notebook_key={this.state.notebook_key}
                            returnToList={() => this.returnToList()}
                        />
                    )
                }
            </section>
        );
    }
}

class NotebookAddEdit extends React.Component {
    constructor(props) {
        super(props);
        const initial_notebook_name = firebase.database().ref().push().key;
        const initial_type_name = firebase.database().ref().push().key;
        this.state = {
            notebook_name: initial_notebook_name,
            name_titles_table: [],
            title: "New Notebook Title",
            default_notebook: "",
            default_type: initial_type_name,
            default_subtype: "",
            type_subtype_gens: [{
                name: initial_type_name,
                title: "Note",
                subtypes: []
            }],
            note_type: initial_type_name,
            type_subtype_metadata: {
                types_subtypes: {},
                color_schemes: {}
            },
            generic_tag: {},
            color_btn_clicked: "",
            renaming: "",
            orphanables: [],
            drawer_open: [false, ""],
            default_notebook: ""
        }
        this.input_ref = React.createRef();
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.addTypeGenSection = this.addTypeGenSection.bind(this);
        this.handleTypeNameChange = this.handleTypeNameChange.bind(this);
    }

    componentDidMount() {
        if (this.props.notebook_key !== -1) {
            firebase.database().ref().on('value', snap => {
                const user_ref = snap.child('users').child("fishy");
                const type_subtype_metadata = snap.child("notebooks_type-subtype_metadata").child(this.props.notebook_key);
                const generic_tag = snap.child("notebooks_generictags").child(this.props.notebook_key);
                const notebook_ref = snap.child('notebooks_surface_metadata').child(this.props.notebook_key);
                this.setState({
                    notebook_name: this.props.notebook_key,
                    default_notebook: user_ref.child("default_notebook").val(),
                    title: notebook_ref.child("title").val(),
                    name_titles_table: type_subtype_metadata.child("name_titles_table").val(),
                    type_subtype_metadata: type_subtype_metadata.child("types_subtypes").val(),
                    generic_tag: generic_tag.val()
                });
                let types_subtypes = type_subtype_metadata.child("types_subtypes").val();
                let type_subtype_gens = [];
                Object.entries(types_subtypes).map(([key, val]) => {
                    let type_subtype_gen = {
                        name: key,
                        title: type_subtype_metadata.child("name_titles_table").child(key).val(),
                        subtypes: val !== "" ? val.map((name) => {
                            return {
                                name: name,
                                title: type_subtype_metadata.child("name_titles_table").child(name).val()
                            }
                        }) : [],
                    }
                    type_subtype_metadata.child("name_titles_table").child(key).val() === type_subtype_metadata.child("note_type").val() ? type_subtype_gens.unshift(type_subtype_gen) : type_subtype_gens.push(type_subtype_gen);
                });
                this.setState({
                    type_subtype_gens: type_subtype_gens,
                    default_type: generic_tag.child("meta_type").val(),
                    default_subtype: generic_tag.child("meta_subtype").val(),
                    note_type: type_subtype_metadata.child("note_type").val()
                });
            })
        }
    }

    handleTitleChange(e) {
        const target = e.target;
        const value = target.value;
        const name = target.name;


        value.length <= 50 && this.setState({ title: value });
    }

    // generateNotebookObject() {

    // }

    handleTypeNameChange(e, index) {
        if (e.target.value.length < 40) {
            const type_subtype_gens = _.cloneDeep(this.state.type_subtype_gens);
            const name_titles_table = { ...this.state.name_titles_table };
            const name = type_subtype_gens[index]["name"];

            type_subtype_gens[index]["title"] = e.target.value;
            name_titles_table[name] = e.target.value;
            this.setState({
                type_subtype_gens: type_subtype_gens,
                name_titles_table: name_titles_table
            });
        }
    }

    handleSubtypeNameChange(e, index, subindex) {
        if (e.target.value.length < 40) {
            const type_subtype_gens = _.cloneDeep(this.state.type_subtype_gens);
            const name_titles_table = { ...this.state.name_titles_table };
            const name = type_subtype_gens[index]["subtypes"][subindex]["name"];
            type_subtype_gens[index]["subtypes"][subindex]["title"] = e.target.value;
            name_titles_table[name] = e.target.value;
            this.setState({
                type_subtype_gens: type_subtype_gens,
                name_titles_table: name_titles_table
            });
        }
    }

    addTypeGenSection() {
        const type_subtype_gens = _.cloneDeep(this.state.type_subtype_gens);
        const name_titles_table = { ...this.state.name_titles_table };
        const name = firebase.database().ref().push().key;
        const title = "New Type";
        type_subtype_gens.push({
            name: name,
            title: title,
            subtypes: []
        });
        name_titles_table[name] = title;
        this.setState({
            type_subtype_gens: type_subtype_gens,
            name_titles_table: name_titles_table
        });
    }

    addSubtypeGenSection(index) {
        const type_subtype_gens = _.cloneDeep(this.state.type_subtype_gens);
        const name_titles_table = { ...this.state.name_titles_table };
        const name = firebase.database().ref().push().key;
        const title = "New Subtype";
        type_subtype_gens[index]["subtypes"].push({
            name: name,
            title: title
        });
        name_titles_table[name] = title;
        this.setState({
            type_subtype_gens: type_subtype_gens,
            name_titles_table: name_titles_table
        }, () => {
            if (type_subtype_gens[index].name === this.state.default_type && type_subtype_gens[index]["subtypes"].length === 1) {
                this.setDefaultTypeSubtype();
            }
        });
    }

    removeTypeGenSection(index) {
        const type_subtype_gens = _.cloneDeep(this.state.type_subtype_gens);
        const name_titles_table = { ...this.state.name_titles_table };
        const name = type_subtype_gens[index]["name"];
        type_subtype_gens.splice(index, 1);
        name_titles_table[name] = undefined;
        this.setState(prevState => {
            let new_default_type;
            (name === prevState.default_type) ?
                new_default_type = "" :
                new_default_type = prevState.default_type;
            return {
                type_subtype_gens: type_subtype_gens,
                name_titles_table: name_titles_table,
                default_type: new_default_type
            }
        }, () => {
            this.setDefaultTypeSubtype();
        });
    }

    removeSubtypeGenSection(index, subindex) {
        const type_subtype_gens = _.cloneDeep(this.state.type_subtype_gens);
        const name_titles_table = { ...this.state.name_titles_table };
        const name = type_subtype_gens[index]["subtypes"][subindex]["name"];
        type_subtype_gens[index]["subtypes"].splice(subindex, 1);
        name_titles_table[name] = undefined;
        this.setState({
            type_subtype_gens: type_subtype_gens,
            name_titles_table: name_titles_table
        }, () => {
            name === this.state.default_subtype && this.setDefaultTypeSubtype();
        });
    }

    setDefaultTypeSubtype() {
        const gens = _.cloneDeep(this.state.type_subtype_gens);
        const default_type = this.state.default_type;
        if (default_type === "") {
            this.setState({ default_type: gens[0].name });
            if (gens[0].subtypes.length) {
                this.setState({ default_subtype: gens[0].subtypes[0].name });
            }
        } else {
            for (let i = 0; i < gens.length; i++) {
                if (gens[i].name === default_type && gens[i].subtypes.length) {
                    this.setState({ default_subtype: gens[i].subtypes[0].name });
                }
            }
        }
    }

    colorPick(val, i, subi) {
        const type_subtype_gens = _.cloneDeep(this.state.type_subtype_gens);

        this.setState({ type_subtype_gens: type_subtype_gens });
    }

    toggleColorBtnClicked(name) {
        this.setState({
            color_btn_clicked: name,
            drawer_open: [true, name]
        });
    }

    toggleRenaming(name) {
        if (this.state.renaming === name) {
            this.setState({ renaming: "" });
        } else {
            this.setState({ renaming: name }, () => {
                this.input_ref.current.focus();
            });
        }
    }

    handleInputBlur(e, name) {
        if (e.relatedTarget == null || !e.relatedTarget.className.includes("renaming_btn")) {
            this.toggleRenaming(name);
        }
    }

    handleInputKeyDown(e, name) {
        e.keyCode === 13 && this.toggleRenaming(name);
    }

    setDefaultType(name, index) {
        if (this.state.default_type !== name) {
            this.setState({
                default_type: name,
                default_subtype: ""
            });
            if (this.state.type_subtype_gens[index].subtypes.length) {
                this.setState({ default_subtype: this.state.type_subtype_gens[index].subtypes[0].name });
            }
        }
    }

    setDefaultSubtype(name, subname) {
        this.setState({
            default_type: name,
            default_subtype: subname
        });
    }

    closeOptionsDrawer() {
        this.setState({
            color_btn_clicked: "",
            drawer_open: [false, ""]
        });
    }

    setOrphanables(name) {
        const orphanables = [...this.state.orphanables];
        if (orphanables.includes(name)) {
            orphanables.splice(orphanables.indexOf(name), 1);
        } else {
            orphanables.push(name);
        }
        this.setState({ orphanables: orphanables });
    }

    render() {
        return (
            <section id="notebook_addedit_wrapper">
                <section id="notebook_addedit">
                    <section id="return_to_list">
                        <button
                            id="return_to_list_btn"
                            className="lightdark"
                            onClick={() => this.props.returnToList()}
                        >
                            return to list
                        </button>
                    </section>
                    <section id="composition_border_wrapper" className="lightdark">
                        <input
                            id="notebook_addedit_title"
                            className="notebook_summary_field lightdark"
                            value={this.state.title}
                            onChange={this.handleTitleChange}
                        />
                        <section id="type_subtype_generation_section">
                            <section id="type_subtype_gen_wrapper">
                                {
                                    this.state.type_subtype_gens.map((type_subtype, index) =>
                                        <section
                                            key={`type_subtype_gen_${index}`}
                                            className="type_gen_section"
                                        >
                                            <section className="type_gen_wrapper">
                                                <section className={`type_gen notebook_summary_field ${this.state.note_type === type_subtype.name ? "note_type" : ""} lightdark`}>
                                                    <button
                                                        title="default type"
                                                        className="is_default is_default_type noselect lightdark material-icons"
                                                        onClick={() => this.setDefaultType(type_subtype.name, index)}
                                                    >
                                                        {
                                                            (this.state.default_type === type_subtype.name) ?
                                                                "done"
                                                                :
                                                                "crop_din"
                                                        }
                                                    </button>
                                                    {
                                                        (this.state.note_type === type_subtype.name) &&
                                                        <span
                                                            title="note type"
                                                            className="is_note_type noselect material-icons"
                                                        >
                                                            notes
                                                        </span>
                                                    }
                                                    {(this.state.renaming !== type_subtype.name) ?
                                                        <span
                                                            className="type_subtype_title"
                                                            onClick={() => this.toggleRenaming(type_subtype.name)}
                                                        >
                                                            {type_subtype.title}
                                                        </span>
                                                        :
                                                        <input
                                                            className="type_subtype_title lightdark"
                                                            value={type_subtype.title}
                                                            onChange={(e) => this.handleTypeNameChange(e, index)}
                                                            // onBlur={(e) => this.handleInputBlur(e, type_subtype.name)}
                                                            onKeyDown={(e) => this.handleInputKeyDown(e, type_subtype.name)}
                                                            ref={this.input_ref}
                                                        />
                                                    }
                                                    {
                                                        (this.state.note_type !== type_subtype.name) &&
                                                        <button
                                                            className={`orphanable_btn noselect ${this.state.orphanables.includes(type_subtype.name) ? "clicked" : ""} noselect lightdark material-icons`}
                                                            onClick={() => this.setOrphanables(type_subtype.name)}
                                                        >
                                                            face
                                                        </button>
                                                    }
                                                    <div className="type_subtype_color_btn_container">
                                                        <button
                                                            className={`type_subtype_color_btn noselect material-icons ${type_subtype.name === this.state.color_btn_clicked ? "clicked" : ""}`}
                                                            onClick={() => this.toggleColorBtnClicked(type_subtype.name)}
                                                        >
                                                            palette
                                                        </button>
                                                    </div>
                                                    <button
                                                        className={`renaming_btn noselect ${this.state.renaming === type_subtype.name ? "renaming" : ""}`}
                                                        onClick={() => this.toggleRenaming(type_subtype.name)}
                                                    >
                                                    </button>
                                                    {(index !== 0) &&
                                                        <button
                                                            className="remove_type_gen_btn noselect material-icons"
                                                            onClick={() => this.removeTypeGenSection(index)}
                                                        >
                                                            clear
                                                        </button>
                                                    }
                                                </section>
                                                <TypeSubtypeOptionsDrawer
                                                    name={type_subtype.name}
                                                    drawer_open={this.state.drawer_open}
                                                    index={index}
                                                    subindex={-1}
                                                    closeOptionsDrawer={() => this.closeOptionsDrawer()}
                                                    colorPick={(val, i, subi) => this.colorPick(val, i, subi)}
                                                />
                                            </section>
                                            <section className="subtype_gen_section">
                                                {
                                                    type_subtype["subtypes"].map((subtype, subindex) =>
                                                        <section
                                                            key={`subtype_gen_${subindex}`}
                                                            className="subtype_gen_wrapper">
                                                            <section className="subtype_gen notebook_summary_field lightdark">
                                                                <button
                                                                    title="default subtype"
                                                                    className="is_default is_default_subtype noselect lightdark material-icons"
                                                                    onClick={() => this.setDefaultSubtype(type_subtype.name, subtype.name)}
                                                                >
                                                                    {
                                                                        (this.state.default_subtype === subtype.name) ?
                                                                            "done"
                                                                            :
                                                                            "crop_din"
                                                                    }
                                                                </button>
                                                                {(this.state.renaming !== subtype.name) ?
                                                                    <span
                                                                        className="type_subtype_title"
                                                                        onClick={() => this.toggleRenaming(subtype.name)}
                                                                    >
                                                                        {subtype.title}
                                                                    </span>
                                                                    :
                                                                    <input
                                                                        className="type_subtype_title lightdark"
                                                                        value={subtype.title}
                                                                        onChange={(e) => this.handleSubtypeNameChange(e, index, subindex)}
                                                                        // onBlur={(e) => this.handleInputBlur(e, subtype.name)}
                                                                        onKeyDown={(e) => this.handleInputKeyDown(e, subtype.name)}
                                                                        ref={this.input_ref}
                                                                    />
                                                                }
                                                                <div className="type_subtype_color_btn_container">
                                                                    <button
                                                                        className={`type_subtype_color_btn noselect material-icons ${subtype.name === this.state.color_btn_clicked ? "clicked" : ""}`}
                                                                        onClick={() => this.toggleColorBtnClicked(subtype.name)}
                                                                    >
                                                                        palette
                                                                    </button>
                                                                </div>
                                                                <button
                                                                    className={`renaming_btn noselect ${this.state.renaming === subtype.name ? "renaming" : ""}`}
                                                                    onClick={() => this.toggleRenaming(subtype.name)}
                                                                >
                                                                </button>
                                                                {/* <input
                                                                    placeholder="New Subtype"
                                                                    value={subtype.title}
                                                                    onChange={(e) => this.handleSubtypeNameChange(e, index, subindex)}
                                                                /> */}
                                                                <button
                                                                    className="remove_subtype_gen_btn noselect material-icons"
                                                                    onClick={() => this.removeSubtypeGenSection(index, subindex)}
                                                                >
                                                                    clear
                                                                </button>
                                                            </section>
                                                            <TypeSubtypeOptionsDrawer
                                                                name={subtype.name}
                                                                drawer_open={this.state.drawer_open}
                                                                index={index}
                                                                subindex={subindex}
                                                                closeOptionsDrawer={() => this.closeOptionsDrawer()}
                                                                colorPick={(val, i, subi) => this.colorPick(val, i, subi)}
                                                            />
                                                        </section>
                                                    )
                                                }
                                                <button
                                                    className="add_subtype_gen_btn lightdark material-icons"
                                                    onClick={() => this.addSubtypeGenSection(index)}
                                                >
                                                    add
                                                </button>
                                            </section>
                                        </section>
                                    )
                                }
                                <button
                                    className="add_type_gen_btn lightdark material-icons"
                                    onClick={this.addTypeGenSection}
                                >
                                    add
                        </button>
                            </section>

                        </section>
                        <section className="bottom_options">
                            <button id="notebook_addedit_confirm"></button>
                            <button
                                className={`is_default is_default_notebook lightdark ${this.state.default_notebook === this.state.notebook_name ? "clicked" : ""} material-icons`}
                            // onClick={() => this.props.setDefault(type_key)}
                            >
                                favorite_border
                            </button>
                        </section>

                    </section>
                </section>
            </section>
        )
    }
}

class TypeSubtypeOptionsDrawer extends React.Component {
    render() {
        return (
            <div className={`type_subtype_optionsdrawer_wrapper ${(this.props.drawer_open[0] === true && this.props.drawer_open[1] === this.props.name) ? "open" : ""}`}>
                <section className={`type_subtype_optionsdrawer lightdark`} >
                    <div className="optionsdrawer_top_btns">
                        <button
                            className="close_optionsdrawer_btn material-icons"
                            onClick={this.props.closeOptionsDrawer}
                        >
                            clear
                        </button>
                    </div>
                    <ColorPicker />
                </section>
            </div>
        )
    };
}

class ColorPicker extends React.Component {
    render() {
        return (
            <>
                <h2>pick a color...</h2>
            </>
        )
    };
}

class AddEditPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            curr_tag: this.props.curr_tag,
            new_addedit_curr_tag_received: false,
            descr_keydown_cutpaste_selection_endpoints: "",
            descr_keydown_cutpaste_keycode: "",
        }
        this.changeTextareaSize = this.changeTextareaSize.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDescrOnKeyDown = this.handleDescrOnKeyDown.bind(this);
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        if (prevProps.curr_tag !== this.props.curr_tag) {
            return true;
        } else {
            return null;
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (snapshot === true) {
            this.setState({
                curr_tag: this.props.curr_tag,
                new_addedit_curr_tag_received: true
            });
        }
    }

    addTag(tagobj) {
        let tag_key = Object.entries(tagobj)[0][0];
        let tag_val = Object.entries(tagobj)[0][1];
        let curr_tag = _.cloneDeep(this.state.curr_tag);
        findObj(curr_tag, tag_val)[tag_val][tag_key] = {
            tagsearch: tag_val,
            // substrings: ["4,5", "9,11", "15,19"]
            // substrings: ["15,19"]
            substrings: []
            // substrings: ["90,102", "110,120"]
        };
        this.setState({ curr_tag: curr_tag }, function () {
            console.log(this.state.curr_tag);
        });
    }

    clearTag(tagobj) {
        let tag_key = Object.entries(tagobj)[0][0];
        let tag_val = Object.entries(tagobj)[0][1];
        let curr_tag = _.cloneDeep(this.state.curr_tag);
        delete findObj(curr_tag, tag_val)[tag_val][tag_key];
        this.setState({ curr_tag: curr_tag }, function () {
            console.log(this.state.curr_tag);
        });
    }

    clearRange(key, val, range0, range1) {
        let curr_tag = _.cloneDeep(this.state.curr_tag);
        let substrings = findObj(curr_tag, val)[val][key]["substrings"];
        let cut;
        for (let i = 0; i < substrings.length; i++) {
            let range = substrings[i].split(",");
            if (range[0] === range0 && range[1] === range1) {
                cut = i;
            }
        }
        substrings.splice(cut, 1);
        this.setState({ curr_tag: curr_tag });
    }

    adjustRanges(e) {
        console.log("onchange");
        const target = e.target;
        let keydown_cutpaste_sel_start = parseInt(this.state.descr_keydown_cutpaste_selection_endpoints.split(",")[0]);
        let keydown_cutpaste_sel_end = parseInt(this.state.descr_keydown_cutpaste_selection_endpoints.split(",")[1]);
        let curr_tag = _.cloneDeep(this.state.curr_tag);
        Object.entries(this.props.app_type_metadata[curr_tag["meta_type"]]["tagsearches"]).map(([type_key, type_value]) => {
            type_value.map(tagsearch => {
                Object.entries(findObj(curr_tag, tagsearch)[tagsearch]).map(([type_key, type_value]) => {
                    if (type_value.substrings.length) {
                        let substrings = [];
                        for (let i = 0; i < type_value.substrings.length; i++) {
                            let range = type_value.substrings[i].split(",");
                            range[0] = parseInt(range[0]);
                            range[1] = parseInt(range[1]);

                            if (keydown_cutpaste_sel_start === keydown_cutpaste_sel_end &&
                                (keydown_cutpaste_sel_end === range[0] || keydown_cutpaste_sel_end === range[1]) &&
                                (this.state.descr_keydown_cutpaste_keycode === 46 || this.state.descr_keydown_cutpaste_keycode === 8)) {
                                range[1]--;
                                range[0] < range[1] && substrings.push(`${range[0]},${range[1]}`);
                            }
                            else if (range[0] < keydown_cutpaste_sel_start && range[1] <= keydown_cutpaste_sel_start) {
                                range[0] < range[1] && substrings.push(`${range[0]},${range[1]}`);
                            } else if (keydown_cutpaste_sel_end <= range[0]) {
                                if (target.textContent.length < target.value.length) {
                                    range[0] += (target.value.length - target.textContent.length);
                                    range[1] += (target.value.length - target.textContent.length);
                                } else if (target.textContent.length > target.value.length) {
                                    range[0] -= (target.textContent.length - target.value.length);
                                    range[1] -= (target.textContent.length - target.value.length);
                                }
                                range[0] < range[1] && substrings.push(`${range[0]},${range[1]}`);

                            } else if (keydown_cutpaste_sel_start < range[0] && this.isBetween(keydown_cutpaste_sel_end, range[0], range[1])) {
                                range[0] = target.selectionEnd;
                                if (target.textContent.length > target.value.length) {
                                    range[1] -= (target.textContent.length - target.value.length);
                                } else if (target.textContent.length < target.value.length) {
                                    range[1] += (target.value.length - target.textContent.length);
                                }
                                range[0] < range[1] && substrings.push(`${range[0]},${range[1]}`);
                            } else if (this.isBetween(keydown_cutpaste_sel_start, range[0], range[1]) && keydown_cutpaste_sel_end > range[1]) {
                                range[1] = target.selectionStart;
                                range[0] < range[1] && substrings.push(`${range[0]},${range[1]}`);
                            } else if (keydown_cutpaste_sel_end >= range[0] && keydown_cutpaste_sel_end < range[1]) {
                                if (target.textContent.length < target.value.length) {
                                    range[1] += (target.value.length - target.textContent.length);
                                } else if (target.textContent.length > target.value.length) {
                                    range[1] -= (target.textContent.length - target.value.length);
                                }
                                range[0] < range[1] && substrings.push(`${range[0]},${range[1]}`);
                            }
                        }
                        if (substrings.length) {
                            type_value.substrings = [...substrings];
                        } else {
                            type_value.substrings = [];
                        }
                    }
                })
            })
        })
        this.setState({
            curr_tag: curr_tag,
            descr_keydown_cutpaste_selection_endpoints: "",
            descr_keydown_cutpaste_keycode: ""
        });
    }

    handleDescrOnKeyDown(e) {
        this.setState({
            descr_keydown_cutpaste_selection_endpoints: `${e.target.selectionStart},${e.target.selectionEnd}`,
            descr_keydown_cutpaste_keycode: e.keyCode
        });
    }

    handleDescrOnCutPaste(e) {
        this.setState({
            descr_keydown_cutpaste_selection_endpoints: `${e.target.selectionStart},${e.target.selectionEnd}`,
            descr_keydown_cutpaste_keycode: e.keyCode
        });
    }

    handleChange(e) {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        this.adjustRanges(e);

        this.setState(prevState => ({
            curr_tag: {                   // object that we want to update
                ...prevState.curr_tag,    // keep all other key-value pairs
                [name]: value             // update the value of specific key
            }
        }), function () {
            console.log(this.state.curr_tag);
        });

        // only if target.type === textarea
        this.changeTextareaSize(target);
    }

    changeTextareaSize(node) {
        // Reset field height
        node.style.height = "inherit";

        // Get the computed styles for the element
        const computed = window.getComputedStyle(node);

        // Calculate the height
        const height = parseInt(computed.getPropertyValue("border-top-width"), 10)
            + parseInt(computed.getPropertyValue("padding-top"), 10)
            + node.scrollHeight
            + parseInt(computed.getPropertyValue("padding-bottom"), 10)
            + parseInt(computed.getPropertyValue("border-bottom-width"), 10);

        node.style.height = "inherit";
        node.style.height = `${height}px`;
    }

    handleTypeClick(text) {
        if (this.state.curr_tag.meta_type !== text) {
            this.setState(prevState => ({
                curr_tag: {
                    ...prevState.curr_tag,
                    meta_type: text,
                    meta_subtype: ""
                }
            }), function () {
                console.log(this.state.curr_tag);
            });
        }
    }

    handleSubtypeClick(text) {
        if (this.state.curr_tag.meta_subtype !== text) {
            this.setState({ subtype_checked: text });
            this.setState(prevState => ({
                curr_tag: {
                    ...prevState.curr_tag,
                    meta_subtype: text
                }
            }), function () {
                console.log(this.state.curr_tag);
            });
        }
    }

    isBetween(a, b, c) {
        return (a > b && a < c);
    }

    consolidateRanges(range_info) {
        let tag_key = range_info[0];
        let tag_val = range_info[1];
        let start = parseInt(range_info[2]);
        let end = parseInt(range_info[3]);
        let curr_tag = _.cloneDeep(this.state.curr_tag);
        let prev_substrings = findObj(curr_tag, tag_val)[tag_val][tag_key]["substrings"];
        let toDelete = [];

        /// just go through all substrings and first find where new range starts and ends relative to them
        // examples:
        // starts in 0, ends before 3 (implying it ends after or at the end of index 2, otherwise it might say "ends in 2")
        // starts after 4, ends before 5 ()
        if (!prev_substrings.length) {
            prev_substrings.push(`${start},${end}`);
        } else {
            let prev_range1 = 0;
            let precedes_index = -1;
            for (let i = 0; i < prev_substrings.length; i++) {
                let range = prev_substrings[i].split(",");
                range[0] = parseInt(range[0]);
                range[1] = parseInt(range[1]);

                let precedes = Boolean((start > prev_range1 || prev_range1 === 0) && end < range[0]);
                let interferes = Boolean(start <= range[1] && end >= range[0]);
                interferes && toDelete.push(i);
                precedes && (precedes_index = i);
                prev_range1 = range[1];
            }

            if (precedes_index > -1) {
                prev_substrings.splice(precedes_index, 0, `${start},${end}`);
            } else if (toDelete.length) {
                let interfering_ranges_start = parseInt(prev_substrings[toDelete[0]].split(",")[0]);
                let interfering_ranges_end = parseInt(prev_substrings[toDelete[toDelete.length - 1]].split(",")[1]);
                if (toDelete.length === 1 && (this.isBetween(start, interfering_ranges_start, interfering_ranges_end) && this.isBetween(end, interfering_ranges_start, interfering_ranges_end))) {
                    prev_substrings.splice(toDelete[0], 1, `${start},${end}`);
                } else {
                    start = start > interfering_ranges_start ? interfering_ranges_start : start;
                    end = end < interfering_ranges_end ? interfering_ranges_end : end;
                    prev_substrings.splice(toDelete[0], toDelete.length, `${start},${end}`);
                }
            } else {
                prev_substrings.push(`${start},${end}`);
            }
        }
        this.setState({ curr_tag: curr_tag }, function () { /*console.log(this.state.curr_tag.Story_tags["aaa"].substrings)*/ });
    }

    render() {
        const editcontext_type_subtypes = { ...this.props.app_type_metadata["types_subtypes"] };
        for (let key in editcontext_type_subtypes) {
            if (key !== this.state.curr_tag["meta_type"]) {
                delete editcontext_type_subtypes[key];
            }
        }
        return (
            <section id="addeditpanel">
                <TypeSubtypeSelection
                    types_subtypes={(this.props.menu_data_state === "add_panel" ? this.props.app_type_metadata["types_subtypes"] : editcontext_type_subtypes)}
                    type_checked={this.state.curr_tag.meta_type}
                    subtype_checked={this.state.curr_tag.meta_subtype}
                    handleTypeClick={(text) => this.handleTypeClick(text)}
                    handleSubtypeClick={(text) => this.handleSubtypeClick(text)}
                />
                <section className="addeditpanel_type_section">
                    <AddeditpanelTitleDescr
                        curr_tag={this.state.curr_tag}
                        app_type_metadata={this.props.app_type_metadata}
                        lightdarkColorCalc={(tagtype) => this.props.lightdarkColorCalc(tagtype)}
                        changeTextareaSize={(node) => this.changeTextareaSize(node)}
                        handleChange={(e) => this.handleChange(e)}
                        handleDescrOnKeyDown={(e) => this.handleDescrOnKeyDown(e)}
                        handleDescrOnCutPaste={(e) => this.handleDescrOnCutPaste(e)}
                    />
                </section>
                {(this.state.curr_tag.meta_type != null && this.state.curr_tag.meta_type !== "") &&
                    Object.entries(this.props.app_type_metadata[this.state.curr_tag.meta_type].tagsearches).map(([type_key, type_value]) =>
                        <TagSearch
                            key={type_key}
                            name={type_key}
                            tagsearch_arr={type_value}
                            lightdarkColorCalc={(tagtype) => this.props.lightdarkColorCalc(tagtype)}
                            lightdarkColorCalcRanges={(tagtype) => this.props.lightdarkColorCalcRanges(tagtype)}
                            toggleModal={(modal_args) => this.props.toggleModal(modal_args)}
                            modal_return={this.props.modal_return}
                            addTag={(tagobj) => this.addTag(tagobj)}
                            clearTag={(tagobj) => this.clearTag(tagobj)}
                            curr_tag={this.state.curr_tag}
                            addeditpanel_prop_curr_tag={this.props.curr_tag}
                            consolidateRanges={(range_info) => this.consolidateRanges(range_info)}
                            clearRange={(key, val, range0, range1) => this.clearRange(key, val, range0, range1)}
                            new_addedit_curr_tag_received={this.state.new_addedit_curr_tag_received}
                        />
                    )
                }
            </section>
        );
    }
}

class TagSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            curval: "",
            tagarr_LHS: [],
            tagarr_RHS: [],
            results: [],
            newtags: [],
            input_style_width: 0,
            sametag: "",
            awaiting_modal_return: false,
            readied: {},
            rangedescr_height_clicked: 0,
            tag_opened_for_ranges: "",
            tag_opened_for_ranges_key: "",
            tag_opened_for_ranges_val: "",
            new_text: ""
        }
        this.onSearchChange = this.onSearchChange.bind(this);
        this.onSearchkeyDown = this.onSearchkeyDown.bind(this);
        this.onTagsearchBlur = this.onTagsearchBlur.bind(this);
        this.inputRefocus = this.inputRefocus.bind(this);
        this.onRangeMouseLeave = this.onRangeMouseLeave.bind(this);
        this.onRangesClick = this.onRangesClick.bind(this);
        this.width_placeholder_ref = React.createRef();
        this.input_ref = React.createRef();
        this.add_descr_ranges_ref = React.createRef();
        this.addeditpanel_field_wrapper_ref = React.createRef();
    }

    updateInputWidth() {
        this.setState({ input_style_width: this.width_placeholder_ref.current.offsetWidth + 1 });
    }

    componentDidMount() {
        this.setState({ rangedescr_height_clicked: this.add_descr_ranges_ref.current.offsetHeight });
        this.loadTags();
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        if (this.state.awaiting_modal_return && prevProps.modal_return !== this.props.modal_return) {
            return "modal";
        } else if (prevProps.curr_tag !== this.props.curr_tag) {
            return "load_tags_&_rangedescr";
        } else if (prevProps.addeditpanel_prop_curr_tag !== this.props.addeditpanel_prop_curr_tag) {
            this.setState({
                curval: "",
                tagarr_LHS: [],
                tagarr_RHS: [],
                newtags: [],
                tag_opened_for_ranges: "",
                tag_opened_for_ranges_key: "",
                tag_opened_for_ranges_val: "",
                new_text: ""
            })
            return null;
        } else {
            return null;
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (snapshot === "modal") {
            this.addTag(this.props.modal_return, true);
            this.setState({ awaiting_modal_return: false });
        } else if (snapshot === "load_tags_&_rangedescr") {
            this.loadTags();
            if (this.state.tag_opened_for_ranges_key !== "" && this.state.tag_opened_for_ranges_val !== "") {
                Promise.resolve(
                    this.toggleHighlightRanges(this.state.tag_opened_for_ranges_key, this.state.tag_opened_for_ranges_val)
                ).then(p => {
                    this.setState({ rangedescr_height_clicked: this.add_descr_ranges_ref.current.offsetHeight });
                    return p;
                });
            } else {
                this.setState({ rangedescr_height_clicked: this.add_descr_ranges_ref.current.offsetHeight });
            }
        }
    }


    loadTags() {
        let curr_tag = _.cloneDeep(this.props.curr_tag);
        let loaded_LHS = [...this.state.tagarr_LHS];
        for (let i = 0; i < this.props.tagsearch_arr.length; i++) {
            let tagsearch = this.props.tagsearch_arr[i];
            Object.entries(findObj(curr_tag, tagsearch)[tagsearch]).map(([type_key, type_value]) =>
                this.tagarrIndexOf({ [type_key]: tagsearch })[0] === -1 && loaded_LHS.push({ [type_key]: tagsearch })
            );
        }
        this.setState({ tagarr_LHS: loaded_LHS });
    }

    tagobjsEquivalent(tagobj1, tagobj2) {
        return (
            Object.entries(tagobj1).length !== 0 && tagobj1.constructor === Object &&
            Object.entries(tagobj2).length !== 0 && tagobj2.constructor === Object &&
            Object.entries(tagobj1)[0][0] === Object.entries(tagobj2)[0][0] &&
            Object.entries(tagobj1)[0][1] === Object.entries(tagobj2)[0][1]
        );
    }

    tagarrIndexOf(tagobj) {
        let tagarr_LHS = [...this.state.tagarr_LHS];
        let tagarr_RHS = [...this.state.tagarr_RHS];
        let index = [-1, ""];
        index = [tagarr_LHS.findIndex(i => this.tagobjsEquivalent(i, tagobj)), "LHS"];
        index[0] === -1 && (index = [tagarr_RHS.findIndex(i => this.tagobjsEquivalent(i, tagobj)), "RHS"]);
        return index;
    }

    addTag(tagobj, isnew) {
        let tag_key = Object.entries(tagobj)[0][0];
        let tagarr_LHS = [...this.state.tagarr_LHS];
        let newtags = [...this.state.newtags];
        const input = this.input_ref.current;

        if (this.tagarrIndexOf(tagobj)[0] === -1) {
            tagarr_LHS.push(tagobj);
            this.setState({ tagarr_LHS: tagarr_LHS });
            if (isnew) {
                newtags.push(tag_key);
                this.setState({ newtags: newtags });
            }
            this.props.addTag(tagobj);
        } else {
            // call function dedicated to alerting of duplicates
            this.setState({ sametag: tag_key }, function () {
                setTimeout(() => {
                    this.setState({ sametag: "" });
                }, 100);
            });
        }
        this.clearInput();
        input.focus();
    }

    clickClearTag = (tagobj) => (event) => {
        this.clearTag(tagobj);
        event.stopPropagation();
    }

    clearTag(tagobj) {
        let newtags = [...this.state.newtags];
        let tagarr_LHS = [...this.state.tagarr_LHS];
        let tagarr_RHS = [...this.state.tagarr_RHS];
        let tag_key = Object.entries(tagobj)[0][0];
        let tag_val = Object.entries(tagobj)[0][1];
        let tagobj_location = this.tagarrIndexOf(tagobj);
        const input = this.input_ref.current;

        if (newtags.includes(tag_key)) {
            newtags.splice(newtags.indexOf(tag_key), 1);
            this.setState({ newtags: newtags });
        }
        if (tagobj_location[0] > -1) {
            if (tagobj_location[1] === "LHS") {
                tagarr_LHS.splice(tagobj_location[0], 1);
                this.setState({ tagarr_LHS: tagarr_LHS });
            } else if (tagobj_location[1] === "RHS") {
                tagarr_RHS.splice(tagobj_location[0], 1);
                this.setState({ tagarr_RHS: tagarr_RHS });
            }
        }
        if (this.state.tag_opened_for_ranges === `${tag_key}_${tag_val}`) {
            this.setState({
                tag_opened_for_ranges: "",
                tag_opened_for_ranges_key: "",
                tag_opened_for_ranges_val: "",
            });
        }
        this.props.clearTag(tagobj);
        input.focus();
    }

    clearInput() {
        this.setState({ curval: "" });
        this.setState({ input_style_width: 0 });
    }

    onSearchkeyDown(e) {
        const results = [...this.state.results];
        const curval = this.state.curval.trim();
        const tagsearch_arr = this.props.tagsearch_arr;

        switch (e.keyCode) {
            case 13:
                if (!this.existsCurrentResult()[0] && curval !== "") {

                    // if no results currently considered, AND the curval entered is an exact match for a result
                    if (results.length && results[0][1].toLowerCase() === curval.toLowerCase()) {
                        this.addTag({ [results[0][1]]: tagsearch_arr[0] }, false);
                    } else { // else if there are no results, or just no exact matches
                        // if threre is only one possible tagsearch designated this input
                        if (tagsearch_arr.length === 1) {
                            this.addTag({ [curval]: tagsearch_arr[0] }, true);
                        } else if (tagsearch_arr.length > 1) {
                            // Show popup
                            this.setState({ awaiting_modal_return: true });
                            this.props.toggleModal({
                                "tagsearch": {
                                    "curval": curval,
                                    "tagsearch_arr": tagsearch_arr
                                }
                            });
                        }
                    }
                } else if (this.existsCurrentResult()[0]) {
                    this.addTag({ [this.existsCurrentResult()[2]]: this.existsCurrentResult()[3] }, false);
                }
                // this.clearInput();
                this.setState({ readied: {} });
                break;
            case 37:
                if (this.state.tagarr_LHS.length && (this.caretLocation() === "start" || this.caretLocation() === "start_is_end")) {
                    let tagarr_LHS = [...this.state.tagarr_LHS];
                    let tagarr_RHS = [...this.state.tagarr_RHS];
                    let obj = tagarr_LHS.pop();
                    this.setState({ tagarr_LHS: tagarr_LHS });
                    tagarr_RHS.unshift(obj);
                    this.setState({ tagarr_RHS: tagarr_RHS });
                    this.clearInput();
                }
                this.setState({ readied: {} });
                break;
            case 39:
                if (this.state.tagarr_RHS.length && (this.caretLocation() === "end" || this.caretLocation() === "start_is_end")) {
                    let tagarr_LHS = [...this.state.tagarr_LHS];
                    let tagarr_RHS = [...this.state.tagarr_RHS];
                    let obj = tagarr_RHS.shift();
                    this.setState({ tagarr_RHS: tagarr_RHS });
                    tagarr_LHS.push(obj);
                    this.setState({ tagarr_LHS: tagarr_LHS });
                    this.clearInput();
                }
                this.setState({ readied: {} });
                break;
            case 38:
            case 40:
                if (results.length) {
                    let update;
                    e.keyCode === 38 ? update = -1 : update = 1;
                    let current_result = this.existsCurrentResult();
                    if (current_result[0]) {
                        this.updateCurrentResult(current_result[1], current_result[1] + update);
                    } else {
                        e.keyCode === 40 && this.updateCurrentResult(0, 0);
                    }
                }
                e.preventDefault();
                this.setState({ readied: {} });
                break;
            case 8: // backspace
                if (this.state.tagarr_LHS.length && (this.caretLocation() === "start" || this.caretLocation() === "start_is_end")) {
                    let first_LHS = [...this.state.tagarr_LHS][this.state.tagarr_LHS.length - 1];
                    let readied = this.state.readied;
                    if (Object.entries(this.state.readied).length === 0) {
                        this.setState({ readied: first_LHS });
                    } else if (this.tagobjsEquivalent(first_LHS, readied)) {
                        this.clearTag(first_LHS);
                        this.setState({ readied: {} });
                    }
                }
                break;
            case 46: // delete
                if (this.state.tagarr_RHS.length && (this.caretLocation() === "end" || this.caretLocation() === "start_is_end")) {
                    let first_RHS = [...this.state.tagarr_RHS][0];
                    let readied = this.state.readied;
                    if (Object.entries(this.state.readied).length === 0) {
                        this.setState({ readied: first_RHS });
                    } else if (this.tagobjsEquivalent(first_RHS, readied)) {
                        this.clearTag(first_RHS);
                        this.setState({ readied: {} });
                    }
                }
                break;
            default:
                this.setState({ readied: {} });
                break;
        }
    }

    caretLocation() {
        const input = this.input_ref.current;
        if (input.selectionStart === input.selectionEnd) {
            if (input.value.length === 0) {
                return "start_is_end";
            } else if (input.selectionStart === 0) {
                return "start";
            } else if (input.selectionStart === input.value.length) {
                return "end";
            }
        } else {
            return "not applicable";
        }
    }

    onSearchChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        // const input = this.input_ref.current;

        Promise.resolve(
            this.setState({ results: [] }),
            this.setState({ curval: value }, function () {
                // console.log(input.selectionStart);
            }),
        ).then(p => {
            this.updateInputWidth();
            this.resultsForage();
            return p;
        });
    }

    updateCurrentResult(old_index, new_index) {
        let results = [...this.state.results];
        if (old_index < results.length && new_index < results.length) {
            if (new_index !== -1) {
                results[old_index][0] = false;
                results[new_index][0] = true;
            } else {
                results[old_index][0] = false;
            }
            this.setState({ results: results }, function () {
                // console.log(this.state.results);
            });
        }
    }

    existsCurrentResult() {
        let result = [false, 0, "", "", {}];
        const results = [...this.state.results];
        if (Object.entries(results).length !== 0) {
            for (let i = 0; i < results.length; i++) {
                if (this.state.results[i][0]) {
                    result = [true, i, results[i][1], results[i][2], results[i][3]];
                }
            }
        }
        return result;
    }

    resultsForage() {
        let curval = this.state.curval.trim().toLowerCase();
        let buffer = [];
        const tagsearch_arr = this.props.tagsearch_arr;
        for (let i = 0; i < tagsearch_arr.length; i++) {
            let tags_arr_name = tagsearch_arr[i];
            let tags_arr = tagarr_dictionary[tags_arr_name];
            for (let j = 0; j < tags_arr.length; j++) {
                if (tags_arr[j].toLowerCase().startsWith(curval)) {
                    // create result tag
                    // tabindex -1 only removes from tab order, but still allows focus (and as such, e.related_target):
                    // (https://stackoverflow.com/questions/5192859/how-to-ignore-html-element-from-tabindex)
                    buffer.push([
                        false,
                        tags_arr[j],
                        tags_arr_name,
                        <span
                            className={"tag_item"}
                            tags_arr_name={tags_arr_name}
                            style={this.props.lightdarkColorCalc(tags_arr_name.replace("_tags", ""))}
                        >
                            <span className="match">{tags_arr[j].substring(0, curval.length)}</span>
                            {tags_arr[j].substring(curval.length)}
                        </span>
                    ]);
                }
            }
        }
        this.setState({ results: buffer });
    }

    onTagsearchBlur(e) {
        // console.log(e.target);
        if (!this.addeditpanel_field_wrapper_ref.current.contains(e.relatedTarget) && !this.state.awaiting_modal_return) {
            let tagarr_LHS = [...this.state.tagarr_LHS];
            let tagarr_RHS = [...this.state.tagarr_RHS];
            let new_LHS = tagarr_LHS.concat(tagarr_RHS);
            this.setState({
                tagarr_LHS: new_LHS,
                tagarr_RHS: [],
                results: [],
                curval: ""
            });
        }
    }

    inputRefocus(e) {
        if (e.target.className.includes("addedittag_section")) {
            if (this.state.curval === "") {
                let tagarr_LHS = [...this.state.tagarr_LHS];
                let tagarr_RHS = [...this.state.tagarr_RHS];
                let new_LHS = tagarr_LHS.concat(tagarr_RHS);
                this.setState({
                    tagarr_LHS: new_LHS,
                    tagarr_RHS: [],
                    results: [],
                    curval: ""
                });
            }
            this.input_ref.current.focus();
        }
    }

    showDescrRanges(key, val) {
        if (this.state.tag_opened_for_ranges === `${key}_${val}`) {
            this.setState({
                tag_opened_for_ranges: "",
                tag_opened_for_ranges_key: "",
                tag_opened_for_ranges_val: "",
                new_text: ""
            });

        } else {
            this.toggleHighlightRanges(key, val);
            this.setState({
                tag_opened_for_ranges: `${key}_${val}`,
                tag_opened_for_ranges_key: key,
                tag_opened_for_ranges_val: val,
            });
        }
    }

    tagEnter(e, key, val) {
        if (e.keyCode === 13) {
            this.showDescrRanges(key, val);
        }
    }

    onRangeMouseLeave(e) {
        if (window.getSelection && this.add_descr_ranges_ref.current.contains(window.getSelection().anchorNode)) {
            window.getSelection().removeAllRanges();
        }
    }

    onRangesClick(e) {
        let ranges = [];
        if (window.getSelection &&
            window.getSelection().toString().trim() !== "" &&
            this.state.tag_opened_for_ranges !== "" &&
            window.getSelection().rangeCount > 0 &&
            !window.getSelection().isCollapsed &&
            this.add_descr_ranges_ref.current.contains(window.getSelection().anchorNode) &&
            this.add_descr_ranges_ref.current.contains(window.getSelection().focusNode)
        ) {

            let range = window.getSelection().getRangeAt(0);
            let start = range.startOffset;
            let end = range.endOffset;
            let start_node = range.startContainer;
            let end_node = range.endContainer;

            if (!range.collapsed && end !== 0) {
                let desc = this.props.curr_tag.preliminary_description;

                let length_start = 0;
                for (let i = 0; i < this.add_descr_ranges_ref.current.childNodes.length; i++) {
                    let childnode = (this.add_descr_ranges_ref.current.childNodes[i].nodeName === "MARK")
                        ? this.add_descr_ranges_ref.current.childNodes[i].childNodes[0]
                        : this.add_descr_ranges_ref.current.childNodes[i];
                    if (childnode === start_node) {
                        length_start += start;
                        break;
                    } else {
                        length_start += childnode.textContent.length;
                    }
                }
                let length_end = 0;
                for (let i = 0; i < this.add_descr_ranges_ref.current.childNodes.length; i++) {
                    let childnode = (this.add_descr_ranges_ref.current.childNodes[i].nodeName === "MARK")
                        ? this.add_descr_ranges_ref.current.childNodes[i].childNodes[0]
                        : this.add_descr_ranges_ref.current.childNodes[i];
                    if (childnode === end_node) {
                        length_end += end;
                        break;
                    } else {
                        length_end += childnode.textContent.length;
                    }
                }

                Promise.resolve(
                    this.props.consolidateRanges([this.state.tag_opened_for_ranges_key, this.state.tag_opened_for_ranges_val, length_start, length_end])
                ).then(p => {
                    this.toggleHighlightRanges(this.state.tag_opened_for_ranges_key, this.state.tag_opened_for_ranges_val);
                    return p;
                });

            }
            window.getSelection().removeAllRanges();
        }
    }

    toggleHighlightRanges(key, val) {
        let curr_tag = _.cloneDeep(this.props.curr_tag);
        let curr_tag_tagobj = findObj(curr_tag, val)[val][key];
        let desc = curr_tag.preliminary_description;
        let buffer = [];
        let prev_end = 0;
        if (curr_tag_tagobj.substrings.length) {
            for (let i = 0; i < curr_tag_tagobj.substrings.length; i++) {
                let range = curr_tag_tagobj.substrings[i].split(",");
                if (i === 0) {
                    buffer.push(desc.substring(0, range[0]));
                } else {
                    buffer.push(desc.substring(prev_end, range[0]));
                }
                prev_end = range[1];
                buffer.push(
                    <mark
                        className="ranges_mark"
                        key={`${val}_${i}`}
                        style={this.props.lightdarkColorCalcRanges(curr_tag_tagobj.tagsearch.replace("_tags", ""))}
                    >
                        {desc.substring(range[0], range[1])}
                        <button
                            className="material-icons noselect clearbtn lightdark"
                            onClick={() => this.props.clearRange(key, val, range[0], range[1])}
                        >
                            clear
                        </button>
                    </mark>
                )
                if (i + 1 === curr_tag_tagobj.substrings.length) {
                    buffer.push(desc.substring(range[1], desc.length));
                }
            }
            this.setState({ new_text: buffer });
        } else {
            this.setState({ new_text: "" });
        }
    }

    render() {
        let name = this.props.name.replace("_tags", "");
        const type_span = <span
            className="tag_item"
            style={this.props.lightdarkColorCalc(name)}
        >
            {name}
        </span>;

        let show_descr = Boolean(
            this.state.tag_opened_for_ranges !== "" &&
            this.props.curr_tag.preliminary_description.trim() !== "" &&
            (this.state.tagarr_LHS.length || this.state.tagarr_RHS.length)
        )

        return (
            <section className="addeditpanel_field_section_container">
                <h3>Add or Edit {type_span} Tags</h3>
                <section className="addeditpanel_field_section">
                    <section
                        className="addeditpanel_field_wrapper"
                        tabIndex="-1"
                        onBlur={this.onTagsearchBlur}
                        ref={this.addeditpanel_field_wrapper_ref}
                    >
                        <section
                            className="addedittag_section addeditpanel_field"
                            onClick={this.inputRefocus}
                        >
                            {
                                this.state.tagarr_LHS.map(tagobj =>
                                    <span
                                        key={`${Object.entries(tagobj)[0][0]}_${Object.entries(tagobj)[0][1]}`}
                                        className={`tag_item noselect ${this.state.newtags.includes(Object.entries(tagobj)[0][0]) ? "new_tag" : ""} ${this.state.sametag === Object.entries(tagobj)[0][0] ? "blur_tag" : ""} ${this.state.tag_opened_for_ranges === `${Object.entries(tagobj)[0][0]}_${Object.entries(tagobj)[0][1]}` ? "tag_ranges_shown" : ""}`}
                                        style={this.props.lightdarkColorCalc(Object.entries(tagobj)[0][1].replace("_tags", ""))}
                                        onClick={() => this.showDescrRanges(Object.entries(tagobj)[0][0], Object.entries(tagobj)[0][1])}
                                        onKeyDown={(e) => this.tagEnter(e, Object.entries(tagobj)[0][0], Object.entries(tagobj)[0][1])}
                                        tabIndex="0"
                                    >
                                        {Object.entries(tagobj)[0][0]}
                                        <button
                                            className={`cleartag_btn ${this.tagobjsEquivalent(tagobj, this.state.readied) ? "readied" : ""}`}
                                            onClick={this.clickClearTag(tagobj)}
                                        // tabIndex="-1"
                                        >
                                            <span className="material-icons noselect cleartag">clear</span>
                                        </button>
                                    </span>
                                )
                            }
                            <section
                                className={`search invalid ${(this.state.curval !== "") ? "oninput" : ""} ${(this.state.tagarr_RHS.length) ? "input_before_tags" : ""}`}
                                style={{ width: (this.state.tagarr_RHS.length ? this.state.input_style_width + "px" : "initial") }}
                            >
                                <div className="border">
                                    <input
                                        onChange={this.onSearchChange}
                                        onKeyDown={this.onSearchkeyDown}
                                        className="search"
                                        placeholder={(this.state.tagarr_RHS.length) ? "" : "search..."}
                                        autoComplete="off"
                                        type="text"
                                        value={this.state.curval}
                                        ref={this.input_ref}
                                    />
                                    <div className="results">
                                        {
                                            this.state.results.map(result_arr =>
                                                <div
                                                    key={result_arr[1]}
                                                    className={`result ${result_arr[0] ? "selected" : ""}`}
                                                    tabIndex="-1"
                                                    onClick={() => this.addTag({ [result_arr[1]]: result_arr[2] }, false)}
                                                >
                                                    {result_arr[3]}
                                                </div>

                                            )
                                        }
                                    </div>
                                </div>
                                <div
                                    className="input_width_placeholder"
                                    ref={this.width_placeholder_ref}
                                >
                                    {this.state.curval}
                                </div>
                            </section>
                            {
                                this.state.tagarr_RHS.map(tagobj =>
                                    <span
                                        key={`${Object.entries(tagobj)[0][0]}_${Object.entries(tagobj)[0][1]}`}
                                        className={`tag_item noselect ${this.state.newtags.includes(Object.entries(tagobj)[0][0]) ? "new_tag" : ""} ${this.state.sametag === Object.entries(tagobj)[0][0] ? "blur_tag" : ""} ${this.state.tag_opened_for_ranges === `${Object.entries(tagobj)[0][0]}_${Object.entries(tagobj)[0][1]}` ? "tag_ranges_shown" : ""}`}
                                        style={this.props.lightdarkColorCalc(Object.entries(tagobj)[0][1].replace("_tags", ""))}
                                        onClick={() => this.showDescrRanges(Object.entries(tagobj)[0][0], Object.entries(tagobj)[0][1])}
                                        onKeyDown={(e) => this.tagEnter(e, Object.entries(tagobj)[0][0], Object.entries(tagobj)[0][1])}
                                        tabIndex="0"
                                    >
                                        {Object.entries(tagobj)[0][0]}
                                        <button
                                            className={`cleartag_btn ${this.tagobjsEquivalent(tagobj, this.state.readied) ? "readied" : ""}`}
                                            onClick={this.clickClearTag(tagobj)}
                                        // tabIndex="-1"
                                        >
                                            <span
                                                className="material-icons noselect cleartag">clear</span>
                                        </button>
                                    </span>
                                )
                            }
                        </section>
                        <section
                            className={`add_descr_ranges_section`}
                            style={{ height: (show_descr ? this.state.rangedescr_height_clicked : 0) + "px" }}
                        // tabIndex="-1"
                        >
                            <section
                                className={`add_descr_ranges`}
                                ref={this.add_descr_ranges_ref}
                                onMouseLeave={this.onRangeMouseLeave}
                                onClick={this.onRangesClick}

                            // tabIndex="-1"
                            >
                                {this.state.new_text === "" ? this.props.curr_tag.preliminary_description : this.state.new_text}
                                {/* {this.props.curr_tag.preliminary_description} */}
                            </section>
                        </section>
                    </section>
                </section>
            </section>
        );
    }
}

class AddeditpanelTitleDescr extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            curr_tag: {},
        }

        this.title_ref = React.createRef();
        this.descr_ref = React.createRef();
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        if (prevProps.curr_tag !== this.props.curr_tag) {
            return true;
        } else {
            return null;
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (snapshot === true) {
            this.props.changeTextareaSize(this.title_ref.current);
            this.props.changeTextareaSize(this.descr_ref.current);
        }
    }

    render() {
        return (
            <section className="addeditpanel_field_section_container">
                <h3>Add or Edit Description</h3>
                <section className="addeditpanel_field_section">
                    <section className="addeditpanel_field_wrapper">
                        <div className="title_descr_padding_wrapper">
                            <textarea
                                name="title"
                                ref={this.title_ref}
                                onChange={this.props.handleChange}
                                className="addeditpanel_field title_area"
                                placeholder="Enter a title..."
                                value={this.props.curr_tag.title}
                            ></textarea>
                            <textarea
                                name="preliminary_description"
                                ref={this.descr_ref}
                                onChange={this.props.handleChange}
                                onKeyDown={this.props.handleDescrOnKeyDown}
                                onCut={this.props.handleDescrOnCutPaste}
                                onPaste={this.props.handleDescrOnCutPaste}
                                className="addeditpanel_field descr_area"
                                placeholder="Enter a description..."
                                value={this.props.curr_tag.preliminary_description}
                            ></textarea>
                        </div>
                        <div className="test_btn_area">
                            <button className="material-icons">add_photo_alternate</button>
                        </div>
                    </section>
                </section>
            </section>
        );
    }
}

class TypeSubtypeSelection extends React.Component {
    render() {
        return (
            <section id="type_subtype_selection">
                <section id="type_subtype_btns">
                    {
                        Object.entries(this.props.types_subtypes).map(([type_key, type_value]) =>
                            <TypeSubtypeArea
                                key={type_key + "_typesubtypearea"}
                                type_key={type_key}
                                type_value={type_value}
                                type_checked={this.props.type_checked}
                                subtype_checked={this.props.subtype_checked}
                                handleTypeClick={(text) => this.props.handleTypeClick(text)}
                                handleSubtypeClick={(text) => this.props.handleSubtypeClick(text)}
                            />
                        )
                    }
                </section>
            </section>
        );
    }
}

class TypeSubtypeArea extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            subtype_parent_flex_height: 0,
        }
        this.subtype_parent_flex_ref = React.createRef();
    }

    componentDidMount() {
        if (this.subtype_parent_flex_ref.current != null) {
            this.setState({ subtype_parent_flex_height: this.subtype_parent_flex_ref.current.clientHeight });
        }
    }

    render() {
        const type_value = { ...this.props.type_value };
        return (
            <>
                <button
                    className={"typebtn " + (this.props.type_key === this.props.type_checked ? "checked" : "")}
                    onClick={() => this.props.handleTypeClick(this.props.type_key)}
                >
                    {this.props.type_key}
                </button>
                {(type_value != null && type_value.constructor.name === "Object" && Object.entries(type_value).length !== 0) &&
                    <section
                        className="subtype_area"
                        style={{ height: (this.props.type_key === this.props.type_checked ? this.state.subtype_parent_flex_height : 0) + "px" }}
                    >
                        <section
                            className="subtype_parent_flex row"
                            ref={this.subtype_parent_flex_ref}
                        >
                            <section className="column">
                                {
                                    this.props.type_value.map((subtype_value, index) =>
                                        (index % 2 === 0) &&
                                        <button
                                            key={index}
                                            className={"subtypebtn " + (this.props.subtype_checked === subtype_value ? "checked" : "")}
                                            onClick={() => this.props.handleSubtypeClick(subtype_value)}
                                        >
                                            {subtype_value}
                                        </button>
                                    )
                                }
                            </section>
                            <section className="column">
                                {
                                    this.props.type_value.map((subtype_value, index) =>
                                        (index % 2 !== 0) &&
                                        <button
                                            key={index}
                                            className={"subtypebtn " + (this.props.subtype_checked === subtype_value ? "checked" : "")}
                                            onClick={() => this.props.handleSubtypeClick(subtype_value)}
                                        >
                                            {subtype_value}
                                        </button>
                                    )
                                }
                            </section>
                        </section>
                    </section>
                }
            </>
        );
    }
}

export default App;
