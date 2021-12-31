import React from 'react';
import axios from 'axios';
import { exercises } from '../../assets/exercises';
import { infoFields } from '../../assets/infoFields';

import styles from './Home.module.scss';

const Home = () => {
    const [fields, setFields] = React.useState(infoFields);
    const [submit, setSubmit] = React.useState(false);

    const loadResults = async () => {
        try {
            await axios.post('https://616b367a16c3fa0017171626.mockapi.io/results', fields);
        } catch (error) {
            alert('Ошибка при запросе данных');
            console.error(error);
        }
    };

    const handleChangeInput = (event) => {
        const { name, value } = event.target;
        setFields({
            ...fields,
            [name]: value,
        });
    };

    const onSubmit = (event) => {
        event.preventDefault();
        loadResults();
        setSubmit(true);
        setFields(infoFields);
    };

    return (
        <>
            {submit ? (
                <div className={styles.resultsSuccess}>
                    <h3>Результаты опубликованы!</h3>
                    <button onClick={() => setSubmit(false)}>Назад</button>
                </div>
            ) : (
                <form onSubmit={onSubmit}>
                    <div className={styles.textField}>
                        <label htmlFor="name">Ваше имя</label>
                        <input
                            onChange={handleChangeInput}
                            value={fields.personName}
                            required="required"
                            type="text"
                            autoComplete="off"
                            name="personName"
                        />
                    </div>
                    <div className={styles.personInfo}>
                        <div className={styles.textField + ' ' + styles.personInfoDate}>
                            <label htmlFor="date">Дата</label>
                            <input
                                onChange={handleChangeInput}
                                value={fields.date}
                                required="required"
                                type="date"
                                autoComplete="off"
                                name="date"
                                lang="en"
                                placeholder="MM/DD/YYYY"
                            />
                            {/* <img src="img/remove.svg" alt="Clear" /> */}
                        </div>
                        <div className={styles.textField + ' ' + styles.personInfoWeight}>
                            <label htmlFor="weight">Вес, кг</label>
                            <input
                                onChange={handleChangeInput}
                                value={fields.personWeight}
                                type="text"
                                required="required"
                                pattern="[0-9]+([\.][0-9]{1,2})?"
                                name="personWeight"
                                autoComplete="off"
                            />
                        </div>
                    </div>
                    <div className={styles.textField}>
                        <label htmlFor="type">Вид упражнения</label>
                        <select
                            onChange={handleChangeInput}
                            name="exerciseType"
                            value={fields.exerciseType}>
                            {exercises.map((item) => {
                                return (
                                    <option key={item.id} value={item.exerciseType}>
                                        {item.exerciseType}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <div>
                        <div className={styles.replaysTitle}>
                            <div>№ подхода</div>
                            <div>Вес, кг</div>
                            <div>Кол-во</div>
                        </div>
                        <div className={styles.firstReplay}>
                            <div className={styles.replayNumbers}>
                                <div>1</div>
                            </div>
                            <div className={styles.textField}>
                                <label htmlFor="gumWeight"></label>
                                <input
                                    onChange={handleChangeInput}
                                    value={fields.gymWeightFirst}
                                    type="text"
                                    pattern="[0-9]+([\.][0-9]{1,2})?"
                                    name="gymWeightFirst"
                                    autoComplete="off"
                                />
                            </div>
                            <div className={styles.textField}>
                                <label htmlFor="numbers"></label>
                                <input
                                    onChange={handleChangeInput}
                                    value={fields.replaysFirst}
                                    type="text"
                                    pattern="[0-9]+([\.][0-9]{1,2})?"
                                    name="replaysFirst"
                                    autoComplete="off"
                                />
                            </div>
                        </div>
                        <div className={styles.secondReplay}>
                            <div className={styles.replayNumbers}>
                                <div>2</div>
                            </div>
                            <div className={styles.textField}>
                                <label htmlFor="gumWeight"></label>
                                <input
                                    onChange={handleChangeInput}
                                    value={fields.gymWeightSecond}
                                    type="text"
                                    pattern="[0-9]+([\.][0-9]{1,2})?"
                                    name="gymWeightSecond"
                                    autoComplete="off"
                                />
                            </div>
                            <div className={styles.textField}>
                                <label htmlFor="numbers"></label>
                                <input
                                    onChange={handleChangeInput}
                                    value={fields.replaysSecond}
                                    type="text"
                                    pattern="[0-9]+([\.][0-9]{1,2})?"
                                    name="replaysSecond"
                                    autoComplete="off"
                                />
                            </div>
                        </div>
                        <div className={styles.thirdReplay}>
                            <div className={styles.replayNumbers}>
                                <div>3</div>
                            </div>
                            <div className={styles.textField}>
                                <label htmlFor="gumWeight"></label>
                                <input
                                    onChange={handleChangeInput}
                                    value={fields.gymWeightThird}
                                    type="text"
                                    pattern="[0-9]+([\.][0-9]{1,2})?"
                                    name="gymWeightThird"
                                    autoComplete="off"
                                />
                            </div>
                            <div className={styles.textField}>
                                <label htmlFor="numbers"></label>
                                <input
                                    onChange={handleChangeInput}
                                    value={fields.replaysThird}
                                    type="text"
                                    pattern="[0-9]+([\.][0-9]{1,2})?"
                                    name="replaysThird"
                                    autoComplete="off"
                                />
                            </div>
                        </div>
                    </div>
                    <button>Опубликовать результат</button>
                </form>
            )}
        </>
    );
};

export default Home;
