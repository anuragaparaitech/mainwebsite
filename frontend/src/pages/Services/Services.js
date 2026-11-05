import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import PageHeader from '../../components/shared/PageHeader';
import DataTable from '../../components/shared/DataTable';
import ConfirmModal from '../../components/shared/ConfirmModal';

const columns = [
  { key: 'title', label: 'Service Name' },
  { key: 'shortDescription', label: 'Short Description' },
  { key: 'order', label: 'Order' },
  { key: 'isActive', label: 'Status', type: 'status' },
];

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  const navigate = useNavigate();

  const fetchServices = async () => {
    try {
      const res = await axios.get('/api/services');
      setServices(res.data);
    } catch (err) {
      toast.error('Failed to load services');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchServices(); }, []);

  const handleEdit = (row) => navigate(`/services/edit/${row._id}`);

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/services/${deleteId}`);
      toast.success('Service deleted');
      setDeleteId(null);
      fetchServices();
    } catch (err) {
      toast.error('Delete failed');
    }
  };

  return (
    <div>
      <PageHeader
        title="Services"
        subtitle="Manage company services displayed on the website"
        addPath="/services/new"
        addLabel="Add Service"
      />
      <DataTable
        columns={columns}
        data={services}
        loading={loading}
        onEdit={handleEdit}
        onDelete={(id) => setDeleteId(id)}
      />
      <ConfirmModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Service"
        message="Are you sure you want to delete this service?"
      />
    </div>
  );
};

export default Services;
