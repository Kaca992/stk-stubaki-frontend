import * as React from 'react';
import { Dropdown, Menu, Icon, IconProps } from 'semantic-ui-react';

import CustomLink from '../customLink/customLink';
import './header.scss';

export interface ILink {
    text: string;
    url?: string;
    icon?: IconProps;
    children?: ILink[];
}

export interface IHeaderProps {
    links: ILink[];
    isMobile?: boolean;
    mobileIconName?: string;
    className?: string;
}

// export interface IHeaderState {

// }

export default class Header extends React.Component<IHeaderProps, any> {
    public static defaultProps: Partial<IHeaderProps> = {
        isMobile: false,
        mobileIconName: 'content',
    };

    constructor(props: IHeaderProps) {
        super(props);

    }

    render() {
        return <div id='navigation-bar'>
            {this.props.isMobile ? this._renderMobile() : this._renderDesktop()}
        </div>;
    }

    private _renderItemDesktop(item: ILink, key: number) {
        if (item.url) {
            return <Menu.Item key={key}>
                <CustomLink to={item.url} text={item.text} icon={item.icon} />
            </Menu.Item>;
        }

        return <Menu.Menu key={key}>
            <Dropdown item text={item.text} simple>
                <Dropdown.Menu>
                    {item.children.map((value, index) => <Dropdown.Item key={index}><CustomLink to={value.url} text={value.text} icon={value.icon} /></Dropdown.Item>)}
                </Dropdown.Menu>
            </Dropdown>
        </Menu.Menu>;
    }

    private _renderItemMobile(item: ILink, key: number) {
        return <Dropdown.Item key={key}>
            {item.children ? <Icon name='dropdown' /> : null}
            <CustomLink to={item.url} text={item.text} icon={item.icon} />
            {
                item.children ? <Dropdown.Menu>
                        {item.children.map((value, index) => <Dropdown.Item key={index}><CustomLink to={value.url} text={value.text} icon={value.icon} /></Dropdown.Item>)}
                    </Dropdown.Menu>
                    : null
            }
        </Dropdown.Item>;
    }

    private _renderDesktop() {
        return (
            <Menu size='large' className="navigation-bar__container">
                {this.props.links.map((item, index) => this._renderItemDesktop(item, index))}
            </Menu>
        );
    }

    private _renderMobile() {
        return (
            <Menu size='large' className="navigation-bar__container">
                <Dropdown item icon={this.props.mobileIconName} simple>
                    <Dropdown.Menu>
                        {this.props.links.map((item, index) => this._renderItemMobile(item, index))}
                    </Dropdown.Menu>
                </Dropdown>
            </Menu>
        );
    }
}
