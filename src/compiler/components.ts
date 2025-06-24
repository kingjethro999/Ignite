export const COMPONENT_MAP: Record<string, string> = {
  // Layout Components
  View: 'View',
  Stack: 'View',
  Scroll: 'ScrollView',
  Safe: 'SafeAreaView',
  Modal: 'Modal',
  Pressable: 'Pressable',
  
  // Text Components
  Text: 'Text',
  Heading: 'Text',
  Label: 'Text',
  
  // Input Components
  Input: 'TextInput',
  TextArea: 'TextInput',
  Switch: 'Switch',
  Checkbox: 'TouchableOpacity',
  Radio: 'TouchableOpacity',
  Slider: 'Slider',
  
  // Button Components
  Button: 'TouchableOpacity',
  IconButton: 'TouchableOpacity',
  Link: 'TouchableOpacity',
  
  // Media Components
  Image: 'Image',
  Video: 'Video',
  Camera: 'Camera',
  
  // List Components
  List: 'FlatList',
  Grid: 'FlatList',
  
  // Navigation Components
  Tab: 'View',
  Drawer: 'View',
  
  // Feedback Components
  Alert: 'Alert',
  Toast: 'Toast',
  Loading: 'ActivityIndicator',
  
  // Form Components
  Form: 'View',
  Field: 'View',
  Select: 'Picker',
  
  // Chart Components
  Chart: 'View',
  Bar: 'View',
  Line: 'View',
  Pie: 'View'
};

export const STYLE_PROPS = new Set([
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

export const COMPONENT_PROPS: Record<string, Set<string>> = {
  View: new Set(['onPress', 'onLongPress', 'onLayout']),
  Text: new Set(['numberOfLines', 'ellipsizeMode', 'selectable']),
  Input: new Set([
    'value', 'onChangeText', 'placeholder', 'secureTextEntry',
    'keyboardType', 'autoCapitalize', 'autoCorrect', 'multiline',
    'maxLength', 'editable', 'onFocus', 'onBlur', 'onSubmit'
  ]),
  Button: new Set([
    'onPress', 'onLongPress', 'disabled', 'loading',
    'icon', 'iconPosition', 'variant', 'size'
  ]),
  Image: new Set([
    'source', 'resizeMode', 'onLoad', 'onError',
    'fadeDuration', 'progressiveRenderingEnabled'
  ]),
  List: new Set([
    'data', 'renderItem', 'keyExtractor', 'onRefresh',
    'refreshing', 'onEndReached', 'onEndReachedThreshold'
  ]),
  Form: new Set(['onSubmit', 'onReset', 'initialValues']),
  Chart: new Set([
    'data', 'type', 'width', 'height',
    'showLegend', 'showLabels', 'showGrid'
  ])
}; 