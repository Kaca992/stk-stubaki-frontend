import * as React from 'react';
import {  Link, Redirect } from 'react-router-dom';
import * as classNames from 'classnames';
import { autobind } from 'core-decorators';
import { IconProps, ButtonProps, Button } from 'semantic-ui-react';

// import './btnLink.scss';

export interface IButtonLinkProps extends ButtonProps {
    to?: string;
}

export interface IButtonLinkState {
    navigate: boolean;
}

export default class ButtonLink extends React.Component<IButtonLinkProps, IButtonLinkState> {
    constructor(props: IButtonLinkProps) {
        super(props);

        this.state = {
            navigate: false
        };
    }

    @autobind
    _onBtnClick() {
        if (!this.props.to) {
            return;
        }

        this.setState({navigate: true});
    }

    render() {
        if (this.state.navigate && this.props.to) {
            return <Redirect to={this.props.to} push={true} />;
        }

        return (
            <Button {...this.props} onClick={this._onBtnClick}>
                {this.props.children}
            </Button>
        );
    }
}
