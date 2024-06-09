'use client'

import {
    GlobeAmericasIcon,
} from '@heroicons/react/24/outline';
import { useState } from 'react';
import { login } from '../lib/actions';
import Loading from '../ui/loading';

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);

        
        try{
            await login(email, password);

        } catch {
            console.log("Não foi possível criar a viagem")
        } finally {
            setLoading(false);
        }

        

    };

    const handleSetEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handleSetPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    return <>
        {loading && <Loading />}
        <div className='flex justify-between mt-4 mb-4 mr-8 ml-8 items-center'>
            <GlobeAmericasIcon className='w-10 h-10' />
            <div className='flex gap-4'>
                <a href='/signup' className='text-custom-medium-blue'>Cadastrar</a>
                <a href='/login' className='text-custom-medium-blue'>Entrar</a>
            </div>
        </div>
        <div className="flex items-center  justify-center">
            <img src='/assets/login.png' className='ml-8 mr-8 h-[600px]'></img>
            <div className='absolute top-30 flex flex-col justify-center items-center'>
                <h3 className='text-custom-extra-light-blue font-bold text-4xl'>
                    Fazer Login
                </h3>
                <div className='bg-white rounded-md mt-4 flex-grow'>
                    <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center'>
                        <div className='mx-10 mt-5'>
                            <input
                                id="email"
                                name="email"
                                required
                                placeholder="Email"
                                className="peer block rounded-3xl border border-custom-medium-blue text-custom-medium-blue pl-4 py-2 text-sm outline-2 placeholder:text-custom-medium-blue focus:outline-custom-medium-blue"
                                onChange={handleSetEmail}
                            />
                        </div>

                        <div className='mx-10 mt-5'>
                            <input
                                id="password"
                                name="password"
                                required
                                placeholder="Senha"
                                type="password"
                                className="peer block rounded-3xl border border-custom-medium-blue text-custom-medium-blue pl-4 py-2 text-sm outline-2 placeholder:text-custom-medium-blue focus:outline-custom-medium-blue"
                                onChange={handleSetPassword}
                            />
                        </div>


                        <div className="mt-4 mb-4 flex justify-center items-center gap-2">
                            <button type="submit" className="h-10 rounded-lg bg-custom-medium-blue px-4 text-sm font-medium text-white transition-colors hover:bg-custom-light-blue focus:outline-custom-medium-blue">Entrar</button>
                            <a href='/signup' className='text-custom-medium-blue'>Criar uma conta</a>
                        </div>
                    </form>

                </div>
            </div>

        </div>
    </>
}