import React, { useState, useEffect } from "react";
import axios from "axios";
import { RotateCw, Wifi, Calendar, CreditCard, AlertCircle } from 'lucide-react';

const DataPackages = () => {
  const [purchasedPackages, setPurchasedPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_URL = import.meta.env.VITE_SERVER_URL;

  useEffect(() => {
    const fetchPurchasedPackages = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("Fetching packages with token:", token);
        
        const response = await axios.get(`${API_URL}/user/purchased-packages`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        console.log("Received packages:", response.data);
        setPurchasedPackages(response.data);
        
        if (response.data.length === 0) {
          console.log("No packages found");
        }
      } catch (err) {
        console.error("Error details:", err.response?.data);
        setError("Failed to load your packages");
      } finally {
        setLoading(false);
      }
    };

    fetchPurchasedPackages();
  }, []);

  const handleRefresh = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/user/purchased-packages`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPurchasedPackages(response.data);
    } catch (err) {
      console.error("Error refreshing packages:", err.response?.data);
      setError("Failed to refresh packages");
    } finally {
      setLoading(false);
    }
  };

  // Premium gradients for a lavish look
  const getLuxuryGradient = (index) => {
    const gradients = [
      { from: "#8A2387", to: "#F27121", via: "#E94057" }, // Royal Sunset
      { from: "#000046", to: "#1CB5E0", via: "#000C66" }, // Midnight Ocean
      { from: "#360033", to: "#0b8793", via: "#2E294E" }, // Amethyst
      { from: "#434343", to: "#c2b7a1", via: "#928f8a" }, // Silver Elite
      { from: "#603813", to: "#b29f94", via: "#8b6b4d" }  // Gold Luxury
    ];
    return gradients[index % gradients.length];
  };

  const getStatusBadge = (status) => {
    const statusColors = {
      success: "bg-emerald-500 border border-emerald-600",
      pending: "bg-amber-500 border border-amber-600 animate-pulse",
      failed: "bg-rose-500 border border-rose-600",
      default: "bg-gray-500 border border-gray-600"
    };

    return (
      <div className={`${statusColors[status] || statusColors.default} text-white text-xs px-3 py-1 rounded-full ml-2 shadow-md`}>
        {status === 'pending' ? 'Active...' : status}
      </div>
    );
  };

  const formatTimeLeft = (pkg) => {
    if (pkg.remaining_days > 0) {
      return `${pkg.remaining_days}d ${pkg.remaining_hours}h left`;
    }
    if (pkg.remaining_hours > 0) {
      return pkg.remaining_minutes > 0 
        ? `${pkg.remaining_hours}h ${pkg.remaining_minutes}m left`
        : `${pkg.remaining_hours}h left`;
    }
    if (pkg.remaining_minutes > 0) {
      return `${pkg.remaining_minutes}m left`;
    }
    return null;
  };

  const getExpiryColor = (pkg) => {
    const percentageRemaining = (pkg.remaining_seconds / pkg.total_duration_seconds) * 100;

    if (percentageRemaining <= 10) {
      return "text-rose-400";
    }
    if (percentageRemaining <= 25) {
      return "text-amber-400";
    }
    return "text-emerald-400";
  };

  const formatDuration = (pkg) => {
    const time = pkg.time.toLowerCase();
    if (time.includes('min')) {
      return `${time.replace('min', ' minutes')}`;
    }
    if (time.includes('hour')) {
      return `${time.replace('hour', ' hours')}`;
    }
    if (time.includes('day')) {
      return `${time.replace('day', ' days')}`;
    }
    if (time.includes('week')) {
      return `${time.replace('week', ' weeks')}`;
    }
    if (time.includes('month')) {
      return `${time.replace('month', ' months')}`;
    }
    return time;
  };

  return (
    <div className="w-full p-6 bg-gradient-to-br from-slate-900 to-gray-950 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8 border-b border-gray-800 pb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl shadow-lg">
              <Wifi className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white">Premium Data</h2>
              <p className="text-sm text-gray-400">
                {loading ? "Loading your premium packages..." : `${purchasedPackages.length} Active subscriptions`}
              </p>
            </div>
          </div>
          <button 
            onClick={handleRefresh}
            disabled={loading}
            className={`p-3 rounded-full bg-gray-800 hover:bg-gray-700 transition-all shadow-lg ${loading ? 'opacity-50' : ''}`}
            title="Refresh packages"
          >
            <RotateCw 
              className={`h-5 w-5 text-gray-300 ${loading ? 'animate-spin' : ''}`}
            />
          </button>
        </div>

        {error && (
          <div className="bg-rose-900 border border-rose-800 text-rose-200 px-6 py-4 rounded-xl shadow-lg mb-6 flex items-center">
            <AlertCircle className="h-5 w-5 mr-2" />
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <div>
          {loading ? (
            <div className="text-center py-8">
              <div className="inline-block p-4 bg-gray-800 rounded-xl shadow-lg mb-3">
                <RotateCw className="h-8 w-8 text-purple-400 animate-spin" />
              </div>
              <p className="text-gray-400">Loading your premium packages...</p>
            </div>
          ) : purchasedPackages.length === 0 ? (
            <div className="text-center py-12 bg-gray-800 rounded-xl shadow-lg border border-gray-700">
              <div className="inline-block p-4 bg-gray-700 rounded-full mb-4">
                <Wifi className="h-10 w-10 text-gray-500" />
              </div>
              <p className="text-xl text-gray-400 mb-2">No active packages found</p>
              <p className="text-gray-500">Purchase a premium package to get started!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1  gap-8">
              {purchasedPackages
                .filter(pkg => formatTimeLeft(pkg) !== null)
                .map((pkg, index) => {
                  const gradient = getLuxuryGradient(index);
                  return (
                    <div key={pkg.id} className="rounded-2xl overflow-hidden shadow-2xl bg-gray-800 border border-gray-700 backdrop-blur-md transform transition-all hover:scale-[1.02] hover:shadow-purple-900/20">
                      <div className="p-6 text-center relative overflow-hidden rounded-lg shadow-lg transform transition-transform hover:scale-105" style={{
                        background: `linear-gradient(135deg, ${gradient.from}, ${gradient.via || gradient.from}, ${gradient.to})`
                      }}>
                        <div className="absolute inset-0 opacity-20">
                          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full">
                            <path d="M0,0 L100,0 L100,100 L0,100 Z" fill="url(#grid)" />
                          </svg>
                          <defs>
                            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
                            </pattern>
                          </defs>
                        </div>
                        
                        <div className="relative z-10 py-2">
                          {/* <div className="text-xs uppercase tracking-wider text-white/80 font-medium mb-1">{pkg.time}</div> */}
                          {/* <h3 className="font-bold text-white text-2xl mb-2">{pkg.description}</h3> */}
                          {/* <div className="absolute right-4 top-4">
                            <div className="text-white text-3xl font-bold">
                              <span className="text-sm opacity-70">KES</span> {pkg.price}
                            </div>
                          </div> */}
                        </div>
                        
                        <div className="absolute right-6 bottom-6 opacity-20 hover:opacity-40 transition-opacity">
                          <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                            <path d="M5 12.55a11 11 0 0 1 14.08 0"></path>
                          </svg>
                        </div>
                      </div>

                      <div className="p-6 border-b border-gray-700 bg-gray-800/90">
                        <div className="flex items-center mb-4">
                          <Calendar className="h-5 w-5 text-gray-500 mr-2" />
                          <div className="flex-1">
                            <div className="text-sm text-gray-400 mb-1">Package Duration</div>
                            <div className="text-white font-medium">
                              {formatDuration(pkg)}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="text-sm text-gray-400 mb-1">Expires</div>
                            {/* <div className="text-white font-medium">
                              {new Date(pkg.expiry_date).toLocaleString()}
                            </div> */}
                          </div>
                          <div className={`text-lg font-bold ${getExpiryColor(pkg)}`}>
                            {formatTimeLeft(pkg)}
                          </div>
                        </div>
                      </div>

                      <div className="p-6 bg-gray-900/50">
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-sm text-gray-400 flex items-center">
                            <CreditCard className="h-4 w-4 mr-2" />
                            Amount Paid
                          </span>
                          <span className="text-lg font-bold text-white">
                            KES {pkg.amount_paid}
                          </span>
                        </div>
                        
                        <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden mb-4 shadow-inner">
                          <div 
                            className="h-full rounded-full shadow-lg"
                            style={{
                              width: '100%',
                              background: `linear-gradient(to right, ${gradient.from}, ${gradient.to})`
                            }}
                          />
                        </div>

                        <div className="mt-4 text-xs text-gray-500 font-mono bg-gray-800 px-4 py-2 rounded-lg border border-gray-700">
                          Transaction ID: <span className="text-gray-300">{pkg.transaction_id}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DataPackages;