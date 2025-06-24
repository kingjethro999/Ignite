# Real-world .ignite Examples

## 1. Authentication Screen (`app/auth/login.ignite`)

```ignite
screen title="Login" headerShown=false

state email=""
state password=""
state loading=false
state error=""
state showPassword=false

expo-linear-gradient
firebase auth
async-storage

<View style="container">
  <View style="logoContainer">
    <Image source="https://via.placeholder.com/120x120" style="logo" />
    <Text style="title">Welcome Back</Text>
    <Text style="subtitle">Sign in to continue</Text>
  </View>

  <View style="form">
    <View style="inputContainer">
      <Input 
        placeholder="Email" 
        bind="email"
        keyboardType="email-address"
        autoCapitalize="none"
        style="input"
      />
    </View>
    
    <View style="inputContainer">
      <Input 
        placeholder="Password" 
        bind="password"
        secureTextEntry={!showPassword}
        style="input"
      />
      <Button onPress="togglePassword()" style="eyeButton">
        <Text>{showPassword ? '👁️' : '👁️‍🗨️'}</Text>
      </Button>
    </View>

    {error && (
      <View style="errorContainer">
        <Text style="errorText">{error}</Text>
      </View>
    )}

    <Button onPress="handleLogin()" disabled={loading} style="loginButton">
      {loading ? (
        <Loading color="#ffffff" />
      ) : (
        <Text style="loginButtonText">Sign In</Text>
      )}
    </Button>

    <Button onPress={go('/register')} style="linkButton">
      <Text style="linkText">Don't have an account? Sign up</Text>
    </Button>
  </View>
</View>

async togglePassword() {
  setShowPassword(!showPassword)
}

async handleLogin() {
  if (!email || !password) {
    setError("Please fill in all fields")
    return
  }
  
  setLoading(true)
  setError("")
  
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(async (userCredential) => {
      await AsyncStorage.setItem('user', JSON.stringify(userCredential.user))
      go('/home')
    })
    .catch((error) => {
      setError(error.message)
    })
    .finally(() => {
      setLoading(false)
    })
}

const styles = StyleSheet.create({
 i intentionally removed styles to make me properly interact with you, to reduce file length
});
```

## 2. Chat Application (`app/(tabs)/chat.ignite`)

```ignite
screen title="Messages" isTabScreen=true tabOrder=1 tabIcon="chatbubbles"

state messages=[]
state newMessage=""
state user=null
state loading=true
state typing=false

firebase firestore
expo-image-picker
expo-av
async-storage

onMount="loadUser(), loadMessages()"

<View style="container">
  <List 
    data={messages}
    renderItem="renderMessage"
    keyExtractor="item => item.id"
    style="messagesList"
    onEndReached="loadMoreMessages"
    refreshing={loading}
    onRefresh="loadMessages"
  />

  <View style="inputContainer">
    <Button onPress="pickImage()" style="attachButton">
      <Text>📎</Text>
    </Button>
    
    <Input
      bind="newMessage"
      placeholder="Type a message..."
      multiline=true
      style="messageInput"
      onFocus="setTyping(true)"
      onBlur="setTyping(false)"
    />
    
    <Button 
      onPress="sendMessage()" 
      disabled={!newMessage.trim()}
      style="sendButton"
    >
      <Text style="sendButtonText">➤</Text>
    </Button>
  </View>
</View>

async loadUser() {
  const userData = await AsyncStorage.getItem('user')
  if (userData) {
    setUser(JSON.parse(userData))
  }
}

async loadMessages() {
  setLoading(true)
  const unsubscribe = firebase.firestore()
    .collection('messages')
    .orderBy('timestamp', 'desc')
    .limit(50)
    .onSnapshot((snapshot) => {
      const messageList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setMessages(messageList)
      setLoading(false)
    })
  
  return unsubscribe
}

async sendMessage() {
  if (!newMessage.trim() || !user) return
  
  await firebase.firestore().collection('messages').add({
    text: newMessage,
    userId: user.uid,
    userName: user.displayName || user.email,
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    type: 'text'
  })
  
  setNewMessage("")
}

async pickImage() {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  })
  
  if (!result.canceled) {
    await uploadAndSendImage(result.assets[0].uri)
  }
}

renderMessage = ({ item }) => (
  <View style={item.userId === user?.uid ? "myMessage" : "otherMessage"}>
    <Text style="senderName">{item.userName}</Text>
    {item.type === 'image' ? (
      <Image source={{uri: item.imageUrl}} style="messageImage" />
    ) : (
      <Text style="messageText">{item.text}</Text>
    )}
    <Text style="timestamp">{formatTime(item.timestamp)}</Text>
  </View>
)

const styles = StyleSheet.create({
 i intentionally removed styles to make me properly interact with you, to reduce file length
});
```

