import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Dimensions, TouchableOpacity, Platform } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/types';
import { useTheme } from '../../theme/ThemeContext';
import { ThemedIcon } from '../../components/ThemedIcon';
import { ThemedText } from '../../components/ThemedComponents';
import { useStyledTheme } from '../../hooks/useStyledTheme';
import { useNavigation } from '@react-navigation/native';
import bookmarkEvents from '../../services/bookmarkEvents';
import { addBookmark, removeBookmark, isBookmarked } from '../../services/storage';

const { width } = Dimensions.get('window');

const NewsDetailScreen: React.FC = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'NewsDetail'>>();
  const { article } = route.params;
  const { colors, theme } = useStyledTheme();
  const navigation = useNavigation();
  const { toggleTheme } = useTheme();

  const [bookmarked, setBookmarked] = React.useState<boolean>(false);

  React.useEffect(() => {
    setBookmarked(isBookmarked(article.title));
    const updateBookmark = () => setBookmarked(isBookmarked(article.title));
    bookmarkEvents.addListener('changed', updateBookmark);
    return () => {
      bookmarkEvents.removeListener('changed', updateBookmark);
    };
  }, [article.title]);

  const toggleBookmark = () => {
    if (bookmarked) {
      removeBookmark(article.title);
      setBookmarked(false);
    } else {
      addBookmark(article);
      setBookmarked(true);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        {article.urlToImage ? (
          <Image source={{ uri: article.urlToImage }} style={styles.image} resizeMode="cover" />
        ) : (
          <View style={[styles.image, { backgroundColor: colors.backgroundSecondary, justifyContent: 'center', alignItems: 'center' }]}> 
            <ThemedText>No Image</ThemedText>
          </View>
        )}
        <TouchableOpacity onPress={toggleBookmark} style={styles.bookmarkButton}>
          <ThemedIcon
            name={bookmarked ? 'bookmark' : 'bookmark-outline'}
            size={32}
            color={bookmarked ? colors.primary : colors.textSecondary}
          />
        </TouchableOpacity>
        {/* Overlay Header */}
        <View style={styles.headerOverlay}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <ThemedIcon name="arrow-back" size={26} color={colors.primary || '#fff'} />
          </TouchableOpacity>
          <View style={styles.headerCenterOverlay}>
            <ThemedText style={styles.headerTextOverlay}> Article </ThemedText>
          </View>
          <TouchableOpacity onPress={toggleTheme} style={styles.themeButton}>
            <ThemedIcon
              name={theme === 'dark' ? 'light-mode' : 'dark-mode'}
              size={24}
              color={colors.primary || '#fff'}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={[styles.card, { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border || '#333' }]}>
        <ThemedText style={theme === 'dark' ? [styles.title, { color: '#fff' }] : styles.title}>{article.title}</ThemedText>
        <View style={styles.metaRow}>
          {article.author && (
            <View style={styles.metaItem}>
              <ThemedIcon name="person" size={16} color={colors.textSecondary} />
              <ThemedText style={theme === 'dark' ? [styles.metaText, { color: '#fff' }] : styles.metaText}>By {article.author}</ThemedText>
            </View>
          )}
          {article.publishedAt && (
            <View style={styles.metaItem}>
              <ThemedIcon name="calendar-today" size={16} color={colors.textSecondary} />
              <ThemedText style={theme === 'dark' ? [styles.metaText, { color: '#fff' }] : styles.metaText}>{new Date(article.publishedAt).toLocaleDateString()}</ThemedText>
            </View>
          )}
          {article.source?.name && (
            <View style={styles.metaItem}>
              <ThemedIcon name="public" size={16} color={colors.textSecondary} />
              <ThemedText style={theme === 'dark' ? [styles.metaText, { color: '#fff' }] : styles.metaText}>{article.source.name}</ThemedText>
            </View>
          )}
        </View>
        <View style={styles.divider} />
        <ThemedText style={theme === 'dark' ? [styles.description, { color: '#fff' }] : styles.description}>{article.description || 'No description available.'}</ThemedText>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingTop: Platform.OS === 'ios' ? 56 : 8,
  },
  imageContainer: {
    position: 'relative',
    width: width,
    height: 260,
    marginBottom: -32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 6,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    overflow: 'visible',
    backgroundColor: 'transparent',
  },
  image: {
    width: width,
    height: 260,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  bookmarkButton: {
    position: 'absolute',
    top: 16,
    right: 20,
    zIndex: 10,
    backgroundColor: 'rgba(255,255,255,0.85)',
    borderRadius: 22,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  card: {
    // backgroundColor is now set dynamically using colors.card
    borderRadius: 18,
    marginHorizontal: 16,
    marginTop: 40,
    marginBottom: 24,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 12,
    color: '#222',
    lineHeight: 32,
    letterSpacing: 0.1,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    flexWrap: 'wrap',
    gap: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 18,
    gap: 4,
  },
  metaText: {
    fontSize: 14,
    color: '#888',
    marginLeft: 4,
  },
  divider: {
    height: 1,
    backgroundColor: '#ececec',
    marginVertical: 12,
    borderRadius: 2,
  },
  description: {
    fontSize: 17,
    color: '#333',
    marginTop: 4,
    lineHeight: 26,
    letterSpacing: 0.1,
  },
  headerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingTop: 16,
    height: 56,
    backgroundColor: 'rgba(0,0,0,0.23)',
    zIndex: 5,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  backButton: {
    padding: 6,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.13)',
    marginRight: 12,
  },
  headerCenterOverlay: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTextOverlay: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 0.2,
  },
  themeButton: {
    marginLeft: 8,
    padding: 6,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.06)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NewsDetailScreen;
