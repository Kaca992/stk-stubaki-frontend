import * as React from 'react';

import './drawer.scss';

const classNames = require('classnames');

export interface IDrawerProps {
    isOpen?: boolean;
    className?: string;
}

export default class Drawer extends React.Component<IDrawerProps, any> {
    public static defaultProps: Partial<IDrawerProps> = {
        isOpen: false,
    };

    render() {
        const className = classNames(
            'drawer-container',
            this.props.className,
            {
                'drawer-container__opened': this.props.isOpen,
            },
        );

        return (
            <div className={className}>
                {this.props.children}
            </div>
        );
    }
}
