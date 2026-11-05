import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MdArrowBack, MdAdd } from 'react-icons/md';
import './PageHeader.css';

const PageHeader = ({ title, subtitle, addPath, addLabel, showBack }) => {
  const navigate = useNavigate();

  return (
    <div className="page-header">
      <div className="page-header-left">
        {showBack && (
          <button className="back-btn" onClick={() => navigate(-1)}>
            <MdArrowBack />
          </button>
        )}
        <div>
          <h1 className="page-title">{title}</h1>
          {subtitle && <p className="page-subtitle">{subtitle}</p>}
        </div>
      </div>
      {addPath && (
        <button className="btn-primary" onClick={() => navigate(addPath)}>
          <MdAdd /> {addLabel || 'Add New'}
        </button>
      )}
    </div>
  );
};

export default PageHeader;
