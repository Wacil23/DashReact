import React, { useEffect, useState } from 'react';
import { Modal, Button, Group } from '@mantine/core';
import Field from './Forms/Field';
import CustomersApi from '../Services/CustomersApi';
import toast, { Toaster } from 'react-hot-toast';
import { useStateContext } from '../contexts/ContextProvider';


const ModalPopUp = ({customers, setCustomers }) => {
    const { currentColor} = useStateContext();
    const [opened, setOpened] = useState(false);
    const [newCustomers, setNewCustomers] = useState();
    const [credentials, setCredentials] = useState({
        firstName: '',
        lastName: '',
        email: '',
        adress: '',
        phone: '',
    });

    const handleChange = ({ currentTarget }) => {
        const { value, name } = currentTarget
        setCredentials({ ...credentials, [name]: value });
    };
    const handleSubmit = async event => {
        event.preventDefault();
        try {
            const originalCustomer = [...customers];
            const a = await CustomersApi.create(credentials)
            setNewCustomers(a.data)
            setCustomers(originalCustomer);
            console.log(originalCustomer)
            toast.success('Le client à bien été ajouté')
            setOpened(false);
        }
        catch (e) {
            toast.error('Une erreur est survenue dans votre fomulaire')
            console.log(e)
            setOpened(true);
        }
    };

    
    const fetchCustomers = async () => {
        try {
          const data = await CustomersApi.findAll()
          setCustomers(data)
          console.log('cest customers,', customers)
          console.log('cest data,', data)
    
        }
        catch (error) {
          console.error('impossible', error);
        }
    }
    
      useEffect(() => { fetchCustomers() }, [newCustomers]);


    return (
        <>
            <Modal opened={opened} onClose={() => setOpened(false)}
                title="Nouveau Client !" centered >
                <div className="flex justify-between gap-4">
                    <Field name="lastName" placeholder='Nom du client' label='Nom :' onChange={handleChange} value={credentials.lastName} />
                    <Field name="firstName" placeholder='Prénom du client' label='Prénom :' onChange={handleChange} value={credentials.firstName} />
                </div>
                <Field name="email" placeholder='Email du client' type='email' label='Email :' onChange={handleChange} value={credentials.email} />
                <Field name="adress" placeholder='Adresse du client' label='Adresse :' onChange={handleChange} value={credentials.adress} />
                <Field name="phone" placeholder='06 12 34 56 78' label='Téléphone :' type='tel' onChange={handleChange} value={credentials.phone} />
                <Button onClick={handleSubmit} className='bg-slate-900 text-center'>Enregistrer</Button>
            </Modal>

            <Group position="center">
                <Button style={{backgroundColor: currentColor}} onClick={() => setOpened(true)}>Créer un nouveau client</Button>
            </Group>
        </>
    );
}

export default ModalPopUp;