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

// Custom Card Component
const Card = ({ children, className = '', ...props }) => (
  <div 
    className={`bg-white rounded-lg shadow-sm ${className}`}
    {...props}
  >
    {children}
  </div>
);

const Admin = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activities, setActivities] = useState([]); // New state for activities
  const [loading, setLoading] = useState(true);

  const menuItems = [
    { id: 'users', label: 'Users', icon: User },
    { id: 'categories', label: 'Categories', icon: Tag },
    { id: 'activities', label: 'Activities', icon: Activity }, // Updated menu item
    { id: 'promos', label: 'Promos', icon: Ticket },
    { id: 'banners', label: 'Banners', icon: Image },
    { id: 'payment-methods', label: 'Payment Methods', icon: Camera },
    { id: 'cart', label: 'Cart', icon: ShoppingCart },
    { id: 'transactions', label: 'Transactions', icon: ClipboardList },
  ];

  // Fetch Users, Categories, and Activities
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/all-user', {
          headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiI5NWE4MDNjMy1iNTFlLTQ3YTAtOTBkYi0yYzJmM2Y0ODE1YTkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MjI4NDgzODl9.Yblw19ySKtguk-25Iw_4kBKPfqcNqKWx9gjf505DIAk',
            'apiKey': '24405e01-fbc1-45a5-9f5a-be13afcd757c',
          }
        });
        const data = await response.json();
        if (Array.isArray(data.data)) {
          const filteredUsers = data.data.map(({ profilePictureUrl, phoneNumber, ...rest }) => rest);
          setUsers(filteredUsers);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await fetch('https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/categories', {
          headers: {
            'apiKey': '24405e01-fbc1-45a5-9f5a-be13afcd757c',
          }
        });
        const data = await response.json();
        setCategories(data.data || []);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    const fetchActivities = async () => {
      try {
        const response = await fetch('https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/activities', {
          headers: {
            'apiKey': '24405e01-fbc1-45a5-9f5a-be13afcd757c',
          }
        });
        const data = await response.json();
        setActivities(data.data || []); // Set activities data
      } catch (error) {
        console.error('Error fetching activities:', error);
      }
    };

    fetchUsers();
    fetchCategories();
    fetchActivities(); // Fetch activities
  }, []);

  const CustomTable = ({ data, columns }) => (
    <div className="w-full overflow-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-50">
            {columns.map((column) => (
              <th key={column} className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                {column}
              </th>
            ))}
            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50">
              {columns.map((column) => (
                <td key={column} className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                  {/* Check if the value is an object and render a specific property like `name` */}
                  {typeof item[column] === 'object' && item[column] !== null
                    ? item[column].name // Change 'name' to the appropriate property if needed
                    : item[column]}
                </td>
              ))}
              <td className="px-6 py-4 text-sm whitespace-nowrap">
                <div className="flex gap-2">
                  <button className="p-1 text-blue-600 rounded-lg hover:bg-gray-100">
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button className="p-1 text-red-600 rounded-lg hover:bg-gray-100">
                    <Trash className="w-4 h-4" />
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
          <h2 className="text-2xl font-bold">{title}</h2>
          <button className="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
            <Plus className="w-4 h-4" /> Add New
          </button>
        </div>
        <Card className="p-6">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search..."
              className="w-full max-w-sm px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {children}
        </Card>
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
              columns={['ID', 'Name', 'Slug', 'Status']}
            />
          </ContentWrapper>
        );
      case 'activities': // New case for activities
        return (
          <ContentWrapper title="Activities Management">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <CustomTable 
                data={activities}
                columns={['ID', 'Name', 'Category', 'Status']}
              />
            )}
          </ContentWrapper>
        );
      default:
        return (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {menuItems.map((item) => (
              <Card 
                key={item.id} 
                className="p-6 cursor-pointer hover:bg-gray-50"
                onClick={() => setActiveSection(item.id)}
              >
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <item.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="font-medium">{item.label}</p>
                    <p className="text-sm text-gray-500">Manage {item.label.toLowerCase()}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 text-white bg-blue-500 rounded-full">
            A
          </div>
          <span className="text-sm font-medium">Admin</span>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-white h-[calc(100vh-4rem)] transition-all duration-300 shadow-sm`}>
          <div className="p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 ${activeSection === item.id ? 'bg-blue-50 text-blue-600' : ''}`}
                  >
                    <item.icon className="w-5 h-5" />
                    {sidebarOpen && <span>{item.label}</span>}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Admin;
