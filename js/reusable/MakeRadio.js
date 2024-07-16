function MakeRadio({objList, selected}) {

    // Then you can reference variables: prompt, objList, selected.
    // objects in objList should have these properties: showOption and value



    // MakeTag: htmlTag (req'd). Optional: innerHTML, cssClass, src, type, name, value, parent.
    var frm = MakeTag({
        htmlTag: "form",
        cssClass: "radio"
    });
    frm.appendChild(MakeTag({
        htmlTag: "span",
    }));


    if (!objList[0]) {
        alert("MakeRadio needs an objList with at least one object inside");
        return frm;
    }

    selected = selected; // if not provided, no radio option will be pre-selected

    // "for .. of" is easier way to iterate over objList without needing to use an index
    for (var obj of objList) {
        var para = MakeTag({
            htmlTag: "p",
            innerHTML: obj.showOption,
            parent: frm
        });
        var option = MakeTag({
            htmlTag: "input",
            parent: para
        });

        option.setAttribute("type", "radio");
        option.setAttribute("name", "radName");
        option.setAttribute("value", obj.value);

        if (selected === obj.value) {
            option.checked = "checked";
        }
    }

    frm.getValue = function () {
        // console.log("value: "+ frm.radName.value);
        return frm.radName.value;
    };

    return frm;
}