import React from 'react';
import ConnexionHeader from './data/ConnexionHeader.png'
import connexionImg from './data/3515462.jpg'

function Connexion() {
  return (
    <div className='flex m-10 justify-evenly items-center md:flex lg:flex-row mx-auto my-auto h-screen'>
      <div className='hidden md:flex w-1/2 my-auto '>
        <img src={connexionImg} alt="" className='mx-auto w-9/12' />
      </div>
      <div class="w-full max-w-sm mx-auto my-auto">
            <h1 className='text-blue-600 font-bold text-center text-3xl mb-16'>Connexion</h1>
        <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
              Identifiant
            </label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Votre identifiant" />
          </div>
          <div class="mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
              Mot de passe
            </label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Votre mot de passe" />
            
          </div>
          <div class="flex items-center justify-between">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline w-4/6" type="button">
              Se connecter
            </button>
            <a class="inline-block align-baseline font-bold text-sm px-5 w-full text-blue-500 hover:text-blue-800" href="#">
              Mot de passe oublié ?
            </a>
          </div>
        </form>
        <p class="text-center text-gray-500 text-xs">
          &copy;2020 Acme Corp. All rights reserved.
        </p>
      </div>
    </div>
  )
}

export default Connexion