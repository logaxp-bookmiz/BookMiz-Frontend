'use client';

import { useState } from 'react';
import { 
  FiEdit, 
  FiPhone, 
  FiMail, 
  FiClock, 
  FiGlobe, 
  FiMapPin, 
  FiCheck,
  FiChevronDown 
} from 'react-icons/fi';

type Profile = {
  name: string;
  role: string;
  phone: string;
  email: string;
  status: string;
  website: string;
  country: string;
  address: string;
};

const initialProfile: Profile = {
  name: 'Apex Design Inc',
  role: 'Product designer',
  phone: '08169192646',
  email: 'ujahemmanuel72@gmail.com',
  status: 'Today · closed (WAT)',
  website: 'ujah.emmanuel.logaxp',
  country: 'Nigeria, NGN (₦)',
  address: 'Villa suit, Gyado villa, Makurdi, Benue State - Nigeria'
};

const ProfileCard = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<Profile>(initialProfile);

  const toggleEdit = () => setIsEditing(!isEditing);

  const handleSave = () => {
    setIsEditing(false);
    console.log('Profile updated:', profile);
  };

  const updateProfileField = (field: keyof Profile, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const renderEditableField = (
    field: keyof Profile, 
    icon: JSX.Element, 
    inputType = 'text',
    isTextarea = false
  ) => (
    <div className="flex items-start gap-4 py-3">
      <div className="mt-1 text-gray-500">
        {icon}
      </div>
      {isEditing ? (
        isTextarea ? (
          <textarea
            value={profile[field]}
            onChange={(e) => updateProfileField(field, e.target.value)}
            className="text-gray-700 text-base bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 w-full resize-none"
            rows={3}
          />
        ) : (
          <input
            type={inputType}
            value={profile[field]}
            onChange={(e) => updateProfileField(field, e.target.value)}
            className="text-gray-700 text-base bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 w-full"
          />
        )
      ) : (
        <div className="flex-1">
          <p className="text-gray-700 text-base">{profile[field]}</p>
        </div>
      )}
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md border border-gray-200 p-8 my-8 mt-24">
      {/* Header with Avatar and Edit Button */}
      <div className="flex items-start justify-between mb-8">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center">
            <span className="text-white font-medium text-2xl">AD</span>
          </div>
          <div className="flex-1">
            {isEditing ? (
              <div className="space-y-3">
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => updateProfileField('name', e.target.value)}
                  className="font-semibold text-gray-900 text-2xl bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 w-full"
                />
                <input
                  type="text"
                  value={profile.role}
                  onChange={(e) => updateProfileField('role', e.target.value)}
                  className="text-gray-600 text-lg bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 w-full"
                />
              </div>
            ) : (
              <div>
                <h2 className="font-semibold text-gray-900 text-2xl">{profile.name}</h2>
                <p className="text-gray-600 text-lg mt-1">{profile.role}</p>
              </div>
            )}
          </div>
        </div>
        
        <button
          onClick={isEditing ? handleSave : toggleEdit}
          className="p-3 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
          aria-label={isEditing ? 'Save changes' : 'Edit profile'}
        >
          {isEditing ? (
            <FiCheck size={20} />
          ) : (
            <FiEdit size={20} />
          )}
        </button>
      </div>

      {/* Contact Information */}
      <div className="divide-y divide-gray-200">
        {renderEditableField('phone', <FiPhone size={20} />)}
        {renderEditableField('email', <FiMail size={20} />, 'email')}

        {/* Status with dropdown */}
        <div className="flex items-center gap-4 py-3">
          <div className="text-gray-500">
            <FiClock size={20} />
          </div>
          <div className="flex items-center justify-between flex-1">
            {isEditing ? (
              <input
                type="text"
                value={profile.status}
                onChange={(e) => updateProfileField('status', e.target.value)}
                className="text-gray-700 text-base bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 w-full"
              />
            ) : (
              <>
                <p className="text-gray-700 text-base">{profile.status}</p>
                <button className="p-1 text-gray-400 hover:text-gray-600">
                  <FiChevronDown size={18} />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Website with edit button */}
        <div className="flex items-center gap-4 py-3">
          <div className="text-gray-500">
            <FiGlobe size={20} />
          </div>
          <div className="flex items-center justify-between flex-1">
            {isEditing ? (
              <input
                type="text"
                value={profile.website}
                onChange={(e) => updateProfileField('website', e.target.value)}
                className="text-gray-700 text-base bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 w-full"
              />
            ) : (
              <>
                <p className="text-gray-700 text-base">{profile.website}</p>
                <button 
                  className="p-1 text-gray-400 hover:text-gray-600"
                  onClick={toggleEdit}
                  aria-label="Edit website"
                >
                  <FiEdit size={18} />
                </button>
              </>
            )}
          </div>
        </div>

        {renderEditableField('country', <FiGlobe size={20} />)}
        {renderEditableField('address', <FiMapPin size={20} />, 'text', true)}
      </div>
    </div>
  );
};

export default ProfileCard;