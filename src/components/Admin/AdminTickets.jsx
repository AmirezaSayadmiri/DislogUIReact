import React, { useEffect, useState } from 'react'
import privateAxios from '../../api/privateAxios';
import AdminTicket from './AdminTicket';

const AdminTickets = () => {
  const [tickets, setTickets] = useState([]);
  const getTickets = async () => {
      try {
          const res = await privateAxios.get("/tickets");
          if (res.status === 200) {
              setTickets(res.data.tickets);
          }
      } catch (err) {
          console.log(err);
      }
  };
  useEffect(()=>{
    getTickets()
  }, [])

  return <div className="p-10 flex flex-col">
  <h1>تیکت ها:</h1>
  {tickets.map(ticket=><AdminTicket getTickets={getTickets} key={ticket.id} ticket={ticket} />)}
</div>;
}

export default AdminTickets