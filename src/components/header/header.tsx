import * as React from 'react';
import { Dropdown, Menu, Icon, IconProps } from 'semantic-ui-react';
import { autobind } from 'core-decorators';

import CustomLink from '../customLink/customLink';
import Drawer from '../drawer/drawer';
import './header.scss';

export interface ILink {
    text: string;
    url?: string;
    icon?: IconProps;
    children?: ILink[];
}

export interface IHeaderProps {
    links: ILink[];
    headerLink?: ILink;

    isMobile?: boolean;
    mobileIconName?: string;

    className?: string;
}

export interface IHeaderState {
    isDrawerOpen: boolean;
}

export default class Header extends React.Component<IHeaderProps, IHeaderState> {
    public static defaultProps: Partial<IHeaderProps> = {
        isMobile: false,
        mobileIconName: 'content',
    };

    constructor(props: IHeaderProps) {
        super(props);

        this.state = {
            isDrawerOpen: false,
        };
    }

    render() {
        return <div id='navigation-bar' className={this.props.className} >
            {this.props.isMobile ? this._renderMobile() : this._renderDesktop()}
        </div>;
    }

    private _renderItemDesktop(item: ILink, key: number) {
        if (!item) {
            return null;
        }

        if (item.url) {
            return <Menu.Item key={key}>
                <CustomLink to={item.url} text={item.text} icon={item.icon} />
            </Menu.Item>;
        }

        return <Menu.Menu key={key}>
            <Dropdown item open={false} text={item.text} simple className='dropdown-link'>
                <Dropdown.Menu>
                    {item.children && item.children.map((value, index) => <Dropdown.Item key={index}><CustomLink to={value.url} text={value.text} icon={value.icon} /></Dropdown.Item>)}
                </Dropdown.Menu>
            </Dropdown>
        </Menu.Menu>;
    }

    private _renderItemMobile(item: ILink, key: number) {
        if (!item) {
            return null;
        }

        if (item.children) {
            return <Menu.Item key={key}>
                <Menu.Header>
                    <CustomLink to={item.url} text={item.text} icon={item.icon} />
                </Menu.Header>
                <Menu.Menu>
                    {item.children.map((value, index) => <Menu.Item key={index}><CustomLink to={value.url} text={value.text} icon={value.icon} onClick={this._changeDrawerState} /></Menu.Item>)}
                </Menu.Menu>
            </Menu.Item>;
        }

        return <Menu.Item key={key}><CustomLink to={item.url} text={item.text} icon={item.icon} onClick={this._changeDrawerState} /></Menu.Item>;
    }

    private _renderDesktop() {
        const headerLink = this.props.headerLink;

        return (
            <Menu size='large' className="navigation-bar__container" borderless>
                {headerLink ? <CustomLink to={headerLink.url} text={headerLink.text} icon={headerLink.icon} className='header-link' /> : null}
                {this.props.links.map((item, index) => this._renderItemDesktop(item, index))}
            </Menu>
        );
    }

    private _renderMobile() {
        const headerLink = this.props.headerLink;

        return (
            <div>
                <Menu size='large' className="navigation-bar__container" borderless>
                    {headerLink ? <CustomLink to={headerLink.url} text={headerLink.text} icon={headerLink.icon} className='header-link' /> : null}
                    <Menu.Item icon={this.props.mobileIconName} onClick={this._changeDrawerState} className='menu-link' />
                </Menu>

                <Drawer isOpen={this.props.isMobile && this.state.isDrawerOpen} onCloseBtnClick={this._changeDrawerState} openDirection='right' >
                    <Menu vertical fluid className="navigation-bar__drawer-menu">
                        {this.props.links.map((item, index) => this._renderItemMobile(item, index))}
                    </Menu>
                </Drawer>
            </div>
        );
    }

    @autobind
    private _changeDrawerState() {
        this.setState((prevState) => {
            return { isDrawerOpen: !prevState.isDrawerOpen };
        });
    }
}
