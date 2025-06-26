import { Outlet } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';

const AdminLayout = () => {
  return (
    <>
      <AdminNavbar />
      <div className="p-3">
        <Outlet /> {/* This renders child routes like dashboard, gallery, messages */}
      </div>
    </>
  );
};

export default AdminLayout;
