import React from 'react';
import axios from 'axios';
import { exercises } from '../../assets/exercises';
import Pagination from '../../components/pagination/Pagination';

import styles from './Results.module.scss';

const Results = () => {
    const [getResults, setGetResults] = React.useState([]);
    const [fields, setFields] = React.useState({
        personName: '',
        exerciseType: '',
        date: '',
    });
    const [isLoading, setIsLoading] = React.useState(true);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [resultsPerPage] = React.useState(5);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleChangeInput = (event) => {
        const { name, value } = event.target;
        setFields({
            ...fields,
            [name]: value,
        });
        setCurrentPage(1);
    };

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const { data } = await axios.get(
                    'https://616b367a16c3fa0017171626.mockapi.io/results',
                );
                setGetResults(data.reverse());
                setIsLoading(false);
            } catch (error) {
                alert('Ошибка при запросе данных');
                console.error(error);
            }
        };
        fetchData();
    }, []);

    const filterResults = getResults
        .filter((item) => item.personName.toLowerCase().includes(fields.personName.toLowerCase()))
        .filter((item) => item.exerciseType.includes(fields.exerciseType))
        .filter((item) => item.date.includes(fields.date));

    const lastResultIndex = currentPage * resultsPerPage;
    const firstResultIndex = lastResultIndex - resultsPerPage;
    const currentResult = filterResults.slice(firstResultIndex, lastResultIndex);

    return (
        <div>
            {isLoading ? (
                <h3>Загрузка...</h3>
            ) : (
                <div className={styles.results}>
                    <div>
                        <div className={styles.searchPanel}>
                            <div className={styles.searchName}>
                                <div>Поиск по имени</div>
                                <input
                                    type="text"
                                    onChange={handleChangeInput}
                                    value={fields.personName}
                                    name="personName"
                                    placeholder="Введите имя..."
                                />
                            </div>
                            <div className={styles.searchDate}>
                                <div>Поиск по дате</div>
                                <input
                                    type="date"
                                    onChange={handleChangeInput}
                                    value={fields.date}
                                    name="date"
                                    placeholder="MM/DD/YYYY"
                                />
                            </div>
                        </div>
                        <div className={styles.exerciseChoose}>
                            <div>Поиск по упражнению</div>
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
                        <div className={styles.resultsInfo}>
                            {currentResult.map((item) => {
                                return (
                                    <div key={item.id} className={styles.resultsPerson}>
                                        <div className={styles.resultsPersonInfo}>
                                            <div className={styles.resultsPersonInfoParams}>
                                                <div>{item.personName},</div>
                                                <div className={styles.resultsPersonInfoWeight}>
                                                    {item.personWeight} кг
                                                </div>
                                            </div>
                                            <div className={styles.resultsParams}>
                                                <span className={styles.resultsNames}>Дата: </span>
                                                <span className={styles.resultsIndicators}>
                                                    {item.date.split('-').reverse().join('-')}
                                                </span>
                                            </div>
                                        </div>

                                        <div>
                                            <div className={styles.resultsExercises}>
                                                <div className={styles.resultsParams}>
                                                    <span className={styles.resultsNames}>
                                                        Упражнение:
                                                    </span>
                                                    <div className={styles.resultsExerciseType}>
                                                        {item.exerciseType}
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className={styles.resultsExercisesRow}>
                                                        <div>Подход</div>
                                                        <div>Вес, кг</div>
                                                        <div>Кол-во</div>
                                                    </div>
                                                    <div className={styles.resultsExercisesInfo}>
                                                        <div
                                                            className={
                                                                styles.resultsExercisesColumn
                                                            }>
                                                            <div>1</div>
                                                            <div>2</div>
                                                            <div>3</div>
                                                        </div>
                                                        <div
                                                            className={
                                                                styles.resultsExercisesColumn
                                                            }>
                                                            <div>
                                                                {item.gymWeightFirst
                                                                    ? item.gymWeightFirst
                                                                    : '-'}
                                                            </div>
                                                            <div>
                                                                {item.gymWeightSecond
                                                                    ? item.gymWeightSecond
                                                                    : '-'}
                                                            </div>
                                                            <div>
                                                                {item.gymWeightThird
                                                                    ? item.gymWeightThird
                                                                    : '-'}
                                                            </div>
                                                        </div>
                                                        <div
                                                            className={
                                                                styles.resultsExercisesColumn
                                                            }>
                                                            <div>
                                                                {item.replaysFirst
                                                                    ? item.replaysFirst
                                                                    : '-'}
                                                            </div>
                                                            <div>
                                                                {item.replaysSecond
                                                                    ? item.replaysSecond
                                                                    : '-'}
                                                            </div>
                                                            <div>
                                                                {item.replaysThird
                                                                    ? item.replaysThird
                                                                    : '-'}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    {filterResults.length ? (
                        <Pagination
                            resultsPerPage={resultsPerPage}
                            totalResults={filterResults.length}
                            paginate={paginate}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                        />
                    ) : (
                        <h3 style={{ textAlign: 'center' }}>Пользователь не найден</h3>
                    )}
                </div>
            )}
        </div>
    );
};

export default Results;
