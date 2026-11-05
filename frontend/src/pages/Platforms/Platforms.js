import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import PageHeader from '../../components/shared/PageHeader';
import DataTable from '../../components/shared/DataTable';
import ConfirmModal from '../../components/shared/ConfirmModal';

const columns = [
  { key: 'name', label: 'Platform Name' },
  { key: 'shortDescription', label: 'Description' },
  { key: 'url', label: 'URL' },
  { key: 'order', label: 'Order' },
  { key: 'isActive', label: 'Status', type: 'status' },
];

const Platforms = () => {
  const [platforms, setPlatforms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  const navigate = useNavigate();

  const fetchPlatforms = async () => {
    try {
      const res = await axios.get('/api/platforms');
      setPlatforms(res.data);
    } catch (err) {
      toast.error('Failed to load platforms');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPlatforms(); }, []);

  const handleEdit = (row) => navigate(`/platforms/edit/${row._id}`);

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/platforms/${deleteId}`);
      toast.success('Platform deleted');
      setDeleteId(null);
      fetchPlatforms();
    } catch (err) {
      toast.error('Delete failed');
    }
  };

  return (
    <div>
      <PageHeader
        title="Our Platforms"
        subtitle="Manage platforms and products listed on the website"
        addPath="/platforms/new"
        addLabel="Add Platform"
      />
      <DataTable
        columns={columns}
        data={platforms}
        loading={loading}
        onEdit={handleEdit}
        onDelete={(id) => setDeleteId(id)}
      />
      <ConfirmModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Platform"
        message="Are you sure you want to delete this platform?"
      />
    </div>
  );
};

export default Platforms;
