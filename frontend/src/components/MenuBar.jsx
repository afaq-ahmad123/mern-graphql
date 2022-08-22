import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

export default function MenuBar () {
    const pathname = window.location.pathname;
    const path = pathname === '/' ? 'home' : pathname.substring(1);

    const [activeItem, setItem] = useState(path);
    const handleItemClick = (e, { name }) => setItem(name);

    return (
        <div>
            <Menu pointing secondary size="massive" color='teal' >
                <Menu.Item
                    name='home'
                    active={activeItem === 'home'}
                    onClick={handleItemClick}
                    as={Link}
                    to='/'
                />
                
                <Menu.Menu position='right'>
                <Menu.Item
                    name='login'
                    active={activeItem === 'login'}
                    onClick={handleItemClick}
                    as={Link}
                    to='/login'
                />
                <Menu.Item
                    name='register'
                    active={activeItem === 'register'}
                    onClick={handleItemClick}
                    as={Link}
                    to='/register'
                />
                </Menu.Menu>
            </Menu>
        </div>
    );
}