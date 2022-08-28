import React, { useState } from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import { AuthContext } from '../context/auth';

export default function MenuBar () {
    const pathname = window.location.pathname;
    const { user, logout } = useContext(AuthContext);
    const path = pathname === '/' ? 'home' : pathname.substring(1);

    const [activeItem, setItem] = useState(path);
    const handleItemClick = (e, { name }) => setItem(name);

    return (
        <div>
            {user ? (
                <Menu pointing secondary size="massive" color='teal' >
                    <Menu.Item
                        name={user?.username}
                        active={true}
                        as={Link}
                        to='/'
                    />
                    
                    <Menu.Menu position='right'>
                        <Menu.Item
                            name='logout'
                            active={activeItem === 'logout'}
                            onClick={logout}
                            as={Link}
                            to='/login'
                        />
                    </Menu.Menu>
                </Menu>
            ) : (
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
            )}
        </div>
    );
}