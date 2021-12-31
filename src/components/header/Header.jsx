import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Header.module.scss';

const Header = () => {
    const [classActive, setClassActive] = React.useState('0');

    const addActive = (event) => setClassActive(event.target.id);

    return (
        <div className={styles.header}>
            <Link to="/">
                <h2>Контроль силовых показателей</h2>
            </Link>
            <ul>
                <Link to="/">
                    <li
                        id={0}
                        onClick={addActive}
                        className={classActive === '0' ? `${styles.active}` : ''}>
                        Главная
                    </li>
                </Link>
                <Link to="/results">
                    <li
                        id={1}
                        onClick={addActive}
                        className={classActive === '1' ? `${styles.active}` : ''}>
                        Результаты
                    </li>
                </Link>
            </ul>
        </div>
    );
};

export default Header;
