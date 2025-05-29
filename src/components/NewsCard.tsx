import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Platform, Dimensions, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types';
import { useStyledTheme } from '../hooks/useStyledTheme';
import Icon from '@react-native-vector-icons/material-icons';
import { isBookmarked, addBookmark, removeBookmark } from '../services/storage';

interface NewsCardProps {
  article: import('../types/news.type').Article;
  showBookmark?: boolean;
  bookmarked: boolean;
}

const { width } = Dimensions.get('window');

import bookmarkEvents from '../services/bookmarkEvents';


const NewsCard: React.FC<NewsCardProps> = ({ article, showBookmark = true, bookmarked }) => {
  const { colors, theme } = useStyledTheme();
  const [imageLoading, setImageLoading] = React.useState(true);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'NewsDetail'>>();

  const handlePress = () => {
    navigation.navigate('NewsDetail', { article });
  };

  const toggleBookmark = () => {
    if (bookmarked) {
      removeBookmark(article.title);
    } else {
      addBookmark(article);
    }
  };


  const formattedDate = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString()
    : '';

  return (
    <TouchableOpacity
      activeOpacity={0.92}
      style={[styles.card, { backgroundColor: colors.card, shadowColor: colors.black }]}
      onPress={handlePress}
    >
      <View style={styles.imageContainer}>
        {/* Bookmark Icon */}
        {showBookmark && (
          <TouchableOpacity style={styles.bookmarkIcon} onPress={toggleBookmark} activeOpacity={0.7}>
            {Icon ? (
              <Icon
                name={bookmarked ? 'bookmark' : 'bookmark-border'}
                size={28}
                color={bookmarked ? colors.primary : '#fff'}
              />
            ) : (
              <Text style={{ fontSize: 24, color: bookmarked ? colors.primary : '#fff' }}>
                {bookmarked ? '★' : '☆'}
              </Text>
            )}
          </TouchableOpacity>
        )}

        {(article.urlToImage || article.url) ? (
          <>
            <Image
              source={{ uri: article.urlToImage || article.url }}
              style={styles.image}
              resizeMode="cover"
              onLoadStart={() => setImageLoading(true)}
              onLoadEnd={() => setImageLoading(false)}
            />
            {imageLoading && (
              <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color={colors.primary} />
              </View>
            )}
          </>
        ) : (
          <View style={[styles.image, { backgroundColor: colors.backgroundSecondary, justifyContent: 'center', alignItems: 'center' }]}> 
            <Text style={{ color: colors.textSecondary, fontSize: 16 }}>No Image</Text>
          </View>
        )}
        {/* Title overlay using a semi-transparent View instead of gradient */}
        <View style={styles.overlayBox}>
          <Text numberOfLines={2} style={styles.title}>{article.title}</Text>
        </View>
      </View>
      <View style={styles.detailsContent}>
        <Text numberOfLines={3} style={[styles.description, { color: colors.textSecondary }]}>{article.description}</Text>
        <View style={styles.metaRow}>
          {article.source?.name && (
            <Text style={[styles.meta, { color: colors.primary }]}>{article.source.name}</Text>
          )}
          {formattedDate && (
            <Text style={[styles.meta, { marginLeft: 8 }]}>{formattedDate}</Text>
          )}
        </View>
        <View style={styles.metaRow}>
          {article.author && (
            <Text style={[styles.author, { color: colors.textSecondary }]}>By {article.author}</Text>
          )}
          <TouchableOpacity style={[styles.readMoreBtn, { backgroundColor: colors.primary }]} onPress={handlePress}>
            <Text style={styles.readMoreText}>Read More</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const CARD_WIDTH = width - 32;
const IMAGE_HEIGHT = 180;

const styles = StyleSheet.create({
  bookmarkIcon: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.38)',
    borderRadius: 18,
    padding: 5,
  },
  card: {
    width: CARD_WIDTH,
    borderRadius: 16,
    marginVertical: 14,
    alignSelf: 'center',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 6,
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
  },
  imageContainer: {
    width: '100%',
    height: IMAGE_HEIGHT,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 80,
  },
  overlayBox: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'rgba(0,0,0,0.55)',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  overlayContent: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    letterSpacing: 0.2,
  },
  detailsContent: {
    padding: 16,
    backgroundColor: 'transparent',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  description: {
    fontSize: 15,
    marginBottom: 10,
    fontWeight: '400',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  meta: {
    fontSize: 13,
    fontWeight: '600',
    opacity: 0.85,
  },
  author: {
    fontSize: 13,
    fontStyle: 'italic',
    flex: 1,
  },
  readMoreBtn: {
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 16,
    alignSelf: 'flex-end',
    marginLeft: 8,
  },
  readMoreText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
    letterSpacing: 0.2,
  },
  loaderContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)', // optional: slight overlay while loading
    zIndex: 2,
  },
});

export default NewsCard;

