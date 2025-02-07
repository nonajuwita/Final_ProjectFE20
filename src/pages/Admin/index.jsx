import React, { useEffect, useState } from 'react';
import { 
  User, 
  Tag, 
  Activity, 
  Ticket, 
  Image, 
  Camera, 
  ShoppingCart, 
  ClipboardList, 
  Plus, 
  Pencil, 
  Trash, 
  Menu 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import UpdateForm from '../../components/UpdateForm';

const Admin = () => {
  const navigate = useNavigate(); // Initialize navigate hook
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activities, setActivities] = useState([]);
  const [promos, setPromos] = useState([]);
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  const menuItems = [
    { id: 'users', label: 'Users', icon: User },
    { id: 'categories', label: 'Categories', icon: Tag },
    { id: 'activities', label: 'Activities', icon: Activity },
    { id: 'promos', label: 'Promos', icon: Ticket },
    { id: 'banners', label: 'Banners', icon: Image },
    { id: 'payment-methods', label: 'Payment Methods', icon: Camera },
    { id: 'cart', label: 'Cart', icon: ShoppingCart },
    { id: 'transactions', label: 'Transactions', icon: ClipboardList },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Users, Categories, Activities, Promos, and Banners
        const fetchUsers = async () => {
          const response = await fetch('https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/all-user', {
            headers: {
              'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiI5NWE4MDNjMy1iNTFlLTQ3YTAtOTBkYi0yYzJmM2Y0ODE1YTkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MjI4NDgzODl9.Yblw19ySKtguk-25Iw_4kBKPfqcNqKWx9gjf505DIAk',
              'apiKey': '24405e01-fbc1-45a5-9f5a-be13afcd757c',
            },
          });
          const data = await response.json();
          if (Array.isArray(data.data)) {
            const filteredUsers = data.data.map(({ profilePictureUrl, phoneNumber, ...rest }) => rest);
            setUsers(filteredUsers);
          }
        };

        const fetchCategories = async () => {
          const response = await fetch('https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/categories', {
            headers: { 'apiKey': '24405e01-fbc1-45a5-9f5a-be13afcd757c' },
          });
          const data = await response.json();
          setCategories(data.data || []);
        };

        const fetchActivities = async () => {
          const response = await fetch('https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/activities', {
            headers: { 'apiKey': '24405e01-fbc1-45a5-9f5a-be13afcd757c' },
          });
          const data = await response.json();
          setActivities(data.data || []);
        };

        const fetchPromos = async () => {
          const response = await fetch('https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/promos', {
            headers: { 'apiKey': '24405e01-fbc1-45a5-9f5a-be13afcd757c' },
          });
          const data = await response.json();
          setPromos(data.data || []);
        };

        const fetchBanners = async () => {
          const response = await fetch('https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/banners', {
            headers: {
              'apiKey': '24405e01-fbc1-45a5-9f5a-be13afcd757c',
              'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiI5NWE4MDNjMy1iNTFlLTQ3YTAtOTBkYi0yYzJmM2Y0ODE1YTkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MjI4NDgzODl9.Yblw19ySKtguk-25Iw_4kBKPfqcNqKWx9gjf505DIAk',
            },
          });
          const data = await response.json();
          setBanners(data.data || []);
        };

        await Promise.all([fetchUsers(), fetchCategories(), fetchActivities(), fetchPromos(), fetchBanners()]);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Navigate to the update form page
  const handleEdit = (id) => {
    let path = '';
  
    switch (activeSection) {
      case 'categories':
        path = `/updatecategories/${id}`;
        break;
      case 'activities':
        path = `/updateactivities/${id}`;
        break;
      case 'promos':
        path = `/updatepromos/${id}`;
        break;
      case 'banners':
        path = `/updatebanners/${id}`;
        break;
      case 'users':
        path = `/updateform/${id}`;
        break;
      default:
        path = `/updateformelse/${id}`;
    }
  
    console.log("Navigating to:", path);
    navigate(path);
  };
  const handleAddNew = () => {
    let path = '';
  
    switch (activeSection) {
      case 'categories':
        path = '/addCategories';
        break;
      case 'activities':
        path = '/addActivities';
        break;
      case 'promos':
        path = '/addPromos';
        break;
      case 'banners':
        path = '/addBanners';
        break;
      case 'users':
        path = '/addUsers';
        break;
      default:
        path = '/addItem';
    }
  
    console.log("Navigating to:", path);
    navigate(path);
  };
  
  
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        const response = await fetch(`https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/delete-category/${id}`, {
          method: 'DELETE',
          headers: {
            'apiKey': '24405e01-fbc1-45a5-9f5a-be13afcd757c',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiI5NWE4MDNjMy1iNTFlLTQ3YTAtOTBkYi0yYzJmM2Y0ODE1YTkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MjI4NDgzODl9.Yblw19ySKtguk-25Iw_4kBKPfqcNqKWx9gjf505DIAk',
          },
        });

        if (response.ok) {
          // Update the categories state by removing the deleted item
          setCategories(prevCategories => 
            prevCategories.filter(category => category.id !== id)
          );
          alert('Category deleted successfully');
        } else {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to delete category');
        }
      } catch (error) {
        console.error('Error deleting category:', error);
        alert('Failed to delete category: ' + error.message);
      }
    }
  };

  const CustomTable = ({ data, columns }) => (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full table-auto">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((column) => (
              <th key={column} className="px-4 py-2 text-sm font-medium text-left text-gray-600">{column}</th>
            ))}
            <th className="px-4 py-2 text-sm font-medium text-left text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="border-b hover:bg-gray-50">
              {Object.values(item).map((value, index) => (
                <td key={index} className="px-4 py-3 text-sm text-gray-800">{value}</td>
              ))}
              <td className="px-4 py-3 text-sm">
                <div className="flex space-x-2">
                  <button onClick={() => handleEdit(item.id)} className="text-blue-600 hover:text-blue-800">
                    <Pencil className="w-5 h-5" />
                  </button>
                  <button  onClick ={() => handleDelete(item.id)} className="text-red-600 hover:text-red-800">
                    <Trash className="w-5 h-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderContent = () => {
    const ContentWrapper = ({ title, children }) => (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          <button onClick={handleAddNew} className="flex items-center px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" /> Add New
          </button>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    );

    switch (activeSection) {
      case 'users':
        return (
          <ContentWrapper title="Users Management">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <CustomTable 
                data={users}
                columns={['ID', 'Name', 'Email', 'Status']}
              />
            )}
          </ContentWrapper>
        );
      case 'categories':
        return (
          <ContentWrapper title="Categories Management">
            <CustomTable 
              data={categories}
              columns={['ID', 'Name', 'imageURL', 'createdAt','updatedAt']}
            />
          </ContentWrapper>
        );
      case 'activities':
        return (
          <ContentWrapper title="Activities Management">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <CustomTable 
                data={activities.map((activity) => ({
                  id: activity.id,
                  name: activity.name,
                  category: activity.category?.name || 'Uncategorized',
                  image: <img src={activity.imageUrl} alt={activity.name} className="object-cover w-16 h-16 rounded" />,
                  status: activity.updatedAt,
                }))}
                columns={['ID', 'Name', 'Category', 'Image', 'Status']}
              />
            )}
          </ContentWrapper>
        );
      case 'promos':
        return (
          <ContentWrapper title="Promos Management">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <CustomTable 
                data={promos.map((promo) => ({
                  id: promo.id,
                  name: promo.name,
                  description: promo.description,
                  discount: `${promo.discount}%`,
                  status: promo.updatedAt,
                }))}
                columns={['ID', 'Name', 'Description', 'Discount', 'Status']}
              />
            )}
          </ContentWrapper>
        );
      case 'banners':
        return (
          <ContentWrapper title="Banners Management">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <CustomTable 
                data={banners.map((banner) => ({
                  id: banner.id,
                  title: banner.title,
                  image: <img src={banner.imageUrl} alt={banner.title} className="object-cover w-16 h-16 rounded" />,
                  status: banner.updatedAt,
                }))}
                columns={['ID', 'Title', 'Image', 'Status']}
              />
            )}
          </ContentWrapper>
        );
      default:
        return (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {menuItems.map((item) => (
              <div 
                key={item.id} 
                className="p-6 bg-white rounded-lg shadow cursor-pointer hover:bg-gray-50"
                onClick={() => setActiveSection(item.id)}
              >
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <item.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-gray-800">{item.label}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className={`flex flex-col w-64 bg-white shadow-lg ${sidebarOpen ? 'block' : 'hidden'} md:block`}>
  <div className="flex items-center justify-between py-6 pl-4">
    <h1 className="text-xl font-semibold">Admin Dashboard</h1>
    <button onClick={() => setSidebarOpen(!sidebarOpen)}>
      <Menu className="w-6 h-6" />
    </button>
  </div>
  <div className="flex flex-col items-start py-6 pt-20 pl-4 space-y-4"> {/* Added pt-20 to sidebar content */}
    {menuItems.map((item) => (
      <button
        key={item.id}
        onClick={() => setActiveSection(item.id)}
        className={`flex items-center gap-4 w-full px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-md ${activeSection === item.id ? 'bg-gray-100' : ''}`}
      >
        <item.icon className="w-5 h-5" />
        <span className={`${sidebarOpen ? 'block' : 'hidden'}`}>{item.label}</span>
      </button>
    ))}
  </div>
</div>


      <main className="flex-1 p-6 pt-20"> {/* Added pt-20 for top padding */}
        {renderContent()}
      </main>
    </div>
  );
};

export default Admin;
