//NOTES: have everything reset when leaving the addeditpanel_field_wrapper




onClick = {() => this.showmoreClick()}

showmoreClick() {
    this.state.clicked_class === "clicked" ? this.setState({ clicked_class: "" }) : this.setState({ clicked_class: "clicked" });
}


// on parent holder:
style = {{ height: (this.state.clicked_class === "clicked" ? this.state.identifier_height_clicked : this.state.identifier_height) + "px" }}


onClick={(e) => { this.clickMe(e, someparameter) }}


        // Promise.resolve({

        
        // }).then(p => {
        //     this.setState({ keydown_cutpaste_sel_start: "" });
        //     this.setState({ keydown_cutpaste_sel_end: "" }, function () {
        //         // console.log(input.selectionStart);
        //     });
        //     return p;
        // });