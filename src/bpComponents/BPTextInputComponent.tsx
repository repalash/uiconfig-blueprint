import React, {ChangeEventHandler} from "react";
import {BPComponentProps, UiConfigRendererContextType} from "./BPComponent";
import {InputGroup} from "@blueprintjs/core";
import {BPInputComponent} from "./BPInputComponent";

export class BPTextInputComponent extends BPInputComponent<string> {
    constructor(props: BPComponentProps<string>, context: UiConfigRendererContextType) {
        super(props, context, {value: '', label: 'Input'});
    }

    private _onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        this.setValue(e.target.value); // todo: set loading while this promise is happening.
    }

    renderInput() {
        return (
            <InputGroup
                // defaultValue={this.state.value} // for uncontrolled usage, we will also need ref and set ref.value on change: https://reactjs.org/docs/uncontrolled-components.html
                value={this.state.value}
                disabled={this.state.disabled}
                readOnly={this.state.readOnly}
                key={this.props.config.uuid}
                onChange={this._onChange}/>
        )
    }
}
