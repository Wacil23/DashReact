import React, { useEffect, useRef, useState } from 'react'
import { Avatar, Button, Group, MantineProvider, Skeleton } from '@mantine/core';
import { Header } from '../components';
import Lottie from 'lottie-web';
import { toast, Toaster } from 'react-hot-toast';
import FieldMantine from '../components/Forms/FieldMantine';
import { Link, useNavigate, useParams } from 'react-router-dom';
import CustomersApi from '../Services/CustomersApi';
import { useInputState } from '@mantine/hooks';
import ReactInputMask from 'react-input-mask';
import { useStateContext } from '../contexts/ContextProvider';
import { BiUndo } from 'react-icons/bi';

function Customer({ match }) {
  const navigate = useNavigate()
  const profil = useRef();
  const mode = window.localStorage.getItem('themeMode').toLowerCase();
  const [loading, setLoading] = useState(true);
  const [isDirty, setIsDirty] = useState(false);
  const { id } = useParams('id');
  const { currentColor } = useStateContext();
  const [customers, setCustomers] = useInputState({
    firstName: '',
    lastName: '',
    email: '',
    adress: '',
    phone: '',
  });

  useEffect(() => {
    const checkMark = Lottie.loadAnimation({
      container: profil.current,
      animationData: require('../../lotties/avatar.json'),
      renderer: 'svg',
      loop: true,
      autoplay: true,
    })
    return () => checkMark.destroy();
  }, [])

  const fetchCustomer = async id => {
    try {
      const { firstName, lastName, email, adress, phone } = await CustomersApi.find(id);
      setCustomers({ firstName, lastName, email, adress, phone })
    } catch (e) {
      console.log(e.response);
    }
  }


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await CustomersApi.update(id, customers);
      setLoading(false)
      toast.success("Le client à bien été modifié")
      
      navigate('/customers')
    }
    catch (e) {
      toast.error("Oh oh ...")
    }
  }

  const handleChange = (event) => {
    const value = event.currentTarget.value
    console.log(event)
    const name = event.currentTarget.id

    setIsDirty(true);
    setCustomers({ ...customers, [name]: value })
  }

  useEffect(() => {
    if (id) {
      fetchCustomer(id)
    }
  }, [id]);


  return (

    <div className='dark:bg-secondary-dark-bg m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl flex'>
      <div className="w-full mx-auto my-auto error:text-red-500">

        <MantineProvider withGlobalStyles withNormalizeCSS theme={{ colorScheme: mode }}>
          <div>
            <Header title={`Profil : ${customers.lastName} ${customers.firstName}`} category='Page' />
            <div className='xl:flex xl:w-full align-content-center'>
              <Avatar radius="xl" size={250} color="dark" ref={profil} />
              <div className="lg:flex-column xl:mx-40 xl:my-20 mx-12">
                <div className="xl:flex flex-row gap-8">
                  <FieldMantine name="lastName" placeholder='Nom du client' label='Nom :' onChange={handleChange} value={customers.lastName} />
                  <FieldMantine name="firstName" placeholder='Prénom du client' label='Prénom :' onChange={handleChange} value={customers.firstName} />
                </div>
                <FieldMantine className='mt-1' name="email" placeholder='Email du client' type='email' label='Email :' onChange={handleChange} value={customers.email} />
                <FieldMantine className='mt-1' name="adress" placeholder='Adresse du client' label='Adresse :' onChange={handleChange} value={customers.adress} />
                <FieldMantine className='mt-1' name="phone" placeholder='06 12 34 56 78' label='Téléphone :' component={ReactInputMask} mask="99 99 99 99 99" type='tel' onChange={handleChange} value={customers.phone} />
                <Group className='w-full'>
                  <Button className='w-full mt-3' style={{ backgroundColor: currentColor }} disabled={isDirty ? false : true} onClick={handleSubmit}>Créer un nouveau client</Button>
                  <Link to="/customers" className='flex items-center'><BiUndo /> Retour à la liste</Link>
                </Group>
              </div>
            </div>
          </div>
          <Toaster />
        </MantineProvider>
      </div>

    </div>

  )
}

export default Customer