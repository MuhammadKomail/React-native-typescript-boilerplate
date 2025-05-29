import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { getBookmarkedArticles, removeBookmark } from '../../services/storage';
import NewsCard from '../../components/NewsCard';
import { ThemedIcon } from '../../components/ThemedIcon';
import colors from '../../styles/colors';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../theme/ThemeContext';
import { useStyledTheme } from '../../hooks/useStyledTheme';
import { ThemedText } from '../../components/ThemedComponents';

const BookmarksScreen = () => {
  const navigation = useNavigation();
  const { toggleTheme } = useTheme();
  const { colors, theme } = useStyledTheme();
  const [bookmarks, setBookmarks] = useState<any[]>([]);

  const loadBookmarks = () => {
    setBookmarks(getBookmarkedArticles());
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadBookmarks);
    loadBookmarks();
    return unsubscribe;
  }, [navigation]);

  const handleRemove = (title: string) => {
    removeBookmark(title);
    loadBookmarks();
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.cardContainer}>
      <View style={{ position: 'relative' }}>
        <NewsCard article={item} showBookmark={false} />
        <TouchableOpacity
          style={styles.removeIcon}
          onPress={() => handleRemove(item.title)}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <ThemedIcon name="delete" size={22} color="#ff5252" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.headerRow}>
        {/* Left: Back Button */}
        <View style={styles.headerSide}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <ThemedIcon name="arrow-back" size={26} color={colors.primary || '#1976d2'} />
          </TouchableOpacity>
        </View>
        {/* Center: Title + Icon */}
        <View style={styles.headerCenter}>
          <ThemedIcon name="bookmark" size={28} color={colors.primary || '#1976d2'} style={{ marginRight: 8 }} />
          <ThemedText style={styles.headerText}>Bookmarked Articles</ThemedText>
        </View>
        {/* Right: Theme Toggle */}
        <View style={styles.headerSide}>
          <TouchableOpacity onPress={toggleTheme} style={styles.themeButton}>
            <ThemedIcon name={theme === 'dark' ? 'light-mode' : 'dark-mode'} size={24} />
          </TouchableOpacity>
        </View>
      </View>
      {bookmarks.length === 0 ? (
        <ThemedText style={styles.empty}>No bookmarks yet.</ThemedText>
      ) : (
        <FlatList
          data={bookmarks}
          keyExtractor={item => item.title}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
    marginTop: 8,
    position: 'relative',
    paddingTop: Platform.OS === 'ios' ? 56 : 8,
  },
  headerSide: {
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  headerCenter: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none', // allows touches to pass through center to side buttons
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 0.2,
  },
  backButton: {},
  themeButton: {
    marginLeft: 8,
    padding: 6,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.06)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: { marginBottom: 16, borderRadius: 8, padding: 8 },
  removeIcon: {
    position: 'absolute',
    top: 14,
    right: 16,
    zIndex: 20,
    backgroundColor: 'rgba(255,255,255,0.85)',
    borderRadius: 16,
    padding: 4,
    elevation: 3,
  },
  empty: { textAlign: 'center', marginTop: 40, color: '#888' },
});

export default BookmarksScreen;