import {BPValueComponent, BPValueComponentState} from "./BPValueComponent";
import {BPComponentProps} from "./BPComponent";
import React, {ReactNode} from "react";
import {FormGroupComponent} from "../components/FormGroupComponent";

export abstract class BPInputComponent<
    TStateValue, TState extends BPValueComponentState<TStateValue> = BPValueComponentState<TStateValue>>
    extends BPValueComponent<TStateValue, TState, TStateValue> {

    protected constructor(props: BPComponentProps<TStateValue>, context: any, state: TState) {
        super(props, context, state);
    }

    convertValueToState(value: TStateValue, state: TState): TState {
        return {...state, value}
    }

    async convertStateToValue(state: TState): Promise<TStateValue> {
        return state.value;
    }

    abstract renderInput(): ReactNode;

    protected flexBasis = "100%"

    render() {
        return (
            <FormGroupComponent label={this.state.label} flexBasis={this.flexBasis}>
                {this.renderInput()}
            </FormGroupComponent>
        )
    }
}
