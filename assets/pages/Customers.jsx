import React, { useEffect, useState } from 'react';
import { Table } from '@mantine/core';
import { Link } from 'react-router-dom';
import { Header } from '../components';
import CustomersApi from '../Services/CustomersApi';
import Paginations from '../components/Paginations';
import ModalPopUp from '../components/Modal';
import toast, { Toaster } from 'react-hot-toast';
import { useStateContext } from '../contexts/ContextProvider';

const Customers = () => {
  
  const {currentColor}  = useStateContext();
  const [customers, setCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchCustomers = async () => {
    try {
      const data = await CustomersApi.findAll()
      setCustomers(data)
      console.log('cest customers,', customers)
      console.log('cest data,', data)
      setLoading(false);

    }
    catch (error) {
      console.error('impossible');
    }
  }

  const handleChangePage = (page) => setCurrentPage(page);

  useEffect(() => { fetchCustomers() }, []);

  const itemsPerPage = 10;

  const filterCustomers = customers.filter(c =>
    c.firstName.toLowerCase().includes(search.toLowerCase()) ||
    c.lastName.toLowerCase().includes(search.toLowerCase())
  );

  const paginatedCustomers = Paginations.getData(filterCustomers, currentPage, itemsPerPage);

  const ths = (
    <tr>
      <th>Id.</th>
      <th>Client</th>
      <th>Email</th>
      <th>Adresse</th>
      <th>Téléphone</th>
      <th>Factures</th>
      <th>Montant total</th>
      <th></th>
    </tr>
  );

  const handleDelete = async (id) => {
    const originalCustomer = [...customers];
    setCustomers(customers.filter(customer => customer.id !== id));
    try {
      await CustomersApi.delete(id)
      toast.success('Le client à bien été supprimé')
    }
    catch (error) {
      toast.error('Un problème est survenue')
      console.log(1);
      setCustomers(originalCustomer);
      console.log();
    };
  }

  return (
    <div className='m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl'>
      <div className="flex justify-between">
        <Header category='Page' title='Customers' />
          <ModalPopUp customers={customers} setCustomers={setCustomers} fetchCustomers={fetchCustomers} className='text-gray-900' />
      </div>
      <Table striped highlightOnHover>
        <thead>{ths}</thead>
        <tbody>{paginatedCustomers.map(customer => (
          <tr key={customer.id}>
            <td>{customer.id}</td>
            <td><Link style={{color: currentColor}} className='font-semibold' to={"/customers/" + customer.id}>{customer.firstName} {customer.lastName}</Link></td>
            <td>{customer.email}</td>
            <td>{customer.adress}</td>
            <td>{customer.phone}</td>
            <td>
              <span className="badge bg-info">{customer.invoices.length}</span>
            </td>
            <td>{customer.totalAmount.toLocaleString()} €</td>
            <td>
              <button onClick={() => handleDelete(customer.id)} className="hover:text-red-600 ">supprimer</button>
            </td>
          </tr>
        ))}</tbody>
      </Table>
      {itemsPerPage < filterCustomers.length && <Paginations currentColor={currentColor} itemsPerPage={itemsPerPage} length={filterCustomers.length} onPageChange={handleChangePage} currentPage={currentPage} />}
      <Toaster />
    </div>
  )
}

export default Customers