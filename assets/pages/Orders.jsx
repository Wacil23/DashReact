import React from 'react'
import Header from '../components/Header';
import { Table } from '@mantine/core';
import { Link } from 'react-router-dom';


const Orders = () => {

  const ths = (
    <tr>
      <th>Element position</th>
      <th>Element name</th>
      <th>Symbol</th>
      <th>Atomic mass</th>
      <th></th>
    </tr>
  );

  const rows = (
    <tr>
      <td>123</td>
      <td>456</td>
      <td>789</td>
      <td>000</td>
      <td>
        <Link className='mr-10'>Editer</Link>
        <Link>Supprimer</Link>
      </td>
      

    </tr>
  );


  return (
    <div className='m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl'>
      <Header category='Page' title='Orders' />
      <Table striped highlightOnHover>
      <thead>{ths}</thead>
      <tbody>{rows}</tbody>
      </Table>
    </div>
  )
}

export default Orders