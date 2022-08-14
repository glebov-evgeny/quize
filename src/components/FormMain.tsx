import React, {useState} from 'react';

export interface FormProps {
    btnTitle: string
}

export function FormMain(props: FormProps){
    const [formData, setFormData] = useState({
        email:'',
        password: ''
    })

    const fieldChangeHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setFormData({...formData, [name]: value});
    }

    return (
        <form className="form">
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

               <div className="form__item">
                   <p className="form__item-name">Пароль:</p>
                   <input
                       type="password"
                       name="password"
                       className="form__item-input"
                       value={formData.password}
                       onChange={(event: React.ChangeEvent<HTMLInputElement>): void => fieldChangeHandle(event)}
                   />
               </div>

               <button
                   type="button"
                   className="form__button button">{props.btnTitle}</button>
           </div>
        </form>
    )
}