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
  Menu, 
  Layout
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useCart } from '../../hooks/useCart';
import { useTransaction } from '../../hooks/useTransaction';

const Admin = () => {
  const navigate = useNavigate(); // Initialize navigate hook
   const { data: transaction, error } = useTransaction();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [users, setUsers] = useState([])
  const [categories, setCategories] = useState([]);
  const [activities, setActivities] = useState([]);
  const [promos, setPromos] = useState([]);
  const [banners, setBanners] = useState([]);
  const [transactions, setTransactions] = useState([]);

  const [loading, setLoading] = useState(true);
  const [token, setToken]=useLocalStorage("token","");
  const { data: cartItems, loading: cartLoading, error: cartError, fetchData: fetchCart }=useCart();

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
          "apiKey": import.meta.env.VITE_API_KEY,
          "Authorization":`Bearer ${token}`
              
              
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
            headers: { 'apiKey': import.meta.env.VITE_API_KEY },
          });
          const data = await response.json();
          setCategories(data.data || []);
        };

        const fetchActivities = async () => {
          const response = await fetch('https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/activities', {
            headers: { 'apiKey': import.meta.env.VITE_API_KEY },
          });
          const data = await response.json();
          setActivities(data.data || []);
        };

        const fetchPromos = async () => {
          const response = await fetch('https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/promos', {
            headers: { 'apiKey': import.meta.env.VITE_API_KEY },
          });
          const data = await response.json();
          setPromos(data.data || []);
        };

        const fetchBanners = async () => {
          const response = await fetch('https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/banners', {
            headers: {
              "apiKey": import.meta.env.VITE_API_KEY,
              "Authorization":`Bearer ${token}`
            },
          });
          const data = await response.json();
          setBanners(data.data || []);
        };
        const fetchTransactions = async () => {
          const response = await fetch('https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/all-transactions', {
            headers: {
              "apiKey": import.meta.env.VITE_API_KEY,
              "Authorization": `Bearer ${token}`
            }
          });
          const data = await response.json();
          setTransactions(data.data || []);
        };
        
        

        await Promise.all([
          fetchUsers(), fetchCategories(),
           fetchActivities(), fetchPromos(),
            fetchBanners(), fetchTransactions() ]);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  // const [cartItems, setCartItems] = useState([]);

  // const fetchCartData = async () => {
  //   try {
  //     const response = await fetch('https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/carts', {
  //       headers: {
  //         "apiKey": import.meta.env.VITE_API_KEY,
  //             "Authorization":`Bearer ${token}`
  //       },
  //     });
  //     const data = await response.json();
  //     setCartItems(data.data || []);
  //   } catch (error) {
  //     console.error('Error fetching cart data:', error);
  //   }
  // };
  
  // useEffect(() => {
  //   fetchCartData();
  // }, []);
  
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
        path = `/transaction/${id}`;
        
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
        let url = '';
        // Tentukan URL berdasarkan bagian aktif
        if (activeSection === 'categories') {
          url = `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/delete-category/${id}`;
        } else if (activeSection === 'activities') {
          url = `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/delete-activity/${id}`;
        } else if (activeSection === 'promos') {
          url = `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/delete-promo/${id}`;
        } else if (activeSection === 'banners') {  // Add this for banners
          url = `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/delete-banner/${id}`;
        }
  
        const response = await fetch(url, {
          method: 'DELETE',
          headers: {
            'apiKey': import.meta.env.VITE_API_KEY,
            'Authorization': `Bearer ${token}`
          },
        });
  
        if (response.ok) {
          if (activeSection === 'categories') {
            // Update categories state after successful deletion
            setCategories(prevCategories => 
              prevCategories.filter(category => category.id !== id)
            );
          } else if (activeSection === 'activities') {
            // Update activities state after successful deletion
            setActivities(prevActivities => 
              prevActivities.filter(activity => activity.id !== id)
            );
          } else if (activeSection === 'promos') {
            // Update promos state after successful deletion
            setPromos(prevPromos => 
              prevPromos.filter(promo => promo.id !== id)
            );
          } else if (activeSection === 'banners') {  // Add this for banners
            // Update banners state after successful deletion
            setBanners(prevBanners => 
              prevBanners.filter(banner => banner.id !== id)
            );
          }
          alert('Item deleted successfully');
        } else {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to delete item');
        }
      } catch (error) {
        console.error('Error deleting item:', error);
        alert('Failed to delete item: ' + error.message);
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
                columns={['ID', 'CATEGORY ID','NAME', 'IMAGE', 'createdAt', ]}
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
        case 'cart':
  return (
    <ContentWrapper title="Cart Management">
      {cartLoading ? (
        <p>Loading...</p>
      ) : (
        <CustomTable 
          data={cartItems.map((cart) => ({
            id: cart.id,
            activityName: cart.activity.name,
            quantity: cart.quantity,
            totalPrice: cart.totalPrice,
            status: cart.status,
          }))}
          columns={['ID', 'Activity Name', 'Quantity', 'Total Price', 'Status']}
        />
      )}
    </ContentWrapper>
  );
  case 'transactions':
  return (
    <ContentWrapper title="Transactions Management">
  {loading ? (
    <p>Loading...</p>
  ) : (
    <table className="w-full border border-collapse border-gray-300">
      <thead>
        <tr className="bg-gray-200">
          <th className="p-2 border border-gray-300">ID</th>
          <th className="p-2 border border-gray-300">User</th>
          <th className="p-2 border border-gray-300">Activity</th>
          <th className="p-2 border border-gray-300">Amount</th>
          <th className="p-2 border border-gray-300">Status</th>
          <th className="p-2 border border-gray-300">Created At</th>
          <th className="p-2 border border-gray-300">Action</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction) => (
          <tr key={transaction.id} className="odd:bg-white even:bg-gray-100">
            <td className="p-2 border border-gray-300">{transaction.id}</td>
            <td className="p-2 border border-gray-300">{transaction.userId}</td>
            <td className="p-2 border border-gray-300">
              {transaction.transaction_items.map(item => item.title).join(", ")}
            </td>
            <td className="p-2 border border-gray-300">{transaction.totalAmount}</td>
            <td className="p-2 border border-gray-300">{transaction.status}</td>
            <td className="p-2 border border-gray-300">{transaction.createdAt}</td>
            <td className="p-2 border border-gray-300">
            <Link to={`/transaction/${transaction.id}`}>
                <button className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                  Detail Transaction
                </button>
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
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




