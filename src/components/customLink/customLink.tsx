import * as React from 'react';
import { Link } from 'react-router-dom';
import { Icon, IconProps } from 'semantic-ui-react';

import * as classNames from 'classnames';

export interface ICustomLinkProps {
    text?: string;
    icon?: IconProps;
    to?: string;
    className?: string;

    onClick?(): void;
}

export default class CustomLink extends React.PureComponent<ICustomLinkProps, any> {
    render() {
        const className = classNames('custom-link', this.props.className);
        const to = this.props.to ? this.props.to : "#";

        return (
            <Link to={to} className={className} onClick={this.props.onClick} >
                <span>
                    {this.props.icon ? <Icon {...this.props.icon} /> : null}
                    {this.props.text}
                </span>
            </Link>
        );
    }
}
