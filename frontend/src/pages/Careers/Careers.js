import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import PageHeader from '../../components/shared/PageHeader';
import DataTable from '../../components/shared/DataTable';
import ConfirmModal from '../../components/shared/ConfirmModal';

const columns = [
  { key: 'title', label: 'Job Title' },
  { key: 'department', label: 'Department' },
  { key: 'location', label: 'Location' },
  { key: 'type', label: 'Type' },
  { key: 'isActive', label: 'Status', type: 'status' },
];

const Careers = () => {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  const navigate = useNavigate();

  const fetchCareers = async () => {
    try {
      const res = await axios.get('/api/careers');
      setCareers(res.data);
    } catch (err) {
      toast.error('Failed to load careers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCareers(); }, []);

  const handleEdit = (row) => navigate(`/careers/edit/${row._id}`);

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/careers/${deleteId}`);
      toast.success('Career deleted');
      setDeleteId(null);
      fetchCareers();
    } catch (err) {
      toast.error('Delete failed');
    }
  };

  return (
    <div>
      <PageHeader
        title="Career Listings"
        subtitle="Manage all job postings for your company"
        addPath="/careers/new"
        addLabel="Post New Job"
      />
      <DataTable
        columns={columns}
        data={careers}
        loading={loading}
        onEdit={handleEdit}
        onDelete={(id) => setDeleteId(id)}
      />
      <ConfirmModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Career"
        message="Are you sure you want to delete this job listing? This cannot be undone."
      />
    </div>
  );
};

export default Careers;
