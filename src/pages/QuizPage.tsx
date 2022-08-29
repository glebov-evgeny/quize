import React, { useEffect, useState } from 'react';



export function QuizPage() {
    const questions = [
        {
            title: 'Что может путешествовать по миру, оставаясь в одном и том же углу?',
            variants: ['Почтовая марка', 'Монах Шаолиня', 'Лось'],
            correct: 0,
            id: 1
        },
        {
            title: 'Что бросают тогда, когда это необходимо, и поднимают тогда, когда это уже не нужно?',
            variants: ['Деньги', 'Якорь', 'Бегемот'],
            correct: 1,
            id: 2
        },
        {
            title: 'На какой вопрос нельзя дать положительный ответ?',
            variants: [
                'Когда это кончится?',
                'Когда будет готова задача?',
                'Ты спишь?',
            ],
            correct: 2,
            id: 3
        },
        {
            title: 'Чем заканчивается ночь и день?',
            variants: [
                'Мягким знаком',
                'Они не заканчиваются',
                'Танцами',
            ],
            correct: 0,
            id: 3
        },
    ];

    const [step, setStep] = useState(0)
    const [correctAnswers, setCorrectAnswers] = useState(0)
    const question = questions[step]

    const handlerUserVariant = (index:number) => {
        setStep(step + 1)
        if(index === question.correct){
            setCorrectAnswers(correctAnswers + 1)
        }
    }

    const restartQuiz = () => {
        setStep(0)
        setCorrectAnswers(0)
    }

    // @ts-ignore
    function Result({correctAnswers}) {
        return (
            <div className="result">
                <img className="result__img" src="https://cdn-icons-png.flaticon.com/512/2278/2278992.png" alt="icon"/>
                <h2 className="result__title">Ваш результат: {correctAnswers} из {questions.length}</h2>
                <button className="result__button" onClick={() => restartQuiz()}>Попробовать снова</button>
            </div>
        );
    }



    // @ts-ignore
    function Game({step, question, handlerUserVariant}) {
        const percentWidth = Math.round((step /questions.length) * 100) ;
        return (
            <>
                <div className="progress">
                    <div style={{ width: `${percentWidth}%` }} className="progress__inner"></div>
                </div>
                <h2 className="progress__title">{question.title}</h2>
                <ul className="progress__list">
                    {question.variants.map((variant:string[], index:any) =>
                        <li key={index} onClick={() => handlerUserVariant(index)}>{variant}</li>
                    )}
                </ul>
            </>
        );
    }


    useEffect(() => {

    })

    return (
        <section className="quiz">
            <div className="container quiz__container">
                <div className="quiz__content">

                    { step !== questions.length ? (
                        <>
                            <h2 className="quiz__title">Квиз</h2>
                            <p className="quiz__description">вопросики</p>
                            <Game question={question} handlerUserVariant={handlerUserVariant} step={step}/>
                        </>
                    ) : (
                        <Result correctAnswers={correctAnswers} />
                    )}
                </div>

            </div>
        </section>
    );
}