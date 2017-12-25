import * as React from 'react';

import './drawer.scss';

const classNames = require('classnames');

type DrawerDirectionType = 'left' | 'right';

export interface IDrawerProps {
    isOpen?: boolean;
    className?: string;

    showHeader?: boolean;
    headerImg?: string;
    headerClassName?: string;

    openDirection?: DrawerDirectionType;

    onCloseBtnClick(): void;
}

export default class Drawer extends React.Component<IDrawerProps, any> {
    public static defaultProps: Partial<IDrawerProps> = {
        openDirection: 'left',
    };

    render() {
        const className = classNames(
            'drawer-container',
            this.props.className,
            {
                'drawer-container__opened': this.props.isOpen,
                'drawer-container__left': this.props.openDirection === 'left',
                'drawer-container__right': this.props.openDirection === 'right',
            },
        );

        const headerClassName = classNames(
            'drawer-container__header',
            this.props.className,
        );

        return (
            <div className={className}>
                <div className='closebtn' onClick={this.props.onCloseBtnClick}>
                    &times;
                </div>
                {
                    this.props.showHeader && <div className={headerClassName}>
                        HEADER
                    </div>
                }

                <div className='drawer-container__content'>
                    {this.props.children}
                </div>
            </div>
        );
    }
}
