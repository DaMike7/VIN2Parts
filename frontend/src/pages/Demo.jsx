import { useState, useRef } from 'react';
import { Search, Home, User, Bell, Clock, X, Settings, Disc, Wrench, Zap, Car as CarIcon } from 'lucide-react';

const Demo = () => {
  const [activeView, setActiveView] = useState('home');
  const [vinInput, setVinInput] = useState('');
  const [vehicleConfirmed, setVehicleConfirmed] = useState(false);
  const [showCatalog, setShowCatalog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPart, setSelectedPart] = useState(null);
  
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
    <div className="w-64 bg-gray-900 h-screen fixed left-0 top-0 text-white">
      <div className="p-6 border-b border-gray-800">
        <h2 className="text-2xl font-bold text-yellow-500">DemoParts</h2>
        <p className="text-sm text-gray-400 mt-1">Parts Catalog System</p>
      </div>
      
      <nav className="p-4 space-y-2">
        <button
          onClick={() => {
            setActiveView('home');
            setVehicleConfirmed(false);
            setShowCatalog(false);
            setVinInput('');
          }}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            activeView === 'home' ? 'bg-yellow-500 text-black' : 'hover:bg-gray-800'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="font-medium">Home</span>
        </button>
        
        <button
          onClick={() => setActiveView('profile')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            activeView === 'profile' ? 'bg-yellow-500 text-black' : 'hover:bg-gray-800'
          }`}
        >
          <User className="w-5 h-5" />
          <span className="font-medium">Profile</span>
        </button>
        
        <button
          onClick={() => setActiveView('notifications')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            activeView === 'notifications' ? 'bg-yellow-500 text-black' : 'hover:bg-gray-800'
          }`}
        >
          <Bell className="w-5 h-5" />
          <span className="font-medium">Notifications</span>
          <span className="ml-auto bg-yellow-500 text-black text-xs px-2 py-1 rounded-full">3</span>
        </button>
        
        <button
          onClick={() => setActiveView('history')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            activeView === 'history' ? 'bg-yellow-500 text-black' : 'hover:bg-gray-800'
          }`}
        >
          <Clock className="w-5 h-5" />
          <span className="font-medium">History</span>
        </button>
      </nav>
    </div>
  );

  const renderNavbar = () => (
    <div className="bg-white border-b border-gray-200 px-6 py-4 ml-64 flex items-center justify-between">
      <h1 className="text-2xl font-bold text-gray-900">Parts Catalogue Demo</h1>
      <div className="flex-1 max-w-xl mx-8">
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
        className="flex items-center gap-3 px-4 py-2 bg-gray-100 hover:bg-yellow-50 rounded-lg transition-colors border border-gray-200"
      >
        <User className="w-5 h-5 text-gray-700" />
        <span className="font-medium text-gray-900">{userData.userId}</span>
      </button>
    </div>
  );

  const renderHome = () => (
    <div className="p-8">
      {!vehicleConfirmed ? (
        <div className="max-w-2xl mx-auto mt-20">
          <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-yellow-500">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Vehicle Identification</h2>
              <p className="text-gray-600">Enter the VIN to access genuine OEM parts catalog</p>
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
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-yellow-500 focus:outline-none text-lg font-mono"
                  onKeyPress={(e) => e.key === 'Enter' && handleVinSearch()}
                />
              </div>
              
              <button
                onClick={handleVinSearch}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Search className="w-5 h-5" />
                Search Vehicle Database
              </button>
            </div>
          </div>
        </div>
      ) : !showCatalog ? (
        <div className="max-w-4xl mx-auto mt-12">
          <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-yellow-500">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-gray-900">Vehicle Confirmed</h2>
              <div className="bg-yellow-500 text-black px-4 py-2 rounded-lg font-bold">
                ✓ Verified
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-yellow-500">
                <p className="text-sm text-gray-600 mb-1">Registration Number</p>
                <p className="text-xl font-bold text-gray-900">{vehicleData.plate}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-yellow-500">
                <p className="text-sm text-gray-600 mb-1">VIN</p>
                <p className="text-lg font-mono text-gray-900">{vehicleData.vin}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-yellow-500">
                <p className="text-sm text-gray-600 mb-1">Make & Model</p>
                <p className="text-xl font-bold text-gray-900">{vehicleData.make} {vehicleData.model}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-yellow-500">
                <p className="text-sm text-gray-600 mb-1">Year</p>
                <p className="text-xl font-bold text-gray-900">{vehicleData.year}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-yellow-500">
                <p className="text-sm text-gray-600 mb-1">Engine</p>
                <p className="text-lg font-semibold text-gray-900">{vehicleData.engine}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-yellow-500">
                <p className="text-sm text-gray-600 mb-1">Transmission</p>
                <p className="text-lg text-gray-900">{vehicleData.transmission}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-yellow-500 col-span-2">
                <p className="text-sm text-gray-600 mb-1">Body Type</p>
                <p className="text-lg text-gray-900">{vehicleData.body}</p>
              </div>
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
        <div>
          {/* Categories Bar */}
          <div className="bg-white border-b border-gray-200 px-6 py-3 -mx-8 mb-6 flex gap-2 overflow-x-auto sticky top-0 z-10">
            {categories.map(cat => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => scrollToCategory(cat.id)}
                  className={`px-6 py-2 rounded-lg font-medium whitespace-nowrap transition-colors flex items-center gap-2 ${
                    selectedCategory === cat.id
                      ? 'bg-yellow-500 text-black'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {Icon && <Icon className="w-5 h-5" />}
                  {cat.name}
                </button>
              );
            })}
          </div>

          {/* Parts Diagrams - Vertical Layout */}
          <div className="space-y-8">
            {/* Engine Section */}
            <div ref={el => categoryRefs.current['engine'] = el} className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Settings className="w-6 h-6 text-yellow-500" />
                Engine
              </h2>
              <div className="space-y-6">
                {partsData.engine?.map(diagram => (
                  <div key={diagram.id} className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-yellow-500">
                    <div className="bg-gray-900 p-6">
                      <h3 className="text-2xl font-bold text-yellow-500">{diagram.title}</h3>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-6 p-6">
                      {/* Diagram Area - Larger */}
                      <div className="col-span-2">
                        <div className="relative bg-gray-100 rounded-lg h-96 flex items-center justify-center border-2 border-gray-300">
                          <div className="text-center text-gray-400">
                            <p className="text-lg font-semibold">Exploded Diagram</p>
                            <p className="text-sm mt-2">Diagram placeholder - Add actual part diagram here</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Parts List */}
                      <div className="space-y-3">
                        <h4 className="font-bold text-gray-900 text-lg mb-3">Parts List</h4>
                        {diagram.parts.map((part, idx) => (
                          <button
                            key={idx}
                            onClick={() => handlePartClick(part, diagram.title)}
                            className="w-full text-left p-4 bg-gray-50 hover:bg-yellow-50 rounded-lg transition-colors border border-gray-200 hover:border-yellow-500"
                          >
                            <p className="font-bold text-gray-900 text-lg">{part.num}</p>
                            <p className="text-sm text-gray-700 mt-1">{part.desc}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Brakes Section */}
            <div ref={el => categoryRefs.current['brakes'] = el} className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Disc className="w-6 h-6 text-yellow-500" />
                Brakes
              </h2>
              <div className="space-y-6">
                {partsData.brakes?.map(diagram => (
                  <div key={diagram.id} className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-yellow-500">
                    <div className="bg-gray-900 p-6">
                      <h3 className="text-2xl font-bold text-yellow-500">{diagram.title}</h3>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-6 p-6">
                      <div className="col-span-2">
                        <div className="relative bg-gray-100 rounded-lg h-96 flex items-center justify-center border-2 border-gray-300">
                          <div className="text-center text-gray-400">
                            <p className="text-lg font-semibold">Exploded Diagram</p>
                            <p className="text-sm mt-2">Diagram placeholder - Add actual part diagram here</p>
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
                            <p className="font-bold text-gray-900 text-lg">{part.num}</p>
                            <p className="text-sm text-gray-700 mt-1">{part.desc}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Suspension Section */}
            <div ref={el => categoryRefs.current['suspension'] = el} className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Wrench className="w-6 h-6 text-yellow-500" />
                Suspension & Steering
              </h2>
              <div className="space-y-6">
                {partsData.suspension?.map(diagram => (
                  <div key={diagram.id} className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-yellow-500">
                    <div className="bg-gray-900 p-6">
                      <h3 className="text-2xl font-bold text-yellow-500">{diagram.title}</h3>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-6 p-6">
                      <div className="col-span-2">
                        <div className="relative bg-gray-100 rounded-lg h-96 flex items-center justify-center border-2 border-gray-300">
                          <div className="text-center text-gray-400">
                            <p className="text-lg font-semibold">Exploded Diagram</p>
                            <p className="text-sm mt-2">Diagram placeholder - Add actual part diagram here</p>
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
                            <p className="font-bold text-gray-900 text-lg">{part.num}</p>
                            <p className="text-sm text-gray-700 mt-1">{part.desc}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Body Section */}
            <div ref={el => categoryRefs.current['body'] = el} className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <CarIcon className="w-6 h-6 text-yellow-500" />
                Body & Exterior
              </h2>
              <div className="space-y-6">
                {partsData.body?.map(diagram => (
                  <div key={diagram.id} className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-yellow-500">
                    <div className="bg-gray-900 p-6">
                      <h3 className="text-2xl font-bold text-yellow-500">{diagram.title}</h3>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-6 p-6">
                      <div className="col-span-2">
                        <div className="relative bg-gray-100 rounded-lg h-96 flex items-center justify-center border-2 border-gray-300">
                          <div className="text-center text-gray-400">
                            <p className="text-lg font-semibold">Exploded Diagram</p>
                            <p className="text-sm mt-2">Diagram placeholder - Add actual part diagram here</p>
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
                            <p className="font-bold text-gray-900 text-lg">{part.num}</p>
                            <p className="text-sm text-gray-700 mt-1">{part.desc}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Electrical Section */}
            <div ref={el => categoryRefs.current['electrical'] = el} className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Zap className="w-6 h-6 text-yellow-500" />
                Electrical
              </h2>
              <div className="space-y-6">
                {partsData.electrical?.map(diagram => (
                  <div key={diagram.id} className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-yellow-500">
                    <div className="bg-gray-900 p-6">
                      <h3 className="text-2xl font-bold text-yellow-500">{diagram.title}</h3>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-6 p-6">
                      <div className="col-span-2">
                        <div className="relative bg-gray-100 rounded-lg h-96 flex items-center justify-center border-2 border-gray-300">
                          <div className="text-center text-gray-400">
                            <p className="text-lg font-semibold">Exploded Diagram</p>
                            <p className="text-sm mt-2">Diagram placeholder - Add actual part diagram here</p>
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
                            <p className="font-bold text-gray-900 text-lg">{part.num}</p>
                            <p className="text-sm text-gray-700 mt-1">{part.desc}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderProfile = () => (
    <div className="p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-yellow-500">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">User Profile</h2>
          
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-yellow-500">
              <p className="text-sm text-gray-600 mb-1">User ID</p>
              <p className="text-lg font-semibold text-gray-900">{userData.userId}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-yellow-500">
              <p className="text-sm text-gray-600 mb-1">Full Name</p>
              <p className="text-lg font-semibold text-gray-900">{userData.name}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-yellow-500">
              <p className="text-sm text-gray-600 mb-1">Email Address</p>
              <p className="text-lg text-gray-900">{userData.email}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-yellow-500">
              <p className="text-sm text-gray-600 mb-1">Phone Number</p>
              <p className="text-lg text-gray-900">{userData.phone}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-yellow-500">
              <p className="text-sm text-gray-600 mb-1">Company</p>
              <p className="text-lg text-gray-900">{userData.company}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-yellow-500">
              <p className="text-sm text-gray-600 mb-1">Role</p>
              <p className="text-lg text-gray-900">{userData.role}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-yellow-500">
          <div className="bg-gray-900 p-6">
            <h2 className="text-2xl font-bold text-yellow-500">Notifications</h2>
          </div>
          
          <div className="divide-y">
            {notifications.map(notif => (
              <div key={notif.id} className="p-4 hover:bg-gray-50">
                <p className="text-gray-900">{notif.text}</p>
                <p className="text-sm text-gray-500 mt-1">{notif.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderHistory = () => (
    <div className="p-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-yellow-500">
          <div className="bg-gray-900 p-6">
            <h2 className="text-2xl font-bold text-yellow-500">Search History</h2>
          </div>
          
          <div className="divide-y">
            {history.map(item => (
              <div key={item.id} className="p-4 hover:bg-gray-50 flex items-center justify-between">
                <div>
                  <p className="font-mono text-gray-900 font-semibold">{item.vin}</p>
                  <p className="text-sm text-gray-600">{item.model}</p>
                </div>
                <p className="text-sm text-gray-500">{item.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {renderSidebar()}
      
      <div className="ml-64">
        {renderNavbar()}
        
        <div className="relative">
          {activeView === 'home' && renderHome()}
          {activeView === 'profile' && renderProfile()}
          {activeView === 'notifications' && renderNotifications()}
          {activeView === 'history' && renderHistory()}
        </div>
      </div>

      {/* Part Details Side Panel */}
      {selectedPart && (
        <div className="fixed right-0 top-0 h-screen w-96 bg-white shadow-2xl border-l-4 border-yellow-500 z-50 overflow-y-auto">
          <div className="bg-gray-900 p-6 flex items-center justify-between sticky top-0">
            <h3 className="text-xl font-bold text-yellow-500">Part Details</h3>
            <button
              onClick={() => setSelectedPart(null)}
              className="text-white hover:text-yellow-500 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="p-6 space-y-4">
            <div className="bg-yellow-50 p-4 rounded-lg border-2 border-yellow-500">
              <p className="text-sm text-gray-600 mb-1">Part Number</p>
              <p className="text-2xl font-bold text-gray-900">{selectedPart.num}</p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Description</p>
              <p className="text-lg text-gray-900">{selectedPart.desc}</p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Category</p>
              <p className="text-lg text-gray-900">{selectedPart.diagram}</p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Technical Notes</p>
              <p className="text-gray-900">{selectedPart.notes}</p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Vehicle</p>
              <p className="text-gray-900">{vehicleData.make} {vehicleData.model} ({vehicleData.year})</p>
            </div>
            
            <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 rounded-lg transition-colors">
              Source This Part
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Demo;