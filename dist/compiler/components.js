"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.COMPONENT_PROPS = exports.STYLE_PROPS = exports.PACKAGE_COMPONENTS = exports.DEFAULT_RN_COMPONENTS = exports.COMPONENT_MAP = void 0;
exports.isCustomComponent = isCustomComponent;
exports.getComponentName = getComponentName;
exports.detectRequiredImports = detectRequiredImports;
// Enhanced component mapping with flexible package support
exports.COMPONENT_MAP = {
    // Core React Native Components (always available)
    View: 'View',
    Text: 'Text',
    Image: 'Image',
    ScrollView: 'ScrollView',
    FlatList: 'FlatList',
    TextInput: 'TextInput',
    TouchableOpacity: 'TouchableOpacity',
    Switch: 'Switch',
    Button: 'Button',
    ActivityIndicator: 'ActivityIndicator',
    Modal: 'Modal',
    SafeAreaView: 'SafeAreaView',
    // Common aliases for convenience
    Stack: 'View',
    Scroll: 'ScrollView',
    List: 'FlatList',
    Input: 'TextInput',
    Loading: 'ActivityIndicator',
    Safe: 'SafeAreaView',
    // Pressable components
    Pressable: 'Pressable',
    // Keep flexible - unknown components will be passed through as-is
    // This allows for third-party and custom components
};
// Core React Native components that should always be imported
exports.DEFAULT_RN_COMPONENTS = new Set([
    'View', 'Text', 'Image', 'ScrollView', 'FlatList',
    'TextInput', 'TouchableOpacity', 'Switch', 'Button',
    'ActivityIndicator', 'Modal', 'SafeAreaView', 'Pressable'
]);
// Components that require specific packages (commonly used)
exports.PACKAGE_COMPONENTS = {
    // React Navigation
    'NavigationContainer': { package: '@react-navigation/native', import: 'NavigationContainer', type: 'named' },
    'createStackNavigator': { package: '@react-navigation/stack', import: 'createStackNavigator', type: 'named' },
    'createBottomTabNavigator': { package: '@react-navigation/bottom-tabs', import: 'createBottomTabNavigator', type: 'named' },
    'createDrawerNavigator': { package: '@react-navigation/drawer', import: 'createDrawerNavigator', type: 'named' },
    // Expo Components
    'LinearGradient': { package: 'expo-linear-gradient', import: 'LinearGradient', type: 'default' },
    'Camera': { package: 'expo-camera', import: 'Camera', type: 'named' },
    'MapView': { package: 'react-native-maps', import: 'MapView', type: 'default' },
    // Popular UI Libraries
    'Icon': { package: 'react-native-vector-icons/Ionicons', import: 'default', type: 'default' },
    'FAB': { package: 'react-native-paper', import: 'FAB', type: 'named' },
    'Card': { package: 'react-native-paper', import: 'Card', type: 'named' },
    // Gesture Handler
    'PanGestureHandler': { package: 'react-native-gesture-handler', import: 'PanGestureHandler', type: 'named' },
    'TapGestureHandler': { package: 'react-native-gesture-handler', import: 'TapGestureHandler', type: 'named' },
};
// Function to determine if a component should be passed through as custom
function isCustomComponent(componentName) {
    // If it's not in our known mappings and not in package components, treat as custom
    return !exports.COMPONENT_MAP[componentName] && !exports.PACKAGE_COMPONENTS[componentName];
}
// Function to get the actual component name to use in JSX
function getComponentName(componentName) {
    // Return mapped name if exists, otherwise return as-is (for custom components)
    return exports.COMPONENT_MAP[componentName] || componentName;
}
// Function to detect required imports from component usage
function detectRequiredImports(componentNames) {
    const reactNative = [];
    const packages = [];
    const custom = [];
    const packageMap = new Map();
    for (const componentName of componentNames) {
        if (exports.DEFAULT_RN_COMPONENTS.has(componentName) || exports.COMPONENT_MAP[componentName]) {
            const rnComponent = exports.COMPONENT_MAP[componentName] || componentName;
            if (exports.DEFAULT_RN_COMPONENTS.has(rnComponent)) {
                reactNative.push(rnComponent);
            }
        }
        else if (exports.PACKAGE_COMPONENTS[componentName]) {
            const packageInfo = exports.PACKAGE_COMPONENTS[componentName];
            if (!packageMap.has(packageInfo.package)) {
                packageMap.set(packageInfo.package, { imports: new Set(), type: packageInfo.type });
            }
            packageMap.get(packageInfo.package).imports.add(packageInfo.import);
        }
        else {
            // Treat as custom component
            custom.push(componentName);
        }
    }
    // Convert package map to array
    for (const [packageName, info] of packageMap) {
        packages.push({
            package: packageName,
            imports: Array.from(info.imports),
            type: info.type
        });
    }
    return {
        reactNative: [...new Set(reactNative)], // Remove duplicates
        packages,
        custom
    };
}
// Style props remain the same but more flexible
exports.STYLE_PROPS = new Set([
    // Layout
    'flex', 'flexGrow', 'flexShrink', 'flexBasis',
    'row', 'col', 'wrap', 'nowrap',
    'center', 'start', 'end', 'between', 'around',
    'full', 'half', 'third', 'quarter',
    // Spacing
    'p', 'px', 'py', 'pt', 'pr', 'pb', 'pl',
    'm', 'mx', 'my', 'mt', 'mr', 'mb', 'ml',
    'gap', 'gapX', 'gapY',
    // Sizing
    'w', 'h', 'minW', 'minH', 'maxW', 'maxH',
    'aspectRatio',
    // Position
    'absolute', 'relative', 'top', 'right', 'bottom', 'left',
    'zIndex',
    // Background
    'bg', 'bgImage', 'bgSize', 'bgPosition',
    // Border
    'border', 'borderTop', 'borderRight', 'borderBottom', 'borderLeft',
    'borderColor', 'borderWidth', 'borderStyle',
    'rounded', 'roundedTop', 'roundedRight', 'roundedBottom', 'roundedLeft',
    // Shadow
    'shadow', 'shadowColor', 'shadowOffset', 'shadowOpacity', 'shadowRadius',
    'elevation',
    // Text
    'font', 'fontSize', 'fontWeight', 'fontStyle',
    'color', 'textAlign', 'textTransform', 'lineHeight',
    'letterSpacing',
    // Transform
    'scale', 'rotate', 'translateX', 'translateY',
    // Opacity
    'opacity',
    // Overflow
    'overflow', 'overflowX', 'overflowY',
    // Display
    'display', 'hidden',
    // Animation
    'animated', 'duration', 'delay', 'easing'
]);
// More flexible component props - allows any prop to be passed through
exports.COMPONENT_PROPS = {
    View: new Set(['onPress', 'onLongPress', 'onLayout']),
    Text: new Set(['numberOfLines', 'ellipsizeMode', 'selectable']),
    TextInput: new Set([
        'value', 'onChangeText', 'placeholder', 'secureTextEntry',
        'keyboardType', 'autoCapitalize', 'autoCorrect', 'multiline',
        'maxLength', 'editable', 'onFocus', 'onBlur', 'onSubmit'
    ]),
    TouchableOpacity: new Set([
        'onPress', 'onLongPress', 'disabled', 'activeOpacity'
    ]),
    Image: new Set([
        'source', 'resizeMode', 'onLoad', 'onError',
        'fadeDuration', 'progressiveRenderingEnabled'
    ]),
    FlatList: new Set([
        'data', 'renderItem', 'keyExtractor', 'onRefresh',
        'refreshing', 'onEndReached', 'onEndReachedThreshold'
    ]),
    // Allow any component to accept any props (flexibility for custom components)
    '*': new Set([
        'style', 'testID', 'accessibilityLabel', 'accessibilityHint',
        'accessible', 'onPress', 'onLongPress', 'children'
    ])
};
