# Real-World Ignite Examples

## New Mechanisms Introduced:
- `state variable=initialValue` - State management
- `async functionName()` - Async operations  
- `store key=value` - AsyncStorage operations
- `firebase collection.action()` - Firebase operations
- `bind="{variable}"` - Two-way data binding
- `onAction="functionName()"` - Custom event handlers
- `load data="source"` - Data loading
- `if condition="{variable}"` - Conditional rendering


## 2. **Todo List with AsyncStorage**
```ignite
screen title="Todo List"

state todos=[]
state newTodo=""
async loadTodos() store get="todos"
async saveTodos() store set="todos:{todos}"

load data="loadTodos()"

<View full bg="white" p="4">
  <Text size="xl" mb="4" font="bold">My Todos</Text>
  
  <View row mb="4">
    <Input 
      bind="{newTodo}" 
      placeholder="Add new todo..." 
      flex="1" 
      mr="2"
      border="1" 
      rounded="lg" 
      px="3" 
      py="2"
    />
    <Button onPress="addTodo()" bg="green-500" px="4" py="2" rounded="lg">
      Add
    </Button>
  </View>
  
  <List 
    data="{todos}" 
    renderItem="TodoItem" 
    keyExtractor="id"
  />
</View>

async addTodo() {
  todos.push({id: Date.now(), text: newTodo, completed: false})
  setNewTodo("")
  saveTodos()
}
```


## 3. **Login Form with Firebase Auth**
```ignite
screen title="Login"

state email=""
state password=""
state loading=false
state error=""

firebase auth

<View center full bg="white" px="6">
  <Text size="2xl" mb="8" font="bold">Welcome Back</Text>
  
  <if condition="{error}">
    <Text color="red-500" mb="4">{error}</Text>
  </if>
  
  <Input 
    bind="{email}"
    placeholder="Email"
    keyboardType="email-address"
    mb="4"
    w="full"
    border="1"
    rounded="lg"
    px="4"
    py="3"
  />
  
  <Input 
    bind="{password}"
    placeholder="Password"
    secureTextEntry="true"
    mb="6"
    w="full"
    border="1"
    rounded="lg"
    px="4"
    py="3"
  />
  
  <Button 
    onPress="login()" 
    bg="blue-500" 
    w="full" 
    py="3" 
    rounded="lg" 
    mb="4"
    loading="{loading}"
  >
    <if condition="{loading}">
      <Loading />
    </if>
    <if condition="{!loading}">
      Login
    </if>
  </Button>
  
  <Button onPress="go('/Register')" variant="text">
    Don't have an account? Sign up
  </Button>
</View>

async login() {
  setLoading(true)
  setError("")
  
  firebase.auth.signIn(email, password)
    .then(() => go('/Home'))
    .catch((err) => setError(err.message))
    .finally(() => setLoading(false))
}
```


## 4. **Chat App with Firestore**
```ignite
screen title="Chat Room"

state messages=[]
state newMessage=""
state user=""

firebase firestore
load data="loadMessages()"
async loadMessages() firebase messages.listen()
async sendMessage() firebase messages.add({text: newMessage, user, timestamp: now()})

<View full bg="gray-100">
  <List 
    data="{messages}"
    renderItem="MessageItem"
    keyExtractor="id"
    flex="1"
    px="4"
    py="2"
  />
  
  <View row bg="white" p="4" border="top">
    <Input 
      bind="{newMessage}"
      placeholder="Type a message..."
      flex="1"
      mr="2"
      border="1"
      rounded="full"
      px="4"
      py="2"
    />
    <Button onPress="sendMessage()" bg="blue-500" rounded="full" px="4" py="2">
      Send
    </Button>
  </View>
</View>
```


## 5. **Shopping Cart**
```ignite
screen title="Shopping Cart"

state cart=[]
state total=0
async loadCart() store get="cart"
async saveCart() store set="cart:{cart}"

load data="loadCart()"

<View full bg="white">
  <View row between center px="4" py="3" border="bottom">
    <Text size="xl" font="bold">Shopping Cart</Text>
    <Text size="lg" font="bold" color="green-600">${total}</Text>
  </View>
  
  <if condition="{cart.length === 0}">
    <View center flex="1">
      <Text size="lg" color="gray-500">Your cart is empty</Text>
      <Button onPress="go('/Shop')" bg="blue-500" px="6" py="3" rounded="lg" mt="4">
        Start Shopping
      </Button>
    </View>
  </if>
  
  <if condition="{cart.length > 0}">
    <List 
      data="{cart}"
      renderItem="CartItem"
      flex="1"
      px="4"
    />
    
    <View p="4" border="top">
      <Button onPress="checkout()" bg="green-500" w="full" py="4" rounded="lg">
        Checkout - ${total}
      </Button>
    </View>
  </if>
</View>

updateTotal() {
  setTotal(cart.reduce((sum, item) => sum + (item.price * item.quantity), 0))
}

removeItem(id) {
  setCart(cart.filter(item => item.id !== id))
  saveCart()
  updateTotal()
}
```

## 7. **Weather App with Location**
```ignite
screen title="Weather"

state weather=null
state location=""
state loading=true
async getLocation() device.location()
async getWeather() api.weather(location)

load data="loadWeather()"

<View full bg="gradient-blue">
  <if condition="{loading}">
    <View center flex="1">
      <Loading size="large" color="white" />
      <Text color="white" mt="4">Getting your location...</Text>
    </View>
  </if>
  
  <if condition="{!loading && weather}">
    <View center flex="1" px="6">
      <Text size="3xl" color="white" font="bold" mb="2">
        {weather.temperature}°
      </Text>
      <Text size="xl" color="white" mb="4">
        {weather.description}
      </Text>
      <Text color="white" mb="8">
        {location}
      </Text>
      
      <View row between w="full" bg="white/20" rounded="lg" p="4">
        <View center>
          <Text color="white" font="bold">{weather.humidity}%</Text>
          <Text color="white" size="sm">Humidity</Text>
        </View>
        <View center>
          <Text color="white" font="bold">{weather.windSpeed} mph</Text>
          <Text color="white" size="sm">Wind</Text>
        </View>
        <View center>
          <Text color="white" font="bold">{weather.visibility} mi</Text>
          <Text color="white" size="sm">Visibility</Text>
        </View>
      </View>
      
      <Button onPress="refreshWeather()" bg="white/20" px="6" py="3" rounded="lg" mt="6">
        <Text color="white">Refresh</Text>
      </Button>
    </View>
  </if>
</View>

async loadWeather() {
  const loc = await getLocation()
  setLocation(loc.city)
  const weatherData = await getWeather()
  setWeather(weatherData)
  setLoading(false)
}

async refreshWeather() {
  setLoading(true)
  loadWeather()
}
```

## Key Patterns Used:

1. **State Management**: `state variable=initialValue`
2. **Async Operations**: `async functionName()`
3. **Storage**: `store get/set="key"`
4. **Firebase**: `firebase collection.action()`
5. **Data Binding**: `bind="{variable}"`
6. **Event Handlers**: `onPress="functionName()"`
7. **Conditional Rendering**: `if condition="{expression}"`
8. **Data Loading**: `load data="source"`

These examples showcase real-world mobile app scenarios using consistent Ignite DSL patterns with Expo/React Native capabilities.