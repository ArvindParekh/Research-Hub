"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, Lock, Eye, Trash2, LogOut, Settings } from "lucide-react";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import NavbarClient from "@/components/navbar-client";

const settingsTabs = [
   { id: "profile", label: "Profile", icon: Settings },
   { id: "privacy", label: "Privacy & Security", icon: Lock },
   { id: "notifications", label: "Notifications", icon: Bell },
   { id: "account", label: "Account", icon: Eye },
];

export default function SettingsPage() {
   const [activeTab, setActiveTab] = useState("profile");
   const [formData, setFormData] = useState({
      firstName: "Alex",
      lastName: "Johnson",
      email: "ajohnson@stanford.edu",
      institution: "Stanford University",
      title: "Associate Professor",
      bio: "Associate Professor specializing in quantum computing",
      website: "https://alexjohnson.stanford.edu",
   });

   const [notifications, setNotifications] = useState({
      emailUpdates: true,
      messageAlerts: true,
      researchUpdates: true,
      weeklyDigest: false,
   });

   const [privacy, setPrivacy] = useState({
      profileVisible: true,
      allowMessages: true,
      showOnlineStatus: true,
   });

   const handleInputChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
   ) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
   };

   const handleNotificationChange = (key: keyof typeof notifications) => {
      setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
   };

   const handlePrivacyChange = (key: keyof typeof privacy) => {
      setPrivacy((prev) => ({ ...prev, [key]: !prev[key] }));
   };

   return (
      <div className='min-h-screen bg-background'>
         {/* Header */}
         <NavbarClient page='userSettings' />

         {/* Settings Layout */}
         <div className='container mx-auto px-4 py-12'>
            <div className='mb-8'>
               <h1 className='text-3xl font-semibold mb-2'>Settings</h1>
               <p className='text-muted-foreground'>
                  Manage your account and preferences
               </p>
            </div>

            <div className='flex gap-8 max-w-6xl mx-auto'>
               {/* Sidebar Navigation */}
               <aside className='w-48 shrink-0'>
                  <nav className='space-y-2 sticky top-24'>
                     {settingsTabs.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                           <button
                              key={tab.id}
                              onClick={() => setActiveTab(tab.id)}
                              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all text-left ${
                                 isActive
                                    ? "bg-primary/10 text-primary border border-primary/20"
                                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50 border border-transparent"
                              }`}
                           >
                              <Icon className='w-4 h-4 shrink-0' />
                              <span>{tab.label}</span>
                           </button>
                        );
                     })}
                  </nav>
               </aside>

               {/* Content Area */}
               <main className='flex-1 min-w-0'>
                  {/* Profile Tab */}
                  {activeTab === "profile" && (
                     <div className='space-y-6'>
                        <div className='bg-card border border-border rounded-lg p-8'>
                           <h2 className='text-xl font-semibold mb-6'>
                              Profile Information
                           </h2>
                           <div className='space-y-6'>
                              <div className='grid grid-cols-2 gap-6'>
                                 <div>
                                    <label className='text-sm font-medium text-foreground mb-2 block'>
                                       First Name
                                    </label>
                                    <Input
                                       name='firstName'
                                       value={formData.firstName}
                                       onChange={handleInputChange}
                                       className='border-border'
                                    />
                                 </div>
                                 <div>
                                    <label className='text-sm font-medium text-foreground mb-2 block'>
                                       Last Name
                                    </label>
                                    <Input
                                       name='lastName'
                                       value={formData.lastName}
                                       onChange={handleInputChange}
                                       className='border-border'
                                    />
                                 </div>
                              </div>

                              <div>
                                 <label className='text-sm font-medium text-foreground mb-2 block'>
                                    Email
                                 </label>
                                 <Input
                                    name='email'
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className='border-border'
                                 />
                              </div>

                              <div className='grid grid-cols-2 gap-6'>
                                 <div>
                                    <label className='text-sm font-medium text-foreground mb-2 block'>
                                       Institution
                                    </label>
                                    <Input
                                       name='institution'
                                       value={formData.institution}
                                       onChange={handleInputChange}
                                       className='border-border'
                                    />
                                 </div>
                                 <div>
                                    <label className='text-sm font-medium text-foreground mb-2 block'>
                                       Title
                                    </label>
                                    <Input
                                       name='title'
                                       value={formData.title}
                                       onChange={handleInputChange}
                                       className='border-border'
                                    />
                                 </div>
                              </div>

                              <div>
                                 <label className='text-sm font-medium text-foreground mb-2 block'>
                                    Website
                                 </label>
                                 <Input
                                    name='website'
                                    value={formData.website}
                                    onChange={handleInputChange}
                                    className='border-border'
                                 />
                              </div>

                              <div>
                                 <label className='text-sm font-medium text-foreground mb-2 block'>
                                    Bio
                                 </label>
                                 <textarea
                                    name='bio'
                                    value={formData.bio}
                                    onChange={handleInputChange}
                                    rows={4}
                                    className='w-full px-3 py-2 border border-border rounded-md text-sm bg-background text-foreground'
                                 />
                              </div>

                              <div className='flex gap-3 pt-4'>
                                 <Button>Save Changes</Button>
                                 <Button variant='outline'>Cancel</Button>
                              </div>
                           </div>
                        </div>
                     </div>
                  )}

                  {/* Privacy & Security Tab */}
                  {activeTab === "privacy" && (
                     <div className='space-y-6'>
                        <div className='bg-card border border-border rounded-lg p-8'>
                           <h2 className='text-xl font-semibold mb-6'>
                              Privacy Settings
                           </h2>
                           <div className='space-y-4'>
                              {[
                                 {
                                    key: "profileVisible",
                                    label: "Make profile public",
                                    description:
                                       "Allow others to view your profile",
                                 },
                                 {
                                    key: "allowMessages",
                                    label: "Allow messages from anyone",
                                    description:
                                       "Enable direct messaging from other researchers",
                                 },
                                 {
                                    key: "showOnlineStatus",
                                    label: "Show online status",
                                    description:
                                       "Let others see when you're active",
                                 },
                              ].map((setting) => (
                                 <div
                                    key={setting.key}
                                    className='flex items-center justify-between pb-4 border-b border-border last:pb-0 last:border-0'
                                 >
                                    <div>
                                       <p className='font-medium text-foreground text-sm'>
                                          {setting.label}
                                       </p>
                                       <p className='text-xs text-muted-foreground'>
                                          {setting.description}
                                       </p>
                                    </div>
                                    {/* <input
                                       type='checkbox'
                                       checked={
                                          privacy[
                                             setting.key as keyof typeof privacy
                                          ]
                                       }
                                       onChange={() =>
                                          handlePrivacyChange(setting.key)
                                       }
                                       className='w-5 h-5 rounded border-border cursor-pointer'
                                    /> */}
                                    <Checkbox
                                       checked={
                                          privacy[
                                             setting.key as keyof typeof privacy
                                          ]
                                       }
                                       id={setting.key}
                                       className='w-5 h-5 rounded border-border cursor-pointer'
                                       onCheckedChange={() =>
                                          handlePrivacyChange(
                                             setting.key as keyof typeof privacy
                                          )
                                       }
                                    />
                                 </div>
                              ))}
                           </div>
                        </div>

                        <div className='bg-card border border-border rounded-lg p-8'>
                           <h2 className='text-xl font-semibold mb-6'>
                              Change Password
                           </h2>
                           <div className='space-y-4'>
                              <div>
                                 <label className='text-sm font-medium text-foreground mb-2 block'>
                                    Current Password
                                 </label>
                                 <Input
                                    type='password'
                                    className='border-border'
                                 />
                              </div>
                              <div>
                                 <label className='text-sm font-medium text-foreground mb-2 block'>
                                    New Password
                                 </label>
                                 <Input
                                    type='password'
                                    className='border-border'
                                 />
                              </div>
                              <div>
                                 <label className='text-sm font-medium text-foreground mb-2 block'>
                                    Confirm Password
                                 </label>
                                 <Input
                                    type='password'
                                    className='border-border'
                                 />
                              </div>
                              <Button>Update Password</Button>
                           </div>
                        </div>
                     </div>
                  )}

                  {/* Notifications Tab */}
                  {activeTab === "notifications" && (
                     <div className='space-y-6'>
                        <div className='bg-card border border-border rounded-lg p-8'>
                           <h2 className='text-xl font-semibold mb-6'>
                              Notification Preferences
                           </h2>
                           <div className='space-y-6'>
                              {[
                                 {
                                    key: "emailUpdates",
                                    label: "Email Updates",
                                    description:
                                       "Get notified about new features and updates",
                                 },
                                 {
                                    key: "messageAlerts",
                                    label: "Message Alerts",
                                    description:
                                       "Receive notifications when you get new messages",
                                 },
                                 {
                                    key: "researchUpdates",
                                    label: "Research Updates",
                                    description:
                                       "Get notified about new papers in your field",
                                 },
                                 {
                                    key: "weeklyDigest",
                                    label: "Weekly Digest",
                                    description:
                                       "Receive a weekly summary of relevant content",
                                 },
                              ].map((setting) => (
                                 <div
                                    key={setting.key}
                                    className='flex items-center justify-between'
                                 >
                                    <div>
                                       <p className='font-medium text-foreground text-sm'>
                                          {setting.label}
                                       </p>
                                       <p className='text-xs text-muted-foreground'>
                                          {setting.description}
                                       </p>
                                    </div>
                                    <Checkbox
                                       checked={
                                          notifications[
                                             setting.key as keyof typeof notifications
                                          ]
                                       }
                                       id={setting.key}
                                       className='w-5 h-5 rounded border-border cursor-pointer'
                                       onCheckedChange={() =>
                                          handleNotificationChange(
                                             setting.key as keyof typeof notifications
                                          )
                                       }
                                    />
                                    {/* <input
                                       type='checkbox'
                                       checked={
                                          notifications[
                                             setting.key as keyof typeof notifications
                                          ]
                                       }
                                       onChange={() =>
                                          handleNotificationChange(setting.key)
                                       }
                                       className='w-5 h-5 rounded border-border cursor-pointer shrink-0'
                                    /> */}
                                 </div>
                              ))}
                           </div>
                        </div>
                     </div>
                  )}

                  {/* Account Tab */}
                  {activeTab === "account" && (
                     <div className='space-y-6'>
                        <div className='bg-card border border-border rounded-lg p-8'>
                           <h2 className='text-xl font-semibold mb-6'>
                              Data Management
                           </h2>
                           <div className='space-y-3'>
                              <Button
                                 variant='outline'
                                 className='w-full justify-start bg-transparent'
                              >
                                 <Eye className='w-4 h-4 mr-2' />
                                 Download Your Data
                              </Button>
                              <Button
                                 variant='outline'
                                 className='w-full justify-start text-destructive hover:bg-destructive/10 bg-transparent'
                              >
                                 <Trash2 className='w-4 h-4 mr-2' />
                                 Delete Account
                              </Button>
                           </div>
                        </div>

                        <div className='bg-card border border-border rounded-lg p-8'>
                           <h2 className='text-xl font-semibold mb-6'>
                              Session
                           </h2>
                           <Button
                              variant='destructive'
                              className='w-full'
                              asChild
                           >
                              <Link href='/handler/sign-out'>
                                 <LogOut className='w-4 h-4 mr-2' />
                                 Logout
                              </Link>
                           </Button>
                        </div>
                     </div>
                  )}
               </main>
            </div>
         </div>
      </div>
   );
}
