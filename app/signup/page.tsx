'use client'

import {
    GlobeAmericasIcon,
} from '@heroicons/react/24/outline';

import UploadProfileImage from '../ui/uploadProfileImage';
import { useState } from 'react';
import { createUser } from '../lib/actions';

export default function SignUp() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [image_url, setImage_url] = useState('')

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        createUser(name, email, password, image_url);

    };

    const handleSetName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleSetEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handleSetPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleImageChange = (image: string) => {
        // Atualiza o estado da imagem quando uma nova imagem é selecionada
        setImage_url(image)
    };

    return <>
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
                <h3 className='text-custom-extra-light-blue font-bold text-3xl'>
                    É hora de explorar o novo!
                </h3>
                <div className='bg-white rounded-md mt-4 flex-grow'>
                    <p className='text-custom-dark-blue font-bold ml-10 mt-5'>
                        Crie sua conta gratuitamente
                    </p>
                    <form onSubmit={handleSubmit} className='flex justify-center items-center'>
                        <div className='flex flex-col justify-center items-center'>
                            <div className='mx-10 mt-5'>
                                <input
                                    id="name"
                                    name="name"
                                    placeholder="Nome"
                                    className="peer block rounded-3xl border border-custom-medium-blue text-custom-medium-blue pl-4 py-2 text-sm outline-2 placeholder:text-custom-medium-blue focus:outline-custom-medium-blue"
                                    onChange={handleSetName}
                                />
                            </div>

                            <div className='mx-10 mt-5'>
                                <input
                                    id="email"
                                    name="email"
                                    placeholder="Email"
                                    className="peer block rounded-3xl border border-custom-medium-blue text-custom-medium-blue pl-4 py-2 text-sm outline-2 placeholder:text-custom-medium-blue focus:outline-custom-medium-blue"
                                    onChange={handleSetEmail}
                                />
                            </div>

                            <div className='mx-10 mt-5'>
                                <input
                                    id="password"
                                    name="password"
                                    placeholder="Senha"
                                    className="peer block rounded-3xl border border-custom-medium-blue text-custom-medium-blue pl-4 py-2 text-sm outline-2 placeholder:text-custom-medium-blue focus:outline-custom-medium-blue"
                                    onChange={handleSetPassword}
                                />
                            </div>
                            <div className="mt-4 mb-4 flex justify-center items-center gap-2">
                                <button type="submit" className="h-10 rounded-lg bg-custom-medium-blue px-4 text-sm font-medium text-white transition-colors hover:bg-custom-light-blue focus:outline-custom-medium-blue">Criar</button>
                                <a href='/login' className='text-custom-medium-blue'>Já tenho uma conta</a>
                            </div>
                        </div>

                        <div className='h-[120px] mb-32 w-[220px]'>
                            <UploadProfileImage onImageChange={handleImageChange} />
                        </div>
                    </form>

                </div>
            </div>

        </div>
    </>
}