## 3. Location-based Todo App (`app/(tabs)/tasks.ignite`)

```ignite
screen title="Tasks" isTabScreen=true tabOrder=2 tabIcon="list"

state tasks=[]
state newTask=""
state showCompleted=true
state currentLocation=null
state locationPermission=false

expo-location
firebase firestore
expo-notifications
async-storage

onMount="requestLocationPermission(), loadTasks()"

<View style="container">
  <View style="header">
    <Text style="headerTitle">My Tasks</Text>
    <View style="toggleContainer">
      <Text style="toggleLabel">Show Completed</Text>
      <Switch bind="showCompleted" />
    </View>
  </View>

  <View style="inputSection">
    <Input
      bind="newTask"
      placeholder="Add a new task..."
      style="taskInput"
      onSubmit="addTask()"
    />
    <Button onPress="addTask()" style="addButton">
      <Text style="addButtonText">+</Text>
    </Button>
  </View>

  <List
    data={filteredTasks()}
    renderItem="renderTask"
    keyExtractor="item => item.id"
    style="taskList"
    refreshing={false}
    onRefresh="loadTasks"
  />

  <Button onPress="addLocationTask()" style="locationButton">
    <Text style="locationButtonText">📍 Add Location Reminder</Text>
  </Button>
</View>

filteredTasks = () => {
  if (showCompleted) {
    return tasks
  }
  return tasks.filter(task => !task.completed)
}

async requestLocationPermission() {
  const { status } = await Location.requestForegroundPermissionsAsync()
  setLocationPermission(status === 'granted')
  
  if (status === 'granted') {
    const location = await Location.getCurrentPositionAsync({})
    setCurrentLocation(location.coords)
  }
}

async loadTasks() {
  const user = JSON.parse(await AsyncStorage.getItem('user'))
  if (!user) return
  
  firebase.firestore()
    .collection('tasks')
    .where('userId', '==', user.uid)
    .orderBy('createdAt', 'desc')
    .onSnapshot((snapshot) => {
      const taskList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setTasks(taskList)
    })
}

async addTask() {
  if (!newTask.trim()) return
  
  const user = JSON.parse(await AsyncStorage.getItem('user'))
  
  await firebase.firestore().collection('tasks').add({
    title: newTask,
    completed: false,
    userId: user.uid,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    location: currentLocation
  })
  
  setNewTask("")
}

async toggleTask(taskId, completed) {
  await firebase.firestore()
    .collection('tasks')
    .doc(taskId)
    .update({ completed: !completed })
  
  if (!completed) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Task Completed! 🎉",
        body: "Great job on finishing your task!",
      },
      trigger: { seconds: 1 },
    })
  }
}

async addLocationTask() {
  if (!locationPermission) {
    Alert.alert("Location permission required")
    return
  }
  
  // This would open a modal or navigate to location picker
  go('/location-picker')
}

renderTask = ({ item }) => (
  <View style="taskItem">
    <Button 
      onPress={`toggleTask('${item.id}', ${item.completed})`}
      style="checkbox"
    >
      <Text style="checkboxText">{item.completed ? '✅' : '⭕'}</Text>
    </Button>
    
    <View style="taskContent">
      <Text style={item.completed ? "taskTextCompleted" : "taskText"}>
        {item.title}
      </Text>
      {item.location && (
        <Text style="locationText">📍 Location reminder set</Text>
      )}
    </View>
    
    <Button onPress={`deleteTask('${item.id}')`} style="deleteButton">
      <Text style="deleteButtonText">🗑️</Text>
    </Button>
  </View>
)

const styles = StyleSheet.create({
  
 i intentionally removed styles to make me properly interact with you, to reduce file length
});
```

## 4. Profile Settings (`app/(tabs)/profile.ignite`)

