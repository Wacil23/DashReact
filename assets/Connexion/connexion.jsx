import React, { useContext, useEffect, useRef, useState } from 'react';
import Field from '../components/Forms/Field';
import auth from '../Services/Authentication';
import { BsEye } from 'react-icons/bs';
import Lottie from 'lottie-web';
import { BsEyeSlash } from 'react-icons/bs';
import AuthContext from '../Context/AuthContext';

function Connexion() {

  const bgHeroContainer = useRef();
  const [isLoading, setIsLoading] = useState(false);
  
  const { setIsAuth } = useContext(AuthContext) 

  useEffect(() => {
    const bgHero = Lottie.loadAnimation({
      container: bgHeroContainer.current,
      animationData: require('../../lotties/desktop.lottie.json'),
      renderer: 'svg',
      loop: true,
      autoplay: true,
    })
    return () => bgHero.destroy();
  }, [])
  
  const checkMarkContainer = useRef();
  
  useEffect(() => {

      const checkMark = Lottie.loadAnimation({
        container: checkMarkContainer.current,
        animationData: require('../data/loading.json'),
        renderer: 'svg',
        loop: false,
        autoplay: true,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice' // also tried 'xMidYMid meet'
      }
      })
      
      checkMark.pause();
      checkMark.resize(20);
      return () => checkMark.destroy();

  }, [])


  
  const [isLog, setIsLog] = useState(false);
  
  
  const [credentials, setCredentials] = useState({
    username: 'ASalmi153',
    password: 'JHLrx1NR'
  });
  
  const [passwordShown, setPasswordShown] = useState(false);
  
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  
  const [error, setError] = useState('')
  
  const handleChange = ({ currentTarget }) => {
    const { value, name } = currentTarget
    setCredentials({ ...credentials, [name]: value });
  };
  
  
  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await auth(credentials);
      setIsLog(true);
      setIsAuth(true);
      Lottie.play()
      setIsLoading(true);
      setError("");
    }
    catch (error) {
      console.log(error.response);
      setError('Désolé, aucun compte n\'a été trouvé');
      setIsLoading(false);
      setIsLog(false);
    }
    console.log(credentials);
  };

  
  return (
    <div className='flex m-10 justify-evenly items-center md:flex lg:flex-row mx-auto my-auto h-screen'>
      <div className='hidden md:flex w-1/2 my-auto '>
        <div alt="" className='mx-auto'>
          <div ref={bgHeroContainer}>
          </div>
        </div>
      </div>
      <div className="w-full max-w-sm mx-auto my-auto error:text-red-500">
        <h1 className='text-blue-600 font-bold text-center text-3xl mb-16'>Connexion</h1>
        <form onSubmit={handleSubmit} className={`bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4  ${error ? "errorModal" : ""}`}>
        <div className='mx-auto w-2/4'>
            <div className={`${isLog ? '' : 'hidden'}`}ref={checkMarkContainer}></div>
          </div>
          {!isLog && <><Field label="Identifiant"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            placeholder="Votre identifiant"
            error={error} />
          <div className='flex w-full items-center'>
            <Field label="Mot de passe"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Votre mot de passe"
              togglePassword={togglePassword}
              type={passwordShown ? "text" : "password"}
              error="" />
            <button type='button' className='-ml-9 mt-3' onClick={togglePassword}> {!passwordShown ? <BsEye /> : <BsEyeSlash />}</button>
          </div>
          <div className="flex items-center justify-between">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline w-4/6" type="submit">
              Se connecter
            </button>
            <a className="inline-block align-baseline font-bold text-sm px-5 w-full text-blue-500 hover:text-blue-800" href="#">
              Mot de passe oublié ?
            </a> 
          </div>
          </>}
          {error && <p className="text-center mt-3 font-bold text-red-600 text-danger">{error}</p>}
        </form>
        <p className="text-center text-gray-500 text-xs">
          &copy;2022 Quartz Corp. All rights reserved.
        </p>
      </div>
      
    </div>
    
              
  )
}

export default Connexion