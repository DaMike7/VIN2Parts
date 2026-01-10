import { useState, useRef } from 'react';
import { Search, Home, User, Bell, Clock, X, Settings, Disc, Wrench, Zap, Car as CarIcon, Menu } from 'lucide-react';

const Demo = () => {
  const [activeView, setActiveView] = useState('home');
  const [vinInput, setVinInput] = useState('');
  const [vehicleConfirmed, setVehicleConfirmed] = useState(false);
  const [showCatalog, setShowCatalog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPart, setSelectedPart] = useState(null);
  
  // New States for Responsiveness
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const categoryRefs = useRef({});

  const vehicleData = {
    plate: '12-AB-34',
    vin: 'VF1R9800X63202958',
    make: 'Renault',
    model: 'Clio V',
    year: '2020',
    engine: '1.5 dCi 85hp',
    transmission: 'Manual 6-speed',
    body: '5-door Hatchback'
  };

  const userData = {
    name: 'John Mechanic',
    userId: 'JM-2024-001',
    email: 'john.mechanic@autoparts.com',
    phone: '+351 912 345 678',
    company: 'AutoParts Portugal',
    role: 'Service Manager'
  };

  const categories = [
    { id: 'all', name: 'All', icon: null },
    { id: 'engine', name: 'Engine', icon: Settings },
    { id: 'brakes', name: 'Brakes', icon: Disc },
    { id: 'suspension', name: 'Suspension & Steering', icon: Wrench },
    { id: 'body', name: 'Body & Exterior', icon: CarIcon },
    { id: 'electrical', name: 'Electrical', icon: Zap }
  ];

  const partsData = {
    brakes: [
      {
        id: 1,
        title: 'Front Brake System',
        parts: [
          { num: '410608481R', desc: 'Brake Disc - Front (Ventilated)', notes: 'Diameter: 280mm' },
          { num: '410600019R', desc: 'Brake Pad Set - Front', notes: 'With wear indicator' },
          { num: '441004598R', desc: 'Brake Caliper - Front Left', notes: 'Includes bracket' }
        ]
      },
      {
        id: 2,
        title: 'Rear Brake System',
        parts: [
          { num: '432006789R', desc: 'Brake Disc - Rear (Solid)', notes: 'Diameter: 260mm' },
          { num: '440603456R', desc: 'Brake Pad Set - Rear', notes: 'Standard fitment' }
        ]
      }
    ],
    engine: [
      {
        id: 3,
        title: 'Timing System',
        parts: [
          { num: '130C11829R', desc: 'Timing Belt Kit', notes: 'Includes tensioner and pulleys' },
          { num: '210106050R', desc: 'Water Pump', notes: 'OEM replacement' }
        ]
      },
      {
        id: 4,
        title: 'Cylinder Head',
        parts: [
          { num: '110201234R', desc: 'Cylinder Head Gasket', notes: 'Multi-layer steel' },
          { num: '132104567R', desc: 'Valve Cover Gasket', notes: 'With seals' }
        ]
      }
    ],
    suspension: [
      {
        id: 5,
        title: 'Front Suspension',
        parts: [
          { num: '543021234R', desc: 'Front Shock Absorber', notes: 'Gas-filled' },
          { num: '546108765R', desc: 'Control Arm Bushing', notes: 'Polyurethane' }
        ]
      }
    ],
    body: [
      {
        id: 6,
        title: 'Front Bumper Assembly',
        parts: [
          { num: '620220123R', desc: 'Front Bumper Cover', notes: 'Primed, ready to paint' },
          { num: '623015678R', desc: 'Bumper Bracket - Left', notes: 'Mounting hardware' }
        ]
      }
    ],
    electrical: [
      {
        id: 7,
        title: 'Lighting System',
        parts: [
          { num: '260605123R', desc: 'Headlight Assembly - Left', notes: 'Halogen type' },
          { num: '265503456R', desc: 'Tail Light - Right', notes: 'LED type' }
        ]
      }
    ]
  };

  const notifications = [
    { id: 1, text: 'New parts catalog updated', time: '2 hours ago' },
    { id: 2, text: 'VIN search completed', time: '5 hours ago' },
    { id: 3, text: 'Profile information updated', time: '1 day ago' }
  ];

  const history = [
    { id: 1, vin: 'VF1R9800X63202958', model: 'Renault Clio V', date: '2025-01-09' },
    { id: 2, vin: 'VF1KZ0G0654123456', model: 'Renault Megane', date: '2025-01-08' },
    { id: 3, vin: 'VF1LM1B0H55789012', model: 'Renault Captur', date: '2025-01-07' }
  ];

  const handleVinSearch = () => {
    if (vinInput.trim()) {
      setVehicleConfirmed(true);
    }
  };

  const handleViewCatalog = () => {
    setShowCatalog(true);
  };

  const handlePartClick = (part, diagramTitle) => {
    setSelectedPart({ ...part, diagram: diagramTitle });
  };

  const scrollToCategory = (categoryId) => {
    setSelectedCategory(categoryId);
    if (categoryId !== 'all' && categoryRefs.current[categoryId]) {
      categoryRefs.current[categoryId].scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  };

  const renderSidebar = () => (
    <>
      {/* Mobile Backdrop */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      
      <div className={`w-64 bg-gray-900 h-screen fixed left-0 top-0 text-white z-50 transition-transform duration-300 transform 
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="p-6 border-b border-gray-800 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-yellow-500">DemoParts</h2>
            <p className="text-sm text-gray-400 mt-1">Parts Catalog System</p>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-gray-400">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <nav className="p-4 space-y-2">
          {[
            { id: 'home', icon: Home, label: 'Home' },
            { id: 'profile', icon: User, label: 'Profile' },
            { id: 'notifications', icon: Bell, label: 'Notifications', badge: 3 },
            { id: 'history', icon: Clock, label: 'History' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveView(item.id);
                if(item.id === 'home') {
                   setVehicleConfirmed(false);
                   setShowCatalog(false);
                   setVinInput('');
                }
                setIsSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeView === item.id ? 'bg-yellow-500 text-black' : 'hover:bg-gray-800'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
              {item.badge && (
                <span className="ml-auto bg-yellow-500 text-black text-xs px-2 py-1 rounded-full">{item.badge}</span>
              )}
            </button>
          ))}
        </nav>
      </div>
    </>
  );

  const renderNavbar = () => (
    <div className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
        >
          <Menu className="w-6 h-6 text-gray-600" />
        </button>
        <h1 className="text-lg lg:text-2xl font-bold text-gray-900 truncate">Parts Catalogue</h1>
      </div>
      
      <div className="hidden md:block flex-1 max-w-xl mx-8">
        <div className="relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Quick search..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500"
          />
        </div>
      </div>

      <button
        onClick={() => setActiveView('profile')}
        className="flex items-center gap-2 lg:gap-3 px-3 lg:px-4 py-2 bg-gray-100 hover:bg-yellow-50 rounded-lg transition-colors border border-gray-200"
      >
        <User className="w-5 h-5 text-gray-700" />
        <span className="font-medium text-gray-900 text-sm lg:text-base">{userData.userId}</span>
      </button>
    </div>
  );

  const renderHome = () => (
    <div className="p-4 lg:p-8">
      {!vehicleConfirmed ? (
        <div className="max-w-2xl mx-auto mt-10 lg:mt-20">
          <div className="bg-white rounded-xl shadow-lg p-6 lg:p-8 border-2 border-yellow-500">
            <div className="text-center mb-6">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Vehicle Identification</h2>
              <p className="text-gray-600 text-sm lg:text-base">Enter the VIN to access genuine OEM parts catalog</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vehicle Identification Number (VIN)
                </label>
                <input
                  type="text"
                  value={vinInput}
                  onChange={(e) => setVinInput(e.target.value.toUpperCase())}
                  placeholder="e.g., VF1R9800X63202958"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-yellow-500 focus:outline-none text-base lg:text-lg font-mono"
                  onKeyPress={(e) => e.key === 'Enter' && handleVinSearch()}
                />
              </div>
              
              <button
                onClick={handleVinSearch}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Search className="w-5 h-5" />
                Search Database
              </button>
            </div>
          </div>
        </div>
      ) : !showCatalog ? (
        <div className="max-w-4xl mx-auto mt-6 lg:mt-12">
          <div className="bg-white rounded-xl shadow-lg p-6 lg:p-8 border-2 border-yellow-500">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Vehicle Confirmed</h2>
              <div className="bg-yellow-500 text-black px-4 py-2 rounded-lg font-bold text-sm">
                ✓ Verified
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {[
                { label: 'Registration', value: vehicleData.plate },
                { label: 'VIN', value: vehicleData.vin, mono: true },
                { label: 'Make & Model', value: `${vehicleData.make} ${vehicleData.model}` },
                { label: 'Year', value: vehicleData.year },
                { label: 'Engine', value: vehicleData.engine },
                { label: 'Transmission', value: vehicleData.transmission },
                { label: 'Body Type', value: vehicleData.body, span: true },
              ].map((item, idx) => (
                <div key={idx} className={`bg-gray-50 p-4 rounded-lg border-l-4 border-yellow-500 ${item.span ? 'sm:col-span-2' : ''}`}>
                  <p className="text-xs text-gray-600 mb-1 uppercase tracking-wider">{item.label}</p>
                  <p className={`text-lg font-bold text-gray-900 ${item.mono ? 'font-mono break-all' : ''}`}>{item.value}</p>
                </div>
              ))}
            </div>
            
            <button
              onClick={handleViewCatalog}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-4 rounded-lg transition-colors"
            >
              View Parts Catalog
            </button>
          </div>
        </div>
      ) : (
        <div className="pb-20">
          {/* Categories Bar */}
          <div className="bg-white border-b border-gray-200 px-4 lg:px-6 py-3 -mx-4 lg:-mx-8 mb-6 flex gap-2 overflow-x-auto sticky top-[73px] z-20 no-scrollbar">
            {categories.map(cat => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => scrollToCategory(cat.id)}
                  className={`px-4 lg:px-6 py-2 rounded-lg font-medium whitespace-nowrap transition-colors flex items-center gap-2 text-sm lg:text-base ${
                    selectedCategory === cat.id
                      ? 'bg-yellow-500 text-black'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {Icon && <Icon className="w-4 h-4 lg:w-5 h-5" />}
                  {cat.name}
                </button>
              );
            })}
          </div>

          <div className="space-y-8">
            {Object.keys(partsData).map(catKey => (
              <div key={catKey} ref={el => categoryRefs.current[catKey] = el} className="scroll-mt-32">
                <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2 capitalize">
                  {categories.find(c => c.id === catKey)?.icon && 
                    <div className="text-yellow-500">{(() => {
                      const Icon = categories.find(c => c.id === catKey).icon;
                      return <Icon className="w-6 h-6" />;
                    })()}</div>
                  }
                  {catKey}
                </h2>
                <div className="space-y-6">
                  {partsData[catKey]?.map(diagram => (
                    <div key={diagram.id} className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-yellow-500">
                      <div className="bg-gray-900 p-4 lg:p-6">
                        <h3 className="text-xl lg:text-2xl font-bold text-yellow-500">{diagram.title}</h3>
                      </div>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4 lg:p-6">
                        <div className="lg:col-span-2">
                          <div className="relative bg-gray-100 rounded-lg h-64 lg:h-96 flex items-center justify-center border-2 border-gray-300">
                            <div className="text-center text-gray-400 p-4">
                              <p className="text-base lg:text-lg font-semibold text-gray-500">Exploded Diagram</p>
                              <p className="text-xs lg:text-sm mt-2">Visual reference area</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <h4 className="font-bold text-gray-900 text-lg mb-3">Parts List</h4>
                          {diagram.parts.map((part, idx) => (
                            <button
                              key={idx}
                              onClick={() => handlePartClick(part, diagram.title)}
                              className="w-full text-left p-4 bg-gray-50 hover:bg-yellow-50 rounded-lg transition-colors border border-gray-200 hover:border-yellow-500"
                            >
                              <p className="font-bold text-gray-900 text-base lg:text-lg">{part.num}</p>
                              <p className="text-sm text-gray-700 mt-1 line-clamp-1">{part.desc}</p>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  // Re-used profile/notif/history sections with mobile padding updates
  const renderContainer = (title, children) => (
    <div className="p-4 lg:p-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-yellow-500">
          <div className="bg-gray-900 p-6">
            <h2 className="text-2xl font-bold text-yellow-500">{title}</h2>
          </div>
          <div className="p-1 lg:p-4">{children}</div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {renderSidebar()}
      
      <div className="lg:ml-64 transition-all duration-300">
        {renderNavbar()}
        
        <div className="relative">
          {activeView === 'home' && renderHome()}
          {activeView === 'profile' && renderContainer('User Profile', (
            <div className="space-y-4 p-4">
              {Object.entries(userData).map(([key, val]) => (
                <div key={key} className="bg-gray-50 p-4 rounded-lg border-l-4 border-yellow-500">
                  <p className="text-xs text-gray-600 mb-1 uppercase">{key}</p>
                  <p className="text-lg font-semibold text-gray-900">{val}</p>
                </div>
              ))}
            </div>
          ))}
          {activeView === 'notifications' && (
            <div className="divide-y">
              {notifications.map(n => (
                <div key={n.id} className="p-6 hover:bg-gray-50">
                  <p className="text-gray-900 font-medium">{n.text}</p>
                  <p className="text-sm text-gray-500 mt-1">{n.time}</p>
                </div>
              ))}
            </div>
          )}
          {activeView === 'history' && (
             <div className="divide-y">
             {history.map(item => (
               <div key={item.id} className="p-4 lg:p-6 hover:bg-gray-50 flex items-center justify-between">
                 <div>
                   <p className="font-mono text-gray-900 font-semibold">{item.vin}</p>
                   <p className="text-sm text-gray-600">{item.model}</p>
                 </div>
                 <p className="text-xs lg:text-sm text-gray-500">{item.date}</p>
               </div>
             ))}
           </div>
          )}
        </div>
      </div>

      {/* Part Details Side Panel (Collapsible Right Sidebar) */}
      <div className={`fixed right-0 top-0 h-screen w-full sm:w-96 bg-white shadow-2xl border-l-4 border-yellow-500 z-[60] transition-transform duration-300 transform 
        ${selectedPart ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {selectedPart && (
          <>
            <div className="bg-gray-900 p-6 flex items-center justify-between sticky top-0">
              <h3 className="text-xl font-bold text-yellow-500">Part Details</h3>
              <button
                onClick={() => setSelectedPart(null)}
                className="text-white hover:text-yellow-500 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 space-y-4 overflow-y-auto h-[calc(100vh-80px)]">
              <div className="bg-yellow-50 p-4 rounded-lg border-2 border-yellow-500">
                <p className="text-sm text-gray-600 mb-1">Part Number</p>
                <p className="text-2xl font-bold text-gray-900 break-all">{selectedPart.num}</p>
              </div>
              
              {[
                { label: 'Description', val: selectedPart.desc },
                { label: 'Category', val: selectedPart.diagram },
                { label: 'Technical Notes', val: selectedPart.notes },
                { label: 'Vehicle Fitment', val: `${vehicleData.make} ${vehicleData.model} (${vehicleData.year})` }
              ].map((item, i) => (
                <div key={i} className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1 uppercase">{item.label}</p>
                  <p className="text-base lg:text-lg text-gray-900">{item.val}</p>
                </div>
              ))}
              
              <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-4 rounded-lg transition-all shadow-md active:scale-[0.98]">
                Source This Part
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Demo;