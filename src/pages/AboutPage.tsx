import React, { useEffect } from 'react';
import {Link} from 'react-router-dom';
// import { useAppSelector} from '../hooks/redux-hooks';


export function AboutPage() {
    // const dispatch = useAppDispatch();

    useEffect(() => {

    })

    // const item = useAppSelector(state => state.items)


    return (
        <section className="about">
            <div className="container about__container">
                <div className="about__content">
                    <h2 className="about__title">Страница для практики</h2>
                    {/*<p className="about__description">react-redux</p>*/}
                    <Link to="/quiz" className="about__button button">quiz</Link>
                    {/*{item.items.map((item) => (<div key={item.title}>{item.title}</div>))}*/}
                </div>

            </div>
        </section>
    );
}