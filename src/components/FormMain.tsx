import React, {useState} from 'react';
import { auth } from '../api/firebase';
import { useNavigate  } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export interface FormProps {
    btnTitle: string
}

export function FormMain(props: FormProps){
    const [formData, setFormData] = useState({
        email:'',
        password: ''
    })
    const [errorData, setErrorData] = useState({
        email:'',
        password: '',
        form: ''
    })

    const navigate = useNavigate();

    const fieldChangeHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setFormData({...formData, [name]: value});
    }

    const handleRegistration: React.FormEventHandler<HTMLFormElement> = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, formData.email, formData.password)
            .then(({user}) => {
                console.log(user)
                // setIsItRegistrationForm(true)
                // const response:any = user.toJSON();
                // const token = response.stsTokenManager.accessToken;
                // dispatch(setUser({
                //     email: user.email,
                //     token: token,
                //     id: user.uid
                // }));
                navigate('/about');
            })
            .catch((error) => {
                if (error.message === 'Firebase: Error (auth/email-already-in-use).'){
                    setErrorData({...errorData, form: 'Email уже зарегистрирован'} )
                }
                else{
                    console.error('Ошибка: ' + error.message)
                }
            });
    };


    return (
        <form className="form" onSubmit={ handleRegistration }>
           <div className="form__box">
               <div className="form__item">
                   <p className="form__item-name">Почта:</p>
                   <input
                       type="email"
                       name="email"
                       className="form__item-input"
                       value={formData.email}
                       onChange={(event: React.ChangeEvent<HTMLInputElement>): void => fieldChangeHandle(event)}
                   />
               </div>

               <div className="form__item _short">
                   <p className="form__item-name">Пароль:</p>
                   <input
                       type="password"
                       name="password"
                       className="form__item-input"
                       value={formData.password}
                       onChange={(event: React.ChangeEvent<HTMLInputElement>): void => fieldChangeHandle(event)}
                   />
               </div>
               <div className="form__information">
                   <p className="form__information-content">{errorData.form}</p>
               </div>
               <button
                   type="submit"
                   className="form__button button">{props.btnTitle}</button>
           </div>
        </form>
    )
}