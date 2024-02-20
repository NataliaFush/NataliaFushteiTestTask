import React, {useState} from 'react';
import css from './home.module.css';
import {useForm} from "react-hook-form";

const Home = () => {
    const {
        register,
        handleSubmit,
        formState: {errors},
        trigger
    } = useForm();
    const [file, setFile] = useState(null);
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const user={
        email: 'email',
        file: 'file'
    }
    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile && selectedFile.name.endsWith('.docx')) {
            setFile(selectedFile);
            setMessage('');
        }
        else {
            setFile(null);
            setMessage('Please select a .docx file');
        }
    };

    const startTrigger = async (obj, name) => {
        console.log('trigger ' + obj)
        await trigger(name);
    }
    const submit = async (data) => {
        if (!file) {
            setMessage('Please select a file');
            return;
        }
        const formData = new FormData();
        formData.append('file', file);
    };

    {
        return (
            <div>
                <h1 className={css.label}>Welcome!</h1>
                <h1 className={css.label}>It is my test task!</h1>
                <form onSubmit={handleSubmit(submit)} className={css.main}>
                    <div className={css.wrap}>
                        <div className={css.message}>
                            <p className={css.instruction}>Enter your email:</p>
                            {errors.email && <p className={css.errorClass}>{errors.email.message}</p>}
                        </div>
                        <input {...register("email", {
                            onChange: async (event) => await startTrigger(event.target.value, user.email),
                            required: 'Please enter your email',
                            pattern: {
                                value: /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/,
                                message: 'Invalid email address',
                            },
                        })}
                               placeholder="Email"
                               type="text"
                        />
                        <div className={css.message}>
                            <p className={css.instruction}>Attach file: </p>
                            {message && <p className={css.errorClass}>{message}</p>}
                        </div>
                        <input type="file" accept=".docx" onChange={handleFileChange}/>
                        <div className={css.myButton}>
                        <button type="submit">Send</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export {Home};
