import React, { useEffect, useState } from 'react';
import { Modal, Button, Group, Input } from '@mantine/core';;
import CustomersApi from '../Services/CustomersApi';
import { useInputState } from '@mantine/hooks';
import toast from 'react-hot-toast';
import { useStateContext } from '../contexts/ContextProvider';
import FieldMantine from './Forms/FieldMantine';
import InputMask from 'react-input-mask';


const ModalPopUp = ({ customers, setCustomers }) => {
    const { currentColor } = useStateContext();
    const [opened, setOpened] = useState(false);
    const [newCustomers, setNewCustomers] = useState();
    const [credentials, setCredentials] = useInputState({
        firstName: '',
        lastName: '',
        email: '',
        adress: '',
        phone: '',
    });


    const handleChange = (event) => {
        const value = event.currentTarget.value
        const name = event.currentTarget.id
        setCredentials({ ...credentials, [name]: value });
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const originalCustomer = [...customers];
            const a = await CustomersApi.create(credentials)
            setNewCustomers(a.data)
            setCustomers(originalCustomer);
            toast.success('Le client à bien été ajouté')
            setOpened(false);
        }
        catch (e) {
            toast.error('Une erreur est survenue dans votre fomulaire')
            setOpened(true);
        }
    };


    const fetchCustomers = async () => {
        try {
            const data = await CustomersApi.findAll()
            setCustomers(data)
        }
        catch (error) {
            console.error('impossible', error);
        }
    }

    useEffect(() => { fetchCustomers() }, [newCustomers]);


    return (
        <div >
            <Modal opened={opened} onClose={() => setOpened(false)} title="Nouveau client !" centered >
                <div className="flex-col">
                    <div className="flex flex-row justify-between gap-4">
                        <FieldMantine name="lastName" placeholder='Nom du client' label='Nom :' onChange={handleChange} value={credentials.lastName} />
                        <FieldMantine name="firstName" placeholder='Prénom du client' label='Prénom :' onChange={handleChange} value={credentials.firstName} />
                    </div>
                    <FieldMantine className='mt-1' name="email" placeholder='Email du client' type='email' label='Email :' onChange={handleChange} value={credentials.email} />
                    <FieldMantine className='mt-1' name="adress" placeholder='Adresse du client' label='Adresse :' onChange={handleChange} value={credentials.adress} />
                    <FieldMantine className='mt-1' name="phone" placeholder='06 12 34 56 78' label='Téléphone :' type='tel' component={InputMask} mask="99 99 99 99 99" onChange={handleChange} value={credentials.phone} />
                    <Button className='mt-6 mb-2' style={{ backgroundColor: currentColor, width: '100%' }} onClick={handleSubmit} >Enregistrer</Button>

                </div>
            </Modal>

            <Group position="center">
                <Button style={{ backgroundColor: currentColor }} onClick={() => setOpened(true)}>Créer un nouveau client</Button>
            </Group>
        </div>
    );
}

export default ModalPopUp;