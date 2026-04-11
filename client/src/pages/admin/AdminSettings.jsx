import React, { useState, useEffect } from "react";
import axios from "axios";
import { AlertCircle, Save, RefreshCw } from "lucide-react";

export default function AdminSettings() {
    const [settings, setSettings] = useState({
        siteName: "B-Hanz Ecommerce",
        siteEmail: "admin@bhanz.com",
        maintenanceMode: false,
        enableNotifications: true,
        maxUploadSize: 5,
        currency: "USD",
        taxRate: 5,
        shippingCost: 10
    });
    const [loading, setLoading] = useState(false);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        // Load settings from localStorage or API
        const savedSettings = localStorage.getItem("adminSettings");
        if (savedSettings) {
            setSettings(JSON.parse(savedSettings));
        }
    }, []);

    const handleSave = async () => {
        try {
            setLoading(true);
            localStorage.setItem("adminSettings", JSON.stringify(settings));
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        } catch (err) {
            console.error("Error saving settings:", err);
            alert("Failed to save settings");
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        if (window.confirm("Are you sure you want to reset all settings to defaults?")) {
            setSettings({
                siteName: "B-Hanz Ecommerce",
                siteEmail: "admin@bhanz.com",
                maintenanceMode: false,
                enableNotifications: true,
                maxUploadSize: 5,
                currency: "USD",
                taxRate: 5,
                shippingCost: 10
            });
        }
    };

    const SettingGroup = ({ title, children }) => (
        <div className="bg-white p-6 rounded-lg shadow mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">{title}</h3>
            <div className="space-y-4">{children}</div>
        </div>
    );

    const SettingField = ({ label, name, type = "text", value, onChange }) => (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
            {type === "checkbox" ? (
                <input
                    type="checkbox"
                    name={name}
                    checked={value}
                    onChange={(e) => onChange(name, e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
            ) : type === "textarea" ? (
                <textarea
                    name={name}
                    value={value}
                    onChange={(e) => onChange(name, e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    rows="4"
                />
            ) : type === "select" ? (
                <select
                    name={name}
                    value={value}
                    onChange={(e) => onChange(name, e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    {type === "select" && name === "currency" && (
                        <>
                            <option value="USD">USD ($)</option>
                            <option value="EUR">EUR (€)</option>
                            <option value="GBP">GBP (£)</option>
                        </>
                    )}
                </select>
            ) : (
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={(e) => onChange(name, e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            )}
        </div>
    );

    const handleChange = (field, value) => {
        setSettings({ ...settings, [field]: value });
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
                <p className="text-gray-600 mt-2">Manage system configuration and preferences</p>
            </div>

            {/* Success Message */}
            {saved && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center gap-2">
                    <AlertCircle size={20} />
                    Settings saved successfully!
                </div>
            )}

            {/* General Settings */}
            <SettingGroup title="General Settings">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <SettingField
                        label="Site Name"
                        name="siteName"
                        value={settings.siteName}
                        onChange={handleChange}
                    />
                    <SettingField
                        label="Admin Email"
                        name="siteEmail"
                        type="email"
                        value={settings.siteEmail}
                        onChange={handleChange}
                    />
                </div>
            </SettingGroup>

            {/* Business Settings */}
            <SettingGroup title="Business Settings">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <SettingField
                        label="Currency"
                        name="currency"
                        type="select"
                        value={settings.currency}
                        onChange={handleChange}
                    />
                    <SettingField
                        label="Tax Rate (%)"
                        name="taxRate"
                        type="number"
                        value={settings.taxRate}
                        onChange={handleChange}
                    />
                    <SettingField
                        label="Default Shipping Cost ($)"
                        name="shippingCost"
                        type="number"
                        value={settings.shippingCost}
                        onChange={handleChange}
                    />
                </div>
            </SettingGroup>

            {/* System Settings */}
            <SettingGroup title="System Settings">
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                            <p className="font-medium text-gray-900">Maintenance Mode</p>
                            <p className="text-sm text-gray-600">
                                Disable site access for maintenance
                            </p>
                        </div>
                        <input
                            type="checkbox"
                            checked={settings.maintenanceMode}
                            onChange={(e) => handleChange("maintenanceMode", e.target.checked)}
                            className="w-6 h-6 text-blue-600 rounded"
                        />
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                            <p className="font-medium text-gray-900">Enable Notifications</p>
                            <p className="text-sm text-gray-600">
                                Send notifications for orders and events
                            </p>
                        </div>
                        <input
                            type="checkbox"
                            checked={settings.enableNotifications}
                            onChange={(e) => handleChange("enableNotifications", e.target.checked)}
                            className="w-6 h-6 text-blue-600 rounded"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <SettingField
                            label="Max Upload Size (MB)"
                            name="maxUploadSize"
                            type="number"
                            value={settings.maxUploadSize}
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </SettingGroup>

            {/* Security Settings */}
            <SettingGroup title="Security Settings">
                <div className="space-y-4">
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <h4 className="font-medium text-blue-900 mb-2">JWT Token Security</h4>
                        <p className="text-sm text-blue-800 mb-3">
                            Admin endpoints require valid JWT token with admin role (role=1). All sensitive operations are protected.
                        </p>
                        <div className="space-y-2 text-sm">
                            <p>✓ Token-based authentication enabled</p>
                            <p>✓ Role-based access control active</p>
                            <p>✓ Password hashing with bcrypt</p>
                            <p>✓ Rate limiting on auth endpoints</p>
                        </div>
                    </div>
                </div>
            </SettingGroup>

            {/* Backup & Maintenance */}
            <SettingGroup title="Backup & Maintenance">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium">
                        Create Database Backup
                    </button>
                    <button className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition font-medium">
                        Clear Cache
                    </button>
                </div>
            </SettingGroup>

            {/* Action Buttons */}
            <div className="flex gap-4">
                <button
                    onClick={handleSave}
                    disabled={loading}
                    className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50"
                >
                    <Save size={20} />
                    {loading ? "Saving..." : "Save Settings"}
                </button>
                <button
                    onClick={handleReset}
                    className="flex items-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
                >
                    <RefreshCw size={20} />
                    Reset to Defaults
                </button>
            </div>
        </div>
    );
}