```ignite
screen title="Profile" isTabScreen=true tabOrder=3 tabIcon="person"

state user=null
state displayName=""
state email=""
state photoURL=""
state darkMode=false
state notifications=true
state locationServices=true
state loading=false

firebase auth
firebase storage
expo-image-picker
expo-notifications
async-storage

onMount="loadProfile(), loadSettings()"

<View style="container">
  <View style="profileHeader">
    <Button onPress="changeProfilePicture()" style="avatarContainer">
      <Image 
        source={photoURL || "https://via.placeholder.com/100x100"} 
        style="avatar" 
      />
      <View style="cameraIcon">
        <Text>📷</Text>
      </View>
    </Button>
    
    <Text style="name">{displayName || email}</Text>
    <Text style="email">{email}</Text>
  </View>

  <View style="settingsSection">
    <Text style="sectionTitle">Account Settings</Text>
    
    <View style="settingItem">
      <Text style="settingLabel">Display Name</Text>
      <Input 
        bind="displayName"
        style="settingInput"
        onBlur="updateDisplayName()"
      />
    </View>
  </View>

  <View style="settingsSection">
    <Text style="sectionTitle">Preferences</Text>
    
    <View style="settingItem">
      <Text style="settingLabel">Dark Mode</Text>
      <Switch bind="darkMode" />
    </View>
    
    <View style="settingItem">
      <Text style="settingLabel">Push Notifications</Text>
      <Switch bind="notifications" />
    </View>
    
    <View style="settingItem">
      <Text style="settingLabel">Location Services</Text>
      <Switch bind="locationServices" />
    </View>
  </View>

  <View style="settingsSection">
    <Text style="sectionTitle">Data & Privacy</Text>
    
    <Button onPress="exportData()" style="actionButton">
      <Text style="actionButtonText">Export My Data</Text>
    </Button>
    
    <Button onPress="deleteAccount()" style="dangerButton">
      <Text style="dangerButtonText">Delete Account</Text>
    </Button>
  </View>

  <Button onPress="signOut()" style="signOutButton">
    <Text style="signOutButtonText">Sign Out</Text>
  </Button>
</View>

async loadProfile() {
  const user = firebase.auth().currentUser
  if (user) {
    setUser(user)
    setDisplayName(user.displayName || "")
    setEmail(user.email || "")
    setPhotoURL(user.photoURL || "")
  }
}

async loadSettings() {
  const settings = await AsyncStorage.getItem('userSettings')
  if (settings) {
    const parsed = JSON.parse(settings)
    setDarkMode(parsed.darkMode || false)
    setNotifications(parsed.notifications !== false)
    setLocationServices(parsed.locationServices !== false)
  }
}

async saveSettings() {
  const settings = {
    darkMode,
    notifications,
    locationServices
  }
  await AsyncStorage.setItem('userSettings', JSON.stringify(settings))
}

async changeProfilePicture() {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [1, 1],
    quality: 1,
  })
  
  if (!result.canceled) {
    setLoading(true)
    const imageUrl = await uploadImageToStorage(result.assets[0].uri)
    await firebase.auth().currentUser.updateProfile({
      photoURL: imageUrl
    })
    setPhotoURL(imageUrl)
    setLoading(false)
  }
}

async updateDisplayName() {
  if (displayName && displayName !== user.displayName) {
    await firebase.auth().currentUser.updateProfile({
      displayName: displayName
    })
  }
}

async signOut() {
  await firebase.auth().signOut()
  await AsyncStorage.removeItem('user')
  go('/auth/login')
}

const styles = StyleSheet.create({
 i intentionally removed styles to make me properly interact with you, to reduce file length
});
```

These examples demonstrate:

1. **State Management**: Simple state declarations with default values
2. **Firebase Integration**: Authentication, Firestore, and Storage
3. **Expo Libraries**: Image picker, location services, notifications
4. **Async Storage**: Local data persistence
5. **Navigation**: Using `go()` function for routing
6. **Conditional Rendering**: Based on state values
7. **Real-world Features**: Chat, todos, authentication, profiles
8. **Lifecycle Methods**: `onMount` for initialization
9. **Complex Interactions**: Image uploads, location tracking, real-time data

The `.ignite` format provides a clean, declarative way to build React Native apps while abstracting away much of the boilerplate code!