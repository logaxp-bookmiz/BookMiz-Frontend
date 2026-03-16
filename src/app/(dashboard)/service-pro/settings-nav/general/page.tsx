"use client"

import React, { useState } from 'react';
import { ChevronDown, Info } from 'lucide-react';

interface Language {
  code: string;
  name: string;
}

const languages: Language[] = [
  { code: 'en-US', name: 'English (US)' },
  { code: 'en-GB', name: 'English (UK)' },
  { code: 'es-ES', name: 'Español (España)' },
  { code: 'es-MX', name: 'Español (México)' },
  { code: 'fr-FR', name: 'Français (France)' },
  { code: 'de-DE', name: 'Deutsch (Deutschland)' },
  { code: 'it-IT', name: 'Italiano (Italia)' },
  { code: 'pt-BR', name: 'Português (Brasil)' },
  { code: 'ja-JP', name: '日本語 (日本)' },
  { code: 'ko-KR', name: '한국어 (대한민국)' },
  { code: 'zh-CN', name: '中文 (简体)' },
  { code: 'zh-TW', name: '中文 (繁體)' },
];

export default function GeneralSettings() {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en-US');
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const handleLanguageSelect = (languageCode: string) => {
    setSelectedLanguage(languageCode);
    setIsDropdownOpen(false);
  };

  const selectedLanguageName = languages.find(lang => lang.code === selectedLanguage)?.name || 'English (US)';

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-8 mt-24">
        

        {/* Settings Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6">
            {/* Language Preference Section */}
            <div className="space-y-4">
              <div>
                <label htmlFor="language-select" className="block text-sm font-medium text-gray-700 mb-3">
                  Preferred language
                </label>
                
                {/* Custom Dropdown */}
                <div className="relative">
                  <button
                    type="button"
                    className="w-full max-w-sm bg-white border border-gray-300 rounded-md px-4 py-2.5 text-left text-sm text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    <span className="block truncate">{selectedLanguageName}</span>
                    <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </span>
                  </button>

                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <div className="absolute z-10 mt-1 w-full max-w-sm bg-white shadow-lg max-h-60 rounded-md py-1 text-sm ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none">
                      {languages.map((language) => (
                        <button
                          key={language.code}
                          type="button"
                          className={`w-full text-left px-4 py-2 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none ${
                            selectedLanguage === language.code 
                              ? 'bg-blue-50 text-blue-700' 
                              : 'text-gray-900'
                          }`}
                          onClick={() => handleLanguageSelect(language.code)}
                        >
                          {language.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Info Text */}
                <div className="flex items-start mt-3 text-sm text-gray-500">
                  <Info className="h-4 w-4 mt-0.5 mr-2 flex-shrink-0" />
                  <span>This will be your default language</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      
      </div>

      {/* Click outside to close dropdown */}
      {isDropdownOpen && (
        <div 
          className="fixed inset-0 z-0" 
          onClick={() => setIsDropdownOpen(false)}
        />
      )}
    </div>
  );
}