import * as React from 'react';
import { Link } from 'react-router-dom';
import { Icon, IconProps } from 'semantic-ui-react';

const classNames = require('classnames');

export interface ICustomLinkProps {
    text?: string;
    icon?: IconProps;
    to?: string;
    className?: string;
}

export default class CustomLink extends React.PureComponent<ICustomLinkProps, any> {
    public static defaultProps: Partial<ICustomLinkProps> = {
        to: '#',
    };

    render() {
        const className = classNames('custom-link', this.props.className);

        return (
            <Link to={this.props.to} className={className}>
                <span>
                    {this.props.icon ? <Icon {...this.props.icon} /> : null}
                    {this.props.text}
                </span>
            </Link>
        );
    }
}
