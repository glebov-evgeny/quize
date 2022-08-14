import React, {useState} from 'react';
import { auth } from '../api/firebase';
import { useNavigate  } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import {useAppDispatch} from '../hooks/redux-hooks';
import {setUser} from '../store/slices/userSlice';

export interface FormProps {
    btnTitle: string,
    formLogic: string
}

export function FormMain(props: FormProps){
    const [formData, setFormData] = useState({
        email:'',
        password: ''
    })
    const [errorData, setErrorData] = useState({
        email: true,
        password: true,
        form: ''
    })
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const fieldChangeHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setFormData({...formData, [name]: value.trim()});
    }

    const validateForm = (formData:any) => {
        const emailValidation = (email:string) => {
            const regex = /^(([^<>()[\],;:\s@]+(\.[^<>()[\],;:\s@]+)*)|(.+))@(([^<>()[\],;:\s@]+\.)+[^<>()[\],;:\s@]{2,})$/i;
            if(!regex.test(email) || email === ''){
                setErrorData({...errorData, email: false})
                return false
            }
            setErrorData({...errorData, email: true})
            return true;
        }
        emailValidation(formData.email)

        const passwordValidation = (password:string) => {
            /* Не меньше 6 символов, минимум 1 буква, минимум 1 цифра */
            const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/i;
            if(!regex.test(password) || password === ''){
                setErrorData({...errorData, password: false})
                return false
            }
            setErrorData({...errorData, password: true})
            return true;
        }
        passwordValidation(formData.password)

    }

    const handleRegistration: React.FormEventHandler<HTMLFormElement> = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        validateForm(formData)
        if(errorData.email && errorData.password){
            createUserWithEmailAndPassword(auth, formData.email, formData.password)
                .then(({user}) => {
                    const response:any = user.toJSON();
                    const token = response.stsTokenManager.accessToken;
                    dispatch(setUser({
                        email: user.email,
                        token: token,
                        id: user.uid
                    }));
                    navigate('/about');
                })
                .catch((error) => {
                    if (error.message === 'Firebase: Error (auth/email-already-in-use).'){
                        setErrorData({...errorData, form: 'Email уже зарегистрирован'} )
                    }
                    else if (error.message === 'Firebase: Password should be at least 6 characters (auth/weak-password).' ){
                        setErrorData({...errorData, form: 'Пароль должен быть минимум 6 символов. Минимум 1 цифра, минимум 1 буква.'} )
                    }
                    else{
                        console.error('Ошибка: ' + error.message)
                    }
                });
        } else {
            console.error('ошибка отправки формы')
        }
    };


    const handleLogin: React.FormEventHandler<HTMLFormElement> = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, formData.email, formData.password)
            .then(({user}) => {
                const response:any = user.toJSON();
                const token = response.stsTokenManager.accessToken;
                dispatch(setUser({
                    email: user.email,
                    token: token,
                    id: user.uid
                }));
                if (typeof user.email === 'string') {
                    localStorage.setItem('email', user.email);
                }
                localStorage.setItem('token', token);
                localStorage.setItem('id', user.uid);
                navigate('/about');
            })
            .catch((error) => {
                if (error.message === 'Firebase: Error (auth/wrong-password).'){
                    setErrorData({...errorData, form: 'Неправильный пароль'} )
                }
                else if (error.message === 'Firebase: Error (auth/user-not-found).' ){
                    setErrorData({...errorData, form: 'Пользователь не найден'} )
                }
                else{
                    console.error('Ошибка: ' + error.message)
                }
            });
    };

    return (
        <form className="form" onSubmit={ props.formLogic === 'login' ? handleLogin : handleRegistration }>
           <div className="form__box">
               <div className="form__item">
                   <p className="form__item-name">Почта:</p>
                   <input
                       type="email"
                       name="email"
                       className={errorData.email ? 'form__item-input' : 'form__item-input error'}
                       value={formData.email}
                       onChange={(event: React.ChangeEvent<HTMLInputElement>): void => fieldChangeHandle(event)}
                   />
               </div>

               <div className="form__item _short">
                   <p className="form__item-name">Пароль:</p>
                   <input
                       type="password"
                       name="password"
                       className={errorData.password ? 'form__item-input' : 'form__item-input error'}
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