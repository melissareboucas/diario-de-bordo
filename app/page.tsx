import {
  GlobeAmericasIcon,
  PencilSquareIcon,
  UserGroupIcon,
  MapIcon
} from '@heroicons/react/24/outline';

export default function Home() {
  return (
    <main>
      <div className='flex justify-between mt-4 mb-4 mr-8 ml-8 items-center'>
        <GlobeAmericasIcon className='w-10 h-10' />
        <div className='flex gap-4'>
          <a href='/signup' className='text-custom-medium-blue'>Cadastrar</a>
          <a href='/login' className='text-custom-medium-blue'>Entrar</a>
        </div>
      </div>

      <div>
        <div className='flex items-center mr-16 ml-4 justify-center'>
          <p className='text-custom-dark-blue font-bold text-8xl'>EXPLORE O MUNDO</p>
          <img src="/assets/cities-extra-sm.png"></img>
        </div>

        <div className='flex items-center mr-16 ml-4 justify-center'>
          <img src="/assets/travels-extra-sm.png"></img>
          <p className='text-custom-dark-blue font-bold text-8xl relative'>ALÉM DOS LIMITES</p>
        </div>
      </div>

      <div className='relative'>
        <img src='/assets/home.png' className='ml-12 mt-4'></img>
        <div className='absolute left-0 top-0 ml-20 mt-16 flex-col'>
          <h3 className='text-custom-extra-light-blue font-bold text-4xl'>
            Inicie sua jornada
          </h3>
          <p className='max-w-sm text-custom-extra-light-blue mt-6 text-2xl'>
            Existe uma história esperando para ser descoberta. Desbrave novos horizontes, mergulhe em culturas diversas e viva experiências que só o mundo pode oferecer.
          </p>
          <a href='/profile'>
            <button className="mt-4 h-10 rounded-lg bg-custom-medium-blue px-4 text-sm font-medium text-white transition-colors hover:bg-custom-light-blue focus:outline-custom-medium-blue">
              Comece a viajar
            </button>
          </a>

        </div>

      </div>

      <div className='flex justify-center items-center'>
        <h2 className="text-custom-dark-blue mt-6 text-md">
          Crie suas viagens e conecte-se com outros viajantes
        </h2>
      </div>

      <div className='flex gap-80 mt-4 mb-4 items-center justify-center'>
        <div className='flex flex-col items-center'>
          <PencilSquareIcon className='w-8 h-8'/>
          <p className='mt-4 mb-4 text-custom-dark-blue text-md'>Anote suas viagens</p>
        </div>

        <div className='flex flex-col items-center'>
          <UserGroupIcon className='w-8 h-8'/>
          <p className='mt-4 mb-4 text-custom-dark-blue text-md'>Conecte-se com comunidades</p>
        </div>

        <div className='flex flex-col items-center'>
          <MapIcon className='w-8 h-8'/>
          <p className='mt-4 mb-4 text-custom-dark-blue text-md'>Explore novos lugares</p>
        </div>
      </div>

    </main>
  );
}
