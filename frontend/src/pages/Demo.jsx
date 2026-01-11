import { useState, useRef, useEffect } from 'react';
import { Search, Home, User, Bell, Clock, X, Settings, Disc, Wrench, Zap, Car as CarIcon, Menu, Info } from 'lucide-react';

const Demo = () => {
  const [activeView, setActiveView] = useState('home');
  const [vinInput, setVinInput] = useState('');
  const [vehicleConfirmed, setVehicleConfirmed] = useState(false);
  const [showCatalog, setShowCatalog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPart, setSelectedPart] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [hoveredPart, setHoveredPart] = useState(null);
  
  const categoryRefs = useRef({});
  const imgRef = useRef(null);

  const vehicleData = {
    plate: '12-AB-34',
    vin: 'VF1R9800X63202958',
    make: 'Renault',
    model: 'Captur', // Updated to match your image map
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

  // Updated partsData to include parts from your Image Map
  const partsData = {
    engine: [
      { id: 3, title: 'Timing System', parts: [{ num: '130C11829R', desc: 'Timing Belt Kit', notes: 'OEM' }] }
    ],
    brakes: [
      { id: 1, title: 'Front Brakes', parts: [{ num: '410608481R', desc: 'Brake Disc', notes: '280mm' }] }
    ],
    suspension: [
      { id: 5, title: 'Wheels & Suspension', parts: [{ num: '403006852R', desc: 'Alloy Wheel - 17"', notes: 'Silver Finish' }] }
    ],
    body: [
      { 
        id: 6, 
        title: 'Front Body Panels', 
        parts: [
          { num: '651004352R', desc: 'Hood / Bonnet', notes: 'Aluminum' },
          { num: '623103421R', desc: 'Front Grill', notes: 'Chrome finish' },
          { num: '727123948R', desc: 'Windshield / Windscreen', notes: 'Acoustic glass' }
        ] 
      }
    ],
    electrical: [
      { 
        id: 7, 
        title: 'Lighting System', 
        parts: [
          { num: '260605123R', desc: 'Headlight Assembly - Left', notes: 'LED Pure Vision' },
          { num: '261605342R', desc: 'Indicator Light', notes: 'Mirror integrated' }
        ] 
      }
    ]
  };

  const mapParts = [
    { name: 'Hood', cat: 'body', coords: "449,397,760,385,862,439,600,454,496,422", shape: "poly" },
    { name: 'Grill', cat: 'body', coords: "771,529,651,472,869,464,828,526", shape: "poly" },
    { name: 'Headlight', cat: 'electrical', coords: "534,442,553,479,622,488,637,476", shape: "poly" },
    { name: 'Indicator Light', cat: 'electrical', coords: "513,449,583,511,527,496", shape: "poly" },
    { name: 'Windshield', cat: 'body', coords: "373,295,434,374,719,375,583,284,434,291", shape: "poly" },
    { name: 'Wheel', cat: 'suspension', coords: "454,606,57", shape: "circle" }
  ];

  const handleMapClick = (category) => {
    setShowCatalog(true);
    setTimeout(() => {
      scrollToCategory(category);
    }, 100);
  };

  const handleVinSearch = () => { if (vinInput.trim()) setVehicleConfirmed(true); };
  const handleViewCatalog = () => setShowCatalog(true);
  const handlePartClick = (part, diagramTitle) => setSelectedPart({ ...part, diagram: diagramTitle });

  const scrollToCategory = (categoryId) => {
    setSelectedCategory(categoryId);
    if (categoryId !== 'all' && categoryRefs.current[categoryId]) {
      categoryRefs.current[categoryId].scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const renderSidebar = () => (
    <>
      {isSidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setIsSidebarOpen(false)} />}
      <div className={`w-64 bg-gray-900 h-screen fixed left-0 top-0 text-white z-50 transition-transform duration-300 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="p-6 border-b border-gray-800 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-yellow-500">DemoParts</h2>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-gray-400"><X /></button>
        </div>
        <nav className="p-4 space-y-2">
          {['home', 'profile', 'notifications', 'history'].map((view) => (
            <button key={view} onClick={() => { setActiveView(view); setIsSidebarOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors capitalize ${activeView === view ? 'bg-yellow-500 text-black' : 'hover:bg-gray-800'}`}>
              {view === 'home' && <Home size={20} />}
              {view === 'profile' && <User size={20} />}
              {view === 'notifications' && <Bell size={20} />}
              {view === 'history' && <Clock size={20} />}
              <span className="font-medium">{view}</span>
            </button>
          ))}
        </nav>
      </div>
    </>
  );

  const renderHome = () => (
    <div className="p-4 lg:p-8">
      {!vehicleConfirmed ? (
        <div className="max-w-2xl mx-auto mt-20">
          <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-yellow-500">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Vehicle Identification</h2>
            <input
              type="text"
              value={vinInput}
              onChange={(e) => setVinInput(e.target.value.toUpperCase())}
              placeholder="Enter VIN..."
              className="w-full px-4 py-4 border-2 border-gray-300 rounded-lg focus:border-yellow-500 outline-none font-mono text-xl mb-4"
            />
            <button onClick={handleVinSearch} className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-4 rounded-lg flex justify-center gap-2">
              <Search /> Search Database
            </button>
          </div>
        </div>
      ) : !showCatalog ? (
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Horizontal Vehicle Details Bar */}
          <div className="bg-gray-900 text-white rounded-xl shadow-lg p-4 lg:px-8 flex flex-wrap lg:flex-nowrap gap-6 items-center border-b-4 border-yellow-500">
            <div className="flex-1 min-w-[150px]">
              <p className="text-yellow-500 text-xs font-bold uppercase">Vehicle</p>
              <p className="text-lg font-bold">{vehicleData.make} {vehicleData.model}</p>
            </div>
            <div className="flex-1 min-w-[200px]">
              <p className="text-yellow-500 text-xs font-bold uppercase">VIN</p>
              <p className="font-mono text-sm">{vehicleData.vin}</p>
            </div>
            <div className="flex-1 min-w-[100px]">
              <p className="text-yellow-500 text-xs font-bold uppercase">Plate</p>
              <p className="font-bold">{vehicleData.plate}</p>
            </div>
            <div className="flex-1 min-w-[150px] hidden md:block">
              <p className="text-yellow-500 text-xs font-bold uppercase">Engine</p>
              <p className="text-sm">{vehicleData.engine}</p>
            </div>
            <button onClick={handleViewCatalog} className="bg-yellow-500 text-black px-6 py-2 rounded-lg font-bold hover:bg-yellow-400 transition-colors ml-auto">
              Open Catalog
            </button>
          </div>

          {/* Interactive Car Diagram */}
          <div className="bg-white rounded-xl shadow-xl p-6 border-2 border-gray-100 relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <Info className="text-yellow-500" /> Interactive Part Selector
              </h3>
              {hoveredPart && (
                <div className="bg-yellow-500 text-black px-4 py-1 rounded-full font-bold animate-pulse">
                  Target: {hoveredPart}
                </div>
              )}
            </div>
            
            <div className="relative flex justify-center bg-gray-50 rounded-lg border border-gray-200 p-4">
              <img 
                ref={imgRef}
                src="66130f2aebaad00fbefd9b62_Captur.png" 
                useMap="#image-map" 
                alt="Vehicle Diagram"
                className="max-w-full h-auto block rounded-lg transition-opacity duration-300"
                style={{ filter: hoveredPart ? 'brightness(0.9)' : 'none' }}
              />
              <map name="image-map">
                {mapParts.map((area, i) => (
                  <area 
                    key={i}
                    target="" 
                    alt={area.name} 
                    title={area.name} 
                    coords={area.coords} 
                    shape={area.shape}
                    onMouseEnter={() => setHoveredPart(area.name)}
                    onMouseLeave={() => setHoveredPart(null)}
                    onClick={() => handleMapClick(area.cat)}
                    className="cursor-pointer"
                  />
                ))}
              </map>
            </div>
            <p className="text-center text-gray-400 text-sm mt-4">Hover over car parts to identify; Click to jump to technical diagrams.</p>
          </div>
        </div>
      ) : (
        /* ... Existing Catalog Render (from previous step) ... */
        <div className="pb-20">
            <div className="bg-white border-b border-gray-200 px-4 lg:px-6 py-3 -mx-4 lg:-mx-8 mb-6 flex gap-2 overflow-x-auto sticky top-[73px] z-20">
                {categories.map(cat => (
                    <button key={cat.id} onClick={() => scrollToCategory(cat.id)} className={`px-4 lg:px-6 py-2 rounded-lg font-medium whitespace-nowrap transition-colors flex items-center gap-2 text-sm ${selectedCategory === cat.id ? 'bg-yellow-500 text-black' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                        {cat.icon && <cat.icon size={18} />} {cat.name}
                    </button>
                ))}
            </div>
            {Object.keys(partsData).map(catKey => (
                <div key={catKey} ref={el => categoryRefs.current[catKey] = el} className="scroll-mt-32 mb-10">
                    <h2 className="text-2xl font-bold mb-4 capitalize flex items-center gap-2 border-l-4 border-yellow-500 pl-3">{catKey}</h2>
                    {partsData[catKey].map(diagram => (
                        <div key={diagram.id} className="bg-white rounded-xl shadow-lg border-2 border-yellow-500 overflow-hidden mb-6">
                            <div className="bg-gray-900 text-yellow-500 p-4 font-bold">{diagram.title}</div>
                            <div className="grid grid-cols-1 lg:grid-cols-3 p-4 gap-6">
                                <div className="lg:col-span-2 bg-gray-100 rounded flex items-center justify-center min-h-[300px] border-2 border-dashed border-gray-300 font-bold text-gray-400 italic">Technical Drawing: {diagram.title}</div>
                                <div className="space-y-2">
                                    {diagram.parts.map((p, idx) => (
                                        <div key={idx} onClick={() => handlePartClick(p, diagram.title)} className="p-3 bg-gray-50 border hover:border-yellow-500 cursor-pointer rounded transition-all">
                                            <p className="font-bold text-gray-900">{p.num}</p>
                                            <p className="text-sm text-gray-600">{p.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {renderSidebar()}
      <div className="lg:ml-64">
        {/* Navbar */}
        <div className="bg-white border-b px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-2"><Menu /></button>
          <h1 className="text-xl font-bold">DemoParts Catalog</h1>
          <div className="flex items-center gap-3 bg-gray-100 px-4 py-2 rounded-lg">
            <User size={18} /> <span className="text-sm font-bold">{userData.userId}</span>
          </div>
        </div>

        {activeView === 'home' && renderHome()}
        {/* Other views (profile, history, etc.) stay as in your original file */}
      </div>

      {/* Part Details Sidebar (Right) */}
      <div className={`fixed right-0 top-0 h-screen w-full sm:w-96 bg-white shadow-2xl border-l-4 border-yellow-500 z-[60] transition-transform duration-300 transform ${selectedPart ? 'translate-x-0' : 'translate-x-full'}`}>
        {selectedPart && (
          <>
            <div className="bg-gray-900 p-6 flex justify-between items-center text-yellow-500">
              <h3 className="text-xl font-bold">Part Details</h3>
              <X className="cursor-pointer" onClick={() => setSelectedPart(null)} />
            </div>
            <div className="p-6 space-y-4">
              <div className="bg-yellow-50 p-4 border-2 border-yellow-500 rounded">
                <p className="text-xs font-bold text-gray-500 uppercase">Part Number</p>
                <p className="text-2xl font-bold">{selectedPart.num}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded">
                <p className="text-xs font-bold text-gray-500 uppercase">Description</p>
                <p className="text-lg">{selectedPart.desc}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded">
                <p className="text-xs font-bold text-gray-500 uppercase">System</p>
                <p>{selectedPart.diagram}</p>
              </div>
              <button className="w-full bg-yellow-500 text-black py-4 rounded font-bold shadow-lg mt-10">Check Availability</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Demo;