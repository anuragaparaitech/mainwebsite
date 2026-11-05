import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import PageHeader from '../../components/shared/PageHeader';
import DataTable from '../../components/shared/DataTable';
import ConfirmModal from '../../components/shared/ConfirmModal';

const columns = [
  { key: 'partnerName', label: 'Partner Name' },
  { key: 'type', label: 'Type' },
  { key: 'website', label: 'Website' },
  { key: 'order', label: 'Order' },
  { key: 'isActive', label: 'Status', type: 'status' },
];

const Collaborations = () => {
  const [collabs, setCollabs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  const navigate = useNavigate();

  const fetchCollabs = async () => {
    try {
      const res = await axios.get('/api/collaborations');
      setCollabs(res.data);
    } catch (err) {
      toast.error('Failed to load collaborations');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCollabs(); }, []);

  const handleEdit = (row) => navigate(`/collaborations/edit/${row._id}`);

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/collaborations/${deleteId}`);
      toast.success('Collaboration deleted');
      setDeleteId(null);
      fetchCollabs();
    } catch (err) {
      toast.error('Delete failed');
    }
  };

  return (
    <div>
      <PageHeader
        title="Collaborations"
        subtitle="Manage company partnerships and collaborations"
        addPath="/collaborations/new"
        addLabel="Add Partner"
      />
      <DataTable
        columns={columns}
        data={collabs}
        loading={loading}
        onEdit={handleEdit}
        onDelete={(id) => setDeleteId(id)}
      />
      <ConfirmModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Collaboration"
        message="Are you sure you want to remove this partner?"
      />
    </div>
  );
};

export default Collaborations;
