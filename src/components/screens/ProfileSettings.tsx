import { User, Globe, Bell, Volume2, Moon, HelpCircle, LogOut, ChevronRight, Shield, Info } from 'lucide-react';
import { useState } from 'react';
import { Switch } from '../ui/switch';

interface ProfileSettingsProps {
  onBack?: () => void;
}

const avatars = ['👤', '👨', '👩', '👦', '👧', '👴', '👵', '🧑', '👨‍💼', '👩‍💼', '👨‍🎓', '👩‍🎓'];

export function ProfileSettings({ onBack }: ProfileSettingsProps) {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [audioInstructions, setAudioInstructions] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState('👤');
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);

  return (
    <div className="min-h-screen bg-[#F5F7FA] pb-24">
      {/* Header */}
      <div className="gradient-green-teal px-6 pt-12 pb-16 rounded-b-3xl">
        <h2 className="text-white text-3xl mb-2">Profile</h2>
        <p className="text-white/90">Manage your account and preferences</p>
      </div>

      <div className="px-6 -mt-10">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
          <div className="flex items-center gap-4 mb-4">
            <button 
              onClick={() => setShowAvatarPicker(!showAvatarPicker)}
              className="w-20 h-20 bg-gradient-to-br from-[#00A86B] to-[#006B5E] rounded-2xl flex items-center justify-center text-4xl shadow-lg hover:scale-105 transition-all"
            >
              {selectedAvatar}
            </button>
            <div className="flex-1">
              <h3 className="text-xl text-gray-900 mb-1">Rahul Kumar</h3>
              <p className="text-gray-600 text-sm">+91 98765 43210</p>
            </div>
          </div>

          {showAvatarPicker && (
            <div className="grid grid-cols-6 gap-3 pt-4 border-t border-gray-200">
              {avatars.map((avatar) => (
                <button
                  key={avatar}
                  onClick={() => {
                    setSelectedAvatar(avatar);
                    setShowAvatarPicker(false);
                  }}
                  className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-all ${
                    selectedAvatar === avatar
                      ? 'bg-[#00A86B] scale-110'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {avatar}
                </button>
              ))}
            </div>
          )}

          <div className="grid grid-cols-4 gap-3 pt-4 border-t border-gray-200">
            <div className="text-center">
              <div className="text-2xl text-[#00A86B] mb-1">2,450</div>
              <div className="text-xs text-gray-600">Coins</div>
            </div>
            <div className="text-center">
              <div className="text-2xl text-[#F4B942] mb-1">7</div>
              <div className="text-xs text-gray-600">Badges</div>
            </div>
            <div className="text-center">
              <div className="text-2xl text-[#0D47A1] mb-1">23</div>
              <div className="text-xs text-gray-600">Games</div>
            </div>
            <div className="text-center">
              <div className="text-2xl text-[#9C27B0] mb-1">45h</div>
              <div className="text-xs text-gray-600">Learned</div>
            </div>
          </div>
        </div>

        {/* Account Settings */}
        <div className="bg-white rounded-2xl p-4 shadow-card mb-6">
          <h4 className="text-gray-900 px-2 mb-3">Account Settings</h4>
          <div className="space-y-1">
            <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-all">
              <User className="w-5 h-5 text-gray-600" />
              <span className="flex-1 text-left text-gray-700">Edit Profile</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
            <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-all">
              <Globe className="w-5 h-5 text-gray-600" />
              <span className="flex-1 text-left text-gray-700">Language</span>
              <span className="text-sm text-gray-500">English</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-white rounded-2xl p-4 shadow-card mb-6">
          <h4 className="text-gray-900 px-2 mb-3">Preferences</h4>
          <div className="space-y-1">
            <div className="flex items-center justify-between p-3 rounded-xl">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="text-gray-700">Notifications</span>
              </div>
              <Switch checked={notifications} onCheckedChange={setNotifications} />
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl">
              <div className="flex items-center gap-3">
                <Volume2 className="w-5 h-5 text-gray-600" />
                <span className="text-gray-700">Audio Instructions</span>
              </div>
              <Switch checked={audioInstructions} onCheckedChange={setAudioInstructions} />
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl">
              <div className="flex items-center gap-3">
                <Moon className="w-5 h-5 text-gray-600" />
                <span className="text-gray-700">Dark Mode</span>
              </div>
              <Switch checked={darkMode} onCheckedChange={setDarkMode} />
            </div>
          </div>
        </div>

        {/* CA Syllabus */}
        <div className="bg-gradient-to-r from-[#0D47A1] to-[#1976D2] rounded-2xl p-6 shadow-card mb-6">
          <h4 className="text-white mb-2">About CA Syllabus Integration</h4>
          <p className="text-white/90 text-sm mb-4">
            Learn CA Foundation syllabus through gamified lessons and interactive quizzes. Track your progress and earn certificates!
          </p>
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white text-xs">13</div>
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white text-xs">38</div>
            </div>
            <span className="text-white/80 text-sm">Lessons completed</span>
          </div>
        </div>

        {/* Help & Support */}
        <div className="bg-white rounded-2xl p-4 shadow-card mb-6">
          <h4 className="text-gray-900 px-2 mb-3">Help & Support</h4>
          <div className="space-y-1">
            <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-all">
              <HelpCircle className="w-5 h-5 text-gray-600" />
              <span className="flex-1 text-left text-gray-700">Help Center</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
            <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-all">
              <Shield className="w-5 h-5 text-gray-600" />
              <span className="flex-1 text-left text-gray-700">Privacy Policy</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
            <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-all">
              <Info className="w-5 h-5 text-gray-600" />
              <span className="flex-1 text-left text-gray-700">About ProspEra</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* App Info */}
        <div className="bg-gray-100 rounded-2xl p-4 mb-6 text-center">
          <p className="text-gray-600 text-sm mb-1">ProspEra v1.0.0</p>
          <p className="text-gray-500 text-xs">Empowering India's Financial Future</p>
        </div>

        {/* Logout */}
        <button className="w-full bg-white border-2 border-red-200 text-red-600 py-4 rounded-2xl shadow-card hover:shadow-card-hover transition-all active:scale-98 flex items-center justify-center gap-2">
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
