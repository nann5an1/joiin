
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {useRouter} from "next/navigation";
import { 
  User, 
  Settings, 
  Bell, 
  Shield, 
  Camera,
  Edit3,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Trophy,
  Users,
  Eye,
  EyeOff,
  CheckCircle2Icon
} from "lucide-react";
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

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";

export function ProfilePage() {

  const [showPassword, setShowPassword] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: true,
    marketing: false
  });
  
  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    showEmail: false,
    showPhone: false,
    allowMessages: true
  });
  const [dialogueOpen, setDialogueOpen] = useState(false);
  const [createdCount, setCreatedEventCount] = useState(0);
  const [joinedEvents, setJoinedEvents] = useState(0);
  const [userName, setUserName] = useState("");
  const [profileName, setProfileName] = useState("");
  const [email, setEmail] = useState("");
  // const [phone, setPhone] = useState("");
  const [makeChanges, setMakeChanges] = useState(false);

  const router = useRouter();

  useEffect(() => {
    totalEventsCount();
    fetchBriefProfile();
  }, []);

  async function setMFA(){
      try {
        const data = await fetch('http://localhost:3000/api/v0.1/user/setMFA', {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include", // ✅ important: include cookies so will include the user id
        });
      if(data.ok) { //get the url for the qr code
        console.log("data", data);
        const data_json = await data.json();
        // console.log("urlQR: ", urlQR);
        const totp_uri = data_json.totp_uri;
        console.log("totp_uri: ", totp_uri);

        const manualEntryKey = data_json.manualEntryKey;
        console.log("manualEntryKey: ", manualEntryKey);
        //url is only needed for prior setup before the user can use MFA
        router.push(`/showURLimg?totp_uri=${totp_uri}&manual=${manualEntryKey}`); //re-route the user to show the QR code
      }
      else console.log("MFA failed", data);
      } catch (error) {
        console.error("Error authenticating MFA", error);
      }
  }

  async function deleteAccount(){
    try {
      
      const data = await fetch('http://localhost:3000/api/v0.1/user/deleteAccount', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // ✅ important: include cookies so will include the user id
      });
      if(data.ok){
        console.log(await data.json());
        router.push("/logout");
      }
      else console.log("something went wrong in deleting account");
    } catch (error) {
      console.log("failed to delete account", error);
    } 
  }

  async function totalEventsCount(){
    try {
      const data = await fetch('http://localhost:3000/api/v0.1/user/totalEventCount', {
      method: "GET",
      credentials: "include",
      headers: {"Content-Type": "application/json"},
      });
      if(data.ok){
        console.log("retrieving events okay from profile page: ", data);
        const json_data = await data.json();
        const created_count  = json_data.created_count;
        const joined_count = json_data.joined_count;
        setCreatedEventCount(created_count);
        setJoinedEvents(joined_count);
      }
    } catch (error) {
      console.log("failed to retrieve events from profile page", error);
    }
  }

    async function fetchBriefProfile(){
      try {
          const data = await fetch(`http://localhost:3000/api/v0.1/user/briefProfile`, {
            method: "GET",
            credentials: "include",
            headers: {"Content-Type": "application/json"},
        });
        if(data.ok){
          console.log("successfully fetch brief profile");
          const json_data = await data.json();
          setProfileName(json_data.profileName);
          setEmail(json_data.email);
        }
      } catch (error) {
        console.error("oops somwthing went wrong in fetching brief profile")
      }
    }


  async function makeProfileChanges(username: string){
    try {
      const data = await fetch(`http://localhost:3000/api/v0.1/user/updateProfile?username=${username}`, {
        method: "POST",
        credentials: "include",
        headers: {"Content-Type": "application/json"}
    });
    if(data.ok){
      console.log("changes made for profile");
      const json_data = await data.json();
      if(json_data.success == false) console.log(json_data.msg);
      setMakeChanges(true);
      // router.push("/profile"); //re-render the profile
    }
    else
      console.log("Fail to update profile");
    } catch (error) {
      console.error("Oops something went wrong in updating profile", error);
    }
  }


    
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{profileName}</h1>
                <p className="text-gray-600">{email}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <Badge variant="secondary"></Badge>
                  <Badge variant="outline">Event Organizer</Badge>
                </div>
              </div>
            </div>
            <Button variant="outline">
              <Edit3 className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile" className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>Profile</span>
            </TabsTrigger>
            <TabsTrigger value="account" className="flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span>Account</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center space-x-2">
              <Bell className="h-4 w-4" />
              <span>Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span>Security</span>
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">UserName</Label>
                    <Input id="username"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}/>
                  </div>
                  {/* <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input id="phone" 
                      value={phone}
                      className="pl-10" 
                      onChange={(e) => setPhone(e.target.value)}/>
                    </div>
                  </div> */}
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea 
                      id="bio" 
                      defaultValue="Passionate sports enthusiast and event organizer. Love bringing communities together through athletic events."
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Button type="submit" onClick={() => makeProfileChanges(userName)}>Confirm Changes</Button>
                  </div>
                  {makeChanges && (
                    <Alert>
                      <CheckCircle2Icon />
                      <AlertTitle>Success! Your changes have been saved</AlertTitle>
                      <AlertDescription>
                        You can change back the username if you want.
                      </AlertDescription>
                  </Alert>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Activity Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <Trophy className="h-8 w-8 mx-auto text-blue-600 mb-2" />
                      <div className="text-2xl font-bold text-blue-600">{createdCount}</div>
                      <div className="text-sm text-gray-600">Events Created</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <Users className="h-8 w-8 mx-auto text-green-600 mb-2" />
                      <div className="text-2xl font-bold text-green-600">{joinedEvents}</div>
                      <div className="text-sm text-gray-600">Events Joined</div>
                    </div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <Calendar className="h-8 w-8 mx-auto text-purple-600 mb-2" />
                    <div className="text-2xl font-bold text-purple-600">3</div>
                    <div className="text-sm text-gray-600">Upcoming Events</div>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="font-medium mb-2">Member Since</h4>
                    <p className="text-gray-600">January 15, 2023</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Favorite Sports</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">Basketball</Badge>
                      <Badge variant="outline">Running</Badge>
                      <Badge variant="outline">Soccer</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          

          {/* Account Tab */}
          <TabsContent value="account" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Privacy Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Profile Visibility</Label>
                    <p className="text-sm text-gray-600">Make your profile visible to other users</p>
                  </div>
                  <Switch 
                    checked={privacy.profileVisible} 
                    onCheckedChange={(checked) => setPrivacy(prev => ({ ...prev, profileVisible: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Show Email Address</Label>
                    <p className="text-sm text-gray-600">Display your email on your public profile</p>
                  </div>
                  <Switch 
                    checked={privacy.showEmail} 
                    onCheckedChange={(checked) => setPrivacy(prev => ({ ...prev, showEmail: checked }))}
                  />
                </div>
                {/* <div className="flex items-center justify-between">
                  <div>
                    <Label>Show Phone Number</Label>
                    <p className="text-sm text-gray-600">Display your phone number on your public profile</p>
                  </div>
                  <Switch 
                    checked={privacy.showPhone} 
                    onCheckedChange={(checked) => setPrivacy(prev => ({ ...prev, showPhone: checked }))}
                  />
                </div> */}
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Allow Direct Messages</Label>
                    <p className="text-sm text-gray-600">Let other users send you messages</p>
                  </div>
                  <Switch 
                    checked={privacy.allowMessages} 
                    onCheckedChange={(checked) => setPrivacy(prev => ({ ...prev, allowMessages: checked }))}
                  />
                </div>
              </CardContent>
            </Card>
            {/* Danger Zone */}
            <Card className="border-red-200">
              <CardHeader>
                <CardTitle className="text-red-600">Danger Zone</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg">
                  <div>
                    <h4 className="font-medium text-red-900">Delete Account</h4>
                    <p className="text-sm text-red-600">Permanently delete your account and all data</p>
                  </div>
                  {/* <Button variant="destructive" onClick={() => setDialogueOpen(true)} >Delete Account</Button> */}
                   <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" onClick={() => setDialogueOpen(true)}>Delete Account</Button>
                    </AlertDialogTrigger>
                    {dialogueOpen && (
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your account
                            and remove your data from our servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={deleteAccount}>Confirm</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                    )
}                   
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-gray-600">Receive event updates and announcements via email</p>
                  </div>
                  <Switch 
                    checked={notifications.email} 
                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, email: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Push Notifications</Label>
                    <p className="text-sm text-gray-600">Receive real-time notifications on your device</p>
                  </div>
                  <Switch 
                    checked={notifications.push} 
                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, push: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>SMS Notifications</Label>
                    <p className="text-sm text-gray-600">Receive important updates via text message</p>
                  </div>
                  <Switch 
                    checked={notifications.sms} 
                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, sms: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Marketing Communications</Label>
                    <p className="text-sm text-gray-600">Receive promotional offers and feature updates</p>
                  </div>
                  <Switch 
                    checked={notifications.marketing} 
                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, marketing: checked }))}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Change Password</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <div className="relative">
                      <Input 
                        id="currentPassword" 
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter current password"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input id="newPassword" type="password" placeholder="Enter new password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input id="confirmPassword" type="password" placeholder="Confirm new password" />
                  </div>
                  <Button className="w-full">Update Password</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Two-Factor Authentication</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center p-6 border-2 border-dashed border-gray-300 rounded-lg">
                    <Shield className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <h3 className="font-medium text-gray-900 mb-2">2FA Not Enabled</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Add an extra layer of security to your account
                    </p>
                    <Button onClick={() => setMFA()}>Enable 2FA</Button>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Recent Login Activity</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Desktop - Chrome</span>
                        <span className="text-gray-600">2 hours ago</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Mobile - Safari</span>
                        <span className="text-gray-600">1 day ago</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

        </Tabs>
      </div>
    </div>
  );
}



