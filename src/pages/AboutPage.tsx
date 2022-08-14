import React, { useEffect } from 'react';
import { useAuth } from '../hooks/use-auth';
import { removeUser } from '../store/slices/userSlice';
import { useAppDispatch } from '../hooks/redux-hooks';

export function AboutPage() {
    const dispatch = useAppDispatch();
    const { isAuth } = useAuth();

    useEffect(() => {

    })

    return (
        <section className="about">
            <div className="container about__container">
                <div className="about__content">
                    <h2 className="about__title">Смена красок этих трогательней, Постум,</h2>
                    <p className="about__description">чем наряда перемена у подруги.</p>
                    {isAuth ? (
                        <button onClick={()=> dispatch(removeUser())}>выйти</button>
                    ) : (
                        <div>никогошеньки</div>
                    )
                    }
                </div>
            </div>
        </section>
    );
}