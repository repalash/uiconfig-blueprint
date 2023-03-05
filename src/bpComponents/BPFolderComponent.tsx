import React, {DOMAttributes} from "react";
import {BPComponentProps} from "./BPComponent";
import {Button, Collapse, Icon, Intent} from "@blueprintjs/core";
import {ConfigObject} from "../ConfigObject";
import {BPLabelledComponent, BPLabelledComponentState} from "./BPLabelledComponent";
import {PanelActions} from "@blueprintjs/core/lib/esm/components/panel-stack2/panelTypes";
import {UiObjectConfig} from 'uiconfig'
import {getOrCall, safeSetProperty} from 'ts-browser-helpers'

export type BPFolderComponentState = BPLabelledComponentState & {
    children: UiObjectConfig[]
    expanded: boolean
}

export class BPFolderComponent extends BPLabelledComponent<void, BPFolderComponentState, BPComponentProps<void>&PanelActions> {
    constructor(props: BPComponentProps<void>&PanelActions, context: any) {
        super(props, context, {children: [], expanded: false, label: 'Folder'});
    }

    getUpdatedState(state:BPFolderComponentState) {
        return {
            ...super.getUpdatedState(state),
            // children: (this.props.config.children || []).map(c => getOrCall(c) || {}).flat(2),
            children: this.context.methods.getChildren(this.props.config),
            expanded: getOrCall(this.props.config.expanded) ?? false,
        }
    }

    render() {
        const setExpanded = (e: boolean) => {
            if (e === this.state.expanded) return
            this.setState({...this.state, expanded: e})
            safeSetProperty(this.props.config, "expanded", e, true)
            // if (e) this.state.children.forEach(c => Array.isArray(c) ? null : c.uiRefresh?.("postFrame", true, 1)) // todo: handle array and functions
        }

        return (
            <FolderHeadCard
                key={this.props.config.uuid}
                open={this.state.expanded}
                minimal={(this.props.level ?? 0) > 0}
                onClick={() => {
                    setExpanded(!this.state.expanded)
                }}
                label={this.state.label}
            >
                <Collapse isOpen={this.state.expanded} keepChildrenMounted={false}>
                    <div className="folder-children" style={{listStyleType: "none", paddingLeft: "0"}}>
                        {this.state.children.map((c, i) => <ConfigObject key={'c' + i} {...this.props} config={c}
                                                                         level={(this.props.level ?? 0) + 1}/>)}
                    </div>
                </Collapse>
            </FolderHeadCard>
        )
    }
}

export const FolderHeadCard: React.FC<React.PropsWithChildren<{ open: boolean, label: string, minimal: boolean, onClick: DOMAttributes<HTMLElement>['onClick'] }>> = (props) => {
    return (
        <div
            // interactive={!props.open}
            className="folder-card"
            // elevation={props.open ? 3 : undefined}
        >
            <div className={props.minimal ? 'folder-head-card-minimal' : 'folder-head-card'}>
                {/*<H6 className="folder-head-label"*/}
                {/*    onClick={props.onClick}>{props.label}</H6>*/}
                {/*<Icon icon="chevron-right" style={{*/}
                {/*    rotate: props.open ? "90deg" : "0deg",*/}
                {/*    transition: "rotate 0.25s ease-in-out"*/}
                {/*}} className="folder-head-label-icon"/>*/}

                {/*<Button className="folder-trigger-button" onClick={props.onClick}*/}
                {/*        fill={true} minimal={true}*/}
                {/*        rightIcon={(*/}
                {/*            <Icon icon="chevron-right" style={{*/}
                {/*                rotate: props.open ? "90deg" : "0deg",*/}
                {/*                transition: "rotate 0.25s ease-in-out"*/}
                {/*            }} className="folder-head-label-icon"/>*/}
                {/*        )}>{props.label}*/}
                {/*</Button>*/}

                <Button
                    className="folder-trigger-button" fill={!props.minimal} onClick={props.onClick}
                    minimal={true}
                    small={props.minimal}
                    style={props.minimal ? {} : {fontSize: "0.95rem", paddingTop: "8px", paddingBottom: "8px"}}
                    intent={props.open ? Intent.PRIMARY : Intent.NONE}
                    rightIcon={(
                        <Icon icon="chevron-right" style={{
                            rotate: props.open ? "90deg" : "0deg",
                            transition: "rotate 0.25s ease-in-out"
                        }}/>
                    )}>{props.label}
                </Button>
            </div>
            {props.children}
        </div>
    )
}