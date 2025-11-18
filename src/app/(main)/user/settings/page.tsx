"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Bell,
  Lock,
  Eye,
  Trash2,
  LogOut,
  Settings,
  Loader2,
  Download,
} from "lucide-react";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import NavbarClient from "@/components/navbar-client";
import { stackClientApp } from "@/stack/client";
import { getUserProfile } from "@/actions/user/get-user-profile";
import { updateUserProfile } from "@/actions/user/update-profile";
import { deleteUser } from "@/actions/user/delete-user";
import { useUser } from "@stackframe/stack";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";

const settingsTabs = [
  { id: "profile", label: "Profile", icon: Settings },
  { id: "privacy", label: "Privacy & Security", icon: Lock },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "account", label: "Account", icon: Eye },
];

export default function SettingsPage() {
  const user = useUser();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("profile");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [originalFormData, setOriginalFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    institution: "",
    title: "",
    website: "",
    bio: "",
    location: "",
    designation: "",
  });
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    institution: "",
    title: "",
    website: "",
    bio: "",
    location: "",
    designation: "",
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

  useEffect(() => {
    async function loadUserProfile() {
      if (!user?.id) return;

      setIsLoading(true);
      try {
        const response = await getUserProfile(user.id);
        if (response.success && response.data) {
          const profileData = {
            firstName: response.data.firstName || "",
            lastName: response.data.lastName || "",
            email: user.primaryEmail || "",
            institution: response.data.institution || "",
            title: response.data.title || "",
            website: response.data.website || "",
            bio: response.data.bio || "",
            location: response.data.location || "",
            designation: response.data.designation || "",
          };
          setFormData(profileData);
          setOriginalFormData(profileData);
        }
      } catch (error) {
        console.error("Failed to load user profile:", error);
        toast.error("Failed to load profile");
      } finally {
        setIsLoading(false);
      }
    }

    loadUserProfile();
  }, [user?.id, user?.primaryEmail]);

  const hasChanges = () => {
    return Object.keys(formData).some(
      (key) =>
        formData[key as keyof typeof formData] !==
        originalFormData[key as keyof typeof originalFormData],
    );
  };

  const handleSave = async () => {
    if (!hasChanges()) {
      toast.info("No changes to save");
      return;
    }

    setIsSaving(true);
    try {
      // only send changed fields
      const changedFields: Record<string, string> = {};
      Object.keys(formData).forEach((key) => {
        if (
          key !== "email" &&
          formData[key as keyof typeof formData] !==
            originalFormData[key as keyof typeof originalFormData]
        ) {
          changedFields[key] = formData[key as keyof typeof formData];
        }
      });

      const response = await updateUserProfile(changedFields);

      if (response.success) {
        toast.success("Profile updated successfully");
        setOriginalFormData(formData);
      } else {
        toast.error(response.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      toast.error("An error occurred while saving");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData(originalFormData);
    toast.info("Changes discarded");
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await deleteUser();

      if (response.success) {
        toast.success("Account deleted successfully");
        router.push("/");
      } else {
        toast.error(response.message || "Failed to delete account");
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      toast.error("An error occurred while deleting account");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDownloadData = async () => {
    setIsDownloading(true);
    try {
      const response = await getUserProfile(user?.id || "");

      if (response.success && response.data) {
        // create a blob and download it
        const dataStr = JSON.stringify(response.data, null, 2);
        const dataBlob = new Blob([dataStr], { type: "application/json" });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `user-data-${new Date().toISOString()}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        toast.success("Data downloaded successfully");
      } else {
        toast.error("Failed to download data");
      }
    } catch (error) {
      console.error("Error downloading data:", error);
      toast.error("An error occurred while downloading data");
    } finally {
      setIsDownloading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications((prev) => {
      const newValue = !prev[key];
      // todo: save this to db
      toast.success(`Notification preference updated`);
      return { ...prev, [key]: newValue };
    });
  };

  const handlePrivacyChange = (key: keyof typeof privacy) => {
    setPrivacy((prev) => {
      const newValue = !prev[key];
      // todo: save this to db
      toast.success(`Privacy setting updated`);
      return { ...prev, [key]: newValue };
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <NavbarClient page="userSettings" />

      {/* Settings Layout */}
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold mb-2">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account and preferences
          </p>
        </div>

        <div className="flex gap-8 max-w-6xl mx-auto">
          {/* Sidebar Navigation */}
          <aside className="w-48 shrink-0">
            <nav className="space-y-2 sticky top-24">
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
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Content Area */}
          <main className="flex-1 min-w-0">
            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div className="space-y-6">
                <div className="bg-card border border-border rounded-lg p-8">
                  <h2 className="text-xl font-semibold mb-6">
                    Profile Information
                  </h2>
                  {isLoading ? (
                    <div className="flex items-center justify-center py-12">
                      <Loader2 className="w-6 h-6 animate-spin text-primary" />
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className="text-sm font-medium text-foreground mb-2 block">
                            First Name
                          </label>
                          <Input
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className="border-border"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-foreground mb-2 block">
                            Last Name
                          </label>
                          <Input
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            className="border-border"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">
                          Email
                        </label>
                        <Input
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="border-border"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className="text-sm font-medium text-foreground mb-2 block">
                            Institution
                          </label>
                          <Input
                            name="institution"
                            value={formData.institution}
                            onChange={handleInputChange}
                            className="border-border"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-foreground mb-2 block">
                            Title
                          </label>
                          <Input
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            className="border-border"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className="text-sm font-medium text-foreground mb-2 block">
                            Location
                          </label>
                          <Input
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            placeholder="e.g., Boston, MA"
                            className="border-border"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-foreground mb-2 block">
                            Designation
                          </label>
                          <Input
                            name="designation"
                            value={formData.designation}
                            onChange={handleInputChange}
                            placeholder="e.g., PhD Candidate"
                            className="border-border"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">
                          Website
                        </label>
                        <Input
                          name="website"
                          value={formData.website}
                          onChange={handleInputChange}
                          className="border-border"
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">
                          Bio
                        </label>
                        <textarea
                          name="bio"
                          value={formData.bio}
                          onChange={handleInputChange}
                          rows={4}
                          className="w-full px-3 py-2 border border-border rounded-md text-sm bg-background text-foreground"
                        />
                      </div>

                      <div className="flex gap-3 pt-4">
                        <Button
                          onClick={handleSave}
                          disabled={!hasChanges() || isSaving}
                        >
                          {isSaving ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Saving...
                            </>
                          ) : (
                            "Save Changes"
                          )}
                        </Button>
                        <Button
                          variant="outline"
                          onClick={handleCancel}
                          disabled={!hasChanges() || isSaving}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Privacy & Security Tab */}
            {activeTab === "privacy" && (
              <div className="space-y-6">
                <div className="bg-card border border-border rounded-lg p-8">
                  <h2 className="text-xl font-semibold mb-6">
                    Privacy Settings
                  </h2>
                  <div className="space-y-4">
                    {[
                      {
                        key: "profileVisible",
                        label: "Make profile public",
                        description: "Allow others to view your profile",
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
                        description: "Let others see when you're active",
                      },
                    ].map((setting) => (
                      <div
                        key={setting.key}
                        className="flex items-center justify-between pb-4 border-b border-border last:pb-0 last:border-0"
                      >
                        <div>
                          <p className="font-medium text-foreground text-sm">
                            {setting.label}
                          </p>
                          <p className="text-xs text-muted-foreground">
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
                          checked={privacy[setting.key as keyof typeof privacy]}
                          id={setting.key}
                          className="w-5 h-5 rounded border-border cursor-pointer"
                          onCheckedChange={() =>
                            handlePrivacyChange(
                              setting.key as keyof typeof privacy,
                            )
                          }
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-card border border-border rounded-lg p-8">
                  <h2 className="text-xl font-semibold mb-6">
                    Change Password
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Current Password
                      </label>
                      <Input type="password" className="border-border" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        New Password
                      </label>
                      <Input type="password" className="border-border" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Confirm Password
                      </label>
                      <Input type="password" className="border-border" />
                    </div>
                    <Button>Update Password</Button>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === "notifications" && (
              <div className="space-y-6">
                <div className="bg-card border border-border rounded-lg p-8">
                  <h2 className="text-xl font-semibold mb-6">
                    Notification Preferences
                  </h2>
                  <div className="space-y-6">
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
                        className="flex items-center justify-between"
                      >
                        <div>
                          <p className="font-medium text-foreground text-sm">
                            {setting.label}
                          </p>
                          <p className="text-xs text-muted-foreground">
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
                          className="w-5 h-5 rounded border-border cursor-pointer"
                          onCheckedChange={() =>
                            handleNotificationChange(
                              setting.key as keyof typeof notifications,
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
              <div className="space-y-6">
                <div className="bg-card border border-border rounded-lg p-8">
                  <h2 className="text-xl font-semibold mb-6">
                    Data Management
                  </h2>
                  <div className="space-y-3">
                    <Button
                      variant="outline"
                      className="w-full justify-start bg-transparent"
                      onClick={handleDownloadData}
                      disabled={isDownloading}
                    >
                      {isDownloading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Downloading...
                        </>
                      ) : (
                        <>
                          <Download className="w-4 h-4 mr-2" />
                          Download Your Data
                        </>
                      )}
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-destructive hover:bg-destructive/10 bg-transparent"
                          disabled={isDeleting}
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete Account
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete your account and remove your data from our
                            servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={handleDelete}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            {isDeleting ? (
                              <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Deleting...
                              </>
                            ) : (
                              "Delete Account"
                            )}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-lg p-8">
                  <h2 className="text-xl font-semibold mb-6">Session</h2>
                  <Button variant="destructive" className="w-full" asChild>
                    <Link href="/handler/sign-out">
                      <LogOut className="w-4 h-4 mr-2" />
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
