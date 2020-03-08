import React from 'react';
import logo from './logo.svg';
import './App.css';
import _ from 'lodash';

const FocusTrap = require('focus-trap-react');
// const cloneDeep = require('lodash.clonedeep');


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
    "meta_subtype": "Relation",
    "title": "This is a Title!",
    "preliminary_description": "this is a description. \n it will go inside a textarea. \n ..... \n fuggit.",
    "Story_tags": {
        "test": "Story_tags",
        "snake": "Story_tags"
    },
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

let q2 = {
    "meta_type": "Quality",
    "meta_subtype": "Passage",
    "title": "TITLE 2",
    "preliminary_description": "Descr the 2nd. \n it will go inside a textarea. \n ..... \n fuggit again.",
    "Story_tags": {
        "test2": "Story_tags",
        "snake2": "Story_tags",
    },
    "Turn_tags": {
        "T1": "Turn_tags"
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

class SingleQuality extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            identifier_height: 40,
            identifier_height_clicked: 0,
            clicked_class: "",
        }
        this.tagzone_ref = React.createRef();
    }

    componentDidMount() {
        this.setState({ identifier_height_clicked: this.tagzone_ref.current.offsetHeight + 45 });
    }

    showmoreClick() {
        this.state.clicked_class === "clicked" ? this.setState({ clicked_class: "" }) : this.setState({ clicked_class: "clicked" });
    }

    render() {
        return (
            <section className="single_quality data_parent">
                <div className="row">
                    <section className="single_quality_description_section">
                        <section className="single_quality_type_identifier"
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
                                <button className={`showmore small_button lightdark ${this.state.clicked_class}`}
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
                                                    className="tag_item"
                                                    style={this.props.lightdarkColorCalc(tagsearch.replace("_tags", ""))}
                                                >
                                                    {type_key}
                                                </span>
                                            )
                                        )
                                    )
                                }
                            </div>
                        </section>
                        <section className="single_quality_title">{this.props.data_obj.title}</section>
                        <section className="single_quality_description">{this.props.data_obj.preliminary_description}</section>
                    </section>
                    <section className="single_quality_edit_btn_section">
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
            darkmode_state: "",
            app_type_metadata: Object.assign({}, type_metadata),
            curr_tag: {},
            object_data: "",
            loadable_qualities: [...qarr],
            modal_open: false,
            modal_args: {},
            modal_return: {}
        }
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

    toggleDarkMode() {
        this.state.darkmode_state === "" ? this.setState({ darkmode_state: "darkmode" }) : this.setState({ darkmode_state: "" });
        console.log(this.state.curr_tag);
    }

    openMenuActivitySlider(text, data_obj) {
        this.setState({ menu_data_state: text });
        this.state.menu_state === "" ? this.setState({ menu_state: "activity_panel_slider_open" }) : this.setState({ menu_state: "" });
        if (text === "add_panel") {
            this.setState({ curr_tag: Object.assign({}, generic_tag) });
        } else {
            this.setState({ curr_tag: Object.assign({}, data_obj) });
        }
    }

    closeMenuActivitySlider() {
        this.state.menu_state === "" ? this.setState({ menu_state: "activity_panel_slider_open" }) : this.setState({ menu_state: "" });
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
            <section id="app" className={`lightdark ${this.state.darkmode_state} ${this.state.menu_state} ${(this.state.modal_open ? "modal_open" : "")}`}>
                <section id="page-wrapper">
                    <section id="page_subject">
                        <h1>Fish Tacos</h1>
                        {
                            this.state.loadable_qualities.map(data_obj =>
                                <SingleQuality
                                    key={data_obj.title}
                                    openMenuActivitySlider={(text, data_obj) => this.openMenuActivitySlider(text, data_obj)}
                                    data_obj={data_obj}
                                    lightdarkColorCalc={(tagtype) => this.lightdarkColorCalc(tagtype)}
                                    tagsearches={this.state.app_type_metadata[data_obj.meta_type].tagsearches}
                                />
                            )
                        }

                    </section>
                </section>
                <Menu
                    toggleDarkMode={() => this.toggleDarkMode()}
                    openMenuActivitySlider={(text) => this.openMenuActivitySlider(text)}
                    closeMenuActivitySlider={() => this.closeMenuActivitySlider()}
                    menu_state={this.state.menu_state}
                    menu_data_state={this.state.menu_data_state}
                    app_type_metadata={this.state.app_type_metadata}
                    curr_tag={this.state.curr_tag}
                    lightdarkColorCalc={(tagtype) => this.lightdarkColorCalc(tagtype)}
                    toggleModal={(modal_args) => this.toggleModal(modal_args)}
                    modal_return={this.state.modal_return}
                />
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
                    <label className="switch">
                        <input
                            type="checkbox"
                            id="darkmode_switch"
                            onClick={this.props.toggleDarkMode}
                        />
                        <span className="slider round"></span>
                    </label>
                    {/* <span className="input_width_placeholder"></span> */}
                </section>
                <ActivityPanelSlider
                    menu_data_state={this.props.menu_data_state}
                    app_type_metadata={this.props.app_type_metadata}
                    curr_tag={this.props.curr_tag}
                    lightdarkColorCalc={(tagtype) => this.props.lightdarkColorCalc(tagtype)}
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
                        toggleModal={(modal_args) => this.props.toggleModal(modal_args)}
                        modal_return={this.props.modal_return}
                    />
                ) : (
                        "Reason other than addeditpanel that menu is opened..."
                    )}
            </section>
        );
    }
}

class AddEditPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            curr_tag: this.props.curr_tag,
        }
        this.changeTextareaSize = this.changeTextareaSize.bind(this);
        this.handleChange = this.handleChange.bind(this);
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
            this.setState({ curr_tag: this.props.curr_tag });
        }
    }

    addTag(tagobj) {
        let tag_key = Object.entries(tagobj)[0][0];
        let tag_val = Object.entries(tagobj)[0][1];
        let curr_tag = _.cloneDeep(this.state.curr_tag);
        findObj(curr_tag, tag_val)[tag_val][tag_key] = tag_val;
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

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

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

    render() {
        const editcontext_type_subtypes = { ...this.props.app_type_metadata["types_subtypes"] };
        for (let key in editcontext_type_subtypes) {
            if (key !== this.state.curr_tag["meta_type"]) {
                delete editcontext_type_subtypes[key];
            }
        }
        return (
            <section id="addeditpanel">
                <div className="top_padding"></div>
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
                    />
                </section>
                {(this.state.curr_tag.meta_type != null && this.state.curr_tag.meta_type !== "") &&
                    Object.entries(this.props.app_type_metadata[this.state.curr_tag.meta_type].tagsearches).map(([type_key, type_value]) =>
                        <TagSearch
                            key={type_key}
                            name={type_key}
                            tagsearch_arr={type_value}
                            lightdarkColorCalc={(tagtype) => this.props.lightdarkColorCalc(tagtype)}
                            toggleModal={(modal_args) => this.props.toggleModal(modal_args)}
                            modal_return={this.props.modal_return}
                            addTag={(tagobj) => this.addTag(tagobj)}
                            clearTag={(tagobj) => this.clearTag(tagobj)}
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
            readied: {}
        }
        this.onSearchChange = this.onSearchChange.bind(this);
        this.onSearchkeyDown = this.onSearchkeyDown.bind(this);
        this.onInputBlur = this.onInputBlur.bind(this);
        this.width_placeholder_ref = React.createRef();
        this.input_ref = React.createRef();
    }

    updateInputWidth() {
        this.setState({ input_style_width: this.width_placeholder_ref.current.offsetWidth + 1 });
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

    clearTag(tagobj) {
        let newtags = [...this.state.newtags];
        let tagarr_LHS = [...this.state.tagarr_LHS];
        let tagarr_RHS = [...this.state.tagarr_RHS];
        let tag_key = Object.entries(tagobj)[0][0];
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
        this.props.clearTag(tagobj);
        input.focus();
    }

    clearInput() {
        this.setState({ curval: "" });
        this.setState({ input_style_width: 0 });
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        if (this.state.awaiting_modal_return && prevProps.modal_return !== this.props.modal_return) {
            return true;
        } else {
            return null;
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (snapshot === true) {
            this.addTag(this.props.modal_return, true);
            // { [curval]: tagsearch_arr[0] }, true
            this.setState({ awaiting_modal_return: false });
        }
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
                            // TODO (Show popup... we are not there yet)
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

    onInputBlur(e) {
        if (e.relatedTarget == null || e.relatedTarget.closest(".addeditpanel_field_wrapper") !== this.input_ref.current.closest(".addeditpanel_field_wrapper")) {
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

    render() {
        let name = this.props.name.replace("_tags", "");
        const type_span = <span
            className="tag_item"
            style={this.props.lightdarkColorCalc(name)}
        >
            {name}
        </span>;

        return (
            <section className="addeditpanel_field_section_container">
                <h3>Add or Edit {type_span} Tags</h3>
                <section className="addeditpanel_field_section">
                    <section className="addeditpanel_field_wrapper">
                        <section className="addedittag_section addeditpanel_field">
                            {
                                this.state.tagarr_LHS.map(tagobj =>
                                    <span
                                        key={`${Object.entries(tagobj)[0][0]} ${Object.entries(tagobj)[0][1]}`}
                                        className={`tag_item ${this.state.newtags.includes(Object.entries(tagobj)[0][0]) ? "new_tag" : ""} ${this.state.sametag === Object.entries(tagobj)[0][0] ? "blur_tag" : ""}`}
                                        style={this.props.lightdarkColorCalc(Object.entries(tagobj)[0][1].replace("_tags", ""))}
                                    >
                                        {Object.entries(tagobj)[0][0]}
                                        <button
                                            className={`cleartag_btn ${this.tagobjsEquivalent(tagobj, this.state.readied) ? "readied" : ""}`}
                                            onClick={() => this.clearTag(tagobj)}
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
                                        onBlur={this.onInputBlur}
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
                                                    onClick={() => this.addTag({ [result_arr[1]]: result_arr[2] })}
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
                                        key={Object.entries(tagobj)[0][0]}
                                        className={`tag_item ${this.state.newtags.includes(Object.entries(tagobj)[0][0]) ? "new_tag" : ""} ${this.state.sametag === Object.entries(tagobj)[0][0] ? "blur_tag" : ""}`}
                                        style={this.props.lightdarkColorCalc(Object.entries(tagobj)[0][1].replace("_tags", ""))}
                                    >
                                        {Object.entries(tagobj)[0][0]}
                                        <button
                                            className={`cleartag_btn ${this.tagobjsEquivalent(tagobj, this.state.readied) ? "readied" : ""}`}
                                            onClick={() => this.clearTag(tagobj)}
                                        >
                                            <span
                                                className="material-icons noselect cleartag">clear</span>
                                        </button>
                                    </span>
                                )
                            }
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
                                    Object.entries(this.props.type_value).map(([subtype_key, subtype_value]) =>
                                        (subtype_key % 2 === 0) &&
                                        <button
                                            key={subtype_key}
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
                                    Object.entries(this.props.type_value).map(([subtype_key, subtype_value]) =>
                                        (subtype_key % 2 !== 0) &&
                                        <button
                                            key={subtype_key}
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